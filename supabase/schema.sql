-- Touch of Vintage LLC — Plaid + LoanDisk integration schema
-- Run this once in the Supabase project's SQL Editor (Project → SQL Editor → New query).
--
-- Sensitive values (Plaid access_token, bank account numbers) are stored encrypted
-- using AES-256-GCM at the application layer (see lib/crypto.ts) — this schema stores
-- only ciphertext, never plaintext, in *_encrypted columns.

create extension if not exists "pgcrypto";

-- One row per loan application started on the website.
-- application_id is a client-generated UUID that ties together the application form,
-- the Plaid item, and (eventually) the LoanDisk borrower/loan records.
create table if not exists loan_applications (
  id uuid primary key default gen_random_uuid(),
  application_id text unique not null,
  status text not null default 'pending', -- pending | bank_linked | verified | submitted | error
  division text, -- 'consumer' | 'commercial'
  product_name text,
  referrer_email text, -- only set when applying for Círculo Íntimo (referral-gated product)
  loan_amount numeric,
  loan_term text,
  loan_purpose text,
  first_name text,
  last_name text,
  email text,
  phone text,
  address text, -- street address line only; city/state/postal_code are separate below
  city text,
  state text, -- 2-letter code
  postal_code text,
  date_of_birth date,
  ssn_last4 text, -- plaintext, display/reference only
  ssn_encrypted text, -- full SSN, AES-256-GCM (see lib/crypto.ts) — required by FL Chapter 516
  employment_status text,
  employer text,
  job_title text,
  monthly_income numeric,
  notes text,
  plaid_user_id text, -- from Plaid /user/create — required for Bank Income (creditBankIncomeGet)
  plaid_identity_status text, -- 'Verified' | 'Mismatch'
  plaid_bank_verification_status text, -- 'Verified'
  bank_name text,
  bank_account_number_encrypted text,
  bank_routing_number text,
  bank_account_type text, -- 'Checking' | 'Savings'
  plaid_account_id text, -- Plaid's account_id for the linked account, needed to create a Dwolla processor token
  plaid_income_status text,
  loandisk_borrower_id text,
  loandisk_loan_id text, -- filled in manually once staff books the actual loan in LoanDisk
  dwolla_customer_url text, -- Dwolla Customer resource for this borrower (created via Plaid processor token — reuses the already-verified bank account, no re-entering bank details)
  dwolla_funding_source_url text,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_loan_applications_application_id on loan_applications (application_id);

-- One row per Plaid Item (one per bank connection). access_token never leaves this table.
create table if not exists plaid_items (
  id uuid primary key default gen_random_uuid(),
  application_id text unique not null references loan_applications (application_id) on delete cascade,
  item_id text not null,
  access_token_encrypted text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_plaid_items_item_id on plaid_items (item_id);

-- Raw log of every Plaid webhook received, for audit + re-auth handling.
create table if not exists plaid_webhook_events (
  id uuid primary key default gen_random_uuid(),
  item_id text,
  webhook_type text,
  webhook_code text,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

-- One row per Dwolla Transfer — both loan disbursements (TOV → borrower) and
-- repayment collections (borrower → TOV). ACH settles in 1-4 business days and can be
-- returned after appearing to succeed, so `status` tracks Dwolla's lifecycle
-- (pending → processed → failed/cancelled) via webhooks rather than being marked final
-- at creation time. Only once `status = 'processed'` should the corresponding
-- disbursement/repayment be considered final in LoanDisk.
create table if not exists dwolla_transfers (
  id uuid primary key default gen_random_uuid(),
  application_id text references loan_applications (application_id) on delete set null,
  loandisk_loan_id text, -- set for repayments once the loan exists in LoanDisk
  direction text not null, -- 'disbursement' | 'repayment'
  amount numeric not null,
  dwolla_transfer_url text unique,
  status text not null default 'pending', -- pending | processed | failed | cancelled
  loandisk_repayment_id text, -- set once a 'repayment' transfer is posted back to LoanDisk via POST /repayment
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_dwolla_transfers_application_id on dwolla_transfers (application_id);

-- Raw log of every Dwolla webhook received (transfer_completed, transfer_failed, etc.)
create table if not exists dwolla_webhook_events (
  id uuid primary key default gen_random_uuid(),
  topic text,
  resource_id text,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

-- Row Level Security: these tables are only ever accessed from the Node.js backend
-- using the Supabase SERVICE ROLE key, never the anon key. Lock them down by default.
alter table loan_applications enable row level security;
alter table plaid_items enable row level security;
alter table plaid_webhook_events enable row level security;
alter table dwolla_transfers enable row level security;
alter table dwolla_webhook_events enable row level security;
-- No policies are created — with RLS enabled and no policies, only the service role
-- (which bypasses RLS) can read/write. The anon key gets zero access.

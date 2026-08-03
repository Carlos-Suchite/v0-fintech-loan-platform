// Stripe client — loan disbursement (TOV → borrower) and repayment collection
// (borrower → TOV) via ACH, replacing Dwolla (rejected TOV 2026-07-30: "purpose-built
// for high-transacting enterprises", doesn't fit our current volume).
//
// Bank linking uses Stripe Financial Connections (self-serve, no partner approval —
// unlike the legacy Plaid→Stripe bank_account_token bridge, which needs a manual
// "intake form" enablement from Stripe and is explicitly deprecated in favor of this).
// Plaid Link stays in the flow for Identity + Bank Income only (lib/plaid.ts) — it no
// longer feeds bank/routing numbers to the payment vendor.
//
// Two separate money-movement primitives, both confirmed against docs.stripe.com
// (2026-08-01) before writing this — they are NOT interchangeable:
//
// 1. DISBURSEMENT (TOV → borrower): the borrower gets a Connect *Custom* account
//    (invisible to them — no Stripe dashboard, we own all communication per
//    docs.stripe.com/connect/custom/payouts). Their bank account is collected via
//    Financial Connections as a SetupIntent scoped to THAT connected account
//    (flow_directions: ["outbound"], Stripe.js initialized with `stripeAccount`), then
//    converted to a bank_account token and set as the account's external_account
//    (payout destination). We `transfers.create` platform balance → their Custom
//    account, then `payouts.create` (scoped to that account) to push it to their bank.
//
// 2. REPAYMENT COLLECTION (borrower → TOV): a plain Stripe Customer on the PLATFORM
//    account (no Connect involved at all). Their bank account is collected via
//    Financial Connections as a SetupIntent on that Customer (no flow_directions
//    restriction, so it grants charge/mandate permission), producing a reusable
//    us_bank_account PaymentMethod. We charge it with a PaymentIntent
//    (confirm: true, off_session: true) for each repayment.
//
// ACH settles in 2-4 business days and can still be returned/failed after appearing to
// succeed — see app/api/webhooks/stripe/route.ts for the async status handling, mirrored
// from how dwolla_transfers used to work (see stripe_transfers in supabase/schema.sql).

import Stripe from "stripe"
import { getSupabaseClient } from "@/lib/supabase"

let cached: Stripe | null | undefined

export function getStripeClient(): Stripe | null {
  if (cached !== undefined) return cached
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    cached = null
    return cached
  }
  cached = new Stripe(key)
  return cached
}

export interface BorrowerStripeInput {
  firstName: string
  lastName: string
  email: string
  phone: string | null
  address1: string
  city: string
  state: string
  postalCode: string
  dateOfBirth: string // YYYY-MM-DD
  ssnLast4: string
}

// Creates (or reuses) the platform-level Customer used for repayment collection, and the
// Connect Custom account used as the disbursement destination. Neither one is money-movement
// ready yet — this only creates the two Stripe objects; the bank account itself is attached
// separately via the Financial Connections SetupIntent flow below (needs a client-side step,
// so it can't happen in one server call the way Dwolla's processor-token flow could).
export async function getOrCreateStripeIds(
  applicationId: string,
  borrower: BorrowerStripeInput,
): Promise<{ customerId: string; connectAccountId: string }> {
  const stripe = getStripeClient()
  if (!stripe) throw new Error("Stripe no está configurado.")
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase no está configurado.")

  const { data: existing, error: fetchError } = await supabase
    .from("loan_applications")
    .select("stripe_customer_id, stripe_connect_account_id")
    .eq("application_id", applicationId)
    .maybeSingle()
  if (fetchError) throw fetchError

  let customerId = existing?.stripe_customer_id ?? null
  if (!customerId) {
    const customer = await stripe.customers.create({
      name: `${borrower.firstName} ${borrower.lastName}`,
      email: borrower.email,
      phone: borrower.phone ?? undefined,
      metadata: { application_id: applicationId },
    })
    customerId = customer.id
  }

  let connectAccountId = existing?.stripe_connect_account_id ?? null
  if (!connectAccountId) {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: borrower.email,
      capabilities: { transfers: { requested: true } },
      // Required for the transfers capability to actually activate (confirmed live,
      // 2026-08-01 — without it the account sits in capabilities.transfers: "inactive"
      // with requirements.currently_due: ["business_profile.url"], even though this
      // account represents a borrower, not a business). TOV's own site describes what
      // the transfer is for since there's no borrower-owned business URL to use.
      business_profile: {
        url: "https://touchofvintage.biz",
        product_description: "Loan disbursement recipient for a Touch of Vintage LLC loan.",
      },
      business_type: "individual",
      individual: {
        first_name: borrower.firstName,
        last_name: borrower.lastName,
        email: borrower.email,
        phone: borrower.phone ?? undefined,
        dob: {
          day: Number(borrower.dateOfBirth.split("-")[2]),
          month: Number(borrower.dateOfBirth.split("-")[1]),
          year: Number(borrower.dateOfBirth.split("-")[0]),
        },
        address: {
          line1: borrower.address1,
          city: borrower.city,
          state: borrower.state,
          postal_code: borrower.postalCode,
          country: "US",
        },
        ssn_last_4: borrower.ssnLast4,
      },
      tos_acceptance: {
        // Custom accounts require the *platform* to record acceptance on the account
        // holder's behalf ("service agreement" model) — date/ip should really be
        // captured at the moment the borrower consents in /apply, not backfilled here.
        // TODO: wire this through from the actual consent step once that's confirmed
        // against a live test-mode account.
        date: Math.floor(Date.now() / 1000),
        ip: "0.0.0.0",
      },
      metadata: { application_id: applicationId },
    })
    connectAccountId = account.id
  }

  const { error: updateError } = await supabase
    .from("loan_applications")
    .update({
      stripe_customer_id: customerId,
      stripe_connect_account_id: connectAccountId,
      updated_at: new Date().toISOString(),
    })
    .eq("application_id", applicationId)
  if (updateError) throw updateError

  return { customerId, connectAccountId }
}

// Server-side half of collecting the borrower's bank account for REPAYMENT COLLECTION
// (platform Customer, no Connect). Returns a SetupIntent client_secret — the frontend
// uses stripe.collectBankAccountForSetup + stripe.confirmUsBankAccountSetup (Financial
// Connections under the hood) to actually link the account, then posts the resulting
// payment_method id back to attachRepaymentPaymentMethod below.
export async function createRepaymentSetupIntent(customerId: string): Promise<string> {
  const stripe = getStripeClient()
  if (!stripe) throw new Error("Stripe no está configurado.")
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ["us_bank_account"],
  })
  if (!setupIntent.client_secret) throw new Error("Stripe no devolvió un client_secret.")
  return setupIntent.client_secret
}

export async function attachRepaymentPaymentMethod(applicationId: string, paymentMethodId: string): Promise<void> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase no está configurado.")
  const { error } = await supabase
    .from("loan_applications")
    .update({ stripe_repayment_payment_method_id: paymentMethodId, updated_at: new Date().toISOString() })
    .eq("application_id", applicationId)
  if (error) throw error
}

// Server-side half of collecting the borrower's bank account for DISBURSEMENT (their
// Connect Custom account's payout destination). Scoped to the connected account via
// `stripeAccount` — the frontend must initialize Stripe.js with the SAME connectAccountId
// (Stripe('pk_...', { stripeAccount: connectAccountId })) for the client-side collection
// step to land on the right account.
// Financial Connections Session with account_holder type "account" (not "customer") —
// this is Stripe's purpose-built path for linking a Connect account's OWN bank details
// for payouts. Created on the platform account (no Stripe-Account header — the session
// itself names the target via account_holder.account). Confirmed live against the real
// API 2026-08-01 after an earlier SetupIntent-based approach turned out wrong: that path
// produced a PaymentMethod that could never be converted into a payout external_account
// token no matter how the `customer` param was placed ("No such PaymentMethod" in every
// variant tried) — collectBankAccountToken + this session type is the flow
// docs.stripe.com itself names as correct for this exact case.
export async function createPayoutFcSession(connectAccountId: string): Promise<string> {
  const stripe = getStripeClient()
  if (!stripe) throw new Error("Stripe no está configurado.")
  const session = await stripe.financialConnections.sessions.create({
    account_holder: { type: "account", account: connectAccountId },
    permissions: ["payment_method"],
  })
  if (!session.client_secret) throw new Error("Stripe no devolvió un client_secret.")
  return session.client_secret
}

// The frontend's stripe.collectBankAccountToken(clientSecret) call returns a bank_account
// token directly — no PaymentMethod/conversion step needed, unlike the repayment half.
// Just set it as the connected account's payout destination.
export async function setPayoutBankAccount(connectAccountId: string, bankAccountTokenId: string): Promise<void> {
  const stripe = getStripeClient()
  if (!stripe) throw new Error("Stripe no está configurado.")
  await stripe.accounts.update(connectAccountId, { external_account: bankAccountTokenId })
}

// Moves platform balance into the borrower's Custom account, then pays it out to their
// bank. Two separate calls (rather than relying on automatic payouts) so we control
// timing the same way createTransfer did for Dwolla, and so app/api/webhooks/stripe
// has a single payout id to track through to "paid"/"failed".
export async function disburseToConnectAccount(connectAccountId: string, amount: number, applicationId: string): Promise<string> {
  const stripe = getStripeClient()
  if (!stripe) throw new Error("Stripe no está configurado.")

  await stripe.transfers.create({
    amount: Math.round(amount * 100),
    currency: "usd",
    destination: connectAccountId,
    metadata: { application_id: applicationId },
  })

  const payout = await stripe.payouts.create(
    { amount: Math.round(amount * 100), currency: "usd", metadata: { application_id: applicationId } },
    { stripeAccount: connectAccountId },
  )
  return payout.id
}

// Charges the borrower's linked bank account for a repayment. `off_session: true`
// because staff (not the borrower) triggers this from the admin panel — the mandate
// was already accepted during the Financial Connections SetupIntent step.
export async function collectRepayment(customerId: string, paymentMethodId: string, amount: number, applicationId: string): Promise<string> {
  const stripe = getStripeClient()
  if (!stripe) throw new Error("Stripe no está configurado.")

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: "usd",
    customer: customerId,
    payment_method: paymentMethodId,
    payment_method_types: ["us_bank_account"],
    confirm: true,
    off_session: true,
    metadata: { application_id: applicationId },
  })
  return paymentIntent.id
}

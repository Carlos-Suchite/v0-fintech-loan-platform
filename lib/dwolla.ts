// Dwolla client — loan disbursement (TOV → borrower) and repayment collection
// (borrower → TOV) via ACH, reusing the bank account already verified through Plaid Auth
// (Plaid → Dwolla "Secure Exchange": a processor token, not raw account/routing numbers,
// moves between the two vendors).
//
// Endpoints verified against developers.dwolla.com (2026-07-28) before writing this:
// - POST /customers — create a "personal" Verified Customer for the borrower
// - POST /customers/{id} — resubmit with the full SSN if Dwolla returns "retry" status
// - POST customers/{id}/funding-sources — attach their bank via a Plaid processor token
// - POST /transfers — move money between two funding source URLs
//
// Customer type is "personal" (Verified), not "unverified" — required per Maury
// (FL Chapter 516 mandates collecting full SSN + DOB regardless of what Dwolla itself
// needs), and it also removes the "unverified" tier's $5,000/week send+receive cap,
// which was too low for Commercial loans (up to $50,000) anyway. First attempt sends
// only the last-4 SSN (that's what Dwolla's own docs say to send initially); if identity
// can't be confirmed from that + name/DOB/address, Dwolla returns status "retry" and we
// resubmit with the full 9-digit SSN (decrypted from Supabase — see lib/crypto.ts).

import { getSupabaseClient } from "@/lib/supabase"
import { getPlaidClient, createDwollaProcessorToken } from "@/lib/plaid"
import { decrypt } from "@/lib/crypto"

interface DwollaConfig {
  apiUrl: string
  key: string
  secret: string
}

function getConfig(): DwollaConfig | null {
  const key = process.env.DWOLLA_KEY
  const secret = process.env.DWOLLA_SECRET
  if (!key || !secret) return null
  const env = process.env.DWOLLA_ENV ?? "sandbox"
  return {
    apiUrl: env === "production" ? "https://api.dwolla.com" : "https://api-sandbox.dwolla.com",
    key,
    secret,
  }
}

let cachedToken: { value: string; expiresAt: number } | null = null

async function getToken(config: DwollaConfig): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value

  const response = await fetch(`${config.apiUrl}/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.key}:${config.secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
  if (!response.ok) throw new Error(`Dwolla auth failed: ${response.status} ${await response.text()}`)
  const data = await response.json()
  // Cache with a 60s safety margin before the real 3600s expiry.
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 }
  return cachedToken.value
}

async function dwollaFetch(path: string, method: string, body?: unknown) {
  const config = getConfig()
  if (!config) throw new Error("Dwolla no está configurado. Define DWOLLA_KEY y DWOLLA_SECRET.")

  const token = await getToken(config)
  const url = path.startsWith("http") ? path : `${config.apiUrl}${path}`
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.dwolla.v1.hal+json",
      Accept: "application/vnd.dwolla.v1.hal+json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(`Dwolla API ${method} ${path} → ${response.status}: ${JSON.stringify(errorBody)}`)
  }

  // Dwolla returns the new resource's URL in the Location header on 201, with an
  // empty body — callers that need the URL read response.headers themselves via
  // dwollaFetchRaw below. For everything else (GETs), the body has the data.
  const location = response.headers.get("Location")
  const data = response.status === 204 ? {} : await response.json().catch(() => ({}))
  return { data, location }
}

export interface DwollaCustomerInput {
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  address1: string
  city: string
  state: string // 2-letter code
  postalCode: string
  dateOfBirth: string // YYYY-MM-DD
  ssnLast4: string
}

// Creates a "personal" Verified Customer with the last-4 SSN. If Dwolla can't confirm
// identity from that plus name/DOB/address, the returned customer's `status` will be
// "retry" — call resubmitCustomerWithFullSsn in that case. Returns the Customer's
// resource URL (from the Location header) either way.
export async function createCustomer(input: DwollaCustomerInput): Promise<string> {
  const { location } = await dwollaFetch("/customers", "POST", {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone ?? undefined,
    type: "personal",
    address1: input.address1,
    city: input.city,
    state: input.state,
    postalCode: input.postalCode,
    dateOfBirth: input.dateOfBirth,
    ssn: input.ssnLast4,
  })
  if (!location) throw new Error("Dwolla no devolvió la URL del customer creado.")
  return location
}

// Dwolla's one-shot retry: resubmit ALL the same fields plus the full 9-digit SSN.
export async function resubmitCustomerWithFullSsn(customerUrl: string, input: DwollaCustomerInput, fullSsn: string): Promise<void> {
  await dwollaFetch(customerUrl, "POST", {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone ?? undefined,
    address1: input.address1,
    city: input.city,
    state: input.state,
    postalCode: input.postalCode,
    dateOfBirth: input.dateOfBirth,
    ssn: fullSsn,
  })
}

export async function getCustomer(customerUrl: string) {
  const { data } = await dwollaFetch(customerUrl, "GET")
  return data
}

// Attaches the borrower's Plaid-verified bank account to their Dwolla Customer via a
// Plaid processor token — Dwolla fetches the real account/routing numbers directly from
// Plaid using that one-time token and discards it; they never pass through our server.
export async function createFundingSourceFromPlaid(customerUrl: string, plaidProcessorToken: string, name: string): Promise<string> {
  const { location } = await dwollaFetch(`${customerUrl}/funding-sources`, "POST", {
    plaidToken: plaidProcessorToken,
    name,
  })
  if (!location) throw new Error("Dwolla no devolvió la URL de la fuente de fondos creada.")
  return location
}

// Moves money from one funding source to another. Use TOV's master funding source
// (DWOLLA_MASTER_FUNDING_SOURCE_URL) as `sourceUrl` for a disbursement, or as
// `destinationUrl` for a repayment collection. Returns the new Transfer's URL —
// its `status` starts "pending" and only becomes "processed" (or "failed") 1-4
// business days later, reported via webhook (see app/api/webhooks/dwolla/route.ts).
export async function createTransfer(sourceUrl: string, destinationUrl: string, amount: number, correlationId?: string): Promise<string> {
  const { location } = await dwollaFetch("/transfers", "POST", {
    _links: {
      source: { href: sourceUrl },
      destination: { href: destinationUrl },
    },
    amount: {
      currency: "USD",
      value: amount.toFixed(2),
    },
    ...(correlationId ? { correlationId } : {}),
  })
  if (!location) throw new Error("Dwolla no devolvió la URL de la transferencia creada.")
  return location
}

export async function getTransfer(transferUrl: string) {
  const { data } = await dwollaFetch(transferUrl, "GET")
  return data
}

export interface BorrowerDwollaSetup {
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
  ssnEncrypted: string | null // full SSN, encrypted — only decrypted if Dwolla needs a retry
  plaidAccessToken: string
  plaidAccountId: string
}

// Idempotent: if this application already has a Dwolla customer + funding source
// (checked via Supabase), reuses them instead of creating duplicates. Only call this
// for an applicant staff have actually decided to move money for — it creates a real
// Dwolla Customer record, not something to run on every casual /apply submission.
export async function getOrCreateFundingSource(
  applicationId: string,
  borrower: BorrowerDwollaSetup,
): Promise<{ customerUrl: string; fundingSourceUrl: string }> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase no está configurado.")
  const plaidClient = getPlaidClient()
  if (!plaidClient) throw new Error("Plaid no está configurado.")

  const { data: existing, error: fetchError } = await supabase
    .from("loan_applications")
    .select("dwolla_customer_url, dwolla_funding_source_url")
    .eq("application_id", applicationId)
    .maybeSingle()
  if (fetchError) throw fetchError
  if (existing?.dwolla_customer_url && existing?.dwolla_funding_source_url) {
    return { customerUrl: existing.dwolla_customer_url, fundingSourceUrl: existing.dwolla_funding_source_url }
  }

  const customerInput: DwollaCustomerInput = {
    firstName: borrower.firstName,
    lastName: borrower.lastName,
    email: borrower.email,
    phone: borrower.phone,
    address1: borrower.address1,
    city: borrower.city,
    state: borrower.state,
    postalCode: borrower.postalCode,
    dateOfBirth: borrower.dateOfBirth,
    ssnLast4: borrower.ssnLast4,
  }

  const customerUrl = existing?.dwolla_customer_url ?? (await createCustomer(customerInput))

  // Identity couldn't be confirmed from last-4 SSN alone — resubmit once with the
  // full SSN, as Dwolla's retry flow requires. If we don't have it encrypted for some
  // reason, leave the customer in "retry" status rather than fail the whole flow —
  // staff can follow up manually via the Dwolla dashboard.
  const customer = await getCustomer(customerUrl)
  if (customer.status === "retry" && borrower.ssnEncrypted) {
    await resubmitCustomerWithFullSsn(customerUrl, customerInput, decrypt(borrower.ssnEncrypted))
  }

  const processorToken = await createDwollaProcessorToken(plaidClient, borrower.plaidAccessToken, borrower.plaidAccountId)
  const fundingSourceUrl = await createFundingSourceFromPlaid(customerUrl, processorToken, `${borrower.firstName} ${borrower.lastName}`)

  const { error: updateError } = await supabase
    .from("loan_applications")
    .update({
      dwolla_customer_url: customerUrl,
      dwolla_funding_source_url: fundingSourceUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("application_id", applicationId)
  if (updateError) throw updateError

  return { customerUrl, fundingSourceUrl }
}

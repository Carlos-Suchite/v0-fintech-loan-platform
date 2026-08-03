// LoanDisk REST client.
//
// Verified against the real docs at https://x.loandisk.com/admin/api/documentation/
// (viewed 2026-07-27, logged in as Mauricio Carbajal) — NOT the Developer Brief, whose
// base URL/auth header were both wrong. Key facts from the real docs:
//
// - Base URL shape: https://api-main.loandisk.com/{Public Key}/{Branch Id}/{Resource}
//   The Public Key and Branch Id are PATH segments, not a body field or query param.
// - Auth header: `Authorization: Basic {Auth Code}` (not "Bearer" as the Brief assumed).
// - Custom fields are flat top-level keys on the borrower/loan JSON body
//   (`custom_field_27607`, etc.) — not a nested `custom_fields` object.
// - PUT (update) requires the FULL set of fields every time — any field omitted gets
//   wiped to empty. To avoid that risk entirely, this only ever POSTs (creates) a new
//   borrower; it never PUTs. If a borrower record needs updating later, that update
//   must re-send every field, not just the changed ones.
// - There is no `branch_id` field on the borrower body — it's only in the URL.
//
// The "ACH Auth - Bank Name / Account Number / Routing Number / Account Type" fields
// from PROJECT_STATE_HANDOFF.md §5f are NOT LoanDisk custom fields — they don't exist
// in the Borrower or Loan custom field list (confirmed against the live docs, which
// list only the 7 Borrower + 4 Loan custom fields already known from Phase 4). They're
// fill-in blanks on the ACH Authorization document template instead (per
// PROJECT_STATE_HANDOFF.md §10, Phase 4.5) — a human fills them in when generating that
// document, not something this API integration pushes.

interface LoanDiskConfig {
  baseUrl: string
  publicKey: string
  authCode: string
}

function getConfig(): LoanDiskConfig | null {
  const baseUrl = process.env.LOANDISK_API_BASE_URL
  const publicKey = process.env.LOANDISK_PUBLIC_KEY
  const authCode = process.env.LOANDISK_AUTH_CODE
  if (!baseUrl || !publicKey || !authCode) return null
  return { baseUrl, publicKey, authCode }
}

function branchId(division: "consumer" | "commercial" | null): string {
  const commercial = process.env.LOANDISK_BRANCH_ID_COMMERCIAL
  const consumer = process.env.LOANDISK_BRANCH_ID_CONSUMER
  return division === "commercial" ? (commercial ?? "") : (consumer ?? "")
}

// LoanDisk always answers HTTP 200, even on validation failure — real success/failure
// is only distinguishable by the shape of the `response` field: an object with an
// `Errors` array on failure, or the actual resource data on success (confirmed live,
// 2026-07-27: {"response":{"Errors":["Country has incorrect value...."]},"http":{"code":200,...}}
// vs {"response":{"borrower_id":"7849530"},"http":{"code":200,...}} on success).
async function loanDiskFetch(config: LoanDiskConfig, division: "consumer" | "commercial" | null, resource: string, method: string, body?: unknown) {
  const url = `${config.baseUrl}/${config.publicKey}/${branchId(division)}/${resource}`
  const httpResponse = await fetch(url, {
    method,
    headers: {
      Authorization: `Basic ${config.authCode}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await httpResponse.json().catch(() => ({}))
  if (!httpResponse.ok || data?.response?.Errors) {
    throw new Error(`LoanDisk API ${method} ${resource} → ${JSON.stringify(data)}`)
  }
  return data.response
}

export interface BorrowerPayload {
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  postalCode: string | null
  dateOfBirth: string | null // ISO format (YYYY-MM-DD) as stored in Supabase
  division: "consumer" | "commercial" | null
  plaidIdentityStatus: string
  plaidBankVerificationStatus: string
  productName: string | null
  referrerEmail: string | null // Círculo Íntimo only
}

// LoanDisk's borrower_dob wants mm/dd/yyyy; Supabase's `date` column (and the HTML
// <input type="date"> that fills it) gives ISO (yyyy-mm-dd).
function toLoanDiskDate(isoDate: string | null): string | null {
  if (!isoDate) return null
  const [year, month, day] = isoDate.split("-")
  if (!year || !month || !day) return null
  return `${month}/${day}/${year}`
}

// Creates a new borrower with the Plaid custom fields already set — done in a single
// POST (not POST-then-PUT) specifically to avoid LoanDisk's "PUT wipes omitted fields"
// behavior. Returns { borrowerId }.
export async function createBorrower(payload: BorrowerPayload): Promise<{ borrowerId: string }> {
  const config = getConfig()
  if (!config) {
    throw new Error("LoanDisk no está configurado. Define LOANDISK_API_BASE_URL, LOANDISK_PUBLIC_KEY y LOANDISK_AUTH_CODE.")
  }

  const data = await loanDiskFetch(config, payload.division, "borrower", "POST", {
    // Required. Must be the ISO 2-letter code ("US"), NOT the full name shown on
    // LoanDisk's own country_list.html reference page — "United States" is rejected
    // with "Country has incorrect value" even though it's the name shown there.
    borrower_country: "US",
    borrower_firstname: payload.firstName,
    borrower_lastname: payload.lastName,
    borrower_email: payload.email,
    borrower_mobile: payload.phone,
    borrower_address: payload.address,
    borrower_city: payload.city,
    borrower_province: payload.state,
    borrower_zipcode: payload.postalCode,
    borrower_dob: toLoanDiskDate(payload.dateOfBirth),
    // Requested product isn't a dedicated custom field — surfaced in the free-text
    // description so staff see it immediately when reviewing the borrower in LoanDisk.
    borrower_description: payload.productName ? `Solicitó vía sitio web: ${payload.productName}` : null,
    custom_field_27607: payload.plaidIdentityStatus,
    custom_field_27608: payload.plaidBankVerificationStatus,
    // custom_field_27605 = "Referrer Email (Círculo Íntimo only)" — only meaningful for
    // that product, but harmless to leave blank for the others.
    ...(payload.referrerEmail ? { custom_field_27605: payload.referrerEmail } : {}),
  })

  if (!data.borrower_id) throw new Error("LoanDisk no devolvió un borrower_id.")
  return { borrowerId: String(data.borrower_id) }
}

function repaymentMethodId(division: "consumer" | "commercial" | null): string {
  // Repayment methods are branch-scoped in LoanDisk — confirmed live 2026-07-28 by
  // creating "ACH - Dwolla" on both branches and getting back two different IDs
  // (370058 Consumer, 370059 Commercial), unlike collectors which are shared. Still
  // named "ACH - Dwolla" in LoanDisk as of the Stripe switch (2026-08-01) — same IDs,
  // just rename the entries under Admin → Loans → Loan Repayment Methods whenever
  // convenient (not urgent, it's just a label).
  const commercial = process.env.LOANDISK_REPAYMENT_METHOD_ACH_COMMERCIAL
  const consumer = process.env.LOANDISK_REPAYMENT_METHOD_ACH_CONSUMER
  return division === "commercial" ? (commercial ?? "") : (consumer ?? "")
}

export interface RepaymentPayload {
  loanId: string // LoanDisk loan_id, NOT loan_application_id
  division: "consumer" | "commercial" | null
  amount: number
  collectedDate: Date
  description?: string | null
}

// Records a confirmed Stripe repayment collection against an existing LoanDisk loan.
// Only call this once the transfer is truly final (Stripe webhook status "processed")
// — never for a "pending" ACH transfer, since those can still bounce for days.
export async function createRepayment(payload: RepaymentPayload): Promise<{ repaymentId: string }> {
  const config = getConfig()
  if (!config) {
    throw new Error("LoanDisk no está configurado. Define LOANDISK_API_BASE_URL, LOANDISK_PUBLIC_KEY y LOANDISK_AUTH_CODE.")
  }
  const methodId = repaymentMethodId(payload.division)
  const collectorId = process.env.LOANDISK_COLLECTOR_SYSTEM_GENERATED
  if (!methodId || !collectorId) {
    throw new Error("Falta LOANDISK_REPAYMENT_METHOD_ACH_* o LOANDISK_COLLECTOR_SYSTEM_GENERATED.")
  }

  const mm = String(payload.collectedDate.getMonth() + 1).padStart(2, "0")
  const dd = String(payload.collectedDate.getDate()).padStart(2, "0")
  const yyyy = payload.collectedDate.getFullYear()

  const data = await loanDiskFetch(config, payload.division, "repayment", "POST", {
    loan_id: payload.loanId,
    repayment_amount: payload.amount.toFixed(2),
    loan_repayment_method_id: methodId,
    repayment_collected_date: `${mm}/${dd}/${yyyy}`,
    collector_id: collectorId,
    repayment_description: payload.description ?? "Cobro automático vía Stripe (ACH)",
  })

  if (!data.repayment_id) throw new Error("LoanDisk no devolvió un repayment_id.")
  return { repaymentId: String(data.repayment_id) }
}

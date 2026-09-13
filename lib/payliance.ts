import { decrypt } from "@/lib/crypto"

// Payliance ACH+RCC API client — replaces lib/stripe.ts (Stripe permanently rejected
// Touch of Vintage as a restricted business, 2026-08-06). Reference: Payliance
// "ACH+RCC API Reference v1" (sandbox.api.payliance.com). Sandbox credentials are
// pending Payliance's account approval (expected late Aug/early Sep 2026) — nothing
// in this file has been exercised against a live endpoint yet.
//
// Architecturally simpler than Stripe: there is no connected-account/customer object
// to create first. Every Debit (collect repayment) or Credit (disburse loan) call
// just carries the borrower's routing + account number directly. Those numbers are
// already captured and encrypted by app/api/plaid/get-auth/route.ts into
// loan_applications.bank_account_number_encrypted / bank_routing_number during the
// existing Plaid Auth step — so, unlike Stripe's second Financial Connections
// bank-linking step, no new client-side linking flow should be needed in /apply.

const STAGING_BASE = "https://staging.api.payliance.com"
const PRODUCTION_BASE = "https://api.payliance.com"

interface PaylianceConfig {
  secretKey: string
  baseUrl: string
}

export function getPaylianceConfig(): PaylianceConfig | null {
  const secretKey = process.env.PAYLIANCE_SECRET_KEY
  if (!secretKey) return null
  const baseUrl = process.env.PAYLIANCE_ENVIRONMENT === "production" ? PRODUCTION_BASE : STAGING_BASE
  return { secretKey, baseUrl }
}

async function paylianceRequest<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const config = getPaylianceConfig()
  if (!config) throw new Error("Payliance no está configurado (falta PAYLIANCE_SECRET_KEY).")

  const res = await fetch(`${config.baseUrl}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.secretKey}` },
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as T
  if (!res.ok) throw new Error(`Payliance ${path} respondió ${res.status}: ${JSON.stringify(data)}`)
  return data
}

export interface BorrowerBankInput {
  routingNumber: string
  accountNumberEncrypted: string
  accountType: "checking" | "savings" | null
  isBusiness: boolean
  firstName: string
  lastName: string
  companyName?: string | null
}

function mapAccountType(accountType: "checking" | "savings" | null, isBusiness: boolean): string {
  const base = accountType === "savings" ? "Saving" : "Checking"
  return `${isBusiness ? "Business" : "Personal"} ${base}`
}

// Payliance requires CheckNumber unconditionally, even for SEC code WEB
// (internet-initiated, no physical check involved) — there is no real check number
// for an online ACH debit, so this generates a merchant-assigned placeholder.
function generateCheckNumber(): string {
  return String(Date.now()).slice(-10)
}

// SEC code depends on transaction direction and division, per the ACH transaction
// types actually checked on Touch of Vintage's real Payliance merchant application:
// WEB (online consumer debits), Credit Transaction Capability / PPD (consumer
// disbursements), and B2B Transactions / CCD (commercial division, both directions —
// CCD applies "regardless of how authorization is obtained," so it covers commercial
// debits too, not just credits).
function getSecCode(kind: "debit" | "credit", isBusiness: boolean): string {
  if (isBusiness) return "CCD"
  return kind === "credit" ? "PPD" : "WEB"
}

export interface EcheckResponse {
  AuthorizationId: string
  ValidationCode: number
  successful: boolean
  message: string
}

async function submitEcheck(
  kind: "debit" | "credit",
  params: { uniqueTranId: string; amount: number; bank: BorrowerBankInput },
): Promise<EcheckResponse> {
  const { uniqueTranId, amount, bank } = params
  const accountNumber = decrypt(bank.accountNumberEncrypted)

  const body: Record<string, unknown> = {
    UniqueTranId: uniqueTranId,
    Routing: bank.routingNumber,
    AccountNumber: accountNumber,
    CheckNumber: generateCheckNumber(),
    CheckAmount: amount.toFixed(2),
    SecCode: getSecCode(kind, bank.isBusiness),
    AccountType: mapAccountType(bank.accountType, bank.isBusiness),
    FirstName: bank.firstName,
    LastName: bank.lastName,
    ...(bank.isBusiness && bank.companyName ? { CompanyName: bank.companyName } : {}),
  }

  return paylianceRequest<EcheckResponse>(`api/v1/echeck/${kind}`, body)
}

// Payliance caps UniqueTranId at 50 characters. `disb-<uuid>-<timestamp>` (with
// the applicationId's dashes) runs to 55 and gets rejected ("UniqueTranID too
// long") — strip the UUID's dashes and use a single-letter direction prefix to
// stay well under the limit (1 + 32 + 13 = 46 chars).
function buildUniqueTranId(direction: "D" | "R", applicationId: string): string {
  return `${direction}${applicationId.replace(/-/g, "")}${Date.now()}`
}

// Credit = pay the customer = loan disbursement.
export async function disburseToBorrower(params: {
  applicationId: string
  amount: number
  bank: BorrowerBankInput
}): Promise<{ uniqueTranId: string; response: EcheckResponse }> {
  const uniqueTranId = buildUniqueTranId("D", params.applicationId)
  const response = await submitEcheck("credit", { uniqueTranId, amount: params.amount, bank: params.bank })
  return { uniqueTranId, response }
}

// Debit = collect from the customer = loan repayment.
export async function collectRepayment(params: {
  applicationId: string
  amount: number
  bank: BorrowerBankInput
}): Promise<{ uniqueTranId: string; response: EcheckResponse }> {
  const uniqueTranId = buildUniqueTranId("R", params.applicationId)
  const response = await submitEcheck("debit", { uniqueTranId, amount: params.amount, bank: params.bank })
  return { uniqueTranId, response }
}

// Payliance has no webhook mechanism (confirmed against both API reference docs) —
// status must be polled via Retrieve. Status: 0 Not found, 1 Invalidated, 2 Pending,
// 4 Sent to bank, 8 Returned, 16 Settled, 24 Settled then Returned, 32 Voided.
export interface RetrieveResponse {
  AuthorizationId: string
  Status: number
  ReturnCode: string | null
  Routing: string
  AccountNumber: string
  Amount: number
  FirstName: string
  LastName: string
  TranCode: number
  UniqueTranId: string
  successful: boolean
  message: string
}

export async function retrieveTransaction(uniqueTranId: string): Promise<RetrieveResponse> {
  return paylianceRequest<RetrieveResponse>("api/v1/echeck/retrieve", {
    UniqueTranId: uniqueTranId,
    IncludeRiskManagementResults: false,
  })
}

export async function voidTransaction(authorizationId: string): Promise<{ successful: boolean; message: string }> {
  return paylianceRequest("api/v1/echeck/void", { AuthorizationId: authorizationId })
}

export async function refundTransaction(
  authorizationId: string,
): Promise<{ AuthorizationId: string; successful: boolean; message: string }> {
  return paylianceRequest("api/v1/echeck/refund", { AuthorizationId: authorizationId })
}

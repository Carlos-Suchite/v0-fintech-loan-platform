import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"
import { getSupabaseClient } from "@/lib/supabase"
import { decrypt } from "@/lib/crypto"

let cached: PlaidApi | null | undefined

export function getPlaidClient(): PlaidApi | null {
  if (cached !== undefined) return cached

  const clientId = process.env.PLAID_CLIENT_ID
  const secret = process.env.PLAID_SECRET
  if (!clientId || !secret) {
    cached = null
    return cached
  }

  const env = process.env.PLAID_ENV ?? "sandbox"
  const config = new Configuration({
    basePath: PlaidEnvironments[env] ?? PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": clientId,
        "PLAID-SECRET": secret,
      },
    },
  })
  cached = new PlaidApi(config)
  return cached
}

// Looks up the encrypted access_token stored by exchange-token and decrypts it.
// Returns null if no Plaid item exists yet for this application (bank not linked).
export async function getAccessTokenForApplication(applicationId: string): Promise<string | null> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase no está configurado.")

  const { data, error } = await supabase
    .from("plaid_items")
    .select("access_token_encrypted")
    .eq("application_id", applicationId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return decrypt(data.access_token_encrypted)
}

export async function getAuthData(client: PlaidApi, accessToken: string) {
  const response = await client.authGet({ access_token: accessToken })
  const account = response.data.accounts[0]
  const achNumbers = response.data.numbers.ach.find((n) => n.account_id === account?.account_id)
  return {
    institutionName: response.data.item.institution_name ?? null,
    accountType: account?.subtype ?? account?.type ?? null,
    accountNumber: achNumbers?.account ?? null,
    routingNumber: achNumbers?.routing ?? null,
    accountId: account?.account_id ?? null,
  }
}

export async function getIdentityData(client: PlaidApi, accessToken: string) {
  const response = await client.identityGet({ access_token: accessToken })
  const owner = response.data.accounts[0]?.owners?.[0]
  return {
    names: owner?.names ?? [],
    emails: owner?.emails?.map((e) => e.data) ?? [],
    phones: owner?.phone_numbers?.map((p) => p.data) ?? [],
    addresses: owner?.addresses?.map((a) => a.data) ?? [],
  }
}

// Bank Income (the current replacement for the Brief's "income_verification"
// product — see the note on getIncomeData below) is keyed off a Plaid user_id from
// /user/create, NOT the item's access_token like Auth/Identity. Create it once per
// application and cache it on the loan_applications row.
export async function getOrCreatePlaidUserId(client: PlaidApi, applicationId: string): Promise<string> {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error("Supabase no está configurado.")

  const { data, error } = await supabase
    .from("loan_applications")
    .select("plaid_user_id")
    .eq("application_id", applicationId)
    .maybeSingle()
  if (error) throw error
  if (data?.plaid_user_id) return data.plaid_user_id

  const response = await client.userCreate({ client_user_id: applicationId }, true)
  const plaidUserId = response.data.user_id

  const { error: updateError } = await supabase
    .from("loan_applications")
    .update({ plaid_user_id: plaidUserId, updated_at: new Date().toISOString() })
    .eq("application_id", applicationId)
  if (updateError) throw updateError

  return plaidUserId
}

// NOTE: the Developer Brief names the "income_verification" product and a single
// /income/verification/get endpoint, but Plaid has since replaced that with Bank
// Income / Document Income (see https://plaid.com/docs/income/), keyed by user_id
// (Plaid's newer User API, in effect for any /user/create call after Dec 10 2025 —
// which covers this account, approved June 2026) rather than an item's access_token.
// This needs "Bank Income" enabled for this Plaid client in the Dashboard — confirm
// that's on before relying on this in production, and re-check the docs if Plaid
// returns PRODUCT_NOT_ENABLED or similar.
export async function getIncomeData(client: PlaidApi, plaidUserId: string) {
  const response = await client.creditBankIncomeGet({ user_id: plaidUserId })
  return response.data
}

// Minimal in-memory rate limiter (per Developer Brief §9: "Add rate limiting to
// /api/plaid/* endpoints"). Fine for a single-instance server; on a multi-instance /
// serverless deployment (e.g. Vercel) each instance has its own counter, so this should
// be swapped for a shared store (Upstash Redis, Vercel KV) before relying on it at scale.
const hits = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count += 1
  return true
}

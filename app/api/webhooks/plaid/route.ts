import { NextResponse } from "next/server"
import { createPublicKey, createHash, verify as cryptoVerify, type JsonWebKey } from "crypto"
import { getPlaidClient } from "@/lib/plaid"
import { getSupabaseClient } from "@/lib/supabase"

// Per https://plaid.com/docs/api/webhooks/webhook-verification/ — Plaid signs each
// webhook body with an ES256 JWT in the Plaid-Verification header. Verification keys
// rarely rotate, so cache them by kid for the life of the server process.
const keyCache = new Map<string, JsonWebKey>()

function base64UrlDecode(segment: string): Buffer {
  return Buffer.from(segment.replace(/-/g, "+").replace(/_/g, "/"), "base64")
}

async function getVerificationKey(keyId: string): Promise<JsonWebKey> {
  const cached = keyCache.get(keyId)
  if (cached) return cached

  const client = getPlaidClient()
  if (!client) throw new Error("Plaid no está configurado.")

  const response = await client.webhookVerificationKeyGet({ key_id: keyId })
  const jwk = response.data.key as unknown as JsonWebKey
  keyCache.set(keyId, jwk)
  return jwk
}

// Returns true only if the signature is valid, the JWT is fresh (<5 min old — guards
// against replay), and the signed body hash matches the actual request body we
// received. Any failure here should reject the webhook.
async function verifyPlaidWebhook(rawBody: string, verificationHeader: string): Promise<boolean> {
  const [headerB64, payloadB64, signatureB64] = verificationHeader.split(".")
  if (!headerB64 || !payloadB64 || !signatureB64) return false

  const header = JSON.parse(base64UrlDecode(headerB64).toString("utf8"))
  const payload = JSON.parse(base64UrlDecode(payloadB64).toString("utf8"))
  if (header.alg !== "ES256") return false

  const fiveMinutesAgo = Date.now() / 1000 - 5 * 60
  if (typeof payload.iat !== "number" || payload.iat < fiveMinutesAgo) return false

  const jwk = await getVerificationKey(header.kid)
  const publicKey = createPublicKey({ key: jwk as never, format: "jwk" })

  const signedData = `${headerB64}.${payloadB64}`
  const signature = base64UrlDecode(signatureB64)
  const isSignatureValid = cryptoVerify(
    "sha256",
    Buffer.from(signedData),
    { key: publicKey, dsaEncoding: "ieee-p1363" },
    signature,
  )
  if (!isSignatureValid) return false

  const actualBodyHash = createHash("sha256").update(rawBody).digest("hex")
  return actualBodyHash === payload.request_body_sha256
}

export async function POST(req: Request) {
  const verificationHeader = req.headers.get("plaid-verification")
  const rawBody = await req.text()

  if (!verificationHeader) {
    return NextResponse.json({ error: "Falta el header Plaid-Verification." }, { status: 400 })
  }

  let valid = false
  try {
    valid = await verifyPlaidWebhook(rawBody, verificationHeader)
  } catch (err) {
    console.error("[v0] Error verifying Plaid webhook signature:", err)
  }
  if (!valid) {
    return NextResponse.json({ error: "Firma de webhook inválida." }, { status: 401 })
  }

  const event = JSON.parse(rawBody)
  console.log("[v0] Plaid webhook:", event.webhook_type, event.webhook_code, event.item_id)

  const supabase = getSupabaseClient()
  if (supabase) {
    await supabase.from("plaid_webhook_events").insert({
      item_id: event.item_id ?? null,
      webhook_type: event.webhook_type ?? null,
      webhook_code: event.webhook_code ?? null,
      payload: event,
    })

    // ITEM_LOGIN_REQUIRED: the bank connection needs the borrower to reconnect
    // (expired credentials, MFA change, etc). Flag the application for follow-up —
    // there's no in-app "reconnect your bank" flow yet, so for now this needs a
    // human (Maury) to reach out and have the borrower redo the /apply bank step.
    if (event.webhook_code === "ITEM_LOGIN_REQUIRED" && event.item_id) {
      const { data: item } = await supabase
        .from("plaid_items")
        .select("application_id")
        .eq("item_id", event.item_id)
        .maybeSingle()
      if (item?.application_id) {
        await supabase
          .from("loan_applications")
          .update({ status: "reauth_required", updated_at: new Date().toISOString() })
          .eq("application_id", item.application_id)
      }
    }
  }

  return NextResponse.json({ ok: true })
}

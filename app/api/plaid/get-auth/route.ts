import { NextResponse } from "next/server"
import { getPlaidClient, getAuthData, getAccessTokenForApplication, checkRateLimit } from "@/lib/plaid"
import { getSupabaseClient } from "@/lib/supabase"
import { encrypt } from "@/lib/crypto"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`get-auth:${ip}`)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const client = getPlaidClient()
  const supabase = getSupabaseClient()
  if (!client || !supabase) {
    return NextResponse.json({ error: "Plaid o Supabase no están configurados." }, { status: 500 })
  }

  try {
    const { userId } = await req.json()
    const applicationId = String(userId ?? "")
    if (!applicationId) {
      return NextResponse.json({ error: "Falta userId (application_id)." }, { status: 400 })
    }

    const accessToken = await getAccessTokenForApplication(applicationId)
    if (!accessToken) {
      return NextResponse.json({ error: "No hay cuenta bancaria vinculada para esta solicitud." }, { status: 404 })
    }

    const auth = await getAuthData(client, accessToken)

    const { error: dbError } = await supabase
      .from("loan_applications")
      .update({
        plaid_bank_verification_status: "Verified",
        bank_name: auth.institutionName,
        bank_account_number_encrypted: auth.accountNumber ? encrypt(auth.accountNumber) : null,
        bank_routing_number: auth.routingNumber,
        bank_account_type: auth.accountType,
        plaid_account_id: auth.accountId,
        updated_at: new Date().toISOString(),
      })
      .eq("application_id", applicationId)
    if (dbError) throw dbError

    // account/routing numbers are returned once here so the frontend can show a
    // confirmation ("Bank of America — checking ••••1234"); never log them.
    return NextResponse.json({
      ok: true,
      bankName: auth.institutionName,
      accountType: auth.accountType,
      last4: auth.accountNumber ? auth.accountNumber.slice(-4) : null,
    })
  } catch (err) {
    console.error("[v0] Plaid get-auth error:", err)
    return NextResponse.json({ error: "No se pudo obtener la información bancaria." }, { status: 500 })
  }
}

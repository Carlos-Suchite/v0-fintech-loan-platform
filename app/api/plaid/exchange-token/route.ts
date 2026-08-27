import { NextResponse } from "next/server"
import { getPlaidClient, checkRateLimit } from "@/lib/plaid"
import { getSupabaseClient } from "@/lib/supabase"
import { encrypt } from "@/lib/crypto"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`exchange-token:${ip}`)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const client = getPlaidClient()
  if (!client) {
    return NextResponse.json(
      { error: "Plaid no está configurado. Define PLAID_CLIENT_ID y PLAID_SECRET." },
      { status: 500 },
    )
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado. Define SUPABASE_URL y SUPABASE_SERVICE_KEY." },
      { status: 500 },
    )
  }

  try {
    const { public_token, userId } = await req.json()
    const applicationId = String(userId ?? "")
    if (!applicationId) {
      return NextResponse.json({ error: "Falta userId (application_id)." }, { status: 400 })
    }

    const response = await client.itemPublicTokenExchange({ public_token })
    const { access_token: accessToken, item_id: itemId } = response.data

    // access_token never reaches the client — only stored, encrypted, in Supabase.
    const { error: dbError } = await supabase.from("plaid_items").upsert(
      {
        application_id: applicationId,
        item_id: itemId,
        access_token_encrypted: encrypt(accessToken),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "application_id" },
    )
    if (dbError) throw dbError

    await supabase
      .from("loan_applications")
      .update({ status: "bank_linked", updated_at: new Date().toISOString() })
      .eq("application_id", applicationId)

    return NextResponse.json({ ok: true, item_id: itemId })
  } catch (err) {
    console.error("[v0] Plaid exchange-token error:", err)
    return NextResponse.json({ error: "No se pudo intercambiar el token." }, { status: 500 })
  }
}

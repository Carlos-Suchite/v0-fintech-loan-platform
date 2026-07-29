import { NextResponse } from "next/server"
import { Products, CountryCode } from "plaid"
import { getPlaidClient, getOrCreatePlaidUserId, checkRateLimit } from "@/lib/plaid"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`create-link-token:${ip}`)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const client = getPlaidClient()
  if (!client) {
    return NextResponse.json(
      { error: "Plaid no está configurado. Define PLAID_CLIENT_ID y PLAID_SECRET." },
      { status: 500 },
    )
  }

  try {
    const { userId } = await req.json()
    const applicationId = String(userId ?? "")
    if (!applicationId) {
      return NextResponse.json({ error: "Falta userId (application_id)." }, { status: 400 })
    }

    // Stored for later (get-income uses it), but NOT wired into this Link session —
    // see the note below on why income_verification was pulled out.
    await getOrCreatePlaidUserId(client, applicationId)

    // income_verification and identity_verification are deliberately left out of this
    // products list:
    // - identity_verification (KYC/government ID) needs an Identity Verification
    //   template created first in the Plaid Dashboard, and is its own dedicated Link
    //   flow.
    // - income_verification: tested against Plaid Sandbox on 2026-07-27 and it
    //   rejects this Link session with "user_token is required for income_verification
    //   product" — but /user/create for this account (new User API, active for any
    //   account created after Dec 10 2025) only ever returns a `user_id`, never a
    //   `user_token`. That's a real gap in Plaid's current API for new-model accounts,
    //   not a bug here. Income needs its own separate Link flow per
    //   https://plaid.com/docs/income/bank-income/#integration-process — re-test once
    //   Plaid ships user_id support for this product, or follow that separate flow.
    const response = await client.linkTokenCreate({
      user: { client_user_id: applicationId },
      client_name: "Touch of Vintage",
      products: [Products.Auth, Products.Identity],
      country_codes: [CountryCode.Us],
      language: "es",
      redirect_uri: process.env.PLAID_REDIRECT_URI,
    })
    return NextResponse.json({ link_token: response.data.link_token })
  } catch (err) {
    console.error("[v0] Plaid create-link-token error:", err)
    return NextResponse.json({ error: "No se pudo crear el token de enlace." }, { status: 500 })
  }
}

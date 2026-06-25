import { NextResponse } from "next/server"
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from "plaid"

function getClient() {
  const clientId = process.env.PLAID_CLIENT_ID
  const secret = process.env.PLAID_SECRET
  if (!clientId || !secret) return null

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
  return new PlaidApi(config)
}

export async function POST(req: Request) {
  const client = getClient()
  if (!client) {
    return NextResponse.json(
      { error: "Plaid no está configurado. Define PLAID_CLIENT_ID y PLAID_SECRET." },
      { status: 500 },
    )
  }

  try {
    const { userId } = await req.json()
    const response = await client.linkTokenCreate({
      user: { client_user_id: String(userId ?? "anonymous") },
      client_name: "Touch of Vintage",
      products: [Products.Auth],
      country_codes: [CountryCode.Us],
      language: "es",
    })
    return NextResponse.json({ link_token: response.data.link_token })
  } catch (err) {
    console.error("[v0] Plaid create-link-token error:", err)
    return NextResponse.json({ error: "No se pudo crear el token de enlace." }, { status: 500 })
  }
}

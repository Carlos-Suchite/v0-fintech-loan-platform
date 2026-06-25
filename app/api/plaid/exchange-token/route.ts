import { NextResponse } from "next/server"
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"

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
    const { public_token } = await req.json()
    const response = await client.itemPublicTokenExchange({ public_token })
    // In production: persist response.data.access_token securely, scoped to the user.
    // Never expose the access_token to the client.
    return NextResponse.json({ ok: true, item_id: response.data.item_id })
  } catch (err) {
    console.error("[v0] Plaid exchange-token error:", err)
    return NextResponse.json({ error: "No se pudo intercambiar el token." }, { status: 500 })
  }
}

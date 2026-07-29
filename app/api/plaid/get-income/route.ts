import { NextResponse } from "next/server"
import { getPlaidClient, getIncomeData, checkRateLimit } from "@/lib/plaid"
import { getSupabaseClient } from "@/lib/supabase"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`get-income:${ip}`)) {
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

    const { data: application, error: fetchError } = await supabase
      .from("loan_applications")
      .select("plaid_user_id")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application?.plaid_user_id) {
      return NextResponse.json({ error: "No hay cuenta bancaria vinculada para esta solicitud." }, { status: 404 })
    }

    // Bank Income reports can take time to generate after Link — Plaid may return an
    // empty/partial report on the first call and finish asynchronously via the
    // INCOME webhook (see app/api/webhooks/plaid/route.ts). Treat this as best-effort:
    // don't block the rest of the application flow on it.
    let status = "Pending"
    try {
      const income = await getIncomeData(client, application.plaid_user_id)
      status = income.bank_income && income.bank_income.length > 0 ? "Verified" : "Pending"
    } catch (incomeErr) {
      console.error("[v0] Plaid get-income (Bank Income) error, marking Pending:", incomeErr)
      status = "Pending"
    }

    const { error: dbError } = await supabase
      .from("loan_applications")
      .update({ plaid_income_status: status, updated_at: new Date().toISOString() })
      .eq("application_id", applicationId)
    if (dbError) throw dbError

    return NextResponse.json({ ok: true, status })
  } catch (err) {
    console.error("[v0] Plaid get-income error:", err)
    return NextResponse.json({ error: "No se pudo verificar el ingreso." }, { status: 500 })
  }
}

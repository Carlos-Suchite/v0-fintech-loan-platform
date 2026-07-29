import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { createTransfer } from "@/lib/dwolla"
import { checkRateLimit } from "@/lib/plaid"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Staff-triggered, for a loan payment due date. Pulls money from the borrower's
// funding source into TOV's master funding source. Like disburse, this starts
// "pending" — only post it as a LoanDisk Repayment (POST /repayment) once the
// webhook confirms transfer_completed, since ACH debits can still bounce for days
// after appearing to succeed (insufficient funds, closed account, etc).
export async function POST(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`dwolla-collect-repayment:${ip}`, 5)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 })
  }

  const masterFundingSourceUrl = process.env.DWOLLA_MASTER_FUNDING_SOURCE_URL
  if (!masterFundingSourceUrl) {
    return NextResponse.json({ error: "DWOLLA_MASTER_FUNDING_SOURCE_URL no está configurado." }, { status: 500 })
  }

  try {
    const { applicationId, amount, loandiskLoanId } = await req.json()
    if (!applicationId || !amount || Number(amount) <= 0) {
      return NextResponse.json({ error: "Falta applicationId o amount inválido." }, { status: 400 })
    }

    const { data: application, error: fetchError } = await supabase
      .from("loan_applications")
      .select("dwolla_funding_source_url")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application?.dwolla_funding_source_url) {
      return NextResponse.json(
        { error: "Esta solicitud no tiene una fuente de fondos de Dwolla. Llama a /api/dwolla/setup-borrower primero." },
        { status: 400 },
      )
    }

    const transferUrl = await createTransfer(application.dwolla_funding_source_url, masterFundingSourceUrl, Number(amount), applicationId)

    const { error: insertError } = await supabase.from("dwolla_transfers").insert({
      application_id: applicationId,
      loandisk_loan_id: loandiskLoanId ?? null,
      direction: "repayment",
      amount: Number(amount),
      dwolla_transfer_url: transferUrl,
      status: "pending",
    })
    if (insertError) throw insertError

    return NextResponse.json({ ok: true, transferUrl, status: "pending" })
  } catch (err) {
    console.error("[v0] dwolla/collect-repayment error:", err)
    return NextResponse.json({ error: "No se pudo iniciar el cobro." }, { status: 500 })
  }
}

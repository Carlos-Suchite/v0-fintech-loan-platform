import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { collectRepayment } from "@/lib/payliance"
import { checkRateLimit } from "@/lib/plaid"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Staff-triggered, for a loan payment due date. Payliance Debit call against the same
// bank account captured during /apply's Plaid step. Like disburse, a "successful"
// response only means the debit validated and was accepted — ACH debits can still
// bounce for days, so this is never posted to LoanDisk as a Repayment until
// /api/payliance/status (Retrieve) confirms it settled.
export async function POST(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`payliance-collect-repayment:${ip}`, 5)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 })
  }

  try {
    const { applicationId, amount, loandiskLoanId } = await req.json()
    if (!applicationId || !amount || Number(amount) <= 0) {
      return NextResponse.json({ error: "Falta applicationId o amount inválido." }, { status: 400 })
    }

    const { data: application, error: fetchError } = await supabase
      .from("loan_applications")
      .select("first_name, last_name, division, employer, bank_routing_number, bank_account_number_encrypted, bank_account_type")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application?.bank_routing_number || !application?.bank_account_number_encrypted) {
      return NextResponse.json(
        { error: "Esta solicitud no tiene una cuenta bancaria vinculada todavía (falta el paso de Plaid en /apply)." },
        { status: 400 },
      )
    }

    const isBusiness = application.division === "commercial"
    const { uniqueTranId, response } = await collectRepayment({
      applicationId,
      amount: Number(amount),
      bank: {
        routingNumber: application.bank_routing_number,
        accountNumberEncrypted: application.bank_account_number_encrypted,
        accountType: application.bank_account_type === "Savings" ? "savings" : "checking",
        isBusiness,
        firstName: application.first_name ?? "",
        lastName: application.last_name ?? "",
        companyName: isBusiness ? application.employer : null,
      },
    })

    if (!response.successful) {
      return NextResponse.json({ error: `Payliance rechazó la transacción: ${response.message}` }, { status: 400 })
    }

    const { error: insertError } = await supabase.from("payliance_transfers").insert({
      application_id: applicationId,
      loandisk_loan_id: loandiskLoanId ?? null,
      direction: "repayment",
      amount: Number(amount),
      unique_tran_id: uniqueTranId,
      authorization_id: response.AuthorizationId,
      status: "pending",
    })
    if (insertError) throw insertError

    return NextResponse.json({ ok: true, uniqueTranId, authorizationId: response.AuthorizationId, status: "pending" })
  } catch (err) {
    console.error("[v0] payliance/collect-repayment error:", err)
    return NextResponse.json({ error: "No se pudo iniciar el cobro." }, { status: 500 })
  }
}

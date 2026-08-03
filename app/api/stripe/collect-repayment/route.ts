import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { collectRepayment } from "@/lib/stripe"
import { checkRateLimit } from "@/lib/plaid"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Staff-triggered, for a loan payment due date. Charges the borrower's linked bank
// account via ACH debit. Like disburse, this starts "pending" — only post it as a
// LoanDisk Repayment (POST /repayment) once the webhook confirms
// payment_intent.succeeded, since ACH debits can still bounce for days after appearing
// to succeed (insufficient funds, closed account, etc).
export async function POST(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`stripe-collect-repayment:${ip}`, 5)) {
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
      .select("stripe_customer_id, stripe_repayment_payment_method_id")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application?.stripe_customer_id || !application?.stripe_repayment_payment_method_id) {
      return NextResponse.json(
        { error: "Esta solicitud no tiene una cuenta bancaria de cobro vinculada en Stripe todavía." },
        { status: 400 },
      )
    }

    const paymentIntentId = await collectRepayment(
      application.stripe_customer_id,
      application.stripe_repayment_payment_method_id,
      Number(amount),
      applicationId,
    )

    const { error: insertError } = await supabase.from("stripe_transfers").insert({
      application_id: applicationId,
      loandisk_loan_id: loandiskLoanId ?? null,
      direction: "repayment",
      amount: Number(amount),
      stripe_object_id: paymentIntentId,
      status: "pending",
    })
    if (insertError) throw insertError

    return NextResponse.json({ ok: true, paymentIntentId, status: "pending" })
  } catch (err) {
    console.error("[v0] stripe/collect-repayment error:", err)
    return NextResponse.json({ error: "No se pudo iniciar el cobro." }, { status: 500 })
  }
}

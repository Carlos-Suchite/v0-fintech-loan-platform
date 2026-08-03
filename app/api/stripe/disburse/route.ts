import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { disburseToConnectAccount } from "@/lib/stripe"
import { checkRateLimit } from "@/lib/plaid"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Staff-triggered, after the loan is approved in LoanDisk. Transfers platform balance
// into the borrower's Connect Custom account and pays it out to their bank — starts
// "pending" and only becomes final once app/api/webhooks/stripe/route.ts receives
// payout.paid (or payout.failed).
export async function POST(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`stripe-disburse:${ip}`, 5)) {
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
      .select("stripe_connect_account_id")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application?.stripe_connect_account_id) {
      return NextResponse.json(
        { error: "Esta solicitud no tiene una cuenta de Stripe. Llama a /api/stripe/setup-borrower primero." },
        { status: 400 },
      )
    }

    const payoutId = await disburseToConnectAccount(application.stripe_connect_account_id, Number(amount), applicationId)

    const { error: insertError } = await supabase.from("stripe_transfers").insert({
      application_id: applicationId,
      loandisk_loan_id: loandiskLoanId ?? null,
      direction: "disbursement",
      amount: Number(amount),
      stripe_object_id: payoutId,
      status: "pending",
    })
    if (insertError) throw insertError

    return NextResponse.json({ ok: true, payoutId, status: "pending" })
  } catch (err) {
    console.error("[v0] stripe/disburse error:", err)
    return NextResponse.json({ error: "No se pudo iniciar el desembolso." }, { status: 500 })
  }
}

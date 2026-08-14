import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { retrieveTransaction } from "@/lib/payliance"
import { createRepayment } from "@/lib/loandisk"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Payliance has no webhook mechanism (confirmed against both API reference docs) —
// unlike Stripe, status only ever changes by polling Retrieve. Staff clicks "Verificar
// estado" in /admin/payliance for a pending transfer, which calls this. Status: 0 Not
// found, 1 Invalidated, 2 Pending, 4 Sent to bank, 8 Returned, 16 Settled,
// 24 Settled then Returned, 32 Voided.
function mapStatus(paylianceStatus: number): "pending" | "processed" | "failed" | "cancelled" {
  if (paylianceStatus === 16) return "processed"
  if (paylianceStatus === 32) return "cancelled"
  if (paylianceStatus === 1 || paylianceStatus === 8 || paylianceStatus === 24) return "failed"
  return "pending"
}

export async function POST(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 })
  }

  try {
    const { uniqueTranId } = await req.json()
    if (!uniqueTranId) {
      return NextResponse.json({ error: "Falta uniqueTranId." }, { status: 400 })
    }

    const { data: transfer, error: fetchError } = await supabase
      .from("payliance_transfers")
      .select("id, application_id, unique_tran_id, direction, amount, status, loandisk_loan_id, loandisk_repayment_id")
      .eq("unique_tran_id", uniqueTranId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!transfer) {
      return NextResponse.json({ error: "Transferencia no encontrada." }, { status: 404 })
    }

    const result = await retrieveTransaction(transfer.unique_tran_id)
    if (!result.successful) {
      return NextResponse.json({ error: `Payliance: ${result.message}` }, { status: 400 })
    }

    const newStatus = mapStatus(result.Status)
    await supabase
      .from("payliance_transfers")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", transfer.id)

    // Only post to LoanDisk once the repayment is truly settled — never on "pending" or
    // "sent to bank", since ACH debits can still bounce for days. Guarded by
    // loandisk_repayment_id so re-checking an already-posted transfer doesn't double-post.
    let loandiskRepaymentId: string | null = transfer.loandisk_repayment_id
    if (newStatus === "processed" && transfer.direction === "repayment" && transfer.loandisk_loan_id && !loandiskRepaymentId) {
      const { data: application } = await supabase
        .from("loan_applications")
        .select("division")
        .eq("application_id", transfer.application_id)
        .maybeSingle()

      const { repaymentId } = await createRepayment({
        loanId: transfer.loandisk_loan_id,
        division: (application?.division as "consumer" | "commercial" | null) ?? null,
        amount: transfer.amount,
        collectedDate: new Date(),
      })
      loandiskRepaymentId = repaymentId
      await supabase
        .from("payliance_transfers")
        .update({ loandisk_repayment_id: repaymentId, updated_at: new Date().toISOString() })
        .eq("id", transfer.id)
    }

    return NextResponse.json({ ok: true, status: newStatus, returnCode: result.ReturnCode, loandiskRepaymentId })
  } catch (err) {
    console.error("[v0] payliance/status error:", err)
    return NextResponse.json({ error: "No se pudo verificar el estado." }, { status: 500 })
  }
}

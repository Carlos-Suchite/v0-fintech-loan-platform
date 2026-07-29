import { NextResponse } from "next/server"
import { createHmac, timingSafeEqual } from "crypto"
import { getSupabaseClient } from "@/lib/supabase"
import { createRepayment } from "@/lib/loandisk"

// Verified against developers.dwolla.com (2026-07-28): Dwolla signs the raw JSON body
// with HMAC-SHA256, keyed by the webhook subscription's secret, sent in the
// X-Request-Signature-SHA-256 header as a hex digest. The secret is set when creating
// the webhook subscription (Dashboard → Developers → Webhooks, or POST
// /webhook-subscriptions) — NOT the same as DWOLLA_SECRET (the API client secret).
function isValidSignature(rawBody: string, signatureHeader: string | null): boolean {
  const webhookSecret = process.env.DWOLLA_WEBHOOK_SECRET
  if (!webhookSecret || !signatureHeader) return false

  const expected = createHmac("sha256", webhookSecret).update(rawBody).digest("hex")
  const expectedBuf = Buffer.from(expected, "hex")
  const receivedBuf = Buffer.from(signatureHeader, "hex")
  if (expectedBuf.length !== receivedBuf.length) return false
  return timingSafeEqual(expectedBuf, receivedBuf)
}

export async function POST(req: Request) {
  const signatureHeader = req.headers.get("x-request-signature-sha256")
  const rawBody = await req.text()

  if (!isValidSignature(rawBody, signatureHeader)) {
    return NextResponse.json({ error: "Firma de webhook inválida." }, { status: 401 })
  }

  const event = JSON.parse(rawBody)
  console.log("[v0] Dwolla webhook:", event.topic, event.resourceId)

  const supabase = getSupabaseClient()
  if (!supabase) return NextResponse.json({ ok: true })

  await supabase.from("dwolla_webhook_events").insert({
    topic: event.topic ?? null,
    resource_id: event.resourceId ?? null,
    payload: event,
  })

  // NOTE: exact topic names unverified against a live webhook delivery (requires a
  // publicly reachable URL — can't be tested from localhost). Matching by substring
  // rather than exact equality to catch both the plain (transfer_completed) and
  // Customer-scoped (customer_transfer_completed) variants Dwolla may send depending
  // on whether the transfer touches a Customer funding source. Re-verify against a
  // real received payload once this is deployed and a webhook subscription exists.
  const topic: string = event.topic ?? ""
  const transferUrl: string | undefined = event._links?.resource?.href
  if (!transferUrl) return NextResponse.json({ ok: true })

  let newStatus: string | null = null
  if (topic.includes("transfer_completed")) newStatus = "processed"
  else if (topic.includes("transfer_failed")) newStatus = "failed"
  else if (topic.includes("transfer_cancelled")) newStatus = "cancelled"

  if (newStatus) {
    const { data: transferRow, error: fetchError } = await supabase
      .from("dwolla_transfers")
      .select("id, direction, application_id, amount, loandisk_loan_id, loandisk_repayment_id")
      .eq("dwolla_transfer_url", transferUrl)
      .maybeSingle()
    if (fetchError) throw fetchError

    if (transferRow) {
      await supabase
        .from("dwolla_transfers")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", transferRow.id)

      // Only post to LoanDisk once the repayment is truly final — never on "pending",
      // since ACH debits can still bounce for days after appearing to succeed. Guarded
      // by loandisk_repayment_id so a duplicate webhook delivery (Dwolla can send the
      // same event more than once) doesn't double-post the same repayment.
      if (
        newStatus === "processed" &&
        transferRow.direction === "repayment" &&
        transferRow.loandisk_loan_id &&
        !transferRow.loandisk_repayment_id
      ) {
        const { data: application } = await supabase
          .from("loan_applications")
          .select("division")
          .eq("application_id", transferRow.application_id)
          .maybeSingle()

        try {
          const { repaymentId } = await createRepayment({
            loanId: transferRow.loandisk_loan_id,
            division: (application?.division as "consumer" | "commercial" | null) ?? null,
            amount: transferRow.amount,
            collectedDate: new Date(),
          })
          await supabase
            .from("dwolla_transfers")
            .update({ loandisk_repayment_id: repaymentId, updated_at: new Date().toISOString() })
            .eq("id", transferRow.id)
        } catch (loanDiskErr) {
          // Don't fail the webhook response over this — Dwolla retries failed webhook
          // deliveries, which would be wrong here (the transfer status update above
          // already succeeded). Log loudly so it's caught in review; loandisk_repayment_id
          // staying null is itself the marker that this still needs to be posted.
          console.error("[v0] Failed to post repayment to LoanDisk:", loanDiskErr)
        }
      }
    }
  }

  return NextResponse.json({ ok: true })
}

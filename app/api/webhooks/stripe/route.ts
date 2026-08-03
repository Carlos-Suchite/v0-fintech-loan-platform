import { NextResponse } from "next/server"
import { getStripeClient } from "@/lib/stripe"
import { getSupabaseClient } from "@/lib/supabase"
import { createRepayment } from "@/lib/loandisk"

// Stripe signs the raw body with the webhook endpoint's signing secret (shown once when
// creating the endpoint at Dashboard → Developers → Webhooks) — verified via
// stripe.webhooks.constructEvent, Stripe's own standard helper (unlike Dwolla, which
// needed a hand-rolled HMAC check).
//
// IMPORTANT: payout events (payout.paid, payout.failed) happen on the borrower's Connect
// Custom account, not the platform account — this endpoint only receives them if
// "Listen for events on Connected accounts" is turned on when creating the webhook
// endpoint in the Dashboard. When that's on, Stripe includes `account: <connected
// account id>` on the event. payment_intent.* events for repayments are plain
// platform-account events (no `account` field) since those PaymentIntents are created
// directly on the platform account. Re-verify both against a real test-mode delivery
// once this is deployed — unconfirmed against a live payload as of 2026-08-01.
export async function POST(req: Request) {
  const stripe = getStripeClient()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const supabase = getSupabaseClient()
  if (!stripe || !webhookSecret || !supabase) {
    return NextResponse.json({ error: "Stripe o Supabase no están configurados." }, { status: 500 })
  }

  const signature = req.headers.get("stripe-signature")
  const rawBody = await req.text()

  let event: ReturnType<typeof stripe.webhooks.constructEvent>
  try {
    if (!signature) throw new Error("Falta la firma del webhook.")
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error("[v0] Stripe webhook signature verification failed:", err)
    return NextResponse.json({ error: "Firma de webhook inválida." }, { status: 401 })
  }

  console.log("[v0] Stripe webhook:", event.type, event.data.object && (event.data.object as { id?: string }).id)

  await supabase.from("stripe_webhook_events").insert({
    type: event.type,
    object_id: (event.data.object as { id?: string })?.id ?? null,
    payload: event as unknown as Record<string, unknown>,
  })

  const object = event.data.object as { id: string }
  let newStatus: string | null = null
  if (event.type === "payout.paid" || event.type === "payment_intent.succeeded") newStatus = "processed"
  else if (event.type === "payout.failed" || event.type === "payment_intent.payment_failed") newStatus = "failed"
  else if (event.type === "payout.canceled") newStatus = "cancelled"

  if (newStatus) {
    const { data: transferRow, error: fetchError } = await supabase
      .from("stripe_transfers")
      .select("id, direction, application_id, amount, loandisk_loan_id, loandisk_repayment_id")
      .eq("stripe_object_id", object.id)
      .maybeSingle()
    if (fetchError) throw fetchError

    if (transferRow) {
      await supabase
        .from("stripe_transfers")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", transferRow.id)

      // Only post to LoanDisk once the repayment is truly final — never on "pending",
      // since ACH debits can still bounce for days after appearing to succeed. Guarded
      // by loandisk_repayment_id so a duplicate webhook delivery (Stripe can send the
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
            .from("stripe_transfers")
            .update({ loandisk_repayment_id: repaymentId, updated_at: new Date().toISOString() })
            .eq("id", transferRow.id)
        } catch (loanDiskErr) {
          // Don't fail the webhook response over this — Stripe retries failed webhook
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

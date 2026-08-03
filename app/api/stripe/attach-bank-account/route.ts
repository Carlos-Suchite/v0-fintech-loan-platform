import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { attachRepaymentPaymentMethod, setPayoutBankAccount } from "@/lib/stripe"
import { checkRateLimit } from "@/lib/plaid"

// Borrower-facing, called from /apply right after each Financial Connections
// collection step succeeds client-side. `kind` distinguishes which of the two halves
// (see create-fc-session) just completed — they're different Stripe object types:
// `paymentMethodId` is a PaymentMethod id for "repayment" (stored directly on the
// platform Customer), but a bank_account TOKEN id for "payout" (set directly as the
// Connect account's external_account — collectBankAccountToken returns a token, not a
// PaymentMethod, see lib/stripe.ts setPayoutBankAccount).
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`stripe-attach-bank-account:${ip}`)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 })
  }

  try {
    const { applicationId, kind, paymentMethodId } = await req.json()
    if (!applicationId || !paymentMethodId || (kind !== "repayment" && kind !== "payout")) {
      return NextResponse.json({ error: "Falta applicationId, paymentMethodId, o kind inválido." }, { status: 400 })
    }

    if (kind === "repayment") {
      await attachRepaymentPaymentMethod(applicationId, paymentMethodId)
    } else {
      const { data: application, error: fetchError } = await supabase
        .from("loan_applications")
        .select("stripe_connect_account_id")
        .eq("application_id", applicationId)
        .maybeSingle()
      if (fetchError) throw fetchError
      if (!application?.stripe_connect_account_id) {
        return NextResponse.json({ error: "Esta solicitud no tiene una cuenta de Stripe todavía." }, { status: 400 })
      }
      await setPayoutBankAccount(application.stripe_connect_account_id, paymentMethodId)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[v0] stripe/attach-bank-account error:", err)
    return NextResponse.json({ error: "No se pudo guardar la cuenta bancaria." }, { status: 500 })
  }
}

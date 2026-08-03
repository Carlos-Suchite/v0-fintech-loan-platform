"use client"

import { useState } from "react"
import { loadStripe, type Stripe } from "@stripe/stripe-js"
import { Landmark, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Links the borrower's bank account TWICE with Stripe — once for repayment collection
// (a PaymentMethod on the platform Customer) and once for the disbursement payout
// destination (the external_account on their own Connect Custom account). These are two
// genuinely different Stripe flows, confirmed live against the real API (2026-08-01):
//
// - Repayment: `collectBankAccountForSetup` + `confirmUsBankAccountSetup` against a
//   SetupIntent on the platform Customer — produces a reusable PaymentMethod.
// - Payout: `collectBankAccountToken` against a Financial Connections Session created
//   with `account_holder: { type: "account", account: connectAccountId }` — produces a
//   bank_account TOKEN directly, no PaymentMethod/conversion step. An earlier
//   SetupIntent-based attempt for this half (mirroring the repayment flow) looked
//   plausible from docs but failed live every way the `customer` param was placed
//   ("No such PaymentMethod") — collectBankAccountToken is what Stripe's own docs name
//   as the correct method for linking a Connect account's own payout bank account.

type SubStepStatus = "idle" | "collecting" | "done" | "error"

interface Props {
  applicationId: string
  firstName: string
  lastName: string
  email: string
  onComplete: () => void
}

export default function StripeBankConnect({ applicationId, firstName, lastName, email, onComplete }: Props) {
  const [repaymentStatus, setRepaymentStatus] = useState<SubStepStatus>("idle")
  const [payoutStatus, setPayoutStatus] = useState<SubStepStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [running, setRunning] = useState(false)

  const billingDetails = { name: `${firstName} ${lastName}`.trim() || "—", email: email || undefined }

  const collectOne = async (stripe: Stripe, clientSecret: string) => {
    const { setupIntent, error: collectError } = await stripe.collectBankAccountForSetup({
      clientSecret,
      params: { payment_method_type: "us_bank_account", payment_method_data: { billing_details: billingDetails } },
      expand: ["payment_method"],
    })
    if (collectError) throw new Error(collectError.message)
    if (!setupIntent) throw new Error("Stripe no devolvió un setupIntent.")

    if (setupIntent.status === "requires_confirmation") {
      const { setupIntent: confirmed, error: confirmError } = await stripe.confirmUsBankAccountSetup(clientSecret)
      if (confirmError) throw new Error(confirmError.message)
      if (!confirmed || confirmed.status !== "succeeded") throw new Error("No se pudo confirmar la cuenta bancaria.")
      const paymentMethod = confirmed.payment_method
      const paymentMethodId = typeof paymentMethod === "string" ? paymentMethod : paymentMethod?.id
      if (!paymentMethodId) throw new Error("Stripe no devolvió el ID del método de pago.")
      return paymentMethodId
    }

    if (setupIntent.status === "succeeded") {
      const paymentMethod = setupIntent.payment_method
      const paymentMethodId = typeof paymentMethod === "string" ? paymentMethod : paymentMethod?.id
      if (!paymentMethodId) throw new Error("Stripe no devolvió el ID del método de pago.")
      return paymentMethodId
    }

    throw new Error(`Estado inesperado de Stripe: ${setupIntent.status}`)
  }

  const handleConnect = async () => {
    setRunning(true)
    setError(null)
    try {
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      if (!publishableKey) throw new Error("Stripe no está configurado (falta la llave pública).")

      const sessionRes = await fetch("/api/stripe/create-fc-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      })
      const session = await sessionRes.json()
      if (!sessionRes.ok) throw new Error(session.error ?? "No se pudo iniciar la conexión con Stripe.")

      // Repayment half: platform-account Stripe.js instance, no stripeAccount scoping.
      setRepaymentStatus("collecting")
      const platformStripe = await loadStripe(publishableKey)
      if (!platformStripe) throw new Error("No se pudo cargar Stripe.js.")
      const repaymentPaymentMethodId = await collectOne(platformStripe, session.repaymentClientSecret)
      await fetch("/api/stripe/attach-bank-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, kind: "repayment", paymentMethodId: repaymentPaymentMethodId }),
      })
      setRepaymentStatus("done")

      // Payout half: the Financial Connections Session already names the target
      // connected account via account_holder.account (set server-side), so this uses
      // the same platform Stripe.js instance — no `stripeAccount` scoping needed here.
      setPayoutStatus("collecting")
      const { token, error: tokenError } = await platformStripe.collectBankAccountToken({
        clientSecret: session.payoutClientSecret,
      })
      if (tokenError) throw new Error(tokenError.message)
      if (!token) throw new Error("Stripe no devolvió un token de cuenta bancaria.")
      await fetch("/api/stripe/attach-bank-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, kind: "payout", paymentMethodId: token.id }),
      })
      setPayoutStatus("done")

      onComplete()
    } catch (err) {
      console.error("Error connecting Stripe bank accounts:", err)
      setError(err instanceof Error ? err.message : "No se pudo conectar la cuenta bancaria con Stripe.")
      if (repaymentStatus !== "done") setRepaymentStatus("error")
      else setPayoutStatus("error")
    } finally {
      setRunning(false)
    }
  }

  const bothDone = repaymentStatus === "done" && payoutStatus === "done"

  if (bothDone) {
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-sm font-medium text-green-800">Cuenta bancaria conectada para pagos y desembolsos.</p>
      </div>
    )
  }

  return (
    <div className="bg-muted border border-border rounded-xl p-6 flex flex-col items-center text-center gap-4">
      <div className="w-full max-w-sm space-y-2 text-left text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          {repaymentStatus === "done" ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          ) : repaymentStatus === "collecting" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--brand-orange)]" />
          ) : (
            <Landmark className="w-3.5 h-3.5" />
          )}
          Cuenta para tus pagos mensuales
        </p>
        <p className="flex items-center gap-1.5">
          {payoutStatus === "done" ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          ) : payoutStatus === "collecting" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--brand-orange)]" />
          ) : (
            <Landmark className="w-3.5 h-3.5" />
          )}
          Cuenta para recibir tu préstamo
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="w-full max-w-sm">
        <Button
          type="button"
          onClick={handleConnect}
          disabled={running}
          className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)] py-6 text-base font-semibold"
        >
          {running ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Conectando con Stripe...
            </>
          ) : (
            <>
              <Landmark className="w-5 h-5 mr-2" />
              {error ? "Reintentar conexión bancaria" : "Conectar cuenta bancaria con Stripe"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

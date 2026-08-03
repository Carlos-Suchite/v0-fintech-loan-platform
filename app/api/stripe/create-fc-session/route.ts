import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { getOrCreateStripeIds, createRepaymentSetupIntent, createPayoutFcSession } from "@/lib/stripe"
import { checkRateLimit } from "@/lib/plaid"

// Borrower-facing, called from /apply right after the applicant fills in their
// personal info (name/address/DOB/SSN — all required to create the Stripe objects).
// Creates the Customer + Connect Custom account if they don't exist yet, then returns
// TWO client_secrets: one for linking the repayment-charging bank account (platform
// Customer), one for linking the disbursement payout bank account (the borrower's own
// Connect account, scoped via connectAccountId — the frontend must init Stripe.js with
// `{ stripeAccount: connectAccountId }` before using the payout client_secret).
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`stripe-create-fc-session:${ip}`)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 })
  }

  try {
    const { applicationId } = await req.json()
    if (!applicationId) {
      return NextResponse.json({ error: "Falta applicationId." }, { status: 400 })
    }

    const { data: application, error: fetchError } = await supabase
      .from("loan_applications")
      .select("first_name, last_name, email, phone, address, city, state, postal_code, date_of_birth, ssn_last4")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application) {
      return NextResponse.json({ error: "No se encontró la solicitud." }, { status: 404 })
    }
    if (!application.date_of_birth || !application.ssn_last4 || !application.city || !application.state || !application.postal_code) {
      return NextResponse.json(
        { error: "Completa tus datos personales (dirección, fecha de nacimiento, SSN) antes de conectar tu banco." },
        { status: 400 },
      )
    }

    const { customerId, connectAccountId } = await getOrCreateStripeIds(applicationId, {
      firstName: application.first_name,
      lastName: application.last_name,
      email: application.email,
      phone: application.phone,
      address1: application.address,
      city: application.city,
      state: application.state,
      postalCode: application.postal_code,
      dateOfBirth: application.date_of_birth,
      ssnLast4: application.ssn_last4,
    })

    const [repaymentClientSecret, payoutClientSecret] = await Promise.all([
      createRepaymentSetupIntent(customerId),
      createPayoutFcSession(connectAccountId),
    ])

    return NextResponse.json({ ok: true, connectAccountId, repaymentClientSecret, payoutClientSecret })
  } catch (err) {
    console.error("[v0] stripe/create-fc-session error:", err)
    return NextResponse.json({ error: "No se pudo iniciar la conexión bancaria con Stripe." }, { status: 500 })
  }
}

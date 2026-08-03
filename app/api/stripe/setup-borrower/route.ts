import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { getOrCreateStripeIds } from "@/lib/stripe"
import { checkRateLimit } from "@/lib/plaid"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Staff-triggered: call this once a loan is approved and ready to be disbursed, NOT
// automatically for every /apply submission — it creates real Stripe Customer +
// Connect Custom account records. This only creates the two Stripe objects; the
// borrower still has to link their bank via Financial Connections in /apply before
// either money-movement endpoint (disburse/collect-repayment) will work.
export async function POST(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`stripe-setup-borrower:${ip}`, 10)) {
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
        { error: "Faltan datos requeridos (fecha de nacimiento, SSN, o dirección completa) para crear la cuenta en Stripe." },
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

    return NextResponse.json({ ok: true, customerId, connectAccountId })
  } catch (err) {
    console.error("[v0] stripe/setup-borrower error:", err)
    return NextResponse.json({ error: "No se pudo preparar la cuenta de Stripe del prestatario." }, { status: 500 })
  }
}

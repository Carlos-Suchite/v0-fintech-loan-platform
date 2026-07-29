import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { getOrCreateFundingSource } from "@/lib/dwolla"
import { getAccessTokenForApplication, checkRateLimit } from "@/lib/plaid"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Staff-triggered: call this once a loan is approved and ready to be disbursed, NOT
// automatically for every /apply submission — it creates a real Dwolla Customer record.
export async function POST(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`dwolla-setup-borrower:${ip}`, 10)) {
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
      .select("first_name, last_name, email, phone, address, city, state, postal_code, date_of_birth, ssn_last4, ssn_encrypted, plaid_account_id")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application) {
      return NextResponse.json({ error: "No se encontró la solicitud." }, { status: 404 })
    }
    if (!application.plaid_account_id) {
      return NextResponse.json(
        { error: "Esta solicitud no tiene una cuenta bancaria verificada por Plaid todavía." },
        { status: 400 },
      )
    }
    if (!application.date_of_birth || !application.ssn_last4 || !application.city || !application.state || !application.postal_code) {
      return NextResponse.json(
        { error: "Faltan datos requeridos (fecha de nacimiento, SSN, o dirección completa) para verificar la identidad en Dwolla." },
        { status: 400 },
      )
    }

    const accessToken = await getAccessTokenForApplication(applicationId)
    if (!accessToken) {
      return NextResponse.json({ error: "No hay cuenta bancaria vinculada para esta solicitud." }, { status: 404 })
    }

    const { customerUrl, fundingSourceUrl } = await getOrCreateFundingSource(applicationId, {
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
      ssnEncrypted: application.ssn_encrypted,
      plaidAccessToken: accessToken,
      plaidAccountId: application.plaid_account_id,
    })

    return NextResponse.json({ ok: true, customerUrl, fundingSourceUrl })
  } catch (err) {
    console.error("[v0] dwolla/setup-borrower error:", err)
    return NextResponse.json({ error: "No se pudo preparar la cuenta de Dwolla del prestatario." }, { status: 500 })
  }
}

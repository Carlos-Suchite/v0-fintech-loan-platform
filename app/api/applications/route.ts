import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { encrypt } from "@/lib/crypto"

// Persists the loan application form (steps 1-3 of /apply) as a pending record.
// Called when the applicant reaches the "Bank Verification" step, so that a stable
// application_id exists before create-link-token/exchange-token need to reference it.
export async function POST(req: Request) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado. Define SUPABASE_URL y SUPABASE_SERVICE_KEY." },
      { status: 500 },
    )
  }

  try {
    const body = await req.json()
    const applicationId = String(body.applicationId ?? "")
    if (!applicationId) {
      return NextResponse.json({ error: "Falta applicationId." }, { status: 400 })
    }

    // Full SSN required by FL Chapter 516 — encrypted at rest (same AES-256-GCM
    // pattern as bank account numbers, see lib/crypto.ts), never logged. Only the
    // last 4 digits are kept in plaintext, derived here rather than trusting the
    // client to compute them correctly.
    const ssn: string | undefined = body.ssn
    const ssnDigits = ssn ? ssn.replace(/\D/g, "") : ""

    const { error } = await supabase.from("loan_applications").upsert(
      {
        application_id: applicationId,
        division: body.division ?? null,
        product_name: body.productName ?? null,
        referrer_email: body.referrerEmail ?? null,
        first_name: body.firstName ?? null,
        last_name: body.lastName ?? null,
        email: body.email ?? null,
        phone: body.phone ?? null,
        address: body.address ?? null,
        city: body.city ?? null,
        state: body.state ?? null,
        postal_code: body.postalCode ?? null,
        date_of_birth: body.dateOfBirth ?? null,
        ssn_last4: ssnDigits ? ssnDigits.slice(-4) : null,
        ssn_encrypted: ssnDigits ? encrypt(ssnDigits) : null,
        employment_status: body.employmentStatus ?? null,
        employer: body.employer ?? null,
        job_title: body.jobTitle ?? null,
        monthly_income: body.monthlyIncome ?? null,
        loan_amount: body.loanAmount ?? null,
        loan_term: body.loanTerm ?? null,
        loan_purpose: body.loanPurpose ?? null,
        notes: body.notes ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "application_id" },
    )
    if (error) throw error

    return NextResponse.json({ ok: true, applicationId })
  } catch (err) {
    console.error("[v0] /api/applications error:", err)
    return NextResponse.json({ error: "No se pudo guardar la solicitud." }, { status: 500 })
  }
}

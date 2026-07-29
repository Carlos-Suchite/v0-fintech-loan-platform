import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { createBorrower } from "@/lib/loandisk"
import { checkRateLimit } from "@/lib/plaid"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`send-to-loandisk:${ip}`, 5)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 })
  }

  try {
    const { userId } = await req.json()
    const applicationId = String(userId ?? "")
    if (!applicationId) {
      return NextResponse.json({ error: "Falta userId (application_id)." }, { status: 400 })
    }

    const { data: application, error: fetchError } = await supabase
      .from("loan_applications")
      .select("*")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError
    if (!application) {
      return NextResponse.json({ error: "No se encontró la solicitud." }, { status: 404 })
    }

    // Only 2 of the fields from PROJECT_STATE_HANDOFF.md §5f are real LoanDisk custom
    // fields (confirmed against the live API docs) — the ACH bank-detail fields are
    // fill-in blanks on the document template, not pushed via this API. See lib/loandisk.ts.
    const { borrowerId } = await createBorrower({
      firstName: application.first_name,
      lastName: application.last_name,
      email: application.email,
      phone: application.phone,
      address: application.address,
      city: application.city,
      state: application.state,
      postalCode: application.postal_code,
      dateOfBirth: application.date_of_birth,
      division: (application.division as "consumer" | "commercial" | null) ?? null,
      plaidIdentityStatus: application.plaid_identity_status ?? "Pending",
      plaidBankVerificationStatus: application.plaid_bank_verification_status ?? "Pending",
      productName: application.product_name ?? null,
      referrerEmail: application.referrer_email ?? null,
    })

    const { error: dbError } = await supabase
      .from("loan_applications")
      .update({
        status: "submitted",
        loandisk_borrower_id: borrowerId,
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("application_id", applicationId)
    if (dbError) throw dbError

    return NextResponse.json({ ok: true, borrowerId })
  } catch (err) {
    console.error("[v0] send-to-loandisk error:", err)
    return NextResponse.json({ error: "No se pudo enviar la solicitud a LoanDisk." }, { status: 500 })
  }
}

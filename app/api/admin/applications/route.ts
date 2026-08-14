import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { isStaffAuthenticated } from "@/lib/staff-auth"

// Lists applications for the staff panel picker. Deliberately excludes every sensitive
// column (ssn_encrypted, bank_account_number_encrypted, plaid tokens, etc.) — only
// what staff need to identify the right applicant and see their Payliance readiness.
// `bank_linked` is a boolean derived from bank_account_number_encrypted so this route
// never has to return the encrypted value itself.
export async function GET(req: Request) {
  if (!isStaffAuthenticated(req)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no está configurado." }, { status: 500 })
  }

  const { data, error } = await supabase
    .from("loan_applications")
    .select(
      "application_id, first_name, last_name, division, product_name, loan_amount, status, loandisk_borrower_id, bank_account_number_encrypted, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    console.error("[v0] /api/admin/applications error:", error)
    return NextResponse.json({ error: "No se pudieron cargar las solicitudes." }, { status: 500 })
  }

  const applications = data.map(({ bank_account_number_encrypted, ...rest }) => ({
    ...rest,
    bank_linked: Boolean(bank_account_number_encrypted),
  }))

  return NextResponse.json({ ok: true, applications })
}

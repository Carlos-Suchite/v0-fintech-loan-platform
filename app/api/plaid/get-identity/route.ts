import { NextResponse } from "next/server"
import { getPlaidClient, getIdentityData, getAccessTokenForApplication, checkRateLimit } from "@/lib/plaid"
import { getSupabaseClient } from "@/lib/supabase"

function normalize(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase()
}

// Simple containment match: does any Plaid-reported name contain the applicant's
// last name (and vice versa)? Good enough to flag obvious mismatches for manual
// review — this is not a fraud-detection system, just a first-pass signal.
function namesLikelyMatch(applicantFullName: string, plaidNames: string[]) {
  const applicant = normalize(applicantFullName)
  if (!applicant) return false
  return plaidNames.some((name) => {
    const n = normalize(name)
    return n.includes(applicant) || applicant.includes(n) || n.split(" ").some((part) => applicant.includes(part))
  })
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  if (!checkRateLimit(`get-identity:${ip}`)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." }, { status: 429 })
  }

  const client = getPlaidClient()
  const supabase = getSupabaseClient()
  if (!client || !supabase) {
    return NextResponse.json({ error: "Plaid o Supabase no están configurados." }, { status: 500 })
  }

  try {
    const { userId } = await req.json()
    const applicationId = String(userId ?? "")
    if (!applicationId) {
      return NextResponse.json({ error: "Falta userId (application_id)." }, { status: 400 })
    }

    const accessToken = await getAccessTokenForApplication(applicationId)
    if (!accessToken) {
      return NextResponse.json({ error: "No hay cuenta bancaria vinculada para esta solicitud." }, { status: 404 })
    }

    const { data: application, error: fetchError } = await supabase
      .from("loan_applications")
      .select("first_name, last_name, email")
      .eq("application_id", applicationId)
      .maybeSingle()
    if (fetchError) throw fetchError

    const identity = await getIdentityData(client, accessToken)
    const applicantFullName = `${application?.first_name ?? ""} ${application?.last_name ?? ""}`.trim()
    const status = namesLikelyMatch(applicantFullName, identity.names) ? "Verified" : "Mismatch"

    const { error: dbError } = await supabase
      .from("loan_applications")
      .update({ plaid_identity_status: status, updated_at: new Date().toISOString() })
      .eq("application_id", applicationId)
    if (dbError) throw dbError

    return NextResponse.json({ ok: true, status })
  } catch (err) {
    console.error("[v0] Plaid get-identity error:", err)
    return NextResponse.json({ error: "No se pudo verificar la identidad." }, { status: 500 })
  }
}

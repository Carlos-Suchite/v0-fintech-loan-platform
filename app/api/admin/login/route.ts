import { NextResponse } from "next/server"
import { checkStaffPassword, createStaffSessionToken, STAFF_SESSION_COOKIE } from "@/lib/staff-auth"
import { checkRateLimit } from "@/lib/plaid"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  // Tighter limit than other endpoints — this one exists specifically to be guessed at.
  if (!checkRateLimit(`admin-login:${ip}`, 5, 5 * 60_000)) {
    return NextResponse.json({ error: "Demasiados intentos. Intenta de nuevo en unos minutos." }, { status: 429 })
  }

  const { password } = await req.json().catch(() => ({ password: "" }))
  if (!checkStaffPassword(String(password ?? ""))) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(STAFF_SESSION_COOKIE, createStaffSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  })
  return response
}

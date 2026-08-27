import { createHmac, timingSafeEqual } from "crypto"

// Lightweight shared-password gate for the staff panel (app/admin/payliance) and the
// money-moving API routes it calls. NOT a full accounts/RBAC system — there's no user
// table, just one shared password Maury sets and distributes to staff. Good enough for
// a small team pre-launch; revisit if TOV needs per-staff audit trails later.
//
// Session token shape: "<expiryEpochSeconds>.<hmacHex>", HMAC-SHA256 keyed by
// ENCRYPTION_KEY (already a strong random secret present in every environment — no
// need for a second one) over the expiry string. Stateless: no session table, so
// logout just means "let the cookie expire" — there's no server-side revocation.

const SESSION_TTL_SECONDS = 60 * 60 * 12 // 12 hours

function sign(value: string): string {
  const secret = process.env.ENCRYPTION_KEY
  if (!secret) throw new Error("ENCRYPTION_KEY no está configurada.")
  return createHmac("sha256", secret).update(value).digest("hex")
}

export function createStaffSessionToken(): string {
  const expiry = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  return `${expiry}.${sign(String(expiry))}`
}

export function isValidStaffSessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const [expiryStr, signature] = token.split(".")
  if (!expiryStr || !signature) return false

  const expected = sign(expiryStr)
  const expectedBuf = Buffer.from(expected, "hex")
  const receivedBuf = Buffer.from(signature, "hex")
  if (expectedBuf.length !== receivedBuf.length || !timingSafeEqual(expectedBuf, receivedBuf)) return false

  return Number(expiryStr) > Math.floor(Date.now() / 1000)
}

export function checkStaffPassword(password: string): boolean {
  const expected = process.env.STAFF_PANEL_PASSWORD
  if (!expected) return false
  const expectedBuf = Buffer.from(expected)
  const receivedBuf = Buffer.from(password)
  if (expectedBuf.length !== receivedBuf.length) return false
  return timingSafeEqual(expectedBuf, receivedBuf)
}

export const STAFF_SESSION_COOKIE = "tov_staff_session"

// Reads the session cookie straight from a Request's headers — works in any Next.js
// route handler without needing next/headers.
export function isStaffAuthenticated(req: Request): boolean {
  const cookieHeader = req.headers.get("cookie") ?? ""
  const match = cookieHeader.match(new RegExp(`${STAFF_SESSION_COOKIE}=([^;]+)`))
  return isValidStaffSessionToken(match?.[1] ? decodeURIComponent(match[1]) : null)
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePlaidLink } from "react-plaid-link"
import { Loader2, AlertCircle } from "lucide-react"

// Required by the Plaid Dashboard OAuth redirect URIs (touchofvintage.biz/oauth and
// www.touchofvintage.biz/oauth — see Plaid_Developer_Brief.docx §3). Banks like Chase
// and Bank of America send the user through their own site and back to this exact
// path mid-Link-session; this page's only job is to resume that same Link session
// (same link_token, via receivedRedirectUri) and finish it.
export default function OAuthRedirectPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // The ORIGINAL link_token (not a new one) must be reused for the OAuth re-init —
  // it's the same one PlaidLinkButton cached in localStorage before opening Link.
  const [linkToken, setLinkToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("plaid_link_token")
    if (!stored) {
      setError("No se encontró la sesión de conexión bancaria. Vuelve a intentarlo desde la solicitud.")
      return
    }
    setLinkToken(stored)
  }, [])

  const { open, ready, error: linkError } = usePlaidLink({
    token: linkToken,
    receivedRedirectUri: typeof window !== "undefined" ? window.location.href : undefined,
    onSuccess: async (publicToken) => {
      const applicationId = sessionStorage.getItem("tov_application_id")
      try {
        const headers = { "Content-Type": "application/json" }
        await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers,
          body: JSON.stringify({ public_token: publicToken, userId: applicationId }),
        })
        const body = JSON.stringify({ userId: applicationId })
        await fetch("/api/plaid/get-auth", { method: "POST", headers, body })
        await fetch("/api/plaid/get-identity", { method: "POST", headers, body })
        await fetch("/api/plaid/get-income", { method: "POST", headers, body })
        sessionStorage.setItem("tov_bank_linked", "true")
      } finally {
        localStorage.removeItem("plaid_link_token")
        router.replace("/apply")
      }
    },
    onExit: () => {
      localStorage.removeItem("plaid_link_token")
      router.replace("/apply")
    },
  })

  useEffect(() => {
    if (ready) open()
  }, [ready, open])

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center bg-card border border-border rounded-2xl p-10">
        {error || linkError ? (
          <>
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <p className="text-sm text-red-700">{error ?? "Ocurrió un error al reconectar con tu banco."}</p>
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-orange)] mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Volviendo a tu solicitud...</p>
          </>
        )}
      </div>
    </div>
  )
}

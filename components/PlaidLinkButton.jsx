"use client"

import { useState, useEffect } from "react"
import { usePlaidLink } from "react-plaid-link"
import { Landmark, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PlaidLinkButton({
  userId,
  onSuccess,
  label = "Conectar Cuenta Bancaria de Forma Segura",
  loadingLabel = "Cargando conexión bancaria...",
}) {
  const [linkToken, setLinkToken] = useState(null)

  // Step 1: Fetch the link token from the backend and cache it
  useEffect(() => {
    fetch("/api/plaid/create-link-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLinkToken(data.link_token)
        if (data.link_token) {
          localStorage.setItem("plaid_link_token", data.link_token)
        }
      })
      .catch((err) => console.error("Error al obtener el link_token:", err))
  }, [userId])

  // Step 2: Exchange the public token for an access token on success
  const onPlaidSuccess = async (publicToken, metadata) => {
    try {
      await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken, userId }),
      })
      localStorage.removeItem("plaid_link_token")
      onSuccess?.(metadata)
    } catch (error) {
      console.error("Error al intercambiar el token:", error)
    }
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
    // OAuth: required for many US banks like Chase & BofA
    receivedRedirectUri: currentUrl.includes("oauth_state_id") ? currentUrl : undefined,
  })

  return (
    <Button
      type="button"
      onClick={() => open()}
      disabled={!ready || !linkToken}
      className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)] py-6 text-base font-semibold"
    >
      {!ready ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Landmark className="w-5 h-5 mr-2" />
          {label}
        </>
      )}
    </Button>
  )
}

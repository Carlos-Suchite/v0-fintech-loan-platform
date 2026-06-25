"use client"

import { useState, useEffect, useCallback } from "react"
import { usePlaidLink } from "react-plaid-link"
import { Landmark, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlaidLinkButtonProps {
  userId: string
  label?: string
  loadingLabel?: string
  onSuccess?: (metadata: unknown) => void
}

export function PlaidLinkButton({
  userId,
  label = "Conectar tu cuenta bancaria",
  loadingLabel = "Preparando conexión segura...",
  onSuccess,
}: PlaidLinkButtonProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Step 1: Fetch link token from the backend
  useEffect(() => {
    let active = true
    setLoading(true)
    fetch("/api/plaid/create-link-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (active) setLinkToken(data.link_token ?? null)
      })
      .catch((err) => console.error("[v0] Error fetching link token:", err))
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [userId])

  // Step 2: Exchange public token on success
  const onPlaidSuccess = useCallback(
    async (publicToken: string, metadata: unknown) => {
      try {
        await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_token: publicToken, userId }),
        })
        onSuccess?.(metadata)
      } catch (err) {
        console.error("[v0] Error exchanging token:", err)
      }
    },
    [userId, onSuccess],
  )

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
    // OAuth: required for many US banks like Chase & BofA
    receivedRedirectUri:
      typeof window !== "undefined" && window.location.href.includes("oauth_state_id")
        ? window.location.href
        : undefined,
  })

  const isLoading = loading || !ready

  return (
    <Button
      type="button"
      onClick={() => open()}
      disabled={!ready || !linkToken}
      className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)] py-6 text-base font-semibold"
    >
      {isLoading ? (
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

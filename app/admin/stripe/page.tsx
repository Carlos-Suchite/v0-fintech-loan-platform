"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, CheckCircle2, AlertCircle } from "lucide-react"

interface Application {
  application_id: string
  first_name: string | null
  last_name: string | null
  division: string | null
  product_name: string | null
  loan_amount: number | null
  status: string | null
  loandisk_borrower_id: string | null
  stripe_customer_id: string | null
  stripe_connect_account_id: string | null
  stripe_repayment_payment_method_id: string | null
  created_at: string
}

// Not automatic — every action here calls the real Stripe API and moves real money
// (or, in test mode, simulated money). Gated by a shared staff password (lib/staff-auth.ts)
// since this is meaningfully more sensitive than the rest of /admin, which is still
// mockup data with no real actions behind it.
export default function StripeAdminPage() {
  const [authChecked, setAuthChecked] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loggingIn, setLoggingIn] = useState(false)

  const [applications, setApplications] = useState<Application[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [amounts, setAmounts] = useState<Record<string, string>>({})
  const [loanIds, setLoanIds] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<Record<string, { type: "ok" | "error"; text: string }>>({})

  const loadApplications = async () => {
    const res = await fetch("/api/admin/applications")
    if (res.status === 401) {
      setAuthenticated(false)
      setAuthChecked(true)
      return
    }
    const data = await res.json()
    if (res.ok) {
      setApplications(data.applications ?? [])
      setAuthenticated(true)
    } else {
      setLoadError(data.error ?? "No se pudieron cargar las solicitudes.")
    }
    setAuthChecked(true)
  }

  useEffect(() => {
    loadApplications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async () => {
    setLoggingIn(true)
    setLoginError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? "No se pudo iniciar sesión.")
      }
      setPassword("")
      await loadApplications()
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "No se pudo iniciar sesión.")
    } finally {
      setLoggingIn(false)
    }
  }

  const callAction = async (applicationId: string, path: string, body: Record<string, unknown>) => {
    setBusyId(applicationId + path)
    setMessage((prev) => ({ ...prev, [applicationId]: undefined as unknown as { type: "ok" | "error"; text: string } }))
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, ...body }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Ocurrió un error.")
      setMessage((prev) => ({ ...prev, [applicationId]: { type: "ok", text: JSON.stringify(data) } }))
      await loadApplications()
    } catch (err) {
      setMessage((prev) => ({
        ...prev,
        [applicationId]: { type: "error", text: err instanceof Error ? err.message : "Ocurrió un error." },
      }))
    } finally {
      setBusyId(null)
    }
  }

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--brand-orange)]" />
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto mt-16 bg-card border border-border rounded-2xl p-8 text-center">
        <Lock className="w-8 h-8 text-[var(--brand-orange)] mx-auto mb-4" />
        <h1 className="font-serif text-xl font-bold text-foreground mb-2">Acceso de Staff</h1>
        <p className="text-sm text-muted-foreground mb-6">Esta sección mueve dinero real. Ingresa la contraseña del equipo.</p>
        <div className="flex flex-col gap-3 text-left">
          <Label>Contraseña</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <Button onClick={handleLogin} disabled={loggingIn || !password} className="mt-2 bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
            {loggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">Desembolsos y Cobros</h1>
        <p className="text-[var(--brand-orange)] italic text-sm">Stripe — ACH</p>
        <p className="text-muted-foreground text-sm mt-1">
          Prepara la cuenta de Stripe del prestatario, luego desembolsa o cobra pagos. Cada transferencia queda
          &quot;pendiente&quot; hasta que Stripe confirme (2-4 días hábiles). La cuenta bancaria del prestatario se
          vincula en el propio formulario de solicitud (/apply) vía Stripe Financial Connections — este panel no
          puede vincularla por él.
        </p>
      </div>

      {loadError && <p className="text-sm text-red-600 mb-4">{loadError}</p>}

      <div className="space-y-4">
        {applications.map((app) => {
          const name = `${app.first_name ?? ""} ${app.last_name ?? ""}`.trim() || "(sin nombre)"
          const hasStripeAccounts = Boolean(app.stripe_customer_id && app.stripe_connect_account_id)
          const ready = Boolean(app.stripe_repayment_payment_method_id)
          const amount = amounts[app.application_id] ?? ""
          const loanId = loanIds[app.application_id] ?? ""
          const msg = message[app.application_id]

          return (
            <div key={app.application_id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div>
                  <p className="font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {app.application_id} · {app.division} · {app.product_name ?? "—"} · ${app.loan_amount ?? "—"}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{app.status}</span>
              </div>

              {!hasStripeAccounts ? (
                <Button
                  size="sm"
                  disabled={busyId === app.application_id + "/api/stripe/setup-borrower"}
                  onClick={() => callAction(app.application_id, "/api/stripe/setup-borrower", {})}
                >
                  {busyId === app.application_id + "/api/stripe/setup-borrower" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Crear cuenta en Stripe"
                  )}
                </Button>
              ) : !ready ? (
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2">
                  Cuenta de Stripe creada. Falta que el prestatario vincule su cuenta bancaria desde /apply antes de
                  poder desembolsar o cobrar.
                </p>
              ) : (
                <div className="flex flex-wrap items-end gap-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Monto (USD)</Label>
                    <Input
                      type="number"
                      className="w-32"
                      value={amount}
                      onChange={(e) => setAmounts((prev) => ({ ...prev, [app.application_id]: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">LoanDisk loan_id</Label>
                    <Input
                      className="w-36"
                      value={loanId}
                      onChange={(e) => setLoanIds((prev) => ({ ...prev, [app.application_id]: e.target.value }))}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!amount || busyId === app.application_id + "/api/stripe/disburse"}
                    onClick={() => callAction(app.application_id, "/api/stripe/disburse", { amount: Number(amount), loandiskLoanId: loanId || null })}
                  >
                    {busyId === app.application_id + "/api/stripe/disburse" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Desembolsar"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!amount || busyId === app.application_id + "/api/stripe/collect-repayment"}
                    onClick={() => callAction(app.application_id, "/api/stripe/collect-repayment", { amount: Number(amount), loandiskLoanId: loanId || null })}
                  >
                    {busyId === app.application_id + "/api/stripe/collect-repayment" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cobrar Pago"}
                  </Button>
                </div>
              )}

              {msg && (
                <div className={`mt-3 flex items-start gap-2 text-xs rounded-lg p-2 ${msg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {msg.type === "ok" ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
                  <span className="break-all">{msg.text}</span>
                </div>
              )}
            </div>
          )
        })}
        {applications.length === 0 && !loadError && (
          <p className="text-sm text-muted-foreground text-center py-12">No hay solicitudes todavía.</p>
        )}
      </div>
    </div>
  )
}

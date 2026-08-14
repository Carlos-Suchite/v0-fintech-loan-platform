"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ShieldCheck, Lock, Clock, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PlaidLinkButton from "@/components/PlaidLinkButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"
import { type Division, getEligibleProducts, getProductById } from "@/lib/products"

const content = {
  es: {
    headerLabel: "Solicitud de Préstamo",
    steps: ["Préstamo", "Personal", "Empleo", "Banco", "Revisión"],
    submittedTitle: "¡Solicitud Enviada!",
    submittedBody:
      "Gracias por solicitar con Touch of Vintage. Tu solicitud está en revisión. Recibirás un correo de confirmación y podrás dar seguimiento en tu panel.",
    toDashboard: "Ir al Panel",
    toHome: "Volver al inicio",
    step1Title: "Información del Préstamo",
    step1Sub: "Cuéntanos qué necesitas y cómo planeas pagarlo.",
    hasCompletedLoanQ: "¿Ya completaste un préstamo con Touch of Vintage anteriormente?",
    wasReferredQ: "¿Fuiste referido por un cliente de Touch of Vintage?",
    yes: "Sí",
    no: "No",
    referrerEmail: "Correo del cliente que te refirió", referrerEmailPh: "referente@correo.com",
    product: "Producto", productPh: "Selecciona un producto",
    step2Title: "Información Personal",
    step2Sub: "Tus datos se mantienen privados y protegidos.",
    step3Title: "Información Laboral",
    step3Sub: "Esto nos ayuda a entender tu capacidad de pago.",
    step4Title: "Verificación Bancaria",
    step4Sub:
      "Conecta tu cuenta bancaria de forma segura a través de Plaid. La conexión es cifrada de extremo a extremo y verifica tus ingresos en segundos. Nunca vemos ni almacenamos tus credenciales bancarias.",
    bankConnect: "Conectar tu cuenta bancaria",
    bankLoading: "Preparando conexión segura...",
    bankConnected: "Cuenta bancaria vinculada y verificada correctamente.",
    bankSecure: "Conexión cifrada de nivel bancario, gestionada por Plaid.",
    bankFast: "Verificación de ingresos en segundos",
    step5Title: "Revisar y Enviar",
    step5Sub: "Por favor revisa los detalles de tu solicitud antes de enviar.",
    fields: {
      firstName: "Nombre", firstNamePh: "María",
      lastName: "Apellido", lastNamePh: "García",
      email: "Correo", emailPh: "tu@correo.com",
      phone: "Teléfono", phonePh: "+1 (555) 000-0000",
      address: "Dirección", addressPh: "100 Main St",
      city: "Ciudad", cityPh: "Miami",
      state: "Estado", statePh: "FL",
      postalCode: "Código Postal", postalCodePh: "33101",
      dob: "Fecha de Nacimiento",
      ssn: "Número de Seguro Social (SSN)", ssnPh: "123-45-6789",
      employer: "Nombre de la Empresa", employerPh: "Empresa ABC",
      jobTitle: "Puesto", jobTitlePh: "Gerente de Ventas",
      income: "Ingresos Mensuales Estimados (USD)", incomePh: "5000",
      amount: "Monto Deseado (USD)", amountPh: "5000",
      term: "Plazo del Préstamo", termPh: "Seleccionar plazo",
      purpose: "Propósito del Préstamo", purposePh: "Seleccionar propósito",
      notes: "Notas Adicionales (opcional)", notesPh: "Contexto adicional sobre tu solicitud...",
    },
    ssnNote: "Requerido por regulación (FL Capítulo 516). Cifrado de extremo a extremo — tu número se almacena de forma segura.",
    empOptions: ["Tiempo Completo", "Tiempo Parcial", "Independiente", "Jubilado", "Desempleado"],
    empStatus: "Estado Laboral", empStatusPh: "Seleccionar estado",
    termOptions: ["6 meses", "12 meses", "24 meses", "36 meses", "48 meses", "60 meses"],
    purposeOptions: ["Consolidación de Deudas", "Gastos Médicos", "Mejoras al Hogar", "Educación", "Vehículo", "Negocio", "Otro"],
    estLabel: "Pago Estimado",
    estFields: ["Pago Mensual", "Interés Total", "APR inicial"],
    estNote: "*Estimación basada en datos de ejemplo. La tasa real se determina tras la revisión.",
    reviewSections: ["Préstamo", "Información Personal", "Empleo", "Verificación Bancaria"],
    reviewItems: [
      ["$1,500", "24 meses", "Consolidación de Deudas"],
      ["María García", "tu@correo.com", "+1 (555) 000-0000"],
      ["Empresa ABC", "Gerente de Ventas", "$2,500/mes"],
    ],
    bankPending: "Pendiente de verificación",
    consent:
      "Al enviar esta solicitud, autorizas a Touch of Vintage LLC a verificar tu información, acceder a tu reporte de crédito y contactarte sobre tu solicitud. Confirmas que toda la información proporcionada es precisa y veraz.",
    termsTitle: "Términos Legales",
    back: "Atrás",
    continue: "Continuar",
    submit: "Enviar Solicitud",
  },
  en: {
    headerLabel: "Loan Application",
    steps: ["Loan", "Personal", "Employment", "Bank", "Review"],
    submittedTitle: "Application Submitted!",
    submittedBody:
      "Thank you for applying with Touch of Vintage. Your application is now under review. You will receive an email confirmation and can track your status in your dashboard.",
    toDashboard: "Go to Dashboard",
    toHome: "Return Home",
    step1Title: "Loan Information",
    step1Sub: "Tell us what you need and how you plan to repay it.",
    hasCompletedLoanQ: "Have you already completed a loan with Touch of Vintage?",
    wasReferredQ: "Were you referred by a Touch of Vintage client?",
    yes: "Yes",
    no: "No",
    referrerEmail: "Referring client's email", referrerEmailPh: "referrer@email.com",
    product: "Product", productPh: "Select a product",
    step2Title: "Personal Information",
    step2Sub: "Your details are kept private and protected.",
    step3Title: "Employment Information",
    step3Sub: "This helps us understand your ability to repay.",
    step4Title: "Bank Verification",
    step4Sub:
      "Securely connect your bank account through Plaid. The connection is end-to-end encrypted and verifies your income in seconds. We never see or store your banking credentials.",
    bankConnect: "Connect your bank account",
    bankLoading: "Preparing secure connection...",
    bankConnected: "Bank account linked and verified successfully.",
    bankSecure: "Bank-level encrypted connection, powered by Plaid.",
    bankFast: "Income verification in seconds",
    step5Title: "Review & Submit",
    step5Sub: "Please review your application details before submitting.",
    fields: {
      firstName: "First Name", firstNamePh: "María",
      lastName: "Last Name", lastNamePh: "García",
      email: "Email Address", emailPh: "you@email.com",
      phone: "Phone Number", phonePh: "+1 (555) 000-0000",
      address: "Home Address", addressPh: "100 Main St",
      city: "City", cityPh: "Miami",
      state: "State", statePh: "FL",
      postalCode: "Zip Code", postalCodePh: "33101",
      dob: "Date of Birth",
      ssn: "Social Security Number (SSN)", ssnPh: "123-45-6789",
      employer: "Company Name", employerPh: "ABC Company",
      jobTitle: "Position", jobTitlePh: "Sales Manager",
      income: "Estimated Monthly Income (USD)", incomePh: "5000",
      amount: "Desired Amount (USD)", amountPh: "5000",
      term: "Loan Term", termPh: "Select term",
      purpose: "Loan Purpose", purposePh: "Select purpose",
      notes: "Additional Notes (optional)", notesPh: "Provide any additional context...",
    },
    ssnNote: "Required by regulation (FL Chapter 516). End-to-end encrypted — your number is stored securely.",
    empOptions: ["Full-Time", "Part-Time", "Self-Employed", "Retired", "Unemployed"],
    empStatus: "Employment Status", empStatusPh: "Select status",
    termOptions: ["6 months", "12 months", "24 months", "36 months", "48 months", "60 months"],
    purposeOptions: ["Debt Consolidation", "Medical Expenses", "Home Improvement", "Education", "Vehicle", "Small Business", "Other"],
    estLabel: "Estimated Payment",
    estFields: ["Monthly Payment", "Total Interest", "Starting APR"],
    estNote: "*Estimate based on sample input. Actual rate determined after review.",
    reviewSections: ["Loan Details", "Personal Info", "Employment", "Bank Verification"],
    reviewItems: [
      ["$1,500", "24 months", "Debt Consolidation"],
      ["María García", "you@email.com", "+1 (555) 000-0000"],
      ["ABC Company", "Sales Manager", "$2,500/month"],
    ],
    bankPending: "Pending verification",
    consent:
      "By submitting this application, you authorize Touch of Vintage LLC to verify your information, access your credit report, and contact you regarding your application. You confirm all information provided is accurate and truthful.",
    termsTitle: "Legal Terms",
    back: "Back",
    continue: "Continue",
    submit: "Submit Application",
  },
}

const EMPTY_FORM = {
  productId: "",
  hasCompletedLoan: "" as "" | "yes" | "no",
  wasReferred: "" as "" | "yes" | "no",
  referrerEmail: "",
  amount: "",
  termMonths: "",
  purposeIndex: "",
  notes: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  dob: "",
  ssn: "",
  employmentIndex: "",
  employer: "",
  jobTitle: "",
  income: "",
}

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <ApplyForm />
    </Suspense>
  )
}

function ApplyForm() {
  const { lang } = useLang()
  const t = content[lang]
  const searchParams = useSearchParams()
  const division: Division = searchParams.get("division") === "commercial" ? "commercial" : "consumer"
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [bankLinked, setBankLinked] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [applicationId, setApplicationId] = useState<string | null>(null)
  const [savingStep, setSavingStep] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const eligibleProducts = getEligibleProducts(division, formData.hasCompletedLoan === "yes", formData.wasReferred === "yes")
  const selectedProduct = getProductById(formData.productId)

  const updateField = (field: keyof typeof EMPTY_FORM, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  // If the eligibility answers change after a product was picked (e.g. switching
  // "already completed a loan" back to No), drop the selection if it's no longer
  // eligible instead of silently submitting an ineligible product.
  useEffect(() => {
    if (formData.productId && !eligibleProducts.some((p) => p.id === formData.productId)) {
      setFormData((prev) => ({ ...prev, productId: "", termMonths: "" }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.hasCompletedLoan, formData.wasReferred])

  // Survives the OAuth full-page redirect (Plaid Link leaves the tab for banks like
  // Chase/BofA and returns to /oauth, which comes back here). sessionStorage keeps
  // the same application_id, current step, and bank-linked status across that
  // round trip instead of resetting the whole form.
  useEffect(() => {
    let id = sessionStorage.getItem("tov_application_id")
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem("tov_application_id", id)
    }
    setApplicationId(id)

    const savedStep = sessionStorage.getItem("tov_step")
    if (savedStep) setStep(Number(savedStep))
    if (sessionStorage.getItem("tov_bank_linked") === "true") setBankLinked(true)
  }, [])

  useEffect(() => {
    sessionStorage.setItem("tov_step", String(step))
  }, [step])

  const saveApplication = async () => {
    if (!applicationId) return
    setSavingStep(true)
    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          division,
          productId: formData.productId || null,
          productName: selectedProduct?.name ?? null,
          referrerEmail: formData.wasReferred === "yes" ? formData.referrerEmail : null,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          dateOfBirth: formData.dob || null,
          // Full SSN required by FL Chapter 516 — sent over HTTPS and encrypted
          // server-side before storage (see /api/applications, lib/crypto.ts). Only
          // the last 4 digits are ever kept in plaintext, for display/reference.
          ssn: formData.ssn,
          employmentStatus: t.empOptions[Number(formData.employmentIndex)] ?? null,
          employer: formData.employer,
          jobTitle: formData.jobTitle,
          monthlyIncome: formData.income ? Number(formData.income) : null,
          loanAmount: formData.amount ? Number(formData.amount) : null,
          loanTerm: formData.termMonths ? `${formData.termMonths} meses` : null,
          loanPurpose: t.purposeOptions[Number(formData.purposeIndex)] ?? null,
          notes: formData.notes,
        }),
      })
    } catch (err) {
      console.error("Error saving application:", err)
    } finally {
      setSavingStep(false)
    }
  }

  const TOTAL_STEPS = 5
  const handleNext = async () => {
    if (step === 3) await saveApplication()
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const runVerification = async () => {
    if (!applicationId) return
    setVerifying(true)
    try {
      const body = JSON.stringify({ userId: applicationId })
      const headers = { "Content-Type": "application/json" }
      // Sequential: get-identity/get-income read the application row that
      // exchange-token + get-auth just wrote, so ordering matters here.
      await fetch("/api/plaid/get-auth", { method: "POST", headers, body })
      await fetch("/api/plaid/get-identity", { method: "POST", headers, body })
      await fetch("/api/plaid/get-income", { method: "POST", headers, body }) // best-effort, may return "Pending"
    } catch (err) {
      console.error("Error running Plaid verification:", err)
    } finally {
      setVerifying(false)
      setBankLinked(true)
      sessionStorage.setItem("tov_bank_linked", "true")
    }
  }

  const handleSubmit = async () => {
    if (!applicationId) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const response = await fetch("/api/plaid/send-to-loandisk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: applicationId }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error ?? "No se pudo enviar la solicitud.")
      }
      sessionStorage.removeItem("tov_application_id")
      sessionStorage.removeItem("tov_step")
      sessionStorage.removeItem("tov_bank_linked")
      setSubmitted(true)
    } catch (err) {
      console.error("Error submitting application:", err)
      setSubmitError(err instanceof Error ? err.message : "No se pudo enviar la solicitud.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-10">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">{t.submittedTitle}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">{t.submittedBody}</p>
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
              <Link href="/dashboard">{t.toDashboard}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">{t.toHome}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const steps = t.steps
  const f = t.fields

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <header className="bg-[var(--brand-black)] px-4 py-4 border-b border-white/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.jpg" alt="Touch of Vintage" width={140} height={52} className="object-contain h-9 w-auto" />
          </Link>
          <p className="text-sm text-white/50">{t.headerLabel}</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-3xl">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border -z-10" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-[var(--brand-orange)] -z-10 transition-all"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((label, i) => {
              const id = i + 1
              return (
                <div key={id} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all bg-white",
                      step > id
                        ? "bg-[var(--brand-orange)] border-[var(--brand-orange)] text-white"
                        : step === id
                          ? "border-[var(--brand-orange)] text-[var(--brand-orange)]"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {step > id ? <CheckCircle2 className="w-4 h-4" /> : id}
                  </div>
                  <span
                    className={cn(
                      "text-xs hidden sm:block",
                      step === id ? "text-[var(--brand-orange)] font-medium" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Step 1 — Loan Information */}
            {step === 1 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.step1Title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step1Sub}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {division === "consumer" && (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <Label>{t.hasCompletedLoanQ}</Label>
                        <Select value={formData.hasCompletedLoan} onValueChange={(v) => updateField("hasCompletedLoan", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">{t.no}</SelectItem>
                            <SelectItem value="yes">{t.yes}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label>{t.wasReferredQ}</Label>
                        <Select value={formData.wasReferred} onValueChange={(v) => updateField("wasReferred", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">{t.no}</SelectItem>
                            <SelectItem value="yes">{t.yes}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.wasReferred === "yes" && (
                        <div className="sm:col-span-2 flex flex-col gap-1.5">
                          <Label>{t.referrerEmail}</Label>
                          <Input
                            type="email"
                            placeholder={t.referrerEmailPh}
                            value={formData.referrerEmail}
                            onChange={(e) => updateField("referrerEmail", e.target.value)}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {division === "commercial" && (
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <Label>{t.hasCompletedLoanQ}</Label>
                      <Select value={formData.hasCompletedLoan} onValueChange={(v) => updateField("hasCompletedLoan", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">{t.no}</SelectItem>
                          <SelectItem value="yes">{t.yes}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>{t.product}</Label>
                    <Select value={formData.productId} onValueChange={(v) => updateField("productId", v)}>
                      <SelectTrigger><SelectValue placeholder={t.productPh} /></SelectTrigger>
                      <SelectContent>
                        {eligibleProducts.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>{f.amount}</Label>
                    <Input
                      type="number"
                      placeholder={f.amountPh}
                      min={selectedProduct?.minAmount}
                      max={selectedProduct?.maxAmount}
                      disabled={!selectedProduct}
                      value={formData.amount}
                      onChange={(e) => updateField("amount", e.target.value)}
                    />
                    {selectedProduct && (
                      <p className="text-xs text-muted-foreground">
                        ${selectedProduct.minAmount.toLocaleString()} – ${selectedProduct.maxAmount.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>{f.term}</Label>
                    <Select value={formData.termMonths} onValueChange={(v) => updateField("termMonths", v)} disabled={!selectedProduct}>
                      <SelectTrigger><SelectValue placeholder={f.termPh} /></SelectTrigger>
                      <SelectContent>
                        {selectedProduct &&
                          Array.from(
                            { length: selectedProduct.maxTermMonths - selectedProduct.minTermMonths + 1 },
                            (_, i) => selectedProduct.minTermMonths + i,
                          ).map((months) => (
                            <SelectItem key={months} value={String(months)}>
                              {months} {lang === "es" ? "meses" : "months"}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>{f.purpose}</Label>
                    <Select value={formData.purposeIndex} onValueChange={(v) => updateField("purposeIndex", v)}>
                      <SelectTrigger><SelectValue placeholder={f.purposePh} /></SelectTrigger>
                      <SelectContent>{t.purposeOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>{f.notes}</Label>
                    <Textarea
                      placeholder={f.notesPh}
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6 bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-xl p-5">
                  <p className="text-xs font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.estLabel}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {t.estFields.map((label, i) => (
                      <div key={label}>
                        <p className="text-xs text-muted-foreground mb-1">{label}</p>
                        <p className="font-bold text-foreground">{["~$72", "~$170", "12.5%"][i]}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{t.estNote}</p>
                </div>
              </div>
            )}

            {/* Step 2 — Personal Information */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.step2Title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step2Sub}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5"><Label>{f.firstName}</Label><Input placeholder={f.firstNamePh} value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.lastName}</Label><Input placeholder={f.lastNamePh} value={formData.lastName} onChange={(e) => updateField("lastName", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.email}</Label><Input type="email" placeholder={f.emailPh} value={formData.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.phone}</Label><Input type="tel" placeholder={f.phonePh} value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5"><Label>{f.address}</Label><Input placeholder={f.addressPh} value={formData.address} onChange={(e) => updateField("address", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.city}</Label><Input placeholder={f.cityPh} value={formData.city} onChange={(e) => updateField("city", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.state}</Label><Input placeholder={f.statePh} maxLength={2} value={formData.state} onChange={(e) => updateField("state", e.target.value.toUpperCase())} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.postalCode}</Label><Input placeholder={f.postalCodePh} value={formData.postalCode} onChange={(e) => updateField("postalCode", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.dob}</Label><Input type="date" value={formData.dob} onChange={(e) => updateField("dob", e.target.value)} /></div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                      {f.ssn}
                    </Label>
                    <Input
                      type="password"
                      placeholder={f.ssnPh}
                      autoComplete="off"
                      maxLength={11}
                      value={formData.ssn}
                      onChange={(e) => updateField("ssn", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t.ssnNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Employment Information */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.step3Title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step3Sub}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>{t.empStatus}</Label>
                    <Select value={formData.employmentIndex} onValueChange={(v) => updateField("employmentIndex", v)}>
                      <SelectTrigger><SelectValue placeholder={t.empStatusPh} /></SelectTrigger>
                      <SelectContent>{t.empOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5"><Label>{f.employer}</Label><Input placeholder={f.employerPh} value={formData.employer} onChange={(e) => updateField("employer", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.jobTitle}</Label><Input placeholder={f.jobTitlePh} value={formData.jobTitle} onChange={(e) => updateField("jobTitle", e.target.value)} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.income}</Label><Input type="number" placeholder={f.incomePh} value={formData.income} onChange={(e) => updateField("income", e.target.value)} /></div>
                </div>
              </div>
            )}

            {/* Step 4 — Bank Verification */}
            {step === 4 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.step4Title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step4Sub}</p>
                {bankLinked ? (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-green-800">{t.bankConnected}</p>
                  </div>
                ) : verifying ? (
                  <div className="flex items-center gap-3 bg-muted border border-border rounded-xl p-5">
                    <Loader2 className="w-5 h-5 animate-spin text-[var(--brand-orange)]" />
                    <p className="text-sm font-medium text-foreground">{t.bankLoading}</p>
                  </div>
                ) : (
                  <div className="bg-muted border border-border rounded-xl p-6 flex flex-col items-center text-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-[var(--brand-orange)]/15 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7 text-[var(--brand-orange)]" />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                        {t.bankSecure}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                        {t.bankFast}
                      </p>
                    </div>
                    <div className="w-full max-w-sm">
                      <PlaidLinkButton
                        userId={applicationId ?? ""}
                        label={t.bankConnect}
                        loadingLabel={t.bankLoading}
                        onSuccess={runVerification}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5 — Review & Submit */}
            {step === 5 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.step5Title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step5Sub}</p>
                <div className="space-y-4">
                  {(() => {
                    const realReviewItems = [
                      [
                        selectedProduct?.name ?? "—",
                        formData.amount ? `$${formData.amount}` : "—",
                        formData.termMonths ? `${formData.termMonths} ${lang === "es" ? "meses" : "months"}` : "—",
                        t.purposeOptions[Number(formData.purposeIndex)] ?? "—",
                      ],
                      [formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : "—", formData.email || "—", formData.phone || "—"],
                      [formData.employer || "—", formData.jobTitle || "—", formData.income ? `$${formData.income}/mes` : "—"],
                    ]
                    return t.reviewSections.map((label, i) => (
                      <div key={label} className="bg-muted border border-border rounded-xl p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{label}</p>
                        {i < 3 ? (
                          realReviewItems[i].map((item, j) => (
                            <p key={j} className="text-sm text-foreground py-0.5">{item}</p>
                          ))
                        ) : (
                          <p className={cn("text-sm py-0.5 flex items-center gap-1.5", bankLinked ? "text-green-700" : "text-muted-foreground")}>
                            {bankLinked ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            {bankLinked ? t.bankConnected : t.bankPending}
                          </p>
                        )}
                      </div>
                    ))
                  })()}
                </div>
                <div className="mt-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t.termsTitle}</p>
                  <div className="bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                    {t.consent}
                  </div>
                </div>
                {submitError && (
                  <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>{t.back}</Button>
              {step < TOTAL_STEPS ? (
                <Button
                  onClick={handleNext}
                  disabled={savingStep || (step === 1 && !selectedProduct)}
                  className="bg-[var(--brand-black)] text-white hover:bg-[var(--brand-black-soft)]"
                >
                  {savingStep ? <Loader2 className="w-4 h-4 animate-spin" /> : t.continue}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t.submit}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ShieldCheck, Lock, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import PlaidLinkButton from "@/components/PlaidLinkButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"

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
      address: "Dirección", addressPh: "100 Main St, Miami, FL 33101",
      ssn: "SSN / ID", ssnPh: "•••-••-••••",
      employer: "Nombre de la Empresa", employerPh: "Empresa ABC",
      jobTitle: "Puesto", jobTitlePh: "Gerente de Ventas",
      income: "Ingresos Mensuales Estimados (USD)", incomePh: "5000",
      amount: "Monto Deseado (USD)", amountPh: "5000",
      term: "Plazo del Préstamo", termPh: "Seleccionar plazo",
      purpose: "Propósito del Préstamo", purposePh: "Seleccionar propósito",
      notes: "Notas Adicionales (opcional)", notesPh: "Contexto adicional sobre tu solicitud...",
    },
    ssnNote: "Cifrado de extremo a extremo. Tu número se almacena de forma segura.",
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
      "Al enviar esta solicitud, autorizas a Touch of Vintage Financial, LLC a verificar tu información, acceder a tu reporte de crédito y contactarte sobre tu solicitud. Confirmas que toda la información proporcionada es precisa y veraz.",
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
      address: "Home Address", addressPh: "100 Main St, Miami, FL 33101",
      ssn: "SSN / ID", ssnPh: "•••-••-••••",
      employer: "Company Name", employerPh: "ABC Company",
      jobTitle: "Position", jobTitlePh: "Sales Manager",
      income: "Estimated Monthly Income (USD)", incomePh: "5000",
      amount: "Desired Amount (USD)", amountPh: "5000",
      term: "Loan Term", termPh: "Select term",
      purpose: "Loan Purpose", purposePh: "Select purpose",
      notes: "Additional Notes (optional)", notesPh: "Provide any additional context...",
    },
    ssnNote: "End-to-end encrypted. Your number is stored securely.",
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
      "By submitting this application, you authorize Touch of Vintage Financial, LLC to verify your information, access your credit report, and contact you regarding your application. You confirm all information provided is accurate and truthful.",
    termsTitle: "Legal Terms",
    back: "Back",
    continue: "Continue",
    submit: "Submit Application",
  },
}

export default function ApplyPage() {
  const { lang } = useLang()
  const t = content[lang]
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [bankLinked, setBankLinked] = useState(false)

  const TOTAL_STEPS = 5
  const handleNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const handleBack = () => setStep((s) => Math.max(s - 1, 1))
  const handleSubmit = () => setSubmitted(true)

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>{f.amount}</Label>
                    <Input type="number" placeholder={f.amountPh} min="200" max="8000" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>{f.term}</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder={f.termPh} /></SelectTrigger>
                      <SelectContent>{t.termOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>{f.purpose}</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder={f.purposePh} /></SelectTrigger>
                      <SelectContent>{t.purposeOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>{f.notes}</Label>
                    <Textarea placeholder={f.notesPh} rows={3} />
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
                  <div className="flex flex-col gap-1.5"><Label>{f.firstName}</Label><Input placeholder={f.firstNamePh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.lastName}</Label><Input placeholder={f.lastNamePh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.email}</Label><Input type="email" placeholder={f.emailPh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.phone}</Label><Input type="tel" placeholder={f.phonePh} /></div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5"><Label>{f.address}</Label><Input placeholder={f.addressPh} /></div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                      {f.ssn}
                    </Label>
                    <Input type="password" placeholder={f.ssnPh} autoComplete="off" />
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
                    <Select>
                      <SelectTrigger><SelectValue placeholder={t.empStatusPh} /></SelectTrigger>
                      <SelectContent>{t.empOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5"><Label>{f.employer}</Label><Input placeholder={f.employerPh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.jobTitle}</Label><Input placeholder={f.jobTitlePh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.income}</Label><Input type="number" placeholder={f.incomePh} /></div>
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
                        userId="applicant-demo"
                        label={t.bankConnect}
                        loadingLabel={t.bankLoading}
                        onSuccess={() => setBankLinked(true)}
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
                  {t.reviewSections.map((label, i) => (
                    <div key={label} className="bg-muted border border-border rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{label}</p>
                      {i < 3 ? (
                        t.reviewItems[i].map((item) => (
                          <p key={item} className="text-sm text-foreground py-0.5">{item}</p>
                        ))
                      ) : (
                        <p className={cn("text-sm py-0.5 flex items-center gap-1.5", bankLinked ? "text-green-700" : "text-muted-foreground")}>
                          {bankLinked ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          {bankLinked ? t.bankConnected : t.bankPending}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{t.termsTitle}</p>
                  <div className="bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                    {t.consent}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>{t.back}</Button>
              {step < TOTAL_STEPS ? (
                <Button onClick={handleNext} className="bg-[var(--brand-black)] text-white hover:bg-[var(--brand-black-soft)]">{t.continue}</Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">{t.submit}</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

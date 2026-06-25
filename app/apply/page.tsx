"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Upload, X, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaidLinkButton } from "@/components/plaid-link-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    headerLabel: "Solicitud de Préstamo",
    steps: ["Información", "Empleo", "Préstamo", "Documentos", "Banco", "Revisión"],
    submittedTitle: "¡Solicitud Enviada!",
    submittedBody: "Gracias por solicitar con Touch of Vintage. Tu solicitud está en revisión. Recibirás un correo de confirmación y podrás dar seguimiento en tu panel.",
    toDashboard: "Ir al Panel",
    toHome: "Volver al inicio",
    step1Title: "Información Personal",
    step2Title: "Empleo e Ingresos",
    step3Title: "Detalles del Préstamo",
    step4Title: "Subir Documentos",
    step4Sub: "Sube los siguientes documentos para apoyar tu solicitud.",
    bankTitle: "Vinculación Bancaria",
    bankSub: "Conecta tu cuenta bancaria de forma segura a través de Plaid para verificar tus datos y agilizar el desembolso. Nunca almacenamos tus credenciales bancarias.",
    bankConnect: "Conectar tu cuenta bancaria",
    bankLoading: "Preparando conexión segura...",
    bankConnected: "Cuenta bancaria vinculada correctamente.",
    bankSecure: "Conexión cifrada de nivel bancario, gestionada por Plaid.",
    step5Title: "Revisar y Enviar",
    step5Sub: "Por favor revisa los detalles de tu solicitud antes de enviar.",
    fields: {
      firstName: "Nombre", firstNamePh: "María",
      lastName: "Apellido", lastNamePh: "García",
      email: "Correo", emailPh: "tu@correo.com",
      phone: "Teléfono", phonePh: "+1 (555) 000-0000",
      dob: "Fecha de Nacimiento",
      contact: "Contacto Preferido", contactPh: "Seleccionar método",
      address: "Dirección", addressPh: "100 Main St, Miami, FL 33101",
      empStatus: "Estado Laboral", empStatusPh: "Seleccionar estado",
      employer: "Empleador", employerPh: "Empresa ABC",
      jobTitle: "Cargo", jobTitlePh: "Gerente de Ventas",
      income: "Ingresos Mensuales (USD)", incomePh: "5000",
      tenure: "Tiempo en Empleo Actual", tenurePh: "Seleccionar duración",
      amount: "Monto Solicitado (USD)", amountPh: "5000",
      term: "Plazo Preferido", termPh: "Seleccionar plazo",
      purpose: "Propósito del Préstamo", purposePh: "Seleccionar propósito",
      notes: "Notas Adicionales (opcional)", notesPh: "Contexto adicional sobre tu solicitud...",
    },
    contactOptions: ["Correo", "Teléfono", "SMS"],
    empOptions: ["Tiempo Completo", "Tiempo Parcial", "Independiente", "Jubilado", "Desempleado"],
    tenureOptions: ["Menos de 6 meses", "6–12 meses", "1–3 años", "3+ años"],
    termOptions: ["6 meses", "12 meses", "24 meses", "36 meses", "48 meses", "60 meses"],
    purposeOptions: ["Consolidación de Deudas", "Gastos Médicos", "Mejoras al Hogar", "Educación", "Vehículo", "Negocio", "Otro"],
    estLabel: "Pago Estimado",
    estFields: ["Pago Mensual", "Interés Total", "APR inicial"],
    estNote: "*Estimación basada en datos de ejemplo.",
    docsList: ["Identificación Oficial", "Comprobante de Ingresos", "Comprobante de Domicilio"],
    docsNote: "PDF, JPG, o PNG — máx 10MB",
    chooseFile: "Elegir archivo",
    uploadedLabel: "Archivos subidos:",
    reviewSections: ["Información Personal", "Empleo", "Préstamo", "Documentos"],
    reviewItems: [
      ["María García", "tu@correo.com", "+1 (555) 000-0000"],
      ["Tiempo Completo", "Empresa ABC", "$2,500/mes"],
      ["$1,500", "24 meses", "Consolidación"],
    ],
    noDocuments: "Sin documentos",
    consent: "Al enviar esta solicitud, autorizas a Touch of Vintage Financial, LLC a verificar tu información, acceder a tu reporte de crédito y contactarte sobre tu solicitud. Confirmas que toda la información proporcionada es precisa y veraz.",
    back: "Atrás",
    continue: "Continuar",
    submit: "Enviar Solicitud",
  },
  en: {
    headerLabel: "Loan Application",
    steps: ["Personal", "Employment", "Loan", "Documents", "Bank", "Review"],
    submittedTitle: "Application Submitted!",
    submittedBody: "Thank you for applying with Touch of Vintage. Your application is now under review. You will receive an email confirmation and can track your status in your dashboard.",
    toDashboard: "Go to Dashboard",
    toHome: "Return Home",
    step1Title: "Personal Information",
    step2Title: "Employment & Income",
    step3Title: "Loan Details",
    step4Title: "Upload Documents",
    step4Sub: "Please upload the following required documents to support your application.",
    bankTitle: "Bank Linking",
    bankSub: "Securely connect your bank account through Plaid to verify your details and speed up disbursement. We never store your banking credentials.",
    bankConnect: "Connect your bank account",
    bankLoading: "Preparing secure connection...",
    bankConnected: "Bank account linked successfully.",
    bankSecure: "Bank-level encrypted connection, powered by Plaid.",
    step5Title: "Review & Submit",
    step5Sub: "Please review your application details before submitting.",
    fields: {
      firstName: "First Name", firstNamePh: "María",
      lastName: "Last Name", lastNamePh: "García",
      email: "Email Address", emailPh: "you@email.com",
      phone: "Phone Number", phonePh: "+1 (555) 000-0000",
      dob: "Date of Birth",
      contact: "Preferred Contact Method", contactPh: "Select method",
      address: "Home Address", addressPh: "100 Main St, Miami, FL 33101",
      empStatus: "Employment Status", empStatusPh: "Select status",
      employer: "Employer Name", employerPh: "ABC Company",
      jobTitle: "Job Title", jobTitlePh: "Sales Manager",
      income: "Monthly Income (USD)", incomePh: "5000",
      tenure: "Time at Current Employer", tenurePh: "Select duration",
      amount: "Requested Loan Amount (USD)", amountPh: "5000",
      term: "Preferred Repayment Term", termPh: "Select term",
      purpose: "Loan Purpose", purposePh: "Select purpose",
      notes: "Additional Notes (optional)", notesPh: "Provide any additional context...",
    },
    contactOptions: ["Email", "Phone", "SMS"],
    empOptions: ["Full-Time", "Part-Time", "Self-Employed", "Retired", "Unemployed"],
    tenureOptions: ["Less than 6 months", "6–12 months", "1–3 years", "3+ years"],
    termOptions: ["6 months", "12 months", "24 months", "36 months", "48 months", "60 months"],
    purposeOptions: ["Debt Consolidation", "Medical Expenses", "Home Improvement", "Education", "Vehicle", "Small Business", "Other"],
    estLabel: "Estimated Payment",
    estFields: ["Monthly Payment", "Total Interest", "Starting APR"],
    estNote: "*Estimate based on sample input. Actual rate determined after review.",
    docsList: ["Government-Issued ID", "Proof of Income", "Proof of Address"],
    docsNote: "PDF, JPG, or PNG — max 10MB",
    chooseFile: "Choose File",
    uploadedLabel: "Uploaded files:",
    reviewSections: ["Personal Info", "Employment", "Loan Details", "Documents"],
    reviewItems: [
      ["María García", "you@email.com", "+1 (555) 000-0000"],
      ["Full-Time", "ABC Company", "$2,500/month"],
      ["$1,500", "24 months", "Debt Consolidation"],
    ],
    noDocuments: "No documents uploaded",
    consent: "By submitting this application, you authorize Touch of Vintage Financial, LLC to verify your information, access your credit report, and contact you regarding your application. You confirm all information provided is accurate and truthful.",
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
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [bankLinked, setBankLinked] = useState(false)

  const handleNext = () => setStep((s) => Math.min(s + 1, 6))
  const handleBack = () => setStep((s) => Math.max(s - 1, 1))
  const handleSubmit = () => setSubmitted(true)
  const addFile = (name: string) => setUploadedFiles((f) => (f.includes(name) ? f : [...f, name]))
  const removeFile = (name: string) => setUploadedFiles((f) => f.filter((x) => x !== name))

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
            <div className="absolute top-4 left-0 h-0.5 bg-[var(--brand-orange)] -z-10 transition-all" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} />
            {steps.map((label, i) => {
              const id = i + 1
              return (
                <div key={id} className="flex flex-col items-center gap-2">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                    step > id ? "bg-[var(--brand-orange)] border-[var(--brand-orange)] text-white"
                    : step === id ? "bg-white border-[var(--brand-orange)] text-[var(--brand-orange)]"
                    : "bg-white border-border text-muted-foreground"
                  )}>
                    {step > id ? <CheckCircle2 className="w-4 h-4" /> : id}
                  </div>
                  <span className={cn("text-xs hidden sm:block", step === id ? "text-[var(--brand-orange)] font-medium" : "text-muted-foreground")}>{label}</span>
                </div>
              )
            })}
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            {step === 1 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">{t.step1Title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5"><Label>{f.firstName}</Label><Input placeholder={f.firstNamePh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.lastName}</Label><Input placeholder={f.lastNamePh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.email}</Label><Input type="email" placeholder={f.emailPh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.phone}</Label><Input type="tel" placeholder={f.phonePh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.dob}</Label><Input type="date" /></div>
                  <div className="flex flex-col gap-1.5">
                    <Label>{f.contact}</Label>
                    <Select><SelectTrigger><SelectValue placeholder={f.contactPh} /></SelectTrigger>
                      <SelectContent>{t.contactOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5"><Label>{f.address}</Label><Input placeholder={f.addressPh} /></div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">{t.step2Title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>{f.empStatus}</Label>
                    <Select><SelectTrigger><SelectValue placeholder={f.empStatusPh} /></SelectTrigger>
                      <SelectContent>{t.empOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5"><Label>{f.employer}</Label><Input placeholder={f.employerPh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.jobTitle}</Label><Input placeholder={f.jobTitlePh} /></div>
                  <div className="flex flex-col gap-1.5"><Label>{f.income}</Label><Input type="number" placeholder={f.incomePh} /></div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>{f.tenure}</Label>
                    <Select><SelectTrigger><SelectValue placeholder={f.tenurePh} /></SelectTrigger>
                      <SelectContent>{t.tenureOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-6">{t.step3Title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5"><Label>{f.amount}</Label><Input type="number" placeholder={f.amountPh} min="200" max="8000" /></div>
                  <div className="flex flex-col gap-1.5">
                    <Label>{f.term}</Label>
                    <Select><SelectTrigger><SelectValue placeholder={f.termPh} /></SelectTrigger>
                      <SelectContent>{t.termOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>{f.purpose}</Label>
                    <Select><SelectTrigger><SelectValue placeholder={f.purposePh} /></SelectTrigger>
                      <SelectContent>{t.purposeOptions.map((o, i) => <SelectItem key={i} value={String(i)}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5"><Label>{f.notes}</Label><Textarea placeholder={f.notesPh} rows={4} /></div>
                </div>
                <div className="mt-6 bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-xl p-5">
                  <p className="text-xs font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.estLabel}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {t.estFields.map((label, i) => (
                      <div key={label}><p className="text-xs text-muted-foreground mb-1">{label}</p><p className="font-bold text-foreground">{["~$72", "~$170", "12.5%"][i]}</p></div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{t.estNote}</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.step4Title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step4Sub}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {t.docsList.map((doc) => (
                    <div key={doc} className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center text-center gap-3 cursor-pointer hover:border-[var(--brand-orange)] transition-colors" onClick={() => addFile(doc)}>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{doc}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{t.docsNote}</p>
                      </div>
                      <Button size="sm" variant="outline">{t.chooseFile}</Button>
                    </div>
                  ))}
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-foreground mb-3">{t.uploadedLabel}</p>
                    <div className="flex flex-col gap-2">
                      {uploadedFiles.map((file) => (
                        <div key={file} className="flex items-center justify-between bg-muted rounded-lg px-4 py-2.5">
                          <span className="text-sm text-foreground">{file}</span>
                          <button onClick={() => removeFile(file)} className="text-muted-foreground hover:text-destructive transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.bankTitle}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.bankSub}</p>
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
                    <div className="w-full max-w-sm">
                      <PlaidLinkButton
                        userId="applicant-demo"
                        label={t.bankConnect}
                        loadingLabel={t.bankLoading}
                        onSuccess={() => setBankLinked(true)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t.bankSecure}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 6 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.step5Title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t.step5Sub}</p>
                <div className="space-y-4">
                  {t.reviewSections.map((label, i) => (
                    <div key={label} className="bg-muted border border-border rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{label}</p>
                      {(i < 3 ? t.reviewItems[i] : uploadedFiles.length > 0 ? uploadedFiles : [t.noDocuments]).map((item) => (
                        <p key={item} className="text-sm text-foreground py-0.5">{item}</p>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                  {t.consent}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>{t.back}</Button>
              {step < 6 ? (
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

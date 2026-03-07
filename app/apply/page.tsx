"use client"

import { useState } from "react"
import Link from "next/link"
import { Gem, CheckCircle2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, label: "Información / Personal" },
  { id: 2, label: "Empleo / Employment" },
  { id: 3, label: "Préstamo / Loan" },
  { id: 4, label: "Documentos / Docs" },
  { id: 5, label: "Revisión / Review" },
]

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleNext = () => setStep((s) => Math.min(s + 1, 5))
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
          <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-2">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-[var(--brand-orange)] italic text-sm mb-4">Application Submitted!</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Gracias por solicitar con Touch of Vintage. Tu solicitud está en revisión. Recibirás un correo de confirmación y podrás dar seguimiento en tu panel. / Thank you for applying. Your application is now under review. You will receive an email confirmation and can track your status in your dashboard.
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
              <Link href="/dashboard">Ir al Panel / Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Volver al inicio / Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top bar */}
      <header className="bg-[var(--brand-black)] px-4 py-4 border-b border-white/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
            <div className="w-7 h-7 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center">
              <Gem className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-serif tracking-tight">Touch of Vintage</span>
          </Link>
          <p className="text-sm text-white/50">Solicitud / Loan Application</p>
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
            {steps.map(({ id, label }) => (
              <div key={id} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                    step > id
                      ? "bg-[var(--brand-orange)] border-[var(--brand-orange)] text-white"
                      : step === id
                      ? "bg-white border-[var(--brand-orange)] text-[var(--brand-orange)]"
                      : "bg-white border-border text-muted-foreground"
                  )}
                >
                  {step > id ? <CheckCircle2 className="w-4 h-4" /> : id}
                </div>
                <span className={cn("text-xs hidden sm:block", step === id ? "text-[var(--brand-orange)] font-medium" : "text-muted-foreground")}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            {step === 1 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[var(--brand-black)] mb-1">Información Personal</h2>
                <p className="text-sm text-[var(--brand-orange)] italic mb-6">Personal Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>Nombre / First Name</Label>
                    <Input placeholder="María" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Apellido / Last Name</Label>
                    <Input placeholder="García" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Correo / Email Address</Label>
                    <Input type="email" placeholder="tu@correo.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Teléfono / Phone Number</Label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Fecha de Nacimiento / Date of Birth</Label>
                    <Input type="date" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Contacto Preferido / Preferred Contact Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar / Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Correo / Email</SelectItem>
                        <SelectItem value="phone">Teléfono / Phone</SelectItem>
                        <SelectItem value="sms">SMS / Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Dirección / Home Address</Label>
                    <Input placeholder="100 Main St, Miami, FL 33101" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[var(--brand-black)] mb-1">Empleo e Ingresos</h2>
                <p className="text-sm text-[var(--brand-orange)] italic mb-6">Employment & Income</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>Estado Laboral / Employment Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar / Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Tiempo Completo / Full-Time</SelectItem>
                        <SelectItem value="part-time">Tiempo Parcial / Part-Time</SelectItem>
                        <SelectItem value="self-employed">Independiente / Self-Employed</SelectItem>
                        <SelectItem value="retired">Jubilado / Retired</SelectItem>
                        <SelectItem value="unemployed">Desempleado / Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Empleador / Employer Name</Label>
                    <Input placeholder="Empresa ABC" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Cargo / Job Title</Label>
                    <Input placeholder="Gerente de Ventas" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Ingresos Mensuales / Monthly Income (USD)</Label>
                    <Input type="number" placeholder="5000" />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Tiempo en Empleo Actual / Time at Current Employer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar / Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lt6">Menos de 6 meses / Less than 6 months</SelectItem>
                        <SelectItem value="6-12">6–12 meses / months</SelectItem>
                        <SelectItem value="1-3">1–3 años / years</SelectItem>
                        <SelectItem value="3+">3+ años / years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[var(--brand-black)] mb-1">Detalles del Préstamo</h2>
                <p className="text-sm text-[var(--brand-orange)] italic mb-6">Loan Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>Monto Solicitado / Requested Loan Amount (USD)</Label>
                    <Input type="number" placeholder="5000" min="500" max="25000" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Plazo Preferido / Preferred Repayment Term</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar / Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 meses / months</SelectItem>
                        <SelectItem value="12">12 meses / months</SelectItem>
                        <SelectItem value="24">24 meses / months</SelectItem>
                        <SelectItem value="36">36 meses / months</SelectItem>
                        <SelectItem value="48">48 meses / months</SelectItem>
                        <SelectItem value="60">60 meses / months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Propósito del Préstamo / Loan Purpose</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar / Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debt-consolidation">Consolidación de Deudas / Debt Consolidation</SelectItem>
                        <SelectItem value="medical">Gastos Médicos / Medical Expenses</SelectItem>
                        <SelectItem value="home-improvement">Mejoras al Hogar / Home Improvement</SelectItem>
                        <SelectItem value="education">Educación / Education</SelectItem>
                        <SelectItem value="vehicle">Vehículo / Vehicle Purchase/Repair</SelectItem>
                        <SelectItem value="business">Negocio / Small Business</SelectItem>
                        <SelectItem value="other">Otro / Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Notas Adicionales / Additional Notes (opcional / optional)</Label>
                    <Textarea placeholder="Contexto adicional sobre tu solicitud... / Provide any additional context..." rows={4} />
                  </div>
                </div>

                <div className="mt-6 bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-xl p-5">
                  <p className="text-xs font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">Pago Estimado / Estimated Payment</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Pago Mensual / Monthly", value: "~$231" },
                      { label: "Interés Total / Total Interest", value: "~$544" },
                      { label: "APR inicial / Starting APR", value: "12.5%" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs text-muted-foreground mb-1">{label}</p>
                        <p className="font-bold text-[var(--brand-black)]">{value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">*Estimación basada en datos de ejemplo. / Estimate based on sample input. Actual rate determined after review.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[var(--brand-black)] mb-1">Subir Documentos</h2>
                <p className="text-sm text-[var(--brand-orange)] italic mb-2">Upload Documents</p>
                <p className="text-sm text-muted-foreground mb-6">Sube los siguientes documentos para apoyar tu solicitud. / Please upload the following required documents to support your application.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    "Identificación Oficial / Government-Issued ID",
                    "Comprobante de Ingresos / Proof of Income",
                    "Comprobante de Domicilio / Proof of Address",
                  ].map((doc) => (
                    <div
                      key={doc}
                      className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center text-center gap-3 cursor-pointer hover:border-[var(--brand-orange)] transition-colors"
                      onClick={() => addFile(doc)}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{doc}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">PDF, JPG, o PNG — máx 10MB / max 10MB</p>
                      </div>
                      <Button size="sm" variant="outline">Elegir archivo / Choose File</Button>
                    </div>
                  ))}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-foreground mb-3">Archivos subidos / Uploaded files:</p>
                    <div className="flex flex-col gap-2">
                      {uploadedFiles.map((file) => (
                        <div key={file} className="flex items-center justify-between bg-muted rounded-lg px-4 py-2.5">
                          <span className="text-sm text-foreground">{file}</span>
                          <button onClick={() => removeFile(file)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[var(--brand-black)] mb-1">Revisar y Enviar</h2>
                <p className="text-sm text-[var(--brand-orange)] italic mb-2">Review & Submit</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Por favor revisa los detalles de tu solicitud antes de enviar. / Please review your application details before submitting.
                </p>

                <div className="space-y-4">
                  {[
                    { label: "Información Personal / Personal Info", items: ["María García", "tu@correo.com", "+1 (555) 000-0000"] },
                    { label: "Empleo / Employment", items: ["Tiempo Completo / Full-Time", "Empresa ABC", "$5,000/mes / month"] },
                    { label: "Préstamo / Loan Details", items: ["$5,000", "24 meses / months", "Consolidación / Debt Consolidation"] },
                    { label: "Documentos / Documents", items: uploadedFiles.length > 0 ? uploadedFiles : ["Sin documentos / No documents uploaded"] },
                  ].map(({ label, items }) => (
                    <div key={label} className="bg-muted border border-border rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{label}</p>
                      {items.map((item) => (
                        <p key={item} className="text-sm text-foreground py-0.5">{item}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                  Al enviar esta solicitud, autorizas a Touch of Vintage Financial, LLC a verificar tu información, acceder a tu reporte de crédito y contactarte sobre tu solicitud. Confirmas que toda la información proporcionada es precisa y veraz. / By submitting this application, you authorize Touch of Vintage Financial, LLC to verify your information, access your credit report, and contact you regarding your application.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Atrás / Back
              </Button>
              {step < 5 ? (
                <Button
                  onClick={handleNext}
                  className="bg-[var(--brand-black)] text-white hover:bg-[var(--brand-black-soft)]"
                >
                  Continuar / Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]"
                >
                  Enviar Solicitud / Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

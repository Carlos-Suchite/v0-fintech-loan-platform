"use client"

import Link from "next/link"
import { ArrowRight, Calendar, DollarSign, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    greeting: "Buenos días, María",
    sub: "Resumen de tus solicitudes de préstamo y actividad de cuenta.",
    newLoan: "Nueva Solicitud",
    stats: [
      { label: "Total Solicitado", value: "$1,500", sub: "1 solicitud activa" },
      { label: "Pago Mensual", value: "$72", sub: "Estimado si aprobado" },
      { label: "Estado", value: "En Revisión", sub: "Decisión esperada hoy" },
    ],
    loansTitle: "Solicitudes",
    viewAll: "Ver todas",
    loanPurpose: "Consolidación de Deudas",
    loanFields: ["Monto", "Plazo", "Mensual"],
    loanTerm: "24 meses",
    progress: "Revisión en progreso — paso 2 de 4",
    activityTitle: "Actividad Reciente",
    activity: [
      { action: "Solicitud enviada", time: "hace 2 horas" },
      { action: "Documentos subidos", time: "hace 1 hora" },
      { action: "En revisión por asesor", time: "hace 30 min" },
    ],
    quickTitle: "Acciones Rápidas",
    uploadDocs: "Subir Documentos",
    bookConsult: "Agendar Consulta",
  },
  en: {
    greeting: "Good morning, María",
    sub: "Here is a summary of your loan applications and account activity.",
    newLoan: "Apply for a New Loan",
    stats: [
      { label: "Total Applied", value: "$1,500", sub: "1 active application" },
      { label: "Monthly Payment", value: "$72", sub: "Estimated if approved" },
      { label: "Loan Status", value: "Under Review", sub: "Decision expected today" },
    ],
    loansTitle: "Loan Applications",
    viewAll: "View all",
    loanPurpose: "Debt Consolidation",
    loanFields: ["Amount", "Term", "Monthly"],
    loanTerm: "24 months",
    progress: "Review in progress — step 2 of 4",
    activityTitle: "Recent Activity",
    activity: [
      { action: "Application submitted", time: "2 hours ago" },
      { action: "Documents uploaded", time: "1 hour ago" },
      { action: "Under review by loan officer", time: "30 min ago" },
    ],
    quickTitle: "Quick Actions",
    uploadDocs: "Upload Documents",
    bookConsult: "Book Consultation",
  },
}

const statIcons = [DollarSign, Calendar, Clock]

export default function DashboardPage() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">{t.greeting}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t.sub}</p>
        </div>
        <Button asChild className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
          <Link href="/apply">{t.newLoan} <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {t.stats.map(({ label, value, sub }, i) => {
          const Icon = statIcons[i]
          return (
            <div key={label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[var(--brand-orange)]" />
                </div>
              </div>
              <p className="font-serif text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground">{t.loansTitle}</h2>
            <Link href="/dashboard/loans" className="text-xs text-[var(--brand-orange)] hover:underline">{t.viewAll}</Link>
          </div>
          <div className="bg-muted border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div>
                <p className="font-semibold text-sm text-foreground">LN-2024-001</p>
                <p className="text-xs text-muted-foreground">{t.loanPurpose} · Feb 28, 2026</p>
              </div>
              <StatusBadge status="under_review" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {t.loanFields.map((label, i) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-semibold text-sm text-foreground">{["$1,500", t.loanTerm, "$72"][i]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full w-2/4 bg-[var(--brand-orange)] rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{t.progress}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold text-foreground mb-5">{t.activityTitle}</h2>
          <div className="flex flex-col gap-4">
            {t.activity.map(({ action, time }) => (
              <div key={action} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-[var(--brand-orange)]" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{action}</p>
                  <p className="text-xs text-muted-foreground">{time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-border">
            <h3 className="font-semibold text-sm text-foreground mb-3">{t.quickTitle}</h3>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" size="sm" className="justify-start w-full hover:border-[var(--brand-orange)]/50">
                <Link href="/dashboard/documents"><FileText className="w-4 h-4 mr-2" />{t.uploadDocs}</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start w-full hover:border-[var(--brand-orange)]/50">
                <Link href="/book-meeting"><Calendar className="w-4 h-4 mr-2" />{t.bookConsult}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { ArrowRight, Calendar, DollarSign, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"

const loans = [
  {
    id: "LN-2024-001",
    amount: "$5,000",
    purpose: "Consolidación de Deudas / Debt Consolidation",
    applied: "Feb 28, 2026",
    status: "under_review" as const,
    monthly: "$231",
    term: "24 meses / months",
  },
]

const recentActivity = [
  { action: "Solicitud enviada / Application submitted", time: "hace 2 horas / 2 hours ago", icon: FileText },
  { action: "Documentos subidos / Documents uploaded", time: "hace 1 hora / 1 hour ago", icon: FileText },
  { action: "En revisión por asesor / Under review by loan officer", time: "hace 30 min / 30 min ago", icon: Clock },
]

const statCards = [
  {
    label: "Total Solicitado / Total Applied",
    value: "$5,000",
    icon: DollarSign,
    sub: "1 solicitud activa / 1 active application",
  },
  {
    label: "Pago Mensual / Monthly Payment",
    value: "$231",
    icon: Calendar,
    sub: "Estimado si aprobado / Estimated if approved",
  },
  {
    label: "Estado / Loan Status",
    value: "En Revisión",
    icon: Clock,
    sub: "Decisión esperada hoy / Decision expected today",
  },
]

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[var(--brand-black)]">
            Buenos días, María
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Resumen de tus solicitudes de préstamo y actividad de cuenta. / Here is a summary of your loan applications and account activity.
          </p>
        </div>
        <Button asChild className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
          <Link href="/apply">
            Nueva Solicitud / Apply for a New Loan <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {statCards.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[var(--brand-orange)]" />
              </div>
            </div>
            <p className="font-serif text-2xl font-bold text-[var(--brand-black)]">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan Applications */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[var(--brand-black)]">Solicitudes / Loan Applications</h2>
            <Link href="/dashboard/loans" className="text-xs text-[var(--brand-orange)] hover:underline">Ver todas / View all</Link>
          </div>
          <div className="flex flex-col gap-4">
            {loans.map((loan) => (
              <div key={loan.id} className="bg-muted border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{loan.id}</p>
                    <p className="text-xs text-muted-foreground">{loan.purpose} · {loan.applied}</p>
                  </div>
                  <StatusBadge status={loan.status} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Monto / Amount", value: loan.amount },
                    { label: "Plazo / Term", value: loan.term },
                    { label: "Mensual / Monthly", value: loan.monthly },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-semibold text-sm text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-2/4 bg-[var(--brand-orange)] rounded-full" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Revisión en progreso — paso 2 de 4 / Review in progress — step 2 of 4</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold text-[var(--brand-black)] mb-5">Actividad Reciente / Recent Activity</h2>
          <div className="flex flex-col gap-4">
            {recentActivity.map(({ action, time, icon: Icon }) => (
              <div key={action} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[var(--brand-orange)]" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{action}</p>
                  <p className="text-xs text-muted-foreground">{time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <h3 className="font-semibold text-sm text-foreground mb-3">Acciones Rápidas / Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" size="sm" className="justify-start w-full hover:border-[var(--brand-orange)]/50">
                <Link href="/dashboard/documents">
                  <FileText className="w-4 h-4 mr-2" />
                  Subir Documentos / Upload Documents
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start w-full hover:border-[var(--brand-orange)]/50">
                <Link href="/book-meeting">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Consulta / Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

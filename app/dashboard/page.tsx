import Link from "next/link"
import { ArrowRight, Calendar, DollarSign, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"

const loans = [
  {
    id: "LN-2024-001",
    amount: "$5,000",
    purpose: "Debt Consolidation",
    applied: "Feb 28, 2026",
    status: "under_review" as const,
    monthly: "$231",
    term: "24 months",
  },
]

const recentActivity = [
  { action: "Application submitted", time: "2 hours ago", icon: FileText },
  { action: "Documents uploaded", time: "1 hour ago", icon: FileText },
  { action: "Under review by loan officer", time: "30 min ago", icon: Clock },
]

const statCards = [
  {
    label: "Total Applied",
    value: "$5,000",
    icon: DollarSign,
    sub: "1 active application",
  },
  {
    label: "Monthly Payment",
    value: "$231",
    icon: Calendar,
    sub: "Estimated if approved",
  },
  {
    label: "Loan Status",
    value: "Under Review",
    icon: Clock,
    sub: "Decision expected today",
  },
]

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)]">
            Good morning, Alexandra
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here is a summary of your loan applications and account activity.
          </p>
        </div>
        <Button asChild className="bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
          <Link href="/apply">
            Apply for a New Loan <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {statCards.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-[var(--teal-light)] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[var(--teal)]" />
              </div>
            </div>
            <p className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)]">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan Applications */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[var(--navy)]">Loan Applications</h2>
            <Link href="/dashboard/loans" className="text-xs text-[var(--teal)] hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-4">
            {loans.map((loan) => (
              <div key={loan.id} className="bg-muted border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{loan.id}</p>
                    <p className="text-xs text-muted-foreground">{loan.purpose} · Applied {loan.applied}</p>
                  </div>
                  <StatusBadge status={loan.status} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Amount", value: loan.amount },
                    { label: "Term", value: loan.term },
                    { label: "Est. Monthly", value: loan.monthly },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-semibold text-sm text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-2/4 bg-[var(--teal)] rounded-full" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Review in progress — step 2 of 4</p>
                </div>
              </div>
            ))}

            {loans.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No applications yet.{" "}
                <Link href="/apply" className="text-[var(--teal)] hover:underline">Apply now</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold text-[var(--navy)] mb-5">Recent Activity</h2>
          <div className="flex flex-col gap-4">
            {recentActivity.map(({ action, time, icon: Icon }) => (
              <div key={action} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--teal-light)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[var(--teal)]" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{action}</p>
                  <p className="text-xs text-muted-foreground">{time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <h3 className="font-semibold text-sm text-foreground mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" size="sm" className="justify-start w-full">
                <Link href="/dashboard/documents">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Documents
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start w-full">
                <Link href="/book-meeting">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

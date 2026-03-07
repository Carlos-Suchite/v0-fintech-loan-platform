import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"

const loans = [
  {
    id: "LN-2026-001",
    amount: "$1,500",
    purpose: "Debt Consolidation",
    applied: "Feb 28, 2026",
    status: "under_review" as const,
    monthly: "$72",
    term: "24 months",
    apr: "12.5%",
  },
  {
    id: "LN-2025-018",
    amount: "$800",
    purpose: "Medical Expenses",
    applied: "Jun 10, 2025",
    status: "approved" as const,
    monthly: "$35",
    term: "24 months",
    apr: "10.9%",
  },
  {
    id: "LN-2024-042",
    amount: "$500",
    purpose: "Home Improvement",
    applied: "Nov 3, 2024",
    status: "rejected" as const,
    monthly: "—",
    term: "—",
    apr: "—",
  },
]

export default function LoansPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">My Loans</h1>
          <p className="text-muted-foreground text-sm mt-1">All your loan applications in one place.</p>
        </div>
        <Button asChild className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
          <Link href="/apply">
            Apply for a New Loan <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {loans.map((loan) => (
          <div key={loan.id} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div>
                <p className="font-semibold text-foreground">{loan.id}</p>
                <p className="text-sm text-muted-foreground">{loan.purpose} · Applied {loan.applied}</p>
              </div>
              <StatusBadge status={loan.status} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              {[
                { label: "Loan Amount", value: loan.amount },
                { label: "Repayment Term", value: loan.term },
                { label: "Monthly Payment", value: loan.monthly },
                { label: "APR", value: loan.apr },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-semibold text-sm text-foreground mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

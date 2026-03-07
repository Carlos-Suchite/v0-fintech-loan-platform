import Link from "next/link"
import { DollarSign, Users, FileText, Calendar, TrendingUp, ArrowRight } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"

const stats = [
  { label: "Total Funded", value: "$1.24M", change: "+12% this month", icon: DollarSign, color: "var(--teal)" },
  { label: "Active Users", value: "342", change: "+28 this week", icon: Users, color: "var(--navy)" },
  { label: "Pending Applications", value: "18", change: "Needs review", icon: FileText, color: "#f59e0b" },
  { label: "Appointments Today", value: "7", change: "3 upcoming", icon: Calendar, color: "#10b981" },
]

const recentApplications = [
  { id: "LN-2026-045", name: "James Torres", amount: "$8,000", purpose: "Home Improvement", date: "Mar 7, 2026", status: "pending" as const },
  { id: "LN-2026-044", name: "Priya Menon", amount: "$3,500", purpose: "Medical", date: "Mar 7, 2026", status: "under_review" as const },
  { id: "LN-2026-043", name: "Marcus Lee", amount: "$12,000", purpose: "Debt Consolidation", date: "Mar 6, 2026", status: "approved" as const },
  { id: "LN-2026-042", name: "Sophia Kim", amount: "$5,000", purpose: "Education", date: "Mar 6, 2026", status: "under_review" as const },
  { id: "LN-2026-041", name: "Daniel Cruz", amount: "$2,500", purpose: "Vehicle", date: "Mar 5, 2026", status: "rejected" as const },
]

const upcomingAppointments = [
  { name: "Alexandra Chen", type: "Loan Review", time: "2:00 PM", date: "Mar 10", officer: "Marcus Williams" },
  { name: "James Torres", type: "Initial Consultation", time: "10:30 AM", date: "Mar 11", officer: "Sophie Okafor" },
  { name: "Priya Menon", type: "Follow-up", time: "3:15 PM", date: "Mar 12", officer: "David Reyes" },
]

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)]">Admin Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here is a summary of all platform activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">{label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
            </div>
            <p className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)]">{value}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              {change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-[var(--navy)]">Recent Applications</h2>
            <Link href="/admin/applications" className="text-xs text-[var(--teal)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentApplications.map((app) => (
              <div key={app.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[var(--navy)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {app.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{app.name}</p>
                    <p className="text-xs text-muted-foreground">{app.id} · {app.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="font-semibold text-sm text-foreground">{app.amount}</p>
                    <p className="text-xs text-muted-foreground">{app.date}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-[var(--navy)]">Upcoming Meetings</h2>
            <Link href="/admin/appointments" className="text-xs text-[var(--teal)] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {upcomingAppointments.map((apt) => (
              <div key={apt.name} className="px-6 py-4">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-sm text-foreground">{apt.name}</p>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{apt.date}</p>
                    <p>{apt.time}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{apt.type}</p>
                <p className="text-xs text-[var(--teal)] mt-0.5">{apt.officer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

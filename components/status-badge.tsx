import { cn } from "@/lib/utils"

type Status = "pending" | "under_review" | "approved" | "rejected"

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: {
    label: "Pendiente / Pending",
    className: "bg-amber-100 text-amber-800",
  },
  under_review: {
    label: "En Revisión / Under Review",
    className: "bg-[var(--brand-orange-light)] text-[var(--brand-orange-dark)]",
  },
  approved: {
    label: "Aprobado / Approved",
    className: "bg-green-100 text-green-800",
  },
  rejected: {
    label: "Rechazado / Rejected",
    className: "bg-red-100 text-red-800",
  },
}

export function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        cfg.className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {cfg.label}
    </span>
  )
}

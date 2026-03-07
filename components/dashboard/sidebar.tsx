"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Upload,
  User,
  LogOut,
  Gem,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Resumen / Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mis Préstamos / My Loans", href: "/dashboard/loans", icon: FileText },
  { label: "Documentos / Documents", href: "/dashboard/documents", icon: Upload },
  { label: "Citas / Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Perfil / Profile", href: "/dashboard/profile", icon: User },
]

interface SidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "flex flex-col h-full bg-[var(--brand-black)]",
      mobile ? "w-full" : "w-64"
    )}>
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5 text-white font-bold">
          <div className="w-7 h-7 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center">
            <Gem className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-serif text-base tracking-tight">Touch of Vintage</span>
        </Link>
        {mobile && (
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs text-white/30 uppercase tracking-widest px-3 mb-3">Panel del Cliente / Client Portal</p>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  pathname === href
                    ? "bg-[var(--brand-orange)] text-white font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-orange)] flex items-center justify-center text-white text-xs font-bold">
            MG
          </div>
          <div>
            <p className="text-sm text-white font-medium">María García</p>
            <p className="text-xs text-white/40">Cliente / Client</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión / Sign Out
        </Link>
      </div>
    </aside>
  )
}

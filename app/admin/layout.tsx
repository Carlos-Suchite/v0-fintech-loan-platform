"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Menu } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-muted overflow-hidden">
      <div className="hidden lg:flex flex-shrink-0">
        <AdminSidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-72">
            <AdminSidebar mobile onClose={() => setMobileOpen(false)} />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#0f172a" }}>
          <button onClick={() => setMobileOpen(true)} className="text-white p-1">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-white font-semibold font-[family-name:var(--font-jakarta)]">SwiftLend Admin</span>
          <div className="w-7" />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

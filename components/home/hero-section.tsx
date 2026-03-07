"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    badge: "Más de 10,000 clientes satisfechos",
    heading: "Préstamos personales,",
    accent: "rápidos y transparentes.",
    body: "Solicita en línea en minutos. Decisión en horas. Sin cargos ocultos ni sorpresas — solo el financiamiento que necesitas para avanzar.",
    cta: "Solicitar Ahora",
    secondary: "Cómo Funciona",
    trust: ["Seguridad Bancaria", "Pre-aprobación Rápida", "Fondos en 24h"],
    cardTitle: "Resumen del Préstamo",
    cardRows: ["Monto", "Plazo", "Pago Mensual", "APR"],
    cardVals: ["$1,500", "24 meses", "$72", "12.5%"],
    approval: "Probabilidad de aprobación: Alta",
  },
  en: {
    badge: "Trusted by 10,000+ borrowers",
    heading: "Personal loans,",
    accent: "fast & transparent.",
    body: "Apply online in minutes. Get a decision within hours. No hidden fees, no surprises — just the funding you need to move forward.",
    cta: "Apply Now",
    secondary: "How It Works",
    trust: ["Bank-Level Security", "Instant Pre-Approval", "Funds in 24 Hours"],
    cardTitle: "Loan Summary",
    cardRows: ["Amount", "Term", "Monthly Payment", "APR"],
    cardVals: ["$1,500", "24 months", "$72", "12.5%"],
    approval: "Approval likelihood: High",
  },
}

const trustIcons = [ShieldCheck, Zap, Clock]

export function HeroSection() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <section className="relative overflow-hidden bg-[var(--brand-black)] pt-32 pb-24 px-4">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--brand-orange)]" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left — text content */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-orange)]" />
            {t.badge}
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance mb-6">
            {t.heading}{" "}
            <span className="text-[var(--brand-orange)]">{t.accent}</span>
          </h1>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
            {t.body}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)] text-white font-semibold px-8"
            >
              <Link href="/apply">
                {t.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 px-8"
            >
              <Link href="/how-it-works">{t.secondary}</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 mt-12">
            {t.trust.map((label, i) => {
              const Icon = trustIcons[i]
              return (
                <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                  <Icon className="w-4 h-4 text-[var(--brand-orange)]" />
                  {label}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right — loan summary card */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
            <p className="text-xs text-white/50 uppercase tracking-widest mb-4">{t.cardTitle}</p>
            <div className="space-y-3">
              {t.cardRows.map((label, i) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/50">{label}</span>
                  <span className="text-white font-medium">{t.cardVals[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-[var(--brand-orange)] rounded-full" />
              </div>
              <p className="text-xs text-white/40 mt-2">{t.approval}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

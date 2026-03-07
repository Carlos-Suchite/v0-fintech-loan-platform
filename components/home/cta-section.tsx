"use client"

import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    heading: "¿Listo para comenzar?",
    body: "Solicita un préstamo personal hoy o agenda una consulta gratuita con uno de nuestros asesores financieros.",
    cta: "Solicitar Préstamo",
    secondary: "Agendar Consulta",
  },
  en: {
    heading: "Ready to get started?",
    body: "Apply for a personal loan today or schedule a free consultation with one of our financial advisors.",
    cta: "Apply for a Loan",
    secondary: "Book a Consultation",
  },
}

export function CTASection() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <section className="relative py-24 px-4 bg-[var(--brand-black)] overflow-hidden">
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[var(--brand-orange)]" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[var(--brand-orange)]" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[var(--brand-orange)]" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[var(--brand-orange)]" />
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-block mb-6 px-4 py-1 rounded-full bg-[var(--brand-orange)]/15 border border-[var(--brand-orange)]/30">
          <span className="text-sm text-[var(--brand-orange)] font-medium">Touch of Vintage</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
          {t.heading}
        </h2>
        <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          {t.body}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-dark)] text-white font-semibold px-8">
            <Link href="/apply">
              {t.cta} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10 px-8">
            <Link href="/book-meeting">
              <Calendar className="mr-2 w-4 h-4" />
              {t.secondary}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

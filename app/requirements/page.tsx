"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { CheckCircle2, XCircle, FileText, User, Briefcase, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    tag: "Elegibilidad",
    h1: "Requisitos",
    intro: "Verifica si calificas antes de solicitar. Nuestros requisitos están diseñados para ser claros e incluyentes.",
    eligibleTitle: "Solicitantes elegibles",
    eligible: [
      "Ciudadano estadounidense o residente permanente",
      "Al menos 18 años de edad",
      "Identificación oficial con foto válida",
      "Ingresos mensuales mínimos de $800",
      "Cuenta de cheques activa en EE.UU.",
      "Sin quiebras declaradas en los últimos 24 meses",
    ],
    notEligibleTitle: "No elegibles",
    notEligible: [
      "Residentes no estadounidenses (excepto residentes permanentes)",
      "Menores de 18 años",
      "Procesos de quiebra activos",
      "Sin fuente de ingresos verificable",
    ],
    docsTitle: "Documentos requeridos",
    docs: [
      { title: "Identificación Oficial", examples: "Licencia de conducir, pasaporte o identificación estatal" },
      { title: "Comprobante de Ingresos", examples: "Últimos 2 recibos de nómina, carta del empleador o estados de cuenta" },
      { title: "Comprobante de Domicilio", examples: "Recibo de servicio o estado de cuenta con fecha de los últimos 60 días" },
      { title: "Datos Bancarios", examples: "Cheque cancelado o formulario de depósito directo" },
    ],
    productsTitle: "Productos disponibles",
    loanRanges: [
      { range: "$200 – $800", term: "6–12 meses", apr: "Desde 9.9%" },
      { range: "$800 – $3,000", term: "12–36 meses", apr: "Desde 8.9%" },
      { range: "$3,000 – $8,000", term: "24–60 meses", apr: "Desde 7.9%" },
    ],
    tableHeaders: ["Monto", "Plazo", "APR inicial"],
    note: "*Las tasas son indicativas y están sujetas a evaluación crediticia.",
    cta: "Verificar Elegibilidad",
  },
  en: {
    tag: "Eligibility",
    h1: "Requirements",
    intro: "Check if you qualify before applying. Our requirements are designed to be clear and inclusive.",
    eligibleTitle: "Eligible applicants",
    eligible: [
      "US citizen or permanent resident",
      "At least 18 years of age",
      "Valid government-issued photo ID",
      "Minimum monthly income of $800",
      "Active checking account in the US",
      "No bankruptcies filed in the past 24 months",
    ],
    notEligibleTitle: "Not eligible",
    notEligible: [
      "Non-US residents or visa holders",
      "Under 18 years of age",
      "Active bankruptcy proceedings",
      "No verifiable income source",
    ],
    docsTitle: "Required documents",
    docs: [
      { title: "Government-Issued ID", examples: "Driver's license, passport, or state ID" },
      { title: "Proof of Income", examples: "Last 2 pay stubs, employer letter, or bank statements" },
      { title: "Proof of Address", examples: "Utility bill or bank statement dated within 60 days" },
      { title: "Bank Account Details", examples: "Voided check or direct deposit form" },
    ],
    productsTitle: "Available loan products",
    loanRanges: [
      { range: "$200 – $800", term: "6–12 months", apr: "From 9.9%" },
      { range: "$800 – $3,000", term: "12–36 months", apr: "From 8.9%" },
      { range: "$3,000 – $8,000", term: "24–60 months", apr: "From 7.9%" },
    ],
    tableHeaders: ["Loan Amount", "Repayment Term", "Starting APR"],
    note: "*Rates are indicative and subject to credit assessment.",
    cta: "Check My Eligibility",
  },
}

const docIcons = [User, Briefcase, FileText, DollarSign]

export default function RequirementsPage() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <main>
      <Navbar />
      <div className="pt-20 pb-8 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">{t.h1}</h1>
          <p className="text-white/60 text-base leading-relaxed">{t.intro}</p>
        </div>
      </div>

      <section className="pt-10 pb-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card border border-border rounded-2xl p-7">
            <h2 className="font-serif text-xl font-bold text-foreground mb-6">{t.eligibleTitle}</h2>
            <ul className="flex flex-col gap-4">
              {t.eligible.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-7">
            <h2 className="font-serif text-xl font-bold text-foreground mb-6">{t.notEligibleTitle}</h2>
            <ul className="flex flex-col gap-4">
              {t.notEligible.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">{t.docsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.docs.map(({ title, examples }, i) => {
              const Icon = docIcons[i]
              return (
                <div key={title} className="bg-muted border border-border rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[var(--brand-orange)]" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{examples}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">{t.productsTitle}</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--brand-black)] text-white">
                <tr>
                  {t.tableHeaders.map((h) => (
                    <th key={h} className="text-left px-6 py-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {t.loanRanges.map(({ range, term, apr }) => (
                  <tr key={range} className="hover:bg-muted transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{range}</td>
                    <td className="px-6 py-4 text-muted-foreground">{term}</td>
                    <td className="px-6 py-4 text-[var(--brand-orange)] font-medium">{apr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">{t.note}</p>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
            <Link href="/apply">{t.cta}</Link>
          </Button>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

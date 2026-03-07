import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { CheckCircle2, XCircle, FileText, User, Briefcase, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const eligible = [
  "Ciudadano estadounidense o residente permanente / US citizen or permanent resident",
  "Al menos 18 años de edad / At least 18 years of age",
  "Identificación oficial con foto válida / Valid government-issued photo ID",
  "Ingresos mensuales mínimos de $800 / Minimum monthly income of $800",
  "Cuenta de cheques activa en EE.UU. / Active checking account in the US",
  "Sin quiebras declaradas en los últimos 24 meses / No bankruptcies filed in the past 24 months",
]

const notEligible = [
  "Residentes no estadounidenses (excepto residentes permanentes) / Non-US residents or visa holders",
  "Menores de 18 años / Under 18 years of age",
  "Procesos de quiebra activos / Active bankruptcy proceedings",
  "Sin fuente de ingresos verificable / No verifiable income source",
]

const documents = [
  {
    icon: User,
    title: "Identificación Oficial / Government-Issued ID",
    examples: "Licencia de conducir, pasaporte o identificación estatal / Driver's license, passport, or state ID",
  },
  {
    icon: Briefcase,
    title: "Comprobante de Ingresos / Proof of Income",
    examples: "Últimos 2 recibos de nómina, carta del empleador o estados de cuenta / Last 2 pay stubs, employer letter, or bank statements",
  },
  {
    icon: FileText,
    title: "Comprobante de Domicilio / Proof of Address",
    examples: "Recibo de servicio o estado de cuenta con fecha de los últimos 60 días / Utility bill or bank statement dated within 60 days",
  },
  {
    icon: DollarSign,
    title: "Datos Bancarios / Bank Account Details",
    examples: "Cheque cancelado o formulario de depósito directo / Voided check or direct deposit form",
  },
]

const loanRanges = [
  { range: "$200 – $800", term: "6–12 meses / months", apr: "Desde / From 9.9%" },
  { range: "$800 – $3,000", term: "12–36 meses / months", apr: "Desde / From 8.9%" },
  { range: "$3,000 – $8,000", term: "24–60 meses / months", apr: "Desde / From 7.9%" },
]

export default function RequirementsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">Elegibilidad / Eligibility</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-2 text-balance">
            Requisitos
          </h1>
          <p className="text-[var(--brand-orange)] italic text-lg mb-5">Loan Requirements</p>
          <p className="text-white/60 text-base leading-relaxed">
            Verifica si calificas antes de solicitar. Nuestros requisitos están diseñados para ser claros e incluyentes. / Check if you qualify before applying.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Eligible */}
          <div className="bg-card border border-border rounded-2xl p-7">
            <h2 className="font-serif text-xl font-bold text-[var(--brand-black)] mb-1">
              Solicitantes elegibles
            </h2>
            <p className="text-sm text-[var(--brand-orange)] italic mb-6">Eligible applicants</p>
            <ul className="flex flex-col gap-4">
              {eligible.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not eligible */}
          <div className="bg-card border border-border rounded-2xl p-7">
            <h2 className="font-serif text-xl font-bold text-[var(--brand-black)] mb-1">
              No elegibles
            </h2>
            <p className="text-sm text-[var(--brand-orange)] italic mb-6">Not eligible</p>
            <ul className="flex flex-col gap-4">
              {notEligible.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documents */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1 text-center">
            Documentos requeridos
          </h2>
          <p className="text-[var(--brand-orange)] italic text-center mb-8">Required documents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {documents.map(({ icon: Icon, title, examples }) => (
              <div key={title} className="bg-muted border border-border rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--brand-orange)]" />
                </div>
                <h3 className="font-semibold text-sm text-[var(--brand-black)] mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{examples}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loan ranges */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1 text-center">
            Productos disponibles
          </h2>
          <p className="text-[var(--brand-orange)] italic text-center mb-8">Available loan products</p>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--brand-black)] text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-medium">Monto / Loan Amount</th>
                  <th className="text-left px-6 py-4 font-medium">Plazo / Repayment Term</th>
                  <th className="text-left px-6 py-4 font-medium">APR inicial / Starting APR</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {loanRanges.map(({ range, term, apr }) => (
                  <tr key={range} className="hover:bg-muted transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{range}</td>
                    <td className="px-6 py-4 text-muted-foreground">{term}</td>
                    <td className="px-6 py-4 text-[var(--brand-orange)] font-medium">{apr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            *Las tasas son indicativas y están sujetas a evaluación crediticia. / Rates are indicative and subject to credit assessment.
          </p>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
            <Link href="/apply">Verificar Elegibilidad / Check My Eligibility</Link>
          </Button>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

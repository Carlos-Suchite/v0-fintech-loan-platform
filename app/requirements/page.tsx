import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { CheckCircle2, XCircle, FileText, User, Briefcase, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const eligible = [
  "US citizen or permanent resident",
  "At least 18 years of age",
  "Valid government-issued photo ID",
  "Minimum monthly income of $1,500",
  "Active checking account in the US",
  "No bankruptcies filed in the past 24 months",
]

const notEligible = [
  "Non-US residents or visa holders (except permanent residents)",
  "Under 18 years of age",
  "Active bankruptcy proceedings",
  "No verifiable income source",
]

const documents = [
  {
    icon: User,
    title: "Government-Issued ID",
    examples: "Driver's license, passport, or state ID",
  },
  {
    icon: Briefcase,
    title: "Proof of Income",
    examples: "Last 2 pay stubs, employer letter, or bank statements",
  },
  {
    icon: FileText,
    title: "Proof of Address",
    examples: "Utility bill or bank statement dated within 60 days",
  },
  {
    icon: DollarSign,
    title: "Bank Account Details",
    examples: "Voided check or direct deposit form",
  },
]

const loanRanges = [
  { range: "$500 – $2,500", term: "6–12 months", apr: "From 9.9%" },
  { range: "$2,500 – $10,000", term: "12–36 months", apr: "From 8.9%" },
  { range: "$10,000 – $25,000", term: "24–60 months", apr: "From 7.9%" },
]

export default function RequirementsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Eligibility</p>
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            Loan requirements
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Check if you qualify before applying. Our requirements are designed to be straightforward and inclusive.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Eligible */}
          <div className="bg-card border border-border rounded-2xl p-7">
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--navy)] mb-6">
              Eligible applicants
            </h2>
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
            <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--navy)] mb-6">
              Not eligible
            </h2>
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
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-8 text-center">
            Required documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {documents.map(({ icon: Icon, title, examples }) => (
              <div key={title} className="bg-muted border border-border rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-[var(--teal-light)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--teal)]" />
                </div>
                <h3 className="font-semibold text-sm text-[var(--navy)] mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{examples}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loan ranges */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-8 text-center">
            Available loan products
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--navy)] text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-medium">Loan Amount</th>
                  <th className="text-left px-6 py-4 font-medium">Repayment Term</th>
                  <th className="text-left px-6 py-4 font-medium">Starting APR</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {loanRanges.map(({ range, term, apr }) => (
                  <tr key={range}>
                    <td className="px-6 py-4 font-medium text-foreground">{range}</td>
                    <td className="px-6 py-4 text-muted-foreground">{term}</td>
                    <td className="px-6 py-4 text-[var(--teal)] font-medium">{apr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            *Rates are indicative and subject to credit assessment. Representative APR may differ.
          </p>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
            <Link href="/apply">Check My Eligibility</Link>
          </Button>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

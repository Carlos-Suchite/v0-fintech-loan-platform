import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ClipboardList, Search, BadgeCheck, Banknote, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Complete Your Application",
    description:
      "Start with our secure online form. Provide basic personal and financial details — it takes under 5 minutes. No paperwork, no branch visit required.",
    details: [
      "Personal information (name, address, date of birth)",
      "Employment status and monthly income",
      "Desired loan amount and purpose",
      "Preferred contact method",
    ],
  },
  {
    icon: Search,
    step: "02",
    title: "Upload Supporting Documents",
    description:
      "We'll ask you to upload a government-issued ID and proof of income digitally. Our platform uses 256-bit encryption to keep your data safe.",
    details: [
      "Government-issued photo ID",
      "Recent pay stubs or bank statements",
      "Proof of address (if required)",
      "Any additional supporting documents",
    ],
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Our Team Reviews Your File",
    description:
      "A dedicated loan officer reviews your application and documents. You may be contacted for clarification. Most reviews are completed in under 4 hours.",
    details: [
      "Creditworthiness assessment",
      "Income and employment verification",
      "Loan terms calculated based on your profile",
      "Decision communicated via email and dashboard",
    ],
  },
  {
    icon: Banknote,
    step: "04",
    title: "Funds Transferred",
    description:
      "Upon approval, your loan agreement is sent for e-signature. Once signed, funds are deposited directly to your bank account — often the same business day.",
    details: [
      "E-sign your loan agreement",
      "Funds deposited via ACH transfer",
      "Repayment schedule provided in your dashboard",
      "Automatic payment reminders enabled",
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Process</p>
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            How it works
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            From application to funding — here is exactly what to expect at each stage.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {steps.map(({ icon: Icon, step, title, description, details }, i) => (
            <div key={step} className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--teal-light)] flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[var(--teal)]" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-3 hidden sm:block" />
                )}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-[var(--teal)] uppercase tracking-widest mb-1">Step {step}</p>
                <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-3">
                  {title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{description}</p>
                <ul className="flex flex-col gap-2">
                  {details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--teal)] flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Button asChild size="lg" className="bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
            <Link href="/apply">Start Your Application</Link>
          </Button>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { TrendingUp, Heart, Users, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "People First",
    description: "We treat every applicant as a person, not a number. Empathy and respect are at the core of everything we do.",
  },
  {
    icon: TrendingUp,
    title: "Financial Empowerment",
    description: "Our mission is to give everyone access to fair, affordable credit — regardless of their background.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "We invest in the communities we serve through financial literacy programs and responsible lending.",
  },
  {
    icon: Award,
    title: "Integrity Always",
    description: "Full transparency. No hidden fees, no predatory terms, no fine print designed to confuse.",
  },
]

const team = [
  { name: "Alexandra Chen", role: "Chief Executive Officer", initials: "AC" },
  { name: "Marcus Williams", role: "Chief Risk Officer", initials: "MW" },
  { name: "Sophie Okafor", role: "Head of Operations", initials: "SO" },
  { name: "David Reyes", role: "Lead Loan Officer", initials: "DR" },
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            About SwiftLend
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Founded in 2018, SwiftLend was built on a simple belief: everyone deserves access to fair and transparent personal credit.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed mb-16 space-y-5">
            <p>
              SwiftLend was founded by a team of fintech veterans who saw firsthand how traditional banks were failing everyday Americans — long waits, opaque processes, and rates that didn&apos;t reflect a borrower&apos;s true creditworthiness.
            </p>
            <p>
              We built SwiftLend to be different. Our proprietary underwriting model looks beyond just a credit score to give a fuller picture of who you are financially. Combined with a streamlined digital application process, we can deliver fast decisions with competitive rates.
            </p>
            <p>
              Since our founding, we have funded over $250M in personal loans to more than 10,000 borrowers across the United States. We are licensed in 45 states and committed to responsible, community-focused lending.
            </p>
          </div>

          {/* Values */}
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-8 text-center">
            Our values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 bg-muted border border-border rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--teal-light)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[var(--teal)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--navy)] mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team */}
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-8 text-center">
            Leadership team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, initials }) => (
              <div key={name} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--navy)] flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-white">{initials}</span>
                </div>
                <p className="font-semibold text-sm text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

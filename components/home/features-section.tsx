import { ShieldCheck, Percent, Users, FileText, HeadphonesIcon, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Percent,
    title: "Competitive Rates",
    description: "Transparent APR from 8.9% with no origination fees, prepayment penalties, or hidden charges.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Bank-level 256-bit encryption protects your personal and financial data at every step.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "A dedicated loan officer is assigned to your application to guide you through the process.",
  },
  {
    icon: FileText,
    title: "Simple Documentation",
    description: "Upload ID and proof of income digitally. No faxing, no mail, no hassle.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our team is available via chat, email, and phone to answer any questions you have.",
  },
  {
    icon: RefreshCw,
    title: "Flexible Repayment",
    description: "Choose repayment terms from 6 to 60 months to fit your budget and lifestyle.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Why SwiftLend</p>
          <h2 className="font-[family-name:var(--font-jakarta)] text-4xl font-bold text-[var(--navy)] text-balance">
            Built for your financial wellbeing
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--teal-light)] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[var(--teal)]" />
              </div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

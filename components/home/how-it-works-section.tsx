import { ClipboardList, Search, BadgeCheck, Banknote } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Complete Your Application",
    description: "Fill out our secure online form in under 5 minutes. No paperwork, no branch visits required.",
  },
  {
    icon: Search,
    step: "02",
    title: "We Review Your Details",
    description: "Our team reviews your application and documents swiftly — typically within a few hours.",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Receive Your Decision",
    description: "Get a clear approval or next steps delivered to your email and dashboard.",
  },
  {
    icon: Banknote,
    step: "04",
    title: "Funds Deposited",
    description: "Approved funds are transferred directly to your bank account, often the same business day.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Process</p>
          <h2 className="font-[family-name:var(--font-jakarta)] text-4xl font-bold text-[var(--navy)] text-balance">
            How it works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            From application to funding in four simple steps. No hidden requirements, no guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--teal-light)] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[var(--teal)]" />
                  </div>
                  <span className="text-4xl font-bold text-border font-[family-name:var(--font-jakarta)]">{step}</span>
                </div>
                <h3 className="font-semibold text-[var(--navy)] mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

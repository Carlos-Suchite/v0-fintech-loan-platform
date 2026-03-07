import { ClipboardList, Search, BadgeCheck, Banknote } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Completa tu Solicitud",
    subtitle: "Complete Your Application",
    description: "Llena nuestro formulario seguro en línea en menos de 5 minutos. Sin papeleo, sin visitas a sucursal. / Fill out our secure online form in under 5 minutes. No paperwork, no branch visits required.",
  },
  {
    icon: Search,
    step: "02",
    title: "Revisamos tus Datos",
    subtitle: "We Review Your Details",
    description: "Nuestro equipo revisa tu solicitud y documentos rápidamente — generalmente en pocas horas. / Our team reviews your application and documents swiftly — typically within a few hours.",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Recibes tu Decisión",
    subtitle: "Receive Your Decision",
    description: "Obtén una aprobación clara o los pasos siguientes en tu correo y en tu panel. / Get a clear approval or next steps delivered to your email and dashboard.",
  },
  {
    icon: Banknote,
    step: "04",
    title: "Fondos Depositados",
    subtitle: "Funds Deposited",
    description: "Los fondos aprobados se transfieren directamente a tu cuenta bancaria, a menudo el mismo día hábil. / Approved funds are transferred directly to your bank account, often the same business day.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">Proceso / Process</p>
          <h2 className="font-serif text-4xl font-bold text-[var(--brand-black)] text-balance">
            Cómo Funciona
          </h2>
          <p className="text-base text-[var(--brand-orange)] italic mt-1">How It Works</p>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            De solicitud a fondeo en cuatro simples pasos. Sin requisitos ocultos. / From application to funding in four simple steps. No hidden requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ icon: Icon, step, title, subtitle, description }) => (
            <div key={step} className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg hover:border-[var(--brand-orange)]/30 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-orange-light)] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[var(--brand-orange)]" />
                  </div>
                  <span className="text-4xl font-bold text-border font-serif">{step}</span>
                </div>
                <h3 className="font-semibold text-[var(--brand-black)] mb-0.5">{title}</h3>
                <p className="text-xs text-[var(--brand-orange)] italic mb-3">{subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

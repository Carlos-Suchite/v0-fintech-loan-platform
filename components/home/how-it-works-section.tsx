"use client"

import { ClipboardList, Search, BadgeCheck, Banknote } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const icons = [ClipboardList, Search, BadgeCheck, Banknote]

const content = {
  es: {
    tag: "Proceso",
    heading: "Cómo Funciona",
    sub: "De solicitud a fondeo en cuatro simples pasos. Sin requisitos ocultos.",
    steps: [
      { step: "01", title: "Completa tu Solicitud", description: "Llena nuestro formulario seguro en línea en menos de 5 minutos. Sin papeleo, sin visitas a sucursal." },
      { step: "02", title: "Revisamos tus Datos", description: "Nuestro equipo revisa tu solicitud y documentos rápidamente — generalmente en pocas horas." },
      { step: "03", title: "Recibes tu Decisión", description: "Obtén una aprobación clara o los pasos siguientes en tu correo y en tu panel de cliente." },
      { step: "04", title: "Fondos Depositados", description: "Los fondos aprobados se transfieren directamente a tu cuenta bancaria, a menudo el mismo día hábil." },
    ],
  },
  en: {
    tag: "Process",
    heading: "How It Works",
    sub: "From application to funding in four simple steps. No hidden requirements.",
    steps: [
      { step: "01", title: "Complete Your Application", description: "Fill out our secure online form in under 5 minutes. No paperwork, no branch visits required." },
      { step: "02", title: "We Review Your Details", description: "Our team reviews your application and documents swiftly — typically within a few hours." },
      { step: "03", title: "Receive Your Decision", description: "Get a clear approval or next steps delivered to your email and client dashboard." },
      { step: "04", title: "Funds Deposited", description: "Approved funds are transferred directly to your bank account, often the same business day." },
    ],
  },
}

export function HowItWorksSection() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden">
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[var(--brand-orange)]/50" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[var(--brand-orange)]/50" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[var(--brand-orange)]/50" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[var(--brand-orange)]/50" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h2 className="font-serif text-4xl font-bold text-foreground text-balance">{t.heading}</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.steps.map(({ step, title, description }, i) => {
            const Icon = icons[i]
            return (
              <div key={step} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg hover:border-[var(--brand-orange)]/50 transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-orange)] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-[var(--brand-orange)]/20 font-serif">{step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

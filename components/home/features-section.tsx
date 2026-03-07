"use client"

import { ShieldCheck, Percent, Users, FileText, HeadphonesIcon, RefreshCw } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const icons = [Percent, ShieldCheck, Users, FileText, HeadphonesIcon, RefreshCw]

const content = {
  es: {
    tag: "Por Qué Elegirnos",
    heading: "Construido para tu bienestar financiero",
    features: [
      { title: "Tasas Competitivas", description: "APR transparente desde 8.9% sin comisiones de originación, penalidades por pago anticipado ni cargos ocultos." },
      { title: "Seguro y Privado", description: "Cifrado de 256 bits de nivel bancario protege tus datos personales y financieros en cada paso." },
      { title: "Servicio Personalizado", description: "Un asesor de préstamos dedicado es asignado a tu solicitud para guiarte durante todo el proceso." },
      { title: "Documentación Sencilla", description: "Sube tu ID y comprobante de ingresos digitalmente. Sin envíos por correo ni trámites físicos." },
      { title: "Soporte 24/7", description: "Disponibles por chat, correo y teléfono para responder todas tus preguntas cuando las necesites." },
      { title: "Pagos Flexibles", description: "Elige plazos de 6 a 60 meses para adaptarte a tu presupuesto y estilo de vida." },
    ],
  },
  en: {
    tag: "Why Choose Us",
    heading: "Built for your financial wellbeing",
    features: [
      { title: "Competitive Rates", description: "Transparent APR from 8.9% with no origination fees, prepayment penalties, or hidden charges." },
      { title: "Secure & Private", description: "Bank-level 256-bit encryption protects your personal and financial data at every step." },
      { title: "Personalized Service", description: "A dedicated loan officer is assigned to your application to guide you through the entire process." },
      { title: "Simple Documentation", description: "Upload ID and proof of income digitally. No faxing, no mail, no physical paperwork." },
      { title: "24/7 Support", description: "Our team is available via chat, email, and phone to answer any questions whenever you need." },
      { title: "Flexible Repayment", description: "Choose repayment terms from 6 to 60 months to fit your budget and lifestyle." },
    ],
  },
}

export function FeaturesSection() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <section className="py-24 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h2 className="font-serif text-4xl font-bold text-foreground text-balance">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map(({ title, description }, i) => {
            const Icon = icons[i]
            return (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-[var(--brand-orange)]/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

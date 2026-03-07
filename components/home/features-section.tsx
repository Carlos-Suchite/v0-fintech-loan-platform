import { ShieldCheck, Percent, Users, FileText, HeadphonesIcon, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Percent,
    title: "Tasas Competitivas / Competitive Rates",
    description: "APR transparente desde 8.9% sin comisiones de originación, penalidades por pago anticipado ni cargos ocultos. / Transparent APR from 8.9% with no origination fees, prepayment penalties, or hidden charges.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro y Privado / Secure & Private",
    description: "Cifrado de 256 bits de nivel bancario protege tus datos personales y financieros. / Bank-level 256-bit encryption protects your personal and financial data at every step.",
  },
  {
    icon: Users,
    title: "Servicio Personalizado / Personalized Service",
    description: "Un asesor de préstamos dedicado es asignado a tu solicitud para guiarte. / A dedicated loan officer is assigned to your application to guide you through the process.",
  },
  {
    icon: FileText,
    title: "Documentación Sencilla / Simple Documentation",
    description: "Sube tu ID y comprobante de ingresos digitalmente. Sin envíos por correo. / Upload ID and proof of income digitally. No faxing, no mail, no hassle.",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7 / 24/7 Support",
    description: "Disponibles por chat, correo y teléfono para responder tus preguntas. / Our team is available via chat, email, and phone to answer any questions you have.",
  },
  {
    icon: RefreshCw,
    title: "Pagos Flexibles / Flexible Repayment",
    description: "Elige plazos de 6 a 60 meses para adaptarte a tu presupuesto y estilo de vida. / Choose repayment terms from 6 to 60 months to fit your budget and lifestyle.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">Por Qué Elegirnos / Why Choose Us</p>
          <h2 className="font-serif text-4xl font-bold text-foreground text-balance">
            Construido para tu bienestar financiero
          </h2>
          <p className="text-base text-[var(--brand-orange)] italic mt-1">Built for your financial wellbeing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}

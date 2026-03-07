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
    title: "Completa tu Solicitud",
    titleEn: "Complete Your Application",
    description:
      "Inicia con nuestro formulario seguro en línea. Proporciona información personal y financiera básica — toma menos de 5 minutos. Sin papeleo, sin visita a sucursal.",
    descriptionEn:
      "Start with our secure online form. Provide basic personal and financial details — it takes under 5 minutes. No paperwork, no branch visit required.",
    details: [
      "Información personal (nombre, dirección, fecha de nacimiento) / Personal information",
      "Estado laboral e ingresos mensuales / Employment status and monthly income",
      "Monto y propósito del préstamo / Desired loan amount and purpose",
      "Método de contacto preferido / Preferred contact method",
    ],
  },
  {
    icon: Search,
    step: "02",
    title: "Sube tus Documentos",
    titleEn: "Upload Supporting Documents",
    description:
      "Te pediremos que subas una identificación oficial y comprobante de ingresos digitalmente. Nuestra plataforma usa cifrado de 256 bits para mantener tus datos seguros.",
    descriptionEn:
      "We'll ask you to upload a government-issued ID and proof of income digitally. Our platform uses 256-bit encryption to keep your data safe.",
    details: [
      "Identificación oficial con foto / Government-issued photo ID",
      "Recibos de nómina o estados de cuenta recientes / Recent pay stubs or bank statements",
      "Comprobante de domicilio (si se requiere) / Proof of address (if required)",
      "Documentos adicionales de soporte / Any additional supporting documents",
    ],
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Revisamos tu Expediente",
    titleEn: "Our Team Reviews Your File",
    description:
      "Un asesor de préstamos dedicado revisa tu solicitud y documentos. Pueden contactarte para aclaraciones. La mayoría de las revisiones se completan en menos de 4 horas.",
    descriptionEn:
      "A dedicated loan officer reviews your application and documents. You may be contacted for clarification. Most reviews are completed in under 4 hours.",
    details: [
      "Evaluación de solvencia crediticia / Creditworthiness assessment",
      "Verificación de ingresos y empleo / Income and employment verification",
      "Términos calculados según tu perfil / Loan terms calculated based on your profile",
      "Decisión comunicada por correo y panel / Decision communicated via email and dashboard",
    ],
  },
  {
    icon: Banknote,
    step: "04",
    title: "Fondos Transferidos",
    titleEn: "Funds Transferred",
    description:
      "Al aprobarse, tu contrato de préstamo se envía para firma electrónica. Una vez firmado, los fondos se depositan directamente en tu cuenta — a menudo el mismo día hábil.",
    descriptionEn:
      "Upon approval, your loan agreement is sent for e-signature. Once signed, funds are deposited directly to your bank account — often the same business day.",
    details: [
      "Firma electrónica de tu contrato / E-sign your loan agreement",
      "Depósito de fondos via transferencia ACH / Funds deposited via ACH transfer",
      "Calendario de pagos en tu panel / Repayment schedule provided in your dashboard",
      "Recordatorios automáticos de pago / Automatic payment reminders enabled",
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--brand-orange)]" />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">Proceso / Process</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-2 text-balance">
            Cómo Funciona
          </h1>
          <p className="text-[var(--brand-orange)] italic text-lg mb-5">How It Works</p>
          <p className="text-white/60 text-base leading-relaxed">
            De solicitud a fondeo — aquí está exactamente qué esperar en cada etapa. / From application to funding — here is exactly what to expect at each stage.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {steps.map(({ icon: Icon, step, title, titleEn, description, descriptionEn, details }, i) => (
            <div key={step} className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--brand-orange-light)] flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[var(--brand-orange)]" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-3 hidden sm:block" />
                )}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-1">Paso / Step {step}</p>
                <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-0.5">
                  {title}
                </h2>
                <p className="text-base text-[var(--brand-orange)] italic mb-4">{titleEn}</p>
                <p className="text-muted-foreground leading-relaxed mb-2">{description}</p>
                <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5 italic">{descriptionEn}</p>
                <ul className="flex flex-col gap-2">
                  {details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--brand-orange)] flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Button asChild size="lg" className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
            <Link href="/apply">Comenzar Solicitud / Start Your Application</Link>
          </Button>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Heart, TrendingUp, Users, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Las Personas Primero / People First",
    description: "Tratamos a cada solicitante como persona, no como número. La empatía y el respeto son el núcleo de todo lo que hacemos. / We treat every applicant as a person, not a number. Empathy and respect are at the core of everything we do.",
  },
  {
    icon: TrendingUp,
    title: "Empoderamiento Financiero / Financial Empowerment",
    description: "Nuestra misión es dar acceso a crédito justo y asequible a todos, sin importar su origen. / Our mission is to give everyone access to fair, affordable credit — regardless of their background.",
  },
  {
    icon: Users,
    title: "Enfoque Comunitario / Community Focused",
    description: "Invertimos en las comunidades que servimos a través de programas de educación financiera y préstamos responsables. / We invest in the communities we serve through financial literacy programs and responsible lending.",
  },
  {
    icon: Award,
    title: "Integridad Siempre / Integrity Always",
    description: "Transparencia total. Sin cargos ocultos, sin términos abusivos, sin letra chica diseñada para confundir. / Full transparency. No hidden fees, no predatory terms, no fine print designed to confuse.",
  },
]

const team = [
  { name: "Alexandra Chen", role: "Directora Ejecutiva / CEO", initials: "AC" },
  { name: "Marcus Williams", role: "Director de Riesgo / CRO", initials: "MW" },
  { name: "Sophie Okafor", role: "Jefa de Operaciones / Head of Operations", initials: "SO" },
  { name: "David Reyes", role: "Asesor Principal / Lead Loan Officer", initials: "DR" },
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">Nuestra Historia / Our Story</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-2 text-balance">
            Sobre Nosotros
          </h1>
          <p className="text-[var(--brand-orange)] italic text-lg mb-5">About Touch of Vintage</p>
          <p className="text-white/60 text-base leading-relaxed">
            Fundados con la creencia de que todos merecen acceso a crédito personal justo y transparente. / Founded on a simple belief: everyone deserves access to fair and transparent personal credit.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-5 text-muted-foreground leading-relaxed mb-16">
            <p>
              Touch of Vintage fue fundado por un equipo de veteranos de fintech que vieron de primera mano cómo los bancos tradicionales estaban fallando a las personas — esperas largas, procesos opacos y tasas que no reflejaban la verdadera solvencia del solicitante.
            </p>
            <p className="italic text-muted-foreground/70">
              Touch of Vintage was founded by a team of fintech veterans who saw firsthand how traditional banks were failing everyday people — long waits, opaque processes, and rates that didn&apos;t reflect a borrower&apos;s true creditworthiness.
            </p>
            <p>
              Construimos Touch of Vintage para ser diferente. Nuestro modelo de suscripción propietario va más allá del puntaje crediticio para obtener una imagen más completa de quién eres financieramente. Combinado con un proceso de solicitud digital ágil, podemos entregar decisiones rápidas con tasas competitivas.
            </p>
            <p>
              Desde nuestra fundación, hemos financiado más de $250M en préstamos personales a más de 10,000 prestatarios en los Estados Unidos. Tenemos licencia en 45 estados y estamos comprometidos con el préstamo responsable y orientado a la comunidad.
            </p>
          </div>

          {/* Values */}
          <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1 text-center">
            Nuestros Valores
          </h2>
          <p className="text-[var(--brand-orange)] italic text-center mb-8">Our Values</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 bg-muted border border-border rounded-2xl p-6 hover:border-[var(--brand-orange)]/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[var(--brand-orange)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--brand-black)] mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team */}
          <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1 text-center">
            Equipo Directivo
          </h2>
          <p className="text-[var(--brand-orange)] italic text-center mb-8">Leadership Team</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, initials }) => (
              <div key={name} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--brand-black)] flex items-center justify-center mx-auto mb-3 border-2 border-[var(--brand-orange)]">
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

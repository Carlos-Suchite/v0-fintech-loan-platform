"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Heart, TrendingUp, Users, Award } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    tag: "Nuestra Historia",
    h1: "Sobre Nosotros",
    intro: "Fundados con la creencia de que todos merecen acceso a crédito personal justo y transparente.",
    body: [
      "Touch of Vintage fue fundado por un equipo de veteranos de fintech que vieron de primera mano cómo los bancos tradicionales estaban fallando a las personas — esperas largas, procesos opacos y tasas que no reflejaban la verdadera solvencia del solicitante.",
      "Construimos Touch of Vintage para ser diferente. Nuestro modelo de suscripción propietario va más allá del puntaje crediticio para obtener una imagen más completa de quién eres financieramente. Combinado con un proceso de solicitud digital ágil, podemos entregar decisiones rápidas con tasas competitivas.",
      "Desde nuestra fundación, hemos financiado más de $5M en préstamos personales a más de 500 prestatarios en los Estados Unidos. Tenemos licencia en 45 estados y estamos comprometidos con el préstamo responsable y orientado a la comunidad.",
    ],
    valuesTitle: "Nuestros Valores",
    values: [
      { title: "Las Personas Primero", description: "Tratamos a cada solicitante como persona, no como número. La empatía y el respeto son el núcleo de todo lo que hacemos." },
      { title: "Empoderamiento Financiero", description: "Nuestra misión es dar acceso a crédito justo y asequible a todos, sin importar su origen." },
      { title: "Enfoque Comunitario", description: "Invertimos en las comunidades que servimos a través de programas de educación financiera y préstamos responsables." },
      { title: "Integridad Siempre", description: "Transparencia total. Sin cargos ocultos, sin términos abusivos, sin letra chica diseñada para confundir." },
    ],
    teamTitle: "Equipo Directivo",
    team: [
      { name: "Alexandra Chen", role: "Directora Ejecutiva", initials: "AC" },
      { name: "Marcus Williams", role: "Director de Riesgo", initials: "MW" },
      { name: "Sophie Okafor", role: "Jefa de Operaciones", initials: "SO" },
      { name: "David Reyes", role: "Asesor Principal", initials: "DR" },
    ],
  },
  en: {
    tag: "Our Story",
    h1: "About Us",
    intro: "Founded on a simple belief: everyone deserves access to fair and transparent personal credit.",
    body: [
      "Touch of Vintage was founded by a team of fintech veterans who saw firsthand how traditional banks were failing everyday people — long waits, opaque processes, and rates that didn't reflect a borrower's true creditworthiness.",
      "We built Touch of Vintage to be different. Our proprietary underwriting model looks beyond credit scores to get a fuller picture of who you are financially. Combined with a streamlined digital application process, we can deliver fast decisions with competitive rates.",
      "Since our founding, we have funded over $5M in personal loans to more than 500 borrowers across the United States. We are licensed in 45 states and committed to responsible, community-focused lending.",
    ],
    valuesTitle: "Our Values",
    values: [
      { title: "People First", description: "We treat every applicant as a person, not a number. Empathy and respect are at the core of everything we do." },
      { title: "Financial Empowerment", description: "Our mission is to give everyone access to fair, affordable credit — regardless of their background." },
      { title: "Community Focused", description: "We invest in the communities we serve through financial literacy programs and responsible lending." },
      { title: "Integrity Always", description: "Full transparency. No hidden fees, no predatory terms, no fine print designed to confuse." },
    ],
    teamTitle: "Leadership Team",
    team: [
      { name: "Alexandra Chen", role: "Chief Executive Officer", initials: "AC" },
      { name: "Marcus Williams", role: "Chief Risk Officer", initials: "MW" },
      { name: "Sophie Okafor", role: "Head of Operations", initials: "SO" },
      { name: "David Reyes", role: "Lead Loan Officer", initials: "DR" },
    ],
  },
}

const valueIcons = [Heart, TrendingUp, Users, Award]

export default function AboutPage() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <main>
      <Navbar />
      <div className="pt-20 pb-8 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">{t.h1}</h1>
          <p className="text-white/60 text-base leading-relaxed">{t.intro}</p>
        </div>
      </div>

      <section className="pt-10 pb-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-5 text-muted-foreground leading-relaxed mb-16">
            {t.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">{t.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
            {t.values.map(({ title, description }, i) => {
              const Icon = valueIcons[i]
              return (
                <div key={title} className="flex gap-4 bg-muted border border-border rounded-2xl p-6 hover:border-[var(--brand-orange)]/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--brand-orange)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">{t.teamTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.team.map(({ name, role, initials }) => (
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

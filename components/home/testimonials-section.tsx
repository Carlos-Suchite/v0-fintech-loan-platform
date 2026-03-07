"use client"

import { Star } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    tag: "Opiniones",
    heading: "Lo que dicen nuestros clientes",
    testimonials: [
      { name: "María S.", location: "Miami, FL", quote: "Me aprobaron en 3 horas y tuve los fondos en mi cuenta a la mañana siguiente. El proceso fue increíblemente sencillo.", rating: 5, amount: "$8,000" },
      { name: "James T.", location: "Houston, TX", quote: "Touch of Vintage me ayudó a consolidar mis deudas a una tasa mucho más baja. El equipo fue profesional en todo momento.", rating: 5, amount: "$15,000" },
      { name: "Priya M.", location: "Los Angeles, CA", quote: "Sin cargos ocultos, comunicación clara y un asesor realmente útil. No podría pedir una mejor experiencia.", rating: 5, amount: "$5,000" },
    ],
  },
  en: {
    tag: "Reviews",
    heading: "What our borrowers say",
    testimonials: [
      { name: "María S.", location: "Miami, FL", quote: "I was approved within 3 hours and had funds in my account the next morning. The process was incredibly simple.", rating: 5, amount: "$8,000" },
      { name: "James T.", location: "Houston, TX", quote: "Touch of Vintage helped me consolidate my debt at a much lower rate. The team was professional every step of the way.", rating: 5, amount: "$15,000" },
      { name: "Priya M.", location: "Los Angeles, CA", quote: "No hidden fees, clear communication, and a genuinely helpful loan officer. Couldn't ask for a better experience.", rating: 5, amount: "$5,000" },
    ],
  },
}

export function TestimonialsSection() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h2 className="font-serif text-4xl font-bold text-foreground text-balance">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.map(({ name, location, quote, rating, amount }) => (
            <div
              key={name}
              className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4 hover:border-[var(--brand-orange)]/50 hover:shadow-lg transition-all"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--brand-orange)] text-[var(--brand-orange)]" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{`"${quote}"`}</p>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{location}</p>
                </div>
                <span className="text-xs font-medium bg-[var(--brand-orange)] text-white px-2.5 py-1 rounded-full">
                  {amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

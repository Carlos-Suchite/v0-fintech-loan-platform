"use client"

import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    tag: "Contacto",
    h1: "Habla con Nosotros",
    intro: "¿Tienes una pregunta sobre tu solicitud, tu préstamo, o quieres presentar una queja? Estamos aquí para ayudarte.",
    phoneLabel: "Teléfono",
    emailLabel: "Correo",
    addressLabel: "Dirección",
    hoursLabel: "Horario de Atención",
    hours: "Lunes a Viernes, 9:00 AM – 5:00 PM (hora del Este)",
    complaintsTitle: "¿Tienes una queja?",
    complaintsBody:
      "Si no estás satisfecho con algún aspecto de tu préstamo o tu experiencia con Touch of Vintage LLC, contáctanos directamente por teléfono o correo y la revisaremos personalmente. También tienes derecho a presentar una queja directamente ante la Oficina de Regulación Financiera de Florida (OFR), independientemente de si nos contactaste primero.",
    ofrLabel: "Florida Office of Financial Regulation (OFR)",
    licenseNote: "Touch of Vintage LLC · Licencia No. CF9901632 · Regulado bajo los Capítulos 516 y 687 de los Estatutos de Florida",
  },
  en: {
    tag: "Contact",
    h1: "Talk to Us",
    intro: "Have a question about your application, your loan, or want to file a complaint? We're here to help.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Address",
    hoursLabel: "Hours",
    hours: "Monday – Friday, 9:00 AM – 5:00 PM (Eastern Time)",
    complaintsTitle: "Have a Complaint?",
    complaintsBody:
      "If you are not satisfied with any aspect of your loan or your experience with Touch of Vintage LLC, contact us directly by phone or email and we will review it personally. You also have the right to file a complaint directly with the Florida Office of Financial Regulation (OFR), regardless of whether you have contacted us first.",
    ofrLabel: "Florida Office of Financial Regulation (OFR)",
    licenseNote: "Touch of Vintage LLC · License No. CF9901632 · Regulated under Florida Statutes Chapters 516 & 687",
  },
}

const CONTACT = {
  phone: "(786) 295-8015",
  phoneHref: "tel:+17862958015",
  email: "info@touchofvintage.biz",
  emailHref: "mailto:info@touchofvintage.biz",
  address: "2620 NW 33rd Street, Miami, FL 33142",
  ofrPhone: "(850) 487-9687",
  ofrPhoneHref: "tel:+18504879687",
  ofrWeb: "flofr.gov",
  ofrWebHref: "https://flofr.gov",
}

export default function ContactPage() {
  const { lang } = useLang()
  const t = content[lang]

  const cards = [
    { icon: Phone, label: t.phoneLabel, value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Mail, label: t.emailLabel, value: CONTACT.email, href: CONTACT.emailHref },
    { icon: MapPin, label: t.addressLabel, value: CONTACT.address, href: undefined },
    { icon: Clock, label: t.hoursLabel, value: t.hours, href: undefined },
  ]

  return (
    <main>
      <div className="pt-8 pb-8 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">{t.h1}</h1>
          <p className="text-white/60 text-base leading-relaxed">{t.intro}</p>
        </div>
      </div>

      <section className="pt-10 pb-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {cards.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 bg-muted border border-border rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[var(--brand-orange)]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-foreground hover:text-[var(--brand-orange)] transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[var(--brand-orange-light)] border border-[var(--brand-orange)]/20 rounded-2xl p-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[var(--brand-orange)]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">{t.complaintsTitle}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.complaintsBody}</p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{t.ofrLabel}:</span>{" "}
                  <a href={CONTACT.ofrPhoneHref} className="text-[var(--brand-orange)] hover:underline">{CONTACT.ofrPhone}</a>
                  {" · "}
                  <a href={CONTACT.ofrWebHref} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-orange)] hover:underline">{CONTACT.ofrWeb}</a>
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-10">{t.licenseNote}</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

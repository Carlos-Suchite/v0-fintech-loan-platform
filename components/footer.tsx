"use client"

import Link from "next/link"
import Image from "next/image"
import { useLang } from "@/lib/lang-context"

const footerLinks = {
  es: {
    "Empresa": [
      { label: "Nosotros", href: "/about" },
      { label: "Contacto", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
    "Préstamos": [
      { label: "Préstamos Personales", href: "/apply" },
      { label: "Cómo Funciona", href: "/how-it-works" },
      { label: "Requisitos", href: "/requirements" },
    ],
    "Legal": [
      { label: "Política de Privacidad", href: "/privacy" },
      { label: "Términos de Servicio", href: "/terms" },
    ],
  },
  en: {
    "Company": [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
    "Loans": [
      { label: "Personal Loans", href: "/apply" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Requirements", href: "/requirements" },
    ],
    "Legal": [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
}

const copy = {
  es: { tagline: "Préstamos personales rápidos y transparentes para alcanzar tus metas financieras.", rights: "Todos los derechos reservados.", lender: "Prestamista con licencia." },
  en: { tagline: "Fast, transparent personal loans to help you reach your financial goals.", rights: "All rights reserved.", lender: "Licensed lender. Equal opportunity lender." },
}

export function Footer() {
  const { lang } = useLang()
  const links = footerLinks[lang]
  const t = copy[lang]

  return (
    <footer className="bg-[var(--brand-black)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex mb-4">
              <Image
                src="/logo.jpg"
                alt="Touch of Vintage"
                width={160}
                height={60}
                className="object-contain h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">{t.tagline}</p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{group}</h4>
              <ul className="flex flex-col gap-2">
                {items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 hover:text-[var(--brand-orange)] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Touch of Vintage Financial, LLC. {t.rights}</p>
          <p>{t.lender}</p>
        </div>
      </div>
    </footer>
  )
}

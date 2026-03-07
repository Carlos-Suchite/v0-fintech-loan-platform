import Link from "next/link"
import { Gem } from "lucide-react"

const footerLinks = {
  "Empresa / Company": [
    { label: "Nosotros / About Us", href: "/about" },
    { label: "Contacto / Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  "Préstamos / Loans": [
    { label: "Préstamos Personales / Personal Loans", href: "/apply" },
    { label: "Cómo Funciona / How It Works", href: "/how-it-works" },
    { label: "Requisitos / Requirements", href: "/requirements" },
  ],
  "Legal": [
    { label: "Política de Privacidad / Privacy Policy", href: "/privacy" },
    { label: "Términos / Terms of Service", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[var(--brand-black)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center">
                <Gem className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif tracking-tight">Touch of Vintage</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Préstamos personales rápidos y transparentes para alcanzar tus metas financieras.
              <br />
              <span className="text-white/40">Fast, transparent personal loans to help you reach your financial goals.</span>
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{group}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((l) => (
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
          <p>&copy; {new Date().getFullYear()} Touch of Vintage Financial, LLC. Todos los derechos reservados / All rights reserved.</p>
          <p>Prestamista con licencia / Licensed lender. Equal opportunity lender.</p>
        </div>
      </div>
    </footer>
  )
}

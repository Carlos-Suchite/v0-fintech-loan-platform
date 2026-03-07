"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Gem, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/lang-context"

const navLinks = {
  es: [
    { label: "Cómo Funciona", href: "/how-it-works" },
    { label: "Requisitos", href: "/requirements" },
    { label: "Nosotros", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contacto", href: "/contact" },
  ],
  en: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Requirements", href: "/requirements" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
}

const copy = {
  es: { login: "Ingresar", apply: "Solicitar Ahora", loginMobile: "Ingresar", applyMobile: "Solicitar Ahora" },
  en: { login: "Sign In", apply: "Apply Now", loginMobile: "Sign In", applyMobile: "Apply Now" },
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { lang, toggle } = useLang()
  const links = navLinks[lang]
  const t = copy[lang]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--brand-black)]/95 backdrop-blur border-b border-white/10">
      {/* Orange top line accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--brand-orange)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-white shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center">
              <Gem className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif tracking-tight">Touch of Vintage</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/60 hover:text-[var(--brand-orange)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language toggle — secondary button */}
            <button
              onClick={toggle}
              aria-label="Cambiar idioma / Toggle language"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/20 text-white/60 hover:border-[var(--brand-orange)]/60 hover:text-[var(--brand-orange)] text-xs font-medium transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === "es" ? "EN" : "ES"}
            </button>
            <Button variant="ghost" asChild className="text-sm text-white/70 hover:text-[var(--brand-orange)] hover:bg-white/5">
              <Link href="/login">{t.login}</Link>
            </Button>
            <Button asChild className="bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)] text-sm">
              <Link href="/apply">{t.apply}</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-white/80"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[var(--brand-black)] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-[var(--brand-orange)] py-1 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            {/* Language toggle mobile */}
            <button
              onClick={toggle}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md border border-white/20 text-white/60 hover:border-[var(--brand-orange)]/60 hover:text-[var(--brand-orange)] text-sm font-medium transition-colors"
            >
              <Languages className="w-4 h-4" />
              {lang === "es" ? "Switch to English" : "Cambiar a Español"}
            </button>
            <Button variant="outline" asChild className="w-full border-white/20 text-white bg-transparent hover:bg-white/10">
              <Link href="/login">{t.loginMobile}</Link>
            </Button>
            <Button asChild className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
              <Link href="/apply">{t.applyMobile}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

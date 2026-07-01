"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { useLang } from "@/lib/lang-context"

const copy = {
  es: {
    prompt: "¿Cómo podemos ayudarte hoy?",
    sub: "Selecciona el área de servicio que mejor se adapte a tus necesidades",
    individuals: "Individuos",
    individualsSub: "Servicios personales",
    commercial: "Comercial",
    commercialSub: "Soluciones empresariales",
    privacy: "Política de Privacidad",
    terms: "Términos de Uso",
    contact: "Contacto",
    copy: "© 2026 Touch of Vintage. Todos los derechos reservados.",
  },
  en: {
    prompt: "How can we help you today?",
    sub: "Select the service area that best fits your needs",
    individuals: "Individuals",
    individualsSub: "Personal services",
    commercial: "Commercial",
    commercialSub: "Business solutions",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contact: "Contact",
    copy: "© 2026 Touch of Vintage. All rights reserved.",
  },
}

export default function HomePage() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <>
      {/* Fixed navbar sits above everything */}
      <Navbar />

      {/* Full-screen page */}
      <div className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background image */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2026-03-07-12-23-36-6YPjwjB8NZ9g9COwyBJ899pD9XEZzS.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.62) saturate(0.8)",
          }}
        />

        {/* Navy tinted overlay */}
        <div
          className="fixed inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(160deg, rgba(10,28,72,0.70) 0%, rgba(15,40,90,0.63) 50%, rgba(8,22,58,0.75) 100%)",
          }}
        />

        {/* Content — above bg layers, below navbar */}
        <div className="relative z-[2] flex flex-col min-h-screen pt-16">

          {/* Main center */}
          <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-10">

            {/* Logo */}
            <div
              className="flex flex-col items-center gap-2.5"
              style={{ animation: "fadeUp 0.9s ease 0.15s both" }}
            >
              <Image
                src="/logo.jpg"
                alt="Touch of Vintage"
                width={500}
                height={200}
                className="w-[clamp(260px,44vw,480px)] h-auto drop-shadow-2xl"
                style={{ filter: "brightness(1.08) drop-shadow(0 6px 28px rgba(0,0,0,0.65))" }}
                priority
              />
              <span
                className="text-[11px] font-medium tracking-[0.28em] uppercase"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Financial Services
              </span>
            </div>

            {/* Divider */}
            <div
              className="w-12 h-0.5 rounded-full"
              style={{
                background: "#E07048",
                animation: "fadeIn 0.8s ease 0.35s both",
              }}
            />

            {/* Prompt */}
            <div
              className="text-center"
              style={{ animation: "fadeUp 0.9s ease 0.4s both" }}
            >
              <h2
                className="font-serif text-[clamp(1.4rem,3vw,2rem)] font-medium text-white mb-2 text-balance"
              >
                {t.prompt}
              </h2>
              <p
                className="text-[13px] tracking-[0.04em]"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {t.sub}
              </p>
            </div>

            {/* Navigation buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 w-full max-w-[560px]"
              style={{ animation: "fadeUp 0.9s ease 0.55s both" }}
            >
              {/* Individuals — orange */}
              <Link
                href="/apply"
                className="group flex-1 flex items-center justify-between px-6 py-[18px] rounded-md transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #C05528 0%, #9E3F19 100%)",
                  boxShadow: "0 4px 24px rgba(192,85,40,0.45)",
                }}
              >
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-serif text-[1.05rem] font-bold text-white leading-none">
                    {t.individuals}
                  </span>
                  <span
                    className="text-[10px] font-medium tracking-[0.14em] uppercase"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {t.individualsSub}
                  </span>
                </div>
                <span
                  className="text-[1.1rem] transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  →
                </span>
              </Link>

              {/* Commercial — navy */}
              <Link
                href="/contact"
                className="group flex-1 flex items-center justify-between px-6 py-[18px] rounded-md transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #2C3E55 0%, #1A2D45 100%)",
                  boxShadow: "0 4px 24px rgba(20,40,80,0.55)",
                }}
              >
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-serif text-[1.05rem] font-bold text-white leading-none">
                    {t.commercial}
                  </span>
                  <span
                    className="text-[10px] font-medium tracking-[0.14em] uppercase"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {t.commercialSub}
                  </span>
                </div>
                <span
                  className="text-[1.1rem] transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  →
                </span>
              </Link>
            </div>

          </main>

          {/* Footer */}
          <footer
            className="relative z-[2] flex flex-col sm:flex-row items-center justify-between gap-2 px-8 sm:px-12 py-5 border-t"
            style={{
              borderColor: "rgba(255,255,255,0.35)",
              animation: "fadeIn 0.8s ease 0.7s both",
            }}
          >
            <span
              className="text-[11px] tracking-[0.05em]"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {t.copy}
            </span>
            <nav className="flex gap-5">
              {[{ label: t.privacy, href: "/privacy" }, { label: t.terms, href: "/terms" }, { label: t.contact, href: "/contact" }].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[11px] tracking-[0.06em] transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </footer>

        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  )
}

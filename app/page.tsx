"use client"

import Link from "next/link"
import Image from "next/image"
import { useLang } from "@/lib/lang-context"

// ── Background image — extracted from the provided HTML (base64 webp) ──────
const BG_IMAGE = `data:image/webp;base64,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`

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
      {/* Full-screen page */}
      <div className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background image layer */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2026-07-02-17-13-10-WabD3jJlnlU7QSSiZP5KvRCS6YW28P.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "brightness(0.75) saturate(0.9)",
          }}
        />

        {/* Blue-tinted overlay */}
        <div
          className="fixed inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(160deg, rgba(10,28,72,0.70) 0%, rgba(15,40,90,0.63) 50%, rgba(8,22,58,0.75) 100%)",
          }}
        />

        {/* Content — above bg, below navbar */}
        <div className="relative z-[2] flex flex-col min-h-screen pt-16">

          {/* Main center */}
          <main
            className="flex-1 flex flex-col items-center justify-center px-6 py-[60px] gap-[40px]"
          >
            {/* Logo */}
            <div
              className="flex flex-col items-center gap-2.5"
              style={{ animation: "fadeUp 0.9s ease 0.15s both" }}
            >
              <Image
                src="/logo.jpg"
                alt="Touch of Vintage"
                width={600}
                height={240}
                priority
                className="h-auto block"
                style={{
                  width: "clamp(320px, 46vw, 500px)",
                  mixBlendMode: "screen",
                  filter: "brightness(1.05) drop-shadow(0 6px 28px rgba(0,0,0,0.5))",
                }}
              />
              <span
                className="text-[11px] font-medium tracking-[0.28em] uppercase mt-0.5"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Financial Services
              </span>
            </div>

            {/* Orange divider */}
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
                className="font-serif font-medium text-white mb-2 text-balance"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
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
              {/* Individuals — burnt orange */}
              <Link
                href="/individuals"
                className="group relative flex-1 flex items-center justify-between px-6 py-[18px] rounded-md overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #C05528 0%, #9E3F19 100%)",
                  boxShadow: "0 4px 24px rgba(192,85,40,0.45)",
                  textDecoration: "none",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                <div className="flex flex-col gap-0.5 text-left relative">
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
                  className="text-[1.1rem] relative transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  →
                </span>
              </Link>

              {/* Commercial — navy */}
              <Link
                href="/contact"
                className="group relative flex-1 flex items-center justify-between px-6 py-[18px] rounded-md overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #2C3E55 0%, #1A2D45 100%)",
                  boxShadow: "0 4px 24px rgba(20,40,80,0.55)",
                  textDecoration: "none",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
                <div className="flex flex-col gap-0.5 text-left relative">
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
                  className="text-[1.1rem] relative transition-transform duration-200 group-hover:translate-x-1"
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
              {[
                { label: t.privacy, href: "/privacy" },
                { label: t.terms, href: "/terms" },
                { label: t.contact, href: "/contact" },
              ].map((l) => (
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

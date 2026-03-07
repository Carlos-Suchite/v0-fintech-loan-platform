"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    quote: "Me aprobaron más rápido de lo que imaginé. Mi asesor fue transparente y servicial desde el primer día.",
    author: "— María G., cliente Touch of Vintage",
    stats: [
      { value: "$5M+", label: "Fondos" },
      { value: "500+", label: "Clientes" },
      { value: "4.9★", label: "Calificación" },
    ],
    welcome: "Bienvenido de vuelta",
    sub: "Inicia sesión en tu cuenta para continuar.",
    emailLabel: "Correo",
    emailPlaceholder: "tu@correo.com",
    passLabel: "Contraseña",
    forgot: "¿Olvidaste tu contraseña?",
    signin: "Ingresar",
    noAccount: "¿No tienes cuenta?",
    create: "Crear una",
  },
  en: {
    quote: "Getting approved was faster than I ever imagined. My loan officer was transparent and helpful from day one.",
    author: "— María G., Touch of Vintage client",
    stats: [
      { value: "$5M+", label: "Funded" },
      { value: "500+", label: "Borrowers" },
      { value: "4.9★", label: "Rating" },
    ],
    welcome: "Welcome back",
    sub: "Sign in to your account to continue.",
    emailLabel: "Email Address",
    emailPlaceholder: "you@email.com",
    passLabel: "Password",
    forgot: "Forgot password?",
    signin: "Sign In",
    noAccount: "Don't have an account?",
    create: "Create one",
  },
}

export default function LoginPage() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[var(--brand-black)] p-12">
        <Link href="/">
          <Image src="/logo.jpg" alt="Touch of Vintage" width={160} height={60} className="object-contain h-10 w-auto" />
        </Link>

        <div>
          <blockquote className="text-white/80 text-lg leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
          <p className="text-white/50 text-sm">{t.author}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {t.stats.map(({ value, label }) => (
            <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-white/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex lg:hidden mb-8">
            <Image src="/logo.jpg" alt="Touch of Vintage" width={140} height={52} className="object-contain h-9 w-auto" />
          </Link>

          <h1 className="font-serif text-2xl font-bold text-foreground mb-1">{t.welcome}</h1>
          <p className="text-muted-foreground text-sm mb-8">{t.sub}</p>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">{t.emailLabel}</Label>
              <Input id="email" type="email" placeholder={t.emailPlaceholder} />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.passLabel}</Label>
                <Link href="/forgot-password" className="text-xs text-[var(--brand-orange)] hover:underline">{t.forgot}</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
              {t.signin}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t.noAccount}{" "}
            <Link href="/signup" className="text-[var(--brand-orange)] hover:underline font-medium">{t.create}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

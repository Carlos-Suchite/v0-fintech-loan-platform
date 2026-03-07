import Link from "next/link"
import { Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-muted flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[var(--brand-black)] p-12">
        <Link href="/" className="flex items-center gap-2.5 text-white font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center">
            <Gem className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif tracking-tight">Touch of Vintage</span>
        </Link>

        <div>
          <blockquote className="text-white/80 text-lg leading-relaxed mb-6">
            &ldquo;Me aprobaron más rápido de lo que imaginé. Mi asesor fue transparente y servicial desde el primer día.&rdquo;
          </blockquote>
          <p className="text-white/40 text-sm italic mb-2">&ldquo;Getting approved was faster than I ever imagined. My loan officer was transparent and helpful from day one.&rdquo;</p>
          <p className="text-white/50 text-sm">— María G., cliente Touch of Vintage</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "$5M+", label: "Fondos / Funded" },
            { value: "500+", label: "Clientes / Borrowers" },
            { value: "4.9★", label: "Calificación / Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-white/50 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center">
              <Gem className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif tracking-tight text-[var(--brand-black)]">Touch of Vintage</span>
          </Link>

          <h1 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1">
            Bienvenido de vuelta
          </h1>
          <p className="text-[var(--brand-orange)] italic text-sm mb-1">Welcome back</p>
          <p className="text-muted-foreground text-sm mb-8">
            Inicia sesión en tu cuenta para continuar. / Sign in to your account to continue.
          </p>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo / Email Address</Label>
              <Input id="email" type="email" placeholder="tu@correo.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña / Password</Label>
                <Link href="/forgot-password" className="text-xs text-[var(--brand-orange)] hover:underline">
                  ¿Olvidaste tu contraseña? / Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
              Ingresar / Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tienes cuenta? / {"Don't have an account? "}
            <Link href="/signup" className="text-[var(--brand-orange)] hover:underline font-medium">
              Crear una / Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Gem, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
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

        <div className="space-y-6">
          <h2 className="text-white text-3xl font-serif font-bold leading-tight">
            Comienza tu camino hacia la libertad financiera.
          </h2>
          <p className="text-white/50 text-sm italic">Start your journey to financial freedom.</p>
          <ul className="space-y-3">
            {[
              "Solicita en menos de 5 minutos / Apply in under 5 minutes",
              "Sin cargos ocultos nunca / No hidden fees ever",
              "Decisiones en horas, no días / Decisions in hours, not days",
              "Fondos depositados el mismo día / Funds deposited the same day",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                <ShieldCheck className="w-4 h-4 text-[var(--brand-orange)] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/30 text-xs">
          Prestamista con licencia. Tu información está protegida con cifrado de 256 bits. / Licensed lender. Your information is protected by 256-bit encryption.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-orange)] flex items-center justify-center">
              <Gem className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif tracking-tight text-[var(--brand-black)]">Touch of Vintage</span>
          </Link>

          <h1 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1">
            Crea tu cuenta
          </h1>
          <p className="text-[var(--brand-orange)] italic text-sm mb-1">Create your account</p>
          <p className="text-muted-foreground text-sm mb-8">
            Únete a miles de clientes que confían en Touch of Vintage. / Join thousands of borrowers who trust Touch of Vintage.
          </p>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="first">Nombre / First Name</Label>
                <Input id="first" placeholder="María" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="last">Apellido / Last Name</Label>
                <Input id="last" placeholder="García" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo / Email Address</Label>
              <Input id="email" type="email" placeholder="tu@correo.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Teléfono / Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña / Password</Label>
              <Input id="password" type="password" placeholder="Mín. 8 caracteres / Min. 8 characters" />
            </div>

            <Button className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
              Crear Cuenta / Create Account
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-5 leading-relaxed">
            Al crear una cuenta, aceptas nuestros{" "}
            <Link href="/terms" className="text-[var(--brand-orange)] hover:underline">Términos / Terms</Link> y nuestra{" "}
            <Link href="/privacy" className="text-[var(--brand-orange)] hover:underline">Política de Privacidad / Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm text-muted-foreground mt-4">
            ¿Ya tienes cuenta? / Already have an account?{" "}
            <Link href="/login" className="text-[var(--brand-orange)] hover:underline font-medium">
              Ingresar / Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

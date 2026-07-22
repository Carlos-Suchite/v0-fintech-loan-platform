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
            Start your journey to financial freedom.
          </h2>
          <ul className="space-y-3">
            {[
              "Apply in under 5 minutes",
              "No hidden fees ever",
              "Decisions in hours, not days",
              "Funds deposited the same day",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                <ShieldCheck className="w-4 h-4 text-[var(--brand-orange)] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/30 text-xs">
          Licensed lender. Your information is protected by 256-bit encryption.
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
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Join thousands of borrowers who trust Touch of Vintage.
          </p>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="first">First Name</Label>
                <Input id="first" placeholder="María" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="last">Last Name</Label>
                <Input id="last" placeholder="García" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@email.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Min. 8 characters" />
            </div>

            <Button className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
              Create Account
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-5 leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-[var(--brand-orange)] hover:underline">Terms</Link> and our{" "}
            <Link href="/privacy" className="text-[var(--brand-orange)] hover:underline">Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--brand-orange)] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { TrendingUp, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-muted flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[var(--navy)] p-12">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-[var(--teal)] flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="font-[family-name:var(--font-jakarta)]">SwiftLend</span>
        </Link>

        <div className="space-y-6">
          <h2 className="text-white text-3xl font-bold font-[family-name:var(--font-jakarta)] leading-tight">
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
                <ShieldCheck className="w-4 h-4 text-[var(--teal)] flex-shrink-0" />
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
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--navy)] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-[family-name:var(--font-jakarta)] text-[var(--navy)]">SwiftLend</span>
          </Link>

          <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-1">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Join thousands of borrowers who trust SwiftLend.
          </p>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="first">First Name</Label>
                <Input id="first" placeholder="Alex" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="last">Last Name</Label>
                <Input id="last" placeholder="Chen" />
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

            <Button className="w-full bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
              Create Account
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-5 leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-[var(--teal)] hover:underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="text-[var(--teal)] hover:underline">Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--teal)] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

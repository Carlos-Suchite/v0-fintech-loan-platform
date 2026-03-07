import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
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

        <div>
          <blockquote className="text-white/80 text-lg leading-relaxed mb-6">
            &ldquo;Getting approved was faster than I ever imagined. My loan officer was transparent and helpful from day one.&rdquo;
          </blockquote>
          <p className="text-white/50 text-sm">— James T., SwiftLend borrower</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "$250M+", label: "Funded" },
            { value: "10K+", label: "Borrowers" },
            { value: "4.9★", label: "Rating" },
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
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[var(--navy)] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-[family-name:var(--font-jakarta)] text-[var(--navy)]">SwiftLend</span>
          </Link>

          <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-1">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Sign in to your account to continue.
          </p>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@email.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-[var(--teal)] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button className="w-full bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {"Don't have an account? "}
            <Link href="/signup" className="text-[var(--teal)] hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

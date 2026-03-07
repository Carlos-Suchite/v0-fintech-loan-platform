import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const trust = [
  { icon: ShieldCheck, label: "Bank-Level Security" },
  { icon: Zap, label: "Instant Pre-Approval" },
  { icon: Clock, label: "Funds in 24 Hours" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy)] pt-32 pb-24 px-4">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)]" />
            Trusted by 10,000+ borrowers nationwide
          </div>

          <h1 className="font-[family-name:var(--font-jakarta)] text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance mb-6">
            Personal loans,{" "}
            <span className="text-[var(--teal)]">fast &amp; transparent.</span>
          </h1>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
            Apply online in minutes. Get a decision within hours. No hidden fees, no surprises — just the funding you need to move forward.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[var(--teal)] hover:bg-[var(--teal)]/90 text-white font-semibold px-8"
            >
              <Link href="/apply">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 px-8"
            >
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon className="w-4 h-4 text-[var(--teal)]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative card */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-4">Loan Summary</p>
          <div className="space-y-3">
            {[
              { label: "Loan Amount", value: "$5,000" },
              { label: "Term", value: "24 months" },
              { label: "Monthly Payment", value: "$231" },
              { label: "APR", value: "12.5%" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-white/50">{label}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-[var(--teal)] rounded-full" />
            </div>
            <p className="text-xs text-white/40 mt-2">Approval likelihood: High</p>
          </div>
        </div>
      </div>
    </section>
  )
}

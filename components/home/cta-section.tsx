import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 px-4 bg-[var(--navy)]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
          Ready to get started?
        </h2>
        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Apply for a personal loan today or schedule a free consultation with one of our financial advisors.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[var(--teal)] hover:bg-[var(--teal)]/90 text-white font-semibold px-8"
          >
            <Link href="/apply">
              Apply for a Loan <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white bg-transparent hover:bg-white/10 px-8"
          >
            <Link href="/book-meeting">
              <Calendar className="mr-2 w-4 h-4" />
              Book a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

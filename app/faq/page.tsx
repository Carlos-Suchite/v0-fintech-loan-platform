"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How much can I borrow?",
    a: "We offer personal loans from $500 to $25,000. The exact amount you qualify for depends on your income, credit history, and other financial factors.",
  },
  {
    q: "What is the interest rate?",
    a: "Our APR starts from 7.9% and varies based on your creditworthiness, loan amount, and repayment term. You will see your exact rate before signing any agreement.",
  },
  {
    q: "How quickly will I get a decision?",
    a: "Most applications receive a decision within 2–4 business hours. In some cases additional documents may be requested, which can extend the review period.",
  },
  {
    q: "When will funds be deposited?",
    a: "Once you e-sign your loan agreement, funds are typically deposited via ACH within 1 business day. In some cases, same-day funding may be available.",
  },
  {
    q: "Will applying affect my credit score?",
    a: "Checking your rate with us uses a soft credit inquiry, which does not affect your credit score. A hard inquiry is only performed once you accept a loan offer.",
  },
  {
    q: "Is there a prepayment penalty?",
    a: "No. You can repay your loan early at any time without any fees or penalties.",
  },
  {
    q: "What documents do I need to apply?",
    a: "You will need a government-issued photo ID and proof of income (such as pay stubs or bank statements). Additional documents may be requested depending on your application.",
  },
  {
    q: "Can I apply if I have bad credit?",
    a: "We review every application holistically. While credit history is a factor, we also consider income stability, employment, and other indicators. We encourage you to apply and see your options.",
  },
  {
    q: "How do I track my loan status?",
    a: "After creating an account, you can log into your client dashboard to track your application status, upload documents, and view repayment schedules in real time.",
  },
  {
    q: "Can I book a consultation before applying?",
    a: "Absolutely. You can book a free consultation with one of our loan officers via our booking page. We are happy to walk you through your options before you apply.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-foreground">{q}</span>
        <ChevronDown
          className={cn("w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{a}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">FAQ</p>
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            Frequently asked questions
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Everything you need to know about applying for a loan with SwiftLend.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl px-8 py-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

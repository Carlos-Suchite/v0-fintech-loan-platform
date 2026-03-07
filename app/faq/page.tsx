"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "¿Cuánto puedo pedir prestado? / How much can I borrow?",
    a: "Ofrecemos préstamos personales de $500 a $25,000. El monto exacto para el que calificas depende de tus ingresos, historial crediticio y otros factores financieros. / We offer personal loans from $500 to $25,000. The exact amount you qualify for depends on your income, credit history, and other financial factors.",
  },
  {
    q: "¿Cuál es la tasa de interés? / What is the interest rate?",
    a: "Nuestro APR comienza desde 7.9% y varía según tu solvencia, monto del préstamo y plazo de pago. Verás tu tasa exacta antes de firmar cualquier acuerdo. / Our APR starts from 7.9% and varies based on your creditworthiness, loan amount, and repayment term. You will see your exact rate before signing any agreement.",
  },
  {
    q: "¿Qué tan rápido recibiré una decisión? / How quickly will I get a decision?",
    a: "La mayoría de las solicitudes reciben una decisión en 2–4 horas hábiles. En algunos casos se pueden solicitar documentos adicionales, lo que puede extender el período de revisión. / Most applications receive a decision within 2–4 business hours. In some cases additional documents may be requested, which can extend the review period.",
  },
  {
    q: "¿Cuándo se depositarán los fondos? / When will funds be deposited?",
    a: "Una vez que firmes electrónicamente tu contrato de préstamo, los fondos generalmente se depositan vía ACH dentro de 1 día hábil. En algunos casos, el fondeo el mismo día puede estar disponible. / Once you e-sign your loan agreement, funds are typically deposited via ACH within 1 business day. In some cases, same-day funding may be available.",
  },
  {
    q: "¿Solicitar afectará mi puntaje crediticio? / Will applying affect my credit score?",
    a: "Verificar tu tasa con nosotros utiliza una consulta de crédito suave, que no afecta tu puntaje. Una consulta dura solo se realiza una vez que aceptas una oferta de préstamo. / Checking your rate with us uses a soft credit inquiry, which does not affect your credit score. A hard inquiry is only performed once you accept a loan offer.",
  },
  {
    q: "¿Hay penalidad por pago anticipado? / Is there a prepayment penalty?",
    a: "No. Puedes pagar tu préstamo anticipadamente en cualquier momento sin ninguna tarifa o penalidad. / No. You can repay your loan early at any time without any fees or penalties.",
  },
  {
    q: "¿Qué documentos necesito para solicitar? / What documents do I need to apply?",
    a: "Necesitarás una identificación oficial con foto y comprobante de ingresos (como recibos de nómina o estados de cuenta). Se pueden solicitar documentos adicionales según tu solicitud. / You will need a government-issued photo ID and proof of income (such as pay stubs or bank statements). Additional documents may be requested depending on your application.",
  },
  {
    q: "¿Puedo solicitar si tengo mal crédito? / Can I apply if I have bad credit?",
    a: "Revisamos cada solicitud de manera integral. Aunque el historial crediticio es un factor, también consideramos la estabilidad de ingresos, el empleo y otros indicadores. Te invitamos a solicitar y ver tus opciones. / We review every application holistically. While credit history is a factor, we also consider income stability, employment, and other indicators. We encourage you to apply and see your options.",
  },
  {
    q: "¿Cómo puedo dar seguimiento a mi solicitud? / How do I track my loan status?",
    a: "Después de crear una cuenta, puedes iniciar sesión en tu panel de cliente para rastrear el estado de tu solicitud, subir documentos y ver los calendarios de pago en tiempo real. / After creating an account, you can log into your client dashboard to track your application status, upload documents, and view repayment schedules in real time.",
  },
  {
    q: "¿Puedo agendar una consulta antes de solicitar? / Can I book a consultation before applying?",
    a: "Absolutamente. Puedes agendar una consulta gratuita con uno de nuestros asesores de préstamos a través de nuestra página de reservas. Con gusto te orientaremos sobre tus opciones antes de que solicites. / Absolutely. You can book a free consultation with one of our loan officers via our booking page. We are happy to walk you through your options before you apply.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-[var(--brand-orange)] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-foreground">{q}</span>
        <ChevronDown
          className={cn("w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform", open && "rotate-180 text-[var(--brand-orange)]")}
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
      <div className="pt-28 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">FAQ</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-2 text-balance">
            Preguntas Frecuentes
          </h1>
          <p className="text-[var(--brand-orange)] italic text-lg mb-5">Frequently Asked Questions</p>
          <p className="text-white/60 text-base leading-relaxed">
            Todo lo que necesitas saber sobre solicitar un préstamo con Touch of Vintage. / Everything you need to know about applying for a loan with Touch of Vintage.
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

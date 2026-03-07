"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"

const content = {
  es: {
    tag: "FAQ",
    h1: "Preguntas Frecuentes",
    intro: "Todo lo que necesitas saber sobre solicitar un préstamo con Touch of Vintage.",
    faqs: [
      { q: "¿Cuánto puedo pedir prestado?", a: "Ofrecemos préstamos personales de $200 a $8,000. El monto exacto para el que calificas depende de tus ingresos, historial crediticio y otros factores financieros." },
      { q: "¿Cuál es la tasa de interés?", a: "Nuestro APR comienza desde 7.9% y varía según tu solvencia, monto del préstamo y plazo de pago. Verás tu tasa exacta antes de firmar cualquier acuerdo." },
      { q: "¿Qué tan rápido recibiré una decisión?", a: "La mayoría de las solicitudes reciben una decisión en 2–4 horas hábiles. En algunos casos se pueden solicitar documentos adicionales, lo que puede extender el período de revisión." },
      { q: "¿Cuándo se depositarán los fondos?", a: "Una vez que firmes electrónicamente tu contrato de préstamo, los fondos generalmente se depositan vía ACH dentro de 1 día hábil. En algunos casos, el fondeo el mismo día puede estar disponible." },
      { q: "¿Solicitar afectará mi puntaje crediticio?", a: "Verificar tu tasa con nosotros utiliza una consulta de crédito suave, que no afecta tu puntaje. Una consulta dura solo se realiza una vez que aceptas una oferta de préstamo." },
      { q: "¿Hay penalidad por pago anticipado?", a: "No. Puedes pagar tu préstamo anticipadamente en cualquier momento sin ninguna tarifa o penalidad." },
      { q: "¿Qué documentos necesito para solicitar?", a: "Necesitarás una identificación oficial con foto y comprobante de ingresos (como recibos de nómina o estados de cuenta). Se pueden solicitar documentos adicionales según tu solicitud." },
      { q: "¿Puedo solicitar si tengo mal crédito?", a: "Revisamos cada solicitud de manera integral. Aunque el historial crediticio es un factor, también consideramos la estabilidad de ingresos, el empleo y otros indicadores. Te invitamos a solicitar y ver tus opciones." },
      { q: "¿Cómo puedo dar seguimiento a mi solicitud?", a: "Después de crear una cuenta, puedes iniciar sesión en tu panel de cliente para rastrear el estado de tu solicitud, subir documentos y ver los calendarios de pago en tiempo real." },
      { q: "¿Puedo agendar una consulta antes de solicitar?", a: "Absolutamente. Puedes agendar una consulta gratuita con uno de nuestros asesores de préstamos a través de nuestra página de reservas." },
    ],
  },
  en: {
    tag: "FAQ",
    h1: "Frequently Asked Questions",
    intro: "Everything you need to know about applying for a loan with Touch of Vintage.",
    faqs: [
      { q: "How much can I borrow?", a: "We offer personal loans from $200 to $8,000. The exact amount you qualify for depends on your income, credit history, and other financial factors." },
      { q: "What is the interest rate?", a: "Our APR starts from 7.9% and varies based on your creditworthiness, loan amount, and repayment term. You will see your exact rate before signing any agreement." },
      { q: "How quickly will I get a decision?", a: "Most applications receive a decision within 2–4 business hours. In some cases additional documents may be requested, which can extend the review period." },
      { q: "When will funds be deposited?", a: "Once you e-sign your loan agreement, funds are typically deposited via ACH within 1 business day. In some cases, same-day funding may be available." },
      { q: "Will applying affect my credit score?", a: "Checking your rate with us uses a soft credit inquiry, which does not affect your credit score. A hard inquiry is only performed once you accept a loan offer." },
      { q: "Is there a prepayment penalty?", a: "No. You can repay your loan early at any time without any fees or penalties." },
      { q: "What documents do I need to apply?", a: "You will need a government-issued photo ID and proof of income (such as pay stubs or bank statements). Additional documents may be requested depending on your application." },
      { q: "Can I apply if I have bad credit?", a: "We review every application holistically. While credit history is a factor, we also consider income stability, employment, and other indicators. We encourage you to apply and see your options." },
      { q: "How do I track my loan status?", a: "After creating an account, you can log into your client dashboard to track your application status, upload documents, and view repayment schedules in real time." },
      { q: "Can I book a consultation before applying?", a: "Absolutely. You can book a free consultation with one of our loan officers via our booking page." },
    ],
  },
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-[var(--brand-orange)] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-foreground">{q}</span>
        <ChevronDown className={cn("w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform", open && "rotate-180 text-[var(--brand-orange)]")} />
      </button>
      {open && <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{a}</p>}
    </div>
  )
}

export default function FAQPage() {
  const { lang } = useLang()
  const t = content[lang]

  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">{t.h1}</h1>
          <p className="text-white/60 text-base leading-relaxed">{t.intro}</p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl px-8 py-4">
          {t.faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}

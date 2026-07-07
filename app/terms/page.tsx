import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main>
      <div className="pt-8 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Términos de Servicio</h1>
          <p className="text-[var(--brand-orange)] italic mb-2">Terms of Service</p>
          <p className="text-white/60">Última actualización / Last updated: March 2026</p>
        </div>
      </div>
      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-sm">
          <h2 className="text-lg font-semibold text-foreground">1. Aceptación de Términos / Acceptance of Terms</h2>
          <p>
            Al acceder o usar la plataforma Touch of Vintage, aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, por favor no uses nuestros servicios. / By accessing or using the Touch of Vintage platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
          <h2 className="text-lg font-semibold text-foreground">2. Elegibilidad / Eligibility</h2>
          <p>
            Para solicitar un préstamo con Touch of Vintage, debes tener al menos 18 años, ser ciudadano estadounidense o residente permanente, y tener una cuenta bancaria válida en los Estados Unidos. / To apply for a loan with Touch of Vintage, you must be at least 18 years old, a US citizen or permanent resident, and have a valid bank account in the United States.
          </p>
          <h2 className="text-lg font-semibold text-foreground">3. Términos del Préstamo / Loan Terms</h2>
          <p>
            Todas las ofertas de préstamo están sujetas a aprobación de crédito. Los términos de cualquier préstamo, incluyendo el monto, APR y calendario de pagos, se especificarán en tu contrato individual de préstamo. / All loan offers are subject to credit approval. The terms of any loan, including the amount, APR, and repayment schedule, will be specified in your individual loan agreement.
          </p>
          <h2 className="text-lg font-semibold text-foreground">4. Exactitud de la Información / Accuracy of Information</h2>
          <p>
            Aceptas proporcionar información precisa, actual y completa en tu solicitud. Proporcionar información falsa o engañosa es una violación de estos términos y puede resultar en la terminación inmediata de tu cuenta. / You agree to provide accurate, current, and complete information in your application. Providing false or misleading information is a violation of these terms and may result in immediate termination of your account.
          </p>
          <h2 className="text-lg font-semibold text-foreground">5. Limitación de Responsabilidad / Limitation of Liability</h2>
          <p>
            Touch of Vintage Financial, LLC no es responsable de ningún daño indirecto, incidental o consecuente que surja del uso de la plataforma o de cualquier producto de préstamo. / Touch of Vintage Financial, LLC is not liable for any indirect, incidental, or consequential damages arising from your use of the platform or any loan products.
          </p>
          <h2 className="text-lg font-semibold text-foreground">6. Ley Aplicable / Governing Law</h2>
          <p>
            Estos Términos se rigen por las leyes del Estado de Florida. Cualquier disputa se resolverá en los tribunales del Condado de Miami-Dade, Florida. / These Terms are governed by the laws of the State of Florida. Any disputes shall be resolved in the courts of Miami-Dade County, Florida.
          </p>
          <h2 className="text-lg font-semibold text-foreground">7. Contacto / Contact</h2>
          <p>
            Las preguntas sobre estos Términos deben dirigirse a legal@touchofvintage.com. / Questions about these Terms should be directed to legal@touchofvintage.com.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

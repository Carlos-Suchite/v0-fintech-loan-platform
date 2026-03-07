import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: March 2026</p>
        </div>
      </div>
      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-sm">
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the SwiftLend platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
          <h2 className="text-lg font-semibold text-foreground">2. Eligibility</h2>
          <p>
            To apply for a loan with SwiftLend, you must be at least 18 years old, a US citizen or permanent resident, and have a valid bank account in the United States.
          </p>
          <h2 className="text-lg font-semibold text-foreground">3. Loan Terms</h2>
          <p>
            All loan offers are subject to credit approval. The terms of any loan, including the amount, APR, and repayment schedule, will be specified in your individual loan agreement. You are obligated to repay the loan according to the agreed schedule.
          </p>
          <h2 className="text-lg font-semibold text-foreground">4. Accuracy of Information</h2>
          <p>
            You agree to provide accurate, current, and complete information in your application. Providing false or misleading information is a violation of these terms and may result in immediate termination of your account.
          </p>
          <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
          <p>
            SwiftLend Financial, LLC is not liable for any indirect, incidental, or consequential damages arising from your use of the platform or any loan products. Our liability is limited to the maximum extent permitted by applicable law.
          </p>
          <h2 className="text-lg font-semibold text-foreground">6. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Travis County, Texas.
          </p>
          <h2 className="text-lg font-semibold text-foreground">7. Contact</h2>
          <p>
            Questions about these Terms should be directed to legal@swiftlend.com.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: March 2026</p>
        </div>
      </div>
      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto prose prose-slate max-w-none space-y-6 text-muted-foreground leading-relaxed text-sm">
          <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            We collect personal information you provide when applying for a loan, creating an account, or communicating with us. This includes your name, address, date of birth, Social Security Number, income details, employment information, and financial account information.
          </p>
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process your loan application, verify your identity, assess creditworthiness, communicate with you about your account, comply with legal obligations, and improve our services.
          </p>
          <h2 className="text-lg font-semibold text-foreground">3. Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share your information with credit bureaus, identity verification services, banking partners, and service providers who assist us in operating our platform, subject to strict confidentiality agreements.
          </p>
          <h2 className="text-lg font-semibold text-foreground">4. Data Security</h2>
          <p>
            We employ industry-standard security measures including 256-bit AES encryption, secure data centers, and regular security audits to protect your personal and financial information.
          </p>
          <h2 className="text-lg font-semibold text-foreground">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact us at privacy@swiftlend.com.
          </p>
          <h2 className="text-lg font-semibold text-foreground">6. Contact Us</h2>
          <p>
            For any privacy-related questions, contact our Data Protection Officer at privacy@swiftlend.com or call +1 (800) 555-0192.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

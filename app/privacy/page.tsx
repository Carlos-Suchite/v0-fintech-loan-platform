import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main>
      <div className="pt-8 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Política de Privacidad</h1>
          <p className="text-[var(--brand-orange)] italic mb-2">Privacy Policy</p>
          <p className="text-white/60">Última actualización / Last updated: March 2026</p>
        </div>
      </div>
      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-sm">
          <h2 className="text-lg font-semibold text-foreground">1. Información que Recopilamos / Information We Collect</h2>
          <p>
            Recopilamos información personal que proporcionas al solicitar un préstamo, crear una cuenta o comunicarte con nosotros. Esto incluye nombre, dirección, fecha de nacimiento, número de Seguro Social, detalles de ingresos, información laboral y datos de cuenta financiera. / We collect personal information you provide when applying for a loan, creating an account, or communicating with us. This includes your name, address, date of birth, Social Security Number, income details, employment information, and financial account information.
          </p>
          <h2 className="text-lg font-semibold text-foreground">2. Cómo Usamos tu Información / How We Use Your Information</h2>
          <p>
            Usamos la información recopilada para procesar tu solicitud de préstamo, verificar tu identidad, evaluar la solvencia, comunicarnos contigo sobre tu cuenta, cumplir con obligaciones legales y mejorar nuestros servicios. / We use the information we collect to process your loan application, verify your identity, assess creditworthiness, communicate with you about your account, comply with legal obligations, and improve our services.
          </p>
          <h2 className="text-lg font-semibold text-foreground">3. Compartir Información / Sharing of Information</h2>
          <p>
            No vendemos tu información personal. Podemos compartirla con burós de crédito, servicios de verificación de identidad, socios bancarios y proveedores de servicios que nos ayudan a operar nuestra plataforma, sujeto a acuerdos estrictos de confidencialidad. / We do not sell your personal information. We may share your information with credit bureaus, identity verification services, banking partners, and service providers, subject to strict confidentiality agreements.
          </p>
          <h2 className="text-lg font-semibold text-foreground">4. Seguridad de Datos / Data Security</h2>
          <p>
            Empleamos medidas de seguridad estándar de la industria, incluido cifrado AES de 256 bits, centros de datos seguros y auditorías de seguridad regulares para proteger tu información. / We employ industry-standard security measures including 256-bit AES encryption, secure data centers, and regular security audits to protect your personal and financial information.
          </p>
          <h2 className="text-lg font-semibold text-foreground">5. Tus Derechos / Your Rights</h2>
          <p>
            Tienes derecho a acceder, corregir o solicitar la eliminación de tus datos personales. Para ejercer estos derechos, contáctanos en privacidad@touchofvintage.com. / You have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact us at privacy@touchofvintage.com.
          </p>
          <h2 className="text-lg font-semibold text-foreground">6. Contáctanos / Contact Us</h2>
          <p>
            Para preguntas relacionadas con privacidad, contacta a nuestro Oficial de Protección de Datos en privacidad@touchofvintage.com o llama al +1 (800) 555-0192. / For any privacy-related questions, contact our Data Protection Officer at privacy@touchofvintage.com or call +1 (800) 555-0192.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

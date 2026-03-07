import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono / Phone",
    value: "+1 (800) 555-0192",
    sub: "Lun – Vie, 9am – 6pm ET / Mon – Fri",
  },
  {
    icon: Mail,
    label: "Correo / Email",
    value: "soporte@touchofvintage.com",
    sub: "Respuesta en 4 horas / Replies within 4 hours",
  },
  {
    icon: MapPin,
    label: "Dirección / Address",
    value: "100 Financial Drive, Suite 400",
    sub: "Miami, FL 33101",
  },
  {
    icon: Clock,
    label: "Horario / Business Hours",
    value: "Lun – Vie: 9am – 6pm ET",
    sub: "Sáb: 10am – 2pm ET / Sat: 10am – 2pm ET",
  },
]

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">Contacto / Contact</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-2 text-balance">
            Contáctanos
          </h1>
          <p className="text-[var(--brand-orange)] italic text-lg mb-5">Get in Touch</p>
          <p className="text-white/60 text-base leading-relaxed">
            ¿Tienes preguntas sobre tu solicitud o nuestros productos? Nuestro equipo está aquí para ayudarte. / Have a question? Our team is here to help.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1">
              Envíanos un mensaje
            </h2>
            <p className="text-sm text-[var(--brand-orange)] italic mb-6">Send us a message</p>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="first">Nombre / First Name</Label>
                  <Input id="first" placeholder="María" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="last">Apellido / Last Name</Label>
                  <Input id="last" placeholder="García" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Correo / Email Address</Label>
                <Input id="email" type="email" placeholder="tu@correo.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="subject">Asunto / Subject</Label>
                <Input id="subject" placeholder="Pregunta sobre mi solicitud / Question about my application" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="message">Mensaje / Message</Label>
                <Textarea id="message" placeholder="Cuéntanos cómo podemos ayudarte... / Tell us how we can help you..." rows={5} />
              </div>
              <Button className="w-full bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
                Enviar Mensaje / Send Message
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[var(--brand-black)] mb-1">
                Información de contacto
              </h2>
              <p className="text-sm text-[var(--brand-orange)] italic mb-3">Contact Information</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comunícate por teléfono, correo o visítanos. Estamos aquí para ayudarte con cualquier pregunta sobre tu préstamo. / Reach out via phone, email, or visit our office. We are here to help with any questions about your loan application.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="bg-muted border border-border rounded-xl p-5 hover:border-[var(--brand-orange)]/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[var(--brand-orange-light)] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-[var(--brand-orange)]" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                  <p className="font-semibold text-sm text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

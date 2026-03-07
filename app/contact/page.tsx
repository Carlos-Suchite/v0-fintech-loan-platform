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
    label: "Phone",
    value: "+1 (800) 555-0192",
    sub: "Mon – Fri, 9am – 6pm ET",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@swiftlend.com",
    sub: "Replies within 4 hours",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "100 Financial Drive, Suite 400",
    sub: "Austin, TX 78701",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri: 9am – 6pm ET",
    sub: "Sat: 10am – 2pm ET",
  },
]

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-16 px-4 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Contact</p>
          <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">
            Get in touch
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Have a question about your application or our products? Our team is here to help.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-6">
              Send us a message
            </h2>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="first">First Name</Label>
                  <Input id="first" placeholder="Alexandra" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="last">Last Name</Label>
                  <Input id="last" placeholder="Chen" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@email.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Question about my application" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us how we can help you..." rows={5} />
              </div>
              <Button className="w-full bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-2">
                Contact information
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Reach out via phone, email, or visit our office. We are here to help with any questions about your loan application.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="bg-muted border border-border rounded-xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-[var(--teal-light)] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-[var(--teal)]" />
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

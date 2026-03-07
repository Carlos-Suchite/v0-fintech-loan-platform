import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria S.",
    location: "Austin, TX",
    quote:
      "I was approved within 3 hours and had funds in my account the next morning. The process was incredibly simple and stress-free.",
    rating: 5,
    amount: "$8,000 loan",
  },
  {
    name: "James T.",
    location: "Miami, FL",
    quote:
      "SwiftLend helped me consolidate my debt at a much lower rate. The team was professional and kept me informed every step of the way.",
    rating: 5,
    amount: "$15,000 loan",
  },
  {
    name: "Priya M.",
    location: "Seattle, WA",
    quote:
      "No hidden fees, clear communication, and a genuinely helpful loan officer. Couldn't ask for a better experience.",
    rating: 5,
    amount: "$5,000 loan",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="font-[family-name:var(--font-jakarta)] text-4xl font-bold text-[var(--navy)] text-balance">
            What our borrowers say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, quote, rating, amount }) => (
            <div
              key={name}
              className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{`"${quote}"`}</p>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{location}</p>
                </div>
                <span className="text-xs font-medium bg-[var(--teal-light)] text-[var(--teal)] px-2.5 py-1 rounded-full">
                  {amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

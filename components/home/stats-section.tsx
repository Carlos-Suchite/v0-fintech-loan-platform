const stats = [
  { value: "$250M+", label: "Préstamos Otorgados / Loans Funded" },
  { value: "10,000+", label: "Clientes Felices / Happy Borrowers" },
  { value: "4.9 / 5", label: "Calificación / Average Rating" },
  { value: "< 24h", label: "Tiempo de Fondeo / Funding Time" },
]

export function StatsSection() {
  return (
    <section className="relative bg-[var(--brand-orange)] border-y border-[var(--brand-orange-dark)] py-12 px-4 overflow-hidden">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/30 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white/30 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white/30 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/30 rounded-br-xl" />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-serif text-3xl font-bold text-white">{value}</p>
            <p className="text-sm text-white/70 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

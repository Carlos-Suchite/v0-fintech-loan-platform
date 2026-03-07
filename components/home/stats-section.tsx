const stats = [
  { value: "$250M+", label: "Préstamos Otorgados / Loans Funded" },
  { value: "10,000+", label: "Clientes Felices / Happy Borrowers" },
  { value: "4.9 / 5", label: "Calificación / Average Rating" },
  { value: "< 24h", label: "Tiempo de Fondeo / Funding Time" },
]

export function StatsSection() {
  return (
    <section className="bg-[var(--brand-orange-light)] border-y border-border py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-serif text-3xl font-bold text-[var(--brand-black)]">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

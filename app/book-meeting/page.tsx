"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const YEAR = 2026

const content = {
  es: {
    tag: "Agendar Consulta",
    h1: "Reserva tu cita",
    intro:
      "Selecciona un día del calendario 2026 y un horario disponible para reunirte gratis con uno de nuestros asesores financieros.",
    months: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ],
    weekdays: ["D", "L", "M", "M", "J", "V", "S"],
    pickTime: "Elige un horario",
    selectedLabel: "Fecha seleccionada",
    noDate: "Selecciona una fecha en el calendario",
    confirm: "Confirmar Consulta",
    confirmed: "¡Consulta confirmada!",
    confirmedBody: "Te enviaremos un correo con los detalles de tu cita.",
    timezone: "Hora del Este (ET)",
  },
  en: {
    tag: "Book a Consultation",
    h1: "Reserve your appointment",
    intro:
      "Pick a day from the 2026 calendar and an available time slot to meet for free with one of our financial advisors.",
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    weekdays: ["S", "M", "T", "W", "T", "F", "S"],
    pickTime: "Choose a time",
    selectedLabel: "Selected date",
    noDate: "Select a date on the calendar",
    confirm: "Confirm Consultation",
    confirmed: "Consultation confirmed!",
    confirmedBody: "We'll email you the details of your appointment.",
    timezone: "Eastern Time (ET)",
  },
}

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function BookMeetingPage() {
  const { lang } = useLang()
  const t = content[lang]

  const [selected, setSelected] = useState<{ month: number; day: number } | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [monthIndex, setMonthIndex] = useState(0)

  const today = new Date()

  function isPast(month: number, day: number) {
    const d = new Date(YEAR, month, day)
    const ref = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < ref
  }

  function selectDay(month: number, day: number) {
    if (isPast(month, day)) return
    setSelected({ month, day })
    setTime(null)
    setConfirmed(false)
  }

  const month = monthIndex
  const daysInMonth = getDaysInMonth(YEAR, month)
  const firstWeekday = getFirstWeekday(YEAR, month)
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const selectedDateLabel = selected
    ? `${t.weekdays.length ? "" : ""}${selected.day} ${t.months[selected.month]} ${YEAR}`
    : null

  return (
    <main>
      {/* Header */}
      <div className="pt-8 pb-8 px-4 bg-[var(--brand-black)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--brand-orange)] uppercase tracking-widest mb-3">{t.tag}</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5 text-balance">{t.h1}</h1>
          <p className="text-white/60 text-base leading-relaxed">{t.intro}</p>
        </div>
      </div>

      <section className="pt-8 pb-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">

          {/* Calendar */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setMonthIndex((m) => Math.max(0, m - 1))}
                disabled={monthIndex === 0}
                aria-label="Previous month"
                className="p-2 rounded-md text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-serif text-xl font-bold text-foreground">
                {t.months[month]} {YEAR}
              </h2>
              <button
                onClick={() => setMonthIndex((m) => Math.min(11, m + 1))}
                disabled={monthIndex === 11}
                aria-label="Next month"
                className="p-2 rounded-md text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {t.weekdays.map((w, i) => (
                <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">
                  {w}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />
                const past = isPast(month, day)
                const isSelected = selected?.month === month && selected?.day === day
                return (
                  <button
                    key={day}
                    onClick={() => selectDay(month, day)}
                    disabled={past}
                    className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-[var(--brand-orange)] text-white"
                        : past
                        ? "text-muted-foreground/40 cursor-not-allowed"
                        : "text-foreground hover:bg-[var(--brand-orange-light)] hover:text-[var(--brand-orange)]"
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Month quick-jump */}
            <div className="mt-6 pt-5 border-t border-border grid grid-cols-4 sm:grid-cols-6 gap-2">
              {t.months.map((m, i) => (
                <button
                  key={m}
                  onClick={() => setMonthIndex(i)}
                  className={`text-xs py-1.5 rounded-md transition-colors ${
                    monthIndex === i
                      ? "bg-[var(--brand-black)] text-white"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Time + confirmation */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[var(--brand-orange)]" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                {t.selectedLabel}
              </span>
            </div>
            <p className="font-serif text-lg font-bold text-foreground mb-6">
              {selected ? selectedDateLabel : <span className="text-muted-foreground font-sans text-sm font-normal">{t.noDate}</span>}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[var(--brand-orange)]" />
              <span className="text-sm font-semibold text-foreground">{t.pickTime}</span>
              <span className="text-xs text-muted-foreground ml-auto">{t.timezone}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  disabled={!selected}
                  onClick={() => {
                    setTime(slot)
                    setConfirmed(false)
                  }}
                  className={`py-2.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    time === slot
                      ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-white"
                      : "border-border text-foreground hover:border-[var(--brand-orange)]/60"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {confirmed ? (
              <div className="mt-auto flex items-start gap-3 rounded-lg bg-green-500/10 border border-green-500/30 p-4">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.confirmed}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.confirmedBody}</p>
                </div>
              </div>
            ) : (
              <Button
                size="lg"
                disabled={!selected || !time}
                onClick={() => setConfirmed(true)}
                className="mt-auto bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]"
              >
                {t.confirm}
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

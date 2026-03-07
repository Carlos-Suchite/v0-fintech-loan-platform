import Link from "next/link"
import { Calendar, Clock, Video, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const appointments = [
  {
    id: "APT-001",
    type: "Loan Consultation",
    officer: "Marcus Williams",
    date: "March 10, 2026",
    time: "2:00 PM ET",
    mode: "Video Call",
    status: "upcoming",
  },
]

export default function AppointmentsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)]">Appointments</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your scheduled consultations with our loan officers.</p>
        </div>
        <Button asChild className="bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
          <Link href="/book-meeting">
            Book New Appointment <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      {appointments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-foreground">{apt.type}</p>
                  <p className="text-sm text-muted-foreground">with {apt.officer}</p>
                </div>
                <span className="text-xs font-medium bg-[var(--teal-light)] text-[var(--teal)] px-2.5 py-1 rounded-full capitalize">
                  {apt.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-[var(--teal)]" />
                  {apt.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-[var(--teal)]" />
                  {apt.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="w-4 h-4 text-[var(--teal)]" />
                  {apt.mode}
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button size="sm" variant="outline">Reschedule</Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">Cancel</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground mb-1">No appointments scheduled</p>
          <p className="text-sm text-muted-foreground mb-5">
            Book a free consultation with one of our loan officers.
          </p>
          <Button asChild className="bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
            <Link href="/book-meeting">Book a Consultation</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your personal information and account settings.</p>
      </div>

      {/* Avatar */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[var(--brand-orange)] flex items-center justify-center text-white text-xl font-bold">
          AC
        </div>
        <div>
          <p className="font-semibold text-foreground">Alexandra Chen</p>
          <p className="text-sm text-muted-foreground">Client since February 2026</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-foreground mb-5">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <Label>First Name</Label>
            <Input defaultValue="Alexandra" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Last Name</Label>
            <Input defaultValue="Chen" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Email Address</Label>
            <Input type="email" defaultValue="alexandra@email.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Phone Number</Label>
            <Input type="tel" defaultValue="+1 (555) 000-0000" />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <Label>Home Address</Label>
            <Input defaultValue="100 Main St, Austin, TX 78701" />
          </div>
        </div>
        <Button className="mt-5 bg-[var(--brand-orange)] text-white hover:bg-[var(--brand-orange-dark)]">
          Save Changes
        </Button>
      </div>

      {/* Security */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck className="w-5 h-5 text-[var(--brand-orange)]" />
          <h2 className="font-semibold text-foreground">Security</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>New Password</Label>
            <Input type="password" placeholder="Min. 8 characters" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Confirm New Password</Label>
            <Input type="password" placeholder="Min. 8 characters" />
          </div>
          <Button variant="outline" className="w-fit">Update Password</Button>
        </div>
      </div>
    </div>
  )
}

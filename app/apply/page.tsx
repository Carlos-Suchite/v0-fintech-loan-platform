"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, CheckCircle2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Employment" },
  { id: 3, label: "Loan Details" },
  { id: 4, label: "Documents" },
  { id: 5, label: "Review" },
]

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleNext = () => setStep((s) => Math.min(s + 1, 5))
  const handleBack = () => setStep((s) => Math.max(s - 1, 1))
  const handleSubmit = () => setSubmitted(true)
  const addFile = (name: string) => setUploadedFiles((f) => [...f, name])
  const removeFile = (name: string) => setUploadedFiles((f) => f.filter((x) => x !== name))

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-10">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-[var(--navy)] mb-3">
            Application Submitted!
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Thank you for applying with SwiftLend. Your application is now under review. You will receive an email confirmation shortly and can track your status in your dashboard.
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-border px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--navy)]">
            <div className="w-7 h-7 rounded-lg bg-[var(--navy)] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-[family-name:var(--font-jakarta)]">SwiftLend</span>
          </Link>
          <p className="text-sm text-muted-foreground">Loan Application</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-3xl">

          {/* Progress */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border -z-10" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-[var(--teal)] -z-10 transition-all"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map(({ id, label }) => (
              <div key={id} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                    step > id
                      ? "bg-[var(--teal)] border-[var(--teal)] text-white"
                      : step === id
                      ? "bg-white border-[var(--teal)] text-[var(--teal)]"
                      : "bg-white border-border text-muted-foreground"
                  )}
                >
                  {step > id ? <CheckCircle2 className="w-4 h-4" /> : id}
                </div>
                <span className={cn("text-xs hidden sm:block", step === id ? "text-[var(--teal)] font-medium" : "text-muted-foreground")}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            {step === 1 && (
              <div>
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--navy)] mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>First Name</Label>
                    <Input placeholder="Alexandra" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Last Name</Label>
                    <Input placeholder="Chen" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="you@email.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Phone Number</Label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Date of Birth</Label>
                    <Input type="date" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Preferred Contact Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="sms">SMS / Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Home Address</Label>
                    <Input placeholder="100 Main St, Austin, TX 78701" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--navy)] mb-6">Employment & Income</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>Employment Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-Time Employed</SelectItem>
                        <SelectItem value="part-time">Part-Time Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Employer Name</Label>
                    <Input placeholder="Acme Corporation" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Job Title</Label>
                    <Input placeholder="Software Engineer" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Monthly Income (USD)</Label>
                    <Input type="number" placeholder="5000" />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Time at Current Employer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lt6">Less than 6 months</SelectItem>
                        <SelectItem value="6-12">6–12 months</SelectItem>
                        <SelectItem value="1-3">1–3 years</SelectItem>
                        <SelectItem value="3+">3+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--navy)] mb-6">Loan Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label>Requested Loan Amount (USD)</Label>
                    <Input type="number" placeholder="5000" min="500" max="25000" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Preferred Repayment Term</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Loan Purpose</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                        <SelectItem value="medical">Medical Expenses</SelectItem>
                        <SelectItem value="home-improvement">Home Improvement</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="vehicle">Vehicle Purchase/Repair</SelectItem>
                        <SelectItem value="business">Small Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <Label>Additional Notes (optional)</Label>
                    <Textarea placeholder="Provide any additional context about your loan request..." rows={4} />
                  </div>
                </div>

                {/* Estimated payment preview */}
                <div className="mt-6 bg-[var(--teal-light)] border border-[var(--teal)]/20 rounded-xl p-5">
                  <p className="text-xs font-semibold text-[var(--teal)] uppercase tracking-widest mb-3">Estimated Payment</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Monthly Payment", value: "~$231" },
                      { label: "Total Interest", value: "~$544" },
                      { label: "Starting APR", value: "12.5%" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs text-muted-foreground mb-1">{label}</p>
                        <p className="font-bold text-[var(--navy)]">{value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">*Estimate based on sample input. Actual rate determined after review.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--navy)] mb-2">Upload Documents</h2>
                <p className="text-sm text-muted-foreground mb-6">Please upload the following required documents to support your application.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {["Government-Issued ID", "Proof of Income", "Proof of Address"].map((doc) => (
                    <div
                      key={doc}
                      className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center text-center gap-3 cursor-pointer hover:border-[var(--teal)] transition-colors"
                      onClick={() => addFile(doc)}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{doc}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">PDF, JPG, or PNG — max 10MB</p>
                      </div>
                      <Button size="sm" variant="outline">Choose File</Button>
                    </div>
                  ))}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-foreground mb-3">Uploaded files:</p>
                    <div className="flex flex-col gap-2">
                      {uploadedFiles.map((file) => (
                        <div key={file} className="flex items-center justify-between bg-muted rounded-lg px-4 py-2.5">
                          <span className="text-sm text-foreground">{file}</span>
                          <button onClick={() => removeFile(file)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--navy)] mb-2">Review & Submit</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Please review your application details before submitting. Once submitted, a loan officer will be in touch within a few hours.
                </p>

                <div className="space-y-4">
                  {[
                    { label: "Personal Info", items: ["Alexandra Chen", "you@email.com", "+1 (555) 000-0000"] },
                    { label: "Employment", items: ["Full-Time Employed", "Acme Corporation", "$5,000/month"] },
                    { label: "Loan Details", items: ["$5,000 loan", "24 months term", "Debt Consolidation"] },
                    { label: "Documents", items: uploadedFiles.length > 0 ? uploadedFiles : ["No documents uploaded"] },
                  ].map(({ label, items }) => (
                    <div key={label} className="bg-muted border border-border rounded-xl p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{label}</p>
                      {items.map((item) => (
                        <p key={item} className="text-sm text-foreground py-0.5">{item}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-[var(--teal-light)] border border-[var(--teal)]/20 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                  By submitting this application, you authorize SwiftLend Financial, LLC to verify your information, access your credit report, and contact you regarding your application. You confirm that all information provided is accurate and truthful.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < 5 ? (
                <Button
                  onClick={handleNext}
                  className="bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-[var(--teal)] text-white hover:bg-[var(--teal)]/90"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Upload, FileText, CheckCircle2, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialDocs = [
  { id: "1", name: "Government ID", file: "passport_scan.pdf", status: "verified", uploaded: "Feb 28, 2026" },
  { id: "2", name: "Proof of Income", file: "payslip_feb2026.pdf", status: "verified", uploaded: "Feb 28, 2026" },
  { id: "3", name: "Proof of Address", file: null, status: "required", uploaded: null },
]

const docTypes = ["Government-Issued ID", "Proof of Income", "Proof of Address", "Bank Statement", "Other"]

export default function DocumentsPage() {
  const [docs, setDocs] = useState(initialDocs)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = () => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === "3"
          ? { ...d, file: "utility_bill.pdf", status: "pending", uploaded: "Mar 7, 2026" }
          : d
      )
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground">Documents</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Upload and manage documents required for your loan application.
        </p>
      </div>

      {/* Upload zone */}
      <div
        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-4 transition-colors mb-8 ${
          dragOver ? "border-[var(--brand-orange)] bg-[var(--brand-orange)]/10" : "border-border"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={() => { setDragOver(false); handleUpload() }}
      >
        <div className="w-14 h-14 rounded-full bg-[var(--brand-orange)]/15 flex items-center justify-center">
          <Upload className="w-6 h-6 text-[var(--brand-orange)]" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground mb-1">Drag and drop files here</p>
          <p className="text-sm text-muted-foreground">PDF, JPG, PNG accepted — max 10MB per file</p>
        </div>
        <Button variant="outline" onClick={handleUpload}>Browse Files</Button>
      </div>

      {/* Document list */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Required Documents</h2>
        </div>
        <div className="divide-y divide-border">
          {docs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between px-6 py-4 gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  doc.status === "verified" ? "bg-green-100" :
                  doc.status === "pending" ? "bg-yellow-100" :
                  "bg-muted"
                }`}>
                  {doc.status === "verified" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <FileText className={`w-5 h-5 ${doc.status === "pending" ? "text-yellow-600" : "text-muted-foreground"}`} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{doc.name}</p>
                  {doc.file ? (
                    <p className="text-xs text-muted-foreground">{doc.file} · {doc.uploaded}</p>
                  ) : (
                    <p className="text-xs text-destructive">No file uploaded</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {doc.status === "verified" && (
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">Verified</span>
                )}
                {doc.status === "pending" && (
                  <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-full">Pending Review</span>
                )}
                {doc.status === "required" && (
                  <Button size="sm" variant="outline" onClick={handleUpload}>
                    <Upload className="w-3.5 h-3.5 mr-1.5" />
                    Upload
                  </Button>
                )}
                {doc.file && (
                  <Button size="sm" variant="ghost" className="text-muted-foreground">
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

/* ─── Data ─────────────────────────────────────────────── */

const products = [
  {
    num: "Product 05",
    img: "/Operational_Boost.png",
    alt: "Operational Boost",
    subtitle: "First Commercial Loan — Business Loan",
    tagline: '"The capital your business needs to stand firm from day one."',
    forLabel: "Who is it for?",
    desc: "Designed for businesses in their first stage of external financing — those needing capital to stabilize operations, cover payroll, restock inventory, or strengthen the foundation they'll grow from.",
    tags: ["Payroll", "Inventory", "Equipment", "Working capital", "Suppliers", "Urgent repairs"],
    features: [
      "Working capital for day-to-day operations",
      "Payment structure adapted to business cash flow",
      "Evaluation based on business potential, not just credit history",
      "Digital process with decision in 24 to 48 hours",
      "Access to Strategic Expansion upon completing first cycle",
      "Contract available in English and Spanish",
    ],
    cta: "Apply for Operational Boost →",
  },
  {
    num: "Product 06",
    img: "/Strategic_Expansion.png",
    alt: "Strategic Expansion",
    subtitle: "Growth & Expansion — Business Loan",
    tagline: '"Because there are moments when the business has outgrown where it is."',
    forLabel: "Who is it for?",
    desc: "For businesses with proven traction that are ready to take the next leap — opening a second location, moving to a larger space, acquiring major equipment, or entering a new market.",
    tags: ["Second location", "Larger space", "Major equipment", "New market", "Renovation", "Franchise"],
    features: [
      "Larger capital for real growth projects",
      "Broader terms adapted to medium-term projects",
      "Evaluation based on projected cash flow and prior performance",
      "Preferential access for clients with Touch of Vintage history",
      "Advisory support on the expansion's financial structure",
      "Available in English and Spanish",
    ],
    cta: "I want to expand →",
  },
  {
    num: "Product 07",
    img: "/Financial_Backing.png",
    alt: "Financial Backing",
    subtitle: "Available Credit Line — Business Credit Line",
    tagline: '"Capital available when you need it — without waiting for the moment to pass."',
    forLabel: "Who is it for?",
    desc: "For businesses that know what it means to run out of liquidity at the worst moment. A pre-approved credit line you activate when a project, opportunity, or urgent need arises that can't wait for a new application process.",
    tags: ["Urgent purchase", "Cash flow gap", "Unexpected contract", "Operational emergency", "Peak season"],
    features: [
      "Pre-approved credit line available immediately",
      "Activate only what you need — pay interest only on what's used",
      "Disbursement within 24 hours of activation",
      "Line renews automatically once the balance is cleared",
      "Available exclusively to active Touch of Vintage clients",
      "No new application process required on each activation",
    ],
    cta: "Activate my line →",
  },
]

const identityCards = [
  {
    title: "Vision",
    body: "To be the leading microfinance institution in the State of Florida — recognized for redefining the sector through the fusion of advanced risk architecture and exceptional human treatment. A model where profitability and purpose are inseparable drivers.",
    note: "Our vision is not a wish — it is an operational goal with a defined date, structure, and direction.",
  },
  {
    title: "Mission",
    body: "To protect and multiply our investors' assets through non-negotiable operational discipline, while providing our clients with empathetic, clear, and accessible credit solutions that act as a real bridge toward their economic progress.",
    note: "Two commitments. One standard: irreducible.",
  },
  {
    title: "Reason for Being",
    body: "Touch of Vintage does not only exist to lend money. It exists so that those who trust us go further than they would on their own — in both personal finance and commercial growth, always under the same principle.",
    note: "The client is not a transaction. They are a relationship.",
  },
]

const values = [
  { letter: "T", title: "Transparency", body: "In every process, every contract, and every decision. No fine print, no surprises. What is said is what is done — always." },
  { letter: "O", title: "Opportunity", body: "Individual and real. We believe every person deserves an open door, regardless of where their story comes from or what their credit history looks like today." },
  { letter: "U", title: "Universality", body: "Education and innovation for all people. Finance is not exclusive territory — it is a right that Touch of Vintage democratizes." },
  { letter: "C", title: "Commitment", body: "To long-term financial relationships. We are not just a loan — we are the beginning of a journey. Every client who chooses us starts a path, not a transaction." },
  { letter: "H", title: "Honesty", body: "As the foundation of all trust. We tell the truth even when it's not the answer a client wants to hear. A solid financial relationship can only be built on real facts." },
]

/* ─── Page ──────────────────────────────────────────────── */

export default function CommercialPage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg,#091624 0%,#10203a 60%,#0e1d30 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* radial accent */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 80% 30%,rgba(26,45,69,.5) 0%,transparent 55%)",
          }}
        />
        <div className="relative z-10 max-w-4xl px-6 sm:px-12 pt-32 pb-20">
          <span
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(180,210,240,0.85)", display: "block", marginBottom: 20 }}
          >
            Business Solutions
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 700, lineHeight: 1.15, color: "#fff", marginBottom: 20 }}
          >
            Your business deserves capital that understands it.<br />Not just finances it.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 620, marginBottom: 32 }}>
            Touch of Vintage LLC&apos;s commercial division was created for entrepreneurs, business owners, and established businesses in Florida that need real working capital — without traditional banking bureaucracy. Three products designed for three distinct moments in your business lifecycle. Digital process. Agile decisions. Capital that arrives when you need it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["No banking license required", "Competitive APR ≥18%", "100% Digital", "Decision in 24–48 hrs", "English & Spanish"].map((p) => (
              <span key={p} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 20, padding: "5px 14px" }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ───────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "72px 48px 80px" }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C05528", display: "block", marginBottom: 10 }}>Our Commercial Products</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#C05528", marginBottom: 10 }}>Business loans for real entrepreneurs in Florida</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#767676", maxWidth: 560, marginBottom: 40 }}>Three products designed for three distinct stages of your business lifecycle.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {products.map((p) => (
            <div
              key={p.num}
              style={{ background: "#fff", border: "1px solid #e8e4df", borderRadius: 10, overflow: "hidden", transition: "transform .2s,box-shadow .2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 14px 44px rgba(0,0,0,.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              {/* image banner */}
              <div style={{ background: "#f9f7f5", borderBottom: "1px solid #ede9e4", padding: "24px 24px 18px" }}>
                <Image src={p.img} alt={p.alt} width={300} height={160} style={{ width: "100%", maxWidth: 300, height: "auto", display: "block" }} />
              </div>

              <div style={{ padding: "22px 24px 26px" }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C05528", display: "block", marginBottom: 6 }}>{p.num}</span>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#767676", marginBottom: 12 }}>{p.subtitle}</div>
                <div style={{ fontSize: 13, fontStyle: "italic", color: "#888", marginBottom: 14, lineHeight: 1.5 }}>{p.tagline}</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C05528", marginBottom: 6 }}>{p.forLabel}</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4a4a4a", marginBottom: 16 }}>{p.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A2D45", background: "#eef3f9", borderRadius: 3, padding: "3px 8px" }}>{t}</span>
                  ))}
                </div>

                <ul style={{ listStyle: "none", marginBottom: 22, padding: 0 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ fontSize: 12, color: "#4a4a4a", padding: "5px 0", display: "flex", alignItems: "flex-start", gap: 8, borderBottom: i < p.features.length - 1 ? "1px solid #f0ece8" : "none" }}>
                      <span style={{ color: "#C05528", fontSize: 16, flexShrink: 0, marginTop: -2 }}>·</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/apply"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", background: "linear-gradient(135deg,#C05528 0%,#9E3F19 100%)", padding: "10px 20px", borderRadius: 5, textDecoration: "none" }}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── IDENTITY ───────────────────────────────────────── */}
      <section style={{ background: "#111A26", padding: "80px 48px" }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E07048", display: "block", marginBottom: 10 }}>Our Identity</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#E07048", marginBottom: 0 }}>Who we are</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20, marginTop: 36 }}>
          {identityCards.map((c) => (
            <div key={c.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 28 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#E07048", marginBottom: 12 }}>{c.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{c.body}</p>
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.38)", fontSize: 12, marginTop: 12, display: "block" }}>{c.note}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E07048", display: "block", marginBottom: 10 }}>The Two Pillars</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#E07048", marginBottom: 0 }}>Our dual commitment</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
          {[
            { title: "For our investors", body: "Operational discipline, financial transparency, and a sustained return that protects and multiplies their assets." },
            { title: "For our clients", body: "Empathetic, clear, and accessible credit solutions that act as a real bridge toward their economic success." },
          ].map((p) => (
            <div key={p.title} style={{ background: "rgba(26,45,69,0.5)", border: "1px solid rgba(100,160,220,0.2)", borderRadius: 10, padding: 24 }}>
              <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E07048", marginBottom: 10 }}>{p.title}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.65)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────── */}
      <section style={{ background: "#F5F4F1", padding: "80px 48px" }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C05528", display: "block", marginBottom: 10 }}>Our Values</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#C05528", marginBottom: 10 }}>T.O.U.C.H.</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#767676", maxWidth: 560, marginBottom: 36 }}>These values are not decorative declarations — they are operational criteria. Every decision, every product, and every client interaction is evaluated against them.</p>

        <div style={{ display: "grid", gap: 12 }}>
          {values.map((v) => (
            <div
              key={v.letter}
              style={{ display: "flex", alignItems: "flex-start", gap: 20, background: "#fff", border: "1px solid #e5e1dc", borderRadius: 10, padding: "20px 24px", transition: "box-shadow .2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,.07)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, color: "#C05528", flexShrink: 0, width: 36, textAlign: "center", lineHeight: 1 }}>{v.letter}</div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: "#C05528", marginBottom: 4 }}>{v.title}</h4>
                <p style={{ fontSize: 12, color: "#4a4a4a", lineHeight: 1.65 }}>{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE ──────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg,#091624 0%,#1A2D45 100%)", padding: "72px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontStyle: "italic", color: "#fff", lineHeight: 1.6, maxWidth: 700, margin: "0 auto 16px" }}>
          &ldquo;Touch of Vintage doesn&apos;t just lend money.<br />It builds trust, drives purpose, and anchors progress where it&apos;s needed most.&rdquo;
        </p>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
          Touch of Vintage LLC · Florida · Licensed under Chapter 516 &amp; 687
        </span>
      </section>

      {/* ── LEGAL ──────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "56px 48px 72px" }}>
        <div style={{ background: "#f5f8fc", border: "1px solid #d8e4f0", borderLeft: "4px solid #C05528", borderRadius: 8, padding: "28px 32px", maxWidth: 860 }}>
          <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C05528", marginBottom: 14 }}>Legal Disclosure – Commercial Loans</h3>
          <p style={{ fontSize: 11, lineHeight: 1.85, color: "#888" }}>
            Commercial loans offered by Touch of Vintage LLC are governed under Florida Statutes Chapter 687 (Interest and Usury) with an Annual Percentage Rate (APR) of up to 17.99%. Commercial loans with rates equal to or below 18% APR do not require a license under Florida Statutes Chapter 516. All commercial products are available exclusively to commercial entities or individuals acting in a commercial capacity, not as consumers. Financial Backing is available exclusively to active clients in good standing with Touch of Vintage LLC. All commercial products are subject to business eligibility evaluation, applicant identity verification, and internal approval. Terms, amounts, and conditions are provided in writing prior to signing the contract. Touch of Vintage LLC does not offer tax, legal, or accounting advice. Applicants are encouraged to consult a qualified professional before entering into any financial obligation.
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ background: "#060f1a", padding: "22px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>© 2026 Touch of Vintage LLC. All rights reserved.</span>
        <nav style={{ display: "flex", gap: 20 }}>
          {[["Privacy Policy", "/"], ["Terms of Use", "/"], ["Contact", "/contact"]].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textDecoration: "none", letterSpacing: "0.06em" }}>{label}</Link>
          ))}
        </nav>
      </footer>
    </>
  )
}

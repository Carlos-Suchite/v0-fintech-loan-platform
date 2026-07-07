"use client"

import Image from "next/image"
import Link from "next/link"

const products = [
  {
    num: "Product 01",
    img: "/Individual_compass.png",
    alt: "Individual Compass",
    subtitle: "Individual Loan — Consumer Loan",
    tagline: '"When you need a clear direction, here\'s your path."',
    desc: "Designed for the person who needs to solve something specific today — an urgent repair, an unexpected expense, an opportunity that cannot wait. One loan, one need, one direct solution.",
    features: [
      "Accessible capital for immediate needs",
      "Bi-weekly payments adapted to your income flow",
      "100% digital — no lines, no unnecessary paperwork",
      "Prepayment without penalty at any time (§516.031(6))",
      "Clear, transparent contract in English and Spanish",
      "Full disclosures under TILA – Regulation Z",
    ],
    cta: "Apply now →",
  },
  {
    num: "Product 02",
    img: "/Dynamic_Ascent.png",
    alt: "Dynamic Ascent",
    subtitle: "Progressive Growth — Consumer Loan",
    tagline: '"Every completed cycle is a step toward more."',
    desc: "Built for those with financial discipline who want their payment history to open doors. Each time you complete your payment cycle, you gain access to greater capital in the next loan.",
    features: [
      "Starting capital with potential increase each completed cycle",
      "Automatic review upon completion of each payment term",
      "Payment history builds your internal credit profile",
      "Improved conditions available for returning clients",
      "Digital portal for real-time progress tracking",
      "Preferential access to higher-capital products",
    ],
    cta: "Start ascending →",
  },
  {
    num: "Product 03",
    img: "/Inner_Circle.png",
    alt: "Inner Circle",
    subtitle: "Referred Loan — Consumer Loan",
    tagline: '"Your community\'s trust, backed by us."',
    desc: "For independent workers, entrepreneurs, and families who know and trust one another. If someone in your network is a Touch of Vintage client and refers you, that connection counts — no co-signer required.",
    features: [
      "Credit access through community referral",
      "Individual contract — each member responsible for their own loan",
      "No co-signer required — referral, not guarantee",
      "Ideal for independent workers with variable income",
      "Builds personal credit history from the first payment",
      "Access to Dynamic Ascent upon completing first cycle",
    ],
    cta: "Join the circle →",
  },
  {
    num: "Product 04",
    img: "/Strategic_Renewal.png",
    alt: "Strategic Renewal",
    subtitle: "Financial Rebuilding — Consumer Loan",
    tagline: '"Starting over is not a step back — it\'s choosing better."',
    desc: "For those who have weathered a financial storm and are ready to take back control. Whether it's debt consolidation, credit history reconciliation, or simply a new starting point — designed with seriousness and without judgment.",
    features: [
      "Personalized evaluation of current situation — not past history",
      "Payment structure adapted to real repayment capacity",
      "No perfect credit history required",
      "Positive credit bureau reporting with each on-time payment",
      "Continuous support throughout the entire loan term",
      "Access to Dynamic Ascent upon demonstrating positive history",
    ],
    cta: "Reclaim control →",
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
    body: "At Touch of Vintage we believe modern finance must always be accompanied by a personal touch and the values that generate lasting trust. We are committed to responsible, clear, and human credit solutions designed to educate, empower, and support people at every stage of their financial journey.",
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

export default function IndividualsPage() {
  return (
    <>
      <div style={{ fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>

        {/* SECTION 1: HERO — dark navy */}
        <section style={{
          background: "linear-gradient(135deg, #0b1929 0%, #12243a 60%, #0e1d30 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Radial orange glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 15% 40%, rgba(192,85,40,0.1) 0%, transparent 55%)",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 860, padding: "80px 48px" }}>
            <span style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#E07048",
              marginBottom: 20, display: "block",
            }}>Personal Services</span>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 700, lineHeight: 1.15, color: "#fff", marginBottom: 20,
            }}>
              Four paths.<br />One destination: your financial stability.
            </h1>
            <p style={{
              fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.65)",
              maxWidth: 620, marginBottom: 32,
            }}>
              At Touch of Vintage we understand that every story is different. That&apos;s why we designed four personal loan products built for exactly where you are today — and where you want to be tomorrow. All regulated under Florida Statutes Chapter 516. All 100% digital. All with you.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["100% Digital", "Process in minutes", "No prepayment penalty", "Licensed in Florida", "Spanish & English support"].map((pill) => (
                <span key={pill} style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(255,255,255,0.18)", borderRadius: 20, padding: "5px 14px",
                }}>{pill}</span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: PRODUCTS — white */}
        <section style={{ background: "#fff", padding: "72px 48px 80px" }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#C05528",
            marginBottom: 10, display: "block",
          }}>Our Products</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700, color: "#C05528", marginBottom: 10,
          }}>Personal loans designed for you</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#767676", maxWidth: 560, marginBottom: 40 }}>
            Select the product that best fits your current financial moment.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}>
            {products.map((p) => (
              <div key={p.num} style={{
                background: "#fff", border: "1px solid #e8e4df",
                borderRadius: 10, overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 14px 44px rgba(0,0,0,0.1)"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = "none"
                }}
              >
                {/* Card image banner */}
                <div style={{
                  background: "#f9f7f5", borderBottom: "1px solid #ede9e4",
                  padding: "24px 24px 18px", display: "flex", alignItems: "center",
                }}>
                  <Image src={p.img} alt={p.alt} width={280} height={140} style={{ width: "100%", maxWidth: 280, height: "auto", display: "block" }} />
                </div>

                {/* Card body */}
                <div style={{ padding: "22px 24px 26px" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C05528", marginBottom: 6, display: "block" }}>{p.num}</span>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#767676", marginBottom: 12 }}>{p.subtitle}</div>
                  <div style={{ fontSize: 13, fontStyle: "italic", color: "#888", marginBottom: 14, lineHeight: 1.5 }}>{p.tagline}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C05528", marginBottom: 6 }}>Who is it for?</div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4a4a4a", marginBottom: 16 }}>{p.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
                    {p.features.map((f) => (
                      <li key={f} style={{
                        fontSize: 12, color: "#4a4a4a", padding: "5px 0",
                        display: "flex", alignItems: "flex-start", gap: 8,
                        borderBottom: "1px solid #f0ece8",
                      }}>
                        <span style={{ color: "#C05528", fontSize: 16, flexShrink: 0, marginTop: -2 }}>·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/apply" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#fff",
                    background: "linear-gradient(135deg, #C05528 0%, #9E3F19 100%)",
                    padding: "10px 20px", borderRadius: 5, textDecoration: "none",
                    transition: "opacity 0.15s",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                  >{p.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: IDENTITY — dark charcoal */}
        <section style={{ background: "#111A26", padding: "80px 48px" }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#E07048",
            marginBottom: 10, display: "block",
          }}>Our Identity</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700, color: "#E07048", marginBottom: 0,
          }}>Who we are</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20, marginTop: 36,
          }}>
            {identityCards.map((c) => (
              <div key={c.title} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: 28,
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "1rem",
                  fontWeight: 700, color: "#E07048", marginBottom: 12,
                }}>{c.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{c.body}</p>
                <span style={{
                  fontStyle: "italic", color: "rgba(255,255,255,0.38)", fontSize: 12,
                  marginTop: 12, display: "block",
                }}>{c.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: VALUES — off-white */}
        <section style={{ background: "#F5F4F1", padding: "80px 48px" }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#C05528",
            marginBottom: 10, display: "block",
          }}>Our Values</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700, color: "#C05528", marginBottom: 10,
          }}>T.O.U.C.H.</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#767676", maxWidth: 560, marginBottom: 0 }}>
            These values are not decorative declarations — they are operational criteria. Every decision, every product, and every client interaction is evaluated against them.
          </p>
          <div style={{ display: "grid", gap: 12, marginTop: 36 }}>
            {values.map((v) => (
              <div key={v.letter} style={{
                display: "flex", alignItems: "flex-start", gap: 20,
                background: "#fff", border: "1px solid #e5e1dc",
                borderRadius: 10, padding: "20px 24px",
                transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.07)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700,
                  color: "#C05528", flexShrink: 0, width: 36, textAlign: "center", lineHeight: 1,
                }}>{v.letter}</div>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: "#C05528", marginBottom: 4 }}>{v.title}</h4>
                  <p style={{ fontSize: 12, color: "#4a4a4a", lineHeight: 1.65 }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: QUOTE — navy */}
        <section style={{
          background: "linear-gradient(135deg, #1A2D45 0%, #0e1d30 100%)",
          padding: "72px 48px", textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontStyle: "italic", color: "#fff", lineHeight: 1.6,
            maxWidth: 700, margin: "0 auto 16px",
          }}>
            &ldquo;Touch of Vintage doesn&apos;t just lend money.<br />
            It builds trust, drives purpose, and anchors progress where it&apos;s needed most.&rdquo;
          </p>
          <span style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
          }}>Touch of Vintage LLC · Florida · Licensed under Chapter 516</span>
        </section>

        {/* SECTION 6: LEGAL — white */}
        <section style={{ background: "#fff", padding: "56px 48px 72px" }}>
          <div style={{
            background: "#faf9f7", border: "1px solid #e5e1db",
            borderLeft: "4px solid #C05528",
            borderRadius: 8, padding: "28px 32px", maxWidth: 860,
          }}>
            <h3 style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#C05528", marginBottom: 14,
            }}>Legal Disclosure – Consumer Loans</h3>
            <p style={{ fontSize: 11, lineHeight: 1.85, color: "#888" }}>
              Touch of Vintage LLC is licensed under Florida Statutes Chapter 516 – Consumer Finance Act. All personal loans are subject to credit evaluation, identity verification, and approval. Interest rates, amounts, charges, and terms are disclosed in accordance with the Truth in Lending Act (TILA) – 15 U.S.C. §1601 and Regulation Z – 12 C.F.R. Part 1026, prior to signing the contract. The applicant will receive a complete copy of the contract and Disclosure Statement before committing to any term. Full or partial prepayment of any loan may be made at any time without penalty, pursuant to Florida Statutes §516.031(6). Touch of Vintage LLC does not discriminate against any applicant on the basis of race, color, religion, national origin, sex, marital status, age, or because the applicant&apos;s income derives from public assistance programs, in accordance with the Equal Credit Opportunity Act (ECOA) – 15 U.S.C. §1691. To file a complaint or inquiry, contact the Florida Office of Financial Regulation (OFR) at (850) 487-9687 or at www.flofr.gov.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: "#0b1524", padding: "22px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
            &copy; 2026 Touch of Vintage LLC. All rights reserved.
          </span>
          <nav style={{ display: "flex", gap: 20 }}>
            {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }, { label: "Contact", href: "/contact" }].map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontSize: 11, color: "rgba(255,255,255,0.4)", textDecoration: "none",
                letterSpacing: "0.06em", transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#fff"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"}
              >{l.label}</Link>
            ))}
          </nav>
        </footer>

      </div>
    </>
  )
}

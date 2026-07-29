// Loan product catalog + eligibility rules, sourced from:
// - PROJECT_STATE_HANDOFF.md §6 (LoanDisk product IDs, amount/term ranges)
// - app/individuals/page.tsx and app/contact/page.tsx marketing copy (who each
//   product is actually for — confirmed with Maury 2026-07-27)
//
// Eligibility:
// - "open"       — anyone can select it, no prior relationship needed
// - "returning"  — only for applicants who already completed a loan with Touch of
//                  Vintage (Ascenso Dinámico / Respaldo Financiero)
// - "referred"   — only for applicants referred by an existing client (Círculo Íntimo
//                  only); requires a referrer email

export type Division = "consumer" | "commercial"
export type Eligibility = "open" | "returning" | "referred"

export interface LoanProduct {
  id: string // LoanDisk loan_product_id
  name: string
  division: Division
  eligibility: Eligibility
  minAmount: number
  maxAmount: number
  minTermMonths: number
  maxTermMonths: number
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "360088",
    name: "Brújula Individual",
    division: "consumer",
    eligibility: "open",
    minAmount: 500,
    maxAmount: 2500,
    minTermMonths: 3,
    maxTermMonths: 6,
  },
  {
    id: "360090",
    name: "Ascenso Dinámico",
    division: "consumer",
    eligibility: "returning",
    minAmount: 1000,
    maxAmount: 5000,
    minTermMonths: 3,
    maxTermMonths: 6,
  },
  {
    id: "360091",
    name: "Círculo Íntimo",
    division: "consumer",
    eligibility: "referred",
    minAmount: 500,
    maxAmount: 2500,
    minTermMonths: 3,
    maxTermMonths: 6,
  },
  {
    id: "360087",
    name: "Renacer Estratégico",
    division: "consumer",
    eligibility: "open",
    minAmount: 300,
    maxAmount: 1500,
    minTermMonths: 3,
    maxTermMonths: 6,
  },
  {
    id: "367970",
    name: "Capital Productivo",
    division: "commercial",
    eligibility: "open",
    minAmount: 2500,
    maxAmount: 25000,
    minTermMonths: 3,
    maxTermMonths: 12,
  },
  {
    id: "360089",
    name: "Impulso Comercial",
    division: "commercial",
    eligibility: "open",
    minAmount: 5000,
    maxAmount: 50000,
    minTermMonths: 6,
    maxTermMonths: 18,
  },
  {
    id: "367971",
    name: "Respaldo Financiero",
    division: "commercial",
    eligibility: "returning",
    minAmount: 5000,
    maxAmount: 50000,
    minTermMonths: 1,
    maxTermMonths: 12,
  },
]

export function getEligibleProducts(division: Division, hasCompletedLoan: boolean, wasReferred: boolean): LoanProduct[] {
  return LOAN_PRODUCTS.filter((p) => {
    if (p.division !== division) return false
    if (p.eligibility === "returning") return hasCompletedLoan
    if (p.eligibility === "referred") return wasReferred
    return true
  })
}

export function getProductById(id: string): LoanProduct | undefined {
  return LOAN_PRODUCTS.find((p) => p.id === id)
}

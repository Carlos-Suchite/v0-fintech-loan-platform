/**
 * Touch of Vintage — Desembolso de préstamo vía ACH con Stripe Connect
 * --------------------------------------------------------------------
 * Este script desembolsa (envía) fondos de préstamo a la cuenta bancaria
 * de un cliente en EE. UU. usando el SDK oficial de Stripe.
 *
 * IMPORTANTE — lee esto antes de usarlo en producción:
 *
 * 1. Un objeto `Customer` de Stripe sirve para COBRAR dinero (pull), NO para
 *    enviarlo. Para ENVIAR dinero a la cuenta de un tercero se usa
 *    Stripe Connect: el receptor es una "connected account" con una cuenta
 *    bancaria externa verificada, y luego se hace un Transfer + Payout.
 *
 * 2. AUTORIZACIÓN: nunca muevas fondos hacia/desde una cuenta bancaria sin el
 *    consentimiento explícito y documentado del titular (reglas NACHA / Reg E).
 *    Para un préstamo, esto es el acuerdo de préstamo firmado por el cliente.
 *
 * 3. KYC / onboarding: Stripe exige verificar la identidad del receptor
 *    (Connect onboarding) antes de poder pagarle. No se puede "empujar" ACH a
 *    una cuenta arbitraria solo con el routing/account number.
 *
 * 4. SEGURIDAD: idealmente los datos bancarios se tokenizan en el cliente con
 *    Stripe.js (createToken) para no manejar números de cuenta en tu servidor.
 *    Aquí se crea el token en el servidor solo como ejemplo controlado.
 *
 * Requisitos:
 *   - npm i stripe
 *   - STRIPE_SECRET_KEY en el entorno (clave de una cuenta con Connect activo)
 *
 * Uso:
 *   node scripts/disburse-ach.mjs
 */

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
})

// ---- Datos de entrada (reemplázalos por los de tu cliente / préstamo) -------
const borrower = {
  firstName: "Nombre",
  lastName: "Apellido",
  email: "cliente@example.com",
  // Dirección requerida para KYC de Connect
  address: {
    line1: "123 Main St",
    city: "Miami",
    state: "FL",
    postal_code: "33101",
    country: "US",
  },
  dob: { day: 1, month: 1, year: 1990 },
  ssnLast4: "0000", // requerido por Stripe para verificación en EE. UU.
}

const bankAccount = {
  routingNumber: "110000000", // routing number de prueba de Stripe
  accountNumber: "000123456789", // account number de prueba de Stripe
  accountHolderName: "Nombre Apellido",
  accountHolderType: "individual", // 'individual' | 'company'
}

const AMOUNT_USD = 1500 // monto del desembolso en dólares
// -----------------------------------------------------------------------------

async function main() {
  const amountInCents = Math.round(AMOUNT_USD * 100)

  // 1) Crear la connected account (el receptor del préstamo).
  //    'custom' te da control total del payout; requiere proveer datos de KYC.
  const account = await stripe.accounts.create({
    type: "custom",
    country: "US",
    email: borrower.email,
    business_type: "individual",
    capabilities: {
      transfers: { requested: true }, // necesario para recibir transfers
    },
    individual: {
      first_name: borrower.firstName,
      last_name: borrower.lastName,
      email: borrower.email,
      address: borrower.address,
      dob: borrower.dob,
      ssn_last_4: borrower.ssnLast4,
    },
    business_profile: {
      mcc: "6012", // instituciones financieras
      product_description: "Desembolso de préstamo personal",
    },
    tos_acceptance: {
      // Debe reflejar la aceptación REAL del cliente (IP + timestamp reales).
      service_agreement: "recipient",
      date: Math.floor(Date.now() / 1000),
      ip: "0.0.0.0",
    },
  })
  console.log("[v0] Connected account creada:", account.id)

  // 2) Asociar la cuenta bancaria del cliente de forma segura (vía token).
  //    En producción genera este token en el navegador con Stripe.js.
  const bankToken = await stripe.tokens.create({
    bank_account: {
      country: "US",
      currency: "usd",
      account_holder_name: bankAccount.accountHolderName,
      account_holder_type: bankAccount.accountHolderType,
      routing_number: bankAccount.routingNumber,
      account_number: bankAccount.accountNumber,
    },
  })

  const externalAccount = await stripe.accounts.createExternalAccount(account.id, {
    external_account: bankToken.id,
  })
  console.log("[v0] Cuenta bancaria asociada:", externalAccount.id)

  // 3) Mover fondos de tu balance de plataforma a la connected account...
  const transfer = await stripe.transfers.create({
    amount: amountInCents,
    currency: "usd",
    destination: account.id,
    description: `Desembolso de préstamo — ${borrower.firstName} ${borrower.lastName}`,
  })
  console.log("[v0] Transfer creado:", transfer.id)

  // ...y luego pagar (ACH) desde la connected account a su banco.
  const payout = await stripe.payouts.create(
    {
      amount: amountInCents,
      currency: "usd",
      method: "standard", // ACH estándar (1–3 días hábiles)
      destination: externalAccount.id,
      description: "Desembolso de préstamo personal",
    },
    { stripeAccount: account.id }, // se ejecuta EN nombre de la connected account
  )
  console.log("[v0] Payout ACH creado:", payout.id, "estado:", payout.status)

  console.log("[v0] Desembolso completado.")
}

main().catch((err) => {
  console.error("[v0] Error en el desembolso:", err.message)
  process.exit(1)
})

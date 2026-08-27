import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

// AES-256-GCM at-rest encryption for Plaid access_tokens and bank account numbers
// (GLBA/FCRA requirement — see Plaid_Developer_Brief.docx §9).
//
// ENCRYPTION_KEY must be a 64-char hex string (32 bytes). Generate one with:
//   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
// Store it in .env.local (dev) / your hosting provider's secret manager (prod).
// Losing this key makes every encrypted value permanently unreadable — back it up
// somewhere other than the .env file itself.

function getKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY
  if (!hex || hex.length !== 64) {
    throw new Error(
      "ENCRYPTION_KEY no está configurada (debe ser un hex de 64 caracteres / 32 bytes). " +
        "Genera una con: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
    )
  }
  return Buffer.from(hex, "hex")
}

// Output format: iv(hex):authTag(hex):ciphertext(hex)
export function encrypt(plaintext: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${ciphertext.toString("hex")}`
}

export function decrypt(payload: string): string {
  const [ivHex, authTagHex, ciphertextHex] = payload.split(":")
  if (!ivHex || !authTagHex || !ciphertextHex) {
    throw new Error("Formato de dato cifrado inválido.")
  }
  const decipher = createDecipheriv("aes-256-gcm", getKey(), Buffer.from(ivHex, "hex"))
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"))
  const plaintext = Buffer.concat([decipher.update(Buffer.from(ciphertextHex, "hex")), decipher.final()])
  return plaintext.toString("utf8")
}

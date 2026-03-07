export const runtime = "edge"

const SYSTEM_PROMPT = `Eres un asistente virtual amigable de Touch of Vintage, una empresa de préstamos personales pequeños.
Tu función principal es ayudar a los visitantes del sitio web. Responde en el mismo idioma que use el usuario — si escribe en español, responde en español; si escribe en inglés, responde en inglés.

Información clave del sitio web:
- Nombre: Touch of Vintage
- Tipo: Préstamos personales pequeños / Small personal loans
- Montos disponibles: $200 – $8,000
- Plazos: 6 a 60 meses
- APR desde 8.9%, sin cargos ocultos ni penalidades por pago anticipado
- Ingreso mínimo mensual requerido: $800
- Proceso: Solicitud en línea (5 min) → Revisión del equipo (pocas horas) → Decisión por correo → Fondos depositados en tu cuenta (mismo día hábil)
- Páginas del sitio: Inicio (/), Requisitos (/requirements), Solicitar (/apply), Sobre Nosotros (/about), FAQ (/faq), Contacto (/contact)
- Crear cuenta: /signup | Iniciar sesión: /login
- Seguridad: Cifrado de 256 bits de nivel bancario

Ayuda con: proceso de solicitud, requisitos, montos y tasas, navegación del sitio, crear cuenta, documentos necesarios, agendar consulta.
Si alguien pregunta algo fuera de tu alcance, indícales que contacten a un asesor en la página de Contacto.
Sé cálido, profesional, conciso y útil. No inventes información que no esté listada arriba.`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY

  if (!apiKey) {
    return Response.json(
      { text: "El asistente no está configurado aún. Por favor contacta al equipo de soporte. / The assistant is not configured yet. Please contact support." },
      { status: 200 }
    )
  }

  const openaiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    })),
  ]

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: openaiMessages,
      max_tokens: 500,
    }),
  })

  if (!openaiRes.ok) {
    return Response.json(
      { text: "Lo siento, no pude procesar tu mensaje. Por favor intenta de nuevo. / Sorry, I could not process your message. Please try again." },
      { status: 200 }
    )
  }

  const data = await openaiRes.json()
  const text = data.choices?.[0]?.message?.content ?? "Lo siento, no pude responder."

  return Response.json({ text })
}

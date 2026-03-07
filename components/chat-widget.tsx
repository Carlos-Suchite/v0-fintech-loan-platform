"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { useLang } from "@/lib/lang-context"

type Message = { id: string; role: "user" | "assistant"; text: string }

const uiCopy = {
  es: {
    title: "Asistente Touch of Vintage",
    greeting: "¡Hola! ¿En qué puedo ayudarte hoy?",
    placeholder: "Escribe tu pregunta...",
    typing: "Escribiendo...",
    open: "Abrir asistente",
    close: "Cerrar chat",
  },
  en: {
    title: "Touch of Vintage Assistant",
    greeting: "Hi! How can I help you today?",
    placeholder: "Type your question...",
    typing: "Typing...",
    open: "Open assistant",
    close: "Close chat",
  },
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
  const ui = uiCopy[lang]

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open, loading])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: Date.now().toString(), role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.text,
      }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error("Error de red")

      const data = await res.json()
      const reply = data.text ?? data.message ?? "Lo siento, no pude responder."

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "-a", role: "assistant", text: reply },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "-err", role: "assistant", text: "Lo siento, ocurrió un error. Por favor intenta de nuevo. / Sorry, an error occurred. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? ui.close : ui.open}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--brand-orange)] text-white shadow-lg hover:bg-[var(--brand-orange-dark)] transition-all flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: "oklch(0.10 0 0)", maxHeight: "520px" }}
        >
          {/* Header */}
          <div className="relative bg-[var(--brand-orange)] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/40" />
            <Image
              src="/logo.jpg"
              alt="Touch of Vintage"
              width={32}
              height={32}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-white font-semibold text-sm leading-tight">{ui.title}</p>
              <p className="text-white/70 text-xs">Touch of Vintage</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
            {messages.length === 0 && (
              <div className="text-center mt-6">
                <p className="text-white/50 text-sm">{ui.greeting}</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--brand-orange)] text-white rounded-br-sm"
                      : "bg-white/10 text-white/90 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-[var(--brand-orange)] animate-spin" />
                  <span className="text-white/50 text-xs">{ui.typing}</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 flex items-end gap-2 flex-shrink-0">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={ui.placeholder}
              rows={1}
              className="flex-1 bg-white/10 text-white placeholder:text-white/30 rounded-xl px-3 py-2 text-sm resize-none outline-none focus:ring-1 focus:ring-[var(--brand-orange)] leading-relaxed"
              style={{ maxHeight: "80px" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-[var(--brand-orange)] text-white flex items-center justify-center hover:bg-[var(--brand-orange-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

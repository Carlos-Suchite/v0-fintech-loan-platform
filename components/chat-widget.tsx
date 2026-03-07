"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageCircle, X, Send, Gem, Loader2 } from "lucide-react"

function getMessageText(parts: { type: string; text?: string }[] | undefined): string {
  if (!parts) return ""
  return parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, input, setInput } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  // Auto-scroll to bottom
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const isLoading = status === "streaming" || status === "submitted"

  function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return
    setInput("")
    sendMessage({ text })
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
        aria-label={open ? "Cerrar chat" : "Abrir asistente"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--brand-orange)] text-white shadow-lg hover:bg-[var(--brand-orange-dark)] transition-all flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[520px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: "oklch(0.10 0 0)" }}
        >
          {/* Header */}
          <div className="relative bg-[var(--brand-orange)] px-4 py-3 flex items-center gap-3">
            {/* Orange corner brackets on header */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/40" />
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Gem className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Asistente Touch of Vintage</p>
              <p className="text-white/70 text-xs">Virtual Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0" style={{ maxHeight: "340px" }}>
            {messages.length === 0 && (
              <div className="text-center mt-6">
                <p className="text-white/50 text-sm">Hola! ¿En qué puedo ayudarte hoy?</p>
                <p className="text-white/30 text-xs mt-1">Hi! How can I help you today?</p>
              </div>
            )}
            {messages.map((msg) => {
              const text = getMessageText(msg.parts)
              if (!text) return null
              const isUser = msg.role === "user"
              return (
                <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      isUser
                        ? "bg-[var(--brand-orange)] text-white rounded-br-sm"
                        : "bg-white/10 text-white/90 rounded-bl-sm"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              )
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-[var(--brand-orange)] animate-spin" />
                  <span className="text-white/50 text-xs">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta... / Type your question..."
              rows={1}
              className="flex-1 bg-white/10 text-white placeholder:text-white/30 rounded-xl px-3 py-2 text-sm resize-none outline-none focus:ring-1 focus:ring-[var(--brand-orange)] leading-relaxed"
              style={{ maxHeight: "80px" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
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

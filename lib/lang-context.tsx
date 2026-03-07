"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Lang = "es" | "en"

interface LangContextValue {
  lang: Lang
  toggle: () => void
}

const LangContext = createContext<LangContextValue>({ lang: "es", toggle: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")
  const toggle = () => setLang((l) => (l === "es" ? "en" : "es"))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

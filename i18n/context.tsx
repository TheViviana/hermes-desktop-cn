import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { Locale, DesktopTranslations } from "./types"
import { en } from "./en"
import { zh } from "./zh"

const LOCALE_STORAGE_KEY = "hermes-desktop-locale"

const TRANSLATIONS: Record<Locale, DesktopTranslations> = { en, zh }

interface I18nContextValue {
  locale: Locale
  t: DesktopTranslations
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
})

function loadSavedLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved === "zh" || saved === "en") return saved
  } catch {}
  return "en"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadSavedLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {}
  }, [])

  const t = TRANSLATIONS[locale]

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '@/lib/translations';

const STORAGE_KEY = 'ynm_language';
const PROMPT_SEEN_KEY = 'ynm_language_prompt_seen';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  const changeLanguage = useCallback((lang) => {
    if (!translations[lang]) return;
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem(PROMPT_SEEN_KEY, '1');
    }
  }, []);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export { STORAGE_KEY, PROMPT_SEEN_KEY };

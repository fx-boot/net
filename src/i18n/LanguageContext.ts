import { createContext, useContext } from 'react';
import type { Dictionary, Language } from './dictionaries';
export const LanguageContext = createContext<{ language: Language; languageRevision: number; setLanguage: (language: Language) => void; t: (key: keyof Dictionary) => string } | null>(null);
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('LanguageProvider is required');
  return value;
}

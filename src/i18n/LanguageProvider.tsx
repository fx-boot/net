import { brandCopy } from './brand';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { animate, createScope, createTimeline } from 'animejs';
import { dictionaries, type Dictionary, type Language } from './dictionaries';
import { useDesktopPointer, useReducedMotion } from '../hooks/useMotionEnvironment';
const languages = ['zh', 'en', 'ko', 'ja'];
import { LanguageContext as Context } from './LanguageContext';
import { selectLanguage, type LanguageSelection } from './languageSelection';
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selection, updateSelection] = useState<LanguageSelection>(() => {
    let language: Language = languages.includes(document.documentElement.lang) ? document.documentElement.lang as Language : 'zh';
    try {
      let stored = localStorage.getItem('portfolio-language');
      // Migrate this origin's earlier brand-prefixed preference without retaining a brand in UI/data.
      if (!stored) for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        const candidate = key?.endsWith('-language') ? localStorage.getItem(key) : null;
        if (candidate && languages.includes(candidate)) { stored = candidate; break; }
      }
      if (languages.includes(stored || '')) language = stored as Language;
    } catch { /* Use the document default when storage is unavailable. */ }
    return { language, revision: 0 };
  });
  const { language, revision: languageRevision } = selection;
  const setLanguage = useCallback((next: Language) => updateSelection(current => selectLanguage(current, next)), []);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useDesktopPointer();
  const lastLanguage = useRef(language);
  const lastShutter = useRef(0);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${brandCopy[language].directorName} — ${dictionaries[language].directorRole}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', brandCopy[language].metaDescription);
    try { localStorage.setItem('portfolio-language', language); } catch { /* Preference remains usable for this session when storage is blocked. */ }
    const changed = lastLanguage.current !== language;
    lastLanguage.current = language;
    if (!changed || reduced || !desktop || !root.current) return;
    const scope = createScope({ root }).add(() => {
      animate(root.current!.querySelectorAll('h2, h3, .monologue, .project-info, .filter-tabs, .reel-link'), { opacity: [0.65, 1], duration: 260, ease: 'outQuad' });
      if (Date.now() - lastShutter.current > 350) {
        lastShutter.current = Date.now();
        createTimeline().add('.language-shutter', { opacity: [0, 0.18], duration: 55, ease: 'inQuad' }).add('.language-shutter', { opacity: 0, duration: 95, ease: 'outQuad' });
      }
    });
    return () => scope.revert();
  }, [language, reduced, desktop]);
  const value = useMemo(() => ({ language, languageRevision, setLanguage, t: (key: keyof Dictionary) => dictionaries[language][key] }), [language, languageRevision, setLanguage]);
  return <Context.Provider value={value}><div ref={root}>{children}<div className="language-shutter" aria-hidden="true" /></div></Context.Provider>;
}

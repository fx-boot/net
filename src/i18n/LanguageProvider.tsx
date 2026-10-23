import { brandCopy } from './brand';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { animate, createScope, createTimeline } from 'animejs';
import { dictionaries, type Dictionary, type Language } from './dictionaries';
import { useDesktopPointer, useReducedMotion } from '../hooks/useMotionEnvironment';
const languages = ['zh', 'en', 'ko', 'ja'];
import { LanguageContext as Context } from './LanguageContext';
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(() => { try { const stored = localStorage.getItem('lanchuan-language') || localStorage.getItem('mo-chen-language'); return languages.includes(stored || '') ? stored as Language : 'zh'; } catch { return 'zh'; } });
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useDesktopPointer();
  const lastLanguage = useRef(language);
  const lastShutter = useRef(0);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `LANCHUAN · ${brandCopy[language].directorName} — ${dictionaries[language].directorRole}`;
    try { localStorage.setItem('lanchuan-language', language); localStorage.removeItem('mo-chen-language'); } catch { /* Preference remains usable for this session when storage is blocked. */ }
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
  const value = useMemo(() => ({ language, setLanguage: updateLanguage, t: (key: keyof Dictionary) => dictionaries[language][key] }), [language]);
  return <Context.Provider value={value}><div ref={root}>{children}<div className="language-shutter" aria-hidden="true" /></div></Context.Provider>;
}

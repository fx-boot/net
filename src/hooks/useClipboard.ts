import { useLanguage } from '../i18n/LanguageContext';
import type { Dictionary } from '../i18n/dictionaries';
import { useEffect, useRef, useState } from 'react';
export function useClipboard(email: string) {
  const { t } = useLanguage();
  const [message, setMessage] = useState<keyof Dictionary | ''>('');
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const timer = useRef(0);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(timer.current); }; }, []);
  useEffect(() => { if (manual) { input.current?.focus(); input.current?.select(); } }, [manual]);
  const copy = async () => {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      if (!mounted.current) return;
      setCopied(true); setManual(false); setMessage('copied');
      timer.current = window.setTimeout(() => { setMessage(''); setCopied(false); }, 2000);
    } catch {
      if (!mounted.current) return;
      setManual(true); setCopied(false); setMessage('copyFailed');
      input.current?.focus(); input.current?.select();
    }
  };
  return { message: message ? t(message) : '', copied, manual, input, copy };
}

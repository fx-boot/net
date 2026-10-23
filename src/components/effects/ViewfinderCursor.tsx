import { useEffect, useRef, type RefObject } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useDesktopPointer, usePageVisible, useReducedMotion } from '../../hooks/useMotionEnvironment';
export function ViewfinderCursor({ containerRef, active }: { containerRef: RefObject<HTMLDivElement | null>; active: boolean }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const fine = useDesktopPointer();
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !fine || reduced || !visible) return;
    const move = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      if (label.current) label.current.style.transform = `translate(${event.clientX - bounds.left + 20}px, ${event.clientY - bounds.top + 20}px)`;
    };
    root.addEventListener('pointermove', move, { passive: true });
    return () => root.removeEventListener('pointermove', move);
  }, [containerRef, fine, reduced, visible]);
  if (!fine || reduced || !visible) return null;
  return <span ref={label} className={`viewfinder-label ${active ? 'is-active' : ''}`} aria-hidden="true">{t('viewProject')}</span>;
}

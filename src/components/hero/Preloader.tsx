import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { createScope, createTimeline } from 'animejs';
import { useReducedMotion } from '../../hooks/useMotionEnvironment';

export function Preloader({ onComplete, onReveal }: { onComplete: () => void; onReveal: () => void }) {
  const { t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { onComplete(); return; }
    const scope = createScope({ root }).add(() => {
      createTimeline({ onComplete })
        .add('.clapper', { y: [-28, 0], opacity: [0, 1], duration: 450, ease: 'outCubic' }, 0)
        .add('.exposure-line', { scaleX: [0, 1], duration: 500, ease: 'inOutQuad' }, 450)
        .add('.clapper', { opacity: 0, duration: 160 }, 850)
        .add('.curtain-top', { y: '-100%', duration: 550, ease: 'inOutQuart', onBegin: onReveal }, 950)
        .add('.curtain-bottom', { y: '100%', duration: 550, ease: 'inOutQuart' }, 950);
    });
    return () => scope.revert();
  }, [reduced, onComplete, onReveal]);
  return <div ref={root} className="preloader" aria-hidden="true"><div className="curtain curtain-top" /><div className="curtain curtain-bottom" /><div className="clapper"><div className="clapper-stripe" /><span>Azuma Hiroshi</span><small>{t('intro')}</small><div className="exposure-line" /></div></div>;
}

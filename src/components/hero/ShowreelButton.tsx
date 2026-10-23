import { useLanguage } from '../../i18n/LanguageContext';
import { timecode } from '../../lib/reelTimeline';
import { useEffect, useRef } from 'react';
import { subscribeCinemaFrame } from '../../lib/cinemaFrames';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';
import { MorphIcon } from '../effects/MorphIcon';
export function ShowreelButton({ onClick, duration, frameRate }: { onClick: () => void; duration: number; frameRate: number }) {
 const { t } = useLanguage();
 const root = useRef<HTMLButtonElement>(null), counter = useRef<HTMLSpanElement>(null);
 const desktop = useDesktopPointer(), reduced = useReducedMotion();
 useEffect(() => {
  const node = root.current, output = counter.current;
  if (!node || !output || !desktop || reduced) return;
  let visible = false, previous = -1;
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); observer.observe(node);
  const unsubscribe = subscribeCinemaFrame(({time}) => {
   if (!visible) return;
   const tick = Math.floor(time*30/1000); if (tick === previous) return;
   previous = tick; output.textContent = String(tick%30).padStart(2,'0');
  });
  return () => { observer.disconnect(); unsubscribe(); output.textContent = '00'; };
 }, [desktop, reduced]);
 const code = timecode(duration, frameRate);
 return <button ref={root} data-magnetic type="button" className="reel-link" aria-label={`${t('watchReel')} [ TC ${code} ]`} onClick={onClick}><span className="magnetic-ink"><MorphIcon kind="play" size={15}/>{t('watchReel')}</span><span className="reel-length" aria-hidden="true">[ TC {code.slice(0,-2)}<span ref={counter}>00</span> ]</span></button>;
}

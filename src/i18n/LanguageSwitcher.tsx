import { languageNames, type Language } from './dictionaries';
import { useLanguage } from './LanguageContext';
import { useLayoutEffect, useRef } from 'react';
import { animate, spring, type JSAnimation } from 'animejs';
import { useDesktopPointer, useReducedMotion } from '../hooks/useMotionEnvironment';
import { cinemaAudio } from '../lib/cinemaAudio';
export function LanguageSwitcher() {
 const { language, setLanguage, t } = useLanguage();
 const root = useRef<HTMLDivElement>(null);
 const underline = useRef<HTMLSpanElement>(null);
 const initialized = useRef(false);
 const reduced = useReducedMotion();
 const desktop = useDesktopPointer();
 useLayoutEffect(() => {
  const group = root.current, line = underline.current;
  if (!group || !line) return;
  let animation: JSAnimation | undefined;
  const update = () => {
   const button = group.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
   if (!button || !button.getClientRects().length) return;
   const target = button.getBoundingClientRect(), bounds = group.getBoundingClientRect();
   const x = target.left - bounds.left;
   animation?.pause();
   if (!initialized.current || reduced || !desktop) {
    line.style.transform = `translateX(${x}px) scaleX(${target.width})`;
   } else animation = animate(line, { x, scaleX: target.width, ease: spring({ mass: 1, stiffness: 240, damping: 25 }) });
   initialized.current = true;
  };
  const resize = new ResizeObserver(update);
  resize.observe(group);
  update();
  return () => { animation?.pause(); resize.disconnect(); };
 }, [language, reduced, desktop]);
 return <div ref={root} className="language-picker" role="group" aria-label={t('language')}>{(['zh','en','ko','ja'] as Language[]).map((code,index)=><span key={code}>{index>0&&<span className="language-divider" aria-hidden="true">/</span>}<button data-magnetic type="button" lang={code} aria-label={languageNames[code]} aria-pressed={language===code} onClick={()=>{ if (code !== language) cinemaAudio.playMechanicalClick(); setLanguage(code); }}><span className="magnetic-ink">{code.toUpperCase()}</span></button></span>)}<span ref={underline} className="language-underline" aria-hidden="true" /></div>;
}

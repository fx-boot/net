import { useEffect, useRef } from 'react';
import { subscribeCinemaFrame } from '../../lib/cinemaFrames';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';
// React Bits DecryptedText-inspired bounded reveal; accessible text stays stable.
export function ScrambleLabel({ text, trigger = false }: { text: string; trigger?: boolean }) {
 const root = useRef<HTMLSpanElement>(null), ink = useRef<HTMLSpanElement>(null);
 const desktop = useDesktopPointer(), reduced = useReducedMotion();
 useEffect(() => {
  const node = root.current, output = ink.current;
  if (!node || !output || !desktop || reduced || !/^[\x20-\x7e]+$/.test(text)) return;
  let start = -1, lastStep = -1, active = false;
  const charset = '0135789/<>_';
  const unsubscribe = subscribeCinemaFrame(({ time }) => {
   if (!active) return;
   if (start < 0) start = time;
   const elapsed = time - start, step = Math.floor(elapsed/38);
   if (elapsed >= 340) { output.textContent = text; active = false; return; }
   if (step === lastStep) return;
   lastStep = step;
   const resolved = Math.floor(elapsed / 340 * text.length);
   output.textContent = [...text].map((char, i) => i < resolved || char === ' ' ? char : charset[(i*7+step*3)%charset.length]).join('');
  });
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { active = true; observer.disconnect(); } });
  observer.observe(node);
  return () => { observer.disconnect(); unsubscribe(); output.textContent = text; };
 }, [text, trigger, desktop, reduced]);
 return <span className="scramble-label" ref={root}><span className="scramble-measure" aria-hidden="true">{text}</span><span className="scramble-ink" ref={ink} aria-hidden="true">{text}</span><span className="sr-only">{text}</span></span>;
}

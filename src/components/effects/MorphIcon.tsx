import { useEffect, useRef } from 'react';
import { animate, svg, type JSAnimation } from 'animejs';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';
const paths = {
 play: [['M7 4L21 12L7 20Z'], ['M5 3L23 12L5 21Z']],
 close: [['M6 6L18 18','M18 6L6 18'], ['M4 4L20 20','M20 4L4 20']],
 laurel: [['M7 21C1 16 1 7 7 3','M17 21C23 16 23 7 17 3'], ['M8 22C0 17 0 6 8 2','M16 22C24 17 24 6 16 2']],
};
export function MorphIcon({ kind, size = 20 }: { kind: keyof typeof paths; size?: number }) {
 const root = useRef<SVGSVGElement>(null), desktop = useDesktopPointer(), reduced = useReducedMotion();
 useEffect(() => {
  const node = root.current, control = node?.closest('button, .award-row');
  if (!node || !control || !desktop || reduced) return;
  const inks = node.querySelectorAll<SVGPathElement>('.morph-ink');
  const destinations = node.querySelectorAll<SVGPathElement>('.morph-destination');
  let animations: JSAnimation[] = [];
  const update = (active: boolean) => {
   animations.forEach(animation => animation.pause());
   animations = Array.from(inks, (ink, index) => {
    const destination = destinations[index];
    destination.setAttribute('d', paths[kind][active ? 1 : 0][index]);
    return animate(ink, { d: svg.morphTo(destination, .2), duration: 420, ease: 'outCubic' });
   });
  };
  const enter = () => update(true), leave = () => update(false);
  control.addEventListener('pointerenter', enter); control.addEventListener('pointerleave', leave);
  control.addEventListener('focusin', enter); control.addEventListener('focusout', leave);
  if (control.matches(':hover') || control.contains(document.activeElement)) update(true);
  return () => { animations.forEach(animation => animation.revert()); control.removeEventListener('pointerenter', enter); control.removeEventListener('pointerleave', leave); control.removeEventListener('focusin', enter); control.removeEventListener('focusout', leave); inks.forEach((ink,index)=>ink.setAttribute('d', paths[kind][0][index])); };
 }, [kind, desktop, reduced]);
 return <svg ref={root} className={`morph-icon morph-${kind}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">{paths[kind][0].map((d,index)=><path key={index} className="morph-ink" d={d}/>)}{paths[kind][1].map((d,index)=><path key={index} className="morph-destination" d={d} opacity="0"/>)}{kind === 'laurel' && <path d="M4 8L7 10M3 13L6 15M5 18L8 19M20 8L17 10M21 13L18 15M19 18L16 19"/>}</svg>;
}

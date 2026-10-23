import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useDesktopPointer, useReducedMotion } from '../hooks/useMotionEnvironment';
import { useSpatialRig } from '../hooks/useSpatialRig';
import { renderCinemaFrame } from '../lib/cinemaFrames';
import { registerFrameDriver, startFrameDiagnostics } from '../lib/frameDiagnostics';
import { cinemaAudio } from '../lib/cinemaAudio';
import { previewPlayback } from '../lib/previewPlayback';

export function Providers({ children, modalOpen }: { children: ReactNode; modalOpen: boolean }) {
  const reduced = useReducedMotion();
  const desktop = useDesktopPointer();
  useSpatialRig(modalOpen);
  useEffect(()=>cinemaAudio.mount(),[]);
  useEffect(()=>{cinemaAudio.setBlocked(modalOpen);},[modalOpen]);
  useLayoutEffect(()=>{previewPlayback.setBlocked(modalOpen);return()=>previewPlayback.setBlocked(false);},[modalOpen]);
  const lenis = useRef<Lenis | null>(null);
  useEffect(() => {
    const instance = !reduced && desktop ? new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      // One interpolation mode: duration/easing would override lerp in Lenis.
    }) : null;
    lenis.current = instance;
    const unregister = registerFrameDriver();
    let frame = 0;
    const tick = (time: number) => { instance?.raf(time); renderCinemaFrame(time); frame = requestAnimationFrame(tick); };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); unregister(); document.removeEventListener('visibilitychange', visibility); document.documentElement.classList.remove('is-scrolling'); instance?.destroy(); lenis.current = null; };
  }, [reduced, desktop]);
  useEffect(() => { if (modalOpen) lenis.current?.stop(); else lenis.current?.start(); }, [modalOpen, reduced, desktop]);
  useEffect(startFrameDiagnostics, []);
  useEffect(() => {
    const update = () => document.documentElement.classList.toggle('page-hidden', document.hidden);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { document.removeEventListener('visibilitychange', update); document.documentElement.classList.remove('page-hidden'); };
  }, []);
  return children;
}

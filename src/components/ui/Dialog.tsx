import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { animate, type JSAnimation } from 'animejs';
import type { ProjectOrigin } from '../../types/portfolio';
import { useReducedMotion } from '../../hooks/useMotionEnvironment';
import { useLanguage } from '../../i18n/LanguageContext';
import { MorphIcon } from '../effects/MorphIcon';

export function Dialog({ title, onClose, children, origin, onPlaybackReady }: { title: string; onClose: () => void; children: ReactNode; origin?: ProjectOrigin; onPlaybackReady?: (ready: boolean) => void }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const closeRef = useRef(onClose);
  const readyRef = useRef(onPlaybackReady);
  const requestClose = useRef<() => void>(() => {});
  useLayoutEffect(() => { closeRef.current = onClose; readyRef.current = onPlaybackReady; }, [onClose, onPlaybackReady]);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('.dialog-close')?.focus();
    let animation: JSAnimation | undefined;
    let atmosphere: JSAnimation | undefined;
    let contents: JSAnimation | undefined;
    let overlay: HTMLImageElement | undefined;
    let closing = false;
    let alive = true;
    const frame = dialog.querySelector<HTMLElement>('.player-frame');
    const backdrop = dialog.querySelector<HTMLElement>('.dialog-atmosphere')!;
    const canMorph = Boolean(origin && !reduced && frame && origin.rect.width > 0 && origin.rect.height > 0);
    if (!reduced) {
      atmosphere = animate(backdrop, { opacity: [0, 1], duration: canMorph ? 700 : 260, ease: 'outCubic' });
      contents = animate(dialog.querySelectorAll('.dialog-top, .dialog-content'), { opacity: [0, 1], delay: canMorph ? 320 : 0, duration: canMorph ? 380 : 220, ease: 'outCubic' });
    }
    const clearOverlay = () => { overlay?.remove(); overlay = undefined; dialog.classList.remove('poster-transitioning'); };
    const morph = (from: ProjectOrigin['rect'], to: ProjectOrigin['rect'], duration: number, done: () => void) => {
      clearOverlay();
      overlay = document.createElement('img');
      overlay.src = origin!.poster;
      overlay.alt = '';
      overlay.className = 'project-poster-transition';
      overlay.setAttribute('aria-hidden', 'true');
      Object.assign(overlay.style, { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px`, transformOrigin: '0 0' });
      dialog.append(overlay);
      dialog.classList.add('poster-transitioning');
      overlay.onerror = () => { animation?.pause(); clearOverlay(); if (alive) done(); };
      animation = animate(overlay, { x: [from.left-to.left, 0], y: [from.top-to.top, 0], scaleX: [from.width/to.width, 1], scaleY: [from.height/to.height, 1], duration, ease: 'inOutCubic', onComplete: () => { clearOverlay(); if (alive) done(); } });
    };
    if (canMorph) morph(origin!.rect, frame!.getBoundingClientRect(), 700, () => readyRef.current?.(true));
    else readyRef.current?.(true);
    requestClose.current = () => {
      if (closing) return;
      closing = true;
      animation?.pause();
      atmosphere?.pause();
      contents?.pause();
      clearOverlay();
      readyRef.current?.(false);
      dialog.querySelectorAll('video').forEach(video => video.pause());
      // Keyboard ESC closes immediately; pointer close returns the same poster to its card.
      const target = origin?.element.isConnected ? origin.element.getBoundingClientRect() : null;
      if (canMorph && target && target.bottom > 0 && target.top < innerHeight) {
        atmosphere = animate(backdrop, { opacity: 0, duration: 520, ease: 'inOutCubic' });
        contents = animate(dialog.querySelectorAll('.dialog-top, .dialog-content'), { opacity: 0, duration: 200, ease: 'outQuad' });
        morph(frame!.getBoundingClientRect(), target, 520, () => closeRef.current());
      } else closeRef.current();
    };
    const cancel = (event: Event) => { event.preventDefault(); animation?.pause(); clearOverlay(); closeRef.current(); };
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, video[controls], [tabindex="0"]')).filter(node => node.getClientRects().length > 0);
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    dialog.addEventListener('cancel', cancel);
    dialog.addEventListener('keydown', trap);
    return () => {
      alive = false;
      animation?.pause();
      atmosphere?.revert();
      contents?.revert();
      clearOverlay();
      dialog.querySelectorAll('video').forEach(video => { video.pause(); video.removeAttribute('src'); video.load(); });
      dialog.removeEventListener('cancel', cancel);
      dialog.removeEventListener('keydown', trap);
      dialog.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [origin, reduced]);
  return <dialog ref={ref} className="film-dialog" aria-label={title} data-lenis-prevent>
    <div className="dialog-atmosphere" aria-hidden="true" />
    <div className="dialog-top"><span>{title}</span><button autoFocus type="button" data-magnetic className="dialog-close" onClick={event => { if (event.detail === 0) closeRef.current(); else requestClose.current(); }} aria-label={t('closePlayer')}><span>{t('close')}</span><MorphIcon kind="close" /></button></div>
    <div className="dialog-content">{children}</div>
  </dialog>;
}

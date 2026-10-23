import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent as ReactPointerEvent } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { breakdownCopy } from '../../i18n/breakdown';
import { recordGeometryRead, subscribeCinemaMeasure } from '../../lib/cinemaFrames';
import '../../styles/breakdown.css';

// The source is an existing, registered licensed frame. Both passes share exactly
// the same composition; the first grade is a CSS simulation, not a camera Log file.
const sourceFrame = '/media/stills/refraction-2.jpg';
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function CineBreakdown() {
  const { language } = useLanguage();
  const copy = breakdownCopy[language];
  const instanceId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const percentageRef = useRef<HTMLOutputElement>(null);
  const interaction = useRef({ pointerX: 0, pointerPending: false, split: 50, dragId: -1, dirty: true });
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const range = rangeRef.current;
    const percentage = percentageRef.current;
    if (!viewport || !range) return;
    let bounds: DOMRect | undefined;
    let visible = false;
    let lastScroll = Number.NaN;
    let lastWidth = 0;
    let lastHeight = 0;
    let lastSplit = Number.NaN;
    const invalidate = () => { interaction.current.dirty = true; };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      invalidate();
    }, { rootMargin: '80px' });
    observer.observe(viewport);
    const resizeObserver = new ResizeObserver(invalidate);
    resizeObserver.observe(viewport);
    const cancelDrag = () => {
      const state = interaction.current;
      if (state.dragId !== -1 && viewport.hasPointerCapture(state.dragId)) viewport.releasePointerCapture(state.dragId);
      state.dragId = -1;
      state.pointerPending = false;
      viewport.removeAttribute('data-dragging');
    };
    const hidden = () => { if (document.hidden) cancelDrag(); };
    document.addEventListener('visibilitychange', hidden);
    window.addEventListener('blur', cancelDrag);
    const unsubscribe = subscribeCinemaMeasure(frame => {
      if (!visible) return;
      const state = interaction.current;
      const geometryChanged = state.dirty || frame.scrollY !== lastScroll || frame.width !== lastWidth || frame.height !== lastHeight;
      lastScroll = frame.scrollY;
      lastWidth = frame.width;
      lastHeight = frame.height;
      if (geometryChanged) bounds = undefined;
      if (state.pointerPending && (!bounds || geometryChanged)) {
        recordGeometryRead();
        bounds = viewport.getBoundingClientRect();
        state.dirty = false;
      }
      if (state.pointerPending && bounds?.width) {
        state.split = clamp((state.pointerX - bounds.left) / bounds.width * 100);
        state.pointerPending = false;
      }
      const next = state.split;
      if (next === lastSplit) return;
      lastSplit = next;
      return () => {
        viewport.style.setProperty('--breakdown-split', `${next.toFixed(3)}%`);
        range.value = next.toFixed(1);
        range.setAttribute('aria-valuetext', `${Math.round(next)}% ${copy.rawRegion}; ${Math.round(100 - next)}% ${copy.finalRegion}`);
        if (percentage) percentage.textContent = `${Math.round(next).toString().padStart(2, '0')} / ${Math.round(100 - next).toString().padStart(2, '0')}`;
      };
    });
    return () => {
      unsubscribe();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', hidden);
      window.removeEventListener('blur', cancelDrag);
      cancelDrag();
    };
  }, [copy]);

  const movePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = interaction.current;
    if (event.pointerType !== 'mouse' && state.dragId !== event.pointerId) return;
    state.pointerX = event.clientX;
    state.pointerPending = true;
  };
  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element) || !target.closest('.breakdown-drag-target')) return;
    interaction.current.dragId = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.setAttribute('data-dragging', 'true');
    movePointer(event);
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (interaction.current.dragId !== event.pointerId) return;
    if(event.type!=='pointercancel') {
      interaction.current.pointerX=event.clientX;
      interaction.current.pointerPending=true;
    }
    interaction.current.dragId = -1;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.removeAttribute('data-dragging');
  };
  const changeRange = (event: ChangeEvent<HTMLInputElement>) => {
    interaction.current.pointerPending = false;
    interaction.current.split = clamp(Number(event.currentTarget.value));
  };

  return <section id="breakdown" className="cine-breakdown" aria-labelledby={`${instanceId}-heading`}>
    <div className="breakdown-heading">
      <h3 id={`${instanceId}-heading`}>{copy.title}</h3>
      <span className="breakdown-study"><span lang="en">COLOR STUDY</span>{language !== 'en' && <span>{copy.descriptor}</span>}</span>
    </div>
    <p id={`${instanceId}-description`} className="sr-only">{copy.description}</p>
    <div className="breakdown-viewport" ref={viewportRef} onPointerMove={movePointer} onPointerDown={startDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
      <img className="breakdown-final" src={sourceFrame} alt={copy.imageAlt} loading="lazy" decoding="async" onError={() => setUnavailable(true)} />
      <img className="breakdown-raw" src={sourceFrame} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="breakdown-pass-labels" aria-hidden="true"><span>PASS 01: RAW UNGRADED</span><span>PASS 02: LANCHUAN VFX FINAL</span></div>
      <span className="breakdown-film-code" aria-hidden="true">LC-COL // 2.39:1</span>
      <span className="breakdown-corners" aria-hidden="true"><i/><i/><i/><i/></span>
      <span className="breakdown-divider" aria-hidden="true"><i/><span><svg width="28" height="12" viewBox="0 0 28 12" fill="none"><path d="M9 2 5 6l4 4M19 2l4 4-4 4M14 1v10" stroke="currentColor" strokeWidth="1"/></svg></span></span>
      <span className="breakdown-drag-target" aria-hidden="true"/>
      <input ref={rangeRef} className="breakdown-range" type="range" min="0" max="100" step="1" defaultValue="50" aria-label={copy.controlLabel} aria-describedby={`${instanceId}-description ${instanceId}-instruction`} onChange={changeRange}/>
      {unavailable && <p className="breakdown-unavailable" role="status">{copy.unavailable}</p>}
    </div>
    <div className="breakdown-caption"><p id={`${instanceId}-instruction`}>{copy.instruction}</p><output ref={percentageRef} className="breakdown-percentage" aria-hidden="true">50 / 50</output></div>
  </section>;
}

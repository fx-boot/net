import { useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react';
import type { FilmScrubData } from '../types/portfolio';
import { recordGeometryRead, subscribeCinemaMeasure } from '../lib/cinemaFrames';
import { observeScrollScene } from '../lib/sceneObservers';
import { usePageVisible } from './useMotionEnvironment';
import { filmTimecode } from '../lib/filmTimecode';
import { cinemaAudio } from '../lib/cinemaAudio';

interface Options {
  trigger: RefObject<HTMLButtonElement | null>;
  image: RefObject<HTMLSpanElement | null>;
  data: FilmScrubData | undefined;
  enabled: boolean;
  active: boolean;
}

export function useFilmScrub({ trigger, image, data, enabled, active }: Options) {
  const visible = usePageVisible();
  const [warmed, setWarmed] = useState(false);
  const layers = useRef<Array<HTMLImageElement | null>>([]);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const point = useRef<{ x: number; y: number } | null>(null);
  const keyboardProgress = useRef<number | null>(null);
  const loaded = useRef(new Set<string>());
  const pointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' || !enabled) return;
    if (!warmed) setWarmed(true);
    point.current = { x: event.clientX, y: event.clientY };
    keyboardProgress.current = null;
  };
  const pointerLeave = () => { point.current = null; };
  const input = (value: number) => { keyboardProgress.current = Math.max(0, Math.min(1, value)); };
  const blur = () => { keyboardProgress.current = null; };

  const focus = () => { if (enabled && !warmed) setWarmed(true); };

  useEffect(() => {
    const node = trigger.current, viewport = image.current;
    if (!node || !viewport || !enabled || !visible || !data || data.frames.length < 2) return;
    const imageLayers = layers.current, codeNode = timecodeRef.current, rangeNode = rangeRef.current;
    let inView = false, dirty = true;
    let rect: DOMRect | undefined;
    let previousScroll = NaN, previousWidth = 0, previousHeight = 0;
    let selected = -2, displayedFrame = -1;
    const reset = () => {
      imageLayers.forEach(layer => { if (layer) { layer.style.opacity = '0'; layer.style.removeProperty('will-change'); } });
      node.removeAttribute('data-scrubbing');
      viewport.removeAttribute('data-scrubbing');
      if (codeNode) codeNode.textContent = `[ TC ${filmTimecode(0, data.frameRate)} ]`;
      if (rangeNode) {rangeNode.value = '0';rangeNode.setAttribute('aria-valuetext',filmTimecode(0,data.frameRate));}
      selected = -2; displayedFrame = -1;
    };
    const unobserve = observeScrollScene(node, {
      visible: value => { inView = value; dirty = true; },
      resized: () => { dirty = true; },
    });
    const unsubscribe = subscribeCinemaMeasure(frame => {
      const scanning = active && inView && (point.current !== null || keyboardProgress.current !== null);
      if (scanning && (dirty || frame.scrollY !== previousScroll || frame.width !== previousWidth || frame.height !== previousHeight)) {
        // Read only the static trigger. The transformed visual never supplies hit geometry.
        recordGeometryRead(); rect = node.getBoundingClientRect();
        dirty = false; previousScroll = frame.scrollY; previousWidth = frame.width; previousHeight = frame.height;
      }
      const pointer = point.current;
      const overImage = !!(pointer && rect && pointer.y >= rect.top && pointer.y <= rect.top + rect.width / (frame.width > 700 ? 2.39 : 16 / 9));
      const progress = scanning && rect && (keyboardProgress.current !== null || overImage)
        ? keyboardProgress.current ?? Math.max(0, Math.min(1, (pointer!.x - rect.left) / rect.width))
        : -1;
      const index = progress < 0 ? -1 : Math.min(data.frames.length - 1, Math.floor(progress * data.frames.length));
      const shown = index>=0&&loaded.current.has(data.frames[index].src) ? index : -1;
      const sourceTime = progress < 0 ? 0 : progress * Math.max(0, data.durationSeconds - 1 / data.frameRate);
      const frameNumber = Math.floor(sourceTime * data.frameRate);
      if (shown === selected && frameNumber === displayedFrame) return;
      return () => {
        if (shown !== selected) {
          if (shown >= 0 && selected >= 0) cinemaAudio.playMechanicalClick();
          imageLayers.forEach((layer, layerIndex) => {
            if (!layer) return;
            layer.style.opacity = layerIndex === shown ? '1' : '0';
            if (shown >= 0) layer.style.willChange = 'opacity'; else layer.style.removeProperty('will-change');
          });
          if (shown >= 0) { node.dataset.scrubbing = 'true'; viewport.dataset.scrubbing = 'true'; }
          else { node.removeAttribute('data-scrubbing'); viewport.removeAttribute('data-scrubbing'); }
          selected = shown;
        }
        if (frameNumber !== displayedFrame) {
          if (codeNode) codeNode.textContent = `[ TC ${filmTimecode(sourceTime, data.frameRate)} ]`;
          if (rangeNode) {
            rangeNode.setAttribute('aria-valuetext', filmTimecode(sourceTime, data.frameRate));
            if (document.activeElement !== rangeNode) rangeNode.value = String(Math.max(0, progress) * 1000);
          }
          displayedFrame = frameNumber;
        }
      };
    });
    return () => { unsubscribe(); unobserve(); reset(); };
  }, [trigger, image, data, enabled, active, visible]);

  return { warmed, layers, timecodeRef, rangeRef, pointerMove, pointerLeave, input, blur, focus, loaded };
}

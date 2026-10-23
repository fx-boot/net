import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { previewPlayback } from '../lib/previewPlayback';
import { useInView } from './useInView';
import { usePageVisible, useReducedMotion } from './useMotionEnvironment';

export function usePreviewPlayback(ref: RefObject<HTMLVideoElement | null>, src: string, enabled: boolean, priority: number, allowReduced = false, retainFrame = false) {
  const visible = usePageVisible(), inView = useInView(ref), reduced = useReducedMotion();
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const lease = useRef<ReturnType<typeof previewPlayback.register> | null>(null);
  useLayoutEffect(() => {
    const video = ref.current;
    if (!video) return;
    let alive = true, generation = 0;
    let unload: ReturnType<typeof setTimeout> | undefined;
    const clearSource = () => { video.removeAttribute('src'); video.load(); };
    const entry = previewPlayback.register({ priority,
      start: () => {
        const attempt = ++generation;
        clearTimeout(unload);
        video.muted = true; video.defaultMuted = true; video.src = src;
        video.dataset.previewState = 'loading';
        void video.play().then(() => {
          if (!alive || attempt !== generation) return;
          if (!entry.ownsPlayback()) video.pause();
        }).catch(error => {
          if (alive && attempt === generation && entry.ownsPlayback() && error?.name !== 'AbortError') {
            video.dataset.previewState = 'unavailable'; setFailedSource(src);
          }
        });
      },
      stop: () => {
        generation++;
        video.pause(); video.dataset.previewState = 'paused';
        if (retainFrame) unload = setTimeout(clearSource, 380);
        else clearSource();
      },
    });
    lease.current = entry;
    return () => {
      alive = false; generation++; entry.release(); clearTimeout(unload); video.pause(); clearSource();
      if (lease.current === entry) lease.current = null;
    };
  }, [ref, src, priority, retainFrame]);
  useLayoutEffect(() => {
    const entry = lease.current;
    entry?.setEligible(enabled && visible && inView && (!reduced || allowReduced) && failedSource !== src);
    return () => entry?.setEligible(false);
  }, [enabled, visible, inView, reduced, allowReduced, failedSource, src, priority]);
  return { failed: failedSource === src, onError: () => setFailedSource(src), retry: () => setFailedSource(null) };
}

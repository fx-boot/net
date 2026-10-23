import { useEffect, useRef, useState } from 'react';
import type { MediaAsset } from '../../types/portfolio';
import { usePreviewPlayback } from '../../hooks/usePreviewPlayback';
import { useReducedMotion } from '../../hooks/useMotionEnvironment';
import '../../styles/preview.css';

interface PreviewProps { media: MediaAsset; enabled?: boolean; priority?: number; onTime?: (time: number) => void; exiting?: boolean }
export function PreviewVideo({ media, enabled = true, priority = 20, onTime, exiting = false }: PreviewProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const playback = usePreviewPlayback(ref, media.src, enabled && !exiting, priority, false, !reduced);
  return <video ref={ref} data-preview="work" className={`preview-video ${ready && !playback.failed ? 'is-ready' : ''} ${exiting?'is-exiting':''}`} muted loop playsInline preload="none" aria-hidden="true" onPlaying={event => {event.currentTarget.dataset.previewState='playing';setReady(true);}} onEmptied={() => setReady(false)} onTimeUpdate={event=>onTime?.(event.currentTarget.currentTime)} onError={playback.onError}/>;
}

/** Retain only the paused outgoing frame while a CSS opacity transition ends. */
export function PreviewPresence({ visible, ...props }: PreviewProps & { visible: boolean }) {
  const [retained, setRetained] = useState(visible);
  const reduced = useReducedMotion();
  // Adjust presence before commit; no geometry reads or new animation driver.
  if (visible && !retained) setRetained(true);
  useEffect(() => {
    if (visible || !retained) return;
    const timer = setTimeout(() => setRetained(false), reduced ? 0 : 350);
    return () => clearTimeout(timer);
  }, [visible, retained, reduced]);
  return retained && !(reduced && !visible) ? <PreviewVideo key={`${props.media.src}:${props.enabled!==false}`} {...props} exiting={!visible}/> : null;
}

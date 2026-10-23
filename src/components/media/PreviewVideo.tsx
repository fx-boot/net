import { useEffect, useRef, useState } from 'react';
import type { MediaAsset } from '../../types/portfolio';
import { usePageVisible, useReducedMotion } from '../../hooks/useMotionEnvironment';
import { useInView } from '../../hooks/useInView';

export function PreviewVideo({ media }: { media: MediaAsset }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const visible = usePageVisible();
  const reduced = useReducedMotion();
  const inView = useInView(ref);
  useEffect(() => {
    const video = ref.current;
    if (video) video.src = media.src;
    return () => { video?.pause(); video?.removeAttribute('src'); video?.load(); };
  }, [media.src]);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let alive = true;
    if (visible && inView && !reduced && !failed) void video.play().catch(() => { if (alive) setFailed(true); });
    else video.pause();
    return () => { alive = false; video.pause(); };
  }, [visible, reduced, inView, failed]);
  return <video ref={ref} className={`preview-video ${ready && !failed ? 'is-ready' : ''}`} src={media.src} muted loop playsInline preload="auto" aria-hidden="true" onCanPlay={() => setReady(true)} onError={() => setFailed(true)} />;
}

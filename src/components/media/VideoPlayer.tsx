import { useEffect, useRef, useState } from 'react';
import { Maximize } from 'lucide-react';
import type { MediaAsset } from '../../types/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Dictionary } from '../../i18n/dictionaries';
import { VideoLoader } from './VideoLoader';
import { MediaImage } from '../ui/MediaImage';
import { MorphIcon } from '../effects/MorphIcon';

export function VideoPlayer({ media, title, playbackEnabled = true }: { media: MediaAsset; title: string; playbackEnabled?: boolean }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [notice, setNotice] = useState<keyof Dictionary | ''>('');
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // StrictMode replays effects after cleanup without recreating the DOM node.
    video.src = media.src;
    let alive = true;
    let resume = false;
    const play = () => { void video.play().catch(() => { if (alive) setNeedsPlay(true); }); };
    if (!document.hidden && playbackEnabled) play();
    const visibility = () => {
      if (document.hidden) { resume = !video.paused; video.pause(); }
      else if (resume && playbackEnabled) { resume = false; play(); }
    };
    document.addEventListener('visibilitychange', visibility);
    return () => { alive = false; document.removeEventListener('visibilitychange', visibility); video.pause(); video.removeAttribute('src'); video.load(); };
  }, [media.src, playbackEnabled]);
  const play = async () => { try { await ref.current?.play(); setNeedsPlay(false); setNotice(''); } catch { setNotice('playbackDenied'); } };
  const fullscreen = async () => {
    try { if (!ref.current?.requestFullscreen) throw new Error('unsupported'); await ref.current.requestFullscreen(); }
    catch { setNotice('fullscreenDenied'); }
  };
  return <div className="player-block">
    <div className="player-frame">
      <MediaImage className="player-poster" src={media.poster || '/media/fallback.svg'} alt="" />
      <video className={failed ? 'media-unavailable' : ''} ref={ref} src={media.src} poster={media.poster} controls playsInline preload="metadata" aria-label={title} onLoadedData={() => setLoading(false)} onCanPlay={() => setLoading(false)} onWaiting={() => setLoading(true)} onPlaying={() => { setLoading(false); setNeedsPlay(false); }} onPause={() => setLoading(false)} onError={() => { setLoading(false); setFailed(true); }} />
      {loading && !failed && !needsPlay && <VideoLoader />}
      {needsPlay && !failed && <button className="player-play" onClick={() => void play()}><MorphIcon kind="play" size={22} />{t('clickPlay')}</button>}
      {failed && <div className="media-error"><p>{t('filmFailed')}</p><a href={media.remoteSrc} target="_blank" rel="noreferrer">{t('sourceVideo')}</a></div>}
    </div>
    <div className="player-tools"><span>{title}</span><button onClick={() => void fullscreen()}><Maximize size={16} />{t('fullscreen')}</button></div>
    <p className="player-notice" role="status">{notice ? t(notice) : ''}</p>
  </div>;
}

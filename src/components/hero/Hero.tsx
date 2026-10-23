import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { ShowreelButton } from './ShowreelButton';
import { showreelsByLanguage, reelConfig } from '../../data/mockData';
import { validDuration } from '../../lib/reelTimeline';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePageVisible, useReducedMotion } from '../../hooks/useMotionEnvironment';
import { useInView } from '../../hooks/useInView';
import { useCinemaMotion } from '../../hooks/useCinemaMotion';
import { MediaImage } from '../ui/MediaImage';
import { useScrollScene } from '../../hooks/useScrollScene';
import { recordGeometryRead, type CinemaFrame } from '../../lib/cinemaFrames';
import { brandCopy } from '../../i18n/brand';
import { AnamorphicLightSpill } from '../effects/AnamorphicLightSpill';

function renderHero(node: HTMLElement, frame: CinemaFrame) {
 recordGeometryRead(); const rect = node.getBoundingClientRect();
 const distance = Math.max(0, Math.min(rect.height, -rect.top));
 const progress = Math.min(1, distance / rect.height);
 return () => {
  node.style.setProperty('--hero-drift', `${(distance * 0.18).toFixed(2)}px`);
  node.style.setProperty('--hero-presence', (1 - progress * 0.8).toFixed(3));
  node.style.setProperty('--hero-light', (Math.min(frame.height, distance) * 0.04).toFixed(2) + 'px');
 };
}
function resetHero(node: HTMLElement) {
 for (const property of ['--hero-drift', '--hero-depth', '--hero-presence', '--hero-light']) node.style.removeProperty(property);
}

export function Hero({ onReel, blocked, entered }: { onReel: () => void; blocked: boolean; entered: boolean }) {
 const { language, t } = useLanguage();
 const media = showreelsByLanguage[language];
 const root = useRef<HTMLElement>(null), video = useRef<HTMLVideoElement>(null);
 const inView = useInView(video), visible = usePageVisible(), reduced = useReducedMotion();
 const [paused, setPaused] = useState(false), [playing, setPlaying] = useState(false);
 const [manualPlay, setManualPlay] = useState(false);
 const [failed, setFailed] = useState(false), [duration, setDuration] = useState(0);
 const [notice, setNotice] = useState('');
 useCinemaMotion(root, entered);
 useScrollScene(root, renderHero, resetHero);
 useEffect(() => {
  const element = video.current;
  if (!element) return;
  let alive = true;
  if (!paused && visible && inView && !blocked && (!reduced || manualPlay) && !failed) {
   void element.play().catch(() => { if (alive) { setPaused(true); setNotice('autoplayDenied'); } });
  } else element.pause();
  return () => { alive = false; element.pause(); };
 }, [paused, visible, inView, blocked, reduced, manualPlay, failed, media.src]);
 const togglePlay = () => { setManualPlay(true); setPaused(playing); setNotice(''); };
 const syncDuration = () => { const value = video.current?.duration ?? 0; setDuration(validDuration(value) ? value : 0); };
 return <section ref={root} className="hero" aria-labelledby="director-name">
  <div className="hero-media"><MediaImage src={media.poster} alt="" fetchPriority="high" /><video ref={video} src={media.src} muted loop playsInline preload="metadata" poster={media.poster} className={failed ? 'media-unavailable' : ''} aria-label={t('watchReel')} onLoadedMetadata={syncDuration} onDurationChange={syncDuration} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setNotice('backgroundFailed'); }} /></div>
  <div className="hero-shade" />
  <AnamorphicLightSpill variant="hero" />
  <p className="hero-presents" aria-label={brandCopy[language].presents}><span>LANCHUAN PRESENTS</span><span>A FILM BY DONG HAO</span></p>
  <p className="hero-optics" aria-hidden="true">LC-OPTICS <span>// 8K RAW</span><br/>2.39:1 ANAMORPHIC</p>
  <span className="hero-gate hero-gate-left" aria-hidden="true"/><span className="hero-gate hero-gate-right" aria-hidden="true"/>
  <div className="hero-reel"><ShowreelButton onClick={onReel} duration={duration || reelConfig.expectedDuration} frameRate={reelConfig.frameRate} /></div>
  <h1 id="director-name" className="hero-name" aria-label={t('headingName')}><span className="hero-name-ink"><span className="optical-sharp">DONG HAO</span><span className="optical-ghost" aria-hidden="true">DONG HAO</span></span></h1>
  <p className="hero-director-credit"><span lang="zh">東浩</span><span>DIRECTOR &amp; VISUAL ARTIST</span><span className="hero-studio-credit">LANCHUAN / CHONGQING</span></p>
  <div className="hero-controls"><button className="play-control" onClick={togglePlay} disabled={failed} aria-label={playing ? t('pauseBackground') : t('playBackground')}>{playing ? <Pause size={13}/> : <Play size={13}/>}</button></div>
  <p className="hero-notice" role="status">{notice === 'autoplayDenied' ? t('autoplayDenied') : notice === 'backgroundFailed' ? t('backgroundFailed') : ''}</p>
 </section>;
}

import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { ShowreelButton } from './ShowreelButton';
import { showreelsByLanguage, reelConfig } from '../../data/mockData';
import { validDuration } from '../../lib/reelTimeline';
import { useLanguage } from '../../i18n/LanguageContext';
import { usePreviewPlayback } from '../../hooks/usePreviewPlayback';
import { useCinemaMotion } from '../../hooks/useCinemaMotion';
import { MediaImage } from '../ui/MediaImage';
import { useScrollScene } from '../../hooks/useScrollScene';
import { recordGeometryRead, type CinemaFrame } from '../../lib/cinemaFrames';
import { geoCopy } from '../../i18n/geo';
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
 const geo = geoCopy[language];
 const media = showreelsByLanguage[language];
 const root = useRef<HTMLElement>(null), video = useRef<HTMLVideoElement>(null);
 const [paused, setPaused] = useState(false), [playing, setPlaying] = useState(false);
 const [manualPlay, setManualPlay] = useState(false);
 const [duration, setDuration] = useState(0);
 const playback = usePreviewPlayback(video, media.src, !paused && !blocked, 10, manualPlay);
 const failed = playback.failed;
 useCinemaMotion(root, entered);
 useScrollScene(root, renderHero, resetHero);
 const togglePlay = () => { playback.retry(); setManualPlay(true); setPaused(playing); };
 const syncDuration = () => { const value = video.current?.duration ?? 0; setDuration(validDuration(value) ? value : 0); };
 return <section ref={root} className="hero" data-brand-focus={geo.brandFocus} aria-labelledby="director-name">
  <div className="hero-media"><MediaImage src={media.poster} alt="" fetchPriority="high" /><video ref={video} data-preview="hero" muted loop playsInline preload="none" poster={media.poster} className={failed ? 'media-unavailable' : ''} aria-hidden="true" onLoadedMetadata={syncDuration} onDurationChange={syncDuration} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={playback.onError} /></div>
  <div className="hero-shade" />
  <AnamorphicLightSpill variant="hero" />
  <p className="hero-presents"><span lang="en">{geo.heroPresents[0]}</span><span>{geo.heroPresents[1]}</span></p>
  <p className="hero-regional-message">{geo.heroNarrative}</p>
  <p className="hero-optics" aria-hidden="true">{geo.heroCue[0]}<br/>{geo.heroCue[1]}</p>
  <span className="hero-gate hero-gate-left" aria-hidden="true"/><span className="hero-gate hero-gate-right" aria-hidden="true"/>
  <div className="hero-reel"><ShowreelButton onClick={onReel} duration={duration || reelConfig.expectedDuration} frameRate={reelConfig.frameRate} /></div>
  <h1 id="director-name" className="hero-name" aria-label={geo.heroAccessibleTitle}><span className="hero-name-ink" lang="en"><span className="optical-sharp">{geo.heroTitle}</span><span className="optical-ghost" aria-hidden="true">{geo.heroTitle}</span></span></h1>
  <p className="hero-director-credit"><span>{geo.heroCredit[0]}</span><span>{geo.heroCredit[1]}</span><span className="hero-studio-credit">{geo.heroCredit[2]}</span></p>
  <div className="hero-controls"><button className="play-control" onClick={togglePlay} aria-label={playing ? t('pauseBackground') : t('playBackground')}>{playing ? <Pause size={13}/> : <Play size={13}/>}</button></div>
  <p className="hero-notice" role="status">{failed ? t('autoplayDenied') : ''}</p>
 </section>;
}

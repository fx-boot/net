import { directorsByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { brandCopy, artistBrand } from '../../i18n/brand';
import { Signature } from './Signature';
import { useRef, useState } from 'react';
import { useOpticalReveal } from '../../hooks/useOpticalReveal';
import { useSpatialScroll } from '../../hooks/useSpatialScroll';
import { ScrambleLabel } from '../effects/ScrambleLabel';
import { atelierCopy } from '../../i18n/atelier';

export function DirectorCard() {
  const { language } = useLanguage();
  const director = directorsByLanguage[language];
  const copy = brandCopy[language];
  const atelier = atelierCopy[language];
  const [portraitFailed, setPortraitFailed] = useState(false);
  const isNegativePlate = portraitFailed || director.portrait.src === artistBrand.portraitFallback;
  const root = useRef<HTMLElement>(null), optical = useRef<HTMLDivElement>(null);
  useOpticalReveal(optical); useSpatialScroll(root);
  return <aside ref={root} className="portrait-column director-card" aria-label={`${copy.dossier} / ${copy.directorName}`}><div ref={optical} className="director-spatial" data-spatial-trigger><div className="card-visual"><div className="optical-sharp"><span className="spatial-shadow" aria-hidden="true"/><div className="spatial-surface">
    <div className="dossier-shell">
      <div className="dossier-edge dossier-edge-left" aria-hidden="true"><span>ACRO HAT — 120 / 645</span><i/><i/><i/><i/><i/><i/></div>
      <figure className="portrait-frame director-portrait" data-portrait-source={artistBrand.portrait} data-negative-plate={isNegativePlate}>
        <img src={isNegativePlate ? '/media/director/negative-holder.svg' : director.portrait.src} alt={isNegativePlate ? atelier.plateLabel : copy.portraitAlt} onError={() => setPortraitFailed(true)} loading="lazy" width={1600} height={2000}/>
        <figcaption className="camera-readout"><span><ScrambleLabel text="5600K / ISO 800"/></span><span><ScrambleLabel text="AH-CAM 01"/></span></figcaption>
        {isNegativePlate && <div className="dossier-negative-type" aria-hidden="true"><span className="dossier-negative-coordinate" lang="en">ATELIER {artistBrand.director}</span><span className="dossier-negative-name" lang={language === 'ja' ? 'ja' : 'zh'}>東浩</span><span className="dossier-negative-roman" lang="en">ACRO<br/>HAT</span></div>}
        <span className="frame-corner corner-tl" aria-hidden="true"/><span className="frame-corner corner-tr" aria-hidden="true"/>
        <span className="frame-corner corner-bl" aria-hidden="true"/><span className="frame-corner corner-br" aria-hidden="true"/>
        <span className="dossier-index" aria-hidden="true">AH / 01</span>
      </figure>
      <div className="dossier-edge dossier-edge-right" aria-hidden="true"><span>AH — NEG. 001 / 2026</span><i/><i/><i/><i/><i/><i/></div>
    </div>
    <div className="director-card-caption">
      <div className="director-caption-index"><span>{atelier.dossierTitle}</span><span>AH / 001</span></div>
      <h3><span lang={language === 'ja' ? 'ja' : 'zh'}>東浩</span><span className="director-roman" lang="en">/ {artistBrand.director}</span></h3>
      <p className="director-position"><span>DIRECTOR &amp; HYBRID ARTIST</span>{language !== 'en' && <span>{copy.artistRole}</span>}</p>
      <Signature />
    </div>
  </div></div></div></div></aside>;
}

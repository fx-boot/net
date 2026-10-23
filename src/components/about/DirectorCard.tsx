import { directorsByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { brandCopy, studioBrand } from '../../i18n/brand';
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
  const isNegativePlate = portraitFailed || director.portrait.src === studioBrand.portraitFallback;
  const root = useRef<HTMLElement>(null), optical = useRef<HTMLDivElement>(null);
  useOpticalReveal(optical); useSpatialScroll(root);
  return <aside ref={root} className="portrait-column director-card" aria-label={`${copy.dossier} / ${copy.directorName}`}><div ref={optical} className="director-spatial" data-spatial-trigger><div className="card-visual"><div className="optical-sharp"><span className="spatial-shadow" aria-hidden="true"/><div className="spatial-surface">
    <div className="dossier-shell">
      <div className="dossier-edge dossier-edge-left" aria-hidden="true"><span>LANCHUAN — 120 / 645</span><i/><i/><i/><i/><i/><i/></div>
      <figure className="portrait-frame director-portrait" data-portrait-source={studioBrand.portrait} data-negative-plate={isNegativePlate}>
        <img src={isNegativePlate ? '/media/director/negative-holder.svg' : director.portrait.src} alt={isNegativePlate ? atelier.plateLabel : copy.portraitAlt} onError={() => setPortraitFailed(true)} loading="lazy" width={1600} height={2000}/>
        <figcaption className="camera-readout"><span><ScrambleLabel text="5600K / ISO 800"/></span><span><ScrambleLabel text="LC-CAM 01"/></span></figcaption>
        {isNegativePlate && <div className="dossier-negative-type" aria-hidden="true"><span className="dossier-negative-coordinate">LC / ATELIER</span><span className="dossier-negative-name" lang={language === 'ja' ? 'ja' : 'zh'}>東浩</span><span className="dossier-negative-roman">DONG<br/>HAO.</span></div>}
        <span className="frame-corner corner-tl" aria-hidden="true"/><span className="frame-corner corner-tr" aria-hidden="true"/>
        <span className="frame-corner corner-bl" aria-hidden="true"/><span className="frame-corner corner-br" aria-hidden="true"/>
        <span className="dossier-index" aria-hidden="true">LC / D-01</span>
      </figure>
      <div className="dossier-edge dossier-edge-right" aria-hidden="true"><span>DH — NEG. 001 / 2026</span><i/><i/><i/><i/><i/><i/></div>
    </div>
    <div className="director-card-caption">
      <div className="director-caption-index"><span>{atelier.dossierTitle}</span><span>LC—DH / 001</span></div>
      <h3><span lang={language === 'ja' ? 'ja' : 'zh'}>東浩</span><span className="director-roman" lang="en">/ DONG HAO</span></h3>
      {(language === 'ko' || language === 'ja') && <p className="director-alias">{copy.directorAlias}</p>}
      <p className="director-position"><span>FOUNDER &amp; CHIEF DIRECTOR</span>{language !== 'en' && <span>{copy.founderRole}</span>}</p>
      <Signature />
    </div>
  </div></div></div></div></aside>;
}

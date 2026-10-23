import { DirectorCard } from './DirectorCard';
import { DirectorStatement } from './DirectorStatement';
import { StudioCapacity } from './StudioCapacity';
import { CineBreakdown } from './CineBreakdown';
import { useLanguage } from '../../i18n/LanguageContext';
import { geoCopy } from '../../i18n/geo';

export function About() {
  const { language } = useLanguage();
  const { brandFocus } = geoCopy[language];
  const studioFirst = brandFocus === 'studio';
  const tracks = studioFirst
    ? [<StudioCapacity key="studio" />, <DirectorStatement key="director" />]
    : [<DirectorStatement key="director" />, <StudioCapacity key="studio" />];
  return <section id="about" className="biography section-space" data-brand-focus={brandFocus} aria-labelledby={studioFirst ? 'studio-heading' : 'about-heading'}>
    <div className="biography-spread"><DirectorCard />
    <div className={`director-track${studioFirst ? ' director-track--studio-first' : ''}`}>{tracks}</div></div>
    <CineBreakdown />
  </section>;
}

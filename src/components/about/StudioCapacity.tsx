import { OpticalText } from '../effects/OpticalText';
import { ScrambleLabel } from '../effects/ScrambleLabel';
import { brandCopy } from '../../i18n/brand';
import { useLanguage } from '../../i18n/LanguageContext';
import { atelierCopy } from '../../i18n/atelier';

export function StudioCapacity() {
  const { language } = useLanguage();
  const copy = brandCopy[language];
  const atelier = atelierCopy[language];
  return <section id="studio" className="studio-capacity" aria-labelledby="studio-heading">
    <div className="capacity-heading"><h2 id="studio-heading"><OpticalText text="LANCHUAN"/><span>{atelier.labTitle}</span></h2><span className="capacity-registration" aria-hidden="true">IMAGE<br/>&amp; TECHNOLOGY</span></div>
    <p className="studio-ethos">{copy.ethos}</p>
    <dl className="capacity-matrix">{atelier.disciplines.map(discipline => <div className="capacity-row" key={discipline.code}>
      <dt><span className="capacity-code" aria-hidden="true">{discipline.code}</span><span className="capacity-name"><span lang="en">{discipline.title}</span>{language !== 'en' && <span className="capacity-label">{discipline.label}</span>}</span></dt>
      <dd className="capacity-description">{discipline.description}</dd>
    </div>)}</dl>
    <div className="capacity-formats"><span className="capacity-format-label">{atelier.formatsLabel}</span><ul className="studio-specs"><li><ScrambleLabel text="8K RAW"/></li><li><ScrambleLabel text="ANAMORPHIC CINE"/></li></ul></div>
    <p className="studio-legal">{copy.company}</p>
  </section>;
}

import { OpticalText } from '../effects/OpticalText';
import { useLanguage } from '../../i18n/LanguageContext';
import { atelierCopy } from '../../i18n/atelier';
import { brandCopy } from '../../i18n/brand';
export function CreativePractice() {
 const { language } = useLanguage(); const atelier = atelierCopy[language];
 return <section id="practice" className="creative-practice" aria-labelledby="practice-heading">
  <div className="capacity-heading"><h2 id="practice-heading"><OpticalText text="BEYOND MEDIA"/><span>{atelier.practiceTitle}</span></h2><span className="capacity-registration" aria-hidden="true">ONE VISION<br/>MANY FORMS</span></div>
  <p className="creative-ethos">{brandCopy[language].ethos}</p>
  <dl className="capacity-matrix">{atelier.disciplines.map(discipline => <div className="capacity-row" key={discipline.code}><dt><span className="capacity-code" aria-hidden="true">{discipline.code}.</span><span className="capacity-name"><span lang="en">{discipline.title}</span>{language !== 'en' && <span className="capacity-label">{discipline.label}</span>}</span></dt><dd className="capacity-description">{discipline.description}</dd></div>)}</dl>
 </section>;
}

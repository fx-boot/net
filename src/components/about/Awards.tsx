import { animate, stagger } from 'animejs';
import { awardsByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';

import { editorial } from '../../i18n/editorial';
import { useReveal } from '../../hooks/useReveal';
import { MorphIcon } from '../effects/MorphIcon';
import { OpticalText } from '../effects/OpticalText';
function revealAwards() { animate('.award-row', { opacity: [0.12, 1], y: [24, 0], scale: [.985, 1], delay: stagger(100), duration: 1100, ease: 'outExpo' }); }
export function Awards() {
 const { language } = useLanguage();
 const awards = awardsByLanguage[language];
 const ref = useReveal<HTMLTableSectionElement>(revealAwards);
 return <section id="awards" className="recognition section-space" aria-labelledby="awards-heading"><h2 id="awards-heading"><OpticalText text={editorial[language].awards}/></h2><table className="awards-table"><tbody ref={ref}>{awards.map((award,index)=><tr className="award-row" tabIndex={0} key={award.festival}><td className="award-year">{award.year}</td><th scope="row">{['CANNES LIONS','SUNDANCE','FIRST'][index]}</th><td className="award-honor">{editorial[language].honors[index]}</td><td className="award-film">{award.film}<span className="award-laurel"><MorphIcon kind="laurel" size={70}/></span></td></tr>)}</tbody></table></section>;
}

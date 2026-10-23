import { OpticalText } from '../effects/OpticalText';
import { representativesByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { geoCopy } from '../../i18n/geo';
import { studioBrand } from '../../i18n/brand';
import { RepresentationCard } from './RepresentationCard';
export function Contact() {
 const {language}=useLanguage();
 const geo = geoCopy[language];
 const primaryEmail = studioBrand.emails[geo.brandFocus === 'studio' ? 0 : 1];
 const representatives = [...representativesByLanguage[language]].sort((a,b) => Number(b.email === primaryEmail) - Number(a.email === primaryEmail));
 return <section id="contact" className="contact section-space" data-brand-focus={geo.brandFocus} aria-labelledby="contact-heading"><h2 id="contact-heading"><OpticalText text={geo.contactHeading}/></h2><div className="representation-grid">{representatives.map(person=><RepresentationCard key={person.email} person={person}/>)}</div></section>;
}

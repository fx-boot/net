import { OpticalText } from '../effects/OpticalText';
import { representativesByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { geoCopy } from '../../i18n/geo';
import { RepresentationCard } from './RepresentationCard';
export function Contact() {
 const {language}=useLanguage();
 return <section id="contact" className="contact section-space" aria-labelledby="contact-heading"><p className="contact-caption" lang="en">DIRECTOR &amp; ATELIER CONTACT</p><h2 id="contact-heading"><OpticalText text={geoCopy[language].contactHeading}/></h2><div className="representation-grid">{representativesByLanguage[language].map(person=><RepresentationCard key={person.email} person={person}/>)}</div></section>;
}

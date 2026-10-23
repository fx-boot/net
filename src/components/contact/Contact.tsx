import { OpticalText } from '../effects/OpticalText';
import { representativesByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { editorial } from '../../i18n/editorial';
import { RepresentationCard } from './RepresentationCard';
export function Contact() {
 const {language}=useLanguage();
 return <section id="contact" className="contact section-space" aria-labelledby="contact-heading"><h2 id="contact-heading"><OpticalText text={editorial[language].contact}/></h2><div className="representation-grid">{representativesByLanguage[language].map(person=><RepresentationCard key={person.email} person={person}/>)}</div></section>;
}

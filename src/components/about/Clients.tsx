import { clientsByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
export function Clients() { const { language, t } = useLanguage(); return <section className="clients" aria-label={t('clientsLabel')}><p>{t('clientsHeading')}<span>{t('clientsDisclaimer')}</span></p><div className="client-logos">{clientsByLanguage[language].map(client => <span key={client.name}>{client.name}</span>)}</div></section>; }

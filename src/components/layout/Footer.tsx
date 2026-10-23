import { socials } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { studioBrand } from '../../i18n/brand';
export function Footer({ onCredits }: { onCredits:()=>void }) {
 const {t}=useLanguage();
 return <footer className="footer"><div className="footer-top"><div>{socials.map(s=><a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div><a href="#top" aria-label={t('backTop')}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M12 21V3M4.5 10.5L12 3L19.5 10.5"/></svg></a></div><a className="footer-name" href="#top" aria-label={`LANCHUAN / ${studioBrand.director} · ${t('backTop')}`}><span>LANCHUAN</span><span className="footer-director" lang="en">/ {studioBrand.director}</span></a><div className="footer-bottom"><span>{studioBrand.copyright}</span><button onClick={onCredits}>Credits</button></div></footer>;
}

import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../../i18n/LanguageSwitcher';
import { AcroHatLogo } from '../brand/AcroHatLogo';
export function Navigation() {
 const [open,setOpen]=useState(false); const toggle=useRef<HTMLButtonElement>(null); const {t}=useLanguage();
 return <header className="navigation"><a className="wordmark brand-home" href="#top" aria-label={`ACRO HAT / ${t('backTop')}`}><AcroHatLogo /></a><nav id="main-navigation" aria-label={t('navLabel')} className={open?'is-open':''} onKeyDown={event=>{if(event.key==='Escape'){setOpen(false);toggle.current?.focus();}}}>{[[t('works'),'#works'],[t('about'),'#about'],[t('practice'),'#practice'],[t('contact'),'#contact']].map(([name,href])=><a data-magnetic key={href} href={href} onClick={()=>setOpen(false)}><span className="magnetic-ink">{name}</span></a>)}<div className="mobile-language"><LanguageSwitcher /></div></nav><div className="desktop-language"><LanguageSwitcher /></div><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(v=>!v)} aria-label={open?t('menuClose'):t('menuOpen')}>{open?<X size={20}/>:<Menu size={20}/>}</button></header>;
}

import { useLanguage } from '../../i18n/LanguageContext';
import { cinemaCopy } from '../../i18n/cinema';
import type { WorkView } from '../../types/portfolio';
export function ViewSwitcher({value,onChange}:{value:WorkView;onChange:(view:WorkView)=>void}){
 const {language}=useLanguage(),copy=cinemaCopy[language];
 return <div className="view-switcher" role="group" aria-label={copy.view}>
  <button type="button" aria-label={copy.carousel} aria-pressed={value==='carousel'} onClick={()=>onChange('carousel')}><svg width="17" height="11" viewBox="0 0 17 11" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true"><path d="M4.5 1.5H12.5V9.5H4.5ZM.5 3V8M16.5 3V8"/></svg>CAROUSEL <span className="view-translation">{copy.carousel}</span></button>
  <button type="button" aria-label={copy.archive} aria-pressed={value==='archive'} onClick={()=>onChange('archive')}><svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true"><path d="M.5 1H4.5V4H.5ZM5.5 1H9.5V4H5.5ZM10.5 1H14.5V4H10.5ZM.5 7H4.5V10H.5ZM5.5 7H9.5V10H5.5ZM10.5 7H14.5V10H10.5Z"/></svg>ARCHIVE <span className="view-translation">{copy.archive}</span></button>
 </div>;
}

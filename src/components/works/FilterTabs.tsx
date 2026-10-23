import type { Filter } from '../../types/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';
import { filterKeys, filters } from '../../i18n/filterLabels';
import { ScrambleLabel } from '../effects/ScrambleLabel';
export function FilterTabs({ value, count, onChange }: { value: Filter; count: number; onChange: (filter: Filter) => void }) {
 const { t } = useLanguage();
 return <div className="filter-tabs" role="group" aria-label={t('categoryLabel')}>{filters.map(filter => <button data-magnetic type="button" key={filter} aria-pressed={value === filter} onClick={() => onChange(filter)}><span className="magnetic-ink"><ScrambleLabel text={`${t(filterKeys[filter])}${filter==='All'?` (${String(count).padStart(2,'0')})`:''}`} trigger={value===filter}/></span></button>)}</div>;
}

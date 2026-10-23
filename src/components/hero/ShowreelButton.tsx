import { useLanguage } from '../../i18n/LanguageContext';
import { MorphIcon } from '../effects/MorphIcon';

export function ShowreelButton({ onClick }: { onClick: () => void }) {
 const { t } = useLanguage();
 return <button data-magnetic type="button" className="reel-link" aria-label={t('watchReel')} onClick={onClick}>
  <span className="magnetic-ink"><span aria-hidden="true">[</span><MorphIcon kind="play" size={15}/>{t('watchReel')}<span aria-hidden="true">]</span></span>
 </button>;
}

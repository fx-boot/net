import { useLanguage } from '../../i18n/LanguageContext';
export function VideoLoader() {
  const { t } = useLanguage();
  return <div className="video-loading" role="status"><span className="uv-spinner" aria-hidden="true" /><span>{t('preparing')}</span></div>;
}

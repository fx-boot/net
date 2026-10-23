import { projectsByLanguage, directorsByLanguage, heroBackgroundsByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { Dialog } from '../ui/Dialog';
export function SourceCredits({ onClose }: { onClose: () => void }) {
  const { language, t } = useLanguage();
  const hero = heroBackgroundsByLanguage[language];
  return <Dialog title={t('sources')} onClose={onClose}>
    <div className="project-detail-heading"><span>ACRO HAT / 東浩</span><h2>{t('sources')}</h2><p>{t('sourceIntro')}</p><p>{t('footerDisclaimer')}</p><p>{t('awardsDisclaimer')}</p><p>{t('clientsDisclaimer')}</p><p>{t('bioDisclaimer')}</p><p>{t('contactDemo')}</p><p>{t('projectDisclaimer')}</p></div>
    <div className="source-list"><h3>{t('footage')}</h3><ul><li><a href={hero.sourceUrl} target="_blank" rel="noreferrer">{t('heroVideo')} — {hero.author}</a></li>{projectsByLanguage[language].map(project => <li key={project.id}><a href={project.fullFilm.sourceUrl} target="_blank" rel="noreferrer">{project.title} — Mixkit</a></li>)}<li><a href={directorsByLanguage[language].portrait.sourceUrl} target="_blank" rel="noreferrer">{t('portraitDemo')}</a></li></ul><p><a href="https://mixkit.co/license/#videoFree" target="_blank" rel="noreferrer">Mixkit Video Free {t('license')}</a></p><p>{t('audioLicense')}</p>
    <h3>{t('fonts')}</h3><p>{t('fontLicense')}</p><p><a href="/fonts/Instrument-Sans-OFL.txt">Instrument Sans OFL</a> · <a href="/fonts/Bodoni-Moda-OFL.txt">Bodoni Moda OFL</a></p>
    <h3>{t('code')}</h3><p>{t('codeLicense')}</p><p><a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">React Bits</a> · <a href="https://github.com/uiverse-io/galaxy" target="_blank" rel="noreferrer">Uiverse Galaxy</a> · <a href="https://animejs.com/documentation/" target="_blank" rel="noreferrer">Anime.js</a></p></div>
  </Dialog>;
}

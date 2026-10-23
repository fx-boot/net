import { useLanguage } from '../../i18n/LanguageContext';
import { editorial } from '../../i18n/editorial';
import { filterKeys } from '../../i18n/filterLabels';
import type { Project, ProjectOrigin } from '../../types/portfolio';
import { useState } from 'react';
import { useReducedMotion } from '../../hooks/useMotionEnvironment';
import { Dialog } from '../ui/Dialog';
import { MediaImage } from '../ui/MediaImage';
import { VideoPlayer } from '../media/VideoPlayer';
export function ProjectDialog({ project, origin, onClose }: { project: Project; origin?: ProjectOrigin; onClose: () => void }) {
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(!origin || reduced);
  return <Dialog title={`${project.title} ${t('projectDetail')}`} onClose={onClose} origin={origin} onPlaybackReady={setReady}><VideoPlayer media={project.fullFilm} title={project.title} playbackEnabled={ready || reduced} /><div className="project-detail-heading"><span>{t(filterKeys[project.category])} / {project.year}</span><h2>{project.title}</h2><p>{project.description}</p></div><div className="detail-body"><div className="detail-note"><p>{project.note}</p></div><dl className="credits">{project.credits.slice(0, 5).map((credit, index) => <div key={credit.role}><dt>{index === 4 ? editorial[language].year : credit.role}</dt><dd>{credit.name.replace(/\s*[（(][^）)]*[）)]/g, '')}</dd></div>)}</dl></div><div className="stills-gallery"><h3>{t('stills')}</h3>{project.stills.map((still, index) => <figure key={still.src}><MediaImage src={still.src} alt={`${still.alt}, ${t('still')} ${index + 1}`} loading="lazy" /><figcaption>{project.englishTitle} / {t('still')} {String(index + 1).padStart(2, '0')}</figcaption></figure>)}</div></Dialog>;
}

import { useCallback, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Providers } from './Providers';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { Preloader } from '../components/hero/Preloader';
import { Hero } from '../components/hero/Hero';
import { SelectedWorks } from '../components/works/SelectedWorks';
import { ProjectDialog } from '../components/works/ProjectDialog';
import { About } from '../components/about/About';
import { Awards } from '../components/about/Awards';
import { editorial } from '../i18n/editorial';
import { Contact } from '../components/contact/Contact';
import { Dialog } from '../components/ui/Dialog';
import { VideoPlayer } from '../components/media/VideoPlayer';
import { projectsByLanguage, showreelsByLanguage } from '../data/mockData';
import { SourceCredits } from '../components/layout/SourceCredits';
import type { ProjectOrigin } from '../types/portfolio';
import { AmbientLight } from '../components/effects/AmbientLight';
import { FilmFlow } from '../components/effects/FilmFlow';
import { FilmGrainCanvas } from '../components/effects/FilmGrainCanvas';
import { CinemaSoundControl } from '../components/effects/CinemaSoundControl';

export default function App() {
  const { language, t } = useLanguage();
  const [entered, setEntered] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(min-width: 701px) and (hover: hover) and (pointer: fine)').matches);
  const [revealing, setRevealing] = useState(false);
  const [origin, setOrigin] = useState<ProjectOrigin | undefined>();
  const [projectId, setProjectId] = useState<string | null>(null);
  const project = projectsByLanguage[language].find(item => item.id === projectId);
  const [reel, setReel] = useState(false);
  const [credits, setCredits] = useState(false);
  const finishIntro = useCallback(() => setEntered(true), []);
  const revealIntro = useCallback(() => setRevealing(true), []);
  const modalOpen = Boolean(project) || reel || credits;
  return <Providers modalOpen={modalOpen}>
    <AmbientLight />
    <FilmGrainCanvas blocked={modalOpen} />
    <FilmFlow />
    {!entered && <Preloader onComplete={finishIntro} onReveal={revealIntro} />}
    <div id="top" inert={!entered}><a className="skip-link" href="#works">{t('skip')}</a><Navigation /><main><Hero onReel={() => setReel(true)} blocked={modalOpen} entered={revealing || entered} /><SelectedWorks onOpen={(item, entry) => { setOrigin(entry); setProjectId(item.id); }} blocked={modalOpen} /><About /><Awards /><Contact /></main><Footer onCredits={() => setCredits(true)} /><CinemaSoundControl blocked={modalOpen}/></div>
    {project && <ProjectDialog origin={origin} project={project} onClose={() => setProjectId(null)} />}
    {reel && <Dialog title={editorial[language].reel} onClose={() => setReel(false)}><VideoPlayer media={showreelsByLanguage[language]} title={editorial[language].reel} /></Dialog>}
    {credits && <SourceCredits onClose={() => setCredits(false)} />}
  </Providers>;
}

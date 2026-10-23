import { useId, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { filterKeys } from '../../i18n/filterLabels';
import type { Project, ProjectOrigin } from '../../types/portfolio';
import { PreviewVideo } from '../media/PreviewVideo';
import { MediaImage } from '../ui/MediaImage';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';
import { useOpticalReveal } from '../../hooks/useOpticalReveal';
import { useSpatialScroll } from '../../hooks/useSpatialScroll';
import { recordBoundary } from '../../lib/frameDiagnostics';
import { FilmScrub } from './FilmScrub';
import { useFilmScrub } from '../../hooks/useFilmScrub';
import { scrubCopy } from '../../i18n/scrub';
import '../../styles/scrub.css';
interface Props {project:Project;frameIndex:number;active:boolean;disabled:boolean;scrub?:boolean;onActive:(id:string|null)=>void;onOpen:(project:Project,origin?:ProjectOrigin)=>void}
export function ProjectCard({project,active,disabled,onActive,onOpen,frameIndex,scrub=false}:Props){
 const {t,language}=useLanguage(),reduced=useReducedMotion(),desktop=useDesktopPointer();
 const root=useRef<HTMLElement>(null),visual=useRef<HTMLSpanElement>(null),trigger=useRef<HTMLButtonElement>(null),image=useRef<HTMLSpanElement>(null);
 const scrubEnabled=scrub&&desktop&&!reduced&&!disabled&&!!project.scrub;
 const scrubState=useFilmScrub({trigger,image,data:project.scrub,enabled:scrubEnabled,active});
 const {rangeRef,timecodeRef}=scrubState;
 const scrubId=useId(),copy=scrubCopy[language];
 useOpticalReveal(visual,!disabled);useSpatialScroll(root,!disabled);
 return <article ref={root} className="project-card" data-project-id={project.id}>
  <span className="background-sequence" aria-hidden="true">NO. {String(frameIndex).padStart(2,'0')}</span>
  <button ref={trigger} type="button" className="card-trigger project-button" data-spatial-trigger data-project-id={project.id} disabled={disabled}
   onPointerEnter={event=>{if(event.pointerType==='mouse'){scrubState.pointerMove(event);recordBoundary(project.id,true);onActive(project.id);}}}
   onPointerMove={scrubState.pointerMove}
   onPointerLeave={event=>{if(event.pointerType==='mouse'){scrubState.pointerLeave();recordBoundary(project.id,false);onActive(null);}}}
   onFocus={()=>{scrubState.focus();onActive(project.id);}} onBlur={()=>onActive(null)} aria-label={`${t('viewProject')} ${project.title}`}
   onClick={event=>{
    const element=event.currentTarget.querySelector<HTMLElement>('.project-image');const rect=element?.getBoundingClientRect();const poster=element?.querySelector('img')?.currentSrc||project.cover.src;
    onOpen(project,event.detail>0&&!reduced&&element&&rect?{element,poster,rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height}}:undefined);
   }}>
   <span ref={visual} className="card-visual"><span className="optical-sharp"><span className="spatial-shadow" aria-hidden="true"/><span className="spatial-surface">
    <span ref={image} className="project-image"><MediaImage src={project.cover.src} alt={project.cover.alt} loading="lazy" width={1920} height={1080}/>{scrubEnabled&&project.scrub?<FilmScrub data={project.scrub} state={scrubState}/>:desktop&&active&&!reduced&&!disabled&&<PreviewVideo media={project.preview}/>}<span className="projection-gate" aria-hidden="true"><i/><i/><i/><i/></span></span>
    <span className="project-info"><span className="project-heading"><span className="project-index">{String(frameIndex).padStart(2,'0')} /</span><span className="project-title">{project.title}</span></span><span className="project-meta">{t(filterKeys[project.category])} — {project.year} <span>[{project.duration}]</span></span></span>
    {scrubEnabled&&<span className="film-scrub-readout" aria-hidden="true"><span ref={timecodeRef}>[ TC 00:00:00:00 ]</span></span>}
   </span></span></span>
  </button>
  {scrubEnabled&&<><span className="sr-only" id={scrubId}>{copy.instructions}</span><input ref={rangeRef} className="film-scrub-keyboard" type="range" min={0} max={1000} step={1} defaultValue={0} aria-label={`${project.title} — ${copy.label}`} aria-describedby={scrubId} onFocus={()=>{scrubState.focus();onActive(project.id);}} onBlur={()=>{scrubState.blur();onActive(null);}} onKeyDown={event=>event.stopPropagation()} onChange={event=>scrubState.input(Number(event.currentTarget.value)/1000)}/></>}
 </article>;
}

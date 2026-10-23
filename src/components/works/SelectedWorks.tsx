import { useEffect, useRef, useState } from 'react';
import { animate, createScope } from 'animejs';
import { projectsByLanguage } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import { cinemaCopy } from '../../i18n/cinema';
import { editorial } from '../../i18n/editorial';
import { filterKeys } from '../../i18n/filterLabels';
import type { Filter, WorkView, Project, ProjectOrigin } from '../../types/portfolio';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';
import { ARCHIVE_PAGE_SIZE } from '../../lib/catalogWindow';
import { OpticalText } from '../effects/OpticalText';
import { FilterTabs } from './FilterTabs';
import { ViewSwitcher } from './ViewSwitcher';
import { CinemaCarousel } from './CinemaCarousel';
import { ProjectCard } from './ProjectCard';
interface CollectionView {filter:Filter;view:WorkView}
export function SelectedWorks({onOpen,blocked}:{onOpen:(project:Project,origin?:ProjectOrigin)=>void;blocked:boolean}){
 const {language,t}=useLanguage(),copy=cinemaCopy[language],projects=projectsByLanguage[language];
 const root=useRef<HTMLDivElement>(null);
 const pendingArchiveFocus=useRef<number|null>(null);
 const [requested,setRequested]=useState<CollectionView>({filter:'All',view:'carousel'});
 const [displayed,setDisplayed]=useState<CollectionView>(requested);
 const [visibleCount,setVisibleCount]=useState(ARCHIVE_PAGE_SIZE),[active,setActive]=useState<string|null>(null);
 const reduced=useReducedMotion(),desktop=useDesktopPointer(),staticMotion=reduced||!desktop;
 const requestedKey=`${requested.filter}:${requested.view}`,displayedKey=`${displayed.filter}:${displayed.view}`;
 const exiting=requestedKey!==displayedKey;
 const selected=projects.filter(film=>displayed.filter==='All'||film.category===displayed.filter);
 useEffect(()=>{const index=pendingArchiveFocus.current;if(index===null)return;pendingArchiveFocus.current=null;root.current?.querySelectorAll<HTMLButtonElement>('.works-grid .card-trigger')[index]?.focus({preventScroll:true});},[visibleCount]);
 useEffect(()=>{
  const scope=createScope({root}).add(()=>{
   if(exiting)animate(root.current!,{opacity:[1,0],duration:staticMotion?0:140,ease:'inQuad',onComplete:()=>{setActive(null);setVisibleCount(ARCHIVE_PAGE_SIZE);setDisplayed(requested);}});
   else animate(root.current!,{opacity:[staticMotion?1:0,1],duration:staticMotion?0:240,ease:'outCubic'});
  });
  return ()=>scope.revert();
 },[requested,displayedKey,exiting,staticMotion]);
 const open=(film:Project,origin?:ProjectOrigin)=>{setActive(null);onOpen(film,origin);};
 return <section id="works" className="works section-space" aria-labelledby="works-heading">
  <div className="section-heading"><h2 id="works-heading"><OpticalText text={editorial[language].works}/></h2><span className="collection-years">2024—2026</span></div>
  <div className="collection-toolbar"><FilterTabs count={projects.length} value={requested.filter} onChange={filter=>{setActive(null);setRequested(value=>({...value,filter}));}}/><ViewSwitcher value={requested.view} onChange={view=>{setActive(null);setRequested(value=>({...value,view}));}}/></div>
  <p className="sr-only" role="status" aria-live="polite">{exiting?t('switching'):`${t(filterKeys[displayed.filter])}, ${selected.length} ${t('filmsCount')}`}</p>
  <div ref={root} className="collection-content" data-view={displayed.view} data-filter={displayed.filter} aria-busy={exiting}>
   {displayed.view==='carousel'?<CinemaCarousel key={displayed.filter} projects={selected} active={!blocked?active:null} disabled={exiting} onActive={setActive} onOpen={open}/>:<>
    {!selected.length&&<p className="empty-collection">{copy.empty}</p>}
    <div className="works-grid">{selected.slice(0,visibleCount).map(film=><ProjectCard key={film.id} project={film} frameIndex={film.catalogOrder??projects.indexOf(film)+1} disabled={exiting} active={!blocked&&active===film.id} onActive={setActive} onOpen={open}/>)}</div>
    {visibleCount<selected.length&&<div className="load-more"><span>{copy.shown} {Math.min(visibleCount,selected.length)} / {selected.length}</span><button type="button" data-magnetic onClick={()=>{pendingArchiveFocus.current=visibleCount;setVisibleCount(value=>value+ARCHIVE_PAGE_SIZE);}} disabled={exiting}><span className="magnetic-ink">[ + {copy.loadMore} ]</span></button></div>}
   </>}
  </div>
 </section>;
}

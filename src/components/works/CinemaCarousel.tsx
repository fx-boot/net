import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { useReducedMotion } from '../../hooks/useMotionEnvironment';
import { useLanguage } from '../../i18n/LanguageContext';
import { cinemaCopy } from '../../i18n/cinema';
import type { Project, ProjectOrigin } from '../../types/portfolio';
import { carouselWindow, wrapIndex } from '../../lib/catalogWindow';
import { ProjectCard } from './ProjectCard';
import { reelConfig } from '../../data/mockData';
import { useTransportSpring } from '../../hooks/useTransportSpring';
import { transportCopy } from '../../i18n/transport';
import { cinemaAudio } from '../../lib/cinemaAudio';
import { AnamorphicLightSpill } from '../effects/AnamorphicLightSpill';
interface Props {projects:Project[];active:string|null;disabled:boolean;onActive:(id:string|null)=>void;onOpen:(project:Project,origin?:ProjectOrigin)=>void}
export function CinemaCarousel({projects,active,disabled,onActive,onOpen}:Props){
 const {language}=useLanguage(),copy=cinemaCopy[language];
 const [currentId,setCurrentId]=useState(projects[0]?.id??'');
 const [position,setPosition]=useState(0);
 const reduced=useReducedMotion(),[moving,setMoving]=useState(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const index=Math.max(0,projects.findIndex(film=>film.id===currentId));
 const current=projects[index];
 const ruler=useRef<HTMLSpanElement>(null);
 useTransportSpring(ruler,projects.length>1?index/(projects.length-1):0);
 const viewport=useRef<HTMLDivElement>(null),swipe=useRef<{x:number;y:number;dragging:boolean}|null>(null),suppressClick=useRef(false);
 const step=(delta:number)=>{if(disabled||projects.length<2||delta===0)return;cinemaAudio.playMechanicalClick();onActive(null);if(timer.current)clearTimeout(timer.current);if(!reduced){setMoving(true);timer.current=setTimeout(()=>setMoving(false),700);}setPosition(value=>value+delta);setCurrentId(projects[wrapIndex(index+delta,projects.length)].id);};
 const pointerDown=(event:PointerEvent<HTMLDivElement>)=>{if(disabled||(event.pointerType==='mouse'&&event.button!==0))return;swipe.current={x:event.clientX,y:event.clientY,dragging:false};suppressClick.current=false;};
 const pointerMove=(event:PointerEvent<HTMLDivElement>)=>{
  const start=swipe.current;if(!start)return;
  const dx=event.clientX-start.x,dy=event.clientY-start.y;
  if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.2){start.dragging=true;event.currentTarget.setPointerCapture(event.pointerId);}
 };
 const pointerUp=(event:PointerEvent<HTMLDivElement>)=>{
  const start=swipe.current;swipe.current=null;if(!start)return;
  const dx=event.clientX-start.x;
  if(start.dragging){suppressClick.current=true;if(Math.abs(dx)>48)step(dx<0?1:-1);}
 };
 if(!current)return <p className="empty-collection">{copy.empty}</p>;
 return <div className="cinema-carousel" role="region" aria-roledescription={copy.carousel} aria-label={copy.region} onKeyDown={event=>{
  if(event.target instanceof HTMLInputElement||event.altKey||event.ctrlKey||event.metaKey||!['ArrowLeft','ArrowRight'].includes(event.key))return;
  event.preventDefault();viewport.current?.focus({preventScroll:true});step(event.key==='ArrowLeft'?-1:1);
 }}>
  <p className="sr-only" id="carousel-instructions">{copy.instructions}</p>
  <div ref={viewport} className={`cinema-stage ${moving?'is-transitioning':''}`} tabIndex={0} aria-describedby="carousel-instructions" aria-keyshortcuts="ArrowLeft ArrowRight"
   onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={()=>{swipe.current=null;}}
   onClickCapture={event=>{if(suppressClick.current){event.preventDefault();event.stopPropagation();suppressClick.current=false;}}}>
   <AnamorphicLightSpill variant="theatre"/>
   {carouselWindow(projects.length,index).map(({offset,index:filmIndex})=>{
    const film=projects[filmIndex],selected=offset===0;
    return <div key={position+offset} className={`cinema-slot ${selected?'is-current':''}`} data-slide-index={position+offset} data-slot={offset} aria-hidden={!selected} inert={!selected}
     style={{'--slot':offset,'--slide-scale':selected?1:.88,'--slide-opacity':selected?1:.25,'--slide-angle':selected?'0deg':offset<0?'8deg':'-8deg'} as CSSProperties}>
     <ProjectCard scrub={selected} project={film} frameIndex={film.catalogOrder??filmIndex+1} disabled={disabled||!selected} active={selected&&active===film.id} onActive={onActive} onOpen={onOpen}/>
    </div>;
   })}
  </div>
  <div className="cinema-controls">
   <button data-magnetic type="button" onClick={()=>step(-1)} disabled={disabled||projects.length<2} aria-label={copy.previous}><span className="magnetic-ink"><span className="transport-bracket">[</span><svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden="true"><path d="M7 0L0 5L7 10Z"/></svg><span><span className="transport-frame">FRAME </span>PREV</span><span className="transport-bracket">]</span></span></button>
   <div className="projection-console"><div className="console-readout" aria-hidden="true"><span>FRAME {String(reelConfig.frameRate).padStart(3,'0')}</span><span className="console-reel">REEL <b key={current.id}>{String(index+1).padStart(2,'0')}</b> / {String(projects.length).padStart(2,'0')}</span><span>2.39:1</span></div><div className="film-counter"><span key={current.id} className="counter-current" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span ref={ruler} className="counter-ruler" style={{'--progress':projects.length>1?index/(projects.length-1):0} as CSSProperties}><i/><input className="transport-range" type="range" min={0} max={Math.max(0,projects.length-1)} step={1} value={index} disabled={disabled||projects.length<2} aria-label={transportCopy[language].seek} aria-valuetext={`${index+1} / ${projects.length} · ${current.title}`} aria-describedby="transport-instructions" onChange={event=>step(Number(event.currentTarget.value)-index)}/></span><span aria-hidden="true">{String(projects.length).padStart(2,'0')}</span></div><span className="sr-only" id="transport-instructions">{transportCopy[language].hint}</span></div>
   <button data-magnetic type="button" onClick={()=>step(1)} disabled={disabled||projects.length<2} aria-label={copy.next}><span className="magnetic-ink"><span className="transport-bracket">[</span><span><span className="transport-frame">FRAME </span>NEXT</span><svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden="true"><path d="M1 0L8 5L1 10Z"/></svg><span className="transport-bracket">]</span></span></button>
  </div>
  <p className="sr-only" role="status" aria-live="polite">{current.title}, {index+1} / {projects.length}</p>
 </div>;
}

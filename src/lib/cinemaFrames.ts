import { recordGeometryRead, sampleFrame, setFramePhase } from './frameDiagnostics';
export interface CinemaFrame { time: number; delta: number; scrollY: number; width: number; height: number }
type Write = () => void;
type Measure = (frame: CinemaFrame) => Write | undefined | void;
const measures = new Set<Measure>();
const writers = new Set<(frame: CinemaFrame) => void>();
let previous = 0, lastY = -1, scrollUntil = 0, scrolling = false;
export { recordGeometryRead };
export function subscribeCinemaMeasure(measure: Measure) { measures.add(measure); return () => { measures.delete(measure); }; }
export function subscribeCinemaFrame(write: (frame: CinemaFrame) => void) { writers.add(write); return () => { writers.delete(write); }; }
// Lenis owns the clock. Every geometry read completes before any scene writes.
export function renderCinemaFrame(time: number) {
 if (document.hidden) { previous=0; return; }
 const frame={time,delta:previous?Math.min(50,time-previous):16.67,scrollY:window.scrollY,width:innerWidth,height:innerHeight};previous=time;
 const writes: Write[]=[];
 setFramePhase('read');
 measures.forEach(measure=>{const write=measure(frame);if(write)writes.push(write);});
 setFramePhase('write');
 if(frame.scrollY!==lastY){lastY=frame.scrollY;scrollUntil=time+140;}
 const active=time<scrollUntil;if(active!==scrolling){scrolling=active;document.documentElement.classList.toggle('is-scrolling',active);}
 writes.forEach(write=>write());
 writers.forEach(write=>write(frame));
 sampleFrame(time,frame.scrollY);
}

import type { RefObject } from 'react';
import { useScrollScene } from './useScrollScene';
import { recordGeometryRead, type CinemaFrame } from '../lib/cinemaFrames';
function measure(node:HTMLElement,frame:CinemaFrame) {
 recordGeometryRead();const rect=node.getBoundingClientRect();
 const distance=frame.height/2-(rect.top+rect.height/2);
 const image=Math.max(-16,Math.min(16,distance*.025));
 const sequence=Math.max(-120,Math.min(120,distance*.15));
 return ()=>{node.style.setProperty('--spatial-scroll',`${image.toFixed(2)}px`);node.style.setProperty('--sequence-drift',`${sequence.toFixed(2)}px`);};
}
function reset(node:HTMLElement){node.style.removeProperty('--spatial-scroll');node.style.removeProperty('--sequence-drift');}
export function useSpatialScroll(root:RefObject<HTMLElement|null>,enabled=true){useScrollScene(root,measure,reset,undefined,enabled);}

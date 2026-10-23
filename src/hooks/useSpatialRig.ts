import { useEffect } from 'react';
import { subscribeCinemaMeasure, recordGeometryRead } from '../lib/cinemaFrames';
import { useDesktopPointer, useReducedMotion } from './useMotionEnvironment';
import { recordPointer } from '../lib/frameDiagnostics';
interface Surface {node:HTMLElement;kind:'tilt'|'magnet';x:number;y:number;lift:number;active:boolean;bounds?:DOMRect}
const clamp=(value:number)=>Math.max(-1,Math.min(1,value));
const properties=['--tilt-x','--tilt-y','--lift','--shadow-x','--shadow-y','--mag-x','--mag-y','--pointer-x','--pointer-y'];
function clear(node:HTMLElement){properties.forEach(key=>node.style.removeProperty(key));node.classList.remove('is-tilting','is-magnetic');}
export function useSpatialRig(blocked:boolean){
 const desktop=useDesktopPointer(),reduced=useReducedMotion();
 useEffect(()=>{
  const root=document.getElementById('top');if(!root||!desktop||reduced||blocked)return;
  const surfaces=new Map<HTMLElement,Surface>();let tilt:Surface|undefined,magnet:Surface|undefined;
  let clientX=0,clientY=0,lastScroll=NaN,lastWidth=0,lastHeight=0;
  const settle=(surface?:Surface)=>{if(surface)surface.active=false;};
  const select=(node:HTMLElement|null,kind:Surface['kind'])=>{
   if(!node||!root.contains(node))return;
   let surface=surfaces.get(node);if(!surface){surface={node,kind,x:0,y:0,lift:0,active:true};surfaces.set(node,surface);}
   surface.active=true;surface.bounds=undefined;return surface;
  };
  const move=(event:PointerEvent)=>{
   if(event.pointerType!=='mouse')return;clientX=event.clientX;clientY=event.clientY;recordPointer(clientX,clientY);
   const target=event.target instanceof Element?event.target:null;
   const nextTilt=target?.closest<HTMLElement>('[data-spatial-trigger]')??null;
   const nextMagnet=target?.closest<HTMLElement>('[data-magnetic]')??null;
   if(tilt?.node!==nextTilt){settle(tilt);tilt=select(nextTilt,'tilt');}
   if(magnet?.node!==nextMagnet){settle(magnet);magnet=select(nextMagnet,'magnet');}
  };
  const leave=()=>{settle(tilt);settle(magnet);tilt=undefined;magnet=undefined;};
  const unsubscribe=subscribeCinemaMeasure(frame=>{
   if(!surfaces.size)return;
   const invalid=frame.scrollY!==lastScroll||frame.width!==lastWidth||frame.height!==lastHeight;
   lastScroll=frame.scrollY;lastWidth=frame.width;lastHeight=frame.height;
   const alpha=1-Math.exp(-frame.delta/90);
   const writes:Array<()=>void>=[];
   surfaces.forEach((surface,node)=>{
    if(!node.isConnected){surfaces.delete(node);return;}
    if(surface.active&&(!surface.bounds||invalid)){recordGeometryRead();surface.bounds=node.getBoundingClientRect();}
    const bounds=surface.bounds;
    const targetX=surface.active&&bounds?clamp((clientX-bounds.left)/bounds.width*2-1):0;
    const targetY=surface.active&&bounds?clamp((clientY-bounds.top)/bounds.height*2-1):0;
    surface.x+=(targetX-surface.x)*alpha;surface.y+=(targetY-surface.y)*alpha;
    surface.lift+=((surface.active?1:0)-surface.lift)*alpha;
    const {x,y,lift,kind}=surface;
    if(!surface.active&&Math.abs(x)+Math.abs(y)+lift<.002){surfaces.delete(node);writes.push(()=>clear(node));return;}
    writes.push(()=>{
     node.classList.add(kind==='tilt'?'is-tilting':'is-magnetic');
     if(kind==='tilt'){
      node.style.setProperty('--tilt-x',`${(-y*2.5).toFixed(3)}deg`);node.style.setProperty('--tilt-y',`${(x*2.5).toFixed(3)}deg`);
      node.style.setProperty('--lift',lift.toFixed(4));node.style.setProperty('--shadow-x',`${(-x*14).toFixed(2)}px`);node.style.setProperty('--shadow-y',`${(10-y*10).toFixed(2)}px`);
      node.style.setProperty('--pointer-x',x.toFixed(4));node.style.setProperty('--pointer-y',y.toFixed(4));
     }else{node.style.setProperty('--mag-x',`${(x*3).toFixed(3)}px`);node.style.setProperty('--mag-y',`${(y*2).toFixed(3)}px`);}
    });
   });
   return ()=>writes.forEach(write=>write());
  });
  window.addEventListener('pointermove',move,{passive:true});window.addEventListener('blur',leave);document.documentElement.addEventListener('pointerleave',leave);
  return ()=>{unsubscribe();window.removeEventListener('pointermove',move);window.removeEventListener('blur',leave);document.documentElement.removeEventListener('pointerleave',leave);surfaces.forEach(({node})=>clear(node));};
 },[desktop,reduced,blocked]);
}

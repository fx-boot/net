import { useEffect, type RefObject } from 'react';
import { subscribeCinemaMeasure, type CinemaFrame } from '../lib/cinemaFrames';
import { useDesktopPointer, useReducedMotion } from './useMotionEnvironment';
import { observeScrollScene } from '../lib/sceneObservers';
export function useScrollScene<T extends HTMLElement>(root: RefObject<T|null>, measure:(node:T,frame:CinemaFrame)=>()=>void, reset:(node:T)=>void, revision?:string, enabled=true) {
 const reduced=useReducedMotion(), desktop=useDesktopPointer();
 useEffect(()=>{
  const node=root.current;if(!node)return;reset(node);if(reduced||!desktop||!enabled)return;
  let active=false,dirty=true,previousY=NaN,previousWidth=0,previousHeight=0;
  const unsubscribe=subscribeCinemaMeasure(frame=>{
   if(!active||(!dirty&&frame.scrollY===previousY&&frame.width===previousWidth&&frame.height===previousHeight))return;
   dirty=false;previousY=frame.scrollY;previousWidth=frame.width;previousHeight=frame.height;
   return measure(node,frame);
  });
  const unobserve=observeScrollScene(node,{visible:value=>{active=value;dirty=true;node.dataset.flowVisible=String(active);},resized:()=>{dirty=true;}});
  return ()=>{unsubscribe();unobserve();delete node.dataset.flowVisible;reset(node);};
 },[root,measure,reset,reduced,desktop,revision,enabled]);
}

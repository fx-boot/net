import { useEffect, type RefObject } from 'react';
import { animate, createScope, cubicBezier } from 'animejs';
import { useDesktopPointer, useReducedMotion } from './useMotionEnvironment';
// The reveal lives inside the inert visual plane, never on its hit shell.
// Large filtered duplicate bitmaps have been removed entirely.
export function useOpticalReveal(root:RefObject<HTMLElement|null>,ready=true,revision?:string){
 const desktop=useDesktopPointer(),reduced=useReducedMotion();
 useEffect(()=>{
  const node=root.current,sharp=node?.querySelector<HTMLElement>('.optical-sharp');
  if(!node||!sharp||!ready||!desktop||reduced)return;
  const scope=createScope({root});let revealed=false;
  const finish=()=>sharp.style.removeProperty('will-change');
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting||revealed)return;revealed=true;observer.disconnect();sharp.style.willChange='transform, opacity';
   scope.add(()=>{animate(sharp,{opacity:[.35,1],y:[18,0],scale:[.99,1],duration:800,ease:cubicBezier(.16,1,.3,1),onComplete:finish});});
  },{threshold:.1});observer.observe(node);
  return ()=>{observer.disconnect();scope.revert();finish();};
 },[root,ready,desktop,reduced,revision]);
}

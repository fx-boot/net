import { useEffect, useRef } from 'react';
import { subscribeCinemaFrame } from '../../lib/cinemaFrames';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';
export function FilmFlow(){
 const root=useRef<HTMLDivElement>(null),desktop=useDesktopPointer(),reduced=useReducedMotion();
 useEffect(()=>{
  const node=root.current;if(!node||!desktop||reduced)return;
  let previous=-1;
  const unsubscribe=subscribeCinemaFrame(({scrollY})=>{if(previous===scrollY)return;previous=scrollY;node.style.transform=`translate3d(0,${(-(scrollY*.06)%64).toFixed(2)}px,0)`;});
  return ()=>{unsubscribe();node.style.removeProperty('transform');};
 },[desktop,reduced]);
 return <div ref={root} className="film-flow" aria-hidden="true"/>;
}

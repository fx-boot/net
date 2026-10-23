import { useEffect, useRef } from 'react';
import { subscribeCinemaMeasure, recordGeometryRead } from '../../lib/cinemaFrames';
import { observeScrollScene } from '../../lib/sceneObservers';
import { useDesktopPointer, useReducedMotion } from '../../hooks/useMotionEnvironment';

export function AnamorphicLightSpill({variant}:{variant:'hero'|'theatre'}) {
  const root=useRef<HTMLDivElement>(null),desktop=useDesktopPointer(),reduced=useReducedMotion();
  useEffect(()=>{
    const node=root.current,parent=node?.parentElement;
    if(!node||!parent||reduced||!desktop)return;
    let active=false,dirty=true,lastY=NaN,lastWidth=0,lastHeight=0;
    const unobserve=observeScrollScene(node,{visible:value=>{active=value;dirty=true;},resized:()=>{dirty=true;}});
    const unsubscribe=subscribeCinemaMeasure(frame=>{
      if(!active||(!dirty&&lastY===frame.scrollY&&lastWidth===frame.width&&lastHeight===frame.height))return;
      dirty=false;lastY=frame.scrollY;lastWidth=frame.width;lastHeight=frame.height;
      recordGeometryRead();const rect=parent.getBoundingClientRect();
      const progress=Math.max(-1,Math.min(1,(frame.height/2-(rect.top+rect.height/2))/frame.height));
      const angle=progress*.32+Math.max(-.08,Math.min(.08,(frame.width/frame.height-1.6)*.04));
      return ()=>{node.style.setProperty('--spill-angle',`${angle.toFixed(3)}deg`);node.style.setProperty('--spill-drift',`${(progress*10).toFixed(2)}px`);};
    });
    return ()=>{unobserve();unsubscribe();node.style.removeProperty('--spill-angle');node.style.removeProperty('--spill-drift');};
  },[reduced,desktop]);
  return <div ref={root} className={`anamorphic-spill anamorphic-spill-${variant}`} aria-hidden="true"><i/><i/></div>;
}

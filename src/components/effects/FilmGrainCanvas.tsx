import { useEffect, useRef } from 'react';
import { subscribeCinemaFrame } from '../../lib/cinemaFrames';
import { useDesktopPointer, usePageVisible, useReducedMotion } from '../../hooks/useMotionEnvironment';
import { createGrainWalk, grainDimensions, GRAIN_INTERVAL } from '../../lib/grainWalk';
import { recordEffectWork } from '../../lib/frameDiagnostics';

export function FilmGrainCanvas({blocked=false}:{blocked?:boolean}) {
  const canvas=useRef<HTMLCanvasElement>(null);
  const reduced=useReducedMotion(),desktop=useDesktopPointer(),visible=usePageVisible();
  useEffect(()=>{
    const node=canvas.current;
    if(!node||!visible||blocked)return;
    const context=node.getContext('2d',{alpha:false});
    if(!context)return;
    let previousWidth=0,previousHeight=0,last=-Infinity,draws=0;
    let walk:ReturnType<typeof createGrainWalk>|undefined,frame:ImageData|undefined;
    const animated=desktop&&!reduced;
    node.dataset.grainMode=animated?'living':'still';
    const unsubscribe=subscribeCinemaFrame(({time,width,height})=>{
      const resize=width!==previousWidth||height!==previousHeight;
      if(!resize&&(!animated||time-last+.05<GRAIN_INTERVAL))return;
      const start=performance.now();
      if(resize){
        previousWidth=width;previousHeight=height;
        const size=grainDimensions(width,height);
        node.width=size.width;node.height=size.height;
        frame=context.createImageData(size.width,size.height);
        walk=createGrainWalk(size.width*size.height,1019,frame.data);
      }
      if(!walk||!frame)return;
      walk();context.putImageData(frame,0,0);
      // Never catch up with multiple draws after a missed frame or background pause.
      last=time;draws++;
      node.dataset.grainFrames=String(draws);
      recordEffectWork('grain',performance.now()-start,{width:node.width,height:node.height,draws,mode:animated?'living':'still'});
    });
    return ()=>{unsubscribe();walk=undefined;frame=undefined;};
  },[reduced,desktop,visible,blocked]);
  return <canvas ref={canvas} className="film-grain-canvas" aria-hidden="true" data-paused={!visible||blocked||undefined}/>;
}

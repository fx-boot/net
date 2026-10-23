import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useMotionEnvironment';
import { subscribeCinemaFrame } from '../lib/cinemaFrames';
import { advanceTransportSpring } from '../lib/transportSpring';

export function useTransportSpring(root:RefObject<HTMLElement|null>,target:number) {
  const reduced=useReducedMotion();
  useEffect(()=>{
    const node=root.current;if(!node)return;
    if(reduced){node.style.setProperty('--transport-position',String(target));return;}
    const initial=Number(node.style.getPropertyValue('--transport-position'));
    let state={position:Number.isFinite(initial)?initial:target,velocity:0};
    node.setAttribute('data-transport-active','true');
    const unsubscribe=subscribeCinemaFrame(({delta})=>{
      state=advanceTransportSpring(state,target,delta);
      node.style.setProperty('--transport-position',state.position.toFixed(6));
      if(state.position===target&&state.velocity===0){node.removeAttribute('data-transport-active');unsubscribe();}
    });
    return ()=>{unsubscribe();node.removeAttribute('data-transport-active');};
  },[root,target,reduced]);
}

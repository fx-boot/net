export interface SpringState {position:number;velocity:number}
// Substeps keep the same damped gear response at both 60Hz and 120Hz.
export function advanceTransportSpring(state:SpringState,target:number,deltaMs:number):SpringState {
  let {position,velocity}=state;
  const duration=Math.min(50,Math.max(0,deltaMs))/1000;
  const steps=Math.max(1,Math.ceil(duration/(1/240))),dt=duration/steps;
  for(let i=0;i<steps;i++){
    velocity+=(190*(target-position)-23*velocity)*dt;
    position+=velocity*dt;
  }
  if(Math.abs(target-position)<.00005&&Math.abs(velocity)<.0001)return {position:target,velocity:0};
  return {position,velocity};
}

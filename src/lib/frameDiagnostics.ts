// Development-only, opt-in sampling. Counts RAF cadence, not GPU presentation.
// Read through the hidden DOM output at /?inspect=1; no production overlay.
const enabled = import.meta.env.DEV && new URLSearchParams(location.search).has('inspect');
let last = 0, lastPublish = 0, drivers = 0;
let scrollUntil = 0;
const intervals: number[] = [];
const scrollIntervals: number[] = [];
let previousScroll = -1, wheelEvents = 0, reads = 0, readAfterWrite = 0, wheelStart = 0;
let phase: 'read' | 'write' = 'read';
const boundary: Record<string,{enter:number;leave:number}> = {};
let pointer={x:0,y:0};
const effects:Record<string,{samples:number;totalMs:number;maxMs:number;details:Record<string,string|number>}>={};
export function recordEffectWork(name:string,ms:number,details:Record<string,string|number>={}) {
 if(!enabled)return;
 const effect=effects[name]??={samples:0,totalMs:0,maxMs:0,details:{}};
 effect.samples++;effect.totalMs+=ms;effect.maxMs=Math.max(effect.maxMs,ms);effect.details=details;
}
export function recordPointer(x:number,y:number){if(enabled)pointer={x,y};}
export function registerFrameDriver() { if(enabled) drivers++; return ()=>{if(enabled) drivers--;}; }
export function setFramePhase(value: typeof phase) { phase=value; }
export function recordGeometryRead() { if(enabled){reads++;if(phase==='write')readAfterWrite++;} }
export function recordBoundary(id: string, enter: boolean) { if(enabled){const item=boundary[id]??={enter:0,leave:0};if(enter)item.enter++;else item.leave++;} }
export function startFrameDiagnostics() {
 if(!enabled) return ()=>{};
 const output=document.createElement('output'); output.id='cinema-diagnostics';output.hidden=true;document.body.append(output);
 const wheel=()=>{if(!wheelEvents){intervals.length=0;scrollIntervals.length=0;wheelStart=performance.now();last=0;}wheelEvents++;};window.addEventListener('wheel',wheel,{passive:true});
 return ()=>{output.remove();window.removeEventListener('wheel',wheel);last=0;};
}
export function sampleFrame(time:number,scrollY:number) {
 if(!enabled) return;
 if(scrollY!==previousScroll){scrollUntil=time+100;previousScroll=scrollY;}
 const gap=last?time-last:0;last=time;
 if(gap>0&&gap<1000){intervals.push(gap);if(time<scrollUntil)scrollIntervals.push(gap);}
 if(intervals.length>3600)intervals.shift();if(scrollIntervals.length>3600)scrollIntervals.shift();
 if(time-lastPublish<500)return;lastPublish=time;
 const summarize=(values:number[])=>{const sorted=[...values].sort((a,b)=>a-b);const total=values.reduce((a,b)=>a+b,0);return {samples:values.length,meanMs:values.length?total/values.length:0,p95Ms:sorted[Math.floor(sorted.length*.95)]??0,maxMs:sorted.at(-1)??0,over34ms:values.filter(x=>x>34).length};};
 const output=document.getElementById('cinema-diagnostics');
 if(output)output.textContent=JSON.stringify({drivers,wheelEvents,wheelDurationMs:wheelStart?time-wheelStart:0,pointer,geometryReads:reads,readAfterWrite,boundary,effects:Object.fromEntries(Object.entries(effects).map(([name,value])=>[name,{...value,meanMs:value.totalMs/value.samples}])),all:summarize(intervals),scroll:summarize(scrollIntervals)});
}

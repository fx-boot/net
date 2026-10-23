import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {grainDimensions,createGrainWalk,GRAIN_INTERVAL} from '../src/lib/grainWalk.ts';
import {advanceTransportSpring} from '../src/lib/transportSpring.ts';
import {filmTimecode} from '../src/lib/filmTimecode.ts';

assert.deepEqual(grainDimensions(1440,900),{width:720,height:450});
assert.deepEqual(grainDimensions(3840,2160),{width:960,height:540});
assert.equal(GRAIN_INTERVAL,1000/12);
const walk=createGrainWalk(2048,1019),first=new Uint8ClampedArray(walk()),second=walk();
assert.ok(first.some((value,index)=>index%4!==3&&value!==second[index]));
assert.ok(second.every((value,index)=>index%4===3?value===255:value>=48&&value<=208));
const simulate=hz=>{let state={position:0,velocity:0},peak=0;for(let i=0;i<hz*2;i++){state=advanceTransportSpring(state,1,1000/hz);peak=Math.max(peak,state.position);}return {state,peak};};
const sixty=simulate(60),oneTwenty=simulate(120);
assert.ok(Math.abs(sixty.state.position-1)<.0001&&Math.abs(oneTwenty.state.position-1)<.0001);
assert.ok(sixty.peak>1&&sixty.peak<1.02);
assert.ok(Math.abs(sixty.peak-oneTwenty.peak)<.003);
assert.equal(filmTimecode(15.937,24),'00:00:15:22');
const sources=JSON.parse(await fs.readFile('upstream/media/scrub-frames.json','utf8'));
for(const film of Object.values(sources)){
 assert.equal(film.frames.length,4);
 const hashes=new Set();
 for(const frame of film.frames){
  const bytes=await fs.readFile(`public${frame.src}`);
  assert.ok(frame.sourceTime>=0&&frame.sourceTime<film.durationSeconds);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),frame.sha256);
  hashes.add(frame.sha256);
 }
 assert.equal(hashes.size,4);
}
console.log(JSON.stringify({grain:{quarterResolution:true,randomWalk:true,maxFps:12},spring:{sixty,oneTwenty},sourceFilms:Object.keys(sources).length,verifiedFrames:24},null,2));

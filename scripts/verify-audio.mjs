import assert from 'node:assert/strict';

import { cinemaAudio } from '../src/lib/cinemaAudio.ts';

const created = [];
let rejectResume = false;
let completeResume;
let deferResume = false;
class Param {
 value = 0;
 calls = [];
 cancelScheduledValues(time) { this.calls.push(['cancel', time]); }
 setValueAtTime(value, time) { this.value = value; this.calls.push(['set', value, time]); }
 linearRampToValueAtTime(value, time) { this.value = value; this.calls.push(['ramp', value, time]); }
}
class Node {
 gain = new Param();
 frequency = new Param();
 Q = new Param();
 connect(node) { return node; }
 disconnect() { this.disconnected = true; }
 start(time) { this.started = time ?? 0; }
 stop(time) { this.stopped = time ?? 0; if (this.onended) queueMicrotask(() => this.onended()); }
}
class Context {
 state = 'suspended';
 sampleRate = 48000;
 currentTime = 0;
 destination = {};
 gains = [];
 sources = [];
 oscillators = [];
 constructor() { created.push(this); }
 createGain() { const node = new Node(); this.gains.push(node); return node; }
 createOscillator() { const node = new Node(); this.oscillators.push(node); return node; }
 createBiquadFilter() { return new Node(); }
 createBufferSource() { const node = new Node(); this.sources.push(node); return node; }
 createBuffer(channels, count) { assert.equal(channels, 1); return { length: count, getChannelData: () => new Float32Array(count) }; }
 async resume() {
  if (rejectResume) throw new Error('NotAllowedError');
  if (deferResume) await new Promise(resolve => { completeResume = resolve; });
  this.state = 'running'; this.onstatechange?.();
 }
 async suspend() { this.state = 'suspended'; this.onstatechange?.(); }
 async close() { this.state = 'closed'; this.onstatechange?.(); }
}
const win = new EventTarget();
win.AudioContext = Context;
const doc = new EventTarget();
doc.hidden = false;
doc.hasFocus = () => true;
globalThis.window = win;
globalThis.document = doc;
globalThis.AudioContext = Context;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const checks = [];
const ok = name => checks.push(name);

const firstOwner = cinemaAudio.mount();
const lastOwner = cinemaAudio.mount();
cinemaAudio.playMechanicalClick();
assert.equal(created.length, 0);
assert.equal(cinemaAudio.getSnapshot().contextState, 'uninitialized');
ok('Mount, subscription and non-consenting interactions create no AudioContext.');

assert.equal(await cinemaAudio.toggleAtmosphere(), true);
const context = created[0];
assert.equal(created.length, 1);
assert.equal(context.oscillators[0].frequency.value, 50);
assert.equal(context.gains[1].gain.value, 10 ** (-36 / 20));
assert.equal(cinemaAudio.getSnapshot().active, true);
assert.ok(context.gains[0].gain.calls.some(call => call[0] === 'ramp' && call[2] === 0.24));
ok('Explicit opt-in creates one 50 Hz oscillator at -36 dBFS peak amplitude, with a 240 ms gain ramp.');

cinemaAudio.playMechanicalClick();
assert.equal(context.sources.length, 1);
assert.equal(context.sources[0].buffer.length, 720);
assert.equal(context.sources[0].stopped, 0.015);
cinemaAudio.playMechanicalClick();
assert.equal(context.sources.length, 1);
ok('Mechanical impulse is 15 ms at 48 kHz, filtered, reused and rate limited.');

firstOwner();
win.dispatchEvent(new Event('blur'));
assert.equal(context.state, 'suspended');
assert.equal(cinemaAudio.getSnapshot().active, false);
assert.equal(cinemaAudio.getSnapshot().status, 'paused');
win.dispatchEvent(new Event('focus'));
assert.equal(context.state, 'suspended');
ok('Ref-counted lifecycle retains blur protection after its first owner unmounts; focus never resumes sound.');

await cinemaAudio.toggleAtmosphere();
cinemaAudio.setBlocked(true);
assert.equal(context.state, 'suspended');
assert.equal(cinemaAudio.getSnapshot().active, false);
cinemaAudio.setBlocked(false);
assert.equal(context.state, 'suspended');
await cinemaAudio.toggleAtmosphere();
assert.equal(created.length, 1);
doc.hidden = true;
doc.dispatchEvent(new Event('visibilitychange'));
assert.equal(context.state, 'suspended');
doc.hidden = false;
doc.dispatchEvent(new Event('visibilitychange'));
assert.equal(cinemaAudio.getSnapshot().active, false);
ok('Dialog and hidden-page interruptions silence immediately; close/visibility restoration never auto-resumes.');

await cinemaAudio.toggleAtmosphere();
context.state = 'interrupted';
context.onstatechange();
assert.equal(context.gains[0].gain.value, 0);
assert.equal(cinemaAudio.getSnapshot().active, false);
context.state = 'running';
context.onstatechange();
assert.equal(context.gains[0].gain.value, 0);
assert.equal(cinemaAudio.getSnapshot().active, false);
ok('Browser/OS audio interruptions zero the output, preventing unsolicited sound if the browser restores a context.');

await cinemaAudio.toggleAtmosphere();
await cinemaAudio.toggleAtmosphere();
assert.equal(cinemaAudio.getSnapshot().status, 'off');
await delay(65);
assert.equal(context.state, 'suspended');
const sourceCount = context.sources.length;
cinemaAudio.playMechanicalClick();
assert.equal(context.sources.length, sourceCount);
lastOwner();
assert.equal(context.state, 'closed');
assert.equal(cinemaAudio.getSnapshot().contextState, 'uninitialized');
ok('OFF prevents click synthesis, ramps down, suspends; final unmount closes the context and clears consent.');

win.AudioContext = undefined;
assert.equal(await cinemaAudio.toggleAtmosphere(), false);
assert.equal(cinemaAudio.getSnapshot().status, 'unavailable');
cinemaAudio.dispose();
win.AudioContext = Context;
rejectResume = true;
assert.equal(await cinemaAudio.toggleAtmosphere(), false);
assert.equal(cinemaAudio.getSnapshot().status, 'error');
assert.equal(cinemaAudio.getSnapshot().active, false);
rejectResume = false;
assert.equal(await cinemaAudio.toggleAtmosphere(), true);
cinemaAudio.dispose();
ok('Unsupported browsers and rejected autoplay promises remain silent, publish accessible error states and allow retry.');

deferResume = true;
const starting = cinemaAudio.toggleAtmosphere();
assert.equal(cinemaAudio.getSnapshot().status, 'loading');
assert.equal(await cinemaAudio.toggleAtmosphere(), false);
completeResume();
assert.equal(await starting, false);
assert.equal(cinemaAudio.getSnapshot().status, 'off');
assert.equal(cinemaAudio.getSnapshot().active, false);
await delay(65);
assert.equal(created.at(-1).state, 'suspended');
assert.equal(created.at(-1).gains[0].gain.value, 0);
cinemaAudio.dispose();
ok('Rapid OFF during a pending resume cancels authorization, keeps the output gain at zero and suspends the stale context.');

const result = { checkedAt: new Date().toISOString(), passed: checks.length, checks, note: 'Mocked Web Audio contract assertions; browser output and subjective acoustic level require separate browser/device validation.' };

console.log(JSON.stringify(result, null, 2));

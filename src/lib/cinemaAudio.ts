/**
 * Optional projection-room sound. No AudioContext exists before an explicit
 * sound-button gesture; consent is intentionally never persisted.
 */
export type CinemaAudioStatus = 'off' | 'loading' | 'on' | 'paused' | 'blocked' | 'unavailable' | 'error';

export interface CinemaAudioSnapshot {
 readonly enabled: boolean;
 readonly active: boolean;
 readonly status: CinemaAudioStatus;
 readonly contextState: string;
}

interface AudioGraph {
 context: AudioContext;
 master: GainNode;
 hum: OscillatorNode;
 humGain: GainNode;
 click: AudioBuffer;
}

const HUM_AMPLITUDE = 10 ** (-36 / 20);
const listeners = new Set<() => void>();
let snapshot: CinemaAudioSnapshot = { enabled: false, active: false, status: 'off', contextState: 'uninitialized' };
let graph: AudioGraph | undefined;
let modalBlocked = false;
let owners = 0;
let revision = 0;
let suspendTimer: ReturnType<typeof setTimeout> | undefined;
let lastClickAt = -Infinity;
let detachLifecycle: (() => void) | undefined;

function publish(update: Partial<CinemaAudioSnapshot>) {
 const next = { ...snapshot, ...update };
 if (Object.keys(next).every(key => next[key as keyof CinemaAudioSnapshot] === snapshot[key as keyof CinemaAudioSnapshot])) return;
 snapshot = next;
 listeners.forEach(listener => listener());
}

function clearSuspendTimer() {
 if (suspendTimer !== undefined) clearTimeout(suspendTimer);
 suspendTimer = undefined;
}

function canPlay() {
 return !modalBlocked && !document.hidden && document.hasFocus();
}

function createGraph(): AudioGraph | undefined {
 if (typeof window.AudioContext !== 'function') return;
 const context = new AudioContext({ latencyHint: 'interactive' });
 const master = context.createGain();
 master.gain.value = 0;
 master.connect(context.destination);
 const hum = context.createOscillator();
 const humGain = context.createGain();
 hum.type = 'sine';
 hum.frequency.value = 50;
 humGain.gain.value = HUM_AMPLITUDE;
 hum.connect(humGain).connect(master);
 hum.start();
 // A single reusable 15 ms decaying noise impulse. A per-play low-pass removes
 // the sharp digital edge; the gain ceiling remains below the quiet hum.
 const sampleCount = Math.max(1, Math.floor(context.sampleRate * 0.015));
 const click = context.createBuffer(1, sampleCount, context.sampleRate);
 const samples = click.getChannelData(0);
 let seed = 104729;
 for (let index = 0; index < samples.length; index++) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  const progress = index / Math.max(1, samples.length - 1);
  const envelope = Math.sin(Math.PI * progress) ** 2 * Math.exp(-progress * 5);
  samples[index] = ((seed / 0x100000000) * 2 - 1) * envelope;
 }
 const result = { context, master, hum, humGain, click };
 context.onstatechange = () => {
  if (graph !== result) return;
  const stopped = context.state !== 'running' && snapshot.active;
  publish({ contextState: context.state });
  // Some mobile browsers can restore an interrupted context themselves. Zero
  // its output as well as suspending it, so restoration cannot restart a hum.
  if (stopped) silence('paused', true, true);
 };
 return result;
}

function silence(status: CinemaAudioStatus, keepConsent: boolean, immediate = false) {
 revision++;
 clearSuspendTimer();
 const current = graph;
 publish({ enabled: keepConsent && snapshot.enabled, active: false, status });
 if (!current || current.context.state === 'closed') return;
 const now = current.context.currentTime;
 current.master.gain.cancelScheduledValues(now);
 if (immediate) current.master.gain.setValueAtTime(0, now);
 else {
  current.master.gain.setValueAtTime(current.master.gain.value, now);
  current.master.gain.linearRampToValueAtTime(0, now + 0.04);
 }
 const suspend = () => {
  suspendTimer = undefined;
  if (graph !== current || snapshot.active) return;
  void current.context.suspend().catch(() => { /* A context being closed is already silent. */ });
 };
 if (immediate) suspend();
 else suspendTimer = setTimeout(suspend, 52);
}

async function toggleAtmosphere(): Promise<boolean> {
 if (snapshot.active || snapshot.status === 'loading') {
  silence('off', false);
  return false;
 }
 if (!canPlay()) {
  silence('blocked', false, true);
  return false;
 }
 const request = ++revision;
 clearSuspendTimer();
 publish({ enabled: true, active: false, status: 'loading' });
 try {
  if (!graph || graph.context.state === 'closed') graph = createGraph();
  const current = graph;
  if (!current) {
   publish({ enabled: false, status: 'unavailable' });
   return false;
  }
  await current.context.resume();
  if (request !== revision || graph !== current) return false;
  if (!canPlay()) { silence('paused', true, true); return false; }
  if (current.context.state !== 'running') throw new Error('Audio context did not resume');
  const now = current.context.currentTime;
  current.master.gain.cancelScheduledValues(now);
  current.master.gain.setValueAtTime(0, now);
  current.master.gain.linearRampToValueAtTime(1, now + 0.24);
  publish({ enabled: true, active: true, status: 'on', contextState: current.context.state });
  return true;
 } catch {
  if (request === revision) silence('error', false, true);
  return false;
 }
}

function playMechanicalClick() {
 const current = graph;
 if (!current || !snapshot.active || current.context.state !== 'running' || !canPlay()) return;
 const now = current.context.currentTime;
 if (now - lastClickAt < 0.04) return;
 lastClickAt = now;
 const source = current.context.createBufferSource();
 const filter = current.context.createBiquadFilter();
 const gain = current.context.createGain();
 source.buffer = current.click;
 filter.type = 'lowpass';
 filter.frequency.value = 1800;
 filter.Q.value = 0.55;
 gain.gain.value = 0.012;
 source.connect(filter).connect(gain).connect(current.master);
 source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
 source.start(now);
 source.stop(now + 0.015);
}

function setBlocked(blocked: boolean) {
 modalBlocked = blocked;
 if (blocked && (snapshot.enabled || snapshot.active)) silence('paused', true, true);
 // Closing a dialog never resumes sound by itself: the next sound-button
 // gesture is required, just as after a tab switch or window blur.
}

function dispose() {
 revision++;
 clearSuspendTimer();
 const current = graph;
 graph = undefined;
 lastClickAt = -Infinity;
 publish({ enabled: false, active: false, status: 'off', contextState: 'uninitialized' });
 if (!current) return;
 current.context.onstatechange = null;
 current.master.gain.value = 0;
 try { current.hum.stop(); } catch { /* An already-stopped oscillator is silent. */ }
 current.hum.disconnect(); current.humGain.disconnect(); current.master.disconnect();
 if (current.context.state !== 'closed') void current.context.close().catch(() => { /* No live graph remains. */ });
}

function mount() {
 owners++;
 if (owners === 1) {
  const interrupt = () => {
   if (snapshot.enabled || snapshot.active) silence('paused', true, true);
  };
  const visibility = () => { if (document.hidden) interrupt(); };
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('blur', interrupt);
  window.addEventListener('pagehide', interrupt);
  detachLifecycle = () => {
   document.removeEventListener('visibilitychange', visibility);
   window.removeEventListener('blur', interrupt);
   window.removeEventListener('pagehide', interrupt);
  };
 }
 let mounted = true;
 return () => {
  if (!mounted) return;
  mounted = false;
  owners--;
  if (owners !== 0) return;
  detachLifecycle?.();
  detachLifecycle = undefined;
  dispose();
 };
}

export const cinemaAudio = {
 toggleAtmosphere, playMechanicalClick, setBlocked, mount, dispose,
 subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
 getSnapshot: () => snapshot,
};

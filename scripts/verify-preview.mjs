import assert from 'node:assert/strict';
import { PreviewPlayback } from '../src/lib/previewPlayback.ts';

const player = new PreviewPlayback(), playing = new Set(), events = [];
const register = (name, priority) => player.register({ priority,
 start: () => { playing.add(name); events.push(`start:${name}`); assert.equal(playing.size, 1, 'never run concurrent preview decoders'); },
 stop: () => { playing.delete(name); events.push(`stop:${name}`); },
});
const hero = register('hero', 10), center = register('center', 20);
hero.setEligible(true); assert.deepEqual([...playing], ['hero']);
center.setEligible(true); assert.deepEqual([...playing], ['center']);
assert.deepEqual(events.slice(-2), ['stop:hero', 'start:center']);
hero.setEligible(false); assert.deepEqual([...playing], ['center']);
player.setBlocked(true); assert.equal(playing.size, 0);
player.setBlocked(false); assert.deepEqual([...playing], ['center']);
for (let i = 0; i < 100; i++) {
 const next = register(`film-${i}`, 20);
 center.setEligible(false); next.setEligible(true);
 assert.equal(playing.size, 1); next.release();
 center.setEligible(true);
}
center.setEligible(false); assert.equal(playing.size, 0);
hero.setEligible(true); assert.deepEqual([...playing], ['hero']);
center.release(); hero.release(); assert.equal(playing.size, 0);
assert.ok(!hero.ownsPlayback());
console.log('PASS preview arbitration: hero/center handoff, modal blocking, 100 rapid film changes, offscreen pause and cleanup');

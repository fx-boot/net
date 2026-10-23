import assert from 'node:assert/strict';
import { reelPosition, seekTime, timecode, durationLabel } from '../src/lib/reelTimeline.ts';
const chapters = [0, 1.5, 6.25, 13].map((start, index) => ({ id: String(index), projectId: 'fixture', start }));
assert.deepEqual(reelPosition(6.25, 16.08, chapters), { chapterId: '2', progress: 6.25 / 16.08 });
assert.equal(reelPosition(1.49, 16.08, chapters).chapterId, '0');
assert.equal(reelPosition(1.5, 16.08, chapters).chapterId, '1');
assert.equal(reelPosition(16.08, 16.08, chapters).progress, 1);
assert.equal(reelPosition(40, 16.08, chapters).progress, 1);
assert.equal(reelPosition(-4, 16.08, chapters).progress, 0);
for (const invalid of [0, NaN, Infinity, -1]) {
  assert.equal(seekTime(6, invalid), null);
  assert.deepEqual(reelPosition(6, invalid, chapters), { chapterId: null, progress: 0 });
}
assert.equal(seekTime(100, 16.08), 16.08 - 0.05);
assert.equal(seekTime(-1, 16.08), 0);
assert.equal(seekTime(NaN, 16.08), null);
assert.equal(timecode(3661.5, 30), '01:01:01:15');
assert.equal(durationLabel(83.9), '01:23');
console.log('Passed: unequal chapters, 16.08s duration, 30fps, boundaries and invalid metadata.');

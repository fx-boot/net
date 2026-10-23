import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

// Derive publication media from already licensed local masters; no remote fetch.
const ffmpeg = process.env.FFMPEG_PATH || 'D:/网页设计/frame-portfolio/.tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const aperture = 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:536,setsar=1';
const outputs = [];
const run = args => {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || result.error?.message || 'FFmpeg failed');
};
const encode = ['-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', '24'];
const sources = {
  refraction: { local: 'public/media/video/refraction-full.mp4', sourceUrl: 'https://mixkit.co/free-stock-video/model-in-western-fashion-seen-through-acrylic-101645/', durationSeconds: 18.44, sourceFrameRate: 23.98 },
  heat: { local: 'public/media/video/heat-full.mp4', sourceUrl: 'https://mixkit.co/free-stock-video/performance-of-a-contemporary-dancer-41409/', durationSeconds: 19.02, sourceFrameRate: 23.98 },
  night: { local: 'public/media/video/night-full.mp4', sourceUrl: 'https://mixkit.co/free-stock-video/city-seen-from-the-heights-at-night-5011/', durationSeconds: 25.48, sourceFrameRate: 25 },
};

const loop = 'public/media/video/cinema-refraction-loop.mp4';
run(['-ss', '3', '-i', sources.refraction.local, '-t', '10', '-vf', aperture, ...encode, loop]);
outputs.push({ local: loop, kind: 'motion-loop', sources: ['refraction'], sourceStart: 3, durationSeconds: 10, width: 1280, height: 536, frameRate: 24, audio: false });

const reel = 'public/media/video/cinema-showreel.mp4';
run(['-ss', '3', '-t', '4', '-i', sources.refraction.local, '-ss', '5', '-t', '4', '-i', sources.heat.local, '-ss', '8', '-t', '4', '-i', sources.night.local,
  '-filter_complex', `[0:v]${aperture},fps=24,tpad=stop_mode=clone:stop_duration=0.2,trim=duration=4,setpts=PTS-STARTPTS[a];[1:v]${aperture},fps=24,tpad=stop_mode=clone:stop_duration=0.2,trim=duration=4,setpts=PTS-STARTPTS[b];[2:v]${aperture},fps=24,tpad=stop_mode=clone:stop_duration=0.2,trim=duration=4,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[out]`,
  '-map', '[out]', ...encode, reel]);
outputs.push({ local: reel, kind: 'hero-edit', sources: ['refraction', 'heat', 'night'], chapters: [{ source: 'refraction', sourceStart: 3, start: 0 }, { source: 'heat', sourceStart: 5, start: 4 }, { source: 'night', sourceStart: 8, start: 8 }], durationSeconds: 12, width: 1280, height: 536, frameRate: 24, audio: false });

for (const [index, sourceTime] of [3, 7, 11, 15].entries()) {
  const local = `public/media/stills/cinema-refraction-${index + 1}.jpg`;
  run(['-ss', String(sourceTime), '-i', sources.refraction.local, '-frames:v', '1', '-vf', aperture, '-q:v', '2', local]);
  outputs.push({ local, kind: 'source-time-still', sources: ['refraction'], sourceTime, width: 1280, height: 536 });
}
for (const [name, sourceTime] of [['cinema-refraction', 7], ['cinema-showreel', 3]]) {
  const local = `public/media/posters/${name}.jpg`;
  run(['-ss', String(sourceTime), '-i', sources.refraction.local, '-frames:v', '1', '-vf', aperture, '-q:v', '2', local]);
  outputs.push({ local, kind: 'poster', sources: ['refraction'], sourceTime, width: 1280, height: 536 });
}
for (const output of outputs) {
  const bytes = await fs.readFile(output.local);
  output.bytes = bytes.length;
  output.sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
  output.src = `/${path.posix.relative('public', output.local)}`;
}
await fs.writeFile('upstream/media/cinema-motion.json', JSON.stringify({ generated: '2026-10-23', licenseUrl: 'https://mixkit.co/license/#videoFree', sources, outputs }, null, 2) + '\n');
const manifestPath = 'upstream/media/published-assets.json';
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const replacements = new Map(outputs.map(({ local, bytes, sha256 }) => [local, { local, bytes, sha256 }]));
const merged = manifest.map(record => replacements.get(record.local) || record);
for (const [local, record] of replacements) if (!manifest.some(item => item.local === local)) merged.push(record);
await fs.writeFile(manifestPath, JSON.stringify(merged, null, 2) + '\n');
console.log(`Prepared ${outputs.length} silent cinematic derivatives; ${outputs.reduce((sum, item) => sum + item.bytes, 0)} bytes total.`);

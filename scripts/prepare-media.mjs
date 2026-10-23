import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';

const ffmpeg = process.env.FFMPEG_PATH || 'D:/网页设计/frame-portfolio/.tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const entries = [
  [1932, 'tide', 'sea-waves-and-big-rocks'],
  [5011, 'night', 'city-seen-from-the-heights-at-night'],
  [41412, 'between', 'artistic-performance-of-a-pair-of-dancers'],
  [44605, 'wild', 'take-area-over-a-considerable-forest'],
  [41409, 'heat', 'performance-of-a-contemporary-dancer'],
  [101645, 'refraction', 'model-in-western-fashion-seen-through-acrylic'],
  [2181, 'portrait', 'photographer-in-a-forest'],
];
for (const dir of ['public/media/video', 'public/media/posters', 'public/media/stills', 'upstream/media']) await fs.mkdir(dir, { recursive: true });
function run(args) {
  const r = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw Error(r.stderr || r.error?.message);
}
const results = JSON.parse(await fs.readFile('upstream/media/manifest.json', 'utf8').catch(() => '[]'));
for (const [id, slug, title] of entries) {
  if (results.some(entry => entry.slug === slug)) continue;
  const page = `https://mixkit.co/free-stock-video/${title}-${id}/`;
  const response = await fetch(page, { signal: AbortSignal.timeout(20000) });
  const html = await response.text();
  if (!response.ok || !html.includes('data-license="videoFree"')) throw Error(`Free license not verified: ${page}`);
  await fs.writeFile(`upstream/media/${slug}-source.html`, html);
  const url = id === 101645 ? 'https://assets.mixkit.co/nie07c56ybs0w2m4zhfolf4gcg8u' : `https://assets.mixkit.co/videos/${id}/${id}-1080.mp4`;
  const destination = `public/media/video/${slug}-full.mp4`;
  const existing = await fs.stat(destination).catch(() => null);
  if (!existing) {
    const r = await fetch(url, { signal: AbortSignal.timeout(90000) });
    if (!r.ok || !r.headers.get('content-type')?.includes('video')) throw Error(`Not a video: ${url} ${r.status}`);
    await fs.writeFile(destination, Buffer.from(await r.arrayBuffer()));
  }
  const raw = await fs.readFile(destination);
  if (raw.subarray(4, 8).toString() !== 'ftyp') throw Error(`Invalid MP4 signature: ${slug}`);
  // Decode the source during extraction, rather than trusting filename/HTTP headers.
  run(['-ss', '2', '-i', destination, '-frames:v', '1', '-q:v', '2', `public/media/posters/${slug}.jpg`]);
  run(['-ss', '5', '-i', destination, '-frames:v', '1', '-q:v', '2', `public/media/stills/${slug}-2.jpg`]);
  run(['-ss', '1', '-i', destination, '-t', '7', '-an', '-vf', 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720', '-c:v', 'libx264', '-preset', 'fast', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `public/media/video/${slug}-preview.mp4`]);
  const probe = spawnSync(ffmpeg, ['-hide_banner', '-i', destination], { encoding: 'utf8' }).stderr;
  results.push({ id, slug, page, sourceUrl: url, licenseUrl: 'https://mixkit.co/license/#videoFree', author: 'Mixkit contributor (see source page)', local: destination, bytes: raw.length, sha256: crypto.createHash('sha256').update(raw).digest('hex'), probe });
  await fs.writeFile('upstream/media/manifest.json', JSON.stringify(results, null, 2));
  console.log(`Verified + decoded ${slug}: ${raw.length} bytes`);
}
// A silent 24-second sample reel; no synthesized tone or background audio.
const order = ['tide', 'night', 'between', 'wild', 'heat', 'refraction'];
for (const slug of order) run(['-i', `public/media/video/${slug}-preview.mp4`, '-t', '4', '-an', '-vf', 'fps=24', '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-pix_fmt', 'yuv420p', `upstream/media/${slug}-reel.mp4`]);
await fs.writeFile('upstream/media/reel.txt', order.map(slug => `file '${slug}-reel.mp4'`).join('\n'));
run(['-f', 'concat', '-safe', '0', '-i', 'upstream/media/reel.txt', '-c:v', 'copy', '-an', '-movflags', '+faststart', 'public/media/video/showreel-silent.mp4']);
console.log('Silent showreel prepared.');

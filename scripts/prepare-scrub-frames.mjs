import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const ffmpeg = process.env.FFMPEG_PATH || 'D:/网页设计/frame-portfolio/.tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const slugs = ['tide', 'night', 'between', 'wild', 'heat', 'refraction'];
const records = {};
for (const slug of slugs) {
  const source = `public/media/video/${slug}-full.mp4`;
  const probe = spawnSync(ffmpeg, ['-hide_banner', '-i', source], { encoding: 'utf8' }).stderr;
  const match = probe.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
  if (!match) throw new Error(`Unable to probe ${source}`);
  const durationSeconds = Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
  const sourceFrameRate = Number(probe.match(/([\d.]+) fps/)?.[1]);
  if (!sourceFrameRate) throw new Error(`Missing source frame rate: ${source}`);
  const frameRate = 24;
  const end = Math.max(0, durationSeconds - 2 / sourceFrameRate);
  const frames = [];
  for (let index = 0; index < 4; index++) {
    const sourceTime = Math.round((end * index / 3) * 1000) / 1000;
    const local = `public/media/stills/${slug}-scrub-${index + 1}.jpg`;
    const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(sourceTime), '-i', source, '-frames:v', '1', '-vf', 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720', '-q:v', '3', local], { encoding: 'utf8' });
    if (result.status !== 0) throw new Error(result.stderr || result.error?.message);
    const bytes = await fs.readFile(local);
    frames.push({ src: `/${path.posix.relative('public', local)}`, sourceTime, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
  }
  records[slug] = { source, durationSeconds, sourceFrameRate, frameRate, frames };
  console.log(`${slug}: ${durationSeconds}s, ${sourceFrameRate} fps, four decoded frames`);
}
await fs.writeFile('upstream/media/scrub-frames.json', JSON.stringify(records, null, 2) + '\n');
await fs.writeFile('src/data/scrubFrames.ts', `// Generated from the existing licensed MP4s by scripts/prepare-scrub-frames.mjs.\n// sourceFrameRate is the ffmpeg probe value; frameRate is the nominal TC display base.\nexport const scrubFrameSources = ${JSON.stringify(records, null, 2)} as const;\n`);

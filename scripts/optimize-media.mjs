import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
const ffmpeg = process.env.FFMPEG_PATH || 'D:/网页设计/frame-portfolio/.tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const manifest = JSON.parse(await fs.readFile('upstream/media/manifest.json', 'utf8'));
await fs.mkdir('.tools/media-originals', { recursive: true });
for (const item of manifest) {
  const archive = `.tools/media-originals/${item.slug}-full.mp4`;
  if (!await fs.stat(archive).catch(() => null)) await fs.copyFile(item.local, archive);
  const original = await fs.readFile(archive);
  if (crypto.createHash('sha256').update(original).digest('hex') !== item.sha256) throw Error(`Original hash mismatch: ${item.slug}`);
  if (item.published) continue;
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', archive, '-map', '0:v:0', '-map', '0:a?', '-c:v', 'libx264', '-preset', 'fast', '-crf', '25', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', item.local], { encoding: 'utf8' });
  if (result.status !== 0) throw Error(result.stderr || result.error?.message);
  const published = await fs.readFile(item.local);
  item.rawArchive = archive;
  item.published = { local: item.local, bytes: published.length, sha256: crypto.createHash('sha256').update(published).digest('hex'), transform: 'Full duration and 1080p preserved; H.264 CRF25, AAC if source audio exists, faststart' };
  await fs.writeFile('upstream/media/manifest.json', JSON.stringify(manifest, null, 2));
  console.log(`${item.slug}: ${(original.length / 1e6).toFixed(1)} MB → ${(published.length / 1e6).toFixed(1)} MB`);
}
const assets = [];
for (const folder of ['public/media/video', 'public/media/posters', 'public/media/stills', 'public/fonts']) {
  for (const file of await fs.readdir(folder)) {
    const local = path.posix.join(folder, file), bytes = await fs.readFile(local);
    assets.push({ local, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
  }
}
await fs.writeFile('upstream/media/published-assets.json', JSON.stringify(assets, null, 2));

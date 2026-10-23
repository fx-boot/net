import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { inspectMp4, inspectJpeg } from './lib/inspect-hero-media.mjs';

const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const readJson = async path => JSON.parse(await fs.readFile(path, 'utf8'));
const languages = ['zh', 'en', 'ja', 'ko'];
const existingWorkIds = new Set(['1932', '5011', '41412', '44605', '41409', '101645', '2181']);
const baselineRecordsSha = '89430d18d2059b033a0c2621b0f124ff8b4d7f4bd4e2aa7098b13950b65a34fc';
const manifest = await readJson('upstream/media/hero-assets.json');
const published = await readJson('upstream/media/published-assets.json');
assert.equal(manifest.schemaVersion, 1);
assert.deepEqual(manifest.sources.map(entry => entry.language), languages, 'Exactly four regional Hero records in the agreed order');
assert.equal(manifest.baselinePublishedAssetsCount, 198);
assert.equal(manifest.baselinePublishedRecordsSha256, baselineRecordsSha);
// Keep the original media baseline verifiable while permitting the two
// explicitly recorded, authored brand-label corrections (never video assets).
const brandRevision = await readJson('upstream/media/brand-identity-updates.json');
assert.deepEqual(brandRevision.updates.map(change => change.before.local), ['public/media/director/README.md', 'public/media/fallback.svg']);
for (const { before, after } of brandRevision.updates) {
  assert.equal(before.local, after.local);
  assert.deepEqual(published.find(asset => asset.local === after.local), after);
  const bytes = await fs.readFile(after.local);
  assert.equal(bytes.length, after.bytes);
  assert.equal(sha(bytes), after.sha256);
}
const originalBaseline = published.slice(0, 198).map(asset => brandRevision.updates.find(change => change.after.local === asset.local)?.before ?? asset);
assert.equal(sha(JSON.stringify(originalBaseline)), baselineRecordsSha, 'Original 198-asset baseline must be recoverable; only the two recorded brand-label edits are allowed');
assert.equal(sha(await fs.readFile('docs/01-research-architecture.md')), '9006d3a3eee685c2815be9feb61c46894491e2601b8317f31c9e4f82684a3642', 'Protected Step 1 document changed');
assert.ok(published.every(asset => asset.local.startsWith('public/')), 'Ignored source masters must never enter the published registry');
assert.equal(new Set(published.map(asset => asset.local)).size, published.length, 'Published paths must be unique');
const heroPublished = published.filter(asset => asset.local.startsWith('public/media/hero/'));
assert.equal(heroPublished.length, 8, 'Only four loops and four posters are published');
const originalAssetHashes = new Set(published.slice(0, 198).map(asset => asset.sha256));
const sourceIds = new Set(), sourceHashes = new Set(), outputHashes = new Set();
const byLanguage = new Map();
let verifiedLocalMasters = 0;

for (const entry of manifest.sources) {
  const id = entry.sourceId.replace(/^mixkit-/, '');
  assert.match(id, /^\d+$/);
  assert.ok(!existingWorkIds.has(id), `${entry.language} reuses an existing portfolio source`);
  assert.ok(!sourceIds.has(id), 'Each regional Hero must have an independent source');
  sourceIds.add(id);
  assert.ok(entry.sourceUrl.endsWith(`-${id}/`) && new URL(entry.sourceUrl).hostname === 'mixkit.co', 'Official item URL must agree with source identity');
  assert.equal(new URL(entry.originalDownloadUrl).hostname, 'assets.mixkit.co');
  assert.equal(entry.license.name, 'Mixkit Stock Video Free License');
  assert.equal(entry.license.url, 'https://mixkit.co/license/#videoFree');
  assert.equal(entry.license.evidenceUrl, 'https://mixkit.co/license/modal/videoFree/');
  assert.equal(entry.license.commercialUse, true);
  assert.equal(entry.license.modification, true);
  assert.equal(entry.isPlaceholder, true);
  assert.ok(typeof entry.author === 'string' && entry.author.length > 0);
  assert.match(entry.master.sha256, /^[a-f0-9]{64}$/);
  assert.ok(!sourceHashes.has(entry.master.sha256), 'Distinct source masters required');
  assert.ok(!originalAssetHashes.has(entry.master.sha256), 'A published project derivative cannot masquerade as a native source master');
  sourceHashes.add(entry.master.sha256);
  assert.ok(entry.master.width >= 1920 && entry.master.height >= 1080, 'Native source must support Full HD without upscaling');
  assert.ok(entry.master.ignoredLocal.startsWith('.tools/hero-sources/'));
  assert.ok(!published.some(asset => asset.local === entry.master.ignoredLocal));
  // Originals are deliberately ignored. When available locally, verify their
  // actual clocks, dimensions and hashes; a fresh checkout needs edited assets only.
  let masterBytes;
  try { masterBytes = await fs.readFile(entry.master.ignoredLocal); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (masterBytes) {
    assert.equal(masterBytes.length, entry.master.bytes);
    assert.equal(sha(masterBytes), entry.master.sha256);
    const actual = inspectMp4(masterBytes).tracks.find(track => track.handler === 'vide');
    assert.ok(actual);
    assert.equal(actual.width, entry.master.width);
    assert.equal(actual.height, entry.master.height);
    assert.ok(Math.abs(actual.durationSeconds - entry.master.durationSeconds) < .001);
    verifiedLocalMasters++;
  }
  assert.equal(entry.outputs.length, 2);
  const videoEntry = entry.outputs.find(asset => asset.kind === 'hero-motion-loop');
  const posterEntry = entry.outputs.find(asset => asset.kind === 'hero-poster');
  assert.ok(videoEntry && posterEntry);
  assert.equal(videoEntry.local, `public/media/hero/${entry.language}.mp4`);
  assert.equal(posterEntry.local, `public/media/hero/${entry.language}.jpg`);
  for (const asset of entry.outputs) {
    assert.equal(asset.src, asset.local.slice('public'.length));
    const bytes = await fs.readFile(asset.local);
    assert.equal(bytes.length, asset.bytes, `${asset.local} size mismatch`);
    assert.equal(sha(bytes), asset.sha256, `${asset.local} SHA-256 mismatch`);
    assert.ok(!originalAssetHashes.has(asset.sha256), 'Hero output cannot reuse a previous published work asset');
    assert.ok(!outputHashes.has(asset.sha256), 'Hero outputs must be distinct');
    assert.notEqual(asset.sha256, entry.master.sha256, 'Publish edited derivatives, not source masters');
    outputHashes.add(asset.sha256);
    assert.deepEqual(heroPublished.find(record => record.local === asset.local), { local: asset.local, bytes: asset.bytes, sha256: asset.sha256 });
    if (asset.kind === 'hero-motion-loop') {
      assert.ok(bytes.length >= 2_000_000 && bytes.length <= 5_000_000, 'Hero loop must remain within the 2–5 MB budget');
      const actual = inspectMp4(bytes);
      assert.equal(actual.fastStart, true, 'moov must precede media data');
      assert.equal(actual.tracks.length, 1, 'Hero loop must be a single video track');
      const video = actual.tracks[0];
      assert.equal(video.handler, 'vide', 'No hidden audio track is permitted');
      assert.equal(video.codec, 'avc1');
      assert.equal(video.profile, 100, 'H.264 High profile decoder configuration required');
      assert.equal(video.width, 1920); assert.equal(video.height, 1080);
      assert.ok(video.durationSeconds >= 6 && video.durationSeconds <= 12);
      assert.ok(video.frames >= 144 && video.frameRate > 23 && video.frameRate <= 30);
      assert.equal(video.frames, asset.frames);
      assert.ok(Math.abs(video.durationSeconds - asset.durationSeconds) < .001);
      assert.ok(Math.abs(video.frameRate - asset.frameRate) < .001);
      assert.equal(asset.audioTracks, 0); assert.equal(asset.fastStart, true);
    } else {
      const actual = inspectJpeg(bytes);
      assert.equal(actual.precision, 8);
      assert.equal(actual.width, 1920); assert.equal(actual.height, 1080);
      assert.equal(asset.frame, 0, 'Poster documents the opening frame, not a different stock still');
      assert.equal(asset.derivedFrom, videoEntry.src);
    }
  }
  byLanguage.set(entry.language, entry);
}
for (const masterHash of sourceHashes) assert.ok(!outputHashes.has(masterHash), 'No regional output may publish any unedited native master');

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { heroMediaPaths, heroMediaSources } = await server.ssrLoadModule('/src/data/heroMedia.ts');
  const dictionaryModule = await server.ssrLoadModule('/src/i18n/dictionaries.ts');
  const { heroBackgroundsByLanguage, showreelsByLanguage, projectsByLanguage, reelConfig } = await server.ssrLoadModule('/src/data/mockData.ts');
  assert.deepEqual(dictionaryModule.heroMediaPaths, heroMediaPaths, 'Dictionaries re-export the single Hero path configuration');
  assert.equal(reelConfig.expectedDuration, 12, 'Full reel duration is independent of short Hero loops');
  for (const language of languages) {
    const entry = byLanguage.get(language), paths = heroMediaPaths[language], source = heroMediaSources[language];
    const video = entry.outputs.find(asset => asset.kind === 'hero-motion-loop');
    const poster = entry.outputs.find(asset => asset.kind === 'hero-poster');
    assert.deepEqual(paths, { video: video.src, poster: poster.src });
    for (const key of ['sourceId', 'sourceUrl', 'originalDownloadUrl', 'author']) assert.equal(source[key], entry[key], `${language} ${key} configuration disagrees with provenance`);
    assert.equal(source.licenseUrl, entry.license.url);
    assert.equal(source.hasAudio, false); assert.equal(source.isPlaceholder, true);
    const background = heroBackgroundsByLanguage[language];
    assert.equal(background.src, video.src); assert.equal(background.poster, poster.src);
    assert.equal(background.hasAudio, false); assert.equal(background.isPlaceholder, true);
    assert.equal(background.sourceUrl, entry.sourceUrl);
    assert.equal(background.licenseUrl, entry.license.url);
    assert.equal(background.author, entry.author);
    assert.ok(background.alt.length > 0);
    assert.notEqual(showreelsByLanguage[language].src, background.src, 'Full reel and background must remain separate');
    assert.equal(showreelsByLanguage[language].src, '/media/video/cinema-showreel.mp4', 'Existing full reel is preserved');
    for (const project of projectsByLanguage[language]) {
      for (const media of [project.cover, project.preview, project.fullFilm, ...project.stills]) {
        assert.notEqual(media.src, background.src, 'Hero must not point to a project clip');
        assert.notEqual(media.src, background.poster, 'Hero poster must be independent');
        assert.notEqual(media.sourceUrl, background.sourceUrl, 'Hero and portfolio provenance must be disjoint');
        const portfolioSourceId = media.sourceUrl.match(/-(\d+)\/?$/)?.[1];
        assert.ok(!portfolioSourceId || !sourceIds.has(portfolioSourceId), 'A portfolio source ID cannot be reused by any regional Hero');
      }
    }
  }
  const fullReel = inspectMp4(await fs.readFile('public' + showreelsByLanguage.zh.src)).tracks.find(track => track.handler === 'vide');
  assert.ok(fullReel && Math.abs(fullReel.durationSeconds - reelConfig.expectedDuration) < .05, 'Real full reel clock matches configured 12-second duration');
} finally { await server.close(); }

console.log(`Verified four independent regional Hero sources, eight edited assets, real H.264/JPEG dimensions and clocks, no audio, fast-start, 2–5 MB loops, ${verifiedLocalMasters}/4 available native masters, config/provenance mapping, separate 12-second full reel, all 198 prior asset records and unchanged Step 1 document. Published registry: ${published.length} assets.`);

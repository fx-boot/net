import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const originalDocument = await fs.readFile('docs/01-research-architecture.md');
assert.equal(sha(originalDocument), '9006d3a3eee685c2815be9feb61c46894491e2601b8317f31c9e4f82684a3642', 'Step 1 document changed');
const sources = JSON.parse(await fs.readFile('upstream/manifest.json', 'utf8'));
for (const source of sources) assert.equal(sha(await fs.readFile(source.destination)), source.sha256, source.destination);
const spatialSources = JSON.parse(await fs.readFile('upstream/spatial-references.json', 'utf8'));
for (const source of spatialSources.filter(source => source.destination)) assert.equal(sha(await fs.readFile(source.destination)), source.sha256, source.destination);
const published = JSON.parse(await fs.readFile('upstream/media/published-assets.json', 'utf8'));
for (const asset of published) {
  const bytes = await fs.readFile(asset.local);
  assert.equal(sha(bytes), asset.sha256, asset.local);
  if (asset.local.endsWith('.mp4')) assert.equal(bytes.subarray(4, 8).toString(), 'ftyp', asset.local);
  if (asset.local.endsWith('.woff2')) assert.equal(bytes.subarray(0, 4).toString(), 'wOF2', asset.local);
}
const { createServer } = await import('vite');
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { dictionaries } = await server.ssrLoadModule('/src/i18n/dictionaries.ts');
  const { editorial } = await server.ssrLoadModule('/src/i18n/editorial.ts');
  const data = await server.ssrLoadModule('/src/data/mockData.ts');
  const catalogSize = data.projectsByLanguage.zh.length;
  assert.ok(catalogSize >= 12);
  const { brandCopy } = await server.ssrLoadModule('/src/i18n/brand.ts');
  const { cinemaCopy } = await server.ssrLoadModule('/src/i18n/cinema.ts');
  const { atelierCopy } = await server.ssrLoadModule('/src/i18n/atelier.ts');
  const { breakdownCopy } = await server.ssrLoadModule('/src/i18n/breakdown.ts');
  const { audioCopy } = await server.ssrLoadModule('/src/i18n/audio.ts');
  const { scrubCopy } = await server.ssrLoadModule('/src/i18n/scrub.ts');
  const { transportCopy } = await server.ssrLoadModule('/src/i18n/transport.ts');
  const { carouselWindow, wrapIndex } = await server.ssrLoadModule('/src/lib/catalogWindow.ts');
  assert.equal(wrapIndex(-1, 12), 11);
  assert.equal(wrapIndex(50, 12), 2);
  assert.deepEqual(carouselWindow(0, 0), []);
  for (const count of [1, 2, 4, 12, 20, 50]) {
    const catalog = data.createDemoCatalog(count);
    for (const language of ['zh', 'en', 'ko', 'ja']) {
      assert.equal(catalog[language].length, count);
      assert.equal(new Set(catalog[language].map(film => film.id)).size, count);
      assert.deepEqual(catalog[language].map(film=>film.id).sort(),catalog.zh.map(film=>film.id).sort(), 'Language curation must retain exactly the same film IDs');
      assert.deepEqual(catalog[language].map(film=>film.catalogOrder), Array.from({length:count},(_,index)=>index+1));
      assert.ok(catalog[language].every((film,index,films)=>!index||(films[index-1].regionalWeight?.[language]??0)>=(film.regionalWeight?.[language]??0)), 'Regional priorities must descend');
    }
    for (const index of [0,count-1]) {
      const window = carouselWindow(count,index);
      assert.ok(window.length<=5);
      assert.equal(window.find(slot=>slot.offset===0).index,index);
      assert.ok(window.every(slot=>slot.index>=0&&slot.index<count));
    }
  }
  const keys = Object.keys(dictionaries.zh).sort();
  for (const language of ['zh', 'en', 'ko', 'ja']) {
    for(const group of [breakdownCopy,audioCopy,scrubCopy,transportCopy]) {
      assert.deepEqual(Object.keys(group[language]).sort(),Object.keys(group.zh).sort());
      const leaves=value=>typeof value==='object'&&value!==null?Object.values(value).flatMap(leaves):[value];
      assert.ok(leaves(group[language]).every(value=>typeof value==='string'&&value.length>0));
    }
    assert.deepEqual(Object.keys(atelierCopy[language]).sort(), Object.keys(atelierCopy.zh).sort(), language + ' atelier');
    assert.equal(atelierCopy[language].disciplines.length, 3);
    assert.ok(Object.values(atelierCopy[language]).flatMap(value => typeof value === 'string' ? [value] : value.flatMap(row => Object.values(row))).every(value => typeof value === 'string' && value.length > 0));
    assert.deepEqual(Object.keys(dictionaries[language]).sort(), keys, language);
    assert.deepEqual(Object.keys(cinemaCopy[language]).sort(), Object.keys(cinemaCopy.zh).sort());
    assert.ok(Object.values(cinemaCopy[language]).every(value=>typeof value==='string'&&value.length>0));
    assert.ok(Object.values(dictionaries[language]).every(value => typeof value === 'string' && value.length > 0));
    assert.deepEqual(Object.keys(editorial[language]).sort(), Object.keys(editorial.zh).sort(), language + ' editorial');
    assert.equal(editorial[language].honors.length, 3);
    assert.ok(Object.values(editorial[language]).flat().every(value => typeof value === 'string' && value.length > 0));
    assert.deepEqual(Object.keys(brandCopy[language]).sort(), Object.keys(brandCopy.zh).sort(), language + ' brand');
    assert.ok(Object.values(brandCopy[language]).every(value => typeof value === 'string' && value.length > 0));
    await fs.access('public' + data.directorsByLanguage[language].portrait.src);
    assert.deepEqual([...new Set(data.projectsByLanguage[language].map(project => project.category))].sort(), ['Commercials', 'Narrative', 'Visual Tech']);
    assert.equal(data.projectsByLanguage[language].length, catalogSize);
    for (const project of data.projectsByLanguage[language]) {
      assert.ok(project.scrub?.frames.length>=3);
      assert.ok(project.scrub.durationSeconds>0&&project.scrub.frameRate>0);
      assert.ok(project.scrub.frames.every((frame,index,frames)=>frame.sourceTime>=0&&frame.sourceTime<project.scrub.durationSeconds&&(!index||frame.sourceTime>frames[index-1].sourceTime)));
      assert.equal(project.isPlaceholder, true);
      for (const asset of [project.cover, project.preview, project.fullFilm, ...project.stills, ...project.scrub.frames]) {
        assert.equal(asset.isPlaceholder, true);
        await fs.access(`public${asset.src}`);
        await fs.access(`public${asset.fallback}`);
      }
    }
    for (const group of ['awardsByLanguage', 'clientsByLanguage', 'representativesByLanguage']) assert.ok(data[group][language].every(item => item.isPlaceholder === true));
  }
  console.log(`Verified ${sources.length} upstream hashes, ${published.length} published assets, 4 complete dictionaries (${keys.length} keys each), 4 editorial and brand dictionaries, ${catalogSize*4} localized project records, catalog scaling through 50 films and bounded carousel windows, and unchanged Step 1 document.`);
} finally { await server.close(); }

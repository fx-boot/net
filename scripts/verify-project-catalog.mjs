import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { createProjectCatalog, curateProjectEntries, expandDemoEntries, durationInSeconds, validateProjectEntries } = await server.ssrLoadModule('/src/data/projectCatalog.ts');
  const { projectEntries, projectsByLanguage } = await server.ssrLoadModule('/src/data/mockData.ts');
  const languages = ['zh', 'en', 'ko', 'ja'];
  const expectedPremieres = {
    zh: ['night', 'tide', 'refraction'], en: ['refraction', 'heat', 'night'],
    ja: ['between', 'wild', 'tide'], ko: ['heat', 'refraction', 'between'],
  };
  assert.equal(projectEntries.length, 12);
  assert.ok(projectEntries.every(entry => languages.every(language => Number.isFinite(entry.regionalWeight?.[language]))), 'All default entries declare four regional weights');
  const catalogInput = structuredClone(projectEntries);
  for (const language of languages) {
    const curatedEntries = curateProjectEntries(projectEntries, language);
    assert.deepEqual(projectsByLanguage[language].map(project => project.id), curatedEntries.map(entry => entry.id));
    assert.deepEqual(projectsByLanguage[language].slice(0, 3).map(project => project.id), expectedPremieres[language], `${language} regional premieres`);
    assert.deepEqual(projectsByLanguage[language].map(project => project.id).sort(), projectEntries.map(entry => entry.id).sort(), 'Curation preserves every stable ID');
    for (let index = 0; index < projectEntries.length; index++) {
      const entry = curatedEntries[index];
      const project = projectsByLanguage[language][index];
      assert.equal(project.catalogOrder, index + 1);
      assert.equal(project.title, entry.title[language]);
      assert.equal(project.cover.src, entry.coverPoster);
      assert.equal(project.preview.src, entry.motionLoopSrc);
      assert.equal(project.fullFilm.src, entry.fullFilmSrc);
      assert.deepEqual(project.scrub.frames.map(frame => frame.src), entry.stills);
      assert.deepEqual(project.regionalWeight, entry.regionalWeight);
    }
  }
  assert.deepEqual(projectEntries, catalogInput, 'Regional curation never mutates the canonical input list');
  const sortedInput = Object.freeze([...projectEntries]);
  createProjectCatalog(sortedInput);
  assert.equal(new Set(languages.map(language => projectsByLanguage[language][0].id)).size, 4, 'Each region has a distinct opening film');
  const original = structuredClone(projectEntries[0]);
  const production = {
    id: 'brand-film-2027', title: { zh: '品牌成片', en: 'Brand Film', ko: '브랜드 영화', ja: 'ブランド映画' },
    category: 'commercials', year: '2027', duration: '01:30', isPlaceholder: false,
    coverPoster: '/media/projects/brand-film/poster.jpg', motionLoopSrc: '/media/projects/brand-film/loop.mp4',
    fullFilmSrc: 'https://cdn.example.com/brand-film/full.mp4',
    stills: [1, 2, 3].map(index => `/media/projects/brand-film/still-${index}.jpg`),
    credits: { client: 'Brand', agency: 'Agency', dop: 'Cinematographer', production: 'LANCHUAN' },
    description: { en: 'A production film.' }, note: { zh: '导演手记。' },
  };
  const localized = createProjectCatalog([production]);
  for (const language of languages) {
    const project = localized[language][0];
    assert.equal(project.category, 'Commercials');
    assert.equal(project.year, 2027);
    assert.equal(project.description, 'A production film.');
    assert.equal(project.isPlaceholder, false);
    assert.ok([project.cover, project.preview, project.fullFilm, ...project.stills, ...project.scrub.frames, ...project.credits].every(value => value.isPlaceholder === false));
    assert.equal(project.preview.hasAudio, false);
    assert.equal(project.fullFilm.hasAudio, true);
    assert.equal(project.scrub.durationSeconds, 90);
    assert.deepEqual(project.scrub.frames.map(frame => frame.sourceTime), [0, 30, 60]);
    assert.equal(project.catalogOrder, 1);
  }
  const changed = { ...production, motionLoopSrc: '/media/projects/brand-film/revised-loop.mp4', stills: production.stills.map(path => path.replace('still-', 'revised-')) };
  assert.ok(languages.every(language => createProjectCatalog([changed])[language][0].preview.src === changed.motionLoopSrc));
  localized.en[0].stills[0].src = '/changed-renderer.jpg';
  assert.equal(production.stills[0], '/media/projects/brand-film/still-1.jpg');
  assert.deepEqual(projectEntries[0], original);
  for (const count of [0, 1, 12, 20, 50]) {
    const entries = expandDemoEntries(projectEntries.slice(0, 6), count);
    assert.equal(entries.length, count);
    assert.equal(new Set(entries.map(entry => entry.id)).size, count);
    const expandedCatalog = createProjectCatalog(entries);
    for (const language of languages) {
      assert.equal(expandedCatalog[language].length, count);
      assert.deepEqual(expandedCatalog[language].map(project => project.catalogOrder), Array.from({ length: count }, (_, index) => index + 1));
      assert.ok(expandedCatalog[language].every((film, index, films) => !index || (films[index - 1].regionalWeight?.[language] ?? 0) >= (film.regionalWeight?.[language] ?? 0)));
      if (count >= 12) assert.deepEqual(expandedCatalog[language].slice(0, 3).map(project => project.id), expectedPremieres[language], 'Demo derivatives never duplicate a regional premiere priority');
    }
    if (count > 6) assert.ok(entries.slice(6).every(entry => languages.every(language => entry.regionalWeight[language] === 0)));
  }
  const neutralEntries = ['neutral-first', 'neutral-second', 'neutral-third'].map(id => ({ ...structuredClone(production), id }));
  const equalEntries = neutralEntries.map(entry => ({ ...entry, regionalWeight: { zh: 5, en: 5, ja: 5, ko: 5 } }));
  const extremeEntries = [
    { ...structuredClone(production), id: 'negative-weight', regionalWeight: { zh: -Number.MAX_VALUE, en: -1, ja: -2.5, ko: 0 } },
    { ...structuredClone(production), id: 'positive-weight', regionalWeight: { zh: Number.MAX_VALUE, en: 0, ja: -1.5, ko: 0 } },
    { ...structuredClone(production), id: 'neutral-weight' },
  ];
  for (const language of languages) {
    assert.deepEqual(createProjectCatalog(neutralEntries)[language].map(entry => entry.id), neutralEntries.map(entry => entry.id), 'Missing complete weight record means neutral priority');
    assert.deepEqual(createProjectCatalog(equalEntries)[language].map(entry => entry.id), equalEntries.map(entry => entry.id), 'Equal weights retain editorial input order');
  }
  assert.deepEqual(createProjectCatalog(extremeEntries).zh.map(entry => entry.id), ['positive-weight', 'neutral-weight', 'negative-weight']);
  const sourceWeights = structuredClone(projectEntries[0].regionalWeight);
  const independentWeights = createProjectCatalog(projectEntries);
  independentWeights.zh.find(project => project.id === projectEntries[0].id).regionalWeight.zh = -999;
  assert.deepEqual(projectEntries[0].regionalWeight, sourceWeights, 'Renderer priority metadata is independent of its input record');
  assert.deepEqual(independentWeights.en.find(project => project.id === projectEntries[0].id).regionalWeight, sourceWeights, 'One locale cannot mutate another locale priority');
  assert.deepEqual(createProjectCatalog([]), { zh: [], en: [], ko: [], ja: [] });
  assert.deepEqual(expandDemoEntries([], 0), []);
  assert.throws(() => expandDemoEntries([], 1), /source entry/);
  assert.throws(() => expandDemoEntries(projectEntries, -1), /non-negative/);
  assert.throws(() => expandDemoEntries(projectEntries, 1.5), /non-negative/);
  const reexpanded = expandDemoEntries(projectEntries, 50);
  assert.equal(new Set(reexpanded.map(entry => entry.id)).size, 50, 'expanding an already expanded demo must preserve unique IDs');
  const independentlyExpanded = expandDemoEntries(projectEntries.slice(0, 6), 12);
  independentlyExpanded[0].title.en = 'Changed clone';
  independentlyExpanded[0].description.en = 'Changed clone';
  independentlyExpanded[0].credits.client.en = 'Changed clone';
  independentlyExpanded[0].provenance.author.en = 'Changed clone';
  independentlyExpanded[0].scrub.frameTimes[0] = 0;
  assert.deepEqual(projectEntries[0], original, 'expanded edits must never mutate source records');
  assert.equal(durationInSeconds('01:02:03'), 3723);
  assert.throws(() => durationInSeconds('00:60'), /duration/);
  assert.throws(() => expandDemoEntries([production], 2), /Production/);
  assert.equal(expandDemoEntries([production], 1)[0].isPlaceholder, false);
  assert.throws(() => validateProjectEntries([production, production]), /duplicate/);
  for (const regionalWeight of [null, [], { zh: 1 }, { zh: 1, en: 2, ko: 3 }, { zh: 1, en: 2, ko: 3, ja: NaN }, { zh: 1, en: 2, ko: 3, ja: Infinity }, { zh: 1, en: 2, ko: 3, ja: '4' }, { zh: 1, en: 2, ko: 3, ja: null }, { zh: 1, en: 2, ko: 3, ja: 4, fr: 5 }]) assert.throws(() => validateProjectEntries([{ ...production, regionalWeight }]), /Regional weights/, `Rejected incomplete or invalid weights: ${String(regionalWeight)}`);
  assert.throws(() => validateProjectEntries([{ ...production, id: null }]), /ID/);
  assert.throws(() => validateProjectEntries([{ ...production, year: '0000' }]), /year/);
  assert.throws(() => validateProjectEntries([{ ...production, year: 2027 }]), /year/);
  assert.throws(() => validateProjectEntries([{ ...production, category: 'music' }]), /category/);
  assert.throws(() => validateProjectEntries([{ ...production, title: [] }]), /title/);
  assert.throws(() => validateProjectEntries([{ ...production, title: { ...production.title, ko: '' } }]), /ko title/);
  assert.throws(() => validateProjectEntries([{ ...production, motionLoopSrc: 'javascript:alert(1)' }]), /Media/);
  assert.throws(() => validateProjectEntries([{ ...production, motionLoopSrc: 'https://' }]), /Media/);
  assert.throws(() => validateProjectEntries([{ ...production, credits: { ...production.credits, dop: {} } }]), /credits/);
  assert.throws(() => validateProjectEntries([{ ...production, stills: [] }]), /stills/);
  assert.throws(() => validateProjectEntries([{ ...production, scrub: { durationSeconds: Infinity, frameRate: 24, sourceFrameRate: 24, frameTimes: [0, 1, 2] } }]), /timing/);
  assert.ok(!projectEntries.some(entry => /tide-(preview|full)|posters\/tide|stills\/tide/.test([entry.coverPoster, entry.motionLoopSrc, entry.fullFilmSrc, ...entry.stills].join(' '))));
  console.log('Verified four regional premieres, stable descending weights and ties, neutral defaults, immutable IDs/assets/locale records, explicit production rights, 0–50 film scaling, valid scrub timing, and rejected duplicate IDs, partial or non-finite regional weights, and unsafe media.');
} finally {
  await server.close();
}

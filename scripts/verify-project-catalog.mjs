import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { createProjectCatalog, expandDemoEntries, durationInSeconds, validateProjectEntries } = await server.ssrLoadModule('/src/data/projectCatalog.ts');
  const { projectEntries, projectsByLanguage } = await server.ssrLoadModule('/src/data/mockData.ts');
  const languages = ['zh', 'en', 'ko', 'ja'];
  assert.equal(projectEntries.length, 12);
  for (const language of languages) {
    assert.deepEqual(projectsByLanguage[language].map(project => project.id), projectEntries.map(entry => entry.id));
    for (let index = 0; index < projectEntries.length; index++) {
      const entry = projectEntries[index];
      const project = projectsByLanguage[language][index];
      assert.equal(project.title, entry.title[language]);
      assert.equal(project.cover.src, entry.coverPoster);
      assert.equal(project.preview.src, entry.motionLoopSrc);
      assert.equal(project.fullFilm.src, entry.fullFilmSrc);
      assert.deepEqual(project.scrub.frames.map(frame => frame.src), entry.stills);
    }
  }
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
    for (const language of languages) assert.equal(createProjectCatalog(entries)[language].length, count);
  }
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
  console.log('Verified canonical asset replacement across four languages, explicit production rights, independent renderer records, 0–50 demo expansion, valid scrub timing, and rejected unsafe or incomplete entries.');
} finally {
  await server.close();
}

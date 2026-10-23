import assert from 'node:assert/strict';
import { createServer } from 'vite';
import fs from 'node:fs/promises';

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { artistBrand, brandCopy } = await server.ssrLoadModule('/src/i18n/brand.ts');
  const { geoCopy } = await server.ssrLoadModule('/src/i18n/geo.ts');
  const { editorial } = await server.ssrLoadModule('/src/i18n/editorial.ts');
  const { dictionaries } = await server.ssrLoadModule('/src/i18n/dictionaries.ts');
  const { atelierCopy } = await server.ssrLoadModule('/src/i18n/atelier.ts');
  const { filters, filterKeys } = await server.ssrLoadModule('/src/i18n/filterLabels.ts');
  const { projectEntries, projectsByLanguage, representativesByLanguage, createDemoCatalog } = await server.ssrLoadModule('/src/data/mockData.ts');
  const retired = /lanchuan|澜川|瀾川|란촨|azuma|hiroshi|아즈마|アズマ|dong\s*hao|mo\s*chen/i;
  assert.equal(artistBrand.copyright, '© 2026 ACRO HAT (東浩). ALL RIGHTS RESERVED.');
  assert.equal(filters.length, 5);
  assert.equal(geoCopy.ja.contactHeading, 'ACRO HAT へのご相談');
  for (const language of ['zh', 'en', 'ja', 'ko']) {
    assert.equal(geoCopy[language].heroTitle, 'ACRO HAT');
    assert.deepEqual(geoCopy[language].heroIdentity, ['ANIME & CINEMA WORKS', 'DIRECTED BY ACRO HAT']);
    assert.equal(geoCopy[language].brandFocus, 'director');
    assert.equal(representativesByLanguage[language].length, 1);
    assert.equal(representativesByLanguage[language][0].email, artistBrand.email);
    assert.equal(atelierCopy[language].disciplines.length, 4);
    assert.equal(editorial[language].monologue.split('\n').length, 5);
    assert.match(editorial[language].monologue, /AI/);
    assert.match(editorial[language].monologue, /3D|三维/);
    assert.equal(dictionaries[language].chapter1Body, editorial[language].monologue);
    assert.ok(!retired.test(JSON.stringify([artistBrand, brandCopy[language], geoCopy[language], dictionaries[language], editorial[language], atelierCopy[language], projectsByLanguage[language]])));
    assert.equal(projectsByLanguage[language].length, 12);
    for (const category of filters.slice(1)) {
      assert.ok(projectsByLanguage[language].some(project => project.category === category), `${language}: populated ${category}`);
      assert.ok(dictionaries[language][filterKeys[category]], `${language}: localized ${category}`);
    }
    assert.ok(projectEntries.every(entry => entry.isPlaceholder), 'Licensed reference studies must never become unverified directing credits');
    assert.equal(createDemoCatalog(50)[language].length, 50);
  }
  const logo = await fs.readFile('src/components/brand/AcroHatLogo.tsx', 'utf8');
  assert.ok(!logo.includes('HYBRID ARTIST') && !logo.includes('brand-rec'), 'Latest user correction: plain single-line navigation wordmark');
  console.log('PASS personal identity in four locales, exact Japanese contact title, one contact channel, four creative domains, five populated filters, 50-film expansion and preserved placeholder provenance.');
} finally { await server.close(); }

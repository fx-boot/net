import assert from 'node:assert/strict';
import { selectLanguage } from '../src/i18n/languageSelection.ts';
import { curationKey, curationTarget } from '../src/lib/curationState.ts';

let selection = { language: 'zh', revision: 0 };
const original = { ...selection, filter: 'Live-action & Drama', view: 'archive' };
assert.equal(selectLanguage(selection, 'zh'), selection, 'current language is a no-op');
selection = selectLanguage(selection, 'ja');
const japanese = curationTarget(original, selection.language, selection.revision);
assert.equal(japanese.filter, 'All');
assert.equal(japanese.view, 'archive', 'view choice survives regional routing');
selection = selectLanguage(selection, 'zh');
const roundTrip = curationTarget(original, selection.language, selection.revision);
assert.notEqual(curationKey(roundTrip), curationKey(original), 'rapid A-B-A must create a new carousel edition');
assert.equal(roundTrip.revision, 2);
assert.equal(roundTrip.filter, 'All');
let previous = roundTrip;
for (const language of ['en', 'ja', 'ko', 'zh', 'ja', 'en']) {
  selection = selectLanguage(selection, language);
  const latest = curationTarget(previous, selection.language, selection.revision);
  assert.equal(latest.language, language);
  assert.equal(latest.revision, selection.revision);
  assert.equal(latest.filter, 'All');
  assert.notEqual(curationKey(latest), curationKey(previous));
  previous = latest;
}
assert.equal(curationTarget(previous, selection.language, selection.revision), previous);
assert.deepEqual(original, { language: 'zh', revision: 0, filter: 'Live-action & Drama', view: 'archive' });
console.log('PASS regional transitions: stable same-language selection, filter reset, retained view, rapid A-B-A revisions and latest-edition keys');

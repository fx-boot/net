import type { Language } from '../i18n/dictionaries';
import type { Category, Credit, MediaAsset, Project, ProjectCreditValue, ProjectEntry, RegionalWeight } from '../types/portfolio';
export type { ProjectCredits, ProjectEntry, RegionalWeight } from '../types/portfolio';
export type LocalizedCatalog = Record<Language, Project[]>;
export const catalogLanguages: readonly Language[] = ['zh', 'en', 'ko', 'ja'];
const categories: Record<ProjectEntry['category'], Category> = {
  commercials: 'Commercials', narrative: 'Narrative', 'visual-tech': 'Visual Tech',
};
const creditLabels: Record<Language, string[]> = {
  zh: ['客户', '代理商', '摄影指导', '制作', '年份'],
  en: ['Client', 'Agency', 'Director of photography', 'Production', 'Year'],
  ko: ['클라이언트', '에이전시', '촬영감독', '제작사', '연도'],
  ja: ['クライアント', '代理店', '撮影監督', '制作', '年'],
};
const studyTitles: Record<Language, string[]> = {
  zh: ['岸线回声', '午夜坐标', '身体档案', '风的路径', '光的残像', '透明界面'],
  en: ['Coastal Echoes', 'Midnight Coordinates', 'Body Archive', 'The Path of Wind', 'Afterimages', 'Transparent Interface'],
  ko: ['해안의 메아리', '자정의 좌표', '몸의 기록', '바람의 경로', '빛의 잔상', '투명한 경계'],
  ja: ['岸辺の残響', '真夜中の座標', '身体の記録', '風の道筋', '光の残像', '透明な界面'],
};
const localized = (value: ProjectCreditValue, language: Language) => typeof value === 'string' ? value : value[language];
const text = (value: ProjectEntry['description'], language: Language, fallback = '') => value?.[language] ?? value?.en ?? fallback;
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const nonempty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const completeText = (value: unknown) => record(value) && catalogLanguages.every(language => nonempty(value[language]));
const validCredit = (value: unknown) => nonempty(value) || completeText(value);
const validRegionalWeight = (value: unknown): value is RegionalWeight => record(value) && Object.keys(value).length === catalogLanguages.length && catalogLanguages.every(language => typeof value[language] === 'number' && Number.isFinite(value[language]));
const mediaPath = (value: unknown) => {
  if (typeof value !== 'string' || /[\s\\]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try { const url = new URL(value); return url.protocol === 'https:' && !!url.hostname; } catch { return false; }
};

export function durationInSeconds(duration: string): number {
  if (typeof duration !== 'string') throw new TypeError('Film duration must be a string');
  const parts = duration.split(':').map(Number);
  if (!/^\d{2,}:\d{2}(?::\d{2})?$/.test(duration) || parts.some(value => !Number.isFinite(value)) || parts.slice(1).some(value => value >= 60)) throw new TypeError(`Invalid film duration: ${duration}`);
  const seconds = parts.reduce((total, value) => total * 60 + value, 0);
  if (!Number.isSafeInteger(seconds)) throw new TypeError(`Invalid film duration: ${duration}`);
  return seconds;
}

/** Fail at the data boundary rather than showing a broken production frame. */
export function validateProjectEntries(entries: readonly ProjectEntry[]): void {
  if (!Array.isArray(entries)) throw new TypeError('Film entries must be an array');
  const ids = new Set<string>();
  for (const entry of entries) {
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry) || typeof entry.id !== 'string' || !/^[a-z\d][a-z\d-]*$/i.test(entry.id) || ids.has(entry.id)) throw new TypeError(`Invalid or duplicate project ID: ${entry?.id}`);
    ids.add(entry.id);
    if (entry.regionalWeight !== undefined && !validRegionalWeight(entry.regionalWeight)) throw new TypeError(`Regional weights require four finite numbers for ${entry.id}`);
    if (!Object.hasOwn(categories, entry.category)) throw new TypeError(`Unknown category for ${entry.id}`);
    if (typeof entry.year !== 'string' || !/^\d{4}$/.test(entry.year) || Number(entry.year) === 0 || durationInSeconds(entry.duration) <= 0) throw new TypeError(`Invalid year or duration for ${entry.id}`);
    if (typeof entry.isPlaceholder !== 'boolean') throw new TypeError(`Missing rights status for ${entry.id}`);
    for (const language of catalogLanguages) if (!record(entry.title) || !nonempty(entry.title[language])) throw new TypeError(`Missing ${language} title for ${entry.id}`);
    if (!Array.isArray(entry.stills) || entry.stills.length < 3 || entry.stills.length > 4) throw new TypeError(`${entry.id} requires three or four scrub stills`);
    if (![entry.coverPoster, entry.motionLoopSrc, entry.fullFilmSrc, ...entry.stills, ...Object.values(entry.remoteSources ?? {})].every(mediaPath)) throw new TypeError(`Media must use a root-relative path or HTTPS URL: ${entry.id}`);
    if (entry.credits === null || typeof entry.credits !== 'object' || Array.isArray(entry.credits) || ![entry.credits.client, entry.credits.agency, entry.credits.dop, entry.credits.production].every(validCredit)) throw new TypeError(`Missing localized credits for ${entry.id}`);
    if (entry.credits.additional && !Array.isArray(entry.credits.additional)) throw new TypeError(`Invalid additional credits for ${entry.id}`);
    for (const credit of entry.credits.additional ?? []) if (!completeText(credit.label) || !validCredit(credit.value)) throw new TypeError(`Missing additional localized credit for ${entry.id}`);
    for (const field of [entry.description, entry.note, entry.format, entry.alt]) if (field !== undefined && (!record(field) || Object.values(field).some(value => typeof value !== 'string'))) throw new TypeError(`Invalid localized copy for ${entry.id}`);
    if (entry.provenance && (!mediaPath(entry.provenance.sourceUrl) || !mediaPath(entry.provenance.licenseUrl) || !validCredit(entry.provenance.author))) throw new TypeError(`Invalid asset provenance for ${entry.id}`);
    if (entry.fullFilmHasAudio !== undefined && typeof entry.fullFilmHasAudio !== 'boolean') throw new TypeError(`Invalid full-film audio status for ${entry.id}`);
    if (entry.scrub) {
      const { durationSeconds, frameRate, sourceFrameRate, frameTimes } = entry.scrub;
      if (![durationSeconds, frameRate, sourceFrameRate].every(value => Number.isFinite(value) && value > 0) || !Array.isArray(frameTimes) || frameTimes.length !== entry.stills.length || frameTimes.some((time, index) => !Number.isFinite(time) || time < 0 || time >= durationSeconds || index > 0 && time <= frameTimes[index - 1])) throw new TypeError(`Invalid scrub timing for ${entry.id}`);
    }
  }
}

/** A stable, non-mutating regional screening order; ties keep the editor's input order. */
export function curateProjectEntries(entries: readonly ProjectEntry[], language: Language): ProjectEntry[] {
  return entries.map((entry, inputOrder) => ({ entry, inputOrder, weight: entry.regionalWeight?.[language] ?? 0 }))
    .sort((left, right) => left.weight === right.weight ? left.inputOrder - right.inputOrder : left.weight > right.weight ? -1 : 1)
    .map(({ entry }) => entry);
}

/** Assets and IDs remain stable; each language gets its own screening order and copy. */
export function createProjectCatalog(entries: readonly ProjectEntry[]): LocalizedCatalog {
  validateProjectEntries(entries);
  return Object.fromEntries(catalogLanguages.map(language => [language, curateProjectEntries(entries, language).map((entry, index): Project => {
    const alt = text(entry.alt, language, entry.title[language]);
    const asset = (src: string, remoteSrc = src, hasAudio?: boolean): MediaAsset => ({
      isPlaceholder: entry.isPlaceholder, src, remoteSrc, hasAudio, poster: entry.coverPoster,
      fallback: '/media/fallback.svg', sourceUrl: entry.provenance?.sourceUrl ?? src,
      licenseUrl: entry.provenance?.licenseUrl ?? '', author: entry.provenance ? localized(entry.provenance.author, language) : 'LANCHUAN', alt,
    });
    const durationSeconds = entry.scrub?.durationSeconds ?? durationInSeconds(entry.duration);
    const stills = entry.stills.map(src => asset(src));
    const credits: Credit[] = [entry.credits.client, entry.credits.agency, entry.credits.dop, entry.credits.production, entry.year].map((value, creditIndex) => ({
      role: creditLabels[language][creditIndex], name: localized(value, language), isPlaceholder: entry.isPlaceholder,
    }));
    for (const additional of entry.credits.additional ?? []) credits.push({ role: additional.label[language], name: localized(additional.value, language), isPlaceholder: entry.isPlaceholder });
    return {
      isPlaceholder: entry.isPlaceholder, id: entry.id, sourceProjectId: entry.sourceProjectId ?? entry.id,
      regionalWeight: entry.regionalWeight ? { ...entry.regionalWeight } : undefined,
      catalogOrder: index + 1, title: entry.title[language], englishTitle: entry.title.en,
      category: categories[entry.category], format: text(entry.format, language), year: Number(entry.year), duration: entry.duration,
      description: text(entry.description, language), note: text(entry.note, language),
      cover: asset(entry.coverPoster), preview: asset(entry.motionLoopSrc, entry.remoteSources?.motionLoopSrc, false),
      fullFilm: asset(entry.fullFilmSrc, entry.remoteSources?.fullFilmSrc, entry.fullFilmHasAudio ?? true), stills, credits,
      scrub: {
        durationSeconds, frameRate: entry.scrub?.frameRate ?? 24, sourceFrameRate: entry.scrub?.sourceFrameRate ?? 24,
        frames: stills.map((frame, frameIndex) => ({ ...frame, sourceTime: entry.scrub?.frameTimes[frameIndex] ?? durationSeconds * frameIndex / entry.stills.length })),
      },
    };
  })])) as LocalizedCatalog;
}

/** Explicit demo-only expansion. Production entries are never silently duplicated. */
export function expandDemoEntries(seeds: readonly ProjectEntry[], count = 12): ProjectEntry[] {
  if (!Number.isSafeInteger(count) || count < 0) throw new RangeError('Catalog count must be a non-negative integer');
  validateProjectEntries(seeds);
  if (count && !seeds.length) throw new TypeError('At least one source entry is required');
  if (count > seeds.length && seeds.some(entry => !entry.isPlaceholder)) throw new TypeError('Production entries cannot be expanded into demo studies');
  const reservedIds = new Set(seeds.map(entry => entry.id));
  return Array.from({ length: count }, (_, index) => {
    const source = structuredClone(seeds[index % seeds.length]);
    const edition = Math.floor(index / seeds.length);
    const title = edition ? Object.fromEntries(catalogLanguages.map(language => [language, `${studyTitles[language][index % studyTitles[language].length]}${edition > 1 ? ` / ${String(edition).padStart(2, '0')}` : ''}`])) as ProjectEntry['title'] : { ...source.title };
    let id = source.id;
    if (edition) {
      const stem = `${source.id}-study-${edition}`;
      id = stem;
      let suffix = 1;
      while (reservedIds.has(id)) id = `${stem}-${++suffix}`;
      reservedIds.add(id);
    }
    return {
      ...source, id,
      // New demo studies stay neutral; never duplicate a source film's regional premiere.
      regionalWeight: edition ? { zh: 0, en: 0, ko: 0, ja: 0 } : source.regionalWeight,
      sourceProjectId: source.sourceProjectId ?? source.id, title, stills: [...source.stills],
      credits: { ...source.credits, additional: source.credits.additional?.map(credit => ({ ...credit })) },
      scrub: source.scrub ? { ...source.scrub, frameTimes: [...source.scrub.frameTimes] } : undefined,
    };
  });
}

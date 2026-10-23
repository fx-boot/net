import type { Language } from '../i18n/dictionaries';

export type Category = 'Commercials' | 'Narrative' | 'Visual Tech';
export type ProjectCategory = 'commercials' | 'narrative' | 'visual-tech';
export type LocalizedProjectText = Record<Language, string>;
export type RegionalWeight = Record<Language, number>;
export type ProjectCreditValue = string | LocalizedProjectText;
/** Brand-owned credits; labels are localized by the catalog adapter. */
export interface ProjectCredits {
  client: ProjectCreditValue;
  agency: ProjectCreditValue;
  dop: ProjectCreditValue;
  production: ProjectCreditValue;
  additional?: Array<{ label: LocalizedProjectText; value: ProjectCreditValue }>;
}
/** One editable source record drives all four localized renderer records. */
export interface ProjectEntry {
  id: string;
  title: Record<Language, string>;
  category: ProjectCategory;
  year: string;
  duration: string;
  coverPoster: string;
  motionLoopSrc: string;
  fullFilmSrc: string;
  stills: string[];
  credits: ProjectCredits;
  /** Higher weights screen first in that language. Omit the entire record for neutral (0) priority. */
  regionalWeight?: RegionalWeight;
  isPlaceholder: boolean;
  description?: Partial<LocalizedProjectText>;
  note?: Partial<LocalizedProjectText>;
  format?: Partial<LocalizedProjectText>;
  alt?: Partial<LocalizedProjectText>;
  provenance?: { sourceUrl: string; licenseUrl: string; author: ProjectCreditValue };
  remoteSources?: { motionLoopSrc?: string; fullFilmSrc?: string };
  fullFilmHasAudio?: boolean;
  scrub?: { durationSeconds: number; frameRate: number; sourceFrameRate: number; frameTimes: number[] };
  sourceProjectId?: string;
}
export type Filter = 'All' | Category;
export type WorkView = 'carousel' | 'archive';
export interface ReelChapter { id: string; projectId: string; start: number; poster?: string }
export interface ReelConfig { frameRate: number; expectedDuration: number; chapters: ReelChapter[] }
export interface ProjectOrigin { element: HTMLElement; poster: string; rect: { left: number; top: number; width: number; height: number } }
export interface ContentRecord { isPlaceholder: boolean }
export interface DemoRecord extends ContentRecord { isPlaceholder: true }
export interface MediaAsset extends ContentRecord {
  src: string;
  hasAudio?: boolean;
  remoteSrc: string;
  poster: string;
  fallback: string;
  sourceUrl: string;
  licenseUrl: string;
  author: string;
  alt: string;
}
export interface Credit extends ContentRecord { role: string; name: string }
export interface ScrubFrame extends MediaAsset { sourceTime: number }
export interface FilmScrubData {
  durationSeconds: number;
  frameRate: number;
  sourceFrameRate: number;
  frames: ScrubFrame[];
}
export interface Project extends ContentRecord {
  id: string;
  sourceProjectId?: string;
  catalogOrder?: number;
  regionalWeight?: RegionalWeight;
  title: string;
  englishTitle: string;
  category: Category;
  format: string;
  year: number;
  duration: string;
  description: string;
  note: string;
  cover: MediaAsset;
  preview: MediaAsset;
  fullFilm: MediaAsset;
  stills: MediaAsset[];
  scrub?: FilmScrubData;
  credits: Credit[];
}
export interface DirectorProfile extends ContentRecord { name: string; englishName: string; role: string; statement: string; portrait: MediaAsset }
export interface Award extends ContentRecord { festival: string; honor: string; year: number; film: string }
export interface Client extends ContentRecord { name: string }
export interface Representative extends ContentRecord { region: string; name: string; title: string; company: string; email: string }

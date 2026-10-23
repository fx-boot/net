export type Category = 'Commercials' | 'Narrative' | 'Visual Tech';
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

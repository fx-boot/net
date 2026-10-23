import type { Language } from '../i18n/dictionaries';

/** Independent regional backgrounds. Change these paths to replace a Hero without touching the film catalog or full reel. */
export const heroMediaPaths = {
  zh: { video: '/media/hero/zh.mp4', poster: '/media/hero/zh.jpg' },
  en: { video: '/media/hero/en.mp4', poster: '/media/hero/en.jpg' },
  ja: { video: '/media/hero/ja.mp4', poster: '/media/hero/ja.jpg' },
  ko: { video: '/media/hero/ko.mp4', poster: '/media/hero/ko.jpg' },
} satisfies Record<Language, { video: string; poster: string }>;

interface HeroMediaSource {
  sourceId: string;
  sourceUrl: string;
  originalDownloadUrl: string;
  licenseUrl: string;
  author: string;
  authorUrl: string;
  isPlaceholder: boolean;
  hasAudio: false;
}

/** Source records describe licensed stock, never assert a ACRO HAT directing credit or a specific unverified filming location. */
export const heroMediaSources: Record<Language, HeroMediaSource> = {
  zh: {
    sourceId: 'mixkit-42342', sourceUrl: 'https://mixkit.co/free-stock-video/aerial-shot-of-a-city-at-night-42342/',
    originalDownloadUrl: 'https://assets.mixkit.co/videos/42342/42342-1080.mp4',
    licenseUrl: 'https://mixkit.co/license/#videoFree', author: 'Mixkit', authorUrl: 'https://mixkit.co/@mixkit/',
    isPlaceholder: true, hasAudio: false,
  },
  en: {
    sourceId: 'mixkit-101699', sourceUrl: 'https://mixkit.co/free-stock-video/abstract-lights-shifting-from-blue-to-green-101699/',
    originalDownloadUrl: 'https://assets.mixkit.co/u7u2lhfyns2qe8qwrdwiv2wt3ddv',
    licenseUrl: 'https://mixkit.co/license/#videoFree', author: 'Mixkit', authorUrl: 'https://mixkit.co/@mixkit/',
    isPlaceholder: true, hasAudio: false,
  },
  ja: {
    sourceId: 'mixkit-3977', sourceUrl: 'https://mixkit.co/free-stock-video/view-of-a-window-with-a-curtain-3977/',
    originalDownloadUrl: 'https://assets.mixkit.co/videos/3977/3977-1080.mp4',
    licenseUrl: 'https://mixkit.co/license/#videoFree', author: 'edgarfernandez', authorUrl: 'https://mixkit.co/@edgarfernandez/',
    isPlaceholder: true, hasAudio: false,
  },
  ko: {
    sourceId: 'mixkit-50429', sourceUrl: 'https://mixkit.co/free-stock-video/woman-dancing-under-a-neon-spotlight-50429/',
    originalDownloadUrl: 'https://assets.mixkit.co/videos/50429/50429-1080.mp4',
    licenseUrl: 'https://mixkit.co/license/#videoFree', author: 'Mixkit', authorUrl: 'https://mixkit.co/@mixkit/',
    isPlaceholder: true, hasAudio: false,
  },
};

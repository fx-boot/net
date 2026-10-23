import type { Language } from './dictionaries';
import { studioBrand } from './brand';

/** Editorial direction follows the selected language, never an inferred location. */
export interface GeoNarrative {
  brandFocus: 'studio' | 'director';
  heroTitle: 'LANCHUAN' | 'AZUMA HIROSHI';
  heroAccessibleTitle: string;
  heroIdentity: readonly [string, string];
  heroNarrative: string;
  heroCue: readonly [string, string];
  heroCredit: readonly [string, string, string];
  directorOpening: string;
  studioEthos: string;
  contactHeading: string;
}

export const geoCopy: Record<Language, GeoNarrative> = {
  zh: {
    brandFocus: 'studio',
    heroTitle: 'LANCHUAN',
    heroAccessibleTitle: '澜川科技 / 重庆澜川科技有限公司 / 导演 東浩（Azuma Hiroshi）',
    heroIdentity: ['LANCHUAN / STUDIO & TECH', studioBrand.directorCredit],
    heroNarrative: '立足重庆，以光影记录时代情绪。',
    heroCue: ['虚拟制片 / 数字视效', '8K RAW // 2.39:1'],
    heroCredit: ['澜川科技', '東浩 / AZUMA HIROSHI', '重庆澜川科技有限公司'],
    directorOpening: '我从城市的光与人的表情里，寻找时代的情绪。',
    studioEthos: '立足重庆，面向全球。从前期创作、虚拟制片到数字视效，让技术与叙事在同一幅画面中相遇。',
    contactHeading: '制作与合作',
  },
  en: {
    brandFocus: 'studio',
    heroTitle: 'LANCHUAN',
    heroAccessibleTitle: 'LANCHUAN / Global production service / Director Azuma Hiroshi',
    heroIdentity: ['LANCHUAN / STUDIO & TECH', studioBrand.directorCredit],
    heroNarrative: 'Independent vision. Global production.',
    heroCue: ['8K RAW // VIRTUAL PRODUCTION', '2.39:1 ANAMORPHIC'],
    heroCredit: ['LANCHUAN', 'AZUMA HIROSHI / DIRECTOR', 'GLOBAL PRODUCTION SERVICE'],
    directorOpening: 'I begin with a person, even when the frame opens onto an entire city. ',
    studioEthos: 'A creative production studio in Chongqing, connecting direction, virtual production and visual effects for brands and filmmakers worldwide.',
    contactHeading: 'Global production',
  },
  ja: {
    brandFocus: 'director',
    heroTitle: 'AZUMA HIROSHI',
    heroAccessibleTitle: '映画監督・東浩（アズマ ヒロシ / Azuma Hiroshi） / LANCHUAN',
    heroIdentity: ['LANCHUAN / STUDIO & TECH', studioBrand.directorCredit],
    heroNarrative: '画面のなかに、言葉にならない静けさを。',
    heroCue: ['光と余白、そのあいだに', 'AZUMA HIROSHI // LANCHUAN'],
    heroCredit: ['東浩', '映画監督・映像作家', 'LANCHUAN / CHONGQING'],
    directorOpening: '私にとって映画とは、まだ言葉にならない気配を、光のなかに残すことです。',
    studioEthos: '監督のまなざしを、光と余白まで支える。LANCHUANは、撮影とデジタル技術をひとつの制作へと結びます。',
    contactHeading: '東浩へのご相談',
  },
  ko: {
    brandFocus: 'director',
    heroTitle: 'AZUMA HIROSHI',
    heroAccessibleTitle: '감독 아즈마 히로시 (Azuma Hiroshi) / LANCHUAN',
    heroIdentity: ['LANCHUAN / STUDIO & TECH', studioBrand.directorCredit],
    heroNarrative: '시선이 멈추고 감각이 깨어나는 순간',
    heroCue: ['감정의 밀도 / 이미지의 리듬', 'AZUMA HIROSHI // LANCHUAN'],
    heroCredit: ['아즈마 히로시', '감독 · 비주얼 아티스트', 'LANCHUAN / CHONGQING'],
    directorOpening: '빛과 움직임이 감정의 리듬을 바꾸는 순간을 기다립니다. ',
    studioEthos: '아즈마 히로시의 감각을 제작의 언어로. LANCHUAN은 촬영과 비주얼 테크놀로지를 연결해 감정과 리듬이 살아 있는 이미지를 만듭니다.',
    contactHeading: '아즈마 히로시와의 협업',
  },
};

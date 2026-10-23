import type { Language } from './dictionaries';

/** Editorial direction follows the selected language, never an inferred location. */
export interface GeoNarrative {
  brandFocus: 'studio' | 'director';
  heroTitle: 'LANCHUAN' | 'DONG HAO';
  heroAccessibleTitle: string;
  heroPresents: readonly [string, string];
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
    heroAccessibleTitle: '澜川科技 / 重庆澜川科技有限公司 / 导演 東浩',
    heroPresents: ['LANCHUAN PRESENTS', '重庆澜川科技有限公司 · 東浩 导演作品'],
    heroNarrative: '立足重庆，以光影记录时代情绪。',
    heroCue: ['虚拟制片 / 数字视效', '8K RAW // 2.39:1'],
    heroCredit: ['澜川科技', '東浩 / DONG HAO', '重庆澜川科技有限公司'],
    directorOpening: '我从城市的光与人的表情里，寻找时代的情绪。',
    studioEthos: '立足重庆，面向全球。从前期创作、虚拟制片到数字视效，让技术与叙事在同一幅画面中相遇。',
    contactHeading: '制作与合作',
  },
  en: {
    brandFocus: 'studio',
    heroTitle: 'LANCHUAN',
    heroAccessibleTitle: 'LANCHUAN / Global production service / Director Dong Hao',
    heroPresents: ['LANCHUAN PRESENTS', 'GLOBAL PRODUCTION / FILMS BY DONG HAO'],
    heroNarrative: 'Independent vision. Global production.',
    heroCue: ['8K RAW // VIRTUAL PRODUCTION', '2.39:1 ANAMORPHIC'],
    heroCredit: ['LANCHUAN', 'DONG HAO / DIRECTOR', 'GLOBAL PRODUCTION SERVICE'],
    directorOpening: 'I begin with a person, even when the frame opens onto an entire city. ',
    studioEthos: 'A creative production studio in Chongqing, connecting direction, virtual production and visual effects for brands and filmmakers worldwide.',
    contactHeading: 'Global production',
  },
  ja: {
    brandFocus: 'director',
    heroTitle: 'DONG HAO',
    heroAccessibleTitle: '映画監督・東浩 / LANCHUAN',
    heroPresents: ['LANCHUAN PRESENTS', '映画監督・東浩'],
    heroNarrative: '画面のなかに、言葉にならない静けさを。',
    heroCue: ['光と余白、そのあいだに', 'DONG HAO // LANCHUAN'],
    heroCredit: ['東浩', '映画監督・映像作家', 'LANCHUAN / CHONGQING'],
    directorOpening: '私にとって映画とは、まだ言葉にならない気配を、光のなかに残すことです。',
    studioEthos: '監督のまなざしを、光と余白まで支える。LANCHUANは、撮影とデジタル技術をひとつの制作へと結びます。',
    contactHeading: '東浩へのご相談',
  },
  ko: {
    brandFocus: 'director',
    heroTitle: 'DONG HAO',
    heroAccessibleTitle: '감독 동하오 / LANCHUAN',
    heroPresents: ['LANCHUAN PRESENTS', '동하오 감독 · 영화와 비주얼 아트'],
    heroNarrative: '시선이 멈추고 감각이 깨어나는 순간',
    heroCue: ['감정의 밀도 / 이미지의 리듬', 'DONG HAO // LANCHUAN'],
    heroCredit: ['동하오', '감독 · 비주얼 아티스트', 'LANCHUAN / CHONGQING'],
    directorOpening: '빛과 움직임이 감정의 리듬을 바꾸는 순간을 기다립니다. ',
    studioEthos: '동하오의 감각을 제작의 언어로. LANCHUAN은 촬영과 비주얼 테크놀로지를 연결해 감정과 리듬이 살아 있는 이미지를 만듭니다.',
    contactHeading: '동하오와의 협업',
  },
};

import type { Language } from './dictionaries';

export const studioBrand = {
  name: 'LANCHUAN',
  director: 'DONG HAO',
  portrait: '/media/director/donghao-portrait.jpg',
  portraitFallback: '/media/director/darkroom-placeholder.svg',
  copyright: '© 2026 CHONGQING LANCHUAN TECHNOLOGY CO., LTD. ALL RIGHTS RESERVED. FILMS DIRECTED BY DONG HAO.',
  emails: ['studio@example.com', 'atelier@example.com'],
} as const;

interface BrandCopy {
  company: string; shortCompany: string; directorName: string; directorAlias: string;
  navDirector: string; navStudio: string; presents: string; heroRole: string;
  founderRole: string; dossier: string; voice: string; studioHeading: string;
  ethos: string; studioFocus: string; signature: string; portraitAlt: string;
  productionChannel: string; productionRole: string; productionAudience: string;
  directorChannel: string; directorAgency: string; directorAudience: string;
}

export const brandCopy: Record<Language, BrandCopy> = {
  zh: {
    company: '重庆澜川科技有限公司', shortCompany: '澜川科技', directorName: '東浩', directorAlias: 'DONG HAO',
    navDirector: '导演 東浩', navStudio: '厂牌 澜川科技', presents: '澜川出品 / 東浩 导演作品', heroRole: '导演 / 视觉艺术家',
    founderRole: '创始人 / 首席导演', dossier: '创作者档案', voice: '导演的声音', studioHeading: '厂牌科技实力',
    ethos: '以科技拓展影像边界，以叙事锚定真实情感。',
    studioFocus: '从镜头、光学与现场出发，将数字视效和虚拟制作纳入同一套创作语言。',
    signature: '签名', portraitAlt: '東浩导演肖像画幅',
    productionChannel: '商业制作与科技视觉发包', productionRole: '制作监制', productionAudience: '品牌客户 / 广告代理商 / 电影制片方',
    directorChannel: '東浩 导演艺术经纪', directorAgency: '导演个人工作室 / 独家经纪', directorAudience: '长片剧本 / 影展合作 / 艺术策展',
  },
  en: {
    company: 'Chongqing Lanchuan Technology Co., Ltd. (LANCHUAN)', shortCompany: 'LANCHUAN', directorName: 'Dong Hao', directorAlias: '東浩',
    navDirector: 'Director Dong Hao', navStudio: 'Studio LANCHUAN', presents: 'LANCHUAN presents / A film by Dong Hao', heroRole: 'Director & Visual Artist',
    founderRole: 'Founder & Chief Director', dossier: 'Director dossier', voice: 'Director’s voice', studioHeading: 'Studio capacity',
    ethos: 'Technology expands the image. Story anchors it in human feeling.',
    studioFocus: 'We bring lenses, light and the set into one creative language with visual effects and virtual production.',
    signature: 'Signature', portraitAlt: 'Portrait frame for director Dong Hao',
    productionChannel: 'Production & visual technology', productionRole: 'Production supervision', productionAudience: 'Brands / Advertising agencies / Film producers',
    directorChannel: 'Dong Hao · Artist representation', directorAgency: 'Director atelier / Exclusive representation', directorAudience: 'Feature scripts / Film festivals / Art curation',
  },
  ko: {
    company: '충칭 란촨 테크놀로지 (LANCHUAN)', shortCompany: 'LANCHUAN', directorName: '동하오 (Dong Hao)', directorAlias: '동하오',
    navDirector: '감독 동하오', navStudio: '스튜디오 LANCHUAN', presents: 'LANCHUAN 제작 / 동하오 감독 작품', heroRole: '감독 / 비주얼 아티스트',
    founderRole: '창립자 / 수석 감독', dossier: '감독 아카이브', voice: '감독의 시선', studioHeading: '스튜디오 역량',
    ethos: '기술로 영상의 경계를 넓히고, 서사로 진실한 감정을 붙잡습니다.',
    studioFocus: '렌즈와 빛, 촬영 현장에서 출발해 시각효과와 버추얼 프로덕션을 하나의 창작 언어로 연결합니다.',
    signature: '서명', portraitAlt: '동하오 감독의 인물 사진 프레임',
    productionChannel: '상업 제작 · 비주얼 테크놀로지', productionRole: '제작 총괄', productionAudience: '브랜드 / 광고 대행사 / 영화 제작사',
    directorChannel: '동하오 감독 아티스트 매니지먼트', directorAgency: '감독 개인 스튜디오 / 독점 매니지먼트', directorAudience: '장편 시나리오 / 영화제 협업 / 예술 기획',
  },
  ja: {
    company: '重慶瀾川科技有限公司 (LANCHUAN)', shortCompany: 'LANCHUAN', directorName: '東浩 (Dong Hao / アズマ ヒロシ)', directorAlias: 'アズマ ヒロシ',
    navDirector: '監督 東浩', navStudio: 'スタジオ LANCHUAN', presents: 'LANCHUAN 製作 / 東浩 監督作品', heroRole: '監督 / ビジュアルアーティスト',
    founderRole: '創設者 / チーフディレクター', dossier: '監督の記録', voice: '監督の視点', studioHeading: 'スタジオの制作技術',
    ethos: '技術で映像の境界を広げ、物語で確かな感情を捉える。',
    studioFocus: 'レンズと光、撮影現場を起点に、視覚効果とバーチャルプロダクションをひとつの創作言語へつなぎます。',
    signature: '署名', portraitAlt: '東浩監督のポートレート用フレーム',
    productionChannel: '商業映像制作・ビジュアルテック', productionRole: '制作統括', productionAudience: 'ブランド / 広告代理店 / 映画製作者',
    directorChannel: '東浩 監督アーティスト窓口', directorAgency: '監督個人アトリエ / 専属マネジメント', directorAudience: '長編脚本 / 映画祭連携 / アートキュレーション',
  },
};

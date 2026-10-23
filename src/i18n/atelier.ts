import type { Language } from './dictionaries';

interface CapacityDiscipline {
  code: string;
  title: string;
  label: string;
  description: string;
}

interface AtelierCopy {
  dossierTitle: string;
  directorDiscipline: string;
  plateLabel: string;
  labTitle: string;
  formatsLabel: string;
  disciplines: CapacityDiscipline[];
}

export const atelierCopy: Record<Language, AtelierCopy> = {
  zh: {
    dossierTitle: '导演档案', directorDiscipline: '导演 / 视觉艺术家', plateLabel: '创作者影像档案',
    labTitle: '影像与技术', formatsLabel: '影像规格',
    disciplines: [
      { code: 'VP', title: 'Virtual Production', label: '虚拟制片', description: '让实拍空间与数字场景，在同一视点相遇。' },
      { code: 'VFX', title: 'CGI / VFX', label: '数字视效', description: '从三维构建到镜头合成，让虚实遵循同一束光。' },
      { code: 'COL', title: 'Color Science', label: '色彩科学', description: '以曝光、反差与色彩，建立镜头之间的连续性。' },
    ],
  },
  en: {
    dossierTitle: 'Director dossier', directorDiscipline: 'Director / Visual artist', plateLabel: 'Artist image archive',
    labTitle: 'Image & technology', formatsLabel: 'Image formats',
    disciplines: [
      { code: 'VP', title: 'Virtual Production', label: 'Virtual production', description: 'Live action and digital environments, seen from one point of view.' },
      { code: 'VFX', title: 'CGI / VFX', label: 'Visual effects', description: 'From three-dimensional scenes to compositing, a shared language of light.' },
      { code: 'COL', title: 'Color Science', label: 'Color science', description: 'Exposure, contrast and color establish continuity between images.' },
    ],
  },
  ko: {
    dossierTitle: '감독 아카이브', directorDiscipline: '감독 / 비주얼 아티스트', plateLabel: '창작자 이미지 아카이브',
    labTitle: '영상과 기술', formatsLabel: '영상 규격',
    disciplines: [
      { code: 'VP', title: 'Virtual Production', label: '버추얼 프로덕션', description: '실사 공간과 디지털 장면을 하나의 시점으로 연결합니다.' },
      { code: 'VFX', title: 'CGI / VFX', label: '디지털 시각효과', description: '3D 장면 구성부터 합성까지, 같은 빛의 원리를 이어 갑니다.' },
      { code: 'COL', title: 'Color Science', label: '색채 과학', description: '노출과 대비, 색으로 장면 사이의 연속성을 만듭니다.' },
    ],
  },
  ja: {
    dossierTitle: '監督の記録', directorDiscipline: '監督 / ビジュアルアーティスト', plateLabel: '作家のイメージアーカイブ',
    labTitle: '映像と技術', formatsLabel: '映像フォーマット',
    disciplines: [
      { code: 'VP', title: 'Virtual Production', label: 'バーチャルプロダクション', description: '実写の空間とデジタルの情景を、ひとつの視点で結ぶ。' },
      { code: 'VFX', title: 'CGI / VFX', label: 'デジタル視覚効果', description: '三次元の構築から合成まで、光の一貫した表現を探る。' },
      { code: 'COL', title: 'Color Science', label: '色彩科学', description: '露出、コントラスト、色彩で、ショットの連続性を整える。' },
    ],
  },
};

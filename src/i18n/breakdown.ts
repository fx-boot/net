import type { Language } from './dictionaries';

interface BreakdownCopy {
  title: string;
  descriptor: string;
  description: string;
  instruction: string;
  controlLabel: string;
  rawRegion: string;
  finalRegion: string;
  imageAlt: string;
  unavailable: string;
}

export const breakdownCopy: Record<Language, BreakdownCopy> = {
  zh: {
    title: '光的两种状态', descriptor: '色彩研究',
    description: '同一张 Mixkit 授权剧照的交互式色彩研究：左侧通过 CSS 模拟低反差未调色画面，右侧为显示调色后的画面。并非实际原始 Log 素材或项目视效交付。',
    instruction: '移动视线，或拖动分界线。', controlLabel: '调整原始与最终画面的分界位置',
    rawRegion: '左侧低反差画面', finalRegion: '右侧调色画面', imageAlt: '光线透过亚克力折射于时装人物的面部', unavailable: '画面暂时无法载入。',
  },
  en: {
    title: 'Two states of light', descriptor: 'Color study',
    description: 'An interactive color study of one licensed Mixkit frame. CSS simulates a low-contrast ungraded image on the left; the right displays the final presentation grade. This is not an original Log plate or a delivered VFX project.',
    instruction: 'Move across the frame, or drag the divide.', controlLabel: 'Adjust the divide between ungraded and final images',
    rawRegion: 'low-contrast image on the left', finalRegion: 'graded image on the right', imageAlt: 'Light refracted through acrylic across a fashion model’s face', unavailable: 'The image could not be loaded.',
  },
  ko: {
    title: '빛의 두 가지 상태', descriptor: '색채 연구',
    description: '동일한 Mixkit 라이선스 스틸의 인터랙티브 색채 연구입니다. 왼쪽은 CSS로 낮은 대비의 무보정 화면을 모사하고, 오른쪽은 최종 디스플레이 그레이드를 보여 줍니다. 실제 원본 Log 플레이트나 납품된 VFX 프로젝트가 아닙니다.',
    instruction: '화면을 가로지르거나 경계선을 드래그하세요.', controlLabel: '무보정 화면과 최종 화면의 경계 위치 조절',
    rawRegion: '왼쪽의 낮은 대비 화면', finalRegion: '오른쪽의 색보정 화면', imageAlt: '아크릴을 통과한 빛이 패션 모델의 얼굴에 굴절되는 장면', unavailable: '이미지를 불러올 수 없습니다.',
  },
  ja: {
    title: '光のふたつの状態', descriptor: '色彩研究',
    description: '同一のMixkit使用許諾済みスチルによる、インタラクティブな色彩研究。左側はCSSで低コントラストの未調整画面を模し、右側は最終表示用のグレードです。実際のLog原板や納品済みVFX作品ではありません。',
    instruction: '画面をなぞる、または境界線をドラッグ。', controlLabel: '未調整画面と最終画面の境界位置を調整',
    rawRegion: '左側の低コントラスト画面', finalRegion: '右側のカラーグレード画面', imageAlt: 'アクリル越しの光がファッションモデルの顔に屈折する場面', unavailable: '画像を読み込めませんでした。',
  },
};

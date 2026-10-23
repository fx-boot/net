import type { Language } from './dictionaries';

export const scrubCopy: Record<Language, { label: string; instructions: string; frame: string }> = {
  zh: { label: '擦洗影片关键帧', instructions: '左右移动指针浏览分镜。键盘聚焦时间线后可使用方向键；按作品标题播放完整影片。', frame: '关键帧' },
  en: { label: 'Scrub film key frames', instructions: 'Move across the frame to scan the film. Focus the timeline and use arrow keys, or open the film from its title.', frame: 'Key frame' },
  ko: { label: '영화 주요 프레임 탐색', instructions: '화면 위에서 포인터를 좌우로 움직여 장면을 살펴보세요. 타임라인에 초점을 두고 방향키를 사용하거나 작품 제목으로 전체 영상을 여세요.', frame: '주요 프레임' },
  ja: { label: '映画のキーフレームをスクラブ', instructions: '画面上でポインターを左右に動かして場面を確認できます。タイムラインにフォーカスして矢印キーを使うか、作品名から全編を再生してください。', frame: 'キーフレーム' },
};

import type { Language } from './dictionaries';
export const previewCopy: Record<Language, { pause: string; play: string }> = {
  zh: { pause: '暂停预览', play: '播放预览' },
  en: { pause: 'PAUSE PREVIEW', play: 'PLAY PREVIEW' },
  ko: { pause: '미리보기 일시정지', play: '미리보기 재생' },
  ja: { pause: 'プレビューを一時停止', play: 'プレビューを再生' },
};

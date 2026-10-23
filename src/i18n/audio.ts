import type { Language } from './dictionaries';
import type { CinemaAudioStatus } from '../lib/cinemaAudio';

interface AudioCopy {
 enable: string;
 disable: string;
 status: Record<CinemaAudioStatus, string>;
}

export const audioCopy: Record<Language, AudioCopy> = {
 zh: {
  enable: '开启放映室环境声', disable: '关闭放映室环境声',
  status: { off: '环境声已关闭。', loading: '正在开启环境声。', on: '环境声已开启。', paused: '环境声已暂停；点击声音按钮可重新开启。', blocked: '请关闭弹窗并返回页面后再开启声音。', unavailable: '此浏览器不支持环境声。', error: '环境声未能开启；请再次点击声音按钮重试。' },
 },
 en: {
  enable: 'Enable projection-room atmosphere', disable: 'Turn off projection-room atmosphere',
  status: { off: 'Atmosphere is off.', loading: 'Starting atmosphere.', on: 'Atmosphere is on.', paused: 'Atmosphere paused. Use the sound button to enable it again.', blocked: 'Close the dialog and return to this page before enabling sound.', unavailable: 'This browser does not support atmosphere audio.', error: 'Sound could not start. Select the sound button to try again.' },
 },
 ko: {
  enable: '상영실 환경음 켜기', disable: '상영실 환경음 끄기',
  status: { off: '환경음이 꺼졌습니다.', loading: '환경음을 켜고 있습니다.', on: '환경음이 켜졌습니다.', paused: '환경음이 일시 정지되었습니다. 소리 버튼을 눌러 다시 켤 수 있습니다.', blocked: '대화 상자를 닫고 페이지로 돌아온 뒤 소리를 켜 주세요.', unavailable: '이 브라우저는 환경음을 지원하지 않습니다.', error: '소리를 켜지 못했습니다. 소리 버튼을 눌러 다시 시도해 주세요.' },
 },
 ja: {
  enable: '映写室の環境音をオンにする', disable: '映写室の環境音をオフにする',
  status: { off: '環境音はオフです。', loading: '環境音を開始しています。', on: '環境音はオンです。', paused: '環境音を一時停止しました。サウンドボタンで再開できます。', blocked: 'ダイアログを閉じ、このページに戻ってからサウンドをオンにしてください。', unavailable: 'このブラウザーは環境音に対応していません。', error: 'サウンドを開始できませんでした。サウンドボタンでもう一度お試しください。' },
 },
};

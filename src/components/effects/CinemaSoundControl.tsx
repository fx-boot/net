import { useSyncExternalStore } from 'react';
import { cinemaAudio } from '../../lib/cinemaAudio';
import { audioCopy } from '../../i18n/audio';
import { useLanguage } from '../../i18n/LanguageContext';

export function CinemaSoundControl({blocked}:{blocked:boolean}) {
 const {language}=useLanguage(),sound=audioCopy[language];
 const audio=useSyncExternalStore(cinemaAudio.subscribe,cinemaAudio.getSnapshot,cinemaAudio.getSnapshot);
 return <div className="cinema-audio-panel"><button className="sound-control" aria-label={`SOUND [ ${audio.active?'ON':'OFF'} ] — ${audio.active?sound.disable:sound.enable}`} aria-pressed={audio.active} aria-busy={audio.status==='loading'} aria-describedby="cinema-audio-status" title={sound.status[audio.status]} data-audio-state={audio.status} data-audio-context={audio.contextState} disabled={blocked||audio.status==='unavailable'} onClick={()=>{void cinemaAudio.toggleAtmosphere();}}><span aria-hidden="true" className={`sound-wave ${audio.active?'is-on':''}`}><i/><i/><i/><i/></span>SOUND [ {audio.active?'ON':'OFF'} ]</button><span id="cinema-audio-status" className="sr-only" role="status" aria-live="polite">{sound.status[audio.status]}</span></div>;
}

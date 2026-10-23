import { OpticalText } from '../effects/OpticalText';
import { useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { editorial } from '../../i18n/editorial';
import { useScrollScene } from '../../hooks/useScrollScene';
import { recordGeometryRead, type CinemaFrame } from '../../lib/cinemaFrames';
import { brandCopy } from '../../i18n/brand';
import { atelierCopy } from '../../i18n/atelier';
import { geoCopy } from '../../i18n/geo';

function focusReading(node: HTMLParagraphElement, frame: CinemaFrame) {
 const center = frame.height * 0.5;
 const band = Math.max(80, frame.height * 0.14);
 const values = Array.from(node.querySelectorAll<HTMLElement>('.reading-sentence'), sentence => {
  recordGeometryRead(); const rect = sentence.getBoundingClientRect();
  const distance = Math.abs(rect.top + rect.height / 2 - center);
  const focus = Math.max(0, Math.min(1, 1 - Math.max(0, distance - 38) / band));
  return {sentence,focus};
 });
 return () => values.forEach(({sentence,focus}) => sentence.style.setProperty('--reading-focus', focus.toFixed(3)));
}
function resetReading(node: HTMLParagraphElement) {
 node.querySelectorAll<HTMLElement>('.reading-sentence').forEach(sentence => sentence.style.removeProperty('--reading-focus'));
}
export function DirectorStatement() {
 const { language } = useLanguage();
 const statement = editorial[language].monologue;
 const originalSentences = statement.split(/\n+/u);
 const sentences = [geoCopy[language].directorOpening, ...originalSentences];
 const renderSentence = (sentence: string, index: number) => {
  if (language !== 'ko' || index !== sentences.length - 1) return sentence;
  const ending = sentence.trimEnd().split(/\s+/u).slice(-2).join(' ');
  const start = sentence.lastIndexOf(ending);
  return start < 0 ? sentence : <>{sentence.slice(0,start)}<span className="reading-ending">{sentence.slice(start)}</span></>;
 };
 const root = useRef<HTMLParagraphElement>(null);
 useScrollScene(root, focusReading, resetReading, language);
 return <div className="director-statement"><h2 id="about-heading" className="statement-caption"><span>{brandCopy[language].voice}</span><span className="statement-title"><OpticalText text="ACRO HAT"/></span><span>{atelierCopy[language].directorDiscipline}</span></h2><p ref={root} className="monologue">{sentences.map((sentence,index) => <span className={`reading-sentence ${index === 0 ? 'monologue-lead' : 'monologue-body'}`} key={`${language}-${index}`}>{renderSentence(sentence,index)}</span>)}</p></div>;
}

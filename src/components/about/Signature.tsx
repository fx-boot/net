import { animate, svg } from 'animejs';
import { useReveal } from '../../hooks/useReveal';
import { useLanguage } from '../../i18n/LanguageContext';
import { brandCopy } from '../../i18n/brand';
function revealSignature() { animate(svg.createDrawable('.signature-stroke'), { draw: ['0 0', '0 1'], duration: 1600, ease: 'inOutQuad' }); }
export function Signature() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>(revealSignature);
  return <div ref={ref} className="signature signature-reservation"><svg viewBox="0 0 270 60" aria-hidden="true"><path className="signature-stroke" d="M12 42C76 39 174 40 255 42" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg><span>{brandCopy[language].signature} / DONG HAO</span></div>;
}

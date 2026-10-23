import { useRef } from 'react';
import { useOpticalReveal } from '../../hooks/useOpticalReveal';
import { useSpatialScroll } from '../../hooks/useSpatialScroll';
export function OpticalText({ text }: { text: string }) {
 const root = useRef<HTMLSpanElement>(null);
 useOpticalReveal(root, true, text);
 useSpatialScroll(root);
 return <span ref={root} className="optical-text"><span className="optical-sharp">{text}</span><span className="optical-ghost" aria-hidden="true">{text}</span></span>;
}

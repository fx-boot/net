import { useState, type ImgHTMLAttributes } from 'react';
export function MediaImage({ src, alt, fallbackSrc = '/media/fallback.svg', ...props }: ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }) {
  const [failed, setFailed] = useState(false);
  return <img {...props} src={failed ? fallbackSrc : src} alt={alt} onError={() => setFailed(true)} />;
}

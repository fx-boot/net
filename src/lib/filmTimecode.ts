/** Nominal, non-drop-frame monitor display; source timestamps stay in seconds. */
export function filmTimecode(seconds: number, frameRate: number) {
  const rate = Math.max(1, Math.round(frameRate));
  const total = Math.max(0, Math.floor(seconds * rate));
  const frames = total % rate;
  const wholeSeconds = Math.floor(total / rate);
  return [Math.floor(wholeSeconds / 3600), Math.floor(wholeSeconds / 60) % 60, wholeSeconds % 60, frames].map(value => String(value).padStart(2, '0')).join(':');
}

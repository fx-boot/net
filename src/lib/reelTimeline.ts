import type { ReelChapter } from '../types/portfolio';

export const validDuration = (duration: number) => Number.isFinite(duration) && duration > 0;
export function seekTime(request: number, duration: number): number | null {
  if (!validDuration(duration) || !Number.isFinite(request)) return null;
  return Math.min(Math.max(0, duration - 0.05), Math.max(0, request));
}
export function reelPosition(current: number, duration: number, chapters: ReelChapter[]) {
  if (!validDuration(duration)) return { progress: 0, chapterId: null };
  const time = Number.isFinite(current) ? Math.max(0, Math.min(current, duration)) : 0;
  const eligible = chapters.filter(c => Number.isFinite(c.start) && c.start >= 0 && c.start < duration).sort((a, b) => a.start - b.start);
  return { progress: time / duration, chapterId: eligible.findLast(c => c.start <= time)?.id ?? null };
}
export function timecode(seconds: number, frameRate: number) {
  const time = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const fps = Number.isFinite(frameRate) ? Math.max(1, Math.min(120, Math.round(frameRate))) : 24;
  const whole = Math.floor(time);
  return [Math.floor(whole / 3600), Math.floor(whole / 60) % 60, whole % 60, Math.min(fps - 1, Math.floor((time - whole) * fps))].map(n => String(n).padStart(2, '0')).join(':');
}
export function durationLabel(seconds: number) {
  const time = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;
}

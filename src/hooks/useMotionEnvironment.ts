import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  document.addEventListener('visibilitychange', callback);
  return () => {
    media.removeEventListener('change', callback);
    document.removeEventListener('visibilitychange', callback);
  };
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
}
export function usePageVisible() {
  return useSyncExternalStore(subscribe, () => !document.hidden, () => true);
}

const desktopQuery = '(min-width: 701px) and (hover: hover) and (pointer: fine)';
function subscribeDesktop(callback: () => void) {
 const media = window.matchMedia(desktopQuery); media.addEventListener('change', callback);
 return () => media.removeEventListener('change', callback);
}
export function useDesktopPointer() { return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => false); }

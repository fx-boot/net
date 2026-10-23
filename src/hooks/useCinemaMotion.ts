import type { RefObject } from 'react';
import { useOpticalReveal } from './useOpticalReveal';
export function useCinemaMotion(root: RefObject<HTMLElement | null>, entered: boolean) {
 useOpticalReveal(root, entered);
}

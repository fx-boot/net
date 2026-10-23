import type { Filter } from '../types/portfolio';
export const filterKeys = { All: 'all', 'AI & Hybrid': 'aiHybrid', Animation: 'animation', 'Live-action & Drama': 'liveAction', 'Commercials & PV': 'commercialsPv' } as const;
export const filters: Filter[] = ['All', 'AI & Hybrid', 'Animation', 'Live-action & Drama', 'Commercials & PV'];

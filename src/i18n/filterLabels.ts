import type { Filter } from '../types/portfolio';
export const filterKeys = { All: 'all', Commercials: 'commercials', Narrative: 'narrative', 'Visual Tech': 'visualTech' } as const;
export const filters: Filter[] = ['All', 'Commercials', 'Narrative', 'Visual Tech'];

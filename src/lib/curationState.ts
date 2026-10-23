import type { Language } from '../i18n/dictionaries';
import type { Filter, WorkView } from '../types/portfolio';

export interface CurationState { language: Language; revision: number; filter: Filter; view: WorkView }

/** A new editorial edition starts unfiltered; the visitor's viewing mode stays. */
export function curationTarget(requested: CurationState, language: Language, revision: number): CurationState {
  return requested.language === language && requested.revision === revision ? requested : { language, revision, filter: 'All', view: requested.view };
}

export const curationKey = ({ language, revision, filter, view }: CurationState) => `${language}:${revision}:${filter}:${view}`;

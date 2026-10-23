import type { Language } from './dictionaries';

export interface LanguageSelection { language: Language; revision: number }
/** Preserve each language change even when rapid A → B → A ends on the same code. */
export function selectLanguage(current: LanguageSelection, language: Language): LanguageSelection {
  return current.language === language ? current : { language, revision: current.revision + 1 };
}

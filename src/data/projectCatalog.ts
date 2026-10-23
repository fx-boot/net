import type { Language } from '../i18n/dictionaries';
import type { Project } from '../types/portfolio';
export type LocalizedCatalog = Record<Language, Project[]>;
const languages: Language[] = ['zh','en','ko','ja'];
const titles: Record<Language, string[]> = {
 zh:['岸线回声','午夜坐标','身体档案','风的路径','光的残像','透明界面'],
 en:['Coastal Echoes','Midnight Coordinates','Body Archive','The Path of Wind','Afterimages','Transparent Interface'],
 ko:['해안의 메아리','자정의 좌표','몸의 기록','바람의 경로','빛의 잔상','투명한 경계'],
 ja:['岸辺の残響','真夜中の座標','身体の記録','風の道筋','光の残像','透明な界面'],
};
// Presentation records reuse existing licensed media. Independent production
// records can replace any seed; no component relies on a six-film limit.
export function createProjectCatalog(seeds: LocalizedCatalog, count = 12): LocalizedCatalog {
 if (!Number.isSafeInteger(count) || count < 0) throw new RangeError('Catalog count must be a non-negative integer');
 const size = seeds.zh.length;
 if (count && !size) throw new Error('At least one localized source record is required');
 languages.forEach(language => {
  if (seeds[language].length !== size || seeds[language].some((film,index)=>film.id !== seeds.zh[index].id)) throw new Error('Localized catalog IDs must match');
 });
 return Object.fromEntries(languages.map(language=>[language,Array.from({length:count},(_,index): Project=>{
  const source=seeds[language][index%size];
  const edition=Math.floor(index/size);
  const title=edition ? `${titles[language][index%titles[language].length]}${edition>1?` / ${String(edition).padStart(2,'0')}`:''}` : source.title;
  return {...source,id:edition?`${source.id}-study-${edition}`:source.id,sourceProjectId:source.id,catalogOrder:index+1,title,
   englishTitle:edition?`${titles.en[index%titles.en.length]}${edition>1?` / ${String(edition).padStart(2,'0')}`:''}`:source.englishTitle,
   isPlaceholder:true,credits:source.credits.map(credit=>({...credit})),stills:[...source.stills],
   scrub:source.scrub?{...source.scrub,frames:source.scrub.frames.map(frame=>({...frame}))}:undefined};
 })])) as LocalizedCatalog;
}

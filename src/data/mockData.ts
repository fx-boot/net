import { catalogLanguages, createProjectCatalog, expandDemoEntries } from './projectCatalog';
import { brandCopy, studioBrand } from '../i18n/brand';
import type { Award, Client, DirectorProfile, MediaAsset, Project, ProjectEntry, RegionalWeight, Representative, ReelConfig } from '../types/portfolio';
export type { ProjectCredits, ProjectEntry, RegionalWeight } from '../types/portfolio';
import { dictionaries, type Language } from '../i18n/dictionaries';
import { scrubFrameSources } from './scrubFrames';

const stock = {
  tide: [101645, 'model-in-western-fashion-seen-through-acrylic', '冷暗光线中，人物轮廓穿过朱红色光学折射'],
  night: [5011, 'city-seen-from-the-heights-at-night', '暮蓝夜空下流动的城市灯火'],
  between: [41412, 'artistic-performance-of-a-pair-of-dancers', '黑白画面中两位舞者的身体对话'],
  wild: [44605, 'take-area-over-a-considerable-forest', '晨光中绵延的森林与山脉'],
  heat: [41409, 'performance-of-a-contemporary-dancer', '聚光灯前的当代舞者'],
  refraction: [101645, 'model-in-western-fashion-seen-through-acrylic', '透过亚克力看到的时装人物'],
  portrait: [2181, 'photographer-in-a-forest', '森林中的摄影师，导演肖像素材示意'],
} as const;
function asset(slug: keyof typeof stock, kind: 'poster' | 'preview' | 'full' | 'still' = 'poster'): MediaAsset {
  const [id, path, alt] = stock[slug];
  const poster = slug === 'tide' ? '/media/posters/cinema-refraction.jpg' : `/media/posters/${slug}.jpg`;
  const src = slug === 'tide'
    ? kind === 'poster' ? poster : kind === 'still' ? '/media/stills/cinema-refraction-2.jpg' : kind === 'preview' ? '/media/video/cinema-refraction-loop.mp4' : '/media/video/refraction-full.mp4'
    : kind === 'poster' ? poster : kind === 'still' ? `/media/stills/${slug}-2.jpg` : `/media/video/${slug}-${kind}.mp4`;
  const videoUrl = id === 101645 ? 'https://assets.mixkit.co/nie07c56ybs0w2m4zhfolf4gcg8u' : `https://assets.mixkit.co/videos/${id}/${id}-1080.mp4`;
  return { isPlaceholder: true, src, remoteSrc: kind === 'preview' || kind === 'full' ? videoUrl : src, poster, fallback: '/media/fallback.svg', sourceUrl: `https://mixkit.co/free-stock-video/${path}-${id}/`, licenseUrl: 'https://mixkit.co/license/#videoFree', author: 'Mixkit contributor · 详见素材原始页', alt };
}
const concepts: Array<{ id: keyof typeof stock; title: string; englishTitle: string; category: Project['category']; regionalWeight: RegionalWeight; format: string; year: number; duration: string; description: string; note: string }> = [
  { id: 'tide', title: '潮汐之后', englishTitle: 'After the Tide', regionalWeight: { zh: 90, en: 80, ja: 70, ko: 75 }, category: 'Narrative', format: '短片概念', year: 2026, duration: '00:18', description: '光线退去，人物在折射的边界重新显影。', note: '把记忆看作一种光学现象。朱红色反光掠过人物，透明介质改变距离；每一次清晰与失焦，都是情绪的潮汐。这个影像研究关注材质、轮廓和暗部的留白。' },
  { id: 'night', title: '夜行者', englishTitle: 'Night Passage', regionalWeight: { zh: 100, en: 90, ja: 40, ko: 70 }, category: 'Commercials', format: '品牌影像概念', year: 2026, duration: '00:25', description: '越过城市的表面，寻找夜色里仍未熄灭的温度。', note: '车灯是一句没有写完的话。以高处的凝视代替快速剪辑，让城市的呼吸成为画面的节拍；冷暖交界处，是这部品牌影像的情感起点。' },
  { id: 'between', title: '无声之间', englishTitle: 'In Between', regionalWeight: { zh: 60, en: 75, ja: 100, ko: 80 }, category: 'Visual Tech', format: '舞蹈影像概念', year: 2025, duration: '00:22', description: '语言停下来，身体继续说话。', note: '身体之间的距离比动作本身更动人。黑白不是怀旧，而是去掉多余的解释，让视线停在呼吸、肌理和一次未完成的靠近上。' },
  { id: 'wild', title: '旷野来信', englishTitle: 'Letters from the Wild', regionalWeight: { zh: 55, en: 60, ja: 90, ko: 60 }, category: 'Narrative', format: '实验短片概念', year: 2025, duration: '00:43', description: '离开熟悉的坐标，让一封没有地址的信抵达。', note: '把镜头交给风，给未知留出时间。俯瞰的视角慢慢消解边界，树木不再是背景，而是一整片正在缓慢书写的生命。' },
  { id: 'heat', title: '余温', englishTitle: 'Residual Heat', regionalWeight: { zh: 65, en: 95, ja: 65, ko: 100 }, category: 'Visual Tech', format: '音乐短片概念', year: 2025, duration: '00:19', description: '光离开之后，动作还留在空气里。', note: '让一个动作走到尽头，再多停留一秒。聚光灯将身体从黑暗中剥离，影子则保留它的另一半。这个片段研究克制与释放之间的临界点。' },
  { id: 'refraction', title: '折光', englishTitle: 'Refraction', regionalWeight: { zh: 80, en: 100, ja: 60, ko: 90 }, category: 'Commercials', format: '时装影像概念', year: 2024, duration: '00:18', description: '真实不止一种形状。', note: '透明材质既是窗口也是阻隔。人物在光的折射中不断改变轮廓，服装、皮肤和空间成为同一种质地。这是一封写给不确定性的影像短笺。' },
];
const baseProjects: Project[] = concepts.map((p) => ({
  ...p, isPlaceholder: true, cover: asset(p.id), preview: asset(p.id, 'preview'), fullFilm: asset(p.id, 'full'), stills: [asset(p.id), asset(p.id, 'still')],
  scrub: p.id === 'tide' ? {
    durationSeconds: 18.44, frameRate: 24, sourceFrameRate: 23.98,
    frames: [3, 7, 11, 15].map((sourceTime, index) => ({ ...asset('tide', 'still'), src: `/media/stills/cinema-refraction-${index + 1}.jpg`, remoteSrc: `/media/stills/cinema-refraction-${index + 1}.jpg`, sourceTime })),
  } : p.id === 'portrait' ? undefined : {
    durationSeconds: scrubFrameSources[p.id].durationSeconds,
    frameRate: scrubFrameSources[p.id].frameRate,
    sourceFrameRate: scrubFrameSources[p.id].sourceFrameRate,
    frames: scrubFrameSources[p.id].frames.map(frame => ({ ...asset(p.id, 'still'), src: frame.src, remoteSrc: frame.src, sourceTime: frame.sourceTime })),
  },
  credits: [
    { role: 'Client / 客户', name: p.category === 'Commercials' ? 'Morrow Studio（演示品牌）' : 'Independent study（演示项目）', isPlaceholder: true },
    { role: 'Agency / 代理商', name: 'North Window（虚构）', isPlaceholder: true },
    { role: 'DOP / 摄影指导', name: '林屿 Lin Yu（虚构）', isPlaceholder: true },
    { role: 'Production / 制作', name: 'Still Room Pictures（虚构）', isPlaceholder: true },
    { role: 'Year / 概念年份', name: String(p.year), isPlaceholder: true },
    { role: 'Footage / 实际素材', name: 'Mixkit 授权素材，非导演实拍作品', isPlaceholder: true },
  ],
}));
const portraitAsset: MediaAsset = {
  isPlaceholder: true,
  src: typeof __DIRECTOR_PORTRAIT_SRC__ === 'string' ? __DIRECTOR_PORTRAIT_SRC__ : studioBrand.portraitFallback,
  remoteSrc: studioBrand.portrait, poster: studioBrand.portraitFallback, fallback: studioBrand.portraitFallback,
  sourceUrl: '/media/director/README.md', licenseUrl: '/media/director/README.md',
  author: 'LANCHUAN · Director asset reservation', alt: brandCopy.zh.portraitAlt,
};
export const director: DirectorProfile = { isPlaceholder: true, name: '東浩', englishName: 'Dong Hao', role: 'Founder & Chief Director', statement: '让那些未被说出的，留在画面里。', portrait: portraitAsset };
export const showreel: MediaAsset = { ...asset('refraction', 'full'), src: '/media/video/cinema-showreel.mp4', remoteSrc: '/media/video/cinema-showreel.mp4', poster: '/media/posters/cinema-showreel.jpg', hasAudio: false, alt: '光学折射、聚光舞者与夜间城市组成的 12 秒静音混剪' };
export const reelConfig: ReelConfig = {
  frameRate: 24, expectedDuration: 12,
  chapters: [
    { id: '01', projectId: 'refraction', start: 0 },
    { id: '02', projectId: 'heat', start: 4 },
    { id: '03', projectId: 'night', start: 8 },
  ],
};
export const awards: Award[] = [
  { festival: 'Cannes Lions', honor: 'Film Craft · 入围版式示例', year: 2026, film: '夜行者', isPlaceholder: true },
  { festival: 'Sundance', honor: 'Short Film · 展映版式示例', year: 2025, film: '潮汐之后', isPlaceholder: true },
  { festival: 'FIRST', honor: '青年电影展 · 入围版式示例', year: 2025, film: '旷野来信', isPlaceholder: true },
];
export const clients: Client[] = ['Morrow', 'FORME', 'North Window', 'ATELIER 09', 'Still Room'].map(name => ({ name, isPlaceholder: true }));
export const representatives: Representative[] = [
  { region: brandCopy.zh.productionChannel, name: brandCopy.zh.company, title: brandCopy.zh.productionRole, company: brandCopy.zh.productionAudience, email: studioBrand.emails[0], isPlaceholder: true },
  { region: brandCopy.zh.directorChannel, name: brandCopy.zh.directorName, title: brandCopy.zh.directorAgency, company: brandCopy.zh.directorAudience, email: studioBrand.emails[1], isPlaceholder: true },
];
export const socials = [{ label: 'Vimeo', href: 'https://vimeo.com/' }, { label: 'IMDb', href: 'https://www.imdb.com/' }, { label: 'Instagram', href: 'https://www.instagram.com/' }];

// Explicit four-language records. IDs and media URLs remain stable across language changes.
type ProjectText = { title: string; format: string; description: string; note: string; alt: string };
const translatedProjects: Record<Exclude<Language, 'zh'>, ProjectText[]> = {
  en: [
    { title: 'After the Tide', format: 'Short film concept', description: 'As light recedes, a figure emerges again at the edge of refraction.', note: 'Memory becomes an optical phenomenon. Vermilion reflections pass over a figure while translucent material changes our sense of distance. Each shift between clarity and defocus is an emotional tide. This study considers texture, silhouettes and the space held in shadow.', alt: 'A figure crossing vermilion optical reflections in low-key light' },
    { title: 'Night Passage', format: 'Brand film concept', description: 'Beyond the city’s surface, a warmth that refuses to go dark.', note: 'Headlights trace an unfinished sentence. A patient gaze from above replaces rapid cuts, letting the city’s breathing set the rhythm. The meeting of cool and warm light becomes an emotional starting point.', alt: 'City lights moving beneath a deep blue evening sky' },
    { title: 'In Between', format: 'Dance film concept', description: 'When language stops, the body keeps speaking.', note: 'The distance between bodies matters as much as the movement. Black and white strips away explanation, keeping our attention on breath, texture and a gesture that never quite reaches its destination.', alt: 'Two contemporary dancers in a black-and-white close-up' },
    { title: 'Letters from the Wild', format: 'Experimental short concept', description: 'A letter without an address, beyond familiar coordinates.', note: 'Let the wind hold the camera; give the unknown time. From above, the forest gradually dissolves its boundaries. Trees stop being scenery and become a living page, slowly writing itself.', alt: 'An expansive forest and mountains in morning light' },
    { title: 'Residual Heat', format: 'Music film concept', description: 'After the light leaves, movement lingers in the air.', note: 'Let a gesture end, then stay one second longer. A spotlight separates the body from the dark while its shadow keeps the other half. This study looks for the threshold between restraint and release.', alt: 'A contemporary dancer performing before a spotlight' },
    { title: 'Refraction', format: 'Fashion film concept', description: 'Reality has more than one shape.', note: 'Transparent material is both a window and a barrier. Light repeatedly reshapes the figure, bringing clothing, skin and space into a single texture. A small visual letter to uncertainty.', alt: 'A fashion model seen through a translucent acrylic surface' },
  ],
  ko: [
    { title: '밀물이 지나간 뒤', format: '단편영화 콘셉트', description: '빛이 물러나면 굴절의 경계에서 인물이 다시 모습을 드러냅니다.', note: '기억을 하나의 광학 현상으로 바라봅니다. 붉은 반사광이 인물을 스치고 투명한 소재는 거리감을 바꿉니다. 선명함과 흐림 사이의 변화가 감정의 밀물과 썰물을 이룹니다. 질감과 윤곽, 어둠 속 여백을 탐구하는 영상 연구입니다.', alt: '낮은 조도 속 붉은 광학 반사광을 가로지르는 인물' },
    { title: '밤을 지나는 사람', format: '브랜드 필름 콘셉트', description: '도시의 표면 너머, 아직 꺼지지 않은 온도를 찾아서.', note: '차의 불빛은 끝맺지 않은 문장입니다. 빠른 편집 대신 높은 곳에서의 응시로 도시의 호흡을 리듬으로 삼습니다. 차가운 빛과 따뜻한 빛이 만나는 지점이 감정의 출발점입니다.', alt: '짙은 푸른 밤하늘 아래 흐르는 도시의 불빛' },
    { title: '침묵의 사이', format: '댄스 필름 콘셉트', description: '말이 멈추면 몸은 계속 이야기합니다.', note: '동작 자체만큼 몸과 몸 사이의 거리가 중요합니다. 흑백은 향수가 아니라 설명을 덜어내는 방식입니다. 호흡과 질감, 끝내 닿지 않은 몸짓에 시선을 머물게 합니다.', alt: '흑백 화면 속 두 현대무용가의 몸짓' },
    { title: '야생에서 온 편지', format: '실험 단편 콘셉트', description: '익숙한 좌표를 벗어나, 주소 없는 편지가 닿도록.', note: '바람에 카메라를 맡기고 미지의 것에 시간을 줍니다. 위에서 바라보는 시선 속에서 숲의 경계가 서서히 흐려집니다. 나무는 배경을 넘어 스스로 쓰이는 살아 있는 페이지가 됩니다.', alt: '아침 햇살 아래 펼쳐진 숲과 산맥' },
    { title: '남은 온기', format: '음악영상 콘셉트', description: '빛이 떠난 뒤에도 움직임은 공기 속에 남습니다.', note: '몸짓이 끝난 뒤 한 초 더 머뭅니다. 조명은 몸을 어둠에서 떼어내고 그림자는 그 반쪽을 간직합니다. 절제와 해방 사이의 경계점을 탐구하는 장면입니다.', alt: '스포트라이트 앞에서 춤추는 현대무용가' },
    { title: '굴절', format: '패션 필름 콘셉트', description: '현실에는 하나 이상의 형태가 있습니다.', note: '투명한 소재는 창이면서 장벽입니다. 빛의 굴절이 인물의 윤곽을 바꾸고 옷, 피부와 공간을 하나의 질감으로 엮습니다. 불확실성에 보내는 짧은 영상 편지입니다.', alt: '반투명 아크릴을 통해 보이는 패션 모델' },
  ],
  ja: [
    { title: '潮が引いたあと', format: '短編映画コンセプト', description: '光が退くとき、屈折の境界に人の輪郭がふたたび現れる。', note: '記憶をひとつの光学現象として見つめます。朱色の反射光が人物を横切り、透明な素材が距離を変える。鮮明さとぼけの移ろいが、感情の満ち引きとなります。質感と輪郭、暗部の余白を探る映像研究です。', alt: '暗い光のなか、朱色の光学反射を横切る人物' },
    { title: '夜をゆく', format: 'ブランド映像コンセプト', description: '街の表面を越えて、まだ消えない温度を探す。', note: '車の光は、書き終えられない一文です。速い編集の代わりに高所から見つめ、街の呼吸をリズムにします。冷たい光と暖かい光の境界から、感情が始まります。', alt: '深い青の夜空の下で流れる街の灯り' },
    { title: '沈黙のあいだ', format: 'ダンス映像コンセプト', description: '言葉が止まっても、身体は語り続ける。', note: '動きと同じくらい、身体と身体の距離に惹かれます。白黒は懐古ではなく、説明を取り去るための選択。呼吸や質感、届ききらない仕草に視線を留めます。', alt: '白黒の画面で対話する二人のダンサー' },
    { title: '野生からの手紙', format: '実験短編コンセプト', description: '慣れた座標を離れて、宛先のない手紙を届ける。', note: '風にカメラを預け、未知のものに時間を与える。見下ろす視点のなかで森の境界がゆっくり溶けていきます。木々は背景ではなく、自らを書き続ける生きた一頁になります。', alt: '朝の光に包まれる広大な森と山並み' },
    { title: '余熱', format: '音楽映像コンセプト', description: '光が去ったあとも、動きは空気に残る。', note: 'ひとつの動きが終わったら、もう一秒留まる。スポットライトが身体を暗闇から切り離し、影がその半分を保ちます。抑制と解放の境界を見つめる映像研究です。', alt: 'スポットライトの前で踊る現代舞踊のダンサー' },
    { title: '屈折', format: 'ファッション映像コンセプト', description: '現実の形は、ひとつではない。', note: '透明な素材は窓であり、隔たりでもあります。光の屈折が人物の輪郭を変え、服と肌と空間をひとつの質感へと結びます。不確かさへ宛てた、短い映像の手紙です。', alt: '半透明のアクリル越しに見るファッションモデル' },
  ],
};
const creditLabels: Record<Language, string[]> = {
  zh: ['客户', '代理商', '摄影指导', '制作', '概念年份', '实际素材'],
  en: ['Client', 'Agency', 'Director of photography', 'Production', 'Concept year', 'Actual footage'],
  ko: ['클라이언트', '에이전시', '촬영감독', '제작사', '콘셉트 연도', '실제 영상 소재'],
  ja: ['クライアント', '代理店', '撮影監督', '制作', 'コンセプト年', '実際の映像素材'],
};
const fictitious: Record<Language, string> = { zh: '虚构', en: 'fictional', ko: '가상', ja: '架空' };
const stockNotice: Record<Language, string> = { zh: 'Mixkit 授权素材，非导演实拍', en: 'Licensed Mixkit stock, not actual directing credits', ko: 'Mixkit 라이선스 소재, 실제 연출작 아님', ja: 'Mixkitの使用許諾済み素材。実際の演出作品ではありません' };
const mediaAuthor: Record<Language, string> = { zh: 'Mixkit 作者，详见原始页', en: 'Mixkit contributor, see source page', ko: 'Mixkit 제작자, 원본 페이지 참고', ja: 'Mixkit制作者。出典ページ参照' };
function translateAsset(media: MediaAsset, language: Language, alt: string): MediaAsset { return { ...media, alt, author: mediaAuthor[language] }; }
const baseProjectsByLanguage = Object.fromEntries((['zh', 'en', 'ko', 'ja'] as const).map(language => [language, baseProjects.map((project, index): Project => {
  const text = language === 'zh' ? { title: project.title, format: project.format, description: project.description, note: project.note, alt: project.cover.alt } : translatedProjects[language][index];
  const names = [`${project.category === 'Commercials' ? 'Morrow Studio' : 'Independent Study'} (${fictitious[language]})`, `North Window (${fictitious[language]})`, `${language === 'zh' ? '林屿' : 'Lin Yu'} (${fictitious[language]})`, `Still Room Pictures (${fictitious[language]})`, String(project.year), stockNotice[language]];
  return { ...project, ...text, cover: translateAsset(project.cover, language, text.alt), preview: translateAsset(project.preview, language, text.alt), fullFilm: translateAsset(project.fullFilm, language, text.alt), stills: project.stills.map(media => translateAsset(media, language, text.alt)), scrub: project.scrub ? { ...project.scrub, frames: project.scrub.frames.map(frame => ({ ...translateAsset(frame, language, text.alt), sourceTime: frame.sourceTime })) } : undefined, credits: creditLabels[language].map((role, i) => ({ role, name: names[i], isPlaceholder: true })) };
})])) as Record<Language, Project[]>;
const demoEntries: ProjectEntry[] = baseProjects.map((project, index) => {
  const field = (select: (value: Project) => string) => Object.fromEntries(catalogLanguages.map(language => [language, select(baseProjectsByLanguage[language][index])])) as Record<Language, string>;
  return {
    id: project.id, title: field(value => value.title), regionalWeight: { ...concepts[index].regionalWeight },
    category: project.category === 'Commercials' ? 'commercials' : project.category === 'Narrative' ? 'narrative' : 'visual-tech',
    year: String(project.year), duration: project.duration, isPlaceholder: true,
    coverPoster: project.cover.src, motionLoopSrc: project.preview.src, fullFilmSrc: project.fullFilm.src,
    stills: project.scrub!.frames.map(frame => frame.src),
    description: field(value => value.description), note: field(value => value.note), format: field(value => value.format), alt: field(value => value.cover.alt),
    provenance: { sourceUrl: project.cover.sourceUrl, licenseUrl: project.cover.licenseUrl, author: mediaAuthor },
    remoteSources: { motionLoopSrc: project.preview.remoteSrc, fullFilmSrc: project.fullFilm.remoteSrc }, fullFilmHasAudio: false,
    credits: {
      client: field(value => value.credits[0].name), agency: field(value => value.credits[1].name),
      dop: field(value => value.credits[2].name), production: field(value => value.credits[3].name),
      additional: [{ label: field(value => value.credits[5].role), value: field(value => value.credits[5].name) }],
    },
    scrub: { durationSeconds: project.scrub!.durationSeconds, frameRate: project.scrub!.frameRate, sourceFrameRate: project.scrub!.sourceFrameRate, frameTimes: project.scrub!.frames.map(frame => frame.sourceTime) },
  };
});
/** BRAND HANDOFF: replace this list with production ProjectEntry records. */
export const projectEntries: ProjectEntry[] = expandDemoEntries(demoEntries, 12);
export const createDemoCatalog = (count = 12) => createProjectCatalog(expandDemoEntries(demoEntries, count));
export const projectsByLanguage = createProjectCatalog(projectEntries);
export const projects = projectsByLanguage.zh;
const portraitAlt: Record<Language, string> = { zh: brandCopy.zh.portraitAlt, en: brandCopy.en.portraitAlt, ko: brandCopy.ko.portraitAlt, ja: brandCopy.ja.portraitAlt };
export const directorsByLanguage = Object.fromEntries((['zh', 'en', 'ko', 'ja'] as const).map(language => [language, { ...director, name: brandCopy[language].directorName, role: dictionaries[language].directorRole, statement: dictionaries[language].heroStatement, portrait: { ...director.portrait, alt: portraitAlt[language] } }])) as Record<Language, DirectorProfile>;
const awardHonors: Record<Language, string[]> = { zh: ['Film Craft · 入围版式示例', '短片 · 展映版式示例', '青年电影展 · 入围版式示例'], en: ['Film Craft · Shortlist layout example', 'Short film · Screening layout example', 'Youth film festival · Selection layout example'], ko: ['필름 크래프트 · 후보 레이아웃 예시', '단편 · 상영 레이아웃 예시', '청년영화제 · 선정 레이아웃 예시'], ja: ['フィルムクラフト · 候補表示の見本', '短編 · 上映表示の見本', '青年映画祭 · 選出表示の見本'] };
const festivalNames: Record<Language, string[]> = { zh: ['戛纳狮', '圣丹斯', 'FIRST 青年电影展'], en: ['Cannes Lions', 'Sundance', 'FIRST'], ko: ['칸 라이언즈', '선댄스', 'FIRST 청년영화제'], ja: ['カンヌライオンズ', 'サンダンス', 'FIRST 青年映画祭'] };
export const awardsByLanguage = Object.fromEntries((['zh', 'en', 'ko', 'ja'] as const).map(language => [language, awards.map((award, index) => ({ ...award, festival: festivalNames[language][index], honor: awardHonors[language][index], film: baseProjectsByLanguage[language][[1, 0, 3][index]].title }))])) as Record<Language, Award[]>;
export const representativesByLanguage = Object.fromEntries((['zh', 'en', 'ko', 'ja'] as const).map(language => {
  const copy = brandCopy[language];
  return [language, [
    { ...representatives[0], region: copy.productionChannel, name: copy.company, title: copy.productionRole, company: copy.productionAudience },
    { ...representatives[1], region: copy.directorChannel, name: copy.directorName, title: copy.directorAgency, company: copy.directorAudience },
  ]];
})) as Record<Language, Representative[]>;
export const clientsByLanguage: Record<Language, Client[]> = { zh: clients, en: clients, ko: clients, ja: clients };
export const showreelsByLanguage = Object.fromEntries((['zh', 'en', 'ko', 'ja'] as const).map(language => [language, translateAsset(showreel, language, dictionaries[language].reelDisclaimer)])) as Record<Language, MediaAsset>;

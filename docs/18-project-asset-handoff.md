# 正式影片与资产替换

`src/data/mockData.ts` 导出的 `projectEntries` 是页面实际使用的影片列表。`projectsByLanguage` 只由这个列表经 `createProjectCatalog()` 生成；切换语言不会改变影片 ID 或资源地址。输入接口在 `src/types/portfolio.ts`，并从 `src/data/projectCatalog.ts` 与 `mockData.ts` 重新导出。

当前 `expandDemoEntries(demoEntries, 12)` 仅生成演示片单。上线正式作品时，把 `projectEntries` 的赋值替换为自己的记录数组，不需要修改轮播、筛选或弹窗组件。列表长度即真实影片数量，可为 1、12、20 或 50；不要用演示扩充函数复制正式作品。示例中的路径是交接规范，需先放入自己的真实文件：

```ts
export const projectEntries: ProjectEntry[] = [{
  id: 'brand-film-2027',
  title: { zh: '新作', en: 'New Film', ko: '새로운 영화', ja: '新作' },
  category: 'commercials',
  year: '2027',
  duration: '01:30',
  coverPoster: '/media/projects/brand-film-2027/poster.jpg',
  motionLoopSrc: '/media/projects/brand-film-2027/loop.mp4',
  fullFilmSrc: '/media/projects/brand-film-2027/full.mp4',
  stills: [
    '/media/projects/brand-film-2027/still-1.jpg',
    '/media/projects/brand-film-2027/still-2.jpg',
    '/media/projects/brand-film-2027/still-3.jpg',
  ],
  credits: {
    client: 'Brand', agency: 'Agency', dop: 'Cinematographer',
    production: 'LANCHUAN',
  },
  description: { zh: '作品介绍', en: 'Film description', ko: '작품 소개', ja: '作品紹介' },
  note: { zh: '导演手记', en: 'Director’s note', ko: '감독 노트', ja: '監督ノート' },
  isPlaceholder: false,
  provenance: {
    sourceUrl: 'https://your-studio.example/film-rights',
    licenseUrl: 'https://your-studio.example/film-rights',
    author: 'LANCHUAN',
  },
}];
```

## 文件约定

- 所有以 `/media/` 开头的地址都对应 `public/media/` 下的文件。也可直接填写允许跨域访问的 HTTPS CDN 地址。不要在路径里填写 Windows 盘符。
- `coverPoster` 推荐 1920×804（2.39:1）JPEG/WebP。`motionLoopSrc` 推荐 6–12 秒、1280×536、H.264 MP4、24/25/30fps、无音轨、`faststart`；它专用于中央自动预览，与高清成片独立。
- `fullFilmSrc` 是完整成片，允许有声；弹窗播放器使用它。`fullFilmHasAudio: false` 可标记无音轨成片。
- `stills` 填 3–4 张真实关键帧，按影片时间先后排列。这一组路径同时驱动静帧画廊与擦洗层，不存在第二组要手工维护的静帧路径。
- 可选 `scrub: { durationSeconds, frameRate, sourceFrameRate, frameTimes }` 记录精确源时间。`frameTimes` 数量必须与 `stills` 一致且严格递增。不提供时，由 `duration` 与静帧数量均匀分配时间；此时应理解为预览定位，而非真实源片取样证明。
- `category` 只接受 `commercials`、`narrative`、`visual-tech`。界面标签由四语字典翻译。`id` 使用稳定的英文字母/数字/连字符组合，不能重复。
- 标题必须包含 `zh/en/ko/ja`。`description`、`note`、`format`、`alt` 可填四语字段，缺少当前语言时优先使用英文，再降级为空或影片名。Credits 的值可用统一人名字符串，也可用完整四语对象。
- 输入记录显式保留 `isPlaceholder`：现有演示素材为 `true`，已获品牌许可的正式成片由维护者明确改为 `false`。适配器会原样传递到资源及主创，不会伪造拍摄归属或授权。版权来源应补录 `MEDIA-LICENSES.md`。

Hero 独立于片单：修改同文件的 `showreel`（视频 `src`、`poster`、授权出处）及 `reelConfig`（真实时长、帧率、各章节起点）。本轮 Hero 为 12 秒三段剪辑，资源出处与生成参数见 `upstream/media/cinema-motion.json`；首部作品采用红色光学折射素材，原海边资源只留作历史文件，不进入活动片单。

## 交接验证

```text
node scripts/verify-project-catalog.mjs
npm run typecheck
npm run build
```

数据校验拒绝重复 ID、缺少四语标题、非法分类/年份/时长、非 HTTPS/根相对资源地址、不完整关键帧和错误时间序列。浏览器仍需确认文件可播放、海报可访问及移动端表现。新增或改写发布资源后，相应更新 `upstream/media/published-assets.json` 的 SHA-256，再运行 `npm run verify:assets`。

奖项、客户与联系资料各自独立维护，替换片单不会擅自把演示奖项转成新成片的获奖履历。

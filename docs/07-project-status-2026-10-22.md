# 导演作品集项目状态盘点

**盘点日期：2026-10-22（Asia/Shanghai）**  
**工程目录：`D:\网页设计\mo-chen-director`**  
范围：读取当前文件、核对历史验收、执行本地低成本检查、交付本报告。本轮没有改版、替换素材、升级依赖或部署；仅新增盘点文档/证据，并由构建命令重新生成 `dist/`。

## 1. 当前结论

项目已进入**本地概念演示版完成主要开发、等待内容落地与上线验收**的阶段。它是可构建的 React 网站，不是设计稿或单文件伪代码；但还不是正式导演官网。

- **概念演示版完成度：约 88%。正式上线版准备度：约 47%。** 二者是不同交付目标下的有依据估算，计算口径见下一节，不代表完成工时，也不是正式上线许可。
- 最近完成的是 10 月 19 日的画册式重构、四语文字切换、暖胶片调色及背景亮度修订。当前作品区为暖炭褐 `#29241F`，人物志为烟草棕 `#41372D`，已不是最初蓝黑底；布局采用 12 列非对称作品画册。
- 主流程已实现：进入首页、筛选作品、按需预览、打开影片详情、关闭并回到作品、阅读人物志/奖项、复制邮箱及切换语言。
- **内容仍是演示**：陈默 / Mo Chen 人设、六部作品的创作归属、主创、电影节记录与经纪信息均为占位。影像来自已记录来源的 Mixkit 素材，不能把有素材许可证理解为导演真实作品或获奖证明。邮箱仍是 `example.com`，社交链接仍是平台首页。
- **运行状态：本次检查时 5173 与 4173 无监听，访问 `http://127.0.0.1:5173/` 连接被拒绝。** 未发现正在运行的本地预览服务；这不是构建失败。本轮按“状态盘点”范围没有启动常驻服务，因此此刻没有可直接打开的在线预览，也没有已验证的公网网址。
- **阻塞情况**：没有发现阻止本地编译的技术问题。正式上线受真实内容、授权确认、域名/部署目标及补充验收制约。视觉最终认可也不能仅由开发方宣布。

### 本报告如何区分证据

| 标签 | 含义 |
| --- | --- |
| 本次实测 | 2026-10-22 重新执行的命令、文件盘点、HTTP 探测；没有进行本次浏览器交互测试 |
| 当前源码确认 | 文件中有相应逻辑或样式；不等同于在设备上运行通过 |
| 历史实测 | 10 月 16 日 / 19 日的报告、截图与 JSON；注明哪些界面后来被替换 |
| 未测 / 待交付 | 没有足够证据，不能写成通过或完成 |

## 2. 完成度与计算口径

概念演示版目标是“能在本机完整演示视觉与核心交互”；正式上线版目标还包括真实身份与内容、设备兼容、性能和发布运维。百分比为模块成熟度加权估算，**不是测试通过率、验收签字或工期预测**。估算误差约 ±5–10 个百分点。

| 模块 | 当前状态与依据 | 演示权重 × 成熟度 | 正式权重 × 成熟度 |
| --- | --- | ---: | ---: |
| 功能与交互 | 演示范围已完成；最新版本仍需完整回归，真实影片接入未做 | 35% × 95% | 25% × 85% |
| 视觉、排版与动效 | 进行中：重构及暖色修订已落地，有桌面截图；等待最终视觉确认及真机复核 | 25% × 90% | 20% × 80% |
| 内容、素材与四语 | 演示内容已完成；正式资料未开始接入。正式 5% 仅计入已有数据结构和来源管理准备 | 15% × 100% | 25% × 5% |
| 兼容、无障碍与性能验证 | 进行中：历史内嵌 Chromium 测试较充分，真机、多引擎、性能剖析缺失 | 20% × 65% | 20% × 35% |
| 运行、交付与部署 | 本地构建/说明已完成；正式托管、域名、CI、发布回滚未开始 | 5% × 80% | 10% × 10% |

演示：`35×0.95 + 25×0.90 + 15×1.00 + 20×0.65 + 5×0.80 = 87.75 ≈ 88%`。  
正式：`25×0.85 + 20×0.80 + 25×0.05 + 20×0.35 + 10×0.10 = 46.5 ≈ 47%`。

正式内容项权重大，是因为作品集的交付依赖真实作品与身份，不能用六条占位项目抵扣六部真实影片的交付。也不把后端、CMS、联系表单作为缺陷扣分：它们不在当前已实现的静态作品集范围内，是否新增须另定需求。

## 3. 页面现在是什么样

以下依据当前组件、CSS 和已有截图描述；**本次没有把截图当作今天重新操作浏览器的证据**。

| 区域 | 当前可见内容与交互 | 优点 / 实际限制 |
| --- | --- | --- |
| 首屏 | 全屏循环影片、底部超大 `MO CHEN`、带 `[00:24]` 时长的下划线混剪入口、小型暂停键与 `SOUND [OFF]`；1500ms 帘幕与标题入场衔接 | 层级较简洁，实际片长优先读媒体元数据。当前 Showreel 文件无音轨、`hasAudio:false`，声音键禁用，不存在已交付的有声导演混剪 |
| 作品列表 / 筛选 | 《潮汐之后》《夜行者》《无声之间》《旷野来信》《余温》《折光》；All / Commercials / Narrative / Music Videos 对应四语标签；12 列按 8/4、5/7、7/4 错落 | 卡片图面无文字/按钮覆盖、无十字轴线；信息放在图下。切换先退出再交错进入；数据 ID 稳定。手机改单列 |
| 预览 / 调色 | 桌面精细指针下仅当前 hover/focus 项加载预览；默认低饱和滤镜，激活后 0.7s 恢复色彩并 scale(1.015)，附轻暗角 | 来源不同的影像更统一；CSS 滤镜是浏览器显示效果，不是真正的文件 LUT 或逐镜头专业调色 |
| 详情播放器 | 原生视频控件、全屏入口、标题说明、手记、五项主创资料、两张剧照；影片在详情首屏最上方 | 指针进入可执行海报 520ms 展开放映、关闭 340ms 归位；键盘/减少动态效果直接进入。原生 dialog、焦点约束、ESC、滚动锁和销毁视频逻辑保留；完整影片实际仍是素材片段 |
| 关于导演 | 左侧黑白暖银盐摄影师肖像，桌面 Sticky；右侧四语连续衬线独白、金色首句、SVG 签名，局部 12fps / 0.06 颗粒 | 烟草棕章节底色与作品区拉开层次；肖像是素材中的摄影师，独白为演示创作，不是本人授权履历 |
| 荣誉 | 年份—电影节—单元—影片的字幕表；悬停/键盘聚焦提亮，桂冠为黄铜色 | 已替代旧版桂冠卡片，不再有桂冠内标题错位问题；Cannes Lions / Sundance / FIRST 记录仍是版式演示，未获事实核验 |
| 联系 / 页脚 | 两列经纪资料、衬线斜体邮箱、复制后就地反馈，失败显示可选中文字框；大字页脚、社交入口、Credits | 无卡片边框和毛玻璃。没有联系提交接口；邮箱与社交地址未接入真实对象。声明在 Credits 点击后出现，主页面不展示 |
| 移动端 | 700px 及以下单列作品、非 Sticky 肖像、折行奖项表、单列经纪资料；菜单含四语入口与 ESC 焦点归还 | 10 月 19 日 390×844 四语无横向溢出的记录存在；这不是 iOS/Android 真机结论，最新色彩版未重新跑完整设备矩阵 |
| 多语言 | zh/en/ko/ja React Context 字典，按钮式语言切换；localStorage 记忆；更新 html lang、页面标题和主要文字 | 无刷新切换、稳定作品 ID。不是四个可索引语言 URL；描述元数据仍为中文静态值，四语仍需母语与品牌文案审核 |

### 当前色彩与影像规则

| 用途 | 当前值 |
| --- | --- |
| 作品与页面画布 | `#29241F` |
| 人物志主体背景 | `#41372D`，上下渐变衔接 |
| 奖项背景 | `#211D19` |
| 联系 / 页脚 | `#342C25` |
| 播放器深色与次级层 | `#0A0908` / `#141210` |
| 正文 / 次级文字 | `#F4F0EA` / `#B7AC9C` |
| 分类圆点 / 黄铜细节 | `#C84B31` / `#C5A059` |
| 细线 | `rgba(244,240,234,0.14)` |

### 截图入口与适用版本

**最新背景修订，2026-10-19，1440×900 测试视口：**

![最新作品区暖炭褐背景](../output/warm-background-2026-10-19/works-1440.png)

![最新人物志烟草棕背景](../output/warm-background-2026-10-19/about-1440.png)

- [最新 Hero](../output/warm-background-2026-10-19/hero-1440.png)。
- [奖项布局参考](../output/film-color-2026-10-19/awards-1440.png)、[联系布局参考](../output/film-color-2026-10-19/contact-1440.png)：**属于最后一次背景提亮之前**，结构仍有参考价值，底色不能当作当前值。
- [画册全页结构参考](../output/editorial-2026-10-19/full-page-1440.png)：更早的 10 月 19 日结构版，颜色也已过时。
- 最新背景修订目录只有 Hero / Works / About 三张，没有最新 Awards / Contact 或全页截图。本轮不伪装成已补拍。

### 预览地址

- 配置的开发地址：[http://127.0.0.1:5173/](http://127.0.0.1:5173/)；**盘点时不可连接，需先启动**。
- 构建预览通常为 `http://127.0.0.1:4173/`，需执行 preview，以终端实际输出为准。
- 没有已核实的公网部署地址。`dist/index.html` 应由 HTTP 静态服务器提供，不能直接用 `file://` 打开。

## 4. 源码、版本与组织

### 实际版本

下表读取本机 `node_modules/*/package.json`；关键版本与 package-lock 一致。不能把 package.json 的兼容范围下界误作实际安装版本。本轮没有执行安装/升级。

| 项目 | 当前安装版本 |
| --- | --- |
| Node / 项目内 npm | 24.19.0 / 12.2.0 |
| React / React DOM | 19.3.1 / 19.3.1 |
| Vite / React 插件 | 8.3.4 / 6.1.2 |
| TypeScript | 6.0.3 |
| Tailwind CSS / Vite 插件 | 4.3.3 / 4.3.3 |
| Anime.js | 4.5.0 |
| Lenis | 1.3.27 |
| Lucide React | 1.58.0 |
| Motion | 14.3.0（保留依赖，当前入口不再调用 BlurText） |
| oxlint | 1.88.0 |

例如 package.json 写的是 React `^19.2.8`、Vite `^8.3.0`、TypeScript `~6.0.2`；实际版本见上表及[机器盘点 JSON](../output/status-2026-10-22/inventory.json)。这是 Vite 单页应用，没有 Next.js、SSR、后端或 CMS。

### 精简目录树

```text
mo-chen-director/
├─ index.html / vite.config.ts / package.json / package-lock.json
├─ src/
│  ├─ main.tsx                       # StrictMode、LanguageProvider、全局 CSS
│  ├─ app/App.tsx / Providers.tsx     # 页面组合、弹窗状态、Lenis
│  ├─ components/
│  │  ├─ hero/                       # 开场、背景影片、混剪入口
│  │  ├─ works/                      # 分类、作品卡片、详情
│  │  ├─ media/                      # 预览、完整播放器、加载状态
│  │  ├─ about/ contact/ layout/     # 人物、荣誉、联系、导航、Credits
│  │  ├─ ui/ effects/                # Dialog、图片降级、颗粒等
│  │  └─ react-bits/                 # BlurText / Crosshair / Noise 源码
│  ├─ data/mockData.ts               # 四语项目、媒体、人物、荣誉、联系
│  ├─ i18n/                         # 字典、editorial 文案、Context、切换器
│  ├─ hooks/                        # 可见性、动态偏好、复制、揭示动画
│  ├─ lib/reelTimeline.ts            # 保留的时长/章节边界工具
│  ├─ types/portfolio.ts
│  └─ styles/                       # tokens/global/motion/uiverse
├─ public/fonts/ / public/media/     # 本地发布资源与字体许可证
├─ upstream/                        # 上游原件、许可、SHA/来源清单
├─ scripts/                         # 素材准备、压缩、校验、故障测试
├─ docs/ / output/                  # 报告、截图、检查证据
├─ .tools/npm/                      # 本机 npm 入口
└─ dist/                            # 可重新生成的静态构建产物
```

本次统计：`src` 下 53 个文件，TS/TSX/CSS 合计约 2478 行（含保留组件，不代表全部都在运行）。`public/media` 为 30 个文件、72,352,500 字节，约 69 MiB；3 个本地 WOFF2 加两份字体许可证。全部素材总量不是首页首载流量。目录下未发现 `.git`、CI 工作流或 Vercel / Netlify / Docker 部署配置。

### 关键文件导航

- 页面入口：[main.tsx](../src/main.tsx)、[App.tsx](../src/app/App.tsx)、[Providers.tsx](../src/app/Providers.tsx)。
- 影片：[Hero.tsx](../src/components/hero/Hero.tsx)、[PreviewVideo.tsx](../src/components/media/PreviewVideo.tsx)、[VideoPlayer.tsx](../src/components/media/VideoPlayer.tsx)、[Dialog.tsx](../src/components/ui/Dialog.tsx)。
- 作品：[SelectedWorks.tsx](../src/components/works/SelectedWorks.tsx)、[ProjectCard.tsx](../src/components/works/ProjectCard.tsx)、[ProjectDialog.tsx](../src/components/works/ProjectDialog.tsx)。
- 内容与模型：[mockData.ts](../src/data/mockData.ts)、[portfolio.ts](../src/types/portfolio.ts)。
- 四语：[dictionaries.ts](../src/i18n/dictionaries.ts)、[editorial.ts](../src/i18n/editorial.ts)、[LanguageProvider.tsx](../src/i18n/LanguageProvider.tsx)、[LanguageSwitcher.tsx](../src/i18n/LanguageSwitcher.tsx)。
- 样式：[tokens.css](../src/styles/tokens.css)、[global.css](../src/styles/global.css)、[motion.css](../src/styles/motion.css)、[uiverse.css](../src/styles/uiverse.css)。
- 媒体溯源：[MEDIA-LICENSES.md](../MEDIA-LICENSES.md)、[ATTRIBUTION.md](../ATTRIBUTION.md)、[发布资源清单](../upstream/media/published-assets.json)。
- 构建配置：[vite.config.ts](../vite.config.ts)、[package.json](../package.json)。

### 数据与播放协作

1. `main.tsx` 挂载语言 Provider 与 App。Provider 从 `mo-chen-language` 读取偏好，缺省为中文，提供 `language / setLanguage / t`。
2. 字典负责固定界面文本；`editorial.ts` 保存当前重写的独白和标题；`mockData.ts` 输出每种语言的六部作品及其他记录。稳定 ID 保证语言变化后仍能定位同一作品。
3. App 只保存 `projectId`，按当前语言重新查找项目；同时管理 Reel、Credits 和项目弹窗。任意弹窗打开时 `modalOpen` 暂停 Lenis 与背景播放。
4. SelectedWorks 使用 `requested / displayed` 两个分类状态和 Anime Scope，旧动画在清理时撤销，防止快速切换后的旧回调提交错误分类。当前 hover/focus 的 ID 控制唯一预览节点。
5. ProjectCard 将原海报位置传给 Dialog。海报转场完成才把 `playbackEnabled` 交给播放器；退出时先停止视频，再清理节点/源、恢复滚动和焦点。原生全屏被拒绝时给出提示，`play()` 被拒绝时显示手动播放入口。
6. Lenis 只有一个手动 RAF 驱动；可见性、IntersectionObserver 与 reduced-motion hooks 管理暂停/降级。签名使用 `svg.createDrawable()`，奖项使用 `stagger`。清理代码存在不等于已证明没有内存泄漏。

代表性源码摘录（均来自现有文件，非完整组件）：

```tsx
// src/app/App.tsx：用稳定 ID 取出当前语言的项目
const [projectId, setProjectId] = useState<string | null>(null);
const project = projectsByLanguage[language].find(item => item.id === projectId);
const modalOpen = Boolean(project) || reel || credits;
```

```ts
// src/types/portfolio.ts：目前模型明确限定为演示记录
export interface DemoRecord { isPlaceholder: true }

// src/data/mockData.ts：当前混剪明确无音轨
export const showreel: MediaAsset = {
  ...asset('tide', 'full'), src: '/media/video/showreel-silent.mp4',
  hasAudio: false, alt: '六组授权素材构成的 24 秒演示混剪，无音轨'
};
```

```css
/* src/styles/tokens.css：调色参数由封面与预览共享 */
--film-grade-rest: contrast(1.06) saturate(0.82) brightness(0.92) sepia(0.06);
--film-grade-active: contrast(1.04) saturate(1.02) brightness(1);
--film-ease: cubic-bezier(0.22, 1, 0.36, 1);
```

### 保留文件不等于当前 UI

- BlurText、Crosshair、ViewfinderCursor、Clients、Toast 文件仍在，但当前页面组合不调用这些旧展示组件；Noise 经 FilmGrain 仍在使用。
- `cinema.css` 是退役说明文件，main.tsx 不再导入。`uiverse.css` 保留简化加载线，旧玻璃按钮/胶囊/倾斜名片外观已撤下。
- 章节配置与时间轴工具仍在；当前 Hero 显示真实时长，但不再显示可点击六镜头条。时间轴单测通过不能证明一个已撤下的 UI 仍在工作。
- README 仍有局部取景框、3° 名片、错层字标、镜头条与旧声音说明等历史描述，与现实现不一致。本报告明确指出，不在本次盘点中顺手改写旧文档。
- 一些 TSX 使用很长的单行 JSX；能编译且 lint 通过，但后续整理格式会改善维护和评审。保留的模板资源及未引用组件也可在独立清理任务中审查。

## 5. 如何启动、构建和校验

### 本机 PowerShell

```powershell
Set-Location 'D:\网页设计\mo-chen-director'
$directorNodeDir = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$env:PATH = "$directorNodeDir;$env:PATH"
$env:npm_config_cache = 'D:\网页设计\mo-chen-director\.tools\npm-cache'
& "$directorNodeDir\node.exe" '.tools/npm/bin/npm-cli.js' run dev -- --strictPort
```

然后打开 5173。`--strictPort` 使端口占用时明确失败，避免用户以为打开的是新实例。终端需持续运行，Ctrl+C 停止。上述 PATH 仅在该终端会话生效。

在另一个同样配置 PATH 的终端执行：

```powershell
node .tools/npm/bin/npm-cli.js run typecheck
node .tools/npm/bin/npm-cli.js run lint
node .tools/npm/bin/npm-cli.js run verify:assets
node scripts/check-reel-timeline.mjs
node .tools/npm/bin/npm-cli.js run build
node .tools/npm/bin/npm-cli.js run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

普通已安装 Node/npm 的环境可用 `npm ci` 按锁文件安装，再执行 `npm run dev/build/preview` 等命令。构建含 `tsc -b`，无须把同一轮 build 内的类型检查和单独 typecheck 当作两份独立证据。

`scripts/prepare-media.mjs`、`optimize-media.mjs` 是素材生产工具，需 FFmpeg 配置，不是启动所必需；本次没有重跑它们。`acceptance-server.mjs` 为本地 5181 故障测试服务，会故意制造 404/剪贴板拒绝，不能当作正常演示服务器或部署入口。

## 6. 本次验证与历史验收核对

### 2026-10-22 实际执行

| 检查 | 结果 | 证据 / 边界 |
| --- | --- | --- |
| 源码、配置、依赖版本与资源盘点 | 通过 | [inventory.json](../output/status-2026-10-22/inventory.json)；版本读取本地安装包，不是互联网最新版查询 |
| `npm run build` | 通过，exit 0 | [build.log](../output/status-2026-10-22/build.log)，含 TypeScript + Vite |
| `npm run lint` | 通过，exit 0 | [lint.log](../output/status-2026-10-22/lint.log) |
| `npm run verify:assets` | 通过，exit 0 | [assets.log](../output/status-2026-10-22/assets.log)：11 上游哈希、34 发布资源、4×119 字典词条、4 份 editorial 字典、24 本地化项目、Step 1 文档不变 |
| `check-reel-timeline.mjs` | 通过，exit 0 | [timeline.log](../output/status-2026-10-22/timeline.log)：非等长章节、16.08 秒、30fps、非法元数据与边界；纯函数检查，不是浏览器播放测试 |
| 5173 / 4173 运行状态 | 未运行；两个端口 HTTP 连接均失败 | [探测日志](../output/status-2026-10-22/preview-status.log)；本轮没有启动服务，因此不是“网页已在线可访问” |
| 当前浏览器画面、控制台、视频播放 | 未测 | 引用旧截图与历史交互证据，不能写成今日控制台零报错 |

本次构建产物：JS **359.44 kB / gzip 122.69 kB**；CSS **33.88 kB / gzip 8.36 kB**；HTML 0.78 kB。它们不包含所有媒体总量，也不能代替加载性能评分。npm 日志的更新通知不是构建错误，本轮没有升级 npm。

### 03–06 历史报告与当前实现的对应关系

| 历史记录 | 原结论 | 本次对照当前源码后的解释 |
| --- | --- | --- |
| [03 浏览器验收](03-browser-acceptance.md)，10-16，多次追加 | 四语矩阵、焦点、弹窗循环、失败降级、复制拒绝、签名/桂冠等已有实测；也明确列出未测项 | 关键生命周期代码仍在。其 Hero 标语、时间条、画幅滚动、旧名片等视觉描述已经过时；不能将整份报告当作当前视觉版全量通过 |
| [04 独立审查](04-independent-director-review.md)，10-16 | R1 影片首屏不完整；R2 手机暂停被截；R3 时间轴常量；创意层级需要整改 | 当前播放器位于详情最前并受视口高度限制；小型 Hero 控制仍在；时长读取 duration。原批评已在后续修改中处理，但今日没有再次做设备矩阵 |
| [05 独立复验](05-independent-recheck.md)，10-16 | R1/R2、海报转场通过；发现中文标语断词回归 | 播放器/转场相关实现仍保留。断词对象对应的旧标语后来整体移除，不应写成“当前页面仍有两个语义行标语” |
| [06 独立验收](06-independent-acceptance.md)，10-16 | 标语整改通过，可作为当时本地演示基线；非上线许可 | 是 10-16 版本基线，不是 10-19 暖色画册版本的独立最终验收 |
| [07 画册重构](07-editorial-redesign.md)，10-19 | 1440×900 / 390×844 四语检查，筛选/详情/复制/声明面板回归 | 比 03–06 更接近当前结构；本次源码与其核心描述一致。旧全页截图底色已被下一轮覆盖 |
| [08 色彩系统](08-film-color-system.md)，10-19 | 滤镜、开篇高亮、交互微光通过；末尾追加更亮背景 | **末尾“背景亮度修订”才是当前色彩基线**。正文原 `#0A0908` 主背景说明已被追加修订取代 |

### 不应写成已通过的项目

- **真机与跨浏览器**：iOS Safari、Android 真机、Firefox、真实触屏、屏幕阅读器未有完整验收证据；历史 Chromium 视口模拟不等同于真机。
- **系统减少动态效果**：代码有分支，历史报告明确未切系统设置实测；本轮也未测。
- **后台生命周期**：有 `document.hidden` 监听和 cleanup，历史工具未成功触发真实 hidden；本轮未验证暂停/恢复。
- **自动播放被策略拒绝、全屏差异**：catch 路径存在；历史只有当前内嵌浏览器的全屏证据，不能推广至所有浏览器。
- **FPS / CPU / 内存 / 长时泄漏**：没有 Performance、Heap 或目标设备解码剖析。DOM 节点清理和若干开关循环不能证明稳定 60fps 或零泄漏。
- **鼠标持续移动 / 出入预览与触屏切换**：历史有键盘预览和部分鼠标激活证据，没有完整物理鼠标进出压力测试；现已撤下 Crosshair，不再为它安排验收。
- **剪贴板实际粘贴**：历史成功 Promise、成功 UI、拒绝回退已测试，但未独立证实操作系统粘贴内容；最新就地反馈 UI 本轮未再实测。
- **网络性能与部署**：没有公网 CDN、缓存、Range、限速网络、冷启动加载指标或持续监测的验收。素材存在/哈希一致不代表所有设备均可解码。

## 7. 下一步待办与责任边界

### P0：进入正式上线流程前必须解决

1. **用户提供真实材料**：导演四语正式姓名/角色、核准履历与陈述、本人授权肖像；实际作品的完整片、短预览、海报、剧照、片名/年份/分类/主创及使用范围；可核验奖项记录；真实经纪人、邮箱、Vimeo/IMDb/社交账号。缺项由用户确认隐藏或延后，不能默认沿用虚构内容上线。
2. **开发可准备、材料到位后接入**：为真实记录调整 `DemoRecord { isPlaceholder: true }` 模型与校验脚本，区分正式/演示内容；同步四语、来源清单、Credits 和时长。不能只把标记从 true 改掉，就认定材料真实性成立。
3. **用户确认部署目标与视觉方向**：确认当前暖褐层次、域名、托管平台/账号及公开范围。开发可准备构建与发布清单，正式发布另按授权推进。

### P1：开发可直接推进的验收与交付工作

1. 在当前暖色版重新启动本地服务，补拍完整桌面/手机截图；按主要尺寸与四语重新跑筛选、弹窗、焦点、滚动锁、复制失败与媒体失败回归。补齐最新 Awards / Contact 截图。
2. 在可用真实设备/浏览器完成 Safari、Firefox、Android、系统减少动态效果、后台暂停恢复、全屏、声音及剪贴板粘贴测试；缺少设备时明确列出外部条件。
3. 做冷/热加载、慢网、视频解码、帧时间与内存剖析，再根据测量决定压缩、预加载和分包。约 69 MiB 的本地媒体总量需要合理发布策略，但不能据此直接认定首页一次下载 69 MiB。
4. 确定部署根路径，验证静态资源路径、缓存与视频 Range；准备 CI 构建校验、可回滚发布方案和上线后冒烟检查。当前没有版本库/部署配置，应先建立可追溯的交付基线。
5. 完成正式 SEO/分享元数据与无障碍复核：当前 `index.html` 的 theme-color 仍为旧 `#08090B`，描述为中文静态文本，尚无已配置的多语言独立 URL / hreflang / canonical / 社交分享方案。按最终站点要求配置，不能由 Context 翻译机制自动替代。

### P2：维护性与文档整理

1. 同步 README 与过时的功能说明，明确历史报告的版本边界；检查保留但未使用的组件、依赖和模板资源，避免维护者误认为全部仍在页面运行。
2. 在不改变行为的独立任务中整理长行 TSX、必要的格式规范及高价值回归脚本。
3. 四语母语审校、真实长片名/多人 Credits 的极端长度排版、CJK 字体跨平台一致性复核。

**下一次合理里程碑**：先交付“当前暖色版的补充验收 + 真实资料清单确认”，再进入“真实内容候选版 + 目标环境预发布”。本轮仅记录这些事项，没有擅自启动改版或发布。

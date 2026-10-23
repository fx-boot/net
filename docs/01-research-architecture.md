# Mo Chen 导演作品集：Step 1 调研与技术架构

日期：2026-10-16。状态：完成第一阶段架构与选型；尚未初始化应用、安装依赖、实现页面或运行浏览器验证。Uiverse 部分候选组件源码待核验。

## 创意方向

导演占位身份：陈默 / Mo Chen，Director & Visual Artist。主张：让那些未被说出的，留在画面里。英文：For everything left unsaid.

视觉概念为“银幕之外”：全屏冷调影像承载首屏，导演英文姓名跨越画面下缘；中文姓名与职业信息安静地位于侧边。作品段以电影剧照尺寸组织不等宽布局；人物志降低视觉速度，以固定肖像与连续阅读文字转换叙事节奏；联系区以大字号姓名收尾。

设计令牌：

| 角色 | 值 | 用途 |
| --- | --- | --- |
| theater-black | #08090B | 页面底色 |
| graphite | #191C20 | 播放器与浮层 |
| silver-white | #F1F0EC | 标题与正文 |
| slate | #A4ABB3 | 次级文字 |
| ice | #BDD2DE | 交互焦点 |
| film-amber | #BF9D69 | 荣誉细节，控制面积 |

字体方向：Instrument Sans 用于导航、英文姓名和信息；Bodoni Moda 用于创作陈述；中文优先系统苹方/微软雅黑。字体进入第二阶段时核验来源与许可并本地托管 WOFF2，保留系统回退。正文限制约 65 字符行宽；移动端主体单列。

首屏构图草图（设计提案，非来源页面复制）：

```text
┌──────────────────────────────────────────────────┐
│ 陈默 / Mo Chen             Works  About  Contact │
│                                                  │
│                 全屏实拍高光片段                  │
│                                                  │
│ For everything                    Watch full reel│
│ left unsaid.                                     │
│ M O   C H E N                                    │
│ Director & Visual Artist        声音 / 暂停 / 向下│
└──────────────────────────────────────────────────┘
```

设计复核：全站动效以“放映、对焦、剪辑”三种电影语言为依据。重点留给影像和姓名，不采用常驻霓虹、无关 3D 几何体或持续跳动装饰。作品标题与真实项目元数据提供层级，不另加没有信息意义的章节编号。

## 指定资源调研记录

### MotionSites

- 已访问 https://motionsites.ai/ ，可读公开目录及 Hero/Agency 项目入口。
- https://motionsites.org/prompts/digital-director ：公开预览确认全视口作品集、背景视频、悬停与入场动效，预览栈包括 React、TypeScript、Tailwind、Vite、Lucide。
- https://motionsites.org/prompts/ai-film-studio ：公开预览确认暗色、滚动叙事、背景视频以及 About/Contact 结构。
- 两个详情页完整提示词均需解锁；未获得付费提示词或完整实现源码。上述两个域名单独作为调研入口，不据此推定其归属关系。
- 采用公开可见的信息层级与影像优先范式；本站网格、镜头转场和版式自行设计。

### React Bits

| 组件 | 官方页面 | 当前源码核查 | 本项目用途 |
| --- | --- | --- | --- |
| BlurText | https://reactbits.dev/text-animations/blur-text | TypeScript + Tailwind 源码导入 motion/react；支持按字/词、方向、触发方式 | 姓名与重要标题的对焦入场 |
| Crosshair | https://reactbits.dev/animations/crosshair | 已通过 raw 源码读取确认 Canvas、pointer 事件、RAF、ResizeObserver 及卸载清理 | 限定作品区域的取景框与 VIEW PROJECT 标签 |
| Noise | https://reactbits.dev/animations/noise | 当前分类为 Animations；React + Canvas，支持 opacity、fps、dust、scratches、fixed 等 | 人物志与页脚局部低强度胶片纹理 |

源码仓库：https://github.com/DavidHDev/react-bits 。三个文件位于 src/ts-tailwind 下，对应 TextAnimations/BlurText 与 Animations/Crosshair、Animations/Noise。

核查时 LICENSE.md 为 MIT + Commons Clause，而非仅 MIT。应用中保留原始许可证、上游作者和修改说明。入库时记录 commit SHA 或下载文件 SHA-256，避免未来 main 分支变化造成不可复现。

默认配置方向：BlurText 仅播放一次；Crosshair 在鼠标精细指针环境启用；Noise 约 0.04–0.08 透明度、12fps，减少动态效果模式下静止。为上游动画补充页面隐藏暂停与媒体查询变化处理。

### Uiverse

| 用途 | 候选 | 本轮核验状态 |
| --- | --- | --- |
| Showreel 玻璃按钮 | https://uiverse.io/Spacious74/lazy-dragonfly-64 | 页面描述和作者已读；HTML/CSS 提取尚未成功 |
| 分类胶囊 | https://uiverse.io/risabbir/good-chicken-7 | 暗色玻璃 Radio 页面与 MIT 文本已读；HTML/CSS 提取尚未成功 |
| 悬浮名片 | https://uiverse.io/Smit-Prajapati/smart-liger-5 | 页面与官方 Galaxy 原始 HTML/CSS 已读 |
| 视频加载反馈 | 官方 Galaxy loaders 目录，候选 EmmaxPlay/polite-husky-37 | 已发现官方仓库文件；完整源码尚未读到，未最终锁定 |

官方源码镜像：https://github.com/uiverse-io/galaxy 。已读取卡片源文件：https://raw.githubusercontent.com/uiverse-io/galaxy/main/Cards/Smit-Prajapati_smart-liger-5.html 。其真实实现包含 perspective、preserve-3d、translate3d 与 hover rotate3d；本站会将 30 度倾斜缩小为约 3 度，调整为银黑色，使用独立 CSS 命名空间和 focus-visible 状态。

直接抓取 Uiverse 返回 403；部分 GitHub/raw 请求超时或 cache miss。第二阶段优先通过正常浏览器访问或官方镜像补齐选定源码；如仍不可读，换用能够核验的同类官方组件，并明确记录替换。不会把原创 CSS 宣称为已提取的 Uiverse 源码。

### Anime.js

- React 生命周期：https://animejs.com/documentation/getting-started/using-with-react
- 模块导入：https://animejs.com/documentation/getting-started/module-imports
- SVG 描边：https://animejs.com/documentation/svg/createdrawable/
- 交错时间轴：https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering/

采用当前 v4 风格命名导入 animate、createTimeline、createScope、stagger、svg。组件 useRef 约束 root；useEffect 创建 scope；清理调用 scope.revert()。延后触发的 Observer 动画通过 scope 注册方法创建，避免逃出 scope；Observer 单独 disconnect。

## 技术栈与安装路径

选择 React + Vite + TypeScript。当前需求以单页叙事、前端筛选与视频详情为主，不需要服务器运行时。Tailwind 使用当前 Vite 插件方案，CSS 变量管理视觉令牌。

以下是第二阶段计划执行的命令，本轮未执行：

```sh
npm create vite@latest mo-chen-director -- --template react-ts
cd mo-chen-director
npm install
npm install animejs lenis lucide-react motion
npm install -D tailwindcss @tailwindcss/vite
```

目录已包含本调研文档，因此实际初始化应手动落入配置或在临时空目录生成脚手架后合并，不能用清空目录选项覆盖文档。

React Bits 官方组件页面给出的安装形式：

```sh
npx shadcn@latest add @react-bits/BlurText-TS-TW
npx shadcn@latest add @react-bits/Crosshair-TS-TW
npx shadcn@latest add @react-bits/Noise-TS-TW
```

执行 CLI 前配置 shadcn 所需的 components.json、路径别名及 Tailwind 入口；也可按用户许可直接获取这三个官方 TS-Tailwind 源文件，不需要安装整套 UI。命令是已核对的官方形式，尚未在本机验证安装成功。

Tailwind 配置：vite.config.ts 添加 @tailwindcss/vite 插件，样式入口使用 @import "tailwindcss"。来源：https://tailwindcss.com/docs/installation/using-vite 。

Lenis 使用当前 lenis 包，根层单例；导入 lenis/dist/lenis.css。自管 RAF 与 autoRaf 只能选择一种，避免重复驱动。卸载 destroy，手工 RAF 时同时 cancelAnimationFrame。来源：https://github.com/darkroomengineering/lenis 。

本机检查：Node v24.19.0 可用；npm 不在 PATH，第二阶段需定位已安装运行时里的 npm CLI。未更改全局环境变量。

## 目录规划

```text
mo-chen-director/
  docs/01-research-architecture.md
  public/
    fonts/
    media/{posters,stills,video}/
  src/
    app/{App.tsx,Providers.tsx}
    components/
      layout/{Navigation,Footer}.tsx
      hero/{Preloader,Hero,ShowreelButton}.tsx
      works/{SelectedWorks,FilterTabs,ProjectCard,ProjectDialog}.tsx
      about/{Biography,DirectorStatement,Awards,Signature,Clients}.tsx
      contact/{Contact,RepresentationCard,CopyEmailButton}.tsx
      media/{VideoPlayer,PreviewVideo,VideoLoader}.tsx
      effects/{ViewfinderCursor,FilmGrain}.tsx
      react-bits/{BlurText,Crosshair,Noise}.tsx
      ui/{Dialog,Toast}.tsx
    hooks/{useReducedMotion,useReveal,useVideoPreview,useClipboard}.ts
    data/mockData.ts
    types/portfolio.ts
    styles/{tokens,global,motion,uiverse}.css
    main.tsx
  tests/portfolio.spec.ts
  ATTRIBUTION.md
  MEDIA-LICENSES.md
  README.md
  package.json
  package-lock.json
  vite.config.ts
  tsconfig.json
```

上面的花括号为目录计划的紧凑表示，不是已经创建的组件文件。

## 模块设计与运行约束

1. 开场：总长约 1500ms。0–450ms 场记板落位；450–950ms 切换片号/曝光线；950–1500ms 帘幕退出。作为品牌开场而非伪造真实下载百分比；视频未就绪时显示海报，开场不会无限等待网络。减少动态效果时立即进入正文。
2. Hero：自动静音循环、playsInline、海报与显式暂停按钮；点击 Showreel 打开有声播放器，处理 play() 被拒绝。视频离开视口或页面隐藏时暂停。
3. 作品：All / Commercials / Narrative / Music Videos；实验短片作为 Narrative 的子类型。先保留旧卡片完成退出，再更新数据和交错入场，防止快速切换造成竞态。移动端点击直接进入详情。
4. Hover：只给当前交互卡片加载预览；canplay 后才渐隐海报；pointerleave、blur 和弹窗开启时暂停。键盘焦点可展示同等入口；触摸端不依赖 hover。
5. 详情：共用可访问 Dialog；ESC、焦点约束、关闭后回焦点、滚动锁、视频暂停和销毁；包含播放器、完整 Credits、导演手记及剧照。浏览器原生全屏通过用户点击调用，普通全视口弹窗作为回退。
6. 人物志：桌面 CSS sticky 肖像 + 右侧三段陈述；肖像仅小幅缩放。移动端改正常文档流；阅读不依赖滚动锁定。
7. 荣誉：统一自绘桂冠 SVG；IntersectionObserver 触发 Anime.js stagger，一次入场。Signature 使用 svg.createDrawable() 描边。
8. 商务：国内/海外经纪卡片、邮箱复制成功/失败反馈与手动选择回退；社交地址集中配置。

## 数据与素材

mockData.ts 集中存储 DirectorProfile、Project、Credit、Award、Client、Representative、MediaAsset。项目区分 cover、preview、fullFilm、stills；每项媒体带 sourceUrl、author、licenseUrl、alt、poster 等字段，便于替换与追溯。

拟定虚构项目：《潮汐之后 After the Tide》《夜行者 Night Passage》《无声之间 In Between》《旷野来信 Letters from the Wild》《余温 Residual Heat》《折光 Refraction》。所有项目、履历、品牌合作与人员在演示数据中明确标记 isPlaceholder。真实电影节名称可用于版式样例，但必须标“演示履历”，不得冒充该导演实际获奖。

视频与剧照将在第二阶段逐项核验素材页许可、可下载性和响应格式；使用可合法使用的高清素材，不把“免费”称为“无版权”。提供在线 MP4 默认接口并保留本地海报降级，生产资源优先同域托管。当前尚未选定或验证默认媒体 URL，不能称媒体准备完毕。

## 第四阶段验收计划

- 构建：TypeScript、lint、生产 build。
- 实际浏览器：桌面 1440/1920、移动端 390/768；截图检查排版、裁切、可读性、横向溢出。
- 主流程：开场结束、所有分类、连续切换、hover、完整视频、详情图库、关闭回焦点、邮箱复制。
- 故障：自动播放拒绝、媒体加载失败、复制失败、减少动态效果模式。
- 生命周期：React StrictMode、弹窗反复开关、页面前后台切换；观察事件/RAF/Observer 清理，关闭详情后无声音残留。
- 性能：限制同时播放视频数、预览按需加载、非首屏图片 lazy、减少整屏滤镜合成；通过实际 Performance trace 判断帧耗时，不预先保证所有硬件恒定 60fps。
- 交付：可运行源码、锁文件、README 启动与替换说明、来源许可清单、实际执行的测试结果与本地地址。

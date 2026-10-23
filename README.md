# ACRO HAT / 東浩 — Independent Director Portfolio

東浩（国际艺名 ACRO HAT）的 React + Vite + TypeScript 个人作品集。创作覆盖生成式AI、二维/三维动画与CGI、真人长片与剧集、中短剧、商业与音乐PV。中、英、韩、日四语，语言偏好持久化。身份与陈述由用户提供；影片、履历、邮箱为待替换资料，来源声明保留于 Credits 与文档。

当前为冷黑、钛银、铂金白与激光橙红色板；作品系统采用居中巨幕轮播 / 均等 Archive 双视图，默认 12 部片单，每次加载 6 部，支持扩展至 20–50 部。新增单例 12fps 银盐颗粒、4 帧按需分镜擦洗、可拖动弹簧标尺与双层调色对比。固定感应外壳与动效视觉层解耦，滚动统一读写分阶段处理。较早报告只记录其对应阶段。

[感官交互与实测截图](docs/14-sensory-engine.md) · [独立设计/代码审查](docs/16-sensory-review.md) · [Git 发布审查](docs/15-git-publish-audit.md)

## 本机启动

目录：D:\网页设计\mo-chen-director。预览：<http://127.0.0.1:5173/>。

本机 Node v24.19.0，npm 12.2.0 在项目 .tools/npm/。PowerShell：

```powershell
Set-Location 'D:\网页设计\mo-chen-director'
$env:PATH='C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
& 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.tools/npm/bin/npm-cli.js' run dev -- --strictPort
```

从 GitHub 克隆后使用本机已安装的 Node/npm，执行 `npm ci`，然后 `npm run dev -- --strictPort`。`.tools/` 是本机工具缓存，不在仓库内；上面的绝对路径仅适用于当前开发机器。当前验证环境为 Node 24.19.0。

检查命令：`npm run typecheck`、`npm run lint`、`npm run verify:assets`、`npm run verify:sensory`、`npm run verify:audio`、`npm run build`。`dist/` 可由静态服务器部署，勿通过 `file://` 打开；部署子目录时调整 Vite base 和绝对媒体路径。

## 代码与交互

- src/app：页面组合、Lenis 单例与生命周期。
- src/i18n：120 键四语字典、editorial、品牌身份、语言持久化与切换；src/data/mockData.ts 与 projectCatalog.ts：十二条演示影片及四语资料，按稳定 ID 关联。
- src/hooks/useSpatialRig.ts：共享帧时钟的磁吸/倾角；useSpatialScroll 与 useScrollScene：错层滚动；useOpticalReveal：视觉层 transform / opacity 入场。
- src/styles：tokens、global、spatial、motion 和 Uiverse 加载条。原命名变量保留兼容别名，全部引用新冷色色值。
- public/fonts、public/media：本地字体、完整影片、短预览、海报与 SVG 降级。普通浏览无需外部字体/媒体服务。
- upstream：原始源码、许可、固定 commit 与 SHA-256，作为研究归档，不会发布到 dist。
- docs/01-research-architecture.md 保持批准原文，verify:assets 校验其哈希。

首屏场记板、静音循环与暂停；巨幕轮播/均等网格筛选、单卡 hover/focus 预览；作品弹窗画幅展开与逆向归位；导演档案与字幕阅读聚焦；荣誉交错和 SVG morph；个人接洽邮箱翻转复制与手动选中回退；Credits 面板。

新增倾角、视差、短标签解密和监视器帧计数共用 Lenis 帧时钟，不为每张卡片建立 RAF。页面隐藏暂停。移动端/coarse pointer 保留静态布局与完整正文；减少动态效果禁用新增运动及背景自动播放。弹窗保留 ESC、焦点循环/归还、背景滚动锁与视频卸载清理。

## 日文与资料替换

日文独白采用本地 Shippori Mincho + Yu Mincho 等日本明朝体回退，palt、2.05 行高、.05em 字距；无显式中文字体回退。Latin 为本地 Instrument Sans / Bodoni Moda。字体与许可、哈希记录见 MEDIA-LICENSES.md。

导演个人身份在 src/i18n/brand.ts。真实肖像放到 public/media/director/acro-hat-portrait.jpg 后重启 Vite；未提供时使用原创抽象取景画幅，不冒用他人肖像。签名仍是预留位。

商务邮箱暂为 atelier@example.com。替换真实影片、Credits、荣誉与邮箱后，同步更新数据占位状态和许可记录。既有六部影片为 Mixkit 授权演示素材。

现有 showreel-silent.mp4 没有音轨，背景视频始终静音。右下角独立环境声默认 OFF，首次进入不创建 AudioContext；仅主动开启后合成 50Hz、-36dBFS 峰值微共鸣与 15ms 机械声。关闭、失焦、隐藏或打开弹窗均停止输出，返回后需要再次主动开启，ON 不持久化。

VFX 拆解当前是同一授权帧的调色研究（COLOR STUDY），不是原始 Log/绿幕或真实 CGI 案例；正式双片需由品牌提供。分镜擦洗使用从六个现有原片提取的 24 张真实帧，时长与源时间戳见 `upstream/media/scrub-frames.json`。

组件来源与许可见 ATTRIBUTION.md 和 MEDIA-LICENSES.md。截图和运行诊断在本地 `output/`（不进 Git）；版本库保留精选预览与交付报告。视口与 RAF 间隔测试不等于手机真机、GPU 占用低于 1% 或稳定 120Hz 的证明。

## 版本控制

远程为 `https://github.com/fx-boot/net.git`，主分支 `main`。依赖、构建、工具/浏览器缓存、日志和环境凭证均被忽略。第三方媒体页面原始快照可能含临时客户端 token，留在本地且不发布；来源 URL、许可、哈希和实际媒体仍随仓库交付。上游原始文件、public 媒体和受保护 Step 1 文档禁止换行转换，保证跨平台克隆后哈希不变。

## 当前个人创作架构

四语均以 ACRO HAT 为主标，页眉只保留单行艺名；地域光色、字体与展映权重仍各自独立。五个筛选入口对应 All、AI & Hybrid、Animation、Live-action & Drama、Commercials & PV。分类仅用于现有授权素材的展示编排，不宣称这些素材是导演真实AI或动画作品。正式片单修改 `ProjectEntry.category` 即可，媒体路径与权重互不耦合。人物区顺序统一为个人独白 → 四类创作领域，接洽统一为个人工作室。

# 第四阶段：视觉升级与浏览器验收

## 二次复验：Hero 标语断行修复（2026-10-16）

独立复验发现 1280×720 中文标语被拆为“为所有 / 未说出 / 口的。”：旧 `global.css` 的 `.hero-story > p` 比新 `.cinema-slogan` 特异性高，实际字号仍是 61.44px。此前尺寸检查只看边界，没有充分检查语义断行，本节补充这一缺口。

本次定点清理全局旧 Hero 文案规则，以及 `cinema.css` 中互相覆盖的字号、语言宽度和手机规则。Hero 文案排版由同一组样式负责，语言差异通过字号/行高变量表达，没有新增 `!important`。保留四语字典已有的换行，按完整短句逐行使用 BlurText；加载回退也采用同样行结构，避免把换行替换成空格后再次任意断词。

四语固定语义分行：中文“为所有 / 未说出口的。”；英文“For everything / left unsaid.”；韩文“말하지 못한 / 모든 것을 위해.”；日文“言葉にならない、 / すべてのために。”。在 390、768、1024、1280、1440、1920 六种宽度 × 四语的 **24 组** DOM 检查中，每段均恰为两行，每行高度等于对应计算行高，且行内没有横向溢出。检查读取实际计算样式与可见动画文字，并非仅看 CSS 源码。

| 宽度 | 中/韩/日实际字号 | 英文实际字号 |
| --- | --- | --- |
| 390 | 25px | 27px |
| 768 | 24px | 28px |
| 1024 | 24.576px | 28px |
| 1280 | 30.72px | 34.56px |
| 1440 | 34px | 38.88px |
| 1920 | 34px | 40px |

行高：中文 1.4、英文 1.2、韩文 1.55、日文 1.5。桌面文案栏宽为 `min(30vw,28rem)`，平板 38vw，手机使用双侧边距之间的可用宽度。实看截图确认标题与大字、视频、播放入口之间保留空间。

证据：[1280×720 修改前](../output/acceptance/slogan-before-1280.png) / [同视口修改后](../output/acceptance/slogan-after-1280.png)；[24 组计算样式与断行记录](../output/acceptance/slogan-four-language-matrix.json)；[390 日文](../output/acceptance/slogan-after-390-ja.png)、[768 日文](../output/acceptance/slogan-after-768-ja.png)、[1024 韩文](../output/acceptance/slogan-after-1024-ko.png)、[1440 英文](../output/acceptance/slogan-after-1440-en.png)、[1920 中文](../output/acceptance/slogan-after-1920-zh.png)。

本轮 oxlint、TypeScript 和 Vite 生产构建通过，Step 1 文档哈希未变。原 R1 影片首屏、R2 手机暂停入口、R3 数据化镜头与真实片长、海报进出转场的整改均保留，未重做这些模块。本轮只扩展标题排版验证，仍不代表跨浏览器或实体手机验收。

## 独立审查整改复验（2026-10-16）

本节覆盖 [04 独立审查](04-independent-director-review.md) 的 R1、R2、R3 和两项创意整改，取代下文旧版开场与详情动效描述。保留无声 Showreel、桂冠居中、作品区移除十字坐标线。

### 实现与实测

- **R1：影片优先。** 详情播放器移到标题前，16:9 画面按窗口高度限制宽度，手记与 Credits 在下方。四语分别验证 1280×720、1440×900：前者影片 top=76、bottom=631.99，全屏工具 bottom=687.99；后者影片 bottom=804.48、工具 bottom=860.48。关闭按钮均 top=16、bottom=60。390×667 和 390×844 四语下，影片 bottom=262，工具 bottom=318，关闭入口可见。
- **R2：手机控制入口。** 暂停和声音状态置于影片画幅内部。390×844 四语 controls top=434、bottom=478；390×667 top=350、bottom=394，按钮高度 44px。以上均为页面顶部正常状态，保留向下滚动阅读镜头条和作品的布局。
- **R3：镜头配置与真实片长。** `reelConfig` 集中保存帧率、预期片长、项目映射、章节起点及可选海报；进度、章节状态和跳转边界使用已加载的 `video.duration`。作品数量由数据生成。未知/无效元数据不允许跳转，片尾外章节禁用；移除字典中重复写死的 24 秒说明。
- **R3 实际换片验证。** 临时将 Hero 指向现有 16.016 秒素材，配置 30fps、章节 0 / 1.5 / 6.25 / 13 / 99 秒。点击第三项得到 currentTime=6.25、时间码 `00:00:06:07`、进度 `0.390235`；第四项得到 13 秒、进度 `0.811688`；99 秒项禁用。按钮实际显示 00:16。随后按备份字节还原，SHA-256 一致，恢复 24 秒 / 24fps / 六章节。另运行 `scripts/check-reel-timeline.mjs` 验证非法数值和边界。
- **Hero 层级。** 减少重复画幅标注与说明，收敛大字、短陈述与播放入口的竞争，播放按钮改为克制的暗色胶囊。手机字标保留单行，控制入口不再占用页面底部。
- **共享海报转场。** 点击卡片后同一海报从卡片边界连续变换到银幕边界（520ms），期间视频 paused=true；浮层清除后才开始播放。关闭时先停播，海报返回仍在视口内的原卡片（340ms），随后销毁详情视频并归还焦点。真实采样记录了位置和尺寸的连续变化；键盘进入与 ESC 直接关闭，不等待转场。减少动态效果走直接路径，但本轮未能模拟系统偏好，不能标作浏览器实测通过。
- **开场合并。** 帘幕在 950ms 启动 Hero 字标与辅助文字，整个序列仍为 1500ms，移除其后的另一段画幅开启动画。冷刷新连续采样中，1351ms 时开场仍存在且字标已接近结束；1726ms 时开场移除、字标归零，后续保持不变。采样包含加载与工具时延，不用来声称帧率或精确墙钟耗时。

### 证据与限制

- 同视口前后截图：[1280 详情修改前](../output/acceptance/review-before-1280-dialog.png) / [修改后](../output/acceptance/review-after-1280-dialog.png)；[390×844 首屏修改前](../output/acceptance/review-before-390-hero.png) / [修改后](../output/acceptance/review-after-390-hero.png)；[390×667 修改后](../output/acceptance/review-after-390-short.png)。
- [四语尺寸矩阵](../output/acceptance/review-layout-matrix.json)、[海报变换采样](../output/acceptance/review-poster-transition.json)、[非等长章节实测](../output/acceptance/review-unequal-chapters.json)、[开场采样](../output/acceptance/review-intro.json)。
- 桌面与手机矩阵共 16 次键盘打开/ESC 关闭，另实际检查指针进入/关闭归位及进入时 ESC；关闭后无详情节点或浮层，滚动锁解除，焦点回到作品按钮。一次跨卡片快速自动化点击因卡片滚入视口时未打开详情而重试，未将该次记为通过。未声明持续压力测试、内存零泄漏或稳定 FPS。
- TypeScript、oxlint、素材校验、Vite 生产构建全部通过；素材校验仍为 11 个上游哈希、33 个发布资源、四语各 119 词条、24 条本地化项目。Step 1 文档哈希未变。
- 开发热更新过程中曾记录一次 effect 依赖数组长度变更警告；冷刷新后本轮交互没有新增该警告或运行错误。浏览器保留历史日志，不能表述为整个会话从未报错。
- 本轮为内嵌 Chromium 桌面视口模拟；未进行实体手机、跨浏览器、系统减少动态效果、后台标签生命周期、真实鼠标 hover 与性能剖析。原第四阶段报告中未验证项仍然有效。

## 后续用户反馈修正（2026-10-16）

奖项标题改为桂冠内部居中、统一年份与标题起始高度，长奖项合理换行；作品区移除 Crosshair 十字坐标线，保留视频预览与查看作品提示。复核四语在 390px / 1073px 的 8 组布局，标题中心偏移均为 0、没有文字溢出、作品区 canvas 数为 0。证据：[修正截图](../output/acceptance/awards-alignment-fixed.png)、[测量记录](../output/acceptance/awards-alignment-checks.json)。lint 及包含 TypeScript 检查的 build 均通过。以下阶段报告中有关 Crosshair 的历史说明已由本次移除决定取代。

验收日期：2026-10-16（Asia/Shanghai）。工程：`D:\网页设计\mo-chen-director`。

本阶段已完成视觉升级、当前可操作浏览器内的交互检查和发现问题的修复。**这不是跨浏览器、真机和性能全量通过声明。** 下文逐项列出通过、已修复和未验证范围。网站没有部署到公网，正式导演资料仍需替换。

## 本次视觉改动

1. **投影式首屏**：实心 MO 与描边 CHEN 错层排列；1500ms 场记板退场后，影片画幅和字标按同一时间轴展开。六镜头条可以跳转，时间码与进度直接读取视频播放时间。
2. **滚动中的画幅变化**：页面正常滚动时，影像框缩至 87%，字标向上退场。滚动处理采用按需 RAF，不引入另一个持续循环或滚动劫持。
3. **影片档案编排**：主推作品占满一行，后续以两列、三列联系印样编排；平板末帧满行、手机单列。聚焦时画幅边缘变化，详情播放器以对应的画幅展开。
4. **人物志与片尾**：保留摄影师主体的肖像构图、低强度颗粒、Sticky 人物栏、签名描边、错峰桂冠、银黑经纪名片与描边片尾字标。

设计参考限于公开可读内容：[MotionSites Digital Director](https://motionsites.org/prompts/digital-director)、[Jason Bergh](https://www.jasonbergh.com/) 的影片、作品档案和编辑式层级。未声称获取付费提示词。React Bits/Uiverse 的上游源码、许可、哈希继续见 [ATTRIBUTION.md](../ATTRIBUTION.md)。新时间轴、布局和镜头条为本工程实现。

## 环境与证据方法

- 实际操作 Codex 内嵌 Chromium 浏览器，正常页面为 `http://127.0.0.1:5173/`。
- 检查 390×844、768×1000、1440×1000、1920×1000 四种 CSS 视口，以及 zh/en/ko/ja 四语，共 16 组。它们是桌面浏览器视口模拟，不等同于四种实体设备。
- 截图逐段查看了 Hero、作品、人物志、荣誉/联系/页脚；同时读取 DOM 边界、图像加载、焦点、媒体节点、实际播放状态和动画样式。
- 动态验收使用实际点击、键盘和滚动，再连续读取画幅、位移、透明度与 SVG 描边变化，**没有用静态截图代替动画验证**。
- [layout-matrix.json](../output/acceptance/layout-matrix.json) 保存 16 组边界及章节位置；[interaction-evidence.json](../output/acceptance/interaction-evidence.json) 保存交互和动态采样。JSON 保留调查过程，`fullscreen-visual-correction` 明确纠正了早先对全屏字段空值的误判。

## 验收结果

| 检查项 | 状态 | 实际结果 / 证据 |
| --- | --- | --- |
| 四语完整页面 | 通过 | 16 组主要标题、卡片、联系按钮、页脚没有越出视口；正常素材没有加载失败。四语全部 119 个词条、24 条本地化项目记录另经脚本校验。 |
| 切换与记忆 | 通过 | 桌面及手机菜单的四语选择均即时更新；切至中文后刷新仍为中文。标题、导航、作品、Credits、人物陈述和提示一起切换。 |
| 开场与 Hero 联动 | 通过 | 一次完整采样中，1399ms 仍显示开场，1658ms 开场已离开、画幅约 inset(47.94%)，2391ms 接近完全展开，2615ms 字标回到 0%。该采样含加载/工具时延，不代表精确渲染性能。 |
| 滚动画幅 | 通过 | 真实滚动前矩阵为 scale(1)，滚动后为 scale(.87)、translateY(35px)，`--departure` 从 0 变为 1。见 scroll-framing.png 与对应采样。 |
| 镜头时间条 | 通过 | 点击第 5 镜头后 currentTime 为 16.236s，时间码 00:00:16:00，第 5 项选中；没有触发音频。 |
| 快速分类切换 | 通过 | 在退出动画结束前快速用方向键多次切换；最终请求 Music Videos，最终只留下《无声之间》《余温》，aria-busy=false，两卡 opacity=1。 |
| 键盘按需预览 | 通过 | Tab 聚焦《无声之间》后只建立一条预览，readyState 从 1 到 4、opacity 从 0 到 1；再 Tab 到《余温》只保留新预览。Hero 在作品区域已暂停。 |
| 手机预览约束 | 通过 | 390px 四语详情检查时预览视频数均为 0，手机不预加载 hover 片段。触摸硬件未实测。 |
| 详情画幅动效 | 通过 | 打开作品后读取到 inset(44.99%) → inset(29.98%) → inset(.47%) → inset(0%)；标题 opacity 0 → .657 → .9764 → 1。 |
| 弹窗连续开关 | 通过 | 10 次 Showreel 开关，交替按关闭按钮 Enter 与 ESC；每次打开仅一个 dialog、Hero 暂停、弹窗视频播放、body 锁定；关闭后 dialog=0、只剩 Hero 视频、焦点回到 Showreel、html/body 原 overflow 恢复。 |
| Tab / Shift+Tab | 通过 | 20 次正反向键盘导航，焦点始终在 dialog 内，包括原生视频控件、全屏按钮和素材来源链接。 |
| 手机详情与滚动锁 | 通过 | 四语标题、Credits 和图片均可用，dialog 无横向溢出；滚动详情时 dialog.scrollTop 从 0 到 506.67，背景 scrollY 保持 1077.33。 |
| 原生全屏 | 通过（当前浏览器） | 实际截图显示影片和原生播放控件全屏，见 ja-390-fullscreen-native.png。只读 DOM 桥未暴露 fullscreenElement，不能以其空值推断失败。无多浏览器全屏兼容性结论。 |
| Sticky 肖像 | 通过 | 连续滚动实测：scrollY 3236 时 top=144.76；scrollY 3386 和 3461.33 时 top 均为 50px。 |
| 桂冠交错 | 通过 | 真实滚入视口时三项 opacity 分别 .739/.4312/.15，随后 .9925/.9428/.8102，最终全为 1。 |
| 签名描边 | 通过 | 滚入视口后 stroke-dasharray 从 12.8/997.2，经 154.7/855.3、432.5/577.5，最终完成。使用 Anime.js v4 svg.createDrawable。 |
| 暂停与视口外暂停 | 通过 | 点击暂停后 paused=true，按钮变播放；进入作品/人物区域时背景视频 paused=true。Showreel 无音轨，禁用不可用的声音按钮。 |
| 媒体和海报失败 | 已修复，复测通过 | 独立构建测试服务对 MP4 和位图返回真实 HTTP 404。Hero 显示失败提示、播放与镜头按钮禁用，全部 14 张页面图像加载本地 SVG。详情隐藏失败视频，SVG 海报仍显示，提供原始素材链接。 |
| 复制成功 UI | 通过（API 反馈） | 正常页点击复制，Promise 成功，显示“邮箱已复制”，按钮成功状态开启、无手动框。浏览器桥的独立剪贴板读取为空，**未验证操作系统剪贴板的实际粘贴内容**。 |
| 复制失败 | 通过 | 独立服务通过 Permissions-Policy 拒绝 clipboard-write，显示失败 Toast 和手动框；focus=INPUT、value=china@example.com、selection=[0,17]。 |
| 控制台 | 通过（当前正常运行） | 正常页读取 error/warn 日志为空。故障页预期的 404/权限错误不计为正常页错误。 |

## 本阶段发现并修复的问题

- 手机菜单 ESC 后焦点留在不可见 select：现在归还菜单按钮，已复测其可见且 aria-expanded=false。
- 手机日文 Hero 角色行与画面底部拥挤：缩短手机画幅，留出两行标题空间。
- 1920px 英文大标题附近的画面字幕重叠：字幕移至画幅上方中央。
- 768px 最后一张作品半行空缺：使用第六张作品选择器；不会被后面的光标容器干扰。
- 韩文作品/联系标题拆词、日文肖像引语落单字：加入适当 keep-all 和独立字号/行高。
- 768px 日文 Showreel 按钮最后一字折行：增宽该语言平板按钮并保持标签不折行；更新截图复看通过。
- 肖像人物原本被居中裁切：保留原图，改为靠左取景。
- 镜头条六张缩略图及详情海报缺失降级：统一使用 MediaImage SVG 兜底，真实 404 复测通过。
- 片尾字距过紧：放松描边字距并调整字号。

## 未验证范围与限制

| 未验证项 | 原因与后续操作 |
| --- | --- |
| 真实鼠标 hover 与 Crosshair 连续跟随 | 当前浏览器工具没有纯 mousemove/hover 接口。键盘预览与单实例切换已实测；鼠标的进入/离开分支及指针表现仅做代码检查，需桌面手动复核。 |
| document.hidden 后台暂停/恢复 | 新建后台测试标签没有使原标签进入 hidden，不能据此声称已触发后台生命周期。已有监听及清理代码，需在实体浏览器切走标签实测。 |
| prefers-reduced-motion 实际系统偏好 | 当前工具不提供媒体偏好模拟；未修改用户系统设置。代码保留跳过开场、停用 Lenis/预览/颗粒/光标的路径，需切换系统减少动态效果后复核。 |
| autoplay 被浏览器策略拒绝 | 正常浏览器允许当前静音播放；媒体 404 测试不等同于 autoplay 拒绝。catch 与重试 UI 仅代码检查。 |
| FPS、CPU、内存、长时泄漏 | 未执行 Performance/Heap profiler，不宣称 60fps 或零泄漏。10 次开关仅证明检查时 DOM/播放/焦点/滚动锁正确，不能替代内存分析。 |
| 真机与多引擎 | 未验证 iOS Safari、Android Chrome、Firefox、屏幕阅读器及实体触摸设备。 |
| 复制后的系统粘贴内容 | 成功和拒绝 UI 分支均已运行；当前桥独立剪贴板读值不能证明 OS 剪贴板，需本机粘贴复核。 |

尝试使用 Playwright CLI 的 Edge 时遭遇 ProcessSingleton 锁创建错误（系统错误 5），换独立目录仍失败；Chrome for Testing 下载缓慢、未完成，已停止该下载。没有关闭用户浏览器或改变系统安全设置。改用可工作的内嵌浏览器继续完成其余验收；这些限制没有被计为通过。

## 构建与资源检查

最终代码运行下列检查均返回 0，原始输出保存在 output/acceptance：

| 命令 | 结果 | 输出 |
| --- | --- | --- |
| `node .tools/npm/bin/npm-cli.js run typecheck` | 通过 | [typecheck.log](../output/acceptance/typecheck.log) |
| `node .tools/npm/bin/npm-cli.js run lint` | 通过 | [lint.log](../output/acceptance/lint.log) |
| `node .tools/npm/bin/npm-cli.js run verify:assets` | 通过 | [verify-assets.log](../output/acceptance/verify-assets.log) |
| `node .tools/npm/bin/npm-cli.js run build` | 通过 | [build.log](../output/acceptance/build.log) |

素材校验：11 个上游源码哈希、33 个发布素材、四语每语 119 词条、24 条本地化项目记录。生产主 JS 373.49 kB / gzip 125.61 kB；懒加载 BlurText/Motion 138.06 kB / gzip 45.82 kB；CSS 49.19 kB / gzip 11.31 kB。这些是产物大小，不是性能评分。

`docs/01-research-architecture.md` 未修改，SHA-256：`9006D3A3EEE685C2815BE9FEB61C46894491E2601B8317F31C9E4F82684A3642`。

## 证据入口

- 中文全页：[桌面 1440px](../output/acceptance/zh-1440-full.png)、[桌面 1920px](../output/acceptance/zh-1920-full.png)、[手机 390px](../output/acceptance/zh-390-full.png)。
- 韩文关键排版：[手机作品](../output/acceptance/ko-390-works-detail.png)、[手机人物志](../output/acceptance/ko-390-about-detail.png)、[平板首屏](../output/acceptance/ko-768-hero-detail.png)。
- 日文关键排版：[手机人物志](../output/acceptance/ja-390-about-detail.png)、[平板首屏按钮](../output/acceptance/ja-768-hero-detail.png)、[手机联系](../output/acceptance/ja-390-contact-detail.png)。
- 行为与故障：[原生全屏](../output/acceptance/ja-390-fullscreen-native.png)、[复制被拒绝](../output/acceptance/clipboard-denied.png)、[影片与海报 404](../output/acceptance/media-failure-player.png)。
- 全部 16 组截图命名为 `{zh,en,ko,ja}-{390,768,1440,1920}-full.png`，对应 `-snapshot.txt`；`review-*-*.jpg` 为分区对照图，`*-detail.png` 是原尺寸局部裁切，没有改画面内容。

## 本地预览与复测

```powershell
Set-Location 'D:\网页设计\mo-chen-director'
node .tools/npm/bin/npm-cli.js run dev -- --host 127.0.0.1
```

访问 [http://127.0.0.1:5173/](http://127.0.0.1:5173/)。当前演示混剪保持无声；正式视频有音轨时再将对应 `hasAudio` 设为 true。

故障复现（仅本地测试，不进入应用打包）：先运行 build，再执行 `node scripts/acceptance-server.mjs`，打开 `http://127.0.0.1:5181/`。它只监听 loopback，故意返回位图/影片 404 并拒绝剪贴板写入；本次测试服务已停止。正常预览仍使用 5173。

## 正式上线前需要的资料

导演正式中/英/韩/日姓名、核准的人物履历与陈述、本人授权肖像；六部实际作品的片名、年份、分类、完整影片、短预览、海报/剧照、主创和授权范围；可核实的电影节/奖项记录及品牌使用授权；真实经纪人姓名、地区、邮箱和 Vimeo/IMDb/社交主页；正式域名和部署目标。当前全部虚构项目、荣誉、客户、联络资料的占位标记继续保留。

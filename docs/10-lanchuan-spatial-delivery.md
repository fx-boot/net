# LANCHUAN × DONG HAO — Spatial Cinema

2026-10-22。本轮以最新品牌决策与冷色要求为准，替代此前暖炭/烟草版本。预览：<http://127.0.0.1:5173/>。

## 品牌与色彩

- 制作厂牌 LANCHUAN / 重庆澜川科技有限公司；导演 東浩 / DONG HAO。四语公司名、身份、导航、双商务通道与版权已统一。
- `tokens.css` 使用 #0A0B0D、#13151A、#181A20、#F8F9FA、#9499A3、#FF3E00。原组件变量保留为兼容别名，值全部指向新色板。
- 移除页面 CSS 的棕褐、sepia 和黄铜调色；Hero 遮罩、章节渐变、图标、favicon、通用降级海报和导演占位 SVG 一并更新。
- 12 列不等宽网格、作品数据、现有媒体与四语 Context 继续使用。

## 空间与运动

作品与导演卡片使用 1000px 透视、最大约 3° 倾角、18px 以内前浮、反向阴影和微弱铂金反射。画幅、序号、信息和摄影机角标使用不同深度位移；导航、语言和混剪入口采用 3–4px 磁吸。移动端及 coarse pointer 自动关闭这些效果。

光学入场为 1100ms：固定 blur(12px) / brightness(1.2) 的装饰副本与清晰内容交叉淡化，并配合 translateY(36px) / scale(.97) 复位。滤镜不在入场时逐帧插值；模糊副本 aria-hidden、不接受点击。仅在入场或 hover 时声明 will-change。

两处 900px 以上的铂金/激光橙光晕，以 26/29 秒节奏缓慢漂移。REC 标识 2.4 秒呼吸。时码末组是装饰性监视器帧计数，最多 30Hz；可访问名称保留实际片长时码，不向读屏器持续播报。英文标签解密最长 340ms，不改写中日韩字符，不改变标签布局宽度。

新增倾角、漂移、滚动视差、时码及解密共用 Lenis 帧时钟，隐藏页面时暂停。Anime.js 时间线保留 scope/observer 清理。弹窗画幅过渡改为 FLIP 的 translate/scale；SVG 路径仅在短暂 hover/focus 时做 morph，左右桂冠与关闭叉号分开插值，避免跨子路径连线。

## 日文

本地 `shippori-mincho-regular.woff2`，3,164,464 bytes，来自 Google Fonts 官方 Shippori Mincho Regular，完整保留字形并仅转为 WOFF2。OFL 原文与原始 TTF 已保留。fontTools 检查包含 15,363 个 Unicode 字符映射、palt 特征，测试的假名、标点与品牌汉字无缺字。

日语独白采用 Bodoni Moda / Shippori Mincho / Yu Mincho / Hiragino Mincho / Noto Serif JP 栈；无显式中文字体回退。line-height 2.05、letter-spacing .05em、palt、strict line-break；浏览器确认字体 loaded。此检查不等同于独立的 JIS 全字符认证。

## 实测与边界

- `npm run typecheck`、`npm run lint`、`npm run build`：通过，最终日志见 output/spatial-2026-10-22/checks.log。
- `npm run verify:assets`：保护 Step 1 文档、校验本地媒体/字体哈希及四语字典。四语各 120 个字典键、24 条本地化项目记录；新增开源参考单独校验。
- 1440×900 与 390×844：四语公司名正确，无横向溢出、无已加载坏图。手机环境光隐藏、3D transform 为 none、正文 opacity 为 1。
- 实测 Visual Tech 筛选、单卡按需预览、700ms 画幅展开及 520ms 归位、播放器关闭清理、焦点归还、滚动解锁、复制邮箱、桂冠 hover、日语刷新持久化。
- `prefers-reduced-motion` 的 JS/CSS 分支已覆盖新增效果；本次浏览器接口不能模拟系统媒体偏好，未把代码检查描述成系统设置实测。桌面/手机为视口测试，非真机测试；没有宣称所有设备恒定 60 FPS 或零内存泄漏。

截图与浏览器读数在 `output/spatial-2026-10-22/`，含 Hero、Works、About、Awards、Contact、日文人物志、手机菜单/正文及播放器。截图为浏览器直接导出的 JPEG：桌面逻辑视口为 1440×900，工具导出图像为 1425×891，未进行人工放大。

## 体验路径与资料替换

首页移动指针观察摄影机标识与时码 → 作品区 hover 边角感受倾角/预览 → 切换视觉科技 → 点击影片，再关闭归位 → 人物区阅读聚焦 → 荣誉行 hover → 双通道邮箱复制。右上或手机菜单切换 ZH / EN / KO / JA，刷新保留选择。

真实导演肖像仍需放入 `public/media/director/donghao-portrait.jpg` 后重启 Vite；当前是原创抽象暗房画幅，未冒用他人照片。签名预留位、example.com 邮箱、样例影片履历仍需实际资料，说明仅保留于 Credits 与文档。

参考：[Aceternity 3D Card](https://ui.aceternity.com/components/3d-card-effect)、[Codrops Magnetic Buttons](https://tympanus.net/codrops/2020/08/05/magnetic-buttons/)、[React Bits Decrypted Text](https://reactbits.dev/text-animations/decrypted-text)。实际读取的源码、原始路径和 SHA-256 见 `upstream/spatial-references.json`；运行组件采用本项目编写的共享帧实现，没有引入 GSAP 或整套第三方 UI。

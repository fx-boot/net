# 电影放映台与空间交互：源码核验

调研日期：2026-10-23。范围为官方文章、官方组件文档与实际发布源码；以下是本轮改写的参考依据，**不是整库移植声明**。未修改或覆盖 `01-research-architecture.md`。

## 1. Codrops — On-Scroll 3D Carousel

- [官方文章，2025-05-07](https://tympanus.net/codrops/2025/05/07/on-scroll-3d-carousel/)
- [官方演示](https://tympanus.net/Development/3DCarousel/)
- 仓库提交：`b18acdc8900f46302bf1601ace47eee87f418e1c`（2026-10-13）。注意：当前源码已经比 2025 年文章中的初版扩展，不能混称为原始版本。
- [锁定 JS 源码](https://github.com/codrops/3DCarousel/blob/b18acdc8900f46302bf1601ace47eee87f418e1c/js/index.js)
- [锁定 CSS 源码](https://github.com/codrops/3DCarousel/blob/b18acdc8900f46302bf1601ace47eee87f418e1c/css/base.css)
- [MIT 许可](https://github.com/codrops/3DCarousel/blob/b18acdc8900f46302bf1601ace47eee87f418e1c/LICENSE)，Copyright Codrops。演示图像并非本项目的素材来源。

核验到的机制：场景透视与卡片表面分层；位移、旋转和透明度编排；交互中的 `isAnimating` 状态；速度驱动的弹簧回正，静止后停止样式写入；横向拖动后抑制点击；减少动态效果下使用交叉淡化。当前版本另含 GSAP 插件与可选 WebGL 网格转场，本项目不为借鉴构图而加入这套依赖。

可迁移的艺术原则是“中央画门清晰、周边画幅退入空间”，而非六块相同尺寸的图片轮播。项目建议用中央恒定微光边框、四角刻度、两侧静态暗角与较低透明度建立层次；过带只动画 transform / opacity，不采用源码中的持续亮度滤镜或大角度全屏翻转。

## 2. React Bits — Tilted Card

- [官方文档](https://reactbits.dev/components/tilted-card)
- 文档命令：`npx shadcn@latest add @react-bits/TiltedCard-TS-TW`。
- 仓库提交：`e12c22192ac7b4b452c5e2feb9b586d74765d696`（2026-10-19）。
- [锁定 TS/Tailwind 源码](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/ts-tailwind/Components/TiltedCard/TiltedCard.tsx)
- [许可](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/LICENSE.md)：MIT + Commons Clause；可作为网站组成部分使用，不可把组件本身单独售卖或再分发为组件产品。

实际源码区分 `figureRef` 的坐标感应与 `bodyRef` 的视觉变换，影子单独反向平移；弹簧到达阈值即休眠，并考虑减少动态效果、粗指针与可见性。项目继续保留现有静态 CardTrigger / inert CardVisual 和统一帧时钟，不安装另一个逐卡 RAF。借鉴的是这套视觉层级与休眠原则，没有把 Tilted Card 冒称为本轮已安装组件。

## 3. Aceternity — 3D Card Effect：借鉴与拒绝点

- [官方组件页](https://ui.aceternity.com/components/3d-card-effect)
- [实际注册表 JSON](https://ui.aceternity.com/registry/3d-card.json)，内含 `components/ui/3d-card.tsx` 完整源码。
- [官方许可页](https://ui.aceternity.com/licence)当前主要描述 Pro 项目许可，不能据此把注册表全部文件概括为 MIT。本轮不复制其代码。

可参考外层 perspective 与子层 translateZ 的空间层级；但该注册表版本在同一 `containerRef` 上读取矩形、监听鼠标并执行旋转。直接移植会违背本项目已经修复的边缘抖动约束，因此拒绝此实现方式，继续在静态外壳上测量、在 pointer-events:none 的内部视觉层上倾斜。

## 4. 本轮可落实的三条边界

1. **画门是主角，界面退后**：固定中央 2.39:1，精密边缘、底部单行片名与器械刻度；周边用遮光层和缩放退景。景深不用高斯模糊表达。
2. **感应外壳不动，胶片平面运动**：角标、阴影、图像归入 inert 视觉层；保持固定点击区域与单帧读写批次。
3. **动效有起止**：切片期间 transform / opacity，结束后移除 will-change；弹窗暂停背景，reduced-motion 直接静态清晰，避免隐藏页与离屏视频消耗。

## 5. 可复核指纹

以下均为 UTF-8 原始响应内容的 SHA-256；通过 Node 原生 fetch 读取官方 GitHub/API 或官方注册表后计算。

| 文件 | SHA-256 |
| --- | --- |
| Codrops `js/index.js` | `c35e270c012e88c05a3b1ac7e881b091ead09e5ac2ef1d046a4d01ef5ed97a05` |
| Codrops `css/base.css` | `5a399cdeddc4b4a1af6353f876efcb8caf69de75cbfbee25ac859145edbae4a0` |
| Codrops `LICENSE` | `3b56d635b76cb0c0fc8ffd303bce06bd44365cf4b99e77e889fc6b259141ec1b` |
| React Bits `TiltedCard.tsx` | `a881891435e05587430fe84dbb8de415c8713abe509c8f69ad5c1ac8df5d71c4` |
| React Bits `LICENSE.md` | `4bdd1fa59a6b7d5954bc3b213dbc34e455c635a94bbcecf9293553797d0fad02` |
| Aceternity `3d-card.json` 注册表响应 | `c2916dc70428da48e40ece3907b25ab028a7351c8da4410e3bf3a40688b24082` |
| Aceternity 注册表内 `3d-card.tsx` | `ec2f994a294aa81bb10d8a4a8512e1d9d90acdccf2fb1c8eadf83874c5be34e8` |

这些指纹锁定本次实际读取的内容；外部 main 分支、演示与注册表以后可能变化。

## 6. 厂牌与电影目录的内容参照

- [A24 Catalog](https://catalog.a24films.com/)：实际读取到按 collection 编号的电影主题目录；借鉴的是影片与目录索引的主次，不复制其图像或私有代码。
- [DIVISION 官方首页](https://www.division.global/)与[官方接洽页](https://us.division.global/contact)：读取到按创作者/作品建立的影像入口，以及按业务与地区划分的联络结构。本项目对应独立放映入口与制作/导演双通道。外部浏览器视觉访问超时，本轮不声称完成逐像素或所谓黄金比例测量。
- Awwwards 官方获奖档案：[EXIT FILM](https://www.awwwards.com/sites/exit-film)（2014-11-30 SOTD）、[Peak’n Film](https://www.awwwards.com/sites/peakn-film)（2020-06-20 SOTD）。后者官方档案列出 portfolio navigation transition 与 variable-font rollover 两类交互。它们用于确认“电影内容、排印与转场”的评审维度；这是历史档案，不能描述为2026年度奖项，也没有引入其旧版运行时。

这些观察支持本项目的内容编排与评价维度，具体构图仍依据用户指定的 Monolith / Projection Theatre / Dossier & Lab 设计，任何评分均为项目内部主观审查。

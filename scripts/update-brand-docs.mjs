import fs from 'node:fs/promises';
await fs.writeFile('README.md', `# LANCHUAN / 東浩 — Studio & Director Atelier

重庆澜川科技有限公司 × 导演 東浩的 React + Vite + TypeScript 双轨官网。中、英、韩、日四语，保存语言偏好。公司与导演身份来自客户；影片、履历、邮箱仍为待替换资料，声明保留于 Credits 和文档。

当前为冷黑、钛银、铂金白与激光橙红色板，12 列非对称画册，3D 倾角、空间视差、光学入场与低强度流光。最新实测与截图见 [交付记录](docs/10-lanchuan-spatial-delivery.md)。旧文档记录各自阶段，不代表当前配色。

## 本机启动

目录：D:\\网页设计\\mo-chen-director。预览：<http://127.0.0.1:5173/>。

本机 Node v24.19.0，npm 12.2.0 在项目 .tools/npm/。PowerShell：

\`\`\`powershell
Set-Location 'D:\\网页设计\\mo-chen-director'
$env:PATH='C:\\Users\\Administrator\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin;'+$env:PATH
& 'C:\\Users\\Administrator\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe' '.tools/npm/bin/npm-cli.js' run dev -- --strictPort
\`\`\`

普通已配置 npm 的环境：npm ci，然后 npm run dev。检查命令为 npm run typecheck、npm run lint、npm run verify:assets、npm run build。dist/ 可由静态服务器部署，勿通过 file:// 打开；部署子目录时调整 Vite base 和绝对媒体路径。

## 代码与交互

- src/app：页面组合、Lenis 单例与生命周期。
- src/i18n：120 键四语字典、editorial、品牌身份、语言持久化与切换；src/data/mockData.ts：六部影片及四语资料，按稳定 ID 关联。
- src/hooks/useSpatialRig.ts：共享帧时钟的磁吸/倾角；useSpatialScroll 与 useScrollScene：错层滚动；useOpticalReveal：固定失焦副本交叉淡化。
- src/styles：tokens、global、spatial、motion 和 Uiverse 加载条。原命名变量保留兼容别名，全部引用新冷色色值。
- public/fonts、public/media：本地字体、完整影片、短预览、海报与 SVG 降级。普通浏览无需外部字体/媒体服务。
- upstream：原始源码、许可、固定 commit 与 SHA-256，作为研究归档，不会发布到 dist。
- docs/01-research-architecture.md 保持批准原文，verify:assets 校验其哈希。

首屏场记板、静音循环与暂停；非对称画册筛选、单卡 hover/focus 预览；作品弹窗画幅展开与逆向归位；导演档案与字幕阅读聚焦；荣誉交错和 SVG morph；双通道商务邮箱翻转复制与手动选中回退；Credits 面板。

新增倾角、视差、短标签解密和监视器帧计数共用 Lenis 帧时钟，不为每张卡片建立 RAF。页面隐藏暂停。移动端/coarse pointer 保留静态布局与完整正文；减少动态效果禁用新增运动及背景自动播放。弹窗保留 ESC、焦点循环/归还、背景滚动锁与视频卸载清理。

## 日文与资料替换

日文独白采用本地 Shippori Mincho + Yu Mincho 等日本明朝体回退，palt、2.05 行高、.05em 字距；无显式中文字体回退。Latin 为本地 Instrument Sans / Bodoni Moda。字体与许可、哈希记录见 MEDIA-LICENSES.md。

公司/导演身份在 src/i18n/brand.ts。真实肖像放到 public/media/director/donghao-portrait.jpg 后重启 Vite；未提供时使用原创抽象取景画幅，不冒用他人肖像。签名仍是预留位。

商务邮箱暂为 studio@example.com 和 atelier@example.com。替换真实影片、Credits、荣誉与邮箱后，同步更新数据占位状态和许可记录。既有六部影片为 Mixkit 授权演示素材。

现有 showreel-silent.mp4 没有音轨，已移除曾引起嗡鸣的合成声音。替换真实有声混剪时设置 hasAudio: true；页面不会生成环境嗡鸣。

组件来源、研究参考及改写见 ATTRIBUTION.md；验证读数和截图位于 output/spatial-2026-10-22/。视口测试不是手机真机兼容性、恒定帧率或零内存泄漏证明。
`);
const attribution = '\n## Spatial Cinema references — 2026-10-22\n\nAceternity public 3D Card registry (https://ui.aceternity.com/registry/3d-card.json) was read for perspective / preserve-3d / translateZ structure. Codrops MagneticButtons demo1/buttonCtrl.js at b2ee8ac9cd561e13198335cca5684fe1c31d543c was read for interpolation and magnetic text; its MIT license is archived. React Bits DecryptedText TS-TW at 7381f14b15e8f9e00b01ce5b6ac4416f7ee360c4 was read for bounded character resolution; existing MIT + Commons Clause license remains. Source files and SHA-256 are in upstream/spatial-references.json. The initial Codrops src/js/button.js request returned 404; the actual demo1/buttonCtrl.js path was then recovered from the official Git tree.\n\nRuntime useSpatialRig, ScrambleLabel, OpticalText, MorphIcon and AmbientLight are project-written adaptations of these interaction patterns, using the existing Lenis/Anime.js lifecycle. No Aceternity commercial template or Codrops GSAP runtime was installed. No third-party component is claimed as wholly original source.\n';
const media = '\n## Japanese type and platinum identity — 2026-10-22\n\nShippori Mincho Regular was downloaded from https://raw.githubusercontent.com/google/fonts/main/ofl/shipporimincho/ShipporiMincho-Regular.ttf under SIL OFL 1.1. The original TTF is archived in upstream/fonts; its hash and the original license source are in upstream/spatial-references.json. FontTools 4.67.0 with Brotli 1.2.0 recompressed the complete font without subsetting or editing outlines. Runtime file public/fonts/shippori-mincho-regular.woff2 is 3,164,464 bytes; full license public/fonts/Shippori-Mincho-OFL.txt. All publication hashes are recorded in upstream/media/published-assets.json. Reproduction script: scripts/convert-japanese-font.py.\n\nThe Japanese serif stack now uses this local Japanese font, rather than the historical system-only fallback described above. Platinum recoloring of original fallback SVGs does not change third-party footage licenses. Main UI contains no demo disclaimers; source/placeholder disclosures remain in Credits and these documents.\n';
for (const [file, text] of [['ATTRIBUTION.md',attribution],['MEDIA-LICENSES.md',media]]) {
 const source=await fs.readFile(file,'utf8');
 if (!source.includes(text.split('\n')[1])) await fs.appendFile(file,text);
}
console.log('Updated current README and source / font attribution.');

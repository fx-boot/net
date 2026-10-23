# LANCHUAN × 東浩：视觉重构自审与交付证据

2026-10-23。本轮已完成 Monolith / Projection Theatre / Dossier & Lab 的视觉重构，并完成独立初审提出的三项有界修正。相同四维度、每项 25 分的内部主观标尺，从初审 **86/100** 更新为复核 **90/100**；该数值不是外部奖项成绩、评委预测或性能保证。

预览：[http://127.0.0.1:5173/](http://127.0.0.1:5173/)。视觉依据为 [本轮方向契约](12-art-direction-contract.md)、[官方参考核验](12-reference-research.md)、[独立评审及最终 verdict](12-independent-review.md) 与当前源码。完整视觉规则已经持久化至 [DESIGN.md](../DESIGN.md) 和 [design.json](../.impeccable/design.json)。本报告汇总已落地结果与证据，不把本轮自主授权扩展为以后所有任务的默认审批。

## 修改前的五个问题

以下沿用方向契约中的审计，前态为 [完整桌面页](../output/art-direction-2026-10-23/before-full-1440.jpg) 与 [首屏](../output/art-direction-2026-10-23/before-hero-1440.jpg)：

1. 首屏名字虽然大，笔画仍偏轻；右侧观看入口与名字处于同一条水平带，压缩了主标题的图形层级。
2. 作品区还是筛选、普通大图、箭头的顺序堆叠；画门、侧片退景与放映操作没有共同秩序。
3. 导演占位图更像光学测试靶，姓名只在下方小字号出现；空缺肖像没有成为有意设计的作者字版。
4. 厂牌只有三个无层次规格标签，缺少“创作实践 / 技术方法”的双轨表达。
5. About 与 Contact 存在大片均匀钛灰色块和等速留白，明暗、温度与信息密度的变化不足。

## 四个维度的代码与效果

### 1. 首屏大排印：从文字介绍变为片头

Instrument Sans 使用 600 字重，桌面尺寸为 `clamp(5rem, 15vw, 16rem)`，字距 `-.04em`、行高 `.79`；移动端为 `15.9vw`、行高 `.85`。微小出品信息、时间码与光学读数为巨字提供尺度参照。观看入口独立放置，避免与主名字带争夺同一水平位置。遮幅集中在影像顶部和底部，保留中央画面的光。

实现见 [tokens.css](../src/styles/tokens.css) 与 [projection.css](../src/styles/projection.css)。最新 [桌面首屏](../output/art-direction-2026-10-23/refined/hero-zh-1440.jpg) 和 [日文移动首屏](../output/art-direction-2026-10-23/refined/hero-ja-390.jpg) 对应独立复核中“巨大姓名与小读数尺度成立”的结论。首屏在最终三项修正中没有继续改构图，也没有为凑分追加微调。

### 2. 巨幕放映台：中央画门与两侧退景属于同一空间

桌面中央片占舞台宽度 72%，画幅为 2.39:1；移动端为 84%、16:9。中央画门保留细亮边与四角刻度，下方片名、片号和元数据不套入卡片底板。FRAME / REEL 读数、前后按钮和索引尺规组成独立控制台。尺规随片库索引移动，是状态读数；实际切片由按钮、方向键和横滑承担。

侧片仍使用 `.25` 透明度和 `.88` 缩放。最终批次取消额外的重度横向遮光和父层 `saturate(.35)`，将静态图片等级设为 `contrast(1.04) saturate(.88) brightness(1.28)`，使两侧影像重新可辨。在宽度至少 701px、可悬停、精细指针且无减少动态效果偏好的桌面上，使用 1400px 透视，左侧 8deg、右侧 -8deg、中央 0deg；移动、粗指针和减少动态效果保留不带该透视旋转的处理。

实现见 [CinemaCarousel.tsx](../src/components/works/CinemaCarousel.tsx)、[cinema.css](../src/styles/cinema.css) 与 [projection.css](../src/styles/projection.css)。最新 [放映室及完整控制台](../output/art-direction-2026-10-23/refined/console-zh-1440.jpg) 中，两侧影像退入空间，中央画门仍然主导。固定感应外壳与 inert 视觉后代保持原约束，没有为景深加入高斯模糊或新的帧循环。

### 3. 作者档案与技术矩阵：让空缺资产成为有意的字版

导演区以 4:5 画幅、穿孔边条、光学角标和坐标组成原创底片夹；“東浩”与 DONG / HAO 排印成为肖像未供应时的视觉焦点。真实肖像的接入路径保留，当前字版不冒充照片或手写签名。阅读轨与档案在桌面分列，移动端改为单列，档案居中占可用宽度 86%。

厂牌区以三行语义化 `dl / dt / dd` 表达 Virtual Production、CGI / VFX、Color Science，区分英文技术名、本地化标签和说明，不用规格徽章代替能力叙述，也没有新增客户、奖项或研发成绩。

日文阅读采用自托管 Shippori Mincho 与日文系统回退栈，不含中文回退，保留 `'palt' 1`、严格禁则、2.05 行高和 `.05em` 字距。韩文保留 `keep-all`；最后一句的最后两个词通过不可拆分短语收尾，字典原文没有修改。

实现见 [DirectorCard.tsx](../src/components/about/DirectorCard.tsx)、[DirectorStatement.tsx](../src/components/about/DirectorStatement.tsx)、[StudioCapacity.tsx](../src/components/about/StudioCapacity.tsx) 与 [projection.css](../src/styles/projection.css)。最新 [作者区](../output/art-direction-2026-10-23/refined/about-zh-1440.jpg)、[技术矩阵](../output/art-direction-2026-10-23/refined/studio-zh-1440.jpg)、[日文移动矩阵](../output/art-direction-2026-10-23/refined/studio-ja-390.jpg) 和 [韩文尾句](../output/art-direction-2026-10-23/refined/statement-tail-ko-390.jpg) 是当前证据。

### 4. 胶片暗室：用静态光场与细颗粒建立材质

基底为冷黑 `#0A0B0D`，辅以 `#13151A` / `#181A20`；主文字为铂金 `#F8F9FA`，次级信息为钛灰 `#9499A3`，激光朱砂 `#FF3E00` 仅承担活动与记录信号。全页保留一张 192×192 灰度 bitmap 平铺，透明度 `.03`。

最终批次把共享冷青光调整为 `rgba(72, 125, 156, 0.10)`，微朱砂为 `rgba(255, 62, 0, 0.035)`。Works 与 About 另有局部静态青色和朱砂径向场，给作者底片、矩阵和暗场建立温度分离。保持冷黑主体，没有棕色做旧、全屏高斯层、动态混合模式或逐帧亮度滤镜。

实现见 [tokens.css](../src/styles/tokens.css)、[projection.css](../src/styles/projection.css) 与 [spatial.css](../src/styles/spatial.css)。[桌面完整页](../output/art-direction-2026-10-23/refined/full-zh-1440.jpg)、[日文移动完整页](../output/art-direction-2026-10-23/refined/full-ja-390.jpg) 和 [Contact](../output/art-direction-2026-10-23/refined/contact-zh-1440.jpg) 显示局部冷暖分离；独立复核认为文字、黑位和细颗粒保持节制。

## 官方参考与本地取舍

完整来源、锁定提交、许可和源码指纹记录在 [12-reference-research.md](12-reference-research.md)。这里记录使用了哪些原则，不作整库移植或逐像素复刻声明。

| 参考 | 本轮采用的原则 | 本地边界 |
| --- | --- | --- |
| [Codrops：On-Scroll 3D Carousel 官方文章](https://tympanus.net/codrops/2025/05/07/on-scroll-3d-carousel/)与[演示](https://tympanus.net/Development/3DCarousel/) | 中央画门明确、周边平面退入空间，位移、旋转与透明度各有职责。 | 保留既有窗口回收和统一帧时钟；没有为构图引入 GSAP / WebGL 依赖或其演示图像。 |
| [React Bits：Tilted Card 官方文档](https://reactbits.dev/components/tilted-card) | 感应层与视觉层分离，阴影独立响应，低运动偏好与粗指针有降级。 | 继续使用静态 CardTrigger 与 inert CardVisual；本轮没有把参考组件冒称为新安装组件。 |
| [Aceternity：3D Card Effect 官方组件页](https://ui.aceternity.com/components/3d-card-effect) | perspective 与子层空间关系。 | 没有复制其在同一感应容器上读取矩形并旋转的实现，避免重新引入边缘抖动。 |
| [A24 Catalog](https://catalog.a24films.com/)与 [DIVISION 官方首页](https://www.division.global/) / [接洽页](https://us.division.global/contact) | 影片与目录索引的主次，以及创作者、业务、地区的联络结构。 | DIVISION 的外部浏览器视觉访问曾超时，未声称完成逐像素或黄金比例测量。具体构图仍来自本轮用户指定方向。 |
| Awwwards 的 [EXIT FILM 历史档案](https://www.awwwards.com/sites/exit-film)和 [Peak’n Film 历史档案](https://www.awwwards.com/sites/peakn-film) | 以电影内容、排印和转场建立评价维度。 | 分别是 2014、2020 年历史获奖档案，不能写成 2026 年获奖或本项目成绩。 |

## 86 → 90 的有界复核

独立完整初审以四项各 25 分给出 86/100，并仅提出三项可执行修正：韩文末词孤行、侧片重复压暗、暗室光场温度分离。三项完成后，只复核这些变化及其回归，没有重新扩大成全站缺陷搜索。记录见 [12-independent-review.md](12-independent-review.md)。

| 维度 | 初审 | 最终复核 | 加分依据 |
| --- | ---: | ---: | --- |
| 首屏大排印 | 22/25 | 22/25 | 此批次未改首屏，保留已成立的巨字与读数层级，评分不变。 |
| 巨幕放映台 | 22/25 | 24/25 | 侧片恢复为可辨的两个退景平面，中央画门和器械控制仍清晰。 |
| 档案与科技矩阵 | 21/25 | 22/25 | 原有档案与矩阵秩序保留，韩文末词孤行这一明确排版缺口闭合。 |
| 胶片暗室质感 | 21/25 | 22/25 | 静态冷暖光场获得可见分离，同时保持冷黑、细颗粒与可读性。 |
| **合计** | **86/100** | **90/100** | 同一维度、同一权重，根据修正后的证据更新。 |

独立复核对原三项均记为 `resolved`，结论为 `disposition: ship`。该 ship 结论覆盖这三项与其引入的回归；其余区域沿用上次完整评审的有效结论。在提供的截图中未见本批次引入的相关回归。这是项目内部主观视觉评审，不是外部奖项评价；没有预先承诺修正必然增加四分，也没有把未供应的正式内容改算为已完成。

## 构建、性能与交互验证

### 构建与资源

| 检查 | 当前结果 |
| --- | --- |
| `npm run typecheck` | 退出码 0 |
| `npm run lint` | 退出码 0 |
| `npm run verify:assets` | 退出码 0；42 项发布资源、11 项上游指纹通过核验 |
| `npm run build` | 退出码 0 |
| 保护文档 | `docs/01-research-architecture.md` 哈希保持原值，未覆盖 Step 1 |
| 生产 CSS | 72.70 kB；gzip 16.00 kB |
| 生产 JavaScript | 393.20 kB；gzip 134.07 kB |

构建和资产记录见 [checks.log](../output/art-direction-2026-10-23/checks.log)。核验同时覆盖四套完整界面字典、四语 editorial / brand 内容、48 条本地化项目记录，以及扩充到 50 部时的 ID 和有界轮播窗口。42 项资源是当前发布清单项数，不代表 42 部原创影片。

### 最新 10 秒滚动采样

最终修正后重新运行，证据为 [refined/frame-sampling.json](../output/art-direction-2026-10-23/refined/frame-sampling.json)。

| 指标 | 记录 |
| --- | ---: |
| 墙钟时长 | 10,008 ms |
| 滚动调用 | 150 次 |
| RAF 间隔样本 | 570 |
| 平均间隔 | 16.6659649 ms |
| P95 | 16.8 ms |
| 最大间隔 | 16.8 ms |
| 大于 34 ms | 0 |
| 已登记 RAF 驱动 | 1 |
| 已标记场景 read-after-write | 0 |

150 是发送端 `wheelCalls`，诊断端原生 wheel 事件计数为 143，两个字段统计口径不同。以上是本机浏览器约 60Hz 环境下的 **RAF 回调间隔**，不能当作 GPU 呈现 FPS、完整浏览器 Layout trace，或所有设备稳定 120 FPS 的保证。读写计数只覆盖已接入诊断的场景。移动检查为浏览器视口检查，不冒称移动真机或 120Hz 真机验收。

单时钟、先测量后写入、隐藏页暂停、离屏可见性及动效降级的实现见 [Providers.tsx](../src/app/Providers.tsx)、[cinemaFrames.ts](../src/lib/cinemaFrames.ts)、[frameDiagnostics.ts](../src/lib/frameDiagnostics.ts) 与现有 scene / spatial hooks。

### 最终边界重测与功能记录

[refined/boundary-regression.json](../output/art-direction-2026-10-23/refined/boundary-regression.json) 对最终批次完成 50 个边界输入位置重测：**0 次命中不符、最大矩形差 0、全部感应外壳 transform 为 none**。这与前轮同样为零的结果一致；视觉透视没有改动中央卡片的感应契约。

最新箭头与弹窗回归见 [refined/interaction-regression.json](../output/art-direction-2026-10-23/refined/interaction-regression.json)：下一部到“夜行者”，上一部回到“潮汐之后”；ESC 后 dialogs 为 0、焦点回到 `card-trigger project-button`、playingVideos 为 0、scrollLock 为空。其余已通过交互记录见 [interaction-results.json](../output/art-direction-2026-10-23/interaction-results.json)：

- 前后按钮、左右方向键及循环片库导航可用。
- Archive 从 6 条加载到 12 条，分类切换和有界窗口保持工作。
- 横向拖动/滑动切换影片，并抑制拖动结束时的误点击。
- 打开影片后按 ESC，dialog 数和残留视频数归零、滚动解锁、焦点回到原作品按钮。
- 邮箱复制出现 `data-copied=true` 成功状态；成功时不进入手动复制回退。
- 四语切换与刷新保留已测，日文持久化记录另确认 `html lang=ja`、Shippori Mincho 已加载与 palt 生效。

字体与宽度读数见 [typography-checks.json](../output/art-direction-2026-10-23/typography-checks.json)。最新 [refined/browser-logs.json](../output/art-direction-2026-10-23/refined/browser-logs.json) 为空数组。预览已确认 HTTP 200，并恢复普通中文首页展示；日志结果仅描述已捕获会话。

## 最新截图索引

以 `refined/` 为最终视觉证据；`final-*` 保存三项修正前的完整初审状态，早期无效的 `review-*` 桌面图不作当前依据。桌面与移动逻辑视口分别为 1440×900、390×844；导出像素尺寸可能受滚动条和浏览器缩放影响。

| 区域 | 最新文件 | 用途 |
| --- | --- | --- |
| 首屏 | [hero-zh-1440.jpg](../output/art-direction-2026-10-23/refined/hero-zh-1440.jpg) | 巨字、观看入口和上下遮幅 |
| 作品入口 | [works-zh-1440.jpg](../output/art-direction-2026-10-23/refined/works-zh-1440.jpg) | 标题、筛选与侧片深度 |
| 完整控制台 | [console-zh-1440.jpg](../output/art-direction-2026-10-23/refined/console-zh-1440.jpg) | 中央画门、两侧退景、尺规和 transport |
| 作者档案 | [about-zh-1440.jpg](../output/art-direction-2026-10-23/refined/about-zh-1440.jpg) | 原创底片字版、阅读轨和局部光场 |
| 技术矩阵 | [studio-zh-1440.jpg](../output/art-direction-2026-10-23/refined/studio-zh-1440.jpg) | 三行技术层级与材质 |
| 荣誉目录 | [awards-zh-1440.jpg](../output/art-direction-2026-10-23/refined/awards-zh-1440.jpg) | 行级排印与本批次回归检查 |
| 双通道接洽 | [contact-zh-1440.jpg](../output/art-direction-2026-10-23/refined/contact-zh-1440.jpg) | 公司/导演分流、邮箱与暗场 |
| 桌面全页 | [full-zh-1440.jpg](../output/art-direction-2026-10-23/refined/full-zh-1440.jpg) | 全页密度、冷暖和章节节奏 |
| 日文移动首屏 | [hero-ja-390.jpg](../output/art-direction-2026-10-23/refined/hero-ja-390.jpg) | 移动首屏层级 |
| 日文移动全页 | [full-ja-390.jpg](../output/art-direction-2026-10-23/refined/full-ja-390.jpg) | 响应式构图与日文阅读 |
| 日文移动矩阵 | [studio-ja-390.jpg](../output/art-direction-2026-10-23/refined/studio-ja-390.jpg) | 技术说明、字形与禁则 |
| 韩文移动尾句 | [statement-tail-ko-390.jpg](../output/art-direction-2026-10-23/refined/statement-tail-ko-390.jpg) | `못한 표정입니다.` 同行收尾，没有最后一词孤行 |

## 预览交互路径

1. 打开 [普通首页](http://127.0.0.1:5173/)，观看首屏，使用观看入口打开 Reel；调试采样只在开发模式 `/?inspect=1` 下启用，主页面没有诊断面板。
2. 进入作品区，用前后按钮、左右方向键或横向拖动切片，检查中央画门、侧片退景和尺规同步。
3. 切换 Archive，加载 6 → 12 条，再切换分类；打开影片后按 ESC，继续从原作品位置操作。
4. 进入导演与厂牌区域，对照底片字版、独白和三行技术矩阵；使用 ZH / EN / KO / JA 查看四语，移动端从菜单进入。
5. 在接洽区复制邮箱，再从页脚 Credits 查看素材、演示资料与许可记录。

## 正式内容与主界面沉浸

真实导演肖像、签名、正式商务邮箱、原创原片和已核实履历仍需由品牌方供应。当前真实肖像入口为 `/media/director/donghao-portrait.jpg`；未接入时显示有意设计的底片字版。`studio@example.com` 与 `atelier@example.com` 为演示地址；现有片库复用授权素材，演示片名、主创、合作及荣誉不能作为真实商业成绩发布。这些是内容供应边界，没有被拿来压低四个纯视觉评分，也没有因视觉完成而改写成真实业绩。

主界面按本轮要求维持沉浸观看，不在章节中插入破坏节奏的常驻免责声明；演示与来源事实保存在 Credits、素材许可文档及 `isPlaceholder` 数据标记中。沉浸呈现与事实披露承担不同职责，主视觉完成不等于正式商业内容已经上线。

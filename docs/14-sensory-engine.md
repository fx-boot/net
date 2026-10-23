# LANCHUAN：感官交互交付记录

2026-10-23，版本 0.1.0。本轮保留冷黑画册、四语数据、原生弹窗和静态 CardTrigger，在同一帧调度中加入直接操作的放映交互。

## 新增内容

| 模块 | 实现与边界 |
| --- | --- |
| 活态颗粒 | `FilmGrainCanvas.tsx` 单例，1440×900 下为 720×450（像素数 1/4），CSS 平滑放大，最多 12fps；RGBA 共享缓冲、32 位写入、相关随机游走。透明度 .032，移动 .028。隐藏、弹窗暂停；移动/减少动态效果只保留一帧。旧 PNG 已删除。 |
| 变形光锥 | `AnamorphicLightSpill.tsx` 在首屏与巨幕后方使用冷蓝/微朱砂径向光场；仅在可见且滚动/尺寸改变时测量父级，统一写入微幅位移与角度。无高斯模糊。 |
| VFX 对比窗 | `CineBreakdown.tsx` 与中央画门同宽、2.39:1；鼠标跟随、44px 分界拖动区、原生 range 键盘支持。松手坐标最后采样，取消不跳变。独立的 biography-spread 保证 Sticky 作者档案在对比窗之前结束。 |
| 分镜擦洗 | 六个已许可原片各提取四张真实帧，共 24 张、1,782,611 bytes；按需加载中央影片，用 opacity 交叉切换，离开淡回主封面。TC 按真实片长映射到名义 24fps；不是连续视频逐帧寻址。URI 加载缓存避免快速筛选复用旧索引。 |
| 机械尺规 | 原生 range 支持拖动、方向键、Home/End，覆盖 12 部片库；同一帧驱动中运行带阻尼的弹簧，结束即退订。缩放/旋转仍只属于 inert 视觉后代。 |
| 可选声音 | 全站唯一右下角控制，初始 OFF/uninitialized；主动开启才创建 AudioContext。50Hz/-36dBFS 峰值、240ms 渐入；15ms 低通机械脉冲可复用并限频。关闭、失焦、隐藏、弹窗和系统中断均停止输出；返回不自动恢复，ON 不持久化。 |

### 内容真实性

当前对比窗是 **COLOR STUDY**：同一已许可帧的低反差/展示调色，并非真实 Log、绿幕、CGI 制作案例。PASS 标签保留正式双片接口的排印，来源与具体滤镜见 [对比素材说明](14-breakdown-source.md)。正式镜头拆解需换入已授权、对齐的原始与成品双片。所有影片仍为 `isPlaceholder: true`，没有添加真实履历或客户业绩。

颗粒是银盐感的视觉模拟，不是 Kodak 胶片物理模型。单层 soft-light 和低透明度减弱高光与文字的影响，不做昂贵的全屏亮度读回。

## 运行验证

- `typecheck`、`lint`、`verify:assets`、`verify:sensory`、`verify:audio`、`build` 均通过；65 项发布资产、原始来源指纹、四语新增文案、48 条本地化影片记录及 50 部工厂扩容核验通过。
- 24 张帧的签名/哈希、时间范围与同组唯一性通过。潮汐片长 16.02s；末端 TC 为 `00:00:15:23`。中央画幅擦洗不创建视频解码器，Archive 保留原视频预览。
- 10,016ms 联合压力测试，89 轮滚轮与擦洗，584 个 RAF 样本：平均 16.6659ms，P95 16.8ms，最大 16.9ms，超过 34ms 为 0。已登记驱动 1，受监测场景 read-after-write 0。
- 50 个四边进出测点：误判 0，感应矩形差 0，所有感应外壳 transform 为 none。
- 桌面 VFX 指针 27%/75%、键盘 Home/End/ArrowRight，以及移动最终 25%/75% 拖动通过。尺规 End 到 12/12，弹簧归位 1.000000；移动横滑换片，没有误开弹窗。
- 四语新增控件/移动折行无横向溢出；日文采用本地 Shippori Mincho、日本系统回退与 palt。移动颗粒为 still/1 frame，擦洗自动退回封面，横滑保留。
- 浏览器验证默认 OFF → 主动 ON/running → 弹窗 paused/suspended → 不自动恢复 → 主动恢复/关闭。九组音频 mock 契约通过，包括快速开关、拒绝恢复和系统中断。
- 最终冷启动日志无警告/错误。开发过程中并行写入模块曾产生临时 HMR 错误，原始累计日志保留在本地历史文件，未作为最终运行错误隐去。
- 固定声音控件的底部安全区为 76px，避免覆盖页脚 Credits；真实点击已验证弹出来源面板，环境声维持 OFF、颗粒暂停，ESC 正常关闭。

这是一台约 60Hz 浏览器环境的 RAF 调度采样，不是 GPU 呈现追踪。颗粒累计单次绘制平均约 4.16ms、最大 6.5ms（含初始化）；未计量系统 GPU 占用，不宣称小于 1%。60/120Hz 弹簧数值模拟均收敛，但未做 120Hz 硬件、移动真机、屏幕阅读器或实际声压验收。-36dBFS 是数字峰值，听感取决于设备音量。

## 设计与代码审查

实际应用了新安装的 **Design 1.2.0 / accessibility-review** 与 **Engineering 1.2.0 / code-review** 本地技能，并使用既有 impeccable 的有界收口。独立报告见 [16-sensory-review.md](16-sensory-review.md)。声音按钮已把可见 `SOUND [ ON/OFF ]` 放入无障碍名称；擦洗 range 的可访问值使用 TC。

唯一一次机械设计扫描把 src 位于 ref 箭头之后的真实 img 误判为缺图；24 项资源与 DOM naturalWidth 已核验，随后重排属性消除解析歧义，没有用占位图掩盖错误。材质和微型技术读数的文档建议已同步到 DESIGN 与 sidecar，未反复运行扫描。

## 精选实测截图

- [桌面首屏](previews/hero.jpg)
- [中央分镜擦洗与尺规](previews/film-scrub.jpg)
- [同源调色拆解窗](previews/color-study.jpg)
- [日文移动拆解窗](previews/color-study-ja-mobile.jpg)

逻辑视口为 1440×900 和 390×844，导出图像受滚动条及浏览器缩放影响。完整诊断 JSON 和原始截图位于本机 `output/sensory-2026-10-23/`，缓存目录不进版本库。

## 体验路径

打开 http://127.0.0.1:5173/ → 作品中央画幅横移看四处分镜与 TC → 拖动底部尺规或用 Home/End 选片 → 进入厂牌下方调色拆解窗，横移/拖动中线 → 可选主动开启右下角 SOUND，换片或切语言听微机械声，再关闭。打开任何播放器，环境声立即暂停。

实现核对参考：[MDN Canvas 图像平滑](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)、[AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)、[AudioContext.suspend](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend)。没有为这些交互加入新的动画运行时依赖。

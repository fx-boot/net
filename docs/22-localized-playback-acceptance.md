# 四语排印与动态放映交付 · 2026-10-23

## 本轮结果

四语字体角色按 `html[lang]` 隔离，正文、画册标题和界面元数据不再共享跨语言CJK回退栈。保留既有网格、导演/厂牌品牌层级、字典、静态指针感应外壳与Providers单一帧驱动。

| 界面 | 独白字体栈首选 | 桌面行高 / 字号 | 移动行高 / 字号 | 特性 |
| --- | --- | --- | --- | --- |
| 中文 | Songti SC / Source Han Serif CN / Noto Serif SC / STSong | 56.088 / 29.52px | 41.8 / 22px | 宋体正文、当地黑体标签 |
| English | Bodoni Moda / Didot / Playfair Display | 56.088 / 29.52px | 41.8 / 22px | Instrument Sans 元数据，.18em字距 |
| 한국어 | Noto Serif KR / KoPub Batang / Nanum Myeongjo / Batang | 54.612 / 29.52px | 40.7 / 22px | keep-all，1.85；本地真实韩文衬线字体 |
| 日本語 | Shippori Mincho / Yu Mincho / Hiragino Mincho ProN / Noto Serif JP | 60.516 / 29.52px | 45.1 / 22px | palt，2.05，.05em独白字距 |

以上来自浏览器computed style，完整数据见 `output/localized-cinema-2026-10-23/typography-metrics.json`。1440×900与390×844均未发现根元素横向溢出；韩语刷新后仍保持ko。中文与各地sans栈采用系统回退，字形随设备已装字体变化；韩文Noto Serif KR、日文Shippori Mincho与拉丁品牌字体已自托管。CSS隔离与截图检查不等同于逐字形的底层字体渲染引擎认证。

韩文字体为124个保留原Unicode范围的400字重分片，总计3,280,928字节；浏览器只取当前文本所需分片。源commit、OFL、每文件SHA及再现脚本见 [字体说明](21-localized-typography.md)。发布清单现登记198个资产。

## 同步完成的前项需求

- 中央画幅无需悬停即可静音循环；Hero与中央/归档预览使用同一个播放租约。实际浏览器采样同时播放预览峰值为1，退景侧片播放数为0。
- 离场片先同步暂停，以冻结帧完成350ms CSS淡出，380ms内释放source。两枚video节点短暂共存不代表两路同时播放。没有为此增加RAF驱动或引入新的动画包。
- 封面在新视频playing后淡去；箭头、键盘及触屏切片均验证起播。提供四语暂停/播放入口，系统减少动态时保留静态画册。手动重试创建新尝试，过期play Promise由generation隔离。
- Hero换为12秒的折射人物/逆光舞者/城市夜景剪辑；首部作品换为10秒折射影像。新2.39:1素材共约1.95MB，无音轨，来源与许可见 [MEDIA-LICENSES](../MEDIA-LICENSES.md)。旧授权母版保留，日光海礁已从Hero及首部作品的实际数据路径撤下。
- `ProjectEntry` 是四语UI的真实配置入口，生产作品保留false占位状态，追加主创技术字段可显示。详见 [品牌资产替换指南](18-project-asset-handoff.md)。工厂验证0–50条，并检查重复ID、局部对象别名、四语标题、合法媒体路径与时间轴。
- 弹窗打开时预览暂停，ESC关闭销毁完整播放器并归还原作品按钮焦点。保留原按钮可聚焦状态，阻止后台播放由全局租约承担。

## 验证

`npm run typecheck`、`npm run lint`、`npm run build`、`verify:assets`、`verify:sensory`、`verify:audio`、`verify:catalog`、`verify:preview`通过。最终构建JS429.48KB/gzip147.79KB，CSS162.56KB/gzip46.04KB；没有编译错误、lint警告或Vite大块警告。

实际浏览器：四语桌面/手机、ko持久化、轮播箭头/键盘/横滑、暂停恢复、详情互斥及焦点归还、分类、Archive6→12加载、键盘擦洗到TC00:00:18:09均验证。鼠标擦洗也单独观察到data-scrubbing=true与不同TC。10.156秒连续滚轮测试48个循环，影片ID保持不变；采样预览播放峰值1、侧片0。诊断累计窗口drivers=1、readAfterWrite=0、滚动RAF P95约16.8ms、最大17ms。后者是页面开发诊断的滚动窗口，**不是**GPU呈现帧率、独立10秒全链路trace或120Hz硬件认证。快速循环中的擦洗状态未被即时DOM采样捕获，因此不把该循环宣称为48次已确认的分镜切换。

独立源码评审见 [播放与无障碍评审](20-playback-review.md)。本轮没有改写受保护的Step1文档。

## 实际页面截图

桌面逻辑视口1440×900，手机390×844；应用截图导出存在设备缩放，文件像素尺寸可能略小于逻辑视口。

- [韩文桌面](../output/localized-cinema-2026-10-23/ko-desktop-about.jpg)
- [日文桌面](../output/localized-cinema-2026-10-23/ja-desktop-about.jpg)
- [英文桌面](../output/localized-cinema-2026-10-23/en-desktop-about.jpg)
- [中文桌面](../output/localized-cinema-2026-10-23/zh-desktop-about.jpg)
- [韩文手机](../output/localized-cinema-2026-10-23/ko-mobile-about.jpg)
- [日文手机](../output/localized-cinema-2026-10-23/ja-mobile-about.jpg)
- [英文手机](../output/localized-cinema-2026-10-23/en-mobile-about.jpg)
- [中文手机](../output/localized-cinema-2026-10-23/zh-mobile-about.jpg)

预览：[http://127.0.0.1:5173/](http://127.0.0.1:5173/)。体验顺序：右上四语→人物独白→作品中央自动放映→左右切片/暂停→键盘分镜→作品详情→ESC归还焦点。


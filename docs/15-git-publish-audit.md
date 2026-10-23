# Git 发布前只读审查

日期：2026-10-23。仓库：`mo-chen-director`。此次审查不修改既有文件、不暂存、不提交、不推送；本报告是唯一新增文件。

## 结论

**首次审查发现的 7 处疑似客户端访问令牌字段已从发布集合排除，当前集合复核通过。** 发布负责人在 `.gitignore` 增加精确规则 `upstream/media/*-source.html`：原始网页快照保留在本地，不修改、不删除、不发布。复核只扫描 Git 候选集合，没有再次读取这些被忽略的快照明文。以下保留最初发现的位置记录，不包含字段值。

| 路径 | 行号 | 发现 |
| --- | ---: | --- |
| `upstream/media/between-source.html` | 50 | `accessToken` 字段 |
| `upstream/media/heat-source.html` | 50 | `accessToken` 字段 |
| `upstream/media/night-source.html` | 50 | `accessToken` 字段 |
| `upstream/media/portrait-source.html` | 50 | `accessToken` 字段 |
| `upstream/media/refraction-source.html` | 50 | `accessToken` 字段 |
| `upstream/media/tide-source.html` | 50 | `accessToken` 字段 |
| `upstream/media/wild-source.html` | 50 | `accessToken` 字段 |

`git check-ignore` 已逐一验证这 7 个路径均被忽略；`git ls-files --cached --others --exclude-standard` 中对应快照数量为 **0**。来源 URL、许可、SHA 清单继续发布，**所有 `public/` 下已获许可的字体、影片、海报、剧照与占位资源完整保留。** 本审查没有修改上述文件。

## 文件与体积快照

以 `git ls-files --cached --others --exclude-standard` 的唯一文件集合为准；下列数值是忽略规则修正后的复核快照，包含已跟踪文件及未忽略的新文件，并非仅本次差异。文件总数包含本报告；体积随本文编辑存在数 KB 的微小变化，发布负责人最后暂存时可再统计。

| 范围 | 文件数 | 总字节 |
| --- | ---: | ---: |
| 全部发布候选 | 240 | 约 88.30 MiB |
| `public/` | 65 | 77,409,238 |
| `upstream/` | 29 | 14,474,520 |
| 大于 50 MiB 的单文件 | 0 | — |
| 大于 100 MiB 的单文件 | 0 | — |

最大单文件为 `public/media/video/wild-full.mp4`，约 26.533 MiB。首次扫描未发现符号链接或其他非普通文件。并行工作在复核后新增的文件不包含在上述快照内。

## 忽略规则与敏感信息检查

- 候选集合中的 `.tools/`、`node_modules/`、`dist/`、`output/`：均为 0。
- 候选集合中的 `.env` / `.env.*`、私钥扩展名及常见 SSH 私钥文件名：均为 0。
- `git check-ignore` 已验证依赖、工具链、构建产物、本地截图/测试输出、`.env`、`.env.local` 与私钥示例路径受现有规则保护。
- 初审扫描 179 个文本文件，命中上表 7 个赋值字段；排除快照后复核扫描 173 个候选文本文件，私钥头、常见服务令牌格式、URL 内嵌凭证、Bearer 令牌及敏感字段赋值均为 **0 命中**。启发式扫描不能证明不存在所有形式的秘密。
- **`output/` 中截图、音频契约测试和浏览器性能记录属于本地 QA 证据，不进库。** 文档里的本地截图路径只对工作区有效；这次审查没有为了可浏览而把 QA 目录重新纳入发布。
- 本仓库使用仓库级 `http.sslBackend=openssl` 解决系统 Schannel 的兼容问题；未发现本仓显式关闭 `http.sslVerify` 的配置。

## 提交历史说明

可以按工程配置、应用代码、获许可资源、文档等内容分组组织 **logical commits（逻辑提交）**。这些提交只表达此次初始化发布的内容边界，**不伪造过去版本的开发时间、作者、提交轨迹或历史版本演进**。远程推送及认证由发布负责人执行，本审查不代替推送确认。

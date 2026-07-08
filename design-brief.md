# Design Brief — signblueblau.github.io（设计宪法）

本文件是 design loop 的最高依据。生成器（design-task）按它干活，评判器（design-review）按它逐条打分。
条款编号 C1–C30，评判器打回时必须引用条款号。修改本文件需要人（站主）批准。

## 0. 定位

安静的杂志风（quiet editorial magazine）。基调保留 quietpages 的「读起来舒服、不伤眼」，
但成品必须看起来**比原版模版更高级**——像一本精心排版的印刷杂志，而不是一个网页模版。
参考气质：Monocle / Kinfolk 式的印刷编辑感；ghuntley.com 的启发点是「全站统一的视觉签名」。

## 1. 配色（Color）

- **C1** 双模式：light + dark，跟随系统 `prefers-color-scheme`，同时保留手动切换（模版已有该机制，不许退化）。
- **C2** Light 模式为「纸感」：背景是可感知的暖纸色（非纯白），oklch L ∈ [0.955, 0.975]，hue ∈ [75, 95]，chroma ≥ 0.006。必须与原版 `oklch(0.985 0.004 90)` 可感知地不同（更暖、更纸）。
- **C3** Dark 模式为「夜读纸」：暖炭色而非蓝黑，背景 L ∈ [0.13, 0.17]，hue ∈ [55, 90]。
- **C4** 主强调色（--primary）**必须离开原版的锈橙色系**：hue 禁区 [15, 65]。指定新色系：深松绿→墨青（hue ∈ [150, 210]），light 模式下 L ∈ [0.40, 0.50]，chroma ∈ [0.06, 0.11]——克制的「一滴墨水」，不是荧光色。dark 模式相应提亮至 L ∈ [0.72, 0.82]。
- **C5** 全站有效强调色只允许一个色相家族（primary 及其衍生）。destructive 红除外（仅表单错误用）。
- **C6** 对比度硬门禁：`node scripts/check-contrast.mjs` 必须 PASS（正文 ≥7:1，辅助文字/链接/按钮 ≥4.5:1，light 和 dark 各自过）。此项不可协商、不可跳过。
- **C7** 所有颜色只能通过 `src/styles.css` 的 CSS custom properties 定义；组件内禁止硬编码颜色值（现存的 header 白色 overlay 属遗留，改动它时一并收编为变量）。

## 2. 字体与排版（Typography）

- **C8** 字体家族保持自托管三件套：Fraunces（衬线，标题/引文）、Inter（正文/UI）、JetBrains Mono（代码）。禁止引入 CDN 字体或新字体文件。
- **C9** 展示级标题（首页 lead、文章 h1）使用 Fraunces，开启 `font-optical-sizing: auto`，大字号下用较轻字重（≤600），字距微收（letter-spacing ≤ 0）。要有「杂志标题」的分量感。
- **C10** 分类标签、日期、作者等元信息统一为「小号大写 + 加宽字距」的杂志标签体：uppercase，font-size ≤ 0.75rem，letter-spacing ≥ 0.08em。全站样式一致。
- **C11** 正文阅读列宽保持 ≤ 70ch，行高 ≥ 1.7（模版已达标，不许退化）。
- **C12** 层级靠字号/字重/间距表达，不靠颜色堆砌。

## 3. 版式语言（Layout idiom）——与原版差异化的核心

- **C13** 分隔哲学：用 **hairline 细线（1px border）和留白** 替代卡片阴影。全站禁止使用 box-shadow 作为卡片分隔（focus ring、必要的浮层除外）。
- **C14** 首页 lead story 必须与原版「全出血大图压字」布局可见地不同：改为**编辑部封面式**——图与文各有领地（如上图下文/左文右图的框式构图），配 folio 线（如「Issue · 日期」的眉线）。
- **C15** 首页文章网格要有**编辑层级**：featured 一篇明显更大，其余不等权；去掉网格里冗余的元信息（每张卡都写 read time / 都放头像属于冗余，保留一处即可）。
- **C16** 文章正文起首段落使用 drop cap（首字下沉，Fraunces）；文章结尾有 end mark 收束符（§ 或 ◆，用 primary 色）。
- **C17** 页脚做成 masthead / colophon 风格：站点名、一句话定位、字体署名（"Set in Fraunces & Inter"）、导航列，用 hairline 分区。
- **C18** Newsletter 区带重新设计，与新版式语言一致（hairline 框、杂志标签体标题），不许是默认的彩色大色块。
- **C19** 圆角克制：全站 --radius ≤ 0.375rem（印刷物没有大圆角）。图片圆角 ≤ 4px 或直角。

## 4. 图像（Imagery）

- **C20** 全站图片必须有统一的编辑级调性：暖调、轻微降饱和（可用 CSS filter 统一实现，如 `saturate(0.9) sepia(0.06)` 量级），不允许风格混杂的原始 stock 感。
- **C21** 头像体系统一（现有 SVG 头像可保留但风格须一致）；后续换成站主真实信息时同样遵守。
- **C22** OG/分享图与站点视觉一致（M3 前完成）。

## 5. 站点身份（Identity，M3 前完成）

- **C23** SITE 配置更新为站主身份：站名、描述、URL `https://signblueblau.github.io`；移除指向 andreialba/quietpages 的 repositoryUrl 与社交占位链接（LICENSE 中的版权归属保留，MIT 要求）。
- **C24** favicon 与站点视觉一致。

## 6. 不许动（Forbidden）

- **C25** 不许破坏可访问性既有资产：skip link、focus-visible 样式、reduced-motion 处理、语义地标、标题层级。
- **C26** 不许删除或破坏：RSS、sitemap、robots.txt、canonical、Open Graph、JSON-LD。
- **C27** 不许新增运行时 JS 依赖或 client-side 框架；遵守仓库 AGENTS.md 的 Astro 原则（静态优先、最小 JS）。
- **C28** 不许动内容集合 schema（`src/content.config.js`）除非任务明确要求。
- **C29** 每次改动只做任务要求的事，不做顺手重构（与站主全局规则一致）。

## 7. 完成的定义（评判器的最终检查表）

- **C30** 一个任务算「通过」当且仅当：
  1. `npm run build` 成功；
  2. `node scripts/check-contrast.mjs` PASS（若任务涉及颜色）;
  3. 评判器亲眼看过截图（light+dark × 桌面+移动，四张起）且逐条核对本 brief 相关条款；
  4. diff 未触碰第 6 节禁区；
  5. 与原版 quietpages 的差异化条款（C4/C13/C14/C15/C16/C17/C18）在其涉及的页面上可见。

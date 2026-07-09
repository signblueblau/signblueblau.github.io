# Design Brief — signblueblau.github.io（设计宪法）

本文件是 design loop 的最高依据。生成器（design-task）按它干活，评判器（design-review）按它逐条打分。
条款编号 C1–C30，评判器打回时必须引用条款号。修改本文件需要人（站主）批准。

## 0. 定位

大胆的暗色系编辑杂志（bold dark-toned editorial magazine）。基调仍是「读起来舒服、不伤眼」，
但整体气质大胆、有戏剧感——像一本高端夜读杂志，而不是一个网页模版。
配色采用 **Scheme B：午夜靛蓝底 + 暖金强调**（站主 2026-07-09 定稿，从三个候选方案中选定）。
参考气质：Monocle / Kinfolk 式的印刷编辑感；ghuntley.com 的启发点是「全站统一的视觉签名」。

## 1. 配色（Color）——Scheme B：午夜靛蓝 + 暖金

- **C1** **单一色系，不设深色模式**。站主明确要求只要一种色系（Scheme B 本身即暗色调）。因此：**移除 `prefers-color-scheme` 跟随机制、移除 `.dark` 变体 token、移除 header 的主题切换按钮（☀/🌙）及其相关 JS 与 localStorage 逻辑**。全站只有一套配色。
- **C2** 背景为「黄昏靛蓝」（站主 2026-07-09 二次定稿，从午夜蓝 L 0.28 调浅至 L1 档；曾短暂考虑 L2 0.36 后改定 L1）：`--background` oklch(0.32 0.05 265)，L ∈ [0.30, 0.34]、hue ∈ [255, 275]、chroma ∈ [0.04, 0.06]。卡片/表面同色相、L 略高（约 +0.03~0.08 阶梯）。必须与原版近白背景可见地不同。
- **C3** 前景与辅助文字为暖白系（配黄昏靛蓝底）：`--foreground` oklch(0.95 0.01 85)（暖白）；`--muted-foreground` oklch(0.76 0.03 250) 量级（靛蓝调灰，须过 C6）。`--border` 为靛蓝调分隔线 oklch(0.44 0.05 265) 量级。
- **C4** 主强调色（--primary）为「暖金/琥珀」：oklch(0.80 0.12 75)，L ∈ [0.76, 0.84]、hue ∈ [70, 90]、chroma ∈ [0.11, 0.14]。**必须离开原版锈橙**（原版 hue≈30）——金的 hue 70–90 与锈橙可辨别。链接、分类眉线、强调元素用它；主按钮可用金底配深靛字，或暖白/靛字。primary-foreground（金底上的字）用深靛，须过 4.5:1。
- **C5** 全站有效强调色只允许一个色相家族（暖金 primary 及其衍生）。destructive 红除外（仅表单错误用）。
- **C6** 对比度硬门禁：`node scripts/check-contrast.mjs` 必须 PASS（正文 ≥7:1，辅助文字/链接/按钮 ≥4.5:1）。单色系，只需过这一套。此项不可协商、不可跳过。
- **C7** 所有颜色只能通过 `src/styles.css` 的 CSS custom properties 定义；组件内禁止硬编码颜色值（hero 白字压图的白色属图上叠字的合理用法，可保留但尽量走变量）。

## 2. 字体与排版（Typography）

- **C8** 字体家族保持自托管三件套：Fraunces（衬线，标题/引文）、Inter（正文/UI）、JetBrains Mono（代码）。禁止引入 CDN 字体或新字体文件。
- **C9** 展示级标题（首页 lead、文章 h1）使用 Fraunces，开启 `font-optical-sizing: auto`，大字号下用较轻字重（≤600），字距微收（letter-spacing ≤ 0）。要有「杂志标题」的分量感。
- **C10** 分类标签、日期、作者等元信息统一为「小号大写 + 加宽字距」的杂志标签体：uppercase，font-size ≤ 0.75rem，letter-spacing ≥ 0.08em。全站样式一致。
- **C11** 正文阅读列宽保持 ≤ 70ch，行高 ≥ 1.7（模版已达标，不许退化）。
- **C12** 层级靠字号/字重/间距表达，不靠颜色堆砌。

## 3. 版式语言（Layout idiom）——与原版差异化的核心

- **C13** 分隔哲学：用 **hairline 细线（1px border）和留白** 替代卡片阴影。全站禁止使用 box-shadow 作为卡片分隔（focus ring、必要的浮层除外）。
- **C14** 首页 hero 采用**全出血大图 + 白字压图**的构图（站主 2026-07-09 定稿：此处沿用原版处理方式，比封面式更好；但图片必须换掉，不用原版秋景）。指定用 `src/assets/hero-clouds.jpg`（2000×1250 云天航拍，顶部深蓝天空，天然适合压白字）。要点：图片按全出血比例适配布局（桌面横向全宽、移动端合理裁切，不变形不留白边）；标题/副标题/CTA 白字叠在图上，配足够的暗化渐变保证 WCAG 可读；保留 folio 眉线（「Issue · 日期」）作为杂志签名。**此条已从"封面式"回退为"全出血压图"——之前的两栏框式构图作废。**
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

- **C23** SITE 配置更新为站主身份（站主 2026-07-09 提供）：站名 **「肉骨明的自留地」**；描述 **「一个可以自言自语、无关痛痒的自留地」**；URL `https://signblueblau.github.io`。SOCIAL_LINKS 只保留 GitHub `https://github.com/signblueblau` + 邮箱 `blueblau@163.com` + RSS；移除 X/Twitter 占位与指向 andreialba/quietpages 的 repositoryUrl（LICENSE 中的 MIT 版权归属保留，协议要求）。
- **C23b** 内容与作者去占位：删除 8 篇 demo 文章，留 **1 篇极简「欢迎」占位帖**（用站内真实分类之一、复用站内已有图片，保证 featuredPost()/RSS/分类页/sitemap 不因空集合崩溃）；作者体系从 3 个 demo 假作者收敛为 **1 个「肉骨明」**（bio 用无关痛痒的一句占位，头像沿用站内 SVG 首字母样式）。站主之后自行改写。**清空到 0 篇会使 build 崩溃，故保留 1 篇占位（站主已同意「你自己保证页面不崩」）。**
- **C24** favicon 与站点视觉一致（暖金/靛蓝调）。

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
  3. 评判器亲眼看过截图（单色系 × 桌面+移动，至少桌面+375px 两张；涉及交互态再加）且逐条核对本 brief 相关条款；
  4. diff 未触碰第 6 节禁区；
  5. 与原版 quietpages 的差异化条款（C2/C4/C13/C14/C15/C16/C17/C18）在其涉及的页面上可见——尤其 C2 午夜靛蓝底 + C4 暖金强调，一眼可辨与原版不同。

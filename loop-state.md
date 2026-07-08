# Loop State — signblueblau.github.io design loop

> Loop 的持久记忆。每圈开始先读这里，每圈结束写回这里。
> 状态机：`todo → review → done | rejected(→review) | inbox(等人工)`。
> 同一任务被打回 2 次后第 3 次仍 FAIL → inbox，停止重试。

## 运行规则（调度参数）

- 每圈：生成器（/design-task）做一个任务 → 评判器（/design-review）裁决一个任务。
- 每圈 agent 上限：生成器 1 + 评判器 1。禁止并行多任务（本项目改动面全局耦合，串行更稳）。
- 人工复核点（Milestone）：到达后 loop 必须停下等站主亲眼确认，不许自动越过。
- 评判器 PASS 后 commit；**永不 push**（站主全局规则：push 前须人工审查+明确批准）。

## Milestones（人工复核点）

- [x] **M1 设计基座定稿**：T1–T3 全部 done。站主 2026-07-08 验收通过（墨青/松绿色系 + 安静印刷基座 OK），放行 T4。
- [ ] **M2 首页改版定稿**：T4–T6 全部 done 后停。站主亲眼看新首页。
- [ ] **M3 上线前检查**：全部任务 done 后停。站主过一遍全站 + 批准建 repo/push/开 Pages。

## Backlog（按序执行，禁止跳序）

### T1 配色系统重造 [status: done]
- 条款：C1–C7
- 范围：仅 `src/styles.css` 的 :root 与 .dark 色板（含收编 header 遗留硬编码白色 overlay 为变量，C7）
- 内容：暖纸底（C2）、夜读暖炭底（C3）、主色迁到松绿→墨青域（C4）、单一强调色相（C5）、过对比度门禁（C6）
- status: done
- attempt: 1
- changed_files: src/styles.css
- summary: 重写 :root 与 .dark 色板：light 背景改为暖纸色 oklch(0.965 0.009 85)（C2，与原版 0.985/0.004/90 可感知不同）；dark 背景改为暖炭 oklch(0.15 0.009 75)（C3）；--primary 从锈橙 hue 30/35 迁到墨青 hue 185（light oklch(0.44 0.08 185)）/ hue 180（dark oklch(0.76 0.08 180)），--ring 同步（C4/C5，destructive 红保留仅表单错误用）。header 遗留的三处 rgb(255 255 255 …) overlay 硬编码收编为 :root 变量 --header-overlay-foreground / --header-overlay-muted-foreground / --header-overlay-hover，@layer components 中改为引用变量，视觉行为不变（C7）。手动/系统双模式切换机制未触碰（C1）。
- self_check: build PASS / contrast PASS（light+dark 全部 14 对达标，正文 16.0:1，light primary 6.70:1，dark primary 9.50:1）
- verdict: PASS
- evidence: 评判器亲自复跑：`npm run build` exit 0（29 页）；`node scripts/check-contrast.mjs` exit 0 全 14 对 PASS（light 正文 16.02:1 / primary 6.70:1，dark 正文 16.01:1 / primary 9.50:1）。git diff 仅 src/styles.css + loop-state.md，逐值核对：C2 light bg oklch(0.965 0.009 85)（L∈[0.955,0.975]、hue∈[75,95]、C≥0.006 全中）；C3 dark bg oklch(0.15 0.009 75)（L∈[0.13,0.17]、hue∈[55,90] 中）；C4 primary light oklch(0.44 0.08 185) / dark oklch(0.76 0.08 180)（hue∈[150,210]、避开禁区 [15,65]、L/C 全在范围）；C5 --ring 同步 primary、其余 token 均低 chroma 暖中性（≤0.02）、仅 destructive 留红；C7 grep 确认 styles.css 无 rgb() 残留、组件目录无硬编码色。C25–C28 未触碰（skip-link/focus-visible/reduced-motion 原样，无新依赖、无 schema 改动）。浏览器实拍 10 张（.loop/screenshots/T1/：home-desktop-light/-content、home-desktop-dark/-content、home-mobile-light/-content、home-mobile-dark/-content、article-desktop-light/-top、article-desktop-dark/-top）：light 暖纸底非纯白、dark 暖炭非蓝黑、链接/分类标签/阅读进度条均为墨青（无锈橙残留）、hero 首屏 header 链接在图上仍可读、双端无布局塌坏；实测 computed bg 与色板一致，手动切换按钮点击两次验证 dark class 正常增删（C1）。核对条款：C1–C7 全过。

### T2 排版精修 [status: done]
- 条款：C8–C12、C19
- 范围：styles.css + 涉及标题/元信息的组件
- 内容：展示级 Fraunces 标题（C9）、杂志标签体统一（C10）、圆角收紧到 ≤0.375rem（C19）
- status: done
- attempt: 1
- changed_files: src/styles.css, src/pages/index.astro, src/pages/blog/[slug].astro, src/pages/blog/index.astro, src/pages/about.astro, src/pages/contact.astro, src/pages/authors/[slug].astro, src/pages/categories/[slug].astro, src/pages/tags/[slug].astro, src/components/PostCard.astro, src/components/Sidebar.astro, src/components/Footer.astro, src/components/Newsletter.astro, src/components/TableOfContents.astro
- summary: C9：首页 lead h1 与文章 h1 保持 Fraunces（font-serif utility 自带 font-optical-sizing:auto），字重收到 medium(500)、字距 -0.02em，杂志标题分量感。C10：styles.css 新增单一 @utility meta-label（0.7rem / uppercase / 0.1em 字距 / 500 字重），全站约 35 处元信息（分类标签、日期、作者行、read time、Featured/Latest/Tags/Share/Written by/Newsletter 等 section 标签、tag/分类 pill、表单 label 眉线）统一替换原先三种 ad-hoc 写法（tracking-wider / tracking-[0.2em] / 无字距），层级仍靠字号字重表达未加色（C12）。C19：--radius 0.5rem→0.375rem，prose-article img 8px→4px，pre/callout 圆角 8px→var(--radius)。C8/C11 未触碰（无新字体；68ch/1.75 保持）。仅动排版，未改卡片布局/首页结构/元数据项（C29，冗余留给 T3/T5）。
- self_check: build PASS（29 页）/ contrast PASS（未动颜色 token，仍复跑确认 14 对全过）
- verdict: PASS
- evidence: 评判器亲自复跑：`npm run build` exit 0（29 页）；`node scripts/check-contrast.mjs` exit 0（14 对全过，颜色未动仍复验）。git diff 逐文件读：范围恰为声称的 14 个 src 文件 + loop-state.md，无越界；仅 class 与标签样式改动，无卡片布局/首页结构性 HTML 重排（C29）。C8：三个 @font-face 块原样、无新字体引入（grep 确认）。C9：index.astro lead h1 与 blog/[slug].astro 文章 h1 均 font-serif + font-medium(500) + tracking-[-0.02em]；实测 computed：lead h1 Fraunces / weight 500 / letter-spacing -1.44px / font-optical-sizing auto，文章 h1 Fraunces / 500 / -0.96px / auto（≤600、≤0 全达标）。C10：styles.css 单一 @utility meta-label（0.7rem/500/0.1em/uppercase）；grep 确认全站 tracking-wider、tracking-[0.2em] 与组件内 uppercase ad-hoc 写法零残留；抽查 PostCard/Sidebar/Footer/Newsletter/TableOfContents/contact/blog-index 等 ≥7 个文件均引用 meta-label；实测 computed（Featured 标签、Latest h2、category 标签、filter pill、文章 eyebrow、tag pill）：uppercase / 11.2px（≤12px）/ letter-spacing 1.12px = 0.1×font-size（≥0.08em）全过。C11：实测 prose-article max-width 729px≈68ch、line-height/font-size = 1.75（≥1.7）。C19：--radius computed 0.375rem；prose img computed border-radius 4px（注入测试 img 实测）；styles.css 无 >6px 圆角残留、组件无 rounded-lg+。C25–C28：skip-link/focus-visible/reduced-motion 样式原样在（grep 行号核对），Latest/Continue reading 重样式后仍为 h2 元素（DOM 实测 h2 列表含之），无 RSS/sitemap/SEO 改动、无新依赖、无 schema 改动。截图 8 张（.loop/screenshots/T2/：home-desktop-light-hero/-content、home-desktop-dark-hero/-content、home-mobile-light、home-mobile-dark、article-desktop-light-top/-code、article-desktop-dark-top/-code）：lead 标题呈衬线杂志标题感、Featured/Latest/eyebrow/byline/Tags/Share 标签体全站一致、code block 双模式可读、375px 无水平溢出（scrollWidth==clientWidth 实测）、双模式无布局塌坏。核对条款：C8–C12、C19 全过。

### T3 卡片与分隔语言 [status: done]
- 条款：C13、C15 的卡片部分
- 范围：PostCard.astro、相关列表页
- 内容：去阴影改 hairline+留白（C13）、清理卡片冗余元信息（C15 后半）
- status: done
- attempt: 1
- changed_files: src/components/PostCard.astro, src/styles.css
- summary: C13：全站 grep 后仅存两处装饰性 box-shadow（prose-article pre 代码块的 inset 高光，light+dark 各一），已删除——代码块本就有 1px border 分隔，去掉后更贴印刷调性；同时给 default 变体卡片加 hairline 上边线（border-t border-border + pt-5），使首页 Latest / 文章页 Continue reading 网格卡片呈杂志索引式细线分隔。保留的两处非卡片阴影：styles.css [data-home-header] 的 box-shadow:none（本身是去阴影声明）、index.astro hero 文字 drop-shadow（首屏图上文字可读性用，且 hero 属 T4 禁区不可动）。C15 卡片部分：default 网格卡去掉底部「作者 · X min」行，只留 category · date；compact（Sidebar）去掉「· X min」只留 date；list（archive/分类/tag/作者页）去掉 read time、保留作者名链接；头像与 read time 现全站仅存于首页 featured 卡（index.astro，未动）。未改网格列结构/featured 尺寸（留给 T5）、未动 hero（T4）、Newsletter/Footer（T6）；卡片链接 focus-visible 走全局 outline 规则未触碰（C25）。
- self_check: build PASS（29 页）/ contrast PASS（未动颜色 token，仍复跑确认 14 对全过）
- verdict: PASS
- evidence: 评判器亲自复跑：`npm run build` exit 0（29 页）。git diff 逐文件读：范围恰为声称的 3 个文件（PostCard.astro + styles.css + loop-state.md），无越界——未碰 hero/网格列结构/Newsletter/Footer（C29，属 T4/T5/T6）。C13：全 src grep box-shadow 仅剩 styles.css:181 `box-shadow: none`（去阴影声明，豁免）+ index.astro:57 hero 文字 drop-shadow（豁免）；两处 pre 代码块 inset 高光已删；文章页代码块实测 computed box-shadow=none、border-top-width=1px、border-color=oklch(0.88 0.008 80)，仍可读。default 卡片改 border-t border-border + pt-5 细线分隔。C15：实拍+DOM 核对——default 网格卡仅 category·date（无 read-time/头像）、compact 仅 category·date、list 卡有 category·date+作者名链接但无 read-time；首页 featured 卡仍保留头像+「ELELA MARCH · 2 MIN READ」（index.astro 未动）。author-link 条件：list 变体 `{author && (…)}` 包裹整块，author 缺失时不渲染空壳，markup 合法。数据属性全保留：三变体均含 data-post-card/data-category/data-tags/data-search/hidden。关键功能实测：首页点 ESSAYS filter → 可见卡 6→1、仅 essays、0 泄漏；archive 搜 "quiet" → 1 result「The quiet craft…」、data-search 全含词、count 文案正确。C25：键盘 Tab 聚焦卡片标题链接实测 computed outline=2px solid oklch(0.44 0.08 185) offset=3px，截图见清晰焦点框。C26–C28 未触碰（无 RSS/sitemap/SEO 改动、package.json 与 content.config 未动、无新依赖）。截图 13 张（.loop/screenshots/T3/：home-desktop-light-full/-latest、home-desktop-light-filtered-essays、home-desktop-dark-latest、blog-archive-light/-light2、blog-archive-search-quiet、article-continue-reading-light3、article-code-block-light、focus-visible-card-link/-title 等）：light+dark 双模式 Latest 网格呈细线编辑块、无浮动阴影盒、无冗余 read-time/头像；featured 卡保留头像+read-time；archive list 细线分隔+作者链接+无 read-time；Continue reading 卡细线一致；代码块去 inset 高光留边框仍可读；焦点框清晰可见。核对条款：C13、C15 卡片部分全过。

### T4 首页 lead story 改版 [status: review]
- 条款：C14、C10
- 范围：index.astro 首屏 + Header 首页态
- 内容：全出血压字 → 编辑部封面式构图，加 folio 眉线（C14）
- status: done
- attempt: 1
- changed_files: src/pages/index.astro, src/components/Header.astro, src/styles.css
- summary: C14：首屏从「全出血大图压白字 + 三层暗化渐变」改为编辑部封面式左右分栏——左栏文字领地（primary 短横 + Fraunces h1 + 摘要 + 两个链接），右栏 figure 框式封面图（autumn-scene 复用，aspect 4/3 移动 / 4/5 桌面，1px border + rounded-md 直角克制，quality 58），图文各占领地不再叠压；顶部加 folio 眉线（站名 · 「Issue · 日期」，meta-label 体 + border-b hairline），底部 figcaption「On the cover」同为 meta-label，强化期刊框架。C10：新增的 folio、figcaption 全部走既有 meta-label utility（uppercase/0.7rem/0.1em），未造新标签样式。连带收编：去掉全出血图后，header 首页态的白字 overlay 已无照片可依托，故把 Header 的 isHome 分支（transparent/text-white、home-header-link/-brand/-action、data-home-header/data-scrolled/data-panel-open）全部退化为常规态（header 始终 bg-background/80 + backdrop-blur，链接读在页面背景上），并删除 styles.css 里对应的 [data-home-header] 组件块与 3 个 --header-overlay-* 变量、Header.astro 里孤立的 setPanelOpen/setHeaderScrolled/scroll listener（仅清理自身改动产生的 orphan）。C13 精神：新构图用 hairline + 留白，无 box-shadow。C25/C26：单一 h1 保留、lead essay 链接可达、skip-link/#main-content/landmarks 未动。C29：只碰 hero/lead 区 + header 首页态，未碰 Featured/Latest 网格/Newsletter/Footer，未动色板 token 与字体。
- self_check: build PASS（29 页）/ contrast PASS（未改 required 色对；虽删了 3 个 --header-overlay-* 变量但均非门禁对，复跑 light+dark 14 项全过，正文 16.0:1 / primary light 6.70:1 dark 9.50:1）
- verdict: PASS
- evidence: 评判器亲自复跑：`npm run build` exit 0（29 页）；`node scripts/check-contrast.mjs` exit 0（14 对全过，删 3 个 --header-overlay-* 变量后无门禁回归——它们本非门禁对，light 正文 16.02:1/primary 6.70:1，dark 正文 16.01:1/primary 9.50:1）。GATE2 git diff 逐文件读：范围恰为声称 4 文件（index.astro/Header.astro/styles.css + loop-state.md），无越界——Featured/Latest 网格 markup、Newsletter、Footer 未动（C29）；styles.css 移除的 custom-prop 定义精确仅 3 个 --header-overlay-*（grep 确认无其它 palette/font/radius/oklch token 行被删），无新增 token；hero 新构图只用 token 类（bg-primary/border-border/text-muted-foreground/text-foreground），无硬编码色（C7）；无 package.json / content.config 改动（C27/C28）。orphan 专项：grep 全 src/ 对 data-home-header / header-overlay / setPanelOpen / setHeaderScrolled / home-header-link/-brand/-action / data-scrolled / data-panel-open 全部 0 命中——[data-home-header] CSS 块、3 个 overlay 变量、孤立 scroll/panel JS 整体清除无悬挂引用；Header.astro 交互 handler（search/menu/Escape/theme）实读仍在。C25/C26：单一 h1（DOM 实测 h1count=1）、lead-essay 链接可达、skip-link+#main-content+<main> landmark 原样、figure 封面图 alt="" 装饰（实测）。GATE3 亲眼看（11 张实拍 .loop/screenshots/T4/）：桌面 1280px light（bg oklch(0.965 0.009 85)）+dark（oklch(0.15 0.009 75)）hero 均为左文右图两分领地，headline 在页面背景上、绝不压在照片上；folio 眉线呈 masthead 眉标（uppercase/11.2px/letter-spacing 0.100em，figcaption 同值，≥0.08em C10 达标）；primary 短横 computed oklch(0.44 0.08 185)=--primary（墨青，hue 185，无锈橙残留，避开禁区 [15,65]）。差异化专项（brief §7/C14）：对照 preview.webp——原版是全出血自然照片 + 白色 headline 叠压其上（text-over-photo）；新版是编辑部封面式左右分栏，照片入 1px border+rounded-md 的 figure 框各占右半领地、文字在左半纸底领地、顶部 folio 眉线 + hairline、底部「ON THE COVER」figcaption——结构上不再是「大图压字」，可辨认地不同。Header：首页 header computed bg oklab(0.965.../0.8)（半透纸底+blur），滚动 700px 前后 bg 不变（无 background-swap 破坏），滚动态实拍链接在纸底上清晰可读、非透明白字压图。交互实测：search 点击 open（aria-expanded=true、panel 显）→Escape 关（hidden=true）；theme 点击 light→dark 翻转并写 localStorage=dark；mobile 375px 菜单点击 open（aria-expanded=true）→Escape 关。移动 375px light+dark：折叠为 folio→文字→框式封面（ON THE COVER）纵向堆叠，无文字压图，scrollWidth==clientWidth==360 无水平溢出。回归：Latest 网格仍渲染，ESSAYS filter 实测可见卡 6→1、仅 essays 类、无泄漏。核对条款：C14、C10 全过；C25/C26/C27/C28/C29 禁区未触碰。

### T5 首页编辑层级网格 [status: todo]
- 条款：C15
- 范围：index.astro 文章区
- 内容：featured 加大、其余不等权

### T6 Newsletter 与页脚 masthead [status: todo]
- 条款：C17、C18
- 范围：Newsletter.astro、Footer.astro

### T7 文章页编辑细节 [status: todo]
- 条款：C16、C11
- 范围：blog/[slug].astro、prose-article 样式
- 内容：drop cap + end mark（C16）

### T8 图像统一调性 [status: todo]
- 条款：C20、C21
- 范围：图片展示相关样式/组件（统一 CSS filter 方案）

### T9 站点身份替换 [status: todo]
- 条款：C22–C24
- 范围：theme.config.ts、favicon、OG 默认图
- 备注：站名/描述/社交链接的最终文案需站主提供 → 缺料时进 inbox 问人，别编造

## Review 区（生成器提交后填）

- （空）

## Inbox（等人工）

- 建 GitHub repo `signblueblau/signblueblau.github.io` + push + 开 Pages：**卡在账号**——本机 gh 登录的是 `terrificdm`，不是 `signblueblau`。M3 时需要站主切账号或提供权限。
- T9 需要站主提供：站名、一句话描述、社交链接、是否保留 demo 文章。

## 圈次日志（每圈一行：日期 / 任务 / 裁决 / 一句话）

- 2026-07-08 / T1 配色系统重造 / PASS / build+contrast 门禁全过，C2–C4 数值逐项在界、C7 无硬编码残留，10 张实拍确认暖纸底/暖炭底/墨青主色且无视觉回归。
- 2026-07-08 / T2 排版精修 / PASS / build 门禁过，diff 无越界无禁区触碰，computed style 实测 C9 标题（Fraunces/500/负字距）与 C10 标签体（uppercase/11.2px/0.1em）逐项达标，C11/C19 数值在界，8 张实拍双模式双端无回归。
- 2026-07-08 / T3 卡片与分隔语言 / PASS / build exit 0，diff 仅 3 文件无越界，src grep 仅剩豁免 box-shadow（none 声明+hero drop-shadow），代码块 computed box-shadow=none 留 1px 边框；default/compact/list 卡冗余元信息按变体裁净、featured 卡保留头像+read-time；ESSAYS filter 与 archive "quiet" 搜索实测正常（数据属性全存）、卡片链接 focus-visible 2px 焦点框清晰；13 张实拍双模式无回归。
- 2026-07-08 / T4 首页 lead story 改版 / PASS / build+contrast 门禁全过（删 3 个 --header-overlay-* 非门禁变量无回归），diff 仅 4 文件无越界、orphan grep（data-home-header/header-overlay/setPanelOpen/setHeaderScrolled 等）全 0 命中，hero 由全出血压字改编辑部左文右图两领地（folio 眉线 uppercase/0.100em + 框式封面 figcaption + primary 墨青 oklch(0.44 0.08 185) 无锈橙），对照 preview.webp 结构可辨认不同；header 改半透纸底+blur 滚动无 background-swap 破坏，search/menu/Escape/theme 交互实测全存，Latest filter 6→1 回归正常，375px 无溢出；11 张实拍双模式双端确认。

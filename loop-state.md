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

- [ ] **M1 设计基座定稿**：T1–T3 全部 done 后停。站主亲眼看配色/字体/标签体系截图。
- [ ] **M2 首页改版定稿**：T4–T6 全部 done 后停。站主亲眼看新首页。
- [ ] **M3 上线前检查**：全部任务 done 后停。站主过一遍全站 + 批准建 repo/push/开 Pages。

## Backlog（按序执行，禁止跳序）

### T1 配色系统重造 [status: todo]
- 条款：C1–C7
- 范围：仅 `src/styles.css` 的 :root 与 .dark 色板（含收编 header 遗留硬编码白色 overlay 为变量，C7）
- 内容：暖纸底（C2）、夜读暖炭底（C3）、主色迁到松绿→墨青域（C4）、单一强调色相（C5）、过对比度门禁（C6）

### T2 排版精修 [status: todo]
- 条款：C8–C12、C19
- 范围：styles.css + 涉及标题/元信息的组件
- 内容：展示级 Fraunces 标题（C9）、杂志标签体统一（C10）、圆角收紧到 ≤0.375rem（C19）

### T3 卡片与分隔语言 [status: todo]
- 条款：C13、C15 的卡片部分
- 范围：PostCard.astro、相关列表页
- 内容：去阴影改 hairline+留白（C13）、清理卡片冗余元信息（C15 后半）

### T4 首页 lead story 改版 [status: todo]
- 条款：C14、C10
- 范围：index.astro 首屏 + Header 首页态
- 内容：全出血压字 → 编辑部封面式构图，加 folio 眉线（C14）

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

（空）

## Inbox（等人工）

- 建 GitHub repo `signblueblau/signblueblau.github.io` + push + 开 Pages：**卡在账号**——本机 gh 登录的是 `terrificdm`，不是 `signblueblau`。M3 时需要站主切账号或提供权限。
- T9 需要站主提供：站名、一句话描述、社交链接、是否保留 demo 文章。

## 圈次日志（每圈一行：日期 / 任务 / 裁决 / 一句话）

（空）

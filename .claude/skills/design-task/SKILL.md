---
name: design-task
description: Generator for the design loop — execute exactly one backlog task from loop-state.md against design-brief.md. Use when driving one iteration of the blog customization loop.
---

# design-task（生成器）

你是 design loop 的**生成器**。你的产出会被一个独立的、态度怀疑的评判器审查，它只认 `design-brief.md` 的条款和可复现的检查，不认你的解释。所以：贴着条款做，别自由发挥。

## 输入

1. 读 `loop-state.md`：取 **Backlog 中第一个 `status: todo` 或 `status: rejected` 的任务**（rejected 优先——先还债）。
2. 读 `design-brief.md` 里该任务引用的条款。
3. 若任务是 rejected 状态，先读 state 文件里评判器的打回理由，逐条修复，不要重做已通过的部分。

## 规则

- **一次只做一个任务**。做完就停，不要顺手做下一个。
- 只改任务范围内的文件。颜色一律进 `src/styles.css` 的 custom properties（C7）。
- 遵守仓库 `AGENTS.md`（静态优先、最小 JS、可访问性）和 brief 第 6 节禁区（C25–C29）。
- 自检下限（提交给评判器之前必须自己先过）：
  - `npm run build` 成功
  - 涉及颜色时 `node scripts/check-contrast.mjs` PASS
- 你**不能**把任务标成 done——那是评判器的权限。你只能把它标成 `status: review`。

## 输出（写回 loop-state.md 该任务条目下）

```
status: review
attempt: <第几次尝试>
changed_files: <文件列表>
summary: <2-4 句人话：做了什么、为什么这样做、对应哪些条款>
self_check: build PASS / contrast PASS|N/A
```

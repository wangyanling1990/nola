---
name: architecture-design
description: 当需要规划、审查或更新 Nola 架构、桌面端 Electron 结构、后续移动端 Expo 结构、monorepo 布局、共享 packages、SQLite 策略、提醒抽象、同步预留或技术取舍时使用。
---

# Architecture Design 中文版

## When To Use

当请求影响技术方向、系统边界、应用和 package 布局、数据流、平台分离、共享模块、提醒、本地优先存储或未来同步准备时，使用此 Skill。

## Workflow

1. 阅读 `AGENTS.md`、`docs/architecture.md`、`docs/database-schema.md` 和相关 roadmap 条目。
2. 保持第一阶段桌面端优先、本地优先。
3. 使用目标技术栈：Electron、React、TypeScript、SQLite、Zustand、pnpm workspace 或 Turborepo。
4. 共享业务逻辑、类型、schema 和设计 tokens；不要强行共享 UI。
5. 预留未来同步字段，但不要过早实现云同步。
6. 在实现前记录取舍，并更新架构文档。
7. 除非用户明确要求实现，否则不要创建 app、package 或 manifest 脚手架。

## Required Output

- 架构建议
- 受影响层级或 packages
- 数据流或集成说明
- 取舍与被拒绝方案
- 测试和迁移影响

## Quality Bar

- 架构对桌面端 MVP 足够简单。
- 为移动端复用做准备，但不过度建设。
- 平台特定行为保持隔离。
- 数据和提醒决策兼容未来同步。

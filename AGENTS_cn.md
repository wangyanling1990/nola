# AGENTS 中文版

## 项目身份

- 项目名称：Nola | 诺拉
- 产品类型：ADHD 友好型任务管理软件
- 产品气质：安静陪伴、轻轻启动、低压无催促
- 一句话承诺：Nola，不催你，只轻轻帮你开始。

## 长期产品方向

Nola 是一个温柔陪伴型任务系统，帮助用户捕捉任务、开始任务、回到任务，并用更少的羞耻感和压力整理生活。

第一阶段聚焦 Windows 和 macOS 桌面端 MVP。后续阶段再支持 iOS 和 Android App，最后发展多设备同步能力。

## 技术栈方向

后续规划技术工作时，以此作为长期方向：

| 领域 | 技术方向 |
| --- | --- |
| 桌面端 | Electron + React + TypeScript + SQLite |
| 移动端 | React Native + Expo + TypeScript + SQLite |
| Monorepo | pnpm workspace 或 Turborepo |
| 状态管理 | Zustand |
| 共享业务逻辑 | `packages/core` |
| 共享类型 | `packages/types` |
| 共享数据库 schema | `packages/db-schema` |
| 共享设计 tokens | `packages/design-tokens` |
| 后续 AI 模块 | `packages/ai` |
| 后续云同步 | Supabase 或 Node.js + PostgreSQL |

建立执行体系时，不要创建这些应用目录或 package 文件。它们是未来实现阶段的架构目标。

## 产品原则

1. 温柔优先于强大：产品首先要降低压力，再谈效率。
2. 启动是第一目标：一个很小的下一步，可能比完整计划更重要。
3. 默认 ADHD 友好：低刺激、低羞耻、状态清楚、允许恢复。
4. MVP 本地优先：第一版不依赖账号、云同步或网络。
5. 共享逻辑，分离 UI：桌面端和移动端可以共享业务逻辑、类型、schema 与设计 tokens，但不要强行共享 UI 组件。
6. 提醒系统必须抽象：桌面端和移动端需要在共享提醒规则之下使用各自的平台适配器。
7. 为未来同步预留空间，但不要过早实现：schema 可以预留同步字段，云同步不属于第一阶段范围。

## 开发规则

1. 修改任何内容前，先阅读本文件、相关 `docs/` 文件和当前 sprint 文件。
2. 除非用户明确要求实现，否则不要写业务代码。
3. 保持规划文档一致：
   - 产品范围：`docs/prd.md`
   - 阶段顺序：`docs/roadmap.md`
   - 架构：`docs/architecture.md`
   - 数据设计：`docs/database-schema.md`
   - 质量策略：`docs/testing-strategy.md`
   - 界面标准：`docs/design-system.md`
   - 发布准备：`docs/release-checklist.md`
   - 任务跟踪：`tasks/backlog.md` 与 `tasks/sprint-001.md`
4. 优先做小而可追踪的修改，并关联 backlog 或 sprint 任务。
5. 保留用户改动，不要回滚或覆盖无关工作。
6. 不要编造产品决策；未知内容记录为开放问题。
7. 进入实现阶段后，优先使用 TypeScript、明确的领域类型和可测试的共享逻辑。

## 测试要求

对于文档或执行体系工作：

- 验证所有必需文件存在。
- 验证 Skill frontmatter 合法，且 `name` 与目录名一致。
- 验证没有创建应用源码、package manifest、迁移文件或构建配置。

对于后续产品实现：

- 对 `packages/core` 中的共享逻辑写单元测试。
- 对 `packages/db-schema` 中的数据规则和迁移写测试。
- 为 SQLite 持久化与提醒调度增加集成测试。
- 为关键桌面端流程做端到端或 UI 验证。
- UI 改动需要包含可访问性与低刺激设计检查。

## Definition of Done

一个任务只有在以下条件满足时才算完成：

1. 范围可追踪到 PRD、roadmap、backlog、sprint 或用户明确请求。
2. 相关文档已更新。
3. 如有实现，必须符合已批准的技术栈和阶段范围。
4. 必要验证有新鲜证据。
5. 风险、假设和开放问题已记录。
6. 最终汇报按文件分组说明改动，并说明剩余事项。

## Review Guidelines

审查工作时关注：

- ADHD 友好：没有不必要的压力、羞耻、拥挤或严厉语言。
- 阶段匹配：桌面 MVP 优先；移动端、AI、同步除非明确要求，否则保持后置。
- 架构匹配：共享逻辑和 schema 可复用，平台 UI 保持分离。
- 数据安全：本地 SQLite 数据应可恢复、可导出，并为未来同步字段预留空间。
- 质量证据：完成声明必须有命令输出或具体检查作为依据。
- 最小化：除非用户要求，不创建业务代码、依赖或项目脚手架。

## 本地 Codex Skills

项目本地 Skills 位于 `skills/`：

- `skills/product-planning/SKILL.md`
- `skills/architecture-design/SKILL.md`
- `skills/feature-development/SKILL.md`
- `skills/test-and-qa/SKILL.md`
- `skills/code-review/SKILL.md`
- `skills/release-management/SKILL.md`

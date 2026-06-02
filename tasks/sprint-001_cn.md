# Sprint 001 中文版

## Sprint 目标

为 ADHD 友好、桌面端优先的任务 App Nola 建立项目管理和执行基础，不写业务代码。

## 日期

- 开始：2026-06-02
- 结束：

## 范围规则

- 仅规划、文档和 Codex Skill 设置。
- 不创建应用脚手架。
- 不创建业务源码。
- 不创建 package manifests 或构建配置。
- 不创建数据库迁移。

## 任务

| ID | 任务 | Backlog | 状态 | Definition of Done |
| --- | --- | --- | --- | --- |
| S1-001 | 确认 Nola 产品定位和 MVP 边界 | BL-001 | In Progress | `docs/prd.md` 描述产品气质、ADHD 友好目标、第一阶段桌面范围和非范围。 |
| S1-002 | 确认桌面端技术栈和 monorepo 方向 | BL-001 | In Progress | `AGENTS.md`、`docs/roadmap.md` 和 `docs/architecture.md` 记录 Electron、React、TypeScript、SQLite、Zustand 和未来 monorepo packages。 |
| S1-003 | 设计桌面端 MVP 信息架构 | BL-002 | Ready | PRD 和 roadmap 识别 Today、任务、灵感箱、日历、提醒、随机启动和低能量模式。 |
| S1-004 | 设计任务与灵感箱数据模型 | BL-003 | Ready | `docs/database-schema.md` 记录任务、项目、灵感箱、提醒、日历、随机启动、设置和同步预留字段。 |
| S1-005 | 设计 ADHD 友好设计系统原则 | BL-007 | Ready | `docs/design-system.md` 捕捉 Nola 语气、低刺激视觉规则、组件原则和可访问性预期。 |
| S1-006 | 规划提醒系统抽象接口 | BL-005 | Ready | 架构和 schema 文档说明共享提醒规则，以及桌面/移动平台适配器。 |
| S1-007 | 规划随机启动和低能量任务体验 | BL-006 | Ready | PRD、设计系统和 backlog 将随机启动定义为温柔建议，而不是命令。 |
| S1-008 | 规划测试与 QA 门禁 | BL-001 | Ready | `docs/testing-strategy.md` 包含文档检查、未来实现检查和 ADHD 友好 QA。 |
| S1-009 | 规划发布检查清单 | BL-001 | Ready | `docs/release-checklist.md` 包含桌面端 MVP 准备、Windows/macOS 冒烟检查、数据安全和回滚。 |
| S1-010 | 准备下一阶段业务实现计划 | BL-008 | Idea | 下一步是桌面端 MVP 脚手架的独立实施计划；Sprint 001 不写代码。 |

## 完成标准

- `AGENTS.md` 是 Nola 专属版本。
- 七个 `docs/` 文件是 Nola 专属版本。
- `tasks/backlog.md` 包含桌面端 MVP 后续候选任务。
- `tasks/sprint-001.md` 包含恰好 10 个规划任务。
- `skills/` 只包含 6 个指定的项目本地 Skills。
- 验证确认没有业务代码或项目脚手架。

## 风险与开放问题

| 事项 | 影响 | 默认处理 |
| --- | --- | --- |
| 精确桌面端 MVP 页面仍需最终批准 | 影响实施计划 | 使用本 sprint 列出的 7 个流程 |
| 提醒实现细节具有平台特异性 | 影响 Electron 实现 | 先规划共享规则，再做适配器 |
| AI 拆解可能扩大范围 | 影响 MVP 聚焦 | 仅预留 package 边界 |

## 复盘

- 做得好的地方：
- 不清楚的地方：
- 后续动作：

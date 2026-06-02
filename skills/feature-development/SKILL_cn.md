---
name: feature-development
description: 当实现或规划实现 Nola 功能、桌面端 MVP 流程、共享 TypeScript 逻辑、SQLite 持久化、提醒、随机启动、灵感箱、Today 视图、任务层级或低能量任务行为时使用。
---

# Feature Development 中文版

## When To Use

当用户明确要求构建或规划 Nola 功能时，使用此 Skill。如果用户只要求规划或文档，不要因此开始写代码。

## Workflow

1. 阅读 `AGENTS.md`、相关 `docs/` 文件、`tasks/backlog.md` 和当前 sprint 文件。
2. 确认功能属于已批准阶段和范围。
3. 定义用户结果、验收标准、状态/数据需求，以及 ADHD 友好交互规则。
4. 对可复用行为优先使用共享逻辑，对桌面端或移动端界面使用平台特定 UI。
5. 当用户要求实现时，编写或更新与功能匹配的测试。
6. 汇报完成前，用新鲜证据验证。

## Required Output

- 功能范围
- 用户流程
- 数据和状态变化
- 测试计划
- 已修改或将修改文件
- 验证证据或所需验证

## Quality Bar

- 功能帮助用户以更少压力开始或恢复。
- 除非批准，否则范围不漂移到移动端、同步或 AI。
- 共享逻辑可测试。
- UI 和文案遵循 Nola 设计系统。

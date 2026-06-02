---
name: release-management
description: 当规划、审查或执行 Nola 发布准备、桌面端 MVP 上线检查、Windows/macOS 冒烟测试、发布说明、回滚计划、数据恢复检查、风险评审、批准或发布后观察时使用。
---

# Release Management 中文版

## When To Use

当请求涉及发布规划、上线准备、发布检查清单更新、冒烟测试、回滚、批准、风险评审或发布后监控时，使用此 Skill。

## Workflow

1. 阅读 `AGENTS.md`、`docs/release-checklist.md`、`docs/testing-strategy.md`、roadmap 阶段和当前 sprint 任务。
2. 确认发布目标和平台。
3. 检查验收标准、验证证据、平台冒烟测试、数据安全和回滚计划。
4. 将桌面端 MVP 发布与移动端、同步和 AI 发布分开。
5. 将缺失检查或风险转化为 backlog 条目。
6. 除非用户明确要求并有新鲜证据，否则不要部署、发布或声明就绪。

## Required Output

- 发布准备状态
- 已完成和缺失的检查
- 验证证据
- 风险和缓解方式
- 回滚或恢复说明
- 后续任务

## Quality Bar

- 发布状态基于证据。
- 桌面端发布分别检查 Windows 和 macOS。
- 明确考虑本地数据安全。
- 已知风险在发布前可见。

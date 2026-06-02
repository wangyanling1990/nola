---
name: test-and-qa
description: 当规划、编写、审查或运行 Nola 质量检查、单元测试、集成测试、桌面 UI 检查、SQLite 持久化检查、提醒检查、可访问性检查、ADHD 友好 QA、回归测试或发布证据时使用。
---

# Test And QA 中文版

## When To Use

当请求涉及质量策略、测试设计、验证命令、回归覆盖、QA 场景、可访问性、发布证据，或检查工作是否完成时，使用此 Skill。

## Workflow

1. 阅读 `AGENTS.md`、`docs/testing-strategy.md`、`docs/design-system.md` 和相关任务。
2. 根据风险和变更类型匹配测试深度。
3. 对文档类变更，验证文件结构、Skill 元数据和没有业务代码。
4. 对未来实现，覆盖共享逻辑、SQLite 持久化、提醒、UI 流程和可访问性。
5. 包含 ADHD 友好 QA：低压力、下一步清楚、视觉平静、允许恢复。
6. 没有新鲜命令输出或具体检查，不要声明成功。

## Required Output

- 测试场景
- 命令或人工检查
- 预期结果
- 可用时提供实际证据
- 风险或覆盖缺口

## Quality Bar

- 验证尽可能可重复。
- 人工 QA 检查具体而不含糊。
- 可访问性和 ADHD 友好体验被视为必需质量。
- 完成声明包含证据。

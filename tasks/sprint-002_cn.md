# Sprint 002 中文版

## Sprint 目标

开始 Nola 第一阶段代码实现：创建 monorepo 基础、共享 packages，以及第一版桌面端 MVP UI 壳。

## 日期

- 开始：2026-06-02
- 结束：2026-06-02

## 范围规则

- 只做桌面端 MVP 实现。
- 不实现移动端 App。
- 不实现云同步。
- 不实现 AI 拆解。
- UI 保持温柔、低压，并符合 BL-002 批准的页面集合。

## 任务

| ID | 任务 | Backlog | 状态 | Definition of done |
| --- | --- | --- | --- | --- |
| S2-001 | 创建 monorepo package 基础 | BL-012 | Done | 根 package 配置、workspace 配置、TypeScript 配置和第一批 app/package 目录存在。 |
| S2-002 | 增加共享领域类型 | BL-012 | Done | `packages/types` 定义 task、inbox、reminder、同步预留字段和随机启动建议类型。 |
| S2-003 | 增加带测试的随机启动核心逻辑 | BL-006 | Done | `packages/core` 包含 `pickRandomStart`；低能量偏好和无活跃任务测试通过。 |
| S2-004 | 增加共享 schema 定义 | BL-003 | Done | `packages/db-schema` 暴露 task、inbox、reminder 表定义和同步预留字段；测试通过。 |
| S2-005 | 增加设计 token package | BL-007 | Done | `packages/design-tokens` 定义 Nola 色彩、间距、圆角和字体方向。 |
| S2-006 | 增加桌面端 MVP UI 壳 | BL-012 | Done | `apps/desktop` 包含 Today、Tasks、Inbox、Calendar、Reminders、Random Start、Settings 的 React/Vite UI 壳。 |
| S2-007 | 安装依赖并验证构建 | BL-012 | Done | 依赖已在本地安装，生成产物已被忽略，`typecheck`、`build` 和 `test` 均通过。 |

## 验证证据

| 检查 | 状态 | 证据 |
| --- | --- | --- |
| TDD 红灯 | Done | 实现前 `npm.cmd test` 因缺少 `random-start.ts` 和 `db-schema/index.ts` 失败。 |
| 核心测试 | Done | 实现后 `npm.cmd test` 通过 7 个测试。 |
| 依赖安装 | Done | 中断后的网络安装已恢复；本地存在 `node_modules` 和 `package-lock.json`。`.gitignore` 已排除依赖目录和构建产物。 |
| Typecheck | Done | `npm.cmd run typecheck` 成功完成。 |
| 构建 | Done | `npm.cmd run build` 成功完成，覆盖桌面端应用和共享 packages。 |
| 浏览器 UI 检查 | Done | Vite dev server `http://127.0.0.1:5173` 成功加载 Nola；七个 MVP 导航按钮可见；Inbox 条目可转成任务并出现在 Tasks；Random Start 可显示推荐；控制台无 error。 |

## 阻塞

当前无活跃阻塞。

已解除的历史阻塞：npm registry `ECONNRESET` 曾中断依赖安装。当前本地依赖树可用，验证命令已通过。

## 复盘

- 做得好的地方：通过小型共享 packages 先验证随机启动、灵感箱、今日视图、schema 和 tokens，再扩展功能范围。
- 不清楚的地方：依赖安装曾受 registry/network 行为影响，需要额外追踪中断节点。
- 后续动作：下一轮进入真实持久化、提醒适配器规划和桌面端交互打磨。

# Sprint 002 中文版

## Sprint 目标

开始 Nola 第一阶段代码实现：创建 monorepo 基础、共享 packages，以及第一版桌面端 MVP UI 壳。

## 日期

- 开始：2026-06-02
- 结束：

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
| S2-007 | 安装依赖并验证构建 | BL-012 | Blocked | `npm install` 被 registry 网络 `ECONNRESET` 阻塞；等待网络稳定或配置可用 registry/proxy 后重试。 |

## 验证证据

| 检查 | 状态 | 证据 |
| --- | --- | --- |
| TDD 红灯 | Done | 实现前 `npm.cmd test` 因缺少 `random-start.ts` 和 `db-schema/index.ts` 失败。 |
| 核心测试 | Done | 实现后 `npm.cmd test` 通过 7 个测试。 |
| 依赖安装 | Blocked | `npm.cmd install --legacy-peer-deps`、重试参数、镜像 registry 和离线安装均失败。网络安装遇到 `ECONNRESET`；离线安装缺少缓存的 `rollup`。 |
| 构建/typecheck | Blocked | 依赖安装前无法执行。 |

## 阻塞

| 阻塞 | 影响 | 下一步 |
| --- | --- | --- |
| npm registry 拉取 Vite 或 React DOM 时网络重置；离线缓存缺少 Rollup | 阻止依赖安装、typecheck 和 Vite build | 网络稳定后重试安装，提供可用 registry/proxy，或预填充 npm cache。 |

## 复盘

- 做得好的地方：
- 不清楚的地方：
- 后续动作：

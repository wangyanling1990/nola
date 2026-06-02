# Nola Architecture 中文版

## 架构摘要

Nola 应演进为一个 monorepo：桌面端和移动端应用分离，同时用共享 packages 管理领域逻辑、类型、数据库 schema 和设计 tokens。第一阶段应保持桌面端优先、本地优先。

## 目标 Monorepo 结构

这是未来实现目标，不是在执行体系建立阶段要创建的目录结构。

```text
nola/
  apps/
    desktop/              # Windows/macOS Electron 应用
    mobile/               # iOS/Android React Native + Expo 应用，第二阶段
  packages/
    core/                 # 共享任务、灵感箱、提醒、日历、随机启动逻辑
    types/                # 共享 TypeScript 领域类型
    db-schema/            # 共享 SQLite schema 和迁移定义
    design-tokens/        # 共享颜色、字体、间距、圆角、动效 tokens
    ai/                   # 后续 AI 任务拆解接口
    sync/                 # 后续同步逻辑和冲突处理
```

## 桌面端架构

| 层级 | 方向 | 职责 |
| --- | --- | --- |
| 外壳 | Electron | 窗口、托盘、原生通知、文件系统、平台集成 |
| UI | React + TypeScript | 桌面端页面和交互 |
| 状态 | Zustand | 本地 UI 和领域状态协调 |
| 数据 | SQLite | 本地持久化 |
| 领域 | 未来共享 core package | 任务规则、灵感箱规则、提醒、日历、随机启动 |

桌面端特定 UI 和平台行为应留在桌面应用中。只有当逻辑确实有利于移动端复用时，才抽取为共享逻辑。

## 移动端架构

移动端属于第二阶段。

| 层级 | 方向 | 职责 |
| --- | --- | --- |
| App | React Native + Expo | iOS/Android 应用外壳 |
| UI | 平台特定 React Native 组件 | 移动端页面和交互 |
| 状态 | Zustand | 移动端状态协调 |
| 数据 | Expo SQLite | 本地持久化 |
| 领域 | 共享 packages | 复用业务逻辑和 schema |

## 共享 Package 规则

可以共享：

- 领域模型
- 类型定义
- 数据库 schema 定义
- 提醒规则
- 日历计算
- 随机启动逻辑
- ADHD 友好文案基础
- 设计 tokens

不要强行共享：

- 桌面端 UI 组件
- 移动端 UI 组件
- 原生通知实现
- 文件系统操作
- 窗口和托盘行为
- 平台权限流程

## 本地优先数据策略

第一阶段只使用 SQLite。schema 应预留让后续同步可行的字段：

- `id`
- `created_at`
- `updated_at`
- `deleted_at`
- `device_id`
- `sync_status`
- `last_synced_at`
- `remote_id`

第一阶段不实现云同步。

## 提醒架构

提醒规则应共享，提醒投递应平台特定：

- 桌面端适配器：Electron 通知和操作系统调度行为
- 移动端适配器：Expo 通知和移动端权限

## 后续同步选项

| 选项 | 适用性 |
| --- | --- |
| Supabase | 更快实现 MVP 同步，内置 auth 和 PostgreSQL |
| Node.js + PostgreSQL | 长期商业产品有更强控制力 |

## 架构质量标准

- 桌面端 MVP 保持简单、本地优先。
- 共享 packages 只在减少重复或准备移动端复用时创建。
- UI 按平台分别设计。
- 未来同步字段不应迫使早期实现同步。

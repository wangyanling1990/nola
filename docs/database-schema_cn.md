# Nola Database Schema 中文版

## 目的

本文档描述 Nola 的本地优先数据模型意图。它不是迁移文件。

## 数据库方向

| 平台 | 数据库 |
| --- | --- |
| 桌面端 MVP | SQLite，可能通过适合桌面端的封装如 better-sqlite3 |
| 移动端第二阶段 | Expo SQLite |
| 后续同步 | 通过 Supabase 或自建 Node.js 后端连接 PostgreSQL |

## 共享 Schema 原则

- 桌面端和移动端应使用同一套概念 schema。
- schema 定义未来应放在 `packages/db-schema`。
- 每张表都应包含 `created_at` 和 `updated_at`。
- 需要同步准备的表应预留 `deleted_at`、`device_id`、`sync_status`、`last_synced_at` 和 `remote_id`。
- MVP 不实现云同步。

## 核心实体

| 实体 | 目的 | MVP 状态 |
| --- | --- | --- |
| Task | 面向用户的任务项，支持可选层级 | 第一阶段 |
| Project | 任务的可选分组 | 第一阶段规划 |
| Inbox Item | 混乱灵感、想法或类任务捕捉 | 第一阶段 |
| Reminder | 附着到任务或灵感条目的本地提醒规则 | 第一阶段 |
| Calendar Entry | 日期视图元数据或任务排期关系 | 第一阶段规划 |
| Random Start Log | 温柔启动建议历史 | 第一阶段规划 |
| User Settings | 本地偏好与低刺激设置 | 第一阶段 |

## Task 字段

| 字段 | 目的 |
| --- | --- |
| `id` | 稳定本地标识 |
| `title` | 简短任务标题 |
| `notes` | 可选详情 |
| `status` | 建议值：`active`、`done`、`paused`、`archived` |
| `parent_id` | 支持多级任务 |
| `project_id` | 可选项目分组 |
| `energy_level` | 建议值：`low`、`medium`、`high` |
| `next_action` | 很小的开始动作 |
| `due_date` | 可选截止日期 |
| `scheduled_for` | 可选日历日期 |
| `created_at` | 创建时间 |
| `updated_at` | 最近更新时间 |
| `deleted_at` | 后续软删除和同步支持 |
| `device_id` | 后续同步支持 |
| `sync_status` | 后续同步支持 |
| `last_synced_at` | 后续同步支持 |
| `remote_id` | 后续同步支持 |

## Inbox Item 字段

| 字段 | 目的 |
| --- | --- |
| `id` | 稳定本地标识 |
| `content` | 捕捉到的想法或灵感 |
| `source` | 手动、导入、未来 AI 或其他来源 |
| `converted_task_id` | 可选，由该条目转换出的任务 |
| `status` | 建议值：`unprocessed`、`converted`、`archived` |
| `created_at` | 创建时间 |
| `updated_at` | 最近更新时间 |
| 同步字段 | 与 task 相同的同步预留字段 |

## Reminder 字段

| 字段 | 目的 |
| --- | --- |
| `id` | 稳定本地标识 |
| `target_type` | `task` 或 `inbox_item` |
| `target_id` | 关联实体 id |
| `remind_at` | 本地提醒时间 |
| `repeat_rule` | 可选重复规则 |
| `delivery_status` | 待提醒、已投递、已忽略 |
| `created_at` | 创建时间 |
| `updated_at` | 最近更新时间 |

## 索引方向

进入实现阶段后，为以下查询添加索引：

- 任务状态和日期视图
- 父子任务查询
- 灵感箱状态
- 提醒到期时间
- 后续同步状态

## 数据质量规则

- 任务标题不应为空。
- 灵感箱内容不应为空。
- 子任务不应形成循环。
- 提醒目标必须存在。
- 软删除记录默认隐藏。

## 迁移规则

- 创建迁移前，先在本文档记录 schema 意图。
- 破坏性变更需要补充回滚或恢复说明。
- 用样例本地数据测试迁移。
- 同步字段一旦引入应保持稳定。

# Nola Database Schema

## Purpose

This document describes the intended local-first data model for Nola. It is not a migration file.

## Database Direction

| Platform | Database |
| --- | --- |
| Desktop MVP | SQLite, likely through a desktop-compatible wrapper such as better-sqlite3 |
| Mobile phase 2 | SQLite through Expo |
| Future sync | PostgreSQL through Supabase or a custom Node.js backend |

## Shared Schema Principles

- Desktop and mobile should use the same conceptual schema.
- Schema definitions should eventually live in `packages/db-schema`.
- Every table should include `created_at` and `updated_at`.
- Sync-ready tables should reserve `deleted_at`, `device_id`, `sync_status`, `last_synced_at`, and `remote_id`.
- MVP should not implement cloud sync.

## Core Entities

| Entity | Purpose | MVP status |
| --- | --- | --- |
| Task | User-facing work item, with optional hierarchy | Phase 1 |
| Project | Optional grouping for tasks | Phase 1 planning |
| Inbox Item | Messy inspiration, idea, or task-like capture | Phase 1 |
| Reminder | Local reminder rule attached to a task or inbox item | Phase 1 |
| Calendar Entry | Date-based view metadata or scheduled task relation | Phase 1 planning |
| Random Start Log | History of gentle start suggestions | Phase 1 planning |
| User Settings | Local preferences and low-stimulation settings | Phase 1 |

## Task Fields

| Field | Purpose |
| --- | --- |
| `id` | Stable local identifier |
| `title` | Short task title |
| `notes` | Optional details |
| `status` | Suggested values: `active`, `done`, `paused`, `archived` |
| `parent_id` | Supports multi-level tasks |
| `project_id` | Optional project grouping |
| `energy_level` | Suggested values: `low`, `medium`, `high` |
| `next_action` | Tiny starting action |
| `due_date` | Optional due date |
| `scheduled_for` | Optional calendar date |
| `created_at` | Creation timestamp |
| `updated_at` | Last update timestamp |
| `deleted_at` | Future soft-delete and sync support |
| `device_id` | Future sync support |
| `sync_status` | Future sync support |
| `last_synced_at` | Future sync support |
| `remote_id` | Future sync support |

## Inbox Item Fields

| Field | Purpose |
| --- | --- |
| `id` | Stable local identifier |
| `content` | Captured thought or idea |
| `source` | Manual, import, future AI, or other source |
| `converted_task_id` | Optional task created from the item |
| `status` | Suggested values: `unprocessed`, `converted`, `archived` |
| `created_at` | Creation timestamp |
| `updated_at` | Last update timestamp |
| sync fields | Same sync-ready fields as tasks |

## Reminder Fields

| Field | Purpose |
| --- | --- |
| `id` | Stable local identifier |
| `target_type` | `task` or `inbox_item` |
| `target_id` | Related entity id |
| `remind_at` | Local reminder time |
| `repeat_rule` | Optional recurrence rule |
| `delivery_status` | Pending, delivered, dismissed |
| `created_at` | Creation timestamp |
| `updated_at` | Last update timestamp |

## Indexing Direction

Add indexes when implementation begins for:

- Task status and date views
- Parent-child task lookup
- Inbox item status
- Reminder due time
- Future sync status

## Data Quality Rules

- Task title should not be empty.
- Inbox content should not be empty.
- Child tasks should not form cycles.
- Reminder target must exist.
- Soft-deleted records should be hidden by default.

## Migration Rules

- Document schema intent here before migrations are created.
- Add rollback or recovery notes for destructive changes.
- Test migrations against sample local data.
- Keep future sync fields stable once introduced.

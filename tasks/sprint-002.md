# Sprint 002

## Sprint Goal

Begin Phase 1 code implementation for Nola by creating the monorepo foundation, shared packages, and the first desktop MVP UI shell.

## Dates

- Start: 2026-06-02
- End:

## Scope Rules

- Desktop MVP implementation only.
- No mobile app implementation.
- No cloud sync implementation.
- No AI decomposition implementation.
- Keep UI gentle, low-pressure, and aligned with the approved BL-002 screen set.

## Tasks

| ID | Task | Backlog | Status | Definition of done |
| --- | --- | --- | --- | --- |
| S2-001 | Create monorepo package foundation | BL-012 | Done | Root package config, workspace config, TypeScript config, and first app/package folders exist. |
| S2-002 | Add shared domain types | BL-012 | Done | `packages/types` defines task, inbox, reminder, sync-ready fields, and random start suggestion types. |
| S2-003 | Add tested random start core logic | BL-006 | Done | `packages/core` includes `pickRandomStart`; tests pass for low-energy preference and empty active task cases. |
| S2-004 | Add shared schema definitions | BL-003 | Done | `packages/db-schema` exposes task, inbox, reminder table definitions with sync-ready fields; tests pass. |
| S2-005 | Add design token package | BL-007 | Done | `packages/design-tokens` defines Nola color, spacing, radius, and typography direction. |
| S2-006 | Add desktop MVP UI shell | BL-012 | Done | `apps/desktop` includes a React/Vite UI shell for Today, Tasks, Inbox, Calendar, Reminders, Random Start, and Settings. |
| S2-007 | Install dependencies and verify build | BL-012 | Blocked | `npm install` is blocked by registry network `ECONNRESET`; retry after network stabilizes or configure a working registry/proxy. |

## Verification Evidence

| Check | Status | Evidence |
| --- | --- | --- |
| TDD red | Done | `npm.cmd test` failed before implementation because `random-start.ts` and `db-schema/index.ts` were missing. |
| Core tests | Done | `npm.cmd test` passes 7 tests after implementation. |
| Dependency install | Blocked | `npm.cmd install --legacy-peer-deps`, retry options, mirror registry retry, and offline install all failed. Network installs hit `ECONNRESET`; offline install lacks cached `rollup`. |
| Build/typecheck | Blocked | Cannot run until dependencies install. |

## Blockers

| Blocker | Impact | Next action |
| --- | --- | --- |
| npm registry network resets while fetching Vite or React DOM; offline cache lacks Rollup | Prevents dependency install, typecheck, and Vite build | Retry install after network stabilizes, provide a working registry/proxy, or pre-populate npm cache. |

## Retrospective

- What worked:
- What was unclear:
- Follow-up actions:

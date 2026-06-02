# Sprint 002

## Sprint Goal

Begin Phase 1 code implementation for Nola by creating the monorepo foundation, shared packages, and the first desktop MVP UI shell.

## Dates

- Start: 2026-06-02
- End: 2026-06-02

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
| S2-007 | Install dependencies and verify build | BL-012 | Done | Dependencies are installed locally, generated outputs are ignored, and `typecheck`, `build`, and `test` pass. |

## Verification Evidence

| Check | Status | Evidence |
| --- | --- | --- |
| TDD red | Done | `npm.cmd test` failed before implementation because `random-start.ts` and `db-schema/index.ts` were missing. |
| Core tests | Done | `npm.cmd test` passes 7 tests after implementation. |
| Dependency install | Done | Local `node_modules` and `package-lock.json` exist after the interrupted network install recovered. `.gitignore` excludes dependency and build output folders. |
| Typecheck | Done | `npm.cmd run typecheck` completes successfully. |
| Build | Done | `npm.cmd run build` completes successfully for the desktop app and shared packages. |
| Browser UI check | Done | Vite dev server at `http://127.0.0.1:5173` loads Nola, exposes the seven MVP navigation buttons, converts an inbox item into a task, shows the converted task in Tasks, and displays a Random Start recommendation without console errors. |

## Blockers

No active blocker.

Previously resolved: npm registry `ECONNRESET` interrupted dependency install. The local dependency tree is now available, and verification commands pass.

## Retrospective

- What worked: Small shared packages made it possible to test random-start, inbox, today, schema, and tokens before expanding feature scope.
- What was unclear: Dependency installation was interrupted by registry/network behavior and needed a follow-up status check.
- Follow-up actions: Start the next sprint with real persistence, reminder adapter planning, and desktop interaction hardening.

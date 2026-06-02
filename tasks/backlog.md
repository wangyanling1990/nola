# Nola Backlog

## Purpose

This backlog tracks planning and implementation work for Nola. Every task should connect to the PRD, roadmap, current sprint, or an explicit user request.

## Status Values

- `Idea`: Captured but not ready.
- `Ready`: Clear enough to schedule.
- `In Progress`: Being worked.
- `Blocked`: Waiting on a decision or dependency.
- `Done`: Completed and verified.

## Priority Values

- `P0`: Required for current phase.
- `P1`: Important for MVP quality.
- `P2`: Useful improvement.
- `P3`: Future option.

## Backlog Items

| ID | Title | Phase | Priority | Status | Acceptance criteria | Dependency |
| --- | --- | --- | --- | --- | --- | --- |
| BL-001 | Upgrade Codex execution system for Nola | Planning | P0 | In Progress | Nola-specific docs, tasks, and six requested Skills exist; no business code is created. | None |
| BL-002 | Define desktop MVP screen set | Phase 1 | P0 | Ready | Today, tasks, inbox, calendar, reminders, and random start flows are described. | BL-001 |
| BL-003 | Define task and inbox domain model | Phase 1 | P0 | Ready | Task, project, inbox item, reminder, and sync-ready fields are documented. | BL-001 |
| BL-004 | Plan monorepo implementation | Phase 1 | P0 | Idea | Future apps and packages layout is approved before scaffolding. | BL-002 |
| BL-005 | Plan desktop reminder adapter | Phase 1 | P1 | Idea | Shared reminder rule model and desktop adapter responsibilities are defined. | BL-003 |
| BL-006 | Plan random start experience | Phase 1 | P1 | Idea | Selection rules, user copy, and low-energy behavior are documented. | BL-002 |
| BL-007 | Plan ADHD-friendly design tokens | Phase 1 | P1 | Idea | Color, typography, spacing, motion, and accessibility directions are documented. | BL-002 |
| BL-008 | Prepare desktop MVP implementation plan | Phase 1 | P0 | Idea | A task-by-task implementation plan exists for scaffolding and MVP features. | BL-002, BL-003 |
| BL-009 | Plan mobile MVP reuse strategy | Phase 2 | P2 | Idea | Mobile reuse boundaries for core, types, schema, and tokens are documented. | Desktop MVP foundation |
| BL-010 | Plan future cloud sync | Phase 3 | P2 | Idea | Supabase vs custom backend decision criteria and sync fields are documented. | Local schema validated |
| BL-011 | Plan future AI decomposition module | Later | P3 | Idea | `packages/ai` interface expectations are documented without implementation. | MVP task model |

## Intake Template

| Field | Value |
| --- | --- |
| Title |  |
| Phase |  |
| Source |  |
| Problem |  |
| Proposed outcome |  |
| Acceptance criteria |  |
| Priority |  |
| Dependencies |  |

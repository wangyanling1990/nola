# Sprint 001

## Sprint Goal

Establish Nola’s project management and execution foundation for an ADHD-friendly desktop-first task app, without writing business code.

## Dates

- Start: 2026-06-02
- End:

## Scope Rules

- Planning, documentation, and Codex Skill setup only.
- No application scaffolding.
- No business source code.
- No package manifests or build configs.
- No database migrations.

## Tasks

| ID | Task | Backlog | Status | Definition of done |
| --- | --- | --- | --- | --- |
| S1-001 | Confirm Nola product positioning and MVP boundary | BL-001 | Done | `docs/prd.md` describes product feeling, ADHD-friendly goals, phase 1 desktop scope, and non-scope. |
| S1-002 | Confirm desktop technology stack and monorepo direction | BL-001 | Done | `AGENTS.md`, `docs/roadmap.md`, and `docs/architecture.md` record Electron, React, TypeScript, SQLite, Zustand, and future monorepo packages. |
| S1-003 | Design desktop MVP information architecture | BL-002 | Done | PRD and roadmap identify Today, tasks, inbox, calendar, reminders, random start, Settings, and low-energy mode. |
| S1-004 | Design task and inspiration inbox data model | BL-003 | Ready | `docs/database-schema.md` documents task, project, inbox, reminder, calendar, random start, settings, and sync-ready fields. |
| S1-005 | Design ADHD-friendly design-system principles | BL-007 | Ready | `docs/design-system.md` captures Nola voice, low-stimulation visual rules, component principles, and accessibility expectations. |
| S1-006 | Plan reminder system abstraction interface | BL-005 | Ready | Architecture and schema docs explain shared reminder rules with desktop and mobile platform adapters. |
| S1-007 | Plan random start and low-energy task experience | BL-006 | Ready | PRD, design system, and backlog define random start as a gentle suggestion rather than a command. |
| S1-008 | Plan testing and QA gates | BL-001 | Done | `docs/testing-strategy.md` includes documentation checks, future implementation checks, and ADHD-friendly QA. |
| S1-009 | Plan release checklist | BL-001 | Done | `docs/release-checklist.md` includes desktop MVP readiness, Windows/macOS smoke checks, data safety, and rollback. |
| S1-010 | Prepare next-stage business implementation plan | BL-008 | Idea | Next step is a separate implementation plan for desktop MVP scaffolding; no code is written in Sprint 001. |

## Completion Criteria

- `AGENTS.md` is Nola-specific.
- Seven `docs/` files are Nola-specific.
- `tasks/backlog.md` contains desktop MVP follow-up candidates.
- `tasks/sprint-001.md` contains exactly 10 planning tasks.
- `skills/` contains only the six requested project-local Skills.
- Verification confirms no business code or project scaffolding exists.

## Risks and Open Questions

| Item | Impact | Default |
| --- | --- | --- |
| Exact desktop MVP screens still need final approval | Affects implementation plan | BL-002 baseline: Today, Tasks, Inbox, Calendar, Reminders, Random Start, Settings |
| Reminder implementation details are platform-specific | Affects Electron implementation | Plan shared rules first, adapters later |
| AI decomposition may expand scope | Affects MVP focus | Reserve package boundary only |

## Retrospective

- What worked:
- What was unclear:
- Follow-up actions:

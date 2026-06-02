# AGENTS.md

## Project Identity

- Project name: Nola | 诺拉
- Product type: ADHD-friendly task management app
- Product feeling: quiet companionship, gentle start, low pressure
- One-line promise: Nola, 不催你，只轻轻帮你开始。

## Long-Term Product Direction

Nola is a warm, companion-like task system for people who need help starting, remembering, decomposing, and returning to tasks without shame or pressure.

Phase 1 focuses on Windows and macOS desktop MVP. Later phases add iOS and Android apps, then multi-device sync.

## Technology Stack

Use this stack as the long-term direction when planning technical work:

| Area | Direction |
| --- | --- |
| Desktop | Electron + React + TypeScript + SQLite |
| Mobile | React Native + Expo + TypeScript + SQLite |
| Monorepo | pnpm workspace or Turborepo |
| State | Zustand |
| Shared logic | `packages/core` |
| Shared types | `packages/types` |
| Shared DB schema | `packages/db-schema` |
| Shared design tokens | `packages/design-tokens` |
| Future AI module | `packages/ai` |
| Future sync | Supabase or Node.js + PostgreSQL |

Do not create these application directories or package files during execution-system setup. They are architecture targets for future implementation.

## Product Principles

1. Gentle before powerful: the app should reduce pressure before adding productivity features.
2. Start is the first-class outcome: a tiny next action can be more valuable than a complete plan.
3. ADHD friendly by default: low stimulation, low shame, clear state, forgiving recovery.
4. Local-first MVP: first version works without accounts, cloud sync, or network dependency.
5. Shared logic, separate UI: desktop and mobile may share business logic, types, schema, and design tokens, but should not force shared UI components.
6. Reminder systems must be abstracted: desktop and mobile reminders need platform-specific adapters behind a shared rule model.
7. Future sync must be prepared, not implemented early: schema should reserve sync fields, but cloud sync is out of scope for phase 1.

## Development Rules

1. Read this file, relevant `docs/` files, and the current sprint file before changing anything.
2. Do not write business code unless the user explicitly asks for implementation.
3. Keep planning artifacts aligned:
   - Product scope: `docs/prd.md`
   - Sequence: `docs/roadmap.md`
   - Architecture: `docs/architecture.md`
   - Data design: `docs/database-schema.md`
   - Quality: `docs/testing-strategy.md`
   - Interface standards: `docs/design-system.md`
   - Release readiness: `docs/release-checklist.md`
   - Task tracking: `tasks/backlog.md` and `tasks/sprint-001.md`
4. Prefer small, traceable changes tied to a backlog or sprint item.
5. Preserve user changes. Do not revert or overwrite unrelated work.
6. Document open questions instead of inventing product decisions.
7. When implementation begins, prefer TypeScript, explicit domain types, and testable shared logic.

## Testing Requirements

For documentation or execution-system work:

- Verify all required files exist.
- Verify Skill frontmatter is valid and `name` matches the folder.
- Verify no application source, package manifest, migrations, or build config was created.

For future product implementation:

- Unit-test shared logic in `packages/core`.
- Test data rules and migrations in `packages/db-schema`.
- Add integration coverage for SQLite persistence and reminder scheduling.
- Use end-to-end or UI verification for critical desktop flows.
- Include accessibility and low-stimulation design checks for UI changes.

## Definition of Done

A task is done only when:

1. Scope is traceable to PRD, roadmap, backlog, sprint, or an explicit user request.
2. Relevant docs are updated.
3. Implementation, if any, stays within the approved stack and phase.
4. Required verification has fresh evidence.
5. Risks, assumptions, and open questions are recorded.
6. The final report groups changes by file and states what remains.

## Review Guidelines

Review work against:

- ADHD friendliness: no unnecessary pressure, shame, clutter, or harsh language.
- Phase fit: desktop MVP first; mobile, AI, and sync stay deferred unless explicitly requested.
- Architecture fit: shared logic and schema are reusable; platform UI remains separate.
- Data safety: local SQLite data should be recoverable, exportable, and ready for future sync fields.
- Quality evidence: claims of completion must be backed by commands or concrete inspection.
- Minimality: no business code, dependencies, or generated project scaffolds unless requested.

## Local Codex Skills

Project-local skills live under `skills/`:

- `skills/product-planning/SKILL.md`
- `skills/architecture-design/SKILL.md`
- `skills/feature-development/SKILL.md`
- `skills/test-and-qa/SKILL.md`
- `skills/code-review/SKILL.md`
- `skills/release-management/SKILL.md`

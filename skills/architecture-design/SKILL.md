---
name: architecture-design
description: Use when planning, reviewing, or updating Nola architecture, desktop Electron structure, future mobile Expo structure, monorepo layout, shared packages, SQLite strategy, reminder abstraction, sync preparation, or technical tradeoffs.
---

# Architecture Design

## When To Use

Use this skill when the request affects technical direction, system boundaries, app/package layout, data flow, platform separation, shared modules, reminders, local-first storage, or future sync readiness.

## Workflow

1. Read `AGENTS.md`, `docs/architecture.md`, `docs/database-schema.md`, and relevant roadmap items.
2. Keep phase 1 desktop-first and local-first.
3. Use the target stack: Electron, React, TypeScript, SQLite, Zustand, pnpm workspace or Turborepo.
4. Share business logic, types, schema, and design tokens; do not force shared UI.
5. Reserve future sync fields without implementing cloud sync early.
6. Document tradeoffs and update architecture docs before implementation.
7. Do not scaffold apps, packages, or manifests unless the user explicitly requests implementation.

## Required Output

- Architecture recommendation
- Affected layers or packages
- Data flow or integration notes
- Tradeoffs and rejected alternatives
- Testing and migration implications

## Quality Bar

- Architecture is simple enough for desktop MVP.
- Mobile reuse is prepared without overbuilding.
- Platform-specific behavior stays isolated.
- Data and reminder decisions are compatible with future sync.

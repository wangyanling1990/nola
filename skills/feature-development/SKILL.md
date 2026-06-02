---
name: feature-development
description: Use when implementing or planning implementation of Nola features, desktop MVP flows, shared TypeScript logic, SQLite persistence, reminders, random start, inspiration inbox, Today view, task hierarchy, or low-energy task behavior.
---

# Feature Development

## When To Use

Use this skill when the user explicitly asks to build or plan a Nola feature. Do not use it to start coding when the user only asked for planning or documentation.

## Workflow

1. Read `AGENTS.md`, relevant `docs/` files, `tasks/backlog.md`, and the active sprint file.
2. Confirm the feature belongs to the approved phase and scope.
3. Define user outcome, acceptance criteria, state/data needs, and ADHD-friendly interaction rules.
4. Prefer shared logic for reusable behavior and platform-specific UI for desktop or mobile surfaces.
5. Write or update tests appropriate to the feature when implementation is requested.
6. Verify with fresh evidence before reporting completion.

## Required Output

- Feature scope
- User flow
- Data and state changes
- Test plan
- Files changed or to be changed
- Verification evidence or required verification

## Quality Bar

- The feature helps users start or recover with less pressure.
- Scope does not drift into mobile, sync, or AI unless approved.
- Shared logic is testable.
- UI and copy follow the Nola design system.

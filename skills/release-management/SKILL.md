---
name: release-management
description: Use when planning, reviewing, or executing Nola release readiness, desktop MVP launch checks, Windows/macOS smoke tests, release notes, rollback plans, data recovery checks, risk review, approvals, or post-release observation.
---

# Release Management

## When To Use

Use this skill when the request involves release planning, launch readiness, release checklist updates, smoke testing, rollback, approvals, risk review, or post-release monitoring.

## Workflow

1. Read `AGENTS.md`, `docs/release-checklist.md`, `docs/testing-strategy.md`, roadmap phase, and active sprint tasks.
2. Confirm the release target and platform.
3. Check acceptance criteria, verification evidence, platform smoke tests, data safety, and rollback plan.
4. Keep desktop MVP release separate from mobile, sync, and AI releases.
5. Convert missing checks or risks into backlog items.
6. Do not deploy, publish, or claim readiness without explicit user request and fresh evidence.

## Required Output

- Release readiness status
- Completed and missing checks
- Verification evidence
- Risks and mitigations
- Rollback or recovery notes
- Follow-up tasks

## Quality Bar

- Release status is evidence-based.
- Windows and macOS are checked separately for desktop releases.
- Local data safety is explicitly considered.
- Known risks are visible before release.

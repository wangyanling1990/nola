---
name: code-review
description: Use when reviewing Nola code, planned changes, diffs, architecture edits, documentation edits, tests, accessibility, ADHD-friendly UX, desktop/mobile phase fit, data safety, or release readiness before accepting work.
---

# Code Review

## When To Use

Use this skill when asked to review code, docs, architecture, tests, or implementation plans. Use a review stance: findings first, ordered by severity.

## Workflow

1. Read `AGENTS.md` and the documents relevant to the reviewed change.
2. Identify the intended scope and phase.
3. Check for correctness, regressions, data safety, accessibility, ADHD-friendly UX, and phase drift.
4. Verify tests or evidence when available.
5. Report actionable findings with file and line references when possible.
6. Do not rewrite the work during review unless the user asks for fixes.

## Required Output

- Findings ordered by severity
- File and line references when available
- Open questions or assumptions
- Test gaps or residual risk
- Brief change summary only after findings

## Quality Bar

- Findings are specific and actionable.
- Review protects Nola’s gentle product principles.
- Review catches accidental scope expansion into mobile, sync, AI, or scaffolding.
- Absence of findings is stated clearly with remaining risks.

# Nola Testing Strategy

## Purpose

Nola quality is not only correctness. It must also protect gentleness, low cognitive load, local data safety, and cross-platform readiness.

## Test Principles

- Verify the smallest unit close to the change.
- Treat ADHD-friendly experience as a quality requirement.
- Prefer repeatable tests for domain logic.
- Use manual checks for tone, visual load, and platform-specific reminders.
- Never claim release readiness without fresh evidence.

## Test Layers

| Layer | Purpose | Nola examples |
| --- | --- | --- |
| Unit | Verify isolated domain logic | Task status rules, random start selection, energy filtering |
| Integration | Verify connected behavior | SQLite persistence, reminder rule storage, state hydration |
| UI | Verify user flows | Capture task, open Today view, convert inbox item |
| Platform | Verify native behavior | Windows/macOS notifications, tray, file backup |
| Accessibility | Verify inclusive usage | Keyboard navigation, focus visibility, contrast |
| Product QA | Verify ADHD friendliness | Copy tone, visual calm, low-pressure states |

## Documentation-Only Verification

For execution-system work:

- Required files exist.
- Local Skills have valid frontmatter.
- Old Skill names are removed when replaced.
- No business source or package files are created.
- Cross-document references point to real files.

## Future Implementation Verification

| Change type | Minimum evidence |
| --- | --- |
| Shared domain logic | Unit tests |
| SQLite schema | Migration and persistence tests |
| Reminder behavior | Unit tests for rules plus platform manual check |
| Desktop UI | UI flow verification and accessibility pass |
| Design tokens | Visual inspection against design-system rules |
| Release build | Windows and macOS smoke checks |

## ADHD-Friendly QA Checklist

- Does the interface avoid harsh urgency?
- Is the next action clear and small?
- Can the user recover from unfinished tasks without shame?
- Is the screen visually calm?
- Are primary actions discoverable without dense instructions?
- Does random start feel supportive rather than chaotic?

## Regression Focus

Protect these flows once implemented:

- Capture task quickly.
- Capture inbox item quickly.
- Persist data after restart.
- Show today’s tasks.
- Choose a random start suggestion.
- Create and deliver a reminder.
- Mark task complete or paused.

## Release Evidence

Release notes should include:

- Commands run
- Manual QA scenarios
- Platform checks
- Known risks
- Rollback or recovery plan

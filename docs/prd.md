# Nola PRD

## Product Summary

Nola | 诺拉 is an ADHD-friendly task management app. It is not a high-pressure productivity dashboard. It is a quiet companion that helps users capture, start, return to, and gently organize tasks.

One-line promise:

> Nola, 不催你，只轻轻帮你开始。

## Target Users

| User | Need | Product response |
| --- | --- | --- |
| ADHD users or users with executive-function difficulty | Start tasks without overwhelm | Tiny next actions, low-pressure prompts, random start |
| Users who forget ideas and tasks quickly | Capture before organizing | Inspiration inbox and quick capture |
| Users who resist rigid productivity systems | Flexible recovery | Forgiving task states and gentle copy |
| Desktop-first users | Larger planning surface | Windows/macOS MVP with calendar, multi-level tasks, and local data |

## Core Problem

Many task systems assume the user can calmly plan, prioritize, and execute. ADHD users often need help before that point: capturing scattered ideas, reducing task friction, choosing a tiny next action, and returning without guilt.

## Product Principles

- Do not shame users for unfinished tasks.
- Make starting easier than planning perfectly.
- Prefer calm structure over dense productivity mechanics.
- Keep task state visible but not punitive.
- Support both structured tasks and messy inspiration.

## Phase 1: Desktop MVP Scope

Platforms:

- Windows
- macOS

In scope:

- Today home view
- Multi-level task management
- Inspiration inbox
- Calendar or month view
- Fixed reminders
- Random start button
- Low-energy task mode
- Local SQLite storage
- ADHD-friendly visual system
- Local backup or export planning

Out of scope for phase 1:

- iOS and Android apps
- Account system
- Cloud sync
- Cross-device reminders
- Subscription billing
- Full AI task decomposition

## Phase 2: Mobile MVP Scope

Platforms:

- iOS
- Android

Expected focus:

- Quick capture
- Today tasks
- Reminders
- Inspiration inbox
- Lightweight calendar
- Random start
- Local SQLite storage

## Phase 3: Multi-Device Sync Scope

Expected focus:

- Account system
- Cloud database
- Device management
- Data sync
- Conflict handling
- Automatic backup
- Cross-device reminder strategy

## MVP Acceptance Criteria

The desktop MVP is acceptable when:

- A user can capture a task or idea quickly.
- A user can see today’s focus without visual overload.
- A user can break a task into smaller steps.
- A user can store and review inspiration inbox items.
- A user can schedule a fixed reminder.
- A user can ask Nola to choose a gentle starting point.
- Data persists locally in SQLite.
- The interface follows the Nola design principles.

## Success Metrics

| Metric | Intent |
| --- | --- |
| First task captured | User can start without setup friction |
| Random start used | Product helps overcome initiation difficulty |
| Task returned to after delay | Product supports recovery without shame |
| Reminder created | User trusts Nola with gentle nudges |
| Low-energy task completed | Product helps users act under limited capacity |

## Open Questions

| Question | Why it matters | Status |
| --- | --- | --- |
| What is the smallest useful desktop MVP screen set? | Defines first implementation scope | Open |
| Should reminders be local-only in MVP? | Affects architecture and permissions | Default: yes |
| Should AI decomposition be planned now or deferred entirely? | Affects package boundaries | Default: plan interface only, defer implementation |

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

## Desktop MVP Screen Set

The phase 1 desktop MVP should use a small set of calm, predictable screens. These screens are the approved BL-002 baseline for later implementation planning.

| Screen | User outcome | Primary elements | Not included in MVP |
| --- | --- | --- | --- |
| Today | See what can be started now without overload | Gentle greeting, today focus list, low-energy section, random start entry point, quick capture | Dense analytics, productivity scoring |
| Tasks | Organize structured work | Task list, nested subtasks, status, next action, energy level, project grouping | Complex kanban, team assignment, time tracking |
| Inbox | Capture before organizing | Quick idea capture, unprocessed items, convert to task, archive | AI auto-triage, external integrations |
| Calendar | Orient by date | Month view, scheduled tasks, reminder markers, today highlight | Full calendar sync, meeting management |
| Reminders | Manage local nudges | Reminder list, create fixed reminder, edit reminder, dismiss state | Cross-device reminders, cloud scheduling |
| Random Start | Get one gentle starting suggestion | One suggested task, reason, small next action, skip option, low-energy filter | Gamification, streak pressure |
| Settings | Adjust comfort and local behavior | Low-stimulation preferences, backup/export entry, local data notes | Account, billing, cloud sync |

## Desktop MVP User Flows

### Today Flow

1. User opens Nola.
2. Nola shows a calm Today screen with a short focus list.
3. User can choose a listed task, capture a new item, or ask for a random start.
4. If the user has low energy, the screen surfaces smaller tasks or next actions.

Acceptance:

- The user can identify one possible next action within the Today screen.
- The screen does not require prioritization before starting.

### Tasks Flow

1. User opens the Tasks screen.
2. User creates a task with a title and optional next action.
3. User can add subtasks, mark status, set energy level, or assign a project.
4. User can return later and see the task without losing context.

Acceptance:

- A task can exist as a simple item or a multi-step item.
- Every task can carry a small next action.

### Inbox Flow

1. User captures an idea quickly without categorizing it.
2. The item appears in the Inbox as unprocessed.
3. User can later convert it to a task, leave it in the Inbox, or archive it.

Acceptance:

- Capture is faster than full task creation.
- Inbox supports messy thoughts without forcing structure.

### Calendar Flow

1. User opens Calendar to orient by date.
2. User sees scheduled tasks and reminder markers.
3. User can select a date to inspect what is planned.

Acceptance:

- Calendar helps orientation without becoming a pressure dashboard.
- Full external calendar sync is not required.

### Reminders Flow

1. User creates a fixed local reminder for a task or inbox item.
2. Nola stores the reminder rule locally.
3. User can edit or dismiss the reminder.

Acceptance:

- Reminder behavior is local-first.
- Reminder copy should feel like a gentle nudge, not an alarm.

### Random Start Flow

1. User clicks Random Start from Today or Tasks.
2. Nola suggests one startable task or next action.
3. User can start, skip, or ask for another suggestion.
4. Low-energy mode should prefer small tasks.

Acceptance:

- The suggestion is framed as optional support.
- The user is never punished for skipping.

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
| What is the smallest useful desktop MVP screen set? | Defines first implementation scope | Answered by the BL-002 screen set above |
| Should reminders be local-only in MVP? | Affects architecture and permissions | Default: yes |
| Should AI decomposition be planned now or deferred entirely? | Affects package boundaries | Default: plan interface only, defer implementation |

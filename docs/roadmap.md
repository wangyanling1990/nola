# Nola Roadmap

## Purpose

This roadmap keeps Nola focused: desktop MVP first, mobile second, sync third.

## Phase 1: Windows/macOS Desktop MVP

Goal: build a local-first desktop app that helps users capture, start, and manage tasks gently.

Primary capabilities:

- Electron desktop shell
- React + TypeScript renderer
- SQLite local storage
- Zustand state management
- Today home view
- Multi-level tasks
- Inspiration inbox
- Calendar or month view
- Fixed reminders
- Random start
- Low-energy task mode
- ADHD-friendly design system

Approved desktop MVP screen set:

| Screen | Phase 1 purpose |
| --- | --- |
| Today | Give the user a calm starting point and one visible next action |
| Tasks | Manage structured tasks, subtasks, status, next action, and energy level |
| Inbox | Capture messy thoughts before organizing them |
| Calendar | Orient tasks and reminders by date without full calendar sync |
| Reminders | Manage fixed local reminders |
| Random Start | Suggest one optional task or next action |
| Settings | Configure comfort, local data notes, and backup/export entry points |

Phase 1 flow boundaries:

- Today, Tasks, Inbox, Calendar, Reminders, and Random Start are implementation-planning baseline flows.
- Settings is included only for MVP comfort, local data, and backup/export controls.
- External calendar sync, accounts, cloud sync, AI decomposition, analytics, and productivity scoring remain out of scope.

Exit criteria:

- Desktop MVP flows are implemented and tested.
- Local data survives restart.
- Reminder behavior is verified on Windows and macOS.
- UI passes low-stimulation and accessibility review.
- Release checklist is complete.

## Phase 2: iOS/Android Mobile MVP

Goal: create a lightweight mobile companion after desktop foundations exist.

Primary capabilities:

- React Native + Expo app
- Shared `packages/core`, `packages/types`, and `packages/db-schema`
- Mobile SQLite storage
- Quick capture
- Today tasks
- Reminders
- Inspiration inbox
- Lightweight calendar
- Random start

Exit criteria:

- Mobile app reuses shared logic without forcing shared UI.
- Mobile reminders use platform-specific adapters.
- Local data model remains compatible with desktop.

## Phase 3: Multi-Device Sync

Goal: support accounts, cloud backup, and cross-device continuity.

Possible approaches:

- Supabase for faster MVP sync
- Node.js + PostgreSQL for long-term custom backend

Primary capabilities:

- Account system
- Cloud database
- Device management
- Sync status
- Conflict handling
- Automatic backup
- Cross-device reminders

## Now

| Item | Status | Notes |
| --- | --- | --- |
| Nola Codex execution system | Done | Project management and execution docs only |
| Desktop MVP screen set | Done | BL-002 defines the baseline screens and flows |
| Desktop MVP implementation planning | Ready | No business code yet |

## Next

| Item | Trigger |
| --- | --- |
| Write desktop MVP implementation plan | BL-002 screen set is approved and documented |
| Create monorepo scaffold | User explicitly requests business implementation |
| Define first data schema migration | User approves implementation scope |

## Later

| Item | Reason deferred |
| --- | --- |
| Mobile app implementation | Desktop MVP comes first |
| Cloud sync | Local-first MVP reduces complexity |
| AI decomposition implementation | Keep MVP focused; reserve `packages/ai` later |

## Decision Log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-06-02 | Desktop MVP first | User requested Windows/macOS first |
| 2026-06-02 | SQLite local-first | Supports offline, low-complexity MVP |
| 2026-06-02 | Share logic, not UI | Desktop and mobile interaction patterns differ |

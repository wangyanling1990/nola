# Nola Release Checklist

## Purpose

This checklist defines release readiness for Nola. Phase 1 release checks focus on Windows/macOS desktop MVP.

## Release Metadata

- Release name:
- Release owner:
- Target platforms: Windows, macOS
- Related PRD: `docs/prd.md`
- Related sprint: `tasks/sprint-001.md`

## Pre-Release Checks

| Check | Required | Status | Evidence |
| --- | --- | --- | --- |
| PRD scope confirmed | Yes | Pending |  |
| Roadmap phase confirmed | Yes | Pending |  |
| Architecture docs updated | Yes | Pending |  |
| Database schema docs updated | If data changed | Pending |  |
| Testing strategy followed | Yes | Pending |  |
| Design-system review completed | If UI changed | Pending |  |
| Windows smoke check completed | Desktop release | Pending |  |
| macOS smoke check completed | Desktop release | Pending |  |
| Local data backup or recovery path checked | Desktop release | Pending |  |
| Reminder behavior checked | If reminders changed | Pending |  |

## Desktop MVP Smoke Scenarios

| Scenario | Expected result | Evidence |
| --- | --- | --- |
| Launch app | App opens without crash |  |
| Capture task | Task appears and persists |  |
| Capture inbox item | Item appears and persists |  |
| Today view | Shows relevant tasks calmly |  |
| Random start | Suggests one startable item |  |
| Reminder | Local notification behavior works |  |
| Restart app | Local SQLite data remains |  |

## Risk Review

| Risk | Mitigation | Owner |
| --- | --- | --- |
| Local data loss | Backup/export and persistence tests |  |
| Reminder mismatch by platform | Separate Windows/macOS checks |  |
| Visual overload | Design-system review |  |
| Sync assumptions leaking into MVP | Confirm cloud sync remains out of scope |  |

## Rollback and Recovery

- Rollback trigger:
- Rollback owner:
- Recovery steps:
- Data backup location:
- User communication:

## Release Approval

| Role | Status | Notes |
| --- | --- | --- |
| Product | Pending |  |
| Engineering | Pending |  |
| QA | Pending |  |

## Post-Release Observation

Track:

- Crash reports
- Reminder failures
- Data persistence issues
- User friction around task start
- Feedback about pressure, tone, and visual load

# Nola Architecture

## Architecture Summary

Nola should evolve into a monorepo with separate desktop and mobile apps plus shared packages for domain logic, types, database schema, and design tokens. Phase 1 should remain desktop-only and local-first.

## Target Monorepo Shape

This is a future implementation target, not a directory structure to create during execution-system setup.

```text
nola/
  apps/
    desktop/              # Electron app for Windows/macOS
    mobile/               # React Native + Expo app for iOS/Android, phase 2
  packages/
    core/                 # Shared task, inbox, reminder, calendar, random-start logic
    types/                # Shared TypeScript domain types
    db-schema/            # Shared SQLite schema and migration definitions
    design-tokens/        # Shared colors, typography, spacing, radius, motion tokens
    ai/                   # Future AI task decomposition interfaces
    sync/                 # Future sync logic and conflict handling
```

## Desktop Architecture

| Layer | Direction | Responsibility |
| --- | --- | --- |
| Shell | Electron | Window, tray, native notifications, filesystem, platform integration |
| UI | React + TypeScript | Desktop screens and interactions |
| State | Zustand | Local UI and domain state coordination |
| Data | SQLite | Local persistence |
| Domain | Shared core package, when implemented | Task rules, inbox rules, reminders, calendar, random start |

Desktop-specific UI and platform behavior should stay in the desktop app. Shared logic should be extracted only when it is useful for mobile reuse.

## Mobile Architecture

Mobile is phase 2.

| Layer | Direction | Responsibility |
| --- | --- | --- |
| App | React Native + Expo | iOS/Android app shell |
| UI | Platform-specific React Native components | Mobile screens and interactions |
| State | Zustand | Mobile state coordination |
| Data | SQLite through Expo | Local persistence |
| Domain | Shared packages | Reuse business logic and schema |

## Shared Package Rules

Share:

- Domain models
- Type definitions
- Database schema definitions
- Reminder rules
- Calendar calculations
- Random start logic
- ADHD-friendly copy primitives
- Design tokens

Do not force-share:

- Desktop UI components
- Mobile UI components
- Native notification implementations
- Filesystem operations
- Window and tray behavior
- Platform permission flows

## Local-First Data Strategy

Phase 1 uses SQLite only. The schema should reserve fields that make later sync possible:

- `id`
- `created_at`
- `updated_at`
- `deleted_at`
- `device_id`
- `sync_status`
- `last_synced_at`
- `remote_id`

Cloud sync is not implemented in phase 1.

## Reminder Architecture

Reminder rules should be shared. Delivery should be platform-specific:

- Desktop adapter: Electron notifications and OS scheduling behavior
- Mobile adapter: Expo notifications and mobile permissions

## Future Sync Options

| Option | Fit |
| --- | --- |
| Supabase | Faster MVP sync, built-in auth and PostgreSQL |
| Node.js + PostgreSQL | More control for long-term commercial product |

## Architecture Quality Bar

- Desktop MVP remains simple and local-first.
- Shared packages exist only when they reduce duplication or prepare mobile reuse.
- UI is designed per platform.
- Future sync fields do not force sync implementation early.

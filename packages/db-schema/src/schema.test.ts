import test from "node:test";
import assert from "node:assert/strict";
import { reminderTable, syncReadyColumns, taskTable } from "./index.ts";

test("task schema includes sync-ready columns for future cloud sync", () => {
  for (const column of ["deleted_at", "device_id", "sync_status", "last_synced_at", "remote_id"]) {
    assert.ok(syncReadyColumns.includes(column));
    assert.ok(taskTable.columns.includes(column));
  }
});

test("task schema keeps next action and energy level as first-class fields", () => {
  assert.ok(taskTable.columns.includes("next_action"));
  assert.ok(taskTable.columns.includes("energy_level"));
});

test("reminder schema supports fixed routine reminders", () => {
  for (const column of ["title", "message", "time_of_day", "repeat_label", "enabled"]) {
    assert.ok(reminderTable.columns.includes(column));
  }
});

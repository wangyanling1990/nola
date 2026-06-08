import test from "node:test";
import assert from "node:assert/strict";
import { dismissReminder, getReminderMarkersForDate } from "./reminders.ts";
import type { NolaReminder } from "@nola/types";

const reminders: NolaReminder[] = [
  {
    id: "water",
    title: "喝水提醒",
    targetType: "routine",
    targetId: "routine-water",
    remindAt: "2026-06-04T10:30:00.000Z",
    repeatRule: "daily",
    deliveryStatus: "pending",
    createdAt: "2026-06-04T08:00:00.000Z",
    updatedAt: "2026-06-04T08:00:00.000Z"
  },
  {
    id: "eyes",
    title: "眼部休息",
    targetType: "routine",
    targetId: "routine-eyes",
    remindAt: "2026-06-05T15:00:00.000Z",
    deliveryStatus: "pending",
    createdAt: "2026-06-04T08:00:00.000Z",
    updatedAt: "2026-06-04T08:00:00.000Z"
  }
];

test("returns pending fixed reminders for a selected calendar date", () => {
  const markers = getReminderMarkersForDate(reminders, "2026-06-04");

  assert.deepEqual(
    markers.map((reminder) => reminder.id),
    ["water"]
  );
});

test("dismisses a reminder without deleting it", () => {
  const dismissed = dismissReminder(reminders[0], "2026-06-04T10:35:00.000Z");

  assert.equal(dismissed.deliveryStatus, "dismissed");
  assert.equal(dismissed.updatedAt, "2026-06-04T10:35:00.000Z");
  assert.equal(dismissed.id, reminders[0].id);
});

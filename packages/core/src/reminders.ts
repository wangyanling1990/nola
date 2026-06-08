import type { NolaReminder } from "@nola/types";

export function getReminderMarkersForDate(
  reminders: readonly NolaReminder[],
  date: string
): NolaReminder[] {
  return reminders.filter(
    (reminder) =>
      reminder.enabled !== false &&
      reminder.deliveryStatus === "pending" &&
      reminder.remindAt.slice(0, 10) === date
  );
}

export function dismissReminder(reminder: NolaReminder, now: string): NolaReminder {
  return {
    ...reminder,
    deliveryStatus: "dismissed",
    updatedAt: now
  };
}

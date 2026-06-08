export interface TableDefinition {
  name: string;
  columns: string[];
}

export const syncReadyColumns = [
  "deleted_at",
  "device_id",
  "sync_status",
  "last_synced_at",
  "remote_id"
] as const;

export const taskTable: TableDefinition = {
  name: "tasks",
  columns: [
    "id",
    "title",
    "notes",
    "status",
    "parent_id",
    "project_id",
    "energy_level",
    "next_action",
    "due_date",
    "scheduled_for",
    "created_at",
    "updated_at",
    ...syncReadyColumns
  ]
};

export const inboxItemTable: TableDefinition = {
  name: "inbox_items",
  columns: [
    "id",
    "content",
    "source",
    "converted_task_id",
    "status",
    "created_at",
    "updated_at",
    ...syncReadyColumns
  ]
};

export const reminderTable: TableDefinition = {
  name: "reminders",
  columns: [
    "id",
    "title",
    "message",
    "target_type",
    "target_id",
    "remind_at",
    "time_of_day",
    "repeat_rule",
    "repeat_label",
    "enabled",
    "delivery_status",
    "created_at",
    "updated_at"
  ]
};

export const nolaTables = [taskTable, inboxItemTable, reminderTable] as const;

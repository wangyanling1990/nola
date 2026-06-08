export type NolaTaskStatus = "active" | "done" | "paused" | "archived";
export type NolaEnergyLevel = "low" | "medium" | "high";

export interface SyncReadyFields {
  deletedAt?: string | null;
  deviceId?: string | null;
  syncStatus?: "local" | "pending" | "synced" | "conflict";
  lastSyncedAt?: string | null;
  remoteId?: string | null;
}

export interface NolaTask extends SyncReadyFields {
  id: string;
  title: string;
  notes?: string;
  status: NolaTaskStatus;
  parentId?: string | null;
  projectId?: string | null;
  energyLevel: NolaEnergyLevel;
  nextAction: string;
  dueDate?: string | null;
  scheduledFor?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NolaInboxItem extends SyncReadyFields {
  id: string;
  content: string;
  source: "manual" | "import" | "ai" | "other";
  convertedTaskId?: string | null;
  status: "unprocessed" | "converted" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface NolaReminder {
  id: string;
  title?: string;
  message?: string;
  targetType: "task" | "inbox_item" | "routine";
  targetId: string;
  remindAt: string;
  repeatRule?: string | null;
  repeatLabel?: string | null;
  timeOfDay?: string | null;
  enabled?: boolean;
  deliveryStatus: "pending" | "delivered" | "dismissed";
  createdAt: string;
  updatedAt: string;
}

export interface RandomStartSuggestion {
  task: NolaTask;
  nextAction: string;
  reason: string;
}

export interface InspirationStep {
  title: string;
  nextAction: string;
  energyLevel: NolaEnergyLevel;
}

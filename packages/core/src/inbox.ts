import type { NolaInboxItem, NolaTask } from "@nola/types";

export interface CreateTaskFromInboxOptions {
  id: string;
  now: string;
}

export function createTaskFromInboxItem(
  item: NolaInboxItem,
  options: CreateTaskFromInboxOptions
): NolaTask {
  return {
    id: options.id,
    title: item.content,
    notes: `来自灵感箱：${item.content}`,
    status: "active",
    energyLevel: "low",
    nextAction: "先写一个很小的下一步",
    createdAt: options.now,
    updatedAt: options.now
  };
}

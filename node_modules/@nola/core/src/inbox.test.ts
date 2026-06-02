import test from "node:test";
import assert from "node:assert/strict";
import { createTaskFromInboxItem } from "./inbox.ts";
import type { NolaInboxItem } from "@nola/types";

const inboxItem: NolaInboxItem = {
  id: "inbox-1",
  content: "把随机启动建议做得更温柔",
  source: "manual",
  status: "unprocessed",
  createdAt: "2026-06-02T00:00:00.000Z",
  updatedAt: "2026-06-02T00:00:00.000Z"
};

test("creates a gentle task from an inbox item without losing the original text", () => {
  const task = createTaskFromInboxItem(inboxItem, {
    id: "task-from-inbox",
    now: "2026-06-02T10:00:00.000Z"
  });

  assert.equal(task.id, "task-from-inbox");
  assert.equal(task.title, inboxItem.content);
  assert.equal(task.status, "active");
  assert.equal(task.energyLevel, "low");
  assert.equal(task.nextAction, "先写一个很小的下一步");
});

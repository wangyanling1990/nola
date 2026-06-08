import test from "node:test";
import assert from "node:assert/strict";
import { createTasksFromInspiration, decomposeInspiration } from "./inspiration.ts";
import type { NolaInboxItem } from "@nola/types";

const now = "2026-06-04T09:00:00.000Z";

test("decomposes a video-account inspiration into gentle concrete steps", () => {
  const steps = decomposeInspiration("想开一个视频账号，但不知道从哪开始");

  assert.deepEqual(
    steps.map((step) => step.title),
    ["先写下账号主题", "找 3 个参考账号", "写第一个视频标题", "只拍 30 秒测试内容"]
  );
  assert.ok(steps.every((step) => step.energyLevel === "low"));
});

test("creates ordered low-energy tasks from an inspiration inbox item", () => {
  const item: NolaInboxItem = {
    id: "inbox-video",
    content: "想开一个视频账号，但不知道从哪开始",
    source: "manual",
    status: "unprocessed",
    createdAt: now,
    updatedAt: now
  };

  const tasks = createTasksFromInspiration(item, {
    now,
    parentTaskId: "task-video"
  });

  assert.equal(tasks[0].id, "task-video");
  assert.equal(tasks[0].title, item.content);
  assert.equal(tasks[0].nextAction, "先写下账号主题");
  assert.equal(tasks[1].parentId, "task-video");
  assert.equal(tasks[1].title, "先写下账号主题");
  assert.equal(tasks[4].title, "只拍 30 秒测试内容");
});

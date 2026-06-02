import test from "node:test";
import assert from "node:assert/strict";
import { pickRandomStart } from "./random-start.ts";
import type { NolaTask } from "@nola/types";

const tasks: NolaTask[] = [
  {
    id: "task-large",
    title: "整理整个项目计划",
    status: "active",
    energyLevel: "high",
    nextAction: "打开计划文档",
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z"
  },
  {
    id: "task-small",
    title: "写下一个很小的下一步",
    status: "active",
    energyLevel: "low",
    nextAction: "写一句话",
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z"
  },
  {
    id: "task-done",
    title: "已经完成的任务",
    status: "done",
    energyLevel: "low",
    nextAction: "不用再做",
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z"
  }
];

test("prefers active low-energy tasks when low energy mode is on", () => {
  const suggestion = pickRandomStart(tasks, { lowEnergyMode: true });

  assert.equal(suggestion?.task.id, "task-small");
  assert.equal(suggestion?.nextAction, "写一句话");
  assert.match(suggestion?.reason ?? "", /低能量/);
});

test("returns no suggestion when there are no active tasks", () => {
  const suggestion = pickRandomStart(tasks.filter((task) => task.status === "done"), {
    lowEnergyMode: true
  });

  assert.equal(suggestion, null);
});

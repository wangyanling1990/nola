import test from "node:test";
import assert from "node:assert/strict";
import { getTodayFocusTasks } from "./today.ts";
import type { NolaTask } from "@nola/types";

const tasks: NolaTask[] = [
  {
    id: "today-low",
    title: "低能量今天任务",
    status: "active",
    energyLevel: "low",
    nextAction: "写一句话",
    scheduledFor: "2026-06-02",
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z"
  },
  {
    id: "today-medium",
    title: "中能量今天任务",
    status: "active",
    energyLevel: "medium",
    nextAction: "打开文档",
    scheduledFor: "2026-06-02",
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z"
  },
  {
    id: "done-today",
    title: "已完成今天任务",
    status: "done",
    energyLevel: "low",
    nextAction: "不用显示",
    scheduledFor: "2026-06-02",
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z"
  },
  {
    id: "tomorrow",
    title: "明天任务",
    status: "active",
    energyLevel: "low",
    nextAction: "明天再说",
    scheduledFor: "2026-06-03",
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z"
  }
];

test("returns active tasks scheduled for today", () => {
  const focus = getTodayFocusTasks(tasks, "2026-06-02");

  assert.deepEqual(
    focus.map((task) => task.id),
    ["today-low", "today-medium"]
  );
});

test("low energy mode prioritizes low-energy tasks first", () => {
  const focus = getTodayFocusTasks(tasks, "2026-06-02", { lowEnergyMode: true });

  assert.deepEqual(
    focus.map((task) => task.id),
    ["today-low", "today-medium"]
  );
});

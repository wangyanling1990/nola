import type { NolaTask, RandomStartSuggestion } from "@nola/types";

export interface RandomStartOptions {
  lowEnergyMode?: boolean;
}

export function pickRandomStart(
  tasks: readonly NolaTask[],
  options: RandomStartOptions = {}
): RandomStartSuggestion | null {
  const activeTasks = tasks.filter((task) => task.status === "active");

  if (activeTasks.length === 0) {
    return null;
  }

  const candidates = options.lowEnergyMode
    ? activeTasks.filter((task) => task.energyLevel === "low")
    : activeTasks;

  const pool = candidates.length > 0 ? candidates : activeTasks;
  const task = pool[0];

  return {
    task,
    nextAction: task.nextAction,
    reason:
      options.lowEnergyMode && task.energyLevel === "low"
        ? "低能量模式下，先选一个轻一点的开始。"
        : "先从一个清楚的下一步开始。"
  };
}

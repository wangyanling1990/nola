import type { NolaTask } from "@nola/types";

export interface TodayFocusOptions {
  lowEnergyMode?: boolean;
}

export function getTodayFocusTasks(
  tasks: readonly NolaTask[],
  date: string,
  options: TodayFocusOptions = {}
): NolaTask[] {
  const focus = tasks.filter(
    (task) => task.status === "active" && task.scheduledFor === date
  );

  if (!options.lowEnergyMode) {
    return focus;
  }

  return [...focus].sort((left, right) => {
    if (left.energyLevel === right.energyLevel) {
      return 0;
    }

    return left.energyLevel === "low" ? -1 : 1;
  });
}

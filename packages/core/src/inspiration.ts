import type { InspirationStep, NolaInboxItem, NolaTask } from "@nola/types";

export interface CreateTasksFromInspirationOptions {
  now: string;
  parentTaskId: string;
}

const videoAccountSteps: InspirationStep[] = [
  {
    title: "先写下账号主题",
    nextAction: "用一句话写下这个账号想陪伴谁",
    energyLevel: "low"
  },
  {
    title: "找 3 个参考账号",
    nextAction: "只收藏链接，不急着分析",
    energyLevel: "low"
  },
  {
    title: "写第一个视频标题",
    nextAction: "先写一个不完美标题",
    energyLevel: "low"
  },
  {
    title: "只拍 30 秒测试内容",
    nextAction: "打开相机，拍一段可以删掉的测试",
    energyLevel: "low"
  }
];

const genericSteps: InspirationStep[] = [
  {
    title: "写下想完成的样子",
    nextAction: "用一句话描述完成后会看到什么",
    energyLevel: "low"
  },
  {
    title: "找一个最小入口",
    nextAction: "选一个 5 分钟内能开始的动作",
    energyLevel: "low"
  },
  {
    title: "准备一个必要材料",
    nextAction: "只打开或拿出一个会用到的东西",
    energyLevel: "low"
  },
  {
    title: "试做 10 分钟",
    nextAction: "先试试看，不要求做完",
    energyLevel: "low"
  }
];

export function decomposeInspiration(content: string): InspirationStep[] {
  const normalized = content.trim();

  if (/视频|账号|短视频|内容/.test(normalized)) {
    return videoAccountSteps;
  }

  return genericSteps;
}

export function createTasksFromInspiration(
  item: NolaInboxItem,
  options: CreateTasksFromInspirationOptions
): NolaTask[] {
  const steps = decomposeInspiration(item.content);
  const parent: NolaTask = {
    id: options.parentTaskId,
    title: item.content,
    notes: `来自灵感拆解：${item.content}`,
    status: "active",
    energyLevel: "low",
    nextAction: steps[0]?.title ?? "写下一个很小的下一步",
    scheduledFor: options.now.slice(0, 10),
    createdAt: options.now,
    updatedAt: options.now
  };

  const children = steps.map<NolaTask>((step, index) => ({
    id: `${options.parentTaskId}-step-${index + 1}`,
    title: step.title,
    notes: `拆解自：${item.content}`,
    status: "active",
    parentId: options.parentTaskId,
    energyLevel: step.energyLevel,
    nextAction: step.nextAction,
    scheduledFor: options.now.slice(0, 10),
    createdAt: options.now,
    updatedAt: options.now
  }));

  return [parent, ...children];
}

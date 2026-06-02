import React from "react";
import { createRoot } from "react-dom/client";
import { create } from "zustand";
import { createTaskFromInboxItem, getTodayFocusTasks, pickRandomStart } from "@nola/core";
import type { NolaInboxItem, NolaTask } from "@nola/types";
import "./styles.css";

type Screen = "today" | "tasks" | "inbox" | "calendar" | "reminders" | "random" | "settings";

interface DesktopState {
  activeScreen: Screen;
  lowEnergyMode: boolean;
  tasks: NolaTask[];
  inbox: NolaInboxItem[];
  setScreen: (screen: Screen) => void;
  toggleLowEnergyMode: () => void;
  convertFirstInboxItem: () => void;
}

const now = "2026-06-02T00:00:00.000Z";

const starterTasks: NolaTask[] = [
  {
    id: "task-1",
    title: "整理今天真正要开始的一件事",
    notes: "先不要计划一整天，只选一个温柔入口。",
    status: "active",
    energyLevel: "low",
    nextAction: "写下一句话说明现在想开始什么",
    scheduledFor: "2026-06-02",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "task-2",
    title: "检查桌面端 MVP 页面集合",
    notes: "确认 Today、Tasks、Inbox、Calendar、Reminders、Random Start、Settings 都有位置。",
    status: "active",
    energyLevel: "medium",
    nextAction: "打开 PRD 的页面集合段落",
    scheduledFor: "2026-06-02",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "task-3",
    title: "为本地 SQLite 设计第一版样例数据",
    status: "paused",
    energyLevel: "high",
    nextAction: "列出 tasks 表的最小字段",
    createdAt: now,
    updatedAt: now
  }
];

const starterInbox: NolaInboxItem[] = [
  {
    id: "inbox-1",
    content: "也许 Random Start 可以解释为什么推荐这个任务。",
    source: "manual",
    status: "unprocessed",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "inbox-2",
    content: "提醒文案要像轻轻碰一下肩膀，而不是闹钟。",
    source: "manual",
    status: "unprocessed",
    createdAt: now,
    updatedAt: now
  }
];

const useDesktopStore = create<DesktopState>((set) => ({
  activeScreen: "today",
  lowEnergyMode: true,
  tasks: starterTasks,
  inbox: starterInbox,
  setScreen: (screen) => set({ activeScreen: screen }),
  toggleLowEnergyMode: () => set((state) => ({ lowEnergyMode: !state.lowEnergyMode })),
  convertFirstInboxItem: () =>
    set((state) => {
      const [firstItem, ...remainingInbox] = state.inbox;

      if (!firstItem) {
        return state;
      }

      const task = createTaskFromInboxItem(firstItem, {
        id: `task-from-${firstItem.id}`,
        now
      });

      return {
        tasks: [task, ...state.tasks],
        inbox: remainingInbox
      };
    })
}));

const screens: Array<{ id: Screen; label: string; hint: string }> = [
  { id: "today", label: "Today", hint: "先看现在能开始什么" },
  { id: "tasks", label: "Tasks", hint: "结构化整理" },
  { id: "inbox", label: "Inbox", hint: "先捕捉，稍后整理" },
  { id: "calendar", label: "Calendar", hint: "按日期定位" },
  { id: "reminders", label: "Reminders", hint: "本地轻提醒" },
  { id: "random", label: "Random Start", hint: "帮你轻轻开始" },
  { id: "settings", label: "Settings", hint: "舒适度和本地数据" }
];

function App() {
  const { activeScreen, setScreen } = useDesktopStore();

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Nola screens">
        <div className="brand">
          <span className="brand-mark">N</span>
          <div>
            <h1>Nola</h1>
            <p>不催你，只轻轻帮你开始。</p>
          </div>
        </div>
        <nav className="screen-nav">
          {screens.map((screen) => (
            <button
              className={screen.id === activeScreen ? "nav-item active" : "nav-item"}
              key={screen.id}
              onClick={() => setScreen(screen.id)}
              type="button"
            >
              <span>{screen.label}</span>
              <small>{screen.hint}</small>
            </button>
          ))}
        </nav>
      </aside>
      <section className="workspace">
        <Header />
        <ScreenContent />
      </section>
    </main>
  );
}

function Header() {
  const { lowEnergyMode, toggleLowEnergyMode } = useDesktopStore();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Desktop MVP shell</p>
        <h2>今天先从一个很小的动作开始</h2>
      </div>
      <button className="mode-toggle" onClick={toggleLowEnergyMode} type="button">
        {lowEnergyMode ? "低能量模式已开启" : "开启低能量模式"}
      </button>
    </header>
  );
}

function ScreenContent() {
  const activeScreen = useDesktopStore((state) => state.activeScreen);

  switch (activeScreen) {
    case "tasks":
      return <TasksScreen />;
    case "inbox":
      return <InboxScreen />;
    case "calendar":
      return <CalendarScreen />;
    case "reminders":
      return <RemindersScreen />;
    case "random":
      return <RandomStartScreen />;
    case "settings":
      return <SettingsScreen />;
    default:
      return <TodayScreen />;
  }
}

function TodayScreen() {
  const { tasks, inbox, lowEnergyMode } = useDesktopStore();
  const suggestion = pickRandomStart(tasks, { lowEnergyMode });
  const visibleTasks = getTodayFocusTasks(tasks, "2026-06-02", { lowEnergyMode });

  return (
    <div className="content-grid">
      <section className="panel hero-panel">
        <p className="eyebrow">Today</p>
        <h3>不用整理完所有事，先看这一个小入口。</h3>
        <p>{suggestion?.nextAction ?? "现在没有活跃任务，可以先捕捉一个想法。"}</p>
        <button className="primary-action" type="button">从这里开始</button>
      </section>
      <section className="panel">
        <h3>今日重点</h3>
        <TaskList tasks={visibleTasks} />
      </section>
      <section className="panel">
        <h3>灵感箱</h3>
        <p className="soft-copy">这里可以乱一点，整理可以晚点再说。</p>
        <ul className="inbox-list">
          {inbox.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function TasksScreen() {
  const tasks = useDesktopStore((state) => state.tasks);

  return (
    <section className="panel wide">
      <p className="eyebrow">Tasks</p>
      <h3>任务可以大，但下一步要小。</h3>
      <TaskList tasks={tasks} />
    </section>
  );
}

function InboxScreen() {
  const inbox = useDesktopStore((state) => state.inbox);
  const convertFirstInboxItem = useDesktopStore((state) => state.convertFirstInboxItem);

  return (
    <section className="panel wide">
      <p className="eyebrow">Inbox</p>
      <h3>先放进来，不急着分类。</h3>
      <div className="capture-box">
        <span>快速捕捉：写一句就够了。</span>
        <button className="secondary-action" onClick={convertFirstInboxItem} type="button">
          把第一条变成小任务
        </button>
      </div>
      <ul className="inbox-list">
        {inbox.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </section>
  );
}

function CalendarScreen() {
  return (
    <section className="panel wide">
      <p className="eyebrow">Calendar</p>
      <h3>日历只是帮你定位，不是催促你追赶。</h3>
      <div className="calendar-strip">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div className={index === 1 ? "day-card today" : "day-card"} key={day}>
            <span>{day}</span>
            <strong>{index + 1}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function RemindersScreen() {
  return (
    <section className="panel wide">
      <p className="eyebrow">Reminders</p>
      <h3>提醒应该像轻轻碰一下肩膀。</h3>
      <div className="reminder-card">
        <span>今天 16:30</span>
        <strong>回来看一眼“写下一句话”</strong>
        <p>本地提醒，暂不做跨设备同步。</p>
      </div>
    </section>
  );
}

function RandomStartScreen() {
  const { tasks, lowEnergyMode } = useDesktopStore();
  const suggestion = pickRandomStart(tasks, { lowEnergyMode });

  return (
    <section className="panel wide">
      <p className="eyebrow">Random Start</p>
      <h3>如果不知道从哪开始，Nola 可以轻轻选一个。</h3>
      {suggestion ? (
        <div className="suggestion">
          <span>{suggestion.reason}</span>
          <strong>{suggestion.task.title}</strong>
          <p>{suggestion.nextAction}</p>
          <button className="primary-action" type="button">就做这一小步</button>
        </div>
      ) : (
        <p>现在没有可建议的活跃任务。</p>
      )}
    </section>
  );
}

function SettingsScreen() {
  return (
    <section className="panel wide">
      <p className="eyebrow">Settings</p>
      <h3>把 Nola 调成更舒服的节奏。</h3>
      <div className="settings-grid">
        <div>低刺激视觉：开启</div>
        <div>本地 SQLite：第一阶段目标</div>
        <div>云同步：后续阶段</div>
        <div>备份/导出：MVP 规划项</div>
      </div>
    </section>
  );
}

function TaskList({ tasks }: { tasks: NolaTask[] }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <div>
            <strong>{task.title}</strong>
            <span>{task.nextAction}</span>
          </div>
          <em>{task.energyLevel}</em>
        </li>
      ))}
    </ul>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

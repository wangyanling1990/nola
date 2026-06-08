import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import "./styles.css";

type Screen = "today" | "brain" | "tasks" | "task-detail" | "calendar" | "random" | "inspiration" | "reminders";
type ReminderState = "pending" | "soon" | "done";
type FocusSoundId = "rain" | "ocean" | "fire" | "cafe";

type Task = {
  id: string;
  title: string;
  energy: "高精力" | "中等精力" | "低精力";
  duration: string;
  done: boolean;
};

type Reminder = {
  icon: string;
  title: string;
  detail: string;
  state?: ReminderState;
};

const navItems: Array<{ id: Exclude<Screen, "task-detail">; icon: string; label: string }> = [
  { id: "today", icon: "today", label: "今日" },
  { id: "brain", icon: "psychology", label: "脑内清空" },
  { id: "tasks", icon: "format_list_bulleted", label: "任务" },
  { id: "calendar", icon: "calendar_month", label: "日历" },
  { id: "random", icon: "shuffle", label: "随机启动" },
  { id: "inspiration", icon: "lightbulb", label: "灵感拆解" },
  { id: "reminders", icon: "notifications_active", label: "固定提醒" }
];

const gentleReminders: Reminder[] = [
  { icon: "water_drop", title: "喝水", detail: "现在可以喝 250ml", state: "pending" },
  { icon: "visibility", title: "眼部休息 (20/20/20)", detail: "12 分钟后", state: "soon" },
  { icon: "medication", title: "早晨维他命", detail: "已于 8:15am 服用", state: "done" }
];

const initialTasks: Task[] = [
  { id: "report", title: "撰写季度汇报草稿", energy: "高精力", duration: "45 min", done: false },
  { id: "meeting", title: "整理会议记录并分发", energy: "中等精力", duration: "20 min", done: false },
  { id: "slack", title: "回复团队 Slack 消息", energy: "低精力", duration: "10 min", done: false },
  { id: "agenda", title: "确认明天会议的 3 个议题", energy: "中等精力", duration: "15 min", done: false },
  { id: "desktop", title: "归档桌面上的 5 个文件", energy: "低精力", duration: "8 min", done: false },
  { id: "visual", title: "列出品牌视觉初稿的下一步", energy: "高精力", duration: "30 min", done: false }
];

const focusSounds: Array<{ id: FocusSoundId; icon: string; label: string }> = [
  { id: "rain", icon: "rainy", label: "森林细雨" },
  { id: "ocean", icon: "waves", label: "柔和海浪" },
  { id: "fire", icon: "local_fire_department", label: "安静壁炉" },
  { id: "cafe", icon: "local_cafe", label: "咖啡馆" }
];

const randomTasks = [
  { icon: "cleaning_services", title: "清理桌面 3 个杂物", detail: "只需要简单移动，让眼前稍微清净一点。" },
  { icon: "local_drink", title: "喝一杯温水", detail: "给自己一个生理上的微小补给。" },
  { icon: "mail", title: "整理 5 封未读邮件", detail: "只标记或归档，不需要马上回复。" },
  { icon: "edit_note", title: "记录此刻的 3 个杂念", detail: "写下来，然后暂时放下它们。" }
];

const inspirationSteps = [
  ["先写下账号主题", "明确核心受众和内容方向"],
  ["找 3 个参考账号", "学习他们的内容逻辑"],
  ["写第一个视频标题", "不要纠结内容，先起名字"],
  ["只拍 30 秒测试内容", "快速开始，不要追求完美"]
];

const brainGroups = [
  {
    icon: "checklist",
    title: "任务",
    english: "Tasks",
    detail: "从你的文字中识别出的待办事项",
    tone: "stone"
  },
  {
    icon: "lightbulb",
    title: "灵感",
    english: "Inspiration",
    detail: "捕捉到的创意和闪现的火花",
    tone: "prism"
  },
  {
    icon: "water",
    title: "担心",
    english: "Worries",
    detail: "释放压力，记录你的所有焦虑",
    tone: "water"
  },
  {
    icon: "schedule",
    title: "以后再说",
    english: "Later",
    detail: "非紧急项目，暂存在归档处",
    tone: "later"
  },
  {
    icon: "delete_sweep",
    title: "可以删除",
    english: "Can Delete",
    detail: "可能是重复或已经过时的内容",
    tone: "delete"
  }
];

function App() {
  const [screen, setScreen] = useState<Screen>("today");
  const compact = screen !== "today" && screen !== "brain";

  function navigate(next: Exclude<Screen, "task-detail">) {
    setScreen(next);
  }

  return (
    <div className={compact ? "prototype-shell compact-shell" : "prototype-shell"}>
      <Sidebar activeScreen={screen} compact={compact} onNavigate={navigate} />
      <main className="prototype-main">
        {screen === "today" ? <TodayPage onNavigate={navigate} /> : null}
        {screen === "brain" ? <BrainDumpPage onNavigate={navigate} /> : null}
        {screen === "tasks" ? <TasksPage onOpenTask={() => setScreen("task-detail")} /> : null}
        {screen === "task-detail" ? <TaskDetailPage onBack={() => setScreen("tasks")} /> : null}
        {screen === "calendar" ? <CalendarPage /> : null}
        {screen === "random" ? <RandomPage /> : null}
        {screen === "inspiration" ? <InspirationPage /> : null}
        {screen === "reminders" ? <RemindersPage /> : null}
      </main>
    </div>
  );
}

function Sidebar({
  activeScreen,
  compact,
  onNavigate
}: {
  activeScreen: Screen;
  compact: boolean;
  onNavigate: (screen: Exclude<Screen, "task-detail">) => void;
}) {
  const activeNav = activeScreen === "task-detail" ? "tasks" : activeScreen;

  return (
    <aside className={compact ? "left-sidebar compact" : "left-sidebar"} aria-label="主导航">
      <div className="brand-block">
        <div className="brand-avatar" aria-hidden="true">N</div>
        <div>
          <h1>Nola</h1>
          <p>从最小的一步开始</p>
        </div>
      </div>
      <nav className="main-nav">
        {navItems.map((item) => (
          <button
            aria-label={item.label}
            className={item.id === activeNav ? "nav-link active" : "nav-link"}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            type="button"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="new-task-button" onClick={() => onNavigate("tasks")} type="button">
          <span className="material-symbols-outlined">add</span>
          新建任务
        </button>
        <button className="help-link" type="button">
          <span className="material-symbols-outlined">help</span>
          帮助
        </button>
      </div>
    </aside>
  );
}

function TodayPage({ onNavigate }: { onNavigate: (screen: Exclude<Screen, "task-detail">) => void }) {
  const [brainDump, setBrainDump] = useState("");
  const [saved, setSaved] = useState(false);
  const currentDate = useMemo(
    () => new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(new Date(2026, 5, 6)),
    []
  );

  function saveBrainDump() {
    if (!brainDump.trim()) return;
    setSaved(true);
    setBrainDump("");
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <>
      <section className="dashboard-center" aria-label="今日看板">
        <header className="hero-row">
          <div>
            <h2>早安，Alex</h2>
            <p>你今天处于理想状态，保持节奏，稳步前进。</p>
          </div>
          <span className="date-label">{currentDate}</span>
        </header>
        <MomentumCard />
        <section className="brain-card">
          <div className="card-heading">
            <span className="material-symbols-outlined">psychology_alt</span>
            <h3>快速脑内清空</h3>
          </div>
          <textarea
            aria-label="快速脑内清空"
            onChange={(event) => {
              setBrainDump(event.target.value);
              setSaved(false);
            }}
            placeholder="此时此刻在想什么？先记录下来，稍后再处理。"
            rows={3}
            value={brainDump}
          />
          <div className="brain-actions">
            <div className="icon-actions">
              <IconButton icon="attachment" label="添加附件" />
              <IconButton icon="label" label="添加标签" />
            </div>
            <button className={saved ? "save-button saved" : "save-button"} onClick={saveBrainDump} type="button">
              <span className="material-symbols-outlined">{saved ? "check" : "save"}</span>
              {saved ? "已存入" : "存入灵感箱"}
            </button>
          </div>
        </section>
        <section className="card-grid" aria-label="今日卡片">
          <article className="starting-card">
            <div className="card-top-row">
              <span className="card-icon material-symbols-outlined">bolt</span>
              <span className="time-pill">10 分钟</span>
            </div>
            <div>
              <p className="section-kicker">最佳起点</p>
              <h3>查看并处理 5 封非紧急邮件</h3>
              <p>低能耗，高回报。先让大脑转动起来。</p>
            </div>
            <button className="text-button" onClick={() => onNavigate("tasks")} type="button">
              立即开始 <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </article>
          <DailyPulseCard />
        </section>
      </section>
      <TodayRail onNavigate={onNavigate} />
    </>
  );
}

function MomentumCard() {
  return (
    <section className="momentum-card">
      <div className="momentum-title-row">
        <span>今日动力</span>
        <strong>理想区</strong>
      </div>
      <div className="momentum-track" aria-label="今日动力 65%">
        <span />
        <i />
      </div>
      <div className="track-labels">
        <span>启动中</span><span>专注巅峰</span><span>休息与回顾</span>
      </div>
    </section>
  );
}

function DailyPulseCard() {
  return (
    <article className="pulse-card">
      <div className="pulse-title">
        <div><span className="material-symbols-outlined">monitoring</span><h3>每日脉搏</h3></div>
        <span className="material-symbols-outlined more-icon">more_vert</span>
      </div>
      <div className="pulse-bars" aria-hidden="true">
        <span className="bar-a" /><span className="bar-b" /><span className="bar-c" /><span className="bar-d" /><span className="bar-e" />
      </div>
      <div className="pulse-labels"><span>8am</span><span>12pm</span><span>4pm</span><span>8pm</span></div>
    </article>
  );
}

function TodayRail({ onNavigate }: { onNavigate: (screen: Exclude<Screen, "task-detail">) => void }) {
  return (
    <aside className="right-rail today-rail" aria-label="今日状态和提醒">
      <section className="status-section">
        <h3>今日状态</h3>
        <div className="focus-card">
          <div>
            <strong>45 分钟</strong>
            <p><span className="material-symbols-outlined">timer</span>累计专注时长</p>
          </div>
          <span className="material-symbols-outlined watermark">track_changes</span>
        </div>
      </section>
      <section className="reminder-section">
        <div className="rail-heading">
          <h3>温和提醒</h3>
          <button onClick={() => onNavigate("reminders")} type="button">编辑</button>
        </div>
        <ReminderList reminders={gentleReminders} />
      </section>
      <section className="body-check-section">
        <div className="body-check-card">
          <div className="breath-circle"><span className="material-symbols-outlined">self_improvement</span></div>
          <div><h4>身体检查</h4><p>转动肩膀，做一次深呼吸。</p></div>
          <button type="button">1 分钟拉伸引导 <span className="material-symbols-outlined">play_arrow</span></button>
        </div>
        <p className="quote">“专注是一种资源，而非负担。请温柔地对待今天的节奏。”</p>
      </section>
    </aside>
  );
}

function BrainDumpPage({
  onNavigate
}: {
  onNavigate: (screen: Exclude<Screen, "task-detail">) => void;
}) {
  const [draft, setDraft] = useState("");
  const [classified, setClassified] = useState(false);
  const [formatting, setFormatting] = useState(false);

  function openGroup(title: string) {
    if (title === "任务") {
      onNavigate("tasks");
      return;
    }

    if (title === "灵感") {
      onNavigate("inspiration");
      return;
    }

    if (title === "以后再说") {
      onNavigate("calendar");
      return;
    }

    if (title === "可以删除") {
      setDraft("");
      setClassified(false);
    }
  }

  return (
    <section className="brain-dump-page page-center full-width-page">
      <div className="brain-dump-content">
        <header className="brain-dump-heading">
          <p>先不用想完整，写下来就好。</p>
        </header>

        <section className="writing-area">
          <div className="writing-status">
            <div className="calm-scene" aria-hidden="true">
              <span className="material-symbols-outlined">landscape</span>
            </div>
            <div>
              <strong>当前正在倾倒...</strong>
              <span>此刻，这里只有你和你的想法。</span>
            </div>
          </div>
          <textarea
            autoFocus
            className={formatting ? "brain-dump-textarea formatted" : "brain-dump-textarea"}
            onChange={(event) => {
              setDraft(event.target.value);
              setClassified(false);
            }}
            placeholder="在这里输入你脑海中的任何想法，无论是明天的清单、一闪而过的创意，还是一点点小担忧..."
            value={draft}
          />
          <div className="writing-toolbar">
            <div>
              <button
                aria-label="文本格式"
                className={formatting ? "active" : ""}
                onClick={() => setFormatting((value) => !value)}
                title="文本格式"
                type="button"
              >
                <span className="material-symbols-outlined">format_size</span>
              </button>
              <button aria-label="添加附件" title="添加附件" type="button">
                <span className="material-symbols-outlined">attachment</span>
              </button>
              <button aria-label="语音录入" title="语音录入" type="button">
                <span className="material-symbols-outlined">mic</span>
              </button>
              <button aria-label="AI 灵感" className="ai-tool" title="AI 灵感" type="button">
                <span className="material-symbols-outlined">auto_awesome</span>
              </button>
            </div>
            <div className="writing-save-actions">
              <span>{draft ? "已实时保存至本地" : "写下后会实时保存"}</span>
              <button
                className={classified ? "classified" : ""}
                disabled={!draft.trim()}
                onClick={() => setClassified(true)}
                type="button"
              >
                {classified ? "已完成分类" : "智能分类"}
              </button>
            </div>
          </div>
        </section>

        <section className="brain-group-section">
          <div className="brain-group-heading">
            <h2>
              <span className="material-symbols-outlined">psychology_alt</span>
              AI 智能分组建议
            </h2>
            <button onClick={() => setClassified(true)} type="button">查看全部建议 →</button>
          </div>
          <div className={classified ? "brain-group-grid classified" : "brain-group-grid"}>
            {brainGroups.map((group, index) => (
              <button
                className={`brain-group-card ${group.tone}`}
                key={group.title}
                onClick={() => openGroup(group.title)}
                style={{ animationDelay: `${index * 60}ms` }}
                type="button"
              >
                <div className="brain-group-visual">
                  <span className="material-symbols-outlined">{group.icon}</span>
                </div>
                <div>
                  <strong>{group.title} <span>({group.english})</span></strong>
                  <p>{classified ? `已识别 ${index + 1} 条相关内容` : group.detail}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function TasksPage({ onOpenTask }: { onOpenTask: () => void }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const [focusSound, setFocusSound] = useState<FocusSoundId>("rain");
  const [focusPlaying, setFocusPlaying] = useState(false);
  const audioRef = useRef<{ context: AudioContext; source: AudioBufferSourceNode } | null>(null);
  const visibleTasks = tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));
  const selectedSound = focusSounds.find((sound) => sound.id === focusSound) ?? focusSounds[0];

  useEffect(() => () => {
    audioRef.current?.source.stop();
    void audioRef.current?.context.close();
  }, []);

  function stopFocusSound() {
    const current = audioRef.current;
    audioRef.current = null;
    if (current) {
      current.source.stop();
      void current.context.close();
    }
  }

  function startFocusSound(soundId: FocusSoundId) {
    stopFocusSound();

    const context = new AudioContext();
    const duration = 3;
    const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
    const channel = buffer.getChannelData(0);

    for (let index = 0; index < channel.length; index += 1) {
      const time = index / context.sampleRate;
      const noise = Math.random() * 2 - 1;
      if (soundId === "ocean") {
        channel[index] = noise * (0.18 + Math.pow((Math.sin(time * 0.75) + 1) / 2, 2) * 0.82);
      } else if (soundId === "fire") {
        const crackle = Math.random() > 0.996 ? (Math.random() * 2 - 1) * 2.8 : 0;
        channel[index] = noise * 0.34 + crackle;
      } else if (soundId === "cafe") {
        channel[index] = noise * 0.42 + Math.sin(time * 110 * Math.PI * 2) * 0.025;
      } else {
        channel[index] = noise * (0.68 + Math.sin(time * 1.7) * 0.12);
      }
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const settings: Record<FocusSoundId, { frequency: number; gain: number; type: BiquadFilterType }> = {
      rain: { frequency: 2400, gain: 0.055, type: "lowpass" },
      ocean: { frequency: 950, gain: 0.075, type: "lowpass" },
      fire: { frequency: 1700, gain: 0.045, type: "bandpass" },
      cafe: { frequency: 850, gain: 0.04, type: "bandpass" }
    };
    const setting = settings[soundId];

    source.buffer = buffer;
    source.loop = true;
    filter.type = setting.type;
    filter.frequency.value = setting.frequency;
    filter.Q.value = soundId === "cafe" ? 0.7 : 0.35;
    gain.gain.value = setting.gain;
    source.connect(filter).connect(gain).connect(context.destination);
    source.start();
    audioRef.current = { context, source };
  }

  function toggleFocusSound() {
    if (focusPlaying) {
      stopFocusSound();
      setFocusPlaying(false);
      return;
    }

    startFocusSound(focusSound);
    setFocusPlaying(true);
  }

  function chooseFocusSound(soundId: FocusSoundId) {
    setFocusSound(soundId);
    if (focusPlaying) startFocusSound(soundId);
  }

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
    setCelebrating(true);
  }

  return (
    <>
      <section className="page-center task-page">
        <AppTopbar search={query} searchPlaceholder="搜索任务..." setSearch={setQuery} />
        <div className="task-content-area">
          <header className="page-heading-row">
            <div><h2>待办清单</h2><p>深呼吸，一次只关注一件事。</p></div>
            <div className="sort-actions">
              <button type="button"><span className="material-symbols-outlined">bolt</span>按精力排序</button>
              <button type="button"><span className="material-symbols-outlined">schedule</span>按时长排序</button>
            </div>
          </header>
          <section className="task-focus-console" aria-label="专注模式和今日进度">
            <div className="focus-console-main">
              <button
                aria-label={focusPlaying ? "暂停白噪音" : "播放白噪音"}
                className={focusPlaying ? "focus-play-button playing" : "focus-play-button"}
                onClick={toggleFocusSound}
                type="button"
              >
                <span className="material-symbols-outlined">{focusPlaying ? "pause" : "play_arrow"}</span>
              </button>
              <div className="focus-console-copy">
                <strong>专注模式</strong>
                <span>{focusPlaying ? `正在播放 · ${selectedSound.label}` : `准备播放 · ${selectedSound.label}`}</span>
              </div>
              <div className="focus-sound-options" aria-label="选择白噪音">
                {focusSounds.map((sound) => (
                  <button
                    aria-pressed={focusSound === sound.id}
                    className={focusSound === sound.id ? "active" : ""}
                    key={sound.id}
                    onClick={() => chooseFocusSound(sound.id)}
                    title={sound.label}
                    type="button"
                  >
                    <span className="material-symbols-outlined">{sound.icon}</span>
                    <span>{sound.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="focus-progress">
              <div><strong>今日进度</strong><strong>65%</strong></div>
              <div className="mini-progress" aria-label="今日进度 65%"><span /></div>
              <small>已经走过大半，保持现在的节奏。</small>
            </div>
          </section>
          <div className="prototype-task-list">
            {visibleTasks.map((task) => (
              <article className={task.done ? "prototype-task done" : "prototype-task"} key={task.id}>
                <button aria-label="切换任务状态" className="round-check" onClick={() => toggleTask(task.id)} type="button" />
                <div className="prototype-task-main">
                  <button className="task-title-button" onClick={onOpenTask} type="button">{task.title}</button>
                  <span className="pending-label"><span className="material-symbols-outlined">circle</span>{task.done ? "已完成" : "待处理"}</span>
                </div>
                <button className="decompose-button" onClick={onOpenTask} type="button">
                  <span className="material-symbols-outlined">schema</span>拆成第一步
                </button>
                <div className="task-tags">
                  <span className={`energy ${task.energy === "高精力" ? "high" : task.energy === "中等精力" ? "medium" : "low"}`}>{task.energy}</span>
                  <span>{task.duration}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SupportRail title="温馨提醒" subtitle="慢下来，深呼吸">
        <div className="support-message"><span className="material-symbols-outlined">spa</span><p>如果感到任务过载，试着从“拆成第一步”开始，只需 2 分钟。</p></div>
      </SupportRail>
      {celebrating ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="success-modal">
            <span className="material-symbols-outlined">verified</span>
            <h2>太棒了！</h2>
            <p>你已经完成了最艰难的第一步。休息一分钟，或者继续保持这个节奏？</p>
            <button onClick={() => setCelebrating(false)} type="button">继续专注</button>
            <button className="quiet-button" onClick={() => setCelebrating(false)} type="button">小小休息一下</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function TaskDetailPage({ onBack }: { onBack: () => void }) {
  const [energy, setEnergy] = useState(2);
  const [saved, setSaved] = useState(false);
  const [subtasks, setSubtasks] = useState([
    { title: "确定核心调色板", done: false },
    { title: "选择符合品牌精神的无衬线字体", done: false },
    { title: "整理参考图 (Moodboard)", done: true }
  ]);

  return (
    <section className="detail-page page-center full-width-page">
      <header className="detail-topbar">
        <button className="back-button" onClick={onBack} type="button"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2>任务详情</h2>
        <div><IconButton icon="share" label="分享" /><IconButton icon="more_vert" label="更多" /></div>
      </header>
      <article className="detail-card">
        <input className="detail-title-input" defaultValue="完成品牌视觉系统初稿" aria-label="任务名称" />
        <div className="detail-tags">
          <span><span className="material-symbols-outlined">calendar_today</span>截止：5月24日</span>
          <span className="blue"><span className="material-symbols-outlined">bolt</span>中等精力</span>
          <span><span className="material-symbols-outlined">tag</span>设计项目</span>
        </div>
        <section className="next-step-card">
          <div><span className="material-symbols-outlined">near_me</span><strong>下一步只需要做什么？</strong></div>
          <div className="next-step-row">
            <input defaultValue="打开 Figma 并建立名为 'Brand Identity V1' 的新画板" aria-label="下一步" />
            <button type="button"><span className="material-symbols-outlined">content_cut</span>拆成第一步</button>
          </div>
        </section>
        <div className="detail-columns">
          <div>
            <DetailSection icon="notes" title="备忘笔记">
              <textarea defaultValue="需要参考上次会议提到的柔和极简主义风格。主色调使用 Mist Blue 和 Sage Green。避免使用过于刺眼的阴影。" rows={5} />
            </DetailSection>
            <DetailSection icon="format_list_numbered" title="子任务">
              <div className="subtask-list">
                {subtasks.map((subtask, index) => (
                  <label key={subtask.title}>
                    <input
                      checked={subtask.done}
                      onChange={() => setSubtasks((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, done: !item.done } : item))}
                      type="checkbox"
                    />
                    <span>{subtask.title}</span>
                  </label>
                ))}
              </div>
            </DetailSection>
          </div>
          <div>
            <DetailSection icon="bolt" title="所需精力">
              <div className="energy-selector">
                {["轻松", "适中", "挑战"].map((label, index) => (
                  <button className={energy === index + 1 ? "active" : ""} key={label} onClick={() => setEnergy(index + 1)} type="button">
                    <strong>{index + 1}</strong><small>{label}</small>
                  </button>
                ))}
              </div>
            </DetailSection>
            <DetailSection icon="notifications" title="截止与提醒">
              <div className="metadata-list">
                <div><span className="material-symbols-outlined">event</span><span>2026年6月10日</span><span className="material-symbols-outlined">edit</span></div>
                <div><span className="material-symbols-outlined">alarm</span><span>下午 2:00</span><span className="material-symbols-outlined">edit</span></div>
              </div>
            </DetailSection>
            <div className="project-progress">
              <div className="progress-ring">35%</div>
              <div><strong>项目进度</strong><p>保持稳定的节奏</p></div>
            </div>
          </div>
        </div>
        <footer className="detail-actions">
          <button onClick={onBack} type="button">取消</button>
          <button className="primary" onClick={() => setSaved(true)} type="button">{saved ? "已保存" : "保存更改"}</button>
        </footer>
      </article>
    </section>
  );
}

function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(9);
  const days = Array.from({ length: 35 }, (_, index) => index === 0 ? 30 : index);

  return (
    <>
      <section className="page-center calendar-page">
        <header className="calendar-heading">
          <div><h2>日历中心</h2><p>深呼吸，掌控你的节奏。</p></div>
          <div className="month-controls">
            <div><IconButton icon="chevron_left" label="上个月" /><span>2026年6月</span><IconButton icon="chevron_right" label="下个月" /></div>
            <button type="button">今天</button>
          </div>
        </header>
        <div className="weekday-row">{["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="calendar-grid">
          {days.map((day, index) => (
            <button
              className={`${day === selectedDay ? "selected " : ""}${index === 0 ? "outside " : ""}${index % 7 > 4 ? "weekend" : ""}`}
              key={`${day}-${index}`}
              onClick={() => setSelectedDay(day)}
              type="button"
            >
              <span>{day}</span>
              {day === 9 ? <strong>今天</strong> : null}
              {[1, 4, 9, 16, 23].includes(day) ? <i /> : null}
            </button>
          ))}
        </div>
        <div className="calendar-summary">
          <article><div className="summary-icon"><span className="material-symbols-outlined">timer</span></div><div><h3>今日专注：2.5小时</h3><p>你已经完成了 80% 的计划。做得很好！</p></div></article>
          <article className="inspiration-summary"><span><span className="material-symbols-outlined">auto_awesome</span>今日灵感</span><p>“不要试图管理时间，要管理你的能量。”</p></article>
        </div>
      </section>
      <SupportRail title="温馨提醒" subtitle="今日鼓励：慢下来，深呼吸">
        <ReminderList reminders={[
          { icon: "water_drop", title: "饮水提醒", detail: "距离下次饮水：15分钟", state: "pending" },
          { icon: "medication", title: "用药助手", detail: "下午 2:00 · 维生素B" },
          { icon: "visibility", title: "眼部休息", detail: "跟随 20-20-20 原则" }
        ]} />
        <div className="mood-card"><strong>今日状态</strong><div><span /></div><p>情绪平稳度：良好</p></div>
      </SupportRail>
    </>
  );
}

function RandomPage() {
  const [condition, setCondition] = useState(0);
  const [result, setResult] = useState<(typeof randomTasks)[number] | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const conditions = [
    ["timer", "我现在只有 5 分钟", "碎片化时间的奇迹"],
    ["battery_2_bar", "我没什么精力", "低电量模式下的温柔完成"],
    ["step_into", "我想做一点点", "微小行动，巨大安慰"],
    ["cleaning_services", "我想清理脑子", "归档杂念，恢复清爽"]
  ];

  function chooseTask() {
    setResult(randomTasks[(condition + 1) % randomTasks.length]);
  }

  useEffect(() => {
    if (!result) return undefined;

    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setResult(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [result]);

  return (
    <section className="random-page page-center full-width-page">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <AppTopbar search="" searchPlaceholder="搜寻宁静..." setSearch={() => undefined} />
      <div className="random-content">
        <header><h2>任务转盘</h2><p>别担心还没开始，选一个当下的状态，我们一起迈出一小步。</p></header>
        <div className="random-grid">
          <div className="condition-list">
            <p>此时此刻，你的状态是？</p>
            {conditions.map(([icon, title, detail], index) => (
              <button className={condition === index ? "active" : ""} key={title} onClick={() => setCondition(index)} type="button">
                <span className="material-symbols-outlined">{icon}</span>
                <span><strong>{title}</strong><small>{detail}</small></span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            ))}
          </div>
          <div className="roulette-area">
            <div className="roulette-orbit">
              <div className="roulette-circle"><span className="material-symbols-outlined">auto_awesome</span><strong>准备就绪</strong></div>
              <i className="dot-one" /><i className="dot-two" /><i className="dot-three" /><i className="dot-four" />
            </div>
            <button className="spin-button" onClick={chooseTask} type="button">帮我选一个能开始的</button>
            <p>点击后，我们将根据你的状态挑选最优项</p>
          </div>
        </div>
      </div>
      {result ? (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setResult(null);
          }}
          role="presentation"
        >
          <div
            aria-describedby="random-result-description"
            aria-labelledby="random-result-title"
            className="result-modal"
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="关闭推荐任务"
              className="result-modal-close"
              onClick={() => setResult(null)}
              ref={closeButtonRef}
              type="button"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="result-modal-icon"><span className="material-symbols-outlined">{result.icon}</span></div>
            <p className="section-kicker">推荐任务</p>
            <h3 id="random-result-title">{result.title}</h3>
            <p id="random-result-description">{result.detail}</p>
            <div className="result-modal-actions"><button onClick={chooseTask} type="button">再选一个</button><button className="primary" onClick={() => setResult(null)} type="button">立刻开始</button></div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function InspirationPage() {
  const [draft, setDraft] = useState("");
  const [decomposed, setDecomposed] = useState(false);

  function decompose() {
    if (draft.trim()) setDecomposed(true);
  }

  return (
    <>
      <section className="page-center inspiration-page">
        <AppTopbar search="" searchPlaceholder="搜索想法..." setSearch={() => undefined} />
        <div className="inspiration-content">
          <header><h2>灵感拆解</h2><p>让混乱的想法变清晰，从第一步开始。</p></header>
          <section className="inspiration-input-card">
            <textarea
              onChange={(event) => {
                setDraft(event.target.value);
                setDecomposed(false);
              }}
              placeholder="输入你想做但不知道从哪开始的事..."
              rows={3}
              value={draft}
            />
            <span>支持 AI 自动拆解</span>
            <div>
              <div>
                <button onClick={() => setDraft("我想做一个副业账号，但不知道从哪开始。")} type="button">💡 做副业</button>
                <button onClick={() => setDraft("我想学习写代码。")} type="button">💻 学编程</button>
              </div>
              <button className="primary-pill" onClick={decompose} type="button">拆解想法</button>
            </div>
          </section>
          {decomposed ? (
            <div className="breakdown-result">
              <div className="divider-label"><i /><span>拆解为 4 个简单步骤</span><i /></div>
              <div className="step-grid">
                {inspirationSteps.map(([title, detail], index) => (
                  <article className={index === 0 ? "active" : ""} key={title}>
                    <em>0{index + 1}</em><span>{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div>
                  </article>
                ))}
              </div>
              <div className="focus-first-card">
                <strong>FOCUS MODE</strong><p>不要被终点吓到，我们现在</p>
                <button type="button">只做第一步 <span className="material-symbols-outlined">arrow_forward</span></button>
                <small>点击开启 25 分钟番茄钟，专注于“先写下账号主题”</small>
              </div>
            </div>
          ) : (
            <div className="inspiration-empty"><div><span className="material-symbols-outlined">cloud_queue</span></div><h3>还没有灵感？</h3><p>在上方输入框写下任何困惑，让我来帮你拆解。</p></div>
          )}
        </div>
      </section>
      <SupportRail title="温馨提醒" subtitle="“今日鼓励：慢下来，深呼吸”">
        <div className="simple-reminders">
          {["water_drop 饮水提醒", "medication 用药助手", "visibility 眼部休息"].map((item) => {
            const [icon, label] = item.split(" ");
            return <div key={label}><span className="material-symbols-outlined">{icon}</span>{label}</div>;
          })}
        </div>
        <div className="focus-rings"><i /><i /><strong>专注中</strong></div>
      </SupportRail>
    </>
  );
}

function RemindersPage() {
  const [enabled, setEnabled] = useState({ water: true, medicine: true, eyes: true });
  const [water, setWater] = useState(800);

  return (
    <>
      <section className="page-center reminders-page">
        <header className="reminders-heading"><h2>温馨提醒管理</h2><p>在这里，您可以调整照顾自己的每一个细节。</p></header>
        <div className="reminder-bento">
          <article className="water-card wide">
            <CardTitle icon="water_drop" title="喝水提醒" detail={`目标：2000ml / 当前：${water}ml`} />
            <Toggle active={enabled.water} onClick={() => setEnabled((state) => ({ ...state, water: !state.water }))} />
            <div className="setting-pills"><span><span className="material-symbols-outlined">schedule</span>每 2 小时提醒</span><span><span className="material-symbols-outlined">notifications</span>震动 + 铃声</span></div>
            <div className="water-progress"><div><span style={{ width: `${Math.min(100, water / 20)}%` }} /></div><button onClick={() => setWater((value) => Math.min(2000, value + 200))} type="button">立即记一笔 (200ml)</button></div>
          </article>
          <article className="medicine-card">
            <CardTitle icon="medication" title="用药助手" />
            <Toggle active={enabled.medicine} onClick={() => setEnabled((state) => ({ ...state, medicine: !state.medicine }))} />
            <div className="medicine-slot"><strong>上午 8:30</strong><p>维生素 B 族 - 1片</p><span>备注：随餐服用</span></div>
            <div className="medicine-slot muted"><strong>下午 2:00</strong><p>鱼油 - 2粒</p></div>
            <button className="edit-plan" type="button"><span className="material-symbols-outlined">edit</span>调整计划</button>
          </article>
          <article className="eye-card">
            <CardTitle icon="visibility" title="眼部休息" />
            <Toggle active={enabled.eyes} onClick={() => setEnabled((state) => ({ ...state, eyes: !state.eyes }))} />
            <p>遵循 20-20-20 原则：每看屏幕 20 分钟，注视 20 英尺外 20 秒。</p>
            <div className="eye-timer"><strong>12</strong><small>MIN</small></div>
            <small>距离下次休息还有 8 分钟</small>
          </article>
          <article className="period-card wide">
            <CardTitle icon="calendar_today" title="例假提醒" />
            <div className="period-content">
              <div className="mini-calendar">
                {["一", "二", "三", "四", "五", "六", "日", "12", "13", "14", "15", "16", "17", "18"].map((item) => <span className={item === "15" ? "today" : ["14", "16"].includes(item) ? "near" : ""} key={item}>{item}</span>)}
              </div>
              <div><strong>预计今天开始</strong><p>记得准备好温水、暖宝宝和喜欢的零食。</p><button type="button">记录今天</button></div>
            </div>
          </article>
          <article className="encouragement-banner full"><div><h3>“慢慢来，深呼吸”</h3><p>照顾好自己也是一种巨大的进步。今天你已经做得非常出色了。</p></div><span className="material-symbols-outlined">self_care</span></article>
        </div>
      </section>
      <SupportRail title="温馨提醒" subtitle="“照顾好自己，才是开始一切的前提。”">
        <div className="running-list"><strong>正在运行</strong><div><span className="material-symbols-outlined">water_drop</span><p>饮水提醒<small>下一次：14:30</small></p></div><div><span className="material-symbols-outlined">visibility</span><p>眼部休息<small>下一次：14:12</small></p></div></div>
        <div className="achievement-card"><strong><span className="material-symbols-outlined">favorite</span>今日成就</strong><p>你今天已经喝了 4 杯水，完成了 5 次眼睛休息。</p></div>
      </SupportRail>
    </>
  );
}

function AppTopbar({
  search,
  searchPlaceholder,
  setSearch
}: {
  search: string;
  searchPlaceholder: string;
  setSearch: (value: string) => void;
}) {
  return (
    <header className="app-topbar">
      <h1>安静时光</h1>
      <div>
        <label className="search-box">
          <span className="material-symbols-outlined">search</span>
          <input onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} value={search} />
        </label>
        <IconButton icon="notifications" label="通知" />
        <IconButton icon="account_circle" label="账户" />
      </div>
    </header>
  );
}

function SupportRail({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="right-rail support-rail">
      <header><div className="support-avatar"><span className="material-symbols-outlined">spa</span></div><div><h2>{title}</h2><p>{subtitle}</p></div></header>
      {children}
    </aside>
  );
}

function ReminderList({ reminders }: { reminders: Reminder[] }) {
  return (
    <div className="reminder-list">
      {reminders.map((reminder) => (
        <article className={`reminder-item ${reminder.state ?? ""}`} key={reminder.title}>
          <div className="reminder-icon"><span className="material-symbols-outlined">{reminder.icon}</span></div>
          <div><h4>{reminder.title}</h4><p>{reminder.detail}</p></div>
          {reminder.state === "done" ? <span className="material-symbols-outlined check-icon">check_circle</span> : reminder.state === "soon" ? <span className="soon-label">即将到来</span> : <button aria-label="完成提醒" className="reminder-check" type="button" />}
        </article>
      ))}
    </div>
  );
}

function IconButton({ icon, label }: { icon: string; label: string }) {
  return <button aria-label={label} className="icon-button" type="button"><span className="material-symbols-outlined">{icon}</span></button>;
}

function DetailSection({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return <section className="detail-section"><h3><span className="material-symbols-outlined">{icon}</span>{title}</h3>{children}</section>;
}

function Toggle({ active, onClick }: { active: boolean; onClick: () => void }) {
  return <button aria-label="切换提醒" className={active ? "toggle active" : "toggle"} onClick={onClick} type="button"><span /></button>;
}

function CardTitle({ icon, title, detail }: { icon: string; title: string; detail?: string }) {
  return <div className="reminder-card-title"><span className="material-symbols-outlined">{icon}</span><div><h3>{title}</h3>{detail ? <p>{detail}</p> : null}</div></div>;
}

type NolaRootElement = HTMLElement & { _nolaRoot?: Root };
const rootElement = document.getElementById("root") as NolaRootElement | null;
if (!rootElement) throw new Error("Nola root element is missing.");
const root = rootElement._nolaRoot ?? createRoot(rootElement);
rootElement._nolaRoot = root;
root.render(<App />);

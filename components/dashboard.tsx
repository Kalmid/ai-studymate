type NavItem = {
  label: string;
  icon: string;
  active?: boolean;
};

type SummaryMetric = {
  label: string;
  value: string;
  change: string;
  accent: string;
  icon: string;
};

type StudyTask = {
  title: string;
  subject: string;
  slot: string;
  duration: string;
  status: string;
  statusTone: "indigo" | "emerald" | "amber" | "rose";
};

type WeeklyProgressDay = {
  day: string;
  value: number;
};

const navigationItems: NavItem[] = [
  { label: "Dashboard", icon: "⌂", active: true },
  { label: "My Subjects", icon: "📚" },
  { label: "Study Planner", icon: "🗓️" },
  { label: "AI Study Assistant", icon: "✨" },
  { label: "Quizzes", icon: "🧠" },
  { label: "Settings", icon: "⚙️" },
];

const summaryMetrics: SummaryMetric[] = [
  { label: "Today's Tasks", value: "06", change: "+2 from yesterday", accent: "bg-indigo-100 text-indigo-700", icon: "✓" },
  { label: "Completed Tasks", value: "14", change: "+4 this week", accent: "bg-emerald-100 text-emerald-700", icon: "✓" },
  { label: "Study Hours", value: "5.4h", change: "+1.2h than target", accent: "bg-amber-100 text-amber-700", icon: "⏱" },
  { label: "Quiz Average", value: "88%", change: "+6% improvement", accent: "bg-rose-100 text-rose-700", icon: "★" },
];

const todayTasks: StudyTask[] = [
  {
    title: "Review algebra flashcards",
    subject: "Mathematics",
    slot: "09:00 - 09:45",
    duration: "45 min",
    status: "In progress",
    statusTone: "indigo",
  },
  {
    title: "Read chapter 4 notes",
    subject: "Biology",
    slot: "11:00 - 12:00",
    duration: "60 min",
    status: "Up next",
    statusTone: "amber",
  },
  {
    title: "Practice essay outline",
    subject: "History",
    slot: "14:00 - 14:45",
    duration: "45 min",
    status: "Due soon",
    statusTone: "rose",
  },
  {
    title: "Solve chemistry recap quiz",
    subject: "Chemistry",
    slot: "16:30 - 17:15",
    duration: "45 min",
    status: "Completed",
    statusTone: "emerald",
  },
];

const weeklyProgress: WeeklyProgressDay[] = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 92 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 81 },
  { day: "Sun", value: 94 },
];

function SummaryCard({ label, value, change, accent, icon }: SummaryMetric) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-xl text-lg ${accent}`}>{icon}</span>
      </div>
      <p className="text-sm text-slate-600">{change}</p>
    </article>
  );
}

function StudyPlanItem({ item }: { item: StudyTask }) {
  const toneStyles: Record<StudyTask["statusTone"], string> = {
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
  };

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" aria-hidden="true" />
          <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
          <span>{item.subject}</span>
          <span>{item.slot}</span>
          <span>{item.duration}</span>
        </div>
      </div>

      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneStyles[item.statusTone]}`}>
        {item.status}
      </span>
    </li>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/80 p-4 backdrop-blur-sm lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-lg font-bold text-white shadow-lg shadow-indigo-200">
              A
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">StudyMate</p>
              <h1 className="text-xl font-bold text-slate-900">AI StudyMate</h1>
            </div>
          </div>

          <nav aria-label="Sidebar navigation" className="mt-8">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className={[
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      item.active
                        ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    ].join(" ")}
                    aria-current={item.active ? "page" : undefined}
                  >
                    <span aria-hidden="true" className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 rounded-2xl bg-slate-900 p-4 text-white shadow-xl shadow-slate-200/80">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">This week</p>
            <p className="mt-3 text-3xl font-bold">14.5h</p>
            <p className="mt-1 text-sm text-slate-300">Goal: 16 hours</p>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Overview</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Good morning, Maya</h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                Week 7 • 81% on track
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                Generate AI Study Plan
              </button>
            </div>
          </header>

          <section aria-label="Summary metrics" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryMetrics.map((metric) => (
              <SummaryCard key={metric.label} {...metric} />
            ))}
          </section>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Planner</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">Today&apos;s Study Plan</h3>
                </div>
                <button type="button" className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  View all
                </button>
              </div>

              <ul className="space-y-3">
                {todayTasks.map((task) => (
                  <StudyPlanItem key={task.title} item={task} />
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Progress</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">Weekly study</h3>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  +12% this week
                </span>
              </div>

              <div
                className="mt-6 flex h-44 items-end gap-2 sm:gap-3"
                role="img"
                aria-label="Weekly study progress from Monday to Sunday, peaking at 94 percent on Sunday."
              >
                {weeklyProgress.map((day) => (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-32 w-full items-end justify-center">
                      <div
                        className={`w-full rounded-t-2xl ${day.value >= 80 ? "bg-indigo-600" : "bg-indigo-300"}`}
                        style={{ height: `${day.value}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{day.day}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-3">
                <p className="text-sm text-slate-600">Average completion</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">81%</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

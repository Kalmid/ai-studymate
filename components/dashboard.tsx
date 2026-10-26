"use client";

import { useMemo, useState, type FormEvent } from "react";

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
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

type TaskFormState = {
  title: string;
  subject: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
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

const initialStudyTasks: StudyTask[] = [
  {
    id: "task-1",
    title: "Review calculus derivatives",
    subject: "Mathematics",
    dueDate: "2026-10-28",
    priority: "High",
    completed: false,
  },
  {
    id: "task-2",
    title: "Summarize cell respiration notes",
    subject: "Biology",
    dueDate: "2026-10-29",
    priority: "Medium",
    completed: true,
  },
  {
    id: "task-3",
    title: "Draft history essay outline",
    subject: "History",
    dueDate: "2026-10-30",
    priority: "High",
    completed: false,
  },
  {
    id: "task-4",
    title: "Complete chemistry problem set",
    subject: "Chemistry",
    dueDate: "2026-11-01",
    priority: "Medium",
    completed: false,
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

const emptyFormState: TaskFormState = {
  title: "",
  subject: "",
  dueDate: "",
  priority: "Medium",
};

function SummaryCard({ label, value, change, accent, icon }: SummaryMetric) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
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
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:border-slate-300 hover:bg-slate-100 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${item.completed ? "bg-emerald-500" : "bg-indigo-500"}`} aria-hidden="true" />
          <h3 className={`text-base font-semibold ${item.completed ? "text-slate-500 line-through" : "text-slate-900"}`}>
            {item.title}
          </h3>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
          <span>{item.subject}</span>
          <span>{item.dueDate}</span>
          <span>{item.priority}</span>
        </div>
      </div>

      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item.completed ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}>
        {item.completed ? "Completed" : "Planned"}
      </span>
    </li>
  );
}

function TaskPriorityBadge({ priority }: { priority: StudyTask["priority"] }) {
  const toneMap: Record<StudyTask["priority"], string> = {
    Low: "bg-emerald-100 text-emerald-700",
    Medium: "bg-amber-100 text-amber-700",
    High: "bg-rose-100 text-rose-700",
  };

  return <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${toneMap[priority]}`}>{priority}</span>;
}

function TaskForm({
  formState,
  editingId,
  onChange,
  onSubmit,
  onCancel,
  formError,
}: {
  formState: TaskFormState;
  editingId: string | null;
  onChange: (field: keyof TaskFormState, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  formError: string | null;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-lg font-semibold text-slate-900">{editingId ? "Edit task" : "Add a new task"}</h4>
        {editingId ? (
          <button type="button" onClick={onCancel} className="text-sm font-medium text-slate-500 transition hover:text-slate-700">
            Cancel
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Task title
          <input
            value={formState.title}
            onChange={(event) => onChange("title", event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="e.g. Practice algebra flashcards"
            aria-label="Task title"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Subject
          <input
            value={formState.subject}
            onChange={(event) => onChange("subject", event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="e.g. Mathematics"
            aria-label="Subject"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Due date
          <input
            type="date"
            value={formState.dueDate}
            onChange={(event) => onChange("dueDate", event.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            aria-label="Due date"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Priority
          <select
            value={formState.priority}
            onChange={(event) => onChange("priority", event.target.value as StudyTask["priority"])}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            aria-label="Priority"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>

      {formError ? <p className="text-sm font-medium text-rose-600">{formError}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          {editingId ? "Save changes" : "Add task"}
        </button>
        {editingId ? (
          <button type="button" onClick={onCancel} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            Discard
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<StudyTask[]>(initialStudyTasks);
  const [formState, setFormState] = useState<TaskFormState>(emptyFormState);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const completedTasks = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const handleFieldChange = (field: keyof TaskFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setFormError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = formState.title.trim();
    const trimmedSubject = formState.subject.trim();

    if (!trimmedTitle || !trimmedSubject || !formState.dueDate) {
      setFormError("Please fill in the task title, subject, and due date.");
      return;
    }

    if (editingId) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingId
            ? { ...task, title: trimmedTitle, subject: trimmedSubject, dueDate: formState.dueDate, priority: formState.priority }
            : task,
        ),
      );
    } else {
      setTasks((current) => [
        {
          id: `task-${Date.now()}`,
          title: trimmedTitle,
          subject: trimmedSubject,
          dueDate: formState.dueDate,
          priority: formState.priority,
          completed: false,
        },
        ...current,
      ]);
    }

    setFormState(emptyFormState);
    setEditingId(null);
    setFormError(null);
  };

  const handleEdit = (task: StudyTask) => {
    setEditingId(task.id);
    setFormState({
      title: task.title,
      subject: task.subject,
      dueDate: task.dueDate,
      priority: task.priority,
    });
    setFormError(null);
  };

  const handleDelete = (taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));

    if (editingId === taskId) {
      setEditingId(null);
      setFormState(emptyFormState);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormState(emptyFormState);
    setFormError(null);
  };

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
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200",
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
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200"
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
                <button type="button" className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                  View all
                </button>
              </div>

              <ul className="space-y-3">
                {tasks.slice(0, 4).map((task) => (
                  <StudyPlanItem key={task.id} item={task} />
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

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Tasks</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">Study Task Management</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
                <span>{pendingTasks}</span>
                <span>active tasks</span>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.45fr]">
              <TaskForm
                formState={formState}
                editingId={editingId}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                formError={formError}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm text-slate-500">Progress</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {completedTasks}/{tasks.length} complete
                    </p>
                  </div>
                  <div className="h-2.5 w-28 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                      style={{ width: `${tasks.length ? (completedTasks / tasks.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {tasks.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-indigo-100 text-xl text-indigo-700">✓</div>
                    <h4 className="text-lg font-semibold text-slate-900">No tasks yet</h4>
                    <p className="mt-2 text-sm text-slate-600">Add your first study task to start building a focused plan.</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {tasks.map((task) => (
                      <li key={task.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className={`text-lg font-semibold ${task.completed ? "text-slate-400 line-through" : "text-slate-900"}`}>
                                {task.title}
                              </h4>
                              <TaskPriorityBadge priority={task.priority} />
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                              <span>{task.subject}</span>
                              <span>Due {task.dueDate}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleComplete(task.id)}
                              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                task.completed
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {task.completed ? "Completed" : "Mark done"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEdit(task)}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(task.id)}
                              className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

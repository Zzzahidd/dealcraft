import React, { useState } from 'react';

const INITIAL_BACKLOG_TASKS = [
  {
    id: 'WEB-130',
    title: 'Write homepage copy',
    status: 'Backlog',
    assignee: 'Priya Patel',
    avatar: 'PP',
    priority: 'Low',
    priorityColor: '#94a3b8',
    due: 'Nov 11',
    project: 'Website Redesign',
    projectColor: '#3b82f6',
    completed: false,
  },
  {
    id: 'WEB-133',
    title: 'Set up analytics events',
    status: 'Backlog',
    assignee: 'Marcus Lee',
    avatar: 'ML',
    priority: 'Medium',
    priorityColor: '#f59e0b',
    due: 'Nov 13',
    project: 'Website Redesign',
    projectColor: '#3b82f6',
    completed: false,
  },
  {
    id: 'WEB-136',
    title: 'Accessibility audit of templates',
    status: 'Backlog',
    assignee: 'Lena Fischer',
    avatar: 'LF',
    priority: 'High',
    priorityColor: '#ef4444',
    due: 'Nov 15',
    project: 'Website Redesign',
    projectColor: '#3b82f6',
    completed: false,
  },
  {
    id: 'WEB-148',
    title: 'Migrate blog to new CMS',
    status: 'Backlog',
    assignee: 'John Carter',
    avatar: 'JC',
    priority: 'Medium',
    priorityColor: '#f59e0b',
    due: 'Nov 21',
    project: 'Website Redesign',
    projectColor: '#3b82f6',
    completed: false,
  },
  {
    id: 'MOB-112',
    title: 'App Store screenshots',
    status: 'Backlog',
    assignee: 'Priya Patel',
    avatar: 'PP',
    priority: 'Low',
    priorityColor: '#94a3b8',
    due: 'Dec 3',
    project: 'Mobile App',
    projectColor: '#06b6d4',
    completed: false,
  },
  {
    id: 'MKT-115',
    title: 'Influencer outreach list',
    status: 'Backlog',
    assignee: 'Lena Fischer',
    avatar: 'LF',
    priority: 'Low',
    priorityColor: '#94a3b8',
    due: 'Set date',
    project: 'Marketing Campaign',
    projectColor: '#ec4899',
    completed: false,
  },
  {
    id: 'LCH-115',
    title: 'Release notes',
    status: 'Backlog',
    assignee: 'John Carter',
    avatar: 'JC',
    priority: 'Low',
    priorityColor: '#94a3b8',
    due: 'Nov 4',
    project: 'Product Launch',
    projectColor: '#f59e0b',
    completed: false,
  },
  {
    id: 'DS-112',
    title: 'Icon library cleanup',
    status: 'Backlog',
    assignee: 'Emma Wilson',
    avatar: 'EW',
    priority: 'Low',
    priorityColor: '#94a3b8',
    due: 'Set date',
    project: 'Design System',
    projectColor: '#8b5cf6',
    completed: false,
  },
];

const INITIAL_TODO_TASKS = [
  {
    id: 'WEB-118',
    title: 'Prepare design system tokens',
    status: 'To Do',
    assignee: 'Tanjim Islam',
    avatar: 'TI',
    priority: 'Medium',
    priorityColor: '#f59e0b',
    due: 'Fri',
    project: 'Website Redesign',
    projectColor: '#3b82f6',
    completed: false,
  },
];

export default function InteractiveTasksList() {
  const [backlogTasks, setBacklogTasks] = useState(INITIAL_BACKLOG_TASKS);
  const [todoTasks, setTodoTasks] = useState(INITIAL_TODO_TASKS);
  const [search, setSearch] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [toast, setToast] = useState(null);

  const toggleTask = (id, section) => {
    if (section === 'backlog') {
      setBacklogTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } else {
      setTodoTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }
  };

  const handleSaveNewTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `WEB-${Math.floor(150 + Math.random() * 50)}`,
      title: newTaskTitle.trim(),
      status: 'Backlog',
      assignee: 'Tanjim Islam',
      avatar: 'TI',
      priority: newTaskPriority,
      priorityColor: newTaskPriority === 'High' ? '#ef4444' : newTaskPriority === 'Medium' ? '#f59e0b' : '#94a3b8',
      due: 'Nov 28',
      project: 'Website Redesign',
      projectColor: '#3b82f6',
      completed: false,
    };

    setBacklogTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    setIsAddingTask(false);

    setToast(`Saved "${newTask.title}" to Backlog!`);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredBacklog = backlogTasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-[#141416] text-[#e2e8f0] font-sans border border-neutral-800 select-none overflow-hidden text-xs relative">
      
      {/* 1. App Header matching Image 4 */}
      <div className="px-4 py-3 border-b border-neutral-800 bg-[#18181b] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              Tasks
              <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-blue-500/20 text-blue-400 font-normal">
                {backlogTasks.length + todoTasks.length} tasks
              </span>
            </h4>
            <p className="text-[11px] text-neutral-400">
              Every task across 6 projects with instant capture.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#202024] border border-neutral-700 text-neutral-200 text-xs px-2.5 py-1 rounded-none w-32 sm:w-44 focus:outline-none focus:border-blue-500"
          />

          {/* View Mode Pills */}
          <div className="flex border border-neutral-700 bg-[#202024] p-0.5 rounded-none text-neutral-400">
            <button type="button" className="px-2 py-0.5 bg-[#3b82f6] text-white font-medium rounded-none">
              List
            </button>
            <button type="button" className="px-2 py-0.5 hover:text-white font-medium rounded-none">
              Board
            </button>
            <button type="button" className="px-2 py-0.5 hover:text-white font-medium rounded-none">
              Table
            </button>
          </div>

          {/* + New Task Button */}
          <button
            type="button"
            onClick={() => setIsAddingTask(true)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-none flex items-center gap-1 transition-colors"
          >
            <span>+</span>
            <span>New task</span>
          </button>
        </div>
      </div>

      {/* 2. Task List Table / Rows matching Image 4 */}
      <div className="p-3 sm:p-4 space-y-4 min-h-[420px] overflow-y-auto">
        
        {/* SECTION: BACKLOG */}
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-neutral-400 font-medium text-xs">
            <div className="flex items-center gap-2">
              <span>⌄</span>
              <span className="w-2 h-2 rounded-full border border-dashed border-neutral-500"></span>
              <span className="text-white font-semibold">Backlog</span>
              <span className="text-neutral-500 text-[11px] font-mono">{filteredBacklog.length}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingTask(true)}
              className="text-neutral-400 hover:text-white text-xs px-1"
            >
              +
            </button>
          </div>

          {/* Inline Add Task Form */}
          {isAddingTask && (
            <form
              onSubmit={handleSaveNewTask}
              className="mb-2 p-2.5 bg-[#1c1c20] border border-blue-500/80 flex flex-wrap items-center gap-2"
            >
              <input
                type="text"
                autoFocus
                placeholder="Task title (e.g. Implement localized currency switcher)..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="grow bg-[#141416] border border-neutral-700 text-white text-xs p-1.5 focus:outline-none focus:border-blue-400"
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="bg-[#141416] border border-neutral-700 text-white text-xs p-1.5"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="px-2.5 py-1.5 bg-neutral-800 text-neutral-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </form>
          )}

          {/* Task Rows List */}
          <div className="divide-y divide-neutral-800/40">
            {filteredBacklog.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id, 'backlog')}
                className={`py-2 px-2 flex items-center justify-between hover:bg-neutral-800/40 cursor-pointer transition-colors group ${
                  t.completed ? 'opacity-50' : ''
                }`}
              >
                {/* Left: Checkbox + ID + Title */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id, 'backlog')}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-none cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                    {t.id}
                  </span>
                  <span
                    className={`truncate text-xs font-medium text-neutral-200 group-hover:text-white ${
                      t.completed ? 'line-through text-neutral-500' : ''
                    }`}
                  >
                    {t.title}
                  </span>
                </div>

                {/* Right: Status + Assignee + Priority + Due Date + Project */}
                <div className="flex items-center gap-4 shrink-0 text-xs">
                  {/* Status Pill */}
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full border border-neutral-500"></span>
                    <span>{t.status}</span>
                  </div>

                  {/* Assignee Avatar */}
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <span className="w-4 h-4 rounded-full bg-neutral-700 text-neutral-200 text-[9px] font-bold flex items-center justify-center">
                      {t.avatar}
                    </span>
                    <span className="hidden md:inline text-[11px] text-neutral-400">
                      {t.assignee}
                    </span>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <span style={{ color: t.priorityColor }}>▰</span>
                    <span className="text-neutral-400 hidden lg:inline">{t.priority}</span>
                  </div>

                  {/* Due Date */}
                  <div className="text-[11px] text-neutral-400 font-mono w-16 text-right">
                    {t.due}
                  </div>

                  {/* Project Pill */}
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                    <span style={{ backgroundColor: t.projectColor }} className="w-2 h-2 rounded-full" />
                    <span className="text-neutral-300">{t.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* + Add task button at bottom of section */}
          {!isAddingTask && (
            <button
              type="button"
              onClick={() => setIsAddingTask(true)}
              className="mt-2 text-[11px] text-neutral-400 hover:text-white flex items-center gap-1.5 px-2 py-1 transition-colors"
            >
              <span>+</span>
              <span>Add task</span>
            </button>
          )}
        </div>

        {/* SECTION: TO DO */}
        <div className="pt-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-neutral-400 font-medium text-xs">
            <div className="flex items-center gap-2">
              <span>⌄</span>
              <span className="w-2 h-2 rounded-full border border-blue-500"></span>
              <span className="text-white font-semibold">To Do</span>
              <span className="text-neutral-500 text-[11px] font-mono">{todoTasks.length}</span>
            </div>
          </div>

          <div className="divide-y divide-neutral-800/40">
            {todoTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id, 'todo')}
                className={`py-2 px-2 flex items-center justify-between hover:bg-neutral-800/40 cursor-pointer transition-colors group ${
                  t.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id, 'todo')}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-none cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                    {t.id}
                  </span>
                  <span
                    className={`truncate text-xs font-medium text-neutral-200 group-hover:text-white ${
                      t.completed ? 'line-through text-neutral-500' : ''
                    }`}
                  >
                    {t.title}
                  </span>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs">
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{t.status}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <span className="w-4 h-4 rounded-full bg-neutral-700 text-neutral-200 text-[9px] font-bold flex items-center justify-center">
                      {t.avatar}
                    </span>
                    <span className="hidden md:inline text-[11px] text-neutral-400">
                      {t.assignee}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px]">
                    <span style={{ color: t.priorityColor }}>▰</span>
                    <span className="text-neutral-400 hidden lg:inline">{t.priority}</span>
                  </div>

                  <div className="text-[11px] text-neutral-400 font-mono w-16 text-right">
                    {t.due}
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                    <span style={{ backgroundColor: t.projectColor }} className="w-2 h-2 rounded-full" />
                    <span className="text-neutral-300">{t.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1.5 text-xs font-medium shadow-lg z-40 animate-bounce">
          ✓ {toast}
        </div>
      )}

      {/* Footer helper */}
      <div className="px-4 py-2 border-t border-neutral-800 bg-[#18181b] flex items-center justify-between text-[11px] text-neutral-400">
        <div>
          <span>Keyboard shortcut: Press <strong>C</strong> to quick capture</span>
        </div>
        <div className="text-neutral-500 italic">
          Click checkbox to toggle task or click "+ Add task" to save live.
        </div>
      </div>
    </div>
  );
}

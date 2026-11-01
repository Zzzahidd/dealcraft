import React, { useState } from 'react';
import { Check, Plus, Search, ChevronRight, Play, LayoutGrid } from 'lucide-react';

export default function InteractiveComponentsSection() {
  // --- Component 1: Deals Pipeline State ---
  const [deals, setDeals] = useState([
    { id: 1, name: 'LVMH Group', stage: 'Proposal', value: 420000, tier: 'Enterprise' },
    { id: 2, name: 'Walt Disney Co', stage: 'Discovery', value: 311000, tier: 'Enterprise' },
    { id: 3, name: 'Stripe Payments', stage: 'Closing', value: 185000, tier: 'Growth' },
  ]);
  const [pipelineMode, setPipelineMode] = useState('interactive'); // 'interactive' | 'video'

  const stages = ['Discovery', 'Proposal', 'Closing'];

  const advanceDeal = (id) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== id) return deal;
        const currentIndex = stages.indexOf(deal.stage);
        const nextIndex = (currentIndex + 1) % stages.length;
        return { ...deal, stage: stages[nextIndex] };
      })
    );
  };

  const totalARR = deals.reduce((sum, d) => sum + d.value, 0);

  // --- Component 2: Fast Task Capture State ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Send revised contract to LVMH legal', done: false, priority: 'High' },
    { id: 2, title: 'Review Disney pilot expansion metrics', done: true, priority: 'Med' },
    { id: 3, title: 'Schedule weekly pipeline sync', done: false, priority: 'Low' },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [taskPriority, setTaskPriority] = useState('High');
  const [taskMode, setTaskMode] = useState('interactive');

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskInput.trim(),
      done: false,
      priority: taskPriority,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskInput('');
  };

  // --- Component 3: Accounts Directory State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('LVMH Group');
  const [accountMode, setAccountMode] = useState('interactive');

  const accounts = [
    { name: 'LVMH Group', arr: '$420,000', rep: 'Tanjim I.', health: 'Strong', note: 'Renewal locked for Q4.' },
    { name: 'Walt Disney Co', arr: '$311,000', rep: 'Sarah C.', health: 'Review', note: 'Evaluating 250 seats.' },
    { name: 'Stripe Payments', arr: '$185,000', rep: 'Marcus V.', health: 'Strong', note: 'Pilot completed successfully.' },
    { name: 'Nike Worldwide', arr: '$540,000', rep: 'Tanjim I.', health: 'Strong', note: 'Custom SLA terms approved.' },
  ];

  const filteredAccounts = accounts.filter((acc) =>
    acc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-[#1D1D16] text-[#F4F4F0] border-t border-[#24241B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header matching Figma 3.png command */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F0]">
            Engineered for high-throughput deal flow.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F4F4F0]/80">
            Three core surfaces built for fast daily execution. Click, toggle, and test the real interaction.
          </p>
        </div>

        {/* 3 Distinct Functional Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===================== COMPONENT 1: Deals Pipeline ===================== */}
          <div className="rounded-xl border border-[#24241B] bg-[#24241B] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-semibold text-[#F4F4F0]">The Deals Pipeline</h3>
                  <p className="text-xs text-[#F4F4F0]/70 mt-1">
                    Click any card to advance stage
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[#1D1D16] p-1 rounded-lg border border-white/5">
                  <button
                    type="button"
                    onClick={() => setPipelineMode('interactive')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      pipelineMode === 'interactive'
                        ? 'bg-[#24241B] text-[#F4F4F0]'
                        : 'text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setPipelineMode('video')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      pipelineMode === 'video'
                        ? 'bg-[#24241B] text-[#F4F4F0]'
                        : 'text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    Video
                  </button>
                </div>
              </div>

              {pipelineMode === 'interactive' ? (
                <div className="mt-5 space-y-4">
                  {/* Live Aggregate Metric */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1D1D16] border border-white/5">
                    <span className="text-xs text-[#F4F4F0]/60">Active Pipeline</span>
                    <span className="text-sm font-sans font-semibold text-[#F4F4F0]">
                      ${(totalARR / 1000).toFixed(0)}k ARR
                    </span>
                  </div>

                  {/* Deals Stage List */}
                  <div className="space-y-2.5">
                    {deals.map((deal) => (
                      <button
                        key={deal.id}
                        type="button"
                        onClick={() => advanceDeal(deal.id)}
                        className="w-full text-left p-3 rounded-lg bg-[#1D1D16] border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-[#F4F4F0]">{deal.name}</div>
                          <div className="text-xs font-sans text-[#F4F4F0]/50 mt-0.5">
                            ${(deal.value / 1000).toFixed(0)}k ARR · {deal.tier}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-sans bg-[#24241B] border border-white/10 text-[#F4F4F0]">
                            {deal.stage}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#F4F4F0]/40" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-5 rounded-lg overflow-hidden border border-white/5 aspect-video bg-[#1D1D16]">
                  <video
                    src="/assets/deals-pipeline.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#F4F4F0]/50 font-sans">
              <span>0ms stage transitions</span>
              <span>Local SQLite index</span>
            </div>
          </div>

          {/* ===================== COMPONENT 2: Fast Task Capture ===================== */}
          <div className="rounded-xl border border-[#24241B] bg-[#24241B] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-semibold text-[#F4F4F0]">Fast Task Capture</h3>
                  <p className="text-xs text-[#F4F4F0]/70 mt-1">
                    Keyboard-driven task queue
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[#1D1D16] p-1 rounded-lg border border-white/5">
                  <button
                    type="button"
                    onClick={() => setTaskMode('interactive')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      taskMode === 'interactive'
                        ? 'bg-[#24241B] text-[#F4F4F0]'
                        : 'text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaskMode('video')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      taskMode === 'video'
                        ? 'bg-[#24241B] text-[#F4F4F0]'
                        : 'text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    Video
                  </button>
                </div>
              </div>

              {taskMode === 'interactive' ? (
                <div className="mt-5 space-y-4">
                  {/* Inline Task Adder */}
                  <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add task and hit Enter..."
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#1D1D16] border border-white/10 text-[#F4F4F0] placeholder-[#F4F4F0]/40 focus:outline-none focus:border-[#F4F4F0]/50"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-lg bg-[#F4F4F0] text-[#1D1D16] text-xs font-semibold hover:bg-[#F4F4F0]/90 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Task List */}
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="p-2.5 rounded-lg bg-[#1D1D16] border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              task.done
                                ? 'bg-[#F4F4F0] border-[#F4F4F0] text-[#1D1D16]'
                                : 'border-[#F4F4F0]/30 bg-transparent'
                            }`}
                          >
                            {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span
                            className={`text-xs ${
                              task.done ? 'line-through text-[#F4F4F0]/40' : 'text-[#F4F4F0]'
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-[#24241B] text-[#F4F4F0]/70 border border-white/5">
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-5 rounded-lg overflow-hidden border border-white/5 aspect-video bg-[#1D1D16]">
                  <video
                    src="/assets/fast-tasks.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#F4F4F0]/50 font-sans">
              <span>{tasks.filter((t) => !t.done).length} open tasks</span>
              <span>Shortcut: N</span>
            </div>
          </div>

          {/* ===================== COMPONENT 3: Accounts Directory ===================== */}
          <div className="rounded-xl border border-[#24241B] bg-[#24241B] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-semibold text-[#F4F4F0]">Accounts Directory</h3>
                  <p className="text-xs text-[#F4F4F0]/70 mt-1">
                    High-density searchable records
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[#1D1D16] p-1 rounded-lg border border-white/5">
                  <button
                    type="button"
                    onClick={() => setAccountMode('interactive')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      accountMode === 'interactive'
                        ? 'bg-[#24241B] text-[#F4F4F0]'
                        : 'text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountMode('video')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                      accountMode === 'video'
                        ? 'bg-[#24241B] text-[#F4F4F0]'
                        : 'text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    Video
                  </button>
                </div>
              </div>

              {accountMode === 'interactive' ? (
                <div className="mt-5 space-y-3">
                  {/* Search Filter Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#F4F4F0]/40" />
                    <input
                      type="text"
                      placeholder="Filter accounts by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-[#1D1D16] border border-white/10 text-[#F4F4F0] placeholder-[#F4F4F0]/40 focus:outline-none focus:border-[#F4F4F0]/50"
                    />
                  </div>

                  {/* High Density Table */}
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {filteredAccounts.map((acc) => {
                      const isSelected = selectedAccount === acc.name;
                      return (
                        <div
                          key={acc.name}
                          onClick={() => setSelectedAccount(acc.name)}
                          className={`p-2.5 rounded-lg border transition-colors cursor-pointer text-xs flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#1D1D16] border-[#F4F4F0]/30'
                              : 'bg-[#1D1D16]/60 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-[#F4F4F0]">{acc.name}</div>
                            <div className="text-[11px] text-[#F4F4F0]/50 font-sans">
                              Owner: {acc.rep}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-sans font-semibold text-[#F4F4F0]">
                              {acc.arr}
                            </div>
                            <div className="text-[10px] text-[#F4F4F0]/60">
                              {acc.health}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Dossier Preview */}
                  {selectedAccount && (
                    <div className="p-2.5 rounded bg-[#1D1D16] border border-white/5 text-[11px] text-[#F4F4F0]/70 font-sans">
                      <span className="text-[#F4F4F0]/40">Memo: </span>
                      {accounts.find((a) => a.name === selectedAccount)?.note}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-5 rounded-lg overflow-hidden border border-white/5 aspect-video bg-[#1D1D16]">
                  <video
                    src="/assets/accounts-directory.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#F4F4F0]/50 font-sans">
              <span>{accounts.length} enterprise records</span>
              <span>Instant sub-5ms query</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

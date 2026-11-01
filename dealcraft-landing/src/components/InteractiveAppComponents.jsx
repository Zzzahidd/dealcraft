import React, { useState } from 'react';
import { Check, Plus, ChevronRight, ChevronDown } from 'lucide-react';

// ==================== SegmentBar from sales-crm-main ====================
function SegmentBar({ percent, segments = 24, tone = 'auto' }) {
  const filled = Math.round((percent / 100) * segments);

  const getSegmentColor = (index) => {
    if (index >= filled) return 'rgba(255, 255, 255, 0.08)';
    if (tone === 'danger') return '#e57d70';
    if (tone === 'warning') return '#d8a443';
    if (tone === 'success') return '#5cba86';
    // auto tone
    const red = Math.floor(filled / 3);
    const amber = Math.ceil(filled / 3);
    if (index < red) return '#e57d70';
    if (index < red + amber) return '#d8a443';
    return '#5cba86';
  };

  return (
    <div
      role="meter"
      aria-valuenow={percent}
      className="flex h-3 items-center gap-[2px] overflow-hidden rounded-[2px] bg-white/5 px-1 border border-white/5 w-full"
    >
      {Array.from({ length: segments }, (_, index) => (
        <span
          key={index}
          className="h-2 flex-1 rounded-[1px] transition-colors duration-150"
          style={{ backgroundColor: getSegmentColor(index) }}
        />
      ))}
    </div>
  );
}

export default function InteractiveAppComponents() {
  // ==================== COMPONENT 1: Deals Pipeline (from gr8r-studio-main/src/pages/pipeline.js) ====================
  const [pipelineDeals, setPipelineDeals] = useState([
    {
      id: 'lvmh',
      name: 'LVMH',
      stage: 'Renewal',
      pipelineValue: 420000,
      winProbability: 78,
      owner: 'Sarah Nguyen',
      ownerInitials: 'SN',
    },
    {
      id: 'disney',
      name: 'Disney',
      stage: 'Expansion',
      pipelineValue: 311242,
      winProbability: 51,
      owner: 'James Taylor',
      ownerInitials: 'JT',
    },
    {
      id: 'paypal',
      name: 'Paypal',
      stage: 'Upsell',
      pipelineValue: 124232,
      winProbability: 62,
      owner: 'Maria Keller',
      ownerInitials: 'MK',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      stage: 'Renewal',
      pipelineValue: 185000,
      winProbability: 85,
      owner: 'Alex Santos',
      ownerInitials: 'AS',
    },
  ]);

  const stages = ['New Logo', 'Upsell', 'Expansion', 'Renewal'];
  const [activeStageFilter, setActiveStageFilter] = useState('All');

  const advanceDealStage = (dealId) => {
    setPipelineDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== dealId) return deal;
        const currentIdx = stages.indexOf(deal.stage);
        const nextIdx = (currentIdx + 1) % stages.length;
        return { ...deal, stage: stages[nextIdx] };
      })
    );
  };

  const formatMoney = (val) => {
    if (!val) return '$0';
    return `$${(val / 1000).toFixed(0)}k`;
  };

  // ==================== COMPONENT 2: Task List with Subtasks (from gr8r-studio-main/src/components/task-list.js) ====================
  const [tasks, setTasks] = useState([
    {
      id: 't1',
      key: 'WEB-109',
      title: 'Create homepage wirefra...',
      status: 'Review',
      priority: 'High',
      assignee: 'Sarah Chen',
      assigneeInitials: 'SC',
      done: false,
      expanded: true,
      subtasks: [
        { id: 's1', title: 'Desktop layout', done: true },
        { id: 's2', title: 'Tablet layout', done: true },
        { id: 's3', title: 'Mobile layout', done: true },
        { id: 's4', title: 'Annotate interactions', done: false },
      ],
    },
    {
      id: 't2',
      key: 'WEB-112',
      title: 'Finalize navigation stru...',
      status: 'In Progress',
      priority: 'High',
      assignee: 'John Carter',
      assigneeInitials: 'JC',
      done: false,
      expanded: false,
      subtasks: [
        { id: 's5', title: 'Primary nav structure', done: true },
        { id: 's6', title: 'Mega-menu content', done: false },
      ],
    },
    {
      id: 't3',
      key: 'CRM-204',
      title: 'LVMH contract terms sign-off',
      status: 'Done',
      priority: 'High',
      assignee: 'Sarah Nguyen',
      assigneeInitials: 'SN',
      done: true,
      expanded: false,
      subtasks: [],
    },
  ]);

  const [newTaskInput, setNewTaskInput] = useState('');

  const toggleTaskDone = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done, status: !t.done ? 'Done' : 'Todo' } : t
      )
    );
  };

  const toggleSubtask = (taskId, subId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newSubs = t.subtasks.map((s) =>
          s.id === subId ? { ...s, done: !s.done } : s
        );
        const allDone = newSubs.length > 0 && newSubs.every((s) => s.done);
        return {
          ...t,
          subtasks: newSubs,
          done: allDone,
          status: allDone ? 'Done' : t.status === 'Done' ? 'Review' : t.status,
        };
      })
    );
  };

  const toggleExpand = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, expanded: !t.expanded } : t))
    );
  };

  const cycleStatus = (id) => {
    const statuses = ['Todo', 'In Progress', 'Review', 'Done'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const cur = statuses.indexOf(t.status);
        const next = statuses[(cur + 1) % statuses.length];
        return { ...t, status: next, done: next === 'Done' };
      })
    );
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: 't' + Date.now(),
      key: 'TSK-' + Math.floor(100 + Math.random() * 899),
      title: newTaskInput.trim(),
      status: 'Todo',
      priority: 'High',
      assignee: 'Tanjim Islam',
      assigneeInitials: 'TI',
      done: false,
      expanded: false,
      subtasks: [],
    };
    setTasks([newTask, ...tasks]);
    setNewTaskInput('');
  };

  // ==================== COMPONENT 3: Companies Table & Pipeline Health (from sales-crm-main) ====================
  const companiesData = [
    {
      id: 'lvmh',
      name: 'LVMH',
      tags: [
        { label: 'Enterprise', tone: 'blue' },
        { label: 'Upsell', tone: 'purple' },
      ],
      owner: 'Sarah Nguyen',
      arr: '$420,000',
      win: 70,
      health: { discovery: 85, evaluation: 72, procurement: 68 },
    },
    {
      id: 'disney',
      name: 'Disney',
      tags: [
        { label: 'Enterprise', tone: 'blue' },
        { label: 'New Logo', tone: 'green' },
      ],
      owner: 'James Taylor',
      arr: '$311,242',
      win: 51,
      health: { discovery: 65, evaluation: 45, procurement: 30 },
    },
    {
      id: 'paypal',
      name: 'Paypal',
      tags: [{ label: 'Enterprise', tone: 'blue' }],
      owner: 'Maria Keller',
      arr: '$124,232',
      win: 62,
      health: { discovery: 90, evaluation: 70, procurement: 55 },
    },
    {
      id: 'stripe',
      name: 'Stripe',
      tags: [
        { label: 'Growth', tone: 'teal' },
        { label: 'Pilot', tone: 'amber' },
      ],
      owner: 'Alex Santos',
      arr: '$185,000',
      win: 85,
      health: { discovery: 95, evaluation: 88, procurement: 82 },
    },
  ];

  const [selectedCompanyId, setSelectedCompanyId] = useState('disney');
  const [selectedRowIds, setSelectedRowIds] = useState(new Set(['lvmh']));

  const toggleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedCompany = companiesData.find((c) => c.id === selectedCompanyId) || companiesData[1];

  return (
    <section className="py-24 bg-[#1D1D16] text-[#F4F4F0] border-t border-[#24241B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header matching Figma 3.png */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F0]">
            Built for closing deals.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F4F4F0]/80">
            Click through the cards below to see how pipeline stages, daily tasks, and account health work in Dealcraft.
          </p>
        </div>

        {/* 3 Real Dealcraft Application Components Grid (Faithfully matching Image 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===================== CARD 1: The Deals Pipeline ===================== */}
          <div className="rounded-[2px] border border-[#24241B] bg-[#24241B] p-5 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
                <div>
                  <div className="text-[11px] font-sans text-[#F4F4F0]/50 uppercase tracking-wider">
                    CRM / Deals
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F4F0] mt-0.5">
                    The Deals Pipeline
                  </h3>
                </div>
                <span className="text-xs font-sans font-semibold text-[#F4F4F0] px-2.5 py-1 rounded-[2px] bg-[#1D1D16] border border-white/5">
                  $1040k ARR
                </span>
              </div>

              {/* Stage Filter Tabs */}
              <div className="flex items-center gap-1.5 mt-4 pb-1 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveStageFilter('All')}
                  className={`px-2 py-0.5 rounded-[2px] text-[11px] font-medium transition-colors ${
                    activeStageFilter === 'All'
                      ? 'bg-[#F4F4F0] text-[#1D1D16]'
                      : 'bg-[#1D1D16] text-[#F4F4F0]/60 hover:text-[#F4F4F0]'
                  }`}
                >
                  All (4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStageFilter('New Logo')}
                  className={`px-2 py-0.5 rounded-[2px] text-[11px] font-medium whitespace-nowrap transition-colors ${
                    activeStageFilter === 'New Logo'
                      ? 'bg-[#F4F4F0] text-[#1D1D16]'
                      : 'bg-[#1D1D16] text-[#F4F4F0]/60 hover:text-[#F4F4F0]'
                  }`}
                >
                  New Logo (0)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStageFilter('Upsell')}
                  className={`px-2 py-0.5 rounded-[2px] text-[11px] font-medium whitespace-nowrap transition-colors ${
                    activeStageFilter === 'Upsell'
                      ? 'bg-[#F4F4F0] text-[#1D1D16]'
                      : 'bg-[#1D1D16] text-[#F4F4F0]/60 hover:text-[#F4F4F0]'
                  }`}
                >
                  Upsell (1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStageFilter('Expansion')}
                  className={`px-2 py-0.5 rounded-[2px] text-[11px] font-medium whitespace-nowrap transition-colors ${
                    activeStageFilter === 'Expansion'
                      ? 'bg-[#F4F4F0] text-[#1D1D16]'
                      : 'bg-[#1D1D16] text-[#F4F4F0]/60 hover:text-[#F4F4F0]'
                  }`}
                >
                  Expansion (1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStageFilter('Renewal')}
                  className={`px-2 py-0.5 rounded-[2px] text-[11px] font-medium whitespace-nowrap transition-colors ${
                    activeStageFilter === 'Renewal'
                      ? 'bg-[#F4F4F0] text-[#1D1D16]'
                      : 'bg-[#1D1D16] text-[#F4F4F0]/60 hover:text-[#F4F4F0]'
                  }`}
                >
                  Renewal (2)
                </button>
              </div>

              {/* Deal Cards matching Image 4 */}
              <div className="mt-3.5 space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {pipelineDeals
                  .filter((d) => activeStageFilter === 'All' || d.stage === activeStageFilter)
                  .map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => advanceDealStage(deal.id)}
                      className="p-3 rounded-[2px] bg-[#1D1D16] border border-white/5 hover:border-white/20 transition-colors cursor-pointer select-none group"
                    >
                      {/* Deal Title & ARR */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-[2px] bg-[#24241B] border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#F4F4F0]">
                            {deal.name.slice(0, 1)}
                          </div>
                          <span className="text-xs font-semibold text-[#F4F4F0]">
                            {deal.name}
                          </span>
                        </div>
                        <span className="text-xs font-sans font-bold text-[#F4F4F0]">
                          {formatMoney(deal.pipelineValue)}
                        </span>
                      </div>

                      {/* Rep, Stage Pill, Next Indicator */}
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-[#343427] text-[#F4F4F0] text-[9px] font-semibold flex items-center justify-center">
                            {deal.ownerInitials}
                          </span>
                          <span className="text-[#F4F4F0]/60 text-[11px]">
                            {deal.owner}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-sans bg-[#24241B] border border-white/10 text-[#F4F4F0]">
                            {deal.stage}
                          </span>
                          <span className="text-[10px] text-[#F4F4F0]/40 group-hover:text-[#F4F4F0] transition-colors">
                            → Next
                          </span>
                        </div>
                      </div>

                      {/* Win Probability Bar */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-[#24241B] rounded-[1px] overflow-hidden">
                          <div
                            className="h-full rounded-[1px] transition-all duration-200"
                            style={{
                              width: `${deal.winProbability}%`,
                              backgroundColor:
                                deal.winProbability >= 70
                                  ? '#5cba86'
                                  : deal.winProbability >= 55
                                  ? '#5cba86'
                                  : '#d8a443',
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-sans text-[#F4F4F0]/50">
                          {deal.winProbability}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-[#F4F4F0]/50">
              <span>Click card to advance stage</span>
              <span>Sub-5ms SQLite</span>
            </div>
          </div>

          {/* ===================== CARD 2: Fast Task Matrix ===================== */}
          <div className="rounded-[2px] border border-[#24241B] bg-[#24241B] p-5 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
                <div>
                  <div className="text-[11px] font-sans text-[#F4F4F0]/50 uppercase tracking-wider">
                    Workspace / Execution
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F4F0] mt-0.5">
                    Fast Task Matrix
                  </h3>
                </div>
                <span className="text-xs font-sans text-[#F4F4F0]/60 px-2 py-0.5 rounded-[2px] bg-[#1D1D16] border border-white/5">
                  2 remaining
                </span>
              </div>

              {/* Task Adder */}
              <form onSubmit={handleCreateTask} className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Capture task and hit Enter..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-[2px] bg-[#1D1D16] border border-white/10 text-[#F4F4F0] placeholder-[#F4F4F0]/40 focus:outline-none focus:border-[#F4F4F0]/60"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 rounded-[2px] bg-[#F4F4F0] text-[#1D1D16] hover:bg-[#F4F4F0]/90 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Task Rows matching Image 4 */}
              <div className="mt-3.5 space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-2.5 rounded-[2px] bg-[#1D1D16] border border-white/5 hover:border-white/15 transition-colors select-none"
                  >
                    {/* Main Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {task.subtasks.length > 0 ? (
                          <button
                            type="button"
                            onClick={() => toggleExpand(task.id)}
                            className="p-0.5 text-[#F4F4F0]/40 hover:text-[#F4F4F0] transition-colors"
                            aria-label="Toggle subtasks"
                          >
                            {task.expanded ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </button>
                        ) : (
                          <span className="w-3" />
                        )}

                        <button
                          type="button"
                          onClick={() => toggleTaskDone(task.id)}
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                            task.done
                              ? 'bg-[#5cba86] border-[#5cba86] text-[#1D1D16]'
                              : 'border-white/20 bg-transparent hover:border-white/40'
                          }`}
                        >
                          {task.done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </button>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-sans text-[#F4F4F0]/40">
                              {task.key}
                            </span>
                            <span
                              className={`text-xs truncate block ${
                                task.done
                                  ? 'line-through text-[#F4F4F0]/40'
                                  : 'text-[#F4F4F0]'
                              }`}
                            >
                              {task.title}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badges with Exact Application Colors */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="w-4 h-4 rounded-full bg-[#343427] text-[#F4F4F0] text-[9px] font-semibold flex items-center justify-center">
                          {task.assigneeInitials}
                        </span>
                        <button
                          type="button"
                          onClick={() => cycleStatus(task.id)}
                          className={`px-2 py-0.5 rounded-[2px] text-[10px] font-medium border ${
                            task.status === 'Done'
                              ? 'bg-[#1f3a2d] text-[#b1ebc5] border-[#275137]'
                              : task.status === 'Review'
                              ? 'bg-[#231f3a] text-[#b7aee9] border-[#4b437b]'
                              : task.status === 'In Progress'
                              ? 'bg-[#31221b] text-[#fed7aa] border-[#6c4830]'
                              : 'bg-[#24241B] text-[#F4F4F0]/70 border-white/10'
                          }`}
                        >
                          {task.status}
                        </button>
                      </div>
                    </div>

                    {/* Subtasks matching Image 4 */}
                    {task.expanded && task.subtasks.length > 0 && (
                      <div className="mt-2 pl-6 space-y-1.5 border-t border-white/5 pt-2">
                        {task.subtasks.map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => toggleSubtask(task.id, sub.id)}
                            className="flex items-center gap-2 text-[11px] cursor-pointer text-[#F4F4F0]/70 hover:text-[#F4F4F0]"
                          >
                            <span
                              className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                                sub.done
                                  ? 'bg-[#5cba86] border-[#5cba86] text-[#1D1D16]'
                                  : 'border-white/20'
                              }`}
                            >
                              {sub.done && <Check className="w-2 h-2 stroke-[3]" />}
                            </span>
                            <span className={sub.done ? 'line-through text-[#F4F4F0]/40' : ''}>
                              {sub.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-[#F4F4F0]/50">
              <span>Shortcut: N to add</span>
              <span>Click subtasks to complete</span>
            </div>
          </div>

          {/* ===================== CARD 3: Pipeline Health ===================== */}
          <div className="rounded-[2px] border border-[#24241B] bg-[#24241B] p-5 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
                <div>
                  <div className="text-[11px] font-sans text-[#F4F4F0]/50 uppercase tracking-wider">
                    CRM / Accounts & Health
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F4F0] mt-0.5">
                    Pipeline Health
                  </h3>
                </div>
                <span className="text-xs font-sans text-[#F4F4F0]/60 px-2 py-0.5 rounded-[2px] bg-[#1D1D16] border border-white/5">
                  51% win rate
                </span>
              </div>

              {/* Companies Table matching Image 4 */}
              <div className="mt-4 space-y-1.5">
                {companiesData.map((c) => {
                  const isSelected = selectedCompanyId === c.id;
                  const isChecked = selectedRowIds.has(c.id);

                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCompanyId(c.id)}
                      className={`p-2 rounded-[2px] border transition-colors cursor-pointer text-xs flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1D1D16] border-[#F4F4F0]/40'
                          : 'bg-[#1D1D16]/60 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => toggleSelectRow(c.id, e)}
                          className="rounded-[2px] border-white/20 bg-transparent accent-[#F4F4F0] cursor-pointer"
                        />
                        <span className="font-semibold text-[#F4F4F0]">{c.name}</span>
                        <div className="flex gap-1">
                          {c.tags.map((tag) => {
                            const toneClasses = {
                              blue: 'bg-[#1d2b3e] text-[#bfdbfe] border-[#23354c]',
                              purple: 'bg-[#231f3a] text-[#b7aee9] border-[#4b437b]',
                              green: 'bg-[#1f3a2d] text-[#b1ebc5] border-[#275137]',
                              teal: 'bg-[#102a27] text-[#22c55e] border-[#3b6149]',
                              amber: 'bg-[#31221b] text-[#fed7aa] border-[#6c4830]',
                            };
                            return (
                              <span
                                key={tag.label}
                                className={`text-[9px] px-1.5 py-0.2 rounded-[2px] font-sans border ${
                                  toneClasses[tag.tone] || toneClasses.blue
                                }`}
                              >
                                {tag.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-sans font-bold text-[#F4F4F0]">{c.arr}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PipelineHealth Breakdown matching Image 4 */}
              <div className="mt-4 p-3 rounded-[2px] bg-[#1D1D16] border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#F4F4F0]/70 font-sans">
                    {selectedCompany.name} Stage Breakdown
                  </span>
                  <span className="text-xs font-sans font-bold text-[#5cba86]">
                    {selectedCompany.win}% total
                  </span>
                </div>

                {/* Discovery Segment */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#F4F4F0]/60 font-sans">
                    <span>Discovery</span>
                    <span>{selectedCompany.health.discovery}%</span>
                  </div>
                  <SegmentBar percent={selectedCompany.health.discovery} segments={24} tone="danger" />
                </div>

                {/* Evaluation Segment */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#F4F4F0]/60 font-sans">
                    <span>Evaluation</span>
                    <span>{selectedCompany.health.evaluation}%</span>
                  </div>
                  <SegmentBar percent={selectedCompany.health.evaluation} segments={24} tone="warning" />
                </div>

                {/* Procurement Segment */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#F4F4F0]/60 font-sans">
                    <span>Procurement</span>
                    <span>{selectedCompany.health.procurement}%</span>
                  </div>
                  <SegmentBar percent={selectedCompany.health.procurement} segments={24} tone="success" />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-[#F4F4F0]/50">
              <span>Click company to inspect health</span>
              <span>Real sales-crm engine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

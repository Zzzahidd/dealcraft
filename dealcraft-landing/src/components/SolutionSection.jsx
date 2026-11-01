import React, { useState } from 'react';

// Dealcraft Sample Data
const INITIAL_DEALS = [
  {
    id: 'apple',
    name: 'Apple Inc.',
    stage: 'Pilot',
    value: '$180,000',
    winProbability: 85,
    owner: 'Sarah Lin',
    health: 'Strong',
    nextTask: 'Review Master Services Agreement',
    contact: 'John Mercer (VP Engineering)',
  },
  {
    id: 'disney',
    name: 'The Walt Disney Company',
    stage: 'Expansion',
    value: '$240,000',
    winProbability: 75,
    owner: 'Michael Chen',
    health: 'Caution',
    nextTask: 'Security review with InfoSec team',
    contact: 'Elena Rostova (Head of Infra)',
  },
  {
    id: 'lvmh',
    name: 'LVMH Luxury Group',
    stage: 'New Logo',
    value: '$320,000',
    winProbability: 60,
    owner: 'Sarah Lin',
    health: 'Strong',
    nextTask: 'Technical demo for retail operations',
    contact: 'Marc Dupont (CTO Europe)',
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    stage: 'Renewal',
    value: '$410,000',
    winProbability: 95,
    owner: 'Alex Rivera',
    health: 'Optimal',
    nextTask: 'Annual renewal contract signature',
    contact: 'David Kim (Head of Partnerships)',
  },
];

const STAGES = ['New Logo', 'Pilot', 'Expansion', 'Renewal'];

export default function SolutionSection() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [selectedDeal, setSelectedDeal] = useState(INITIAL_DEALS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [completedTasks, setCompletedTasks] = useState({ 1: true, 2: false, 3: false });

  // Move deal to next stage
  const advanceDeal = (dealId) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        const currentIndex = STAGES.indexOf(d.stage);
        const nextIndex = (currentIndex + 1) % STAGES.length;
        const updated = { ...d, stage: STAGES[nextIndex] };
        if (selectedDeal?.id === dealId) setSelectedDeal(updated);
        return updated;
      })
    );
  };

  const tasksList = [
    { id: 1, title: 'Draft security compliance sheet for Disney', project: 'Enterprise Onboarding', priority: 'High', due: 'Today' },
    { id: 2, title: 'Sign Master Services Agreement with Apple Inc.', project: 'Q4 Contract Closures', priority: 'Urgent', due: 'Tomorrow' },
    { id: 3, title: 'Deploy local SQLite schema migration v2.4', project: 'Core Desktop Engine', priority: 'Medium', due: 'In 2 days' },
  ];

  return (
    <section id="pipeline" className="bg-white py-24 sm:py-32 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow Tag: Blue Dash + THE SOLUTION matching reference */}
        <div className="flex items-center justify-center gap-2 mb-6 text-center">
          <span className="w-4 h-[2px] bg-[#2563eb]"></span>
          <span className="text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
            THE SOLUTION
          </span>
        </div>

        {/* Headline: Serif Editorial matching reference cadence */}
        <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif">
            Streamline Deal Execution, Reduce Errors,
            <br />
            and Increase Closing Speed by 10x
            <br />
            with Enterprise-Grade Desktop
            <br />
            Infrastructure
          </h2>
        </div>

        {/* Sub-label matching reference */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-[2px] bg-[#3122e8]"></span>
            <span className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-neutral-800">
              PIPELINE STUDIO
            </span>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-neutral-100 p-1 rounded-none text-xs font-medium text-neutral-600">
            <button
              type="button"
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-none transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'hover:text-neutral-900'
              }`}
            >
              Sales Pipeline
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tasks')}
              className={`px-3 py-1.5 rounded-none transition-all cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'hover:text-neutral-900'
              }`}
            >
              Linear Tasks
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('spotlight')}
              className={`px-3 py-1.5 rounded-none transition-all cursor-pointer ${
                activeTab === 'spotlight'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'hover:text-neutral-900'
              }`}
            >
              Alt+Space Spotlight
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1.5 rounded-none transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'hover:text-neutral-900'
              }`}
            >
              Full Desktop Recording
            </button>
          </div>
        </div>

        {/* The Outer Glowing Brand Canvas matching reference image bottom */}
        <div className="relative rounded-none overflow-hidden border border-indigo-400/40 shadow-none bg-gradient-to-br from-[#3122e8] via-[#4124fb] to-[#120e3d] p-3 sm:p-5 md:p-6">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Inner Application Workspace - Clean without fake window chrome */}
          <div className="relative z-10 bg-[#12120e] rounded-none border border-white/10 shadow-none overflow-hidden min-h-[520px] flex flex-col text-[#F4F4F0]">
            {/* TAB 1: Real Deals Pipeline Kanban */}
            {activeTab === 'pipeline' && (
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">Enterprise Revenue Pipeline</h3>
                    <p className="text-xs text-neutral-400">Click any deal to view the dossier, or click &quot;Advance&quot; to progress stages.</p>
                  </div>
                  <div className="text-xs font-sans text-neutral-300 bg-white/5 px-2.5 py-1 rounded-none border border-white/10">
                    Total Pipeline: <span className="text-emerald-400 font-bold">$1,150,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                  {STAGES.map((stage) => {
                    const stageDeals = deals.filter((d) => d.stage === stage);
                    return (
                      <div key={stage} className="bg-[#171712] rounded-none border border-white/5 p-3 flex flex-col">
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5">
                          <span className="text-xs font-semibold text-neutral-200">{stage}</span>
                          <span className="text-[11px] font-sans text-neutral-500 bg-white/5 px-1.5 py-0.5 rounded-none">
                            {stageDeals.length}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2.5 flex-1">
                          {stageDeals.map((deal) => (
                            <div
                              key={deal.id}
                              onClick={() => {
                                setSelectedDeal(deal);
                                setIsDrawerOpen(true);
                              }}
                              className="bg-[#202018] hover:bg-[#28281e] border border-white/10 rounded-none p-3 cursor-pointer transition-all duration-150 group shadow-sm"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                                  {deal.name}
                                </span>
                                <span className="text-xs font-sans text-emerald-400 font-medium">
                                  {deal.value}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 truncate mb-2">
                                {deal.nextTask}
                              </p>
                              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-neutral-400">
                                <span>{deal.owner}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    advanceDeal(deal.id);
                                  }}
                                  className="px-2 py-0.5 rounded-none bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 text-[10px] font-semibold tracking-wide border border-blue-500/30 transition-colors"
                                >
                                  Advance &rarr;
                                </button>
                              </div>
                            </div>
                          ))}
                          {stageDeals.length === 0 && (
                            <div className="h-24 rounded-none border border-dashed border-white/10 flex items-center justify-center text-xs text-neutral-600">
                              Drop deals here
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Linear-Style Tasks & Project Execution */}
            {activeTab === 'tasks' && (
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">Fulfillment &amp; Execution Tasks</h3>
                    <p className="text-xs text-neutral-400">Linked directly to customer accounts. No spinning loaders.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const id = Date.now();
                      tasksList.push({
                        id,
                        title: 'Follow-up call with enterprise security lead',
                        project: 'Strategic Accounts',
                        priority: 'High',
                        due: 'Tomorrow',
                      });
                    }}
                    className="text-xs font-medium bg-white text-black px-3 py-1.5 rounded-none hover:bg-neutral-200 transition-colors font-sans"
                  >
                    + New Task (C)
                  </button>
                </div>

                <div className="space-y-2 flex-1">
                  {tasksList.map((task) => (
                    <div
                      key={task.id}
                      onClick={() =>
                        setCompletedTasks((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                      }
                      className="flex items-center justify-between p-3.5 bg-[#171712] hover:bg-[#202018] border border-white/5 rounded-none cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-none border flex items-center justify-center transition-colors ${
                            completedTasks[task.id]
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'border-white/30 hover:border-white'
                          }`}
                        >
                          {completedTasks[task.id] && (
                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            completedTasks[task.id] ? 'line-through text-neutral-500' : 'text-neutral-200'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-sans">
                        <span className="text-neutral-400 hidden sm:inline">{task.project}</span>
                        <span
                          className={`px-2 py-0.5 rounded-none text-[10px] font-semibold ${
                            task.priority === 'Urgent'
                              ? 'bg-red-950/60 text-red-300 border border-red-800/40'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          }`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-neutral-500 text-[11px]">{task.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Alt + Space Spotlight Launcher */}
            {activeTab === 'spotlight' && (
              <div className="p-8 flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-xl bg-[#1c1c16] rounded-none border border-white/15 shadow-2xl p-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <svg className="w-5 h-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={spotlightQuery}
                      onChange={(e) => setSpotlightQuery(e.target.value)}
                      placeholder="Type a deal, account, command, or shortcut (Alt + Space)..."
                      className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none font-sans"
                      autoFocus
                    />
                    <kbd className="px-2 py-0.5 rounded-none bg-white/10 text-neutral-400 text-[10px] font-sans">ESC</kbd>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="px-3 py-2 rounded-none bg-blue-600/20 text-white text-xs flex items-center justify-between border border-blue-500/30">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-bold">🏢 Disney</span>
                        <span className="text-neutral-300">— Advance to Expansion ($240,000)</span>
                      </div>
                      <kbd className="text-[10px] font-sans text-neutral-400 bg-black/40 px-1.5 py-0.5 rounded-none">↵ Run</kbd>
                    </div>
                    <div className="px-3 py-2 rounded-none hover:bg-white/5 text-neutral-300 text-xs flex items-center justify-between transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">📝 Note</span>
                        <span>Call notes with Apple VP Engineering (4 mins ago)</span>
                      </div>
                      <kbd className="text-[10px] font-sans text-neutral-400">↵ Open</kbd>
                    </div>
                    <div className="px-3 py-2 rounded-none hover:bg-white/5 text-neutral-300 text-xs flex items-center justify-between transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">⚡ Action</span>
                        <span>Create new enterprise pipeline deal...</span>
                      </div>
                      <kbd className="text-[10px] font-sans text-neutral-400">↵ Create</kbd>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Real Application Screen Recording Video */}
            {activeTab === 'video' && (
              <div className="flex-1 bg-black flex items-center justify-center p-2">
                <video
                  src="/assets/deals-pipeline.mp4"
                  poster="/assets/hero-poster.jpg"
                  className="w-full h-auto max-h-[500px] object-contain rounded-none"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            )}
          </div>
        </div>

        {/* Side Drawer Modal for Deal Details */}
        {isDrawerOpen && selectedDeal && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#181812] text-[#F4F4F0] h-full shadow-2xl border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-sans text-blue-400 uppercase tracking-widest">Account Dossier</span>
                    <h3 className="text-xl font-bold text-white mt-1">{selectedDeal.name}</h3>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-none text-neutral-400 hover:text-white"
                  >
                    &times;
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-3 bg-white/5 rounded-none border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Pipeline Value</span>
                    <span className="text-base font-sans font-bold text-emerald-400">{selectedDeal.value}</span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-none border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Stage</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-none bg-blue-900/60 text-blue-200 border border-blue-700/50">
                      {selectedDeal.stage}
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-none border border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Win Probability</span>
                    <span className="text-xs font-sans font-semibold text-neutral-200">{selectedDeal.winProbability}%</span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-none border border-white/5">
                    <span className="text-xs text-neutral-400 block mb-1">Key Stakeholder</span>
                    <span className="text-xs font-semibold text-white">{selectedDeal.contact}</span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-none border border-white/5">
                    <span className="text-xs text-neutral-400 block mb-1">Next Active Deliverable</span>
                    <span className="text-xs text-neutral-200">{selectedDeal.nextTask}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex gap-3">
                <button
                  type="button"
                  onClick={() => advanceDeal(selectedDeal.id)}
                  className="flex-1 py-2.5 rounded-none bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Advance Stage
                </button>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2.5 rounded-none bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

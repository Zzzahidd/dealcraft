import React from 'react';

export default function LinearAiSection() {
  return (
    <section id="ai-automations" className="w-full bg-white border-b border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto border-x border-neutral-200">
        
        {/* Header matching Linear Image 2 */}
        <div className="px-6 py-12 sm:px-10 sm:py-16 border-b border-neutral-200 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif">
              AI and
              <br />
              automations
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
              Build and deploy AI agents that work alongside you as teammates. Work on complex tasks together or delegate entire issues end-to-end.
            </p>
            <a
              href="#demo"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-blue-600 transition-colors"
            >
              <span>Learn more</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* 4 Agent Columns Visual Showcase matching Linear Image 2 */}
        <div className="p-6 sm:p-10 bg-neutral-950 text-white overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Column 1: Features & Permissions Card */}
            <div className="bg-[#141416] border border-neutral-800 p-5 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase block mb-3">
                  Features
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  What are the most important customer permissions? Add them to the project.
                </p>
                <div className="space-y-2 border-t border-neutral-800/80 pt-3 text-[11px]">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>Add granular project permissions</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                    <span>Let guests access multiple teams</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                    <span>Create custom roles with scoped read</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500">
                <span>Access Controls</span>
                <span className="text-neutral-400 font-mono">v2.4</span>
              </div>
            </div>

            {/* Column 2: Cursor Agent Card */}
            <div className="bg-[#141416] border border-neutral-800 p-5 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200">
                    <span className="text-purple-400">⚡</span>
                    <span>Cursor</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">Auto</span>
                </div>
                <div className="p-3 bg-[#1c1c20] border border-neutral-700/60 rounded text-xs text-neutral-200 mb-4 leading-relaxed font-mono">
                  add retry handling for failed image uploads described in this issue
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 bg-neutral-900/60 px-2 py-1 border border-neutral-800">
                  <span className="text-purple-400 text-xs">⟳</span>
                  <span className="font-mono text-[10px]">ENG-2044</span>
                  <span className="text-neutral-500 truncate">added to context</span>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500">
                <span>Code Agent Session</span>
                <span className="text-emerald-400">● Live</span>
              </div>
            </div>

            {/* Column 3: Dealcraft Triage Agent Card */}
            <div className="bg-[#141416] border border-neutral-800 p-5 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200">
                    <span className="text-blue-400">◈</span>
                    <span>Dealcraft Agent</span>
                    <span className="text-[10px] text-neutral-500">Claude 3.5</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">v1</span>
                </div>
                <div className="p-3 bg-[#1c1c20] border border-neutral-700/60 rounded text-xs text-neutral-200 mb-4 leading-relaxed font-mono">
                  Review today's mobile triage and group the issues by what should happen next
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 bg-neutral-900/60 px-2 py-1 border border-neutral-800">
                  <span className="text-blue-400 text-xs">⚙</span>
                  <span className="text-neutral-300">Mobile Triage</span>
                  <span className="text-neutral-500 truncate">added to context</span>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500">
                <span>Autonomous Triage</span>
                <span className="text-blue-400">3 ready</span>
              </div>
            </div>

            {/* Column 4: ChatPRD / Spec Analyst Card */}
            <div className="bg-[#141416] border border-neutral-800 p-5 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200">
                    <span className="text-emerald-400">◉</span>
                    <span>ChatPRD</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">v2.1</span>
                </div>
                <div className="p-3 bg-[#1c1c20] border border-neutral-700/60 rounded text-xs text-neutral-300 mb-3 leading-relaxed font-mono">
                  review this issue, draft comprehensive requirements, and break the execution down
                </div>
                <div className="text-[11px] text-neutral-500 mb-2">
                  Worked for 1 min · Updated the issue with requirements, key decisions, and acceptance criteria.
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/20 px-2 py-1 border border-emerald-900/40">
                  <span className="font-mono text-[10px]">ENG-2320</span>
                  <span className="truncate">Define offline sync status</span>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500">
                <span>PRD Synthesizer</span>
                <span className="text-emerald-400 font-mono">Done ✓</span>
              </div>
            </div>

          </div>

          {/* Bottom Bar matching Linear Image 2 */}
          <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
            <span className="font-medium text-neutral-300">Features</span>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#ai-automations" className="hover:text-white transition-colors">Dealcraft Agent +</a>
              <a href="#ai-automations" className="hover:text-white transition-colors">Triage +</a>
              <a href="#ai-automations" className="hover:text-white transition-colors">Coding sessions +</a>
              <a href="#ai-automations" className="hover:text-white transition-colors">Dealcraft MCP +</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

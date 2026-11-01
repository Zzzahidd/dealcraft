import React, { useState } from 'react';
import InteractiveTimeline from './InteractiveTimeline';
import InteractiveCalendar from './InteractiveCalendar';
import DealcraftBrandMosaic from './DealcraftBrandMosaic';

function CheckIcon({ className = "w-3.5 h-3.5 text-neutral-400 stroke-current shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function SpekFeaturesSection() {
  const [activeShortcut, setActiveShortcut] = useState('alt-space');

  return (
    <section id="features" className="w-full bg-white border-b border-neutral-200 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto border-x-0 md:border-x border-neutral-200">
        
        {/* Section Header */}
        <div className="px-4 py-8 sm:px-10 sm:py-12 border-b border-neutral-200 bg-neutral-50/40">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-[2px] bg-[#2563eb]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
              SYSTEM WORKSPACE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.14] sm:leading-[1.12] text-neutral-900 font-serif break-words">
            Fast, Keyboard-First, and Always Responsive{' '}
            <br className="hidden sm:inline" />
            <span className="text-neutral-500 font-serif">Engineered for Operators Who Move at Full Speed</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-neutral-600 max-w-2xl font-normal leading-relaxed break-words">
            Dealcraft pairs instant global hotkeys with visual pipeline management. Interact with the live timeline and calendar components below, or watch native recordings of the desktop client.
          </p>
        </div>

        {/* =========================================================================
            ITEM 01: SPOTLIGHT LAUNCHER [SCREEN RECORDING 1 - 2x HD Video]
           ========================================================================= */}
        <div id="spotlight" className="grid grid-cols-1 lg:grid-cols-12 border-b border-neutral-200">
          {/* Left Column: Keyboard Shortcuts & Narrative */}
          <div className="lg:col-span-4 p-5 sm:p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-neutral-200 flex flex-col justify-center bg-white min-w-0">
            <div>
              <div className="mb-3.5">
                <span className="text-xs font-bold text-neutral-400 tracking-wider">01</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-neutral-900 font-serif mb-3.5 break-words">
                Keyboard Spotlight
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 font-normal break-words">
                Press <kbd className="px-1.5 py-0.5 bg-neutral-100 text-neutral-900 text-xs border border-neutral-300 font-medium">Alt + Space</kbd> from anywhere in Windows to summon Dealcraft instantly. Search client accounts, update deal stages, or create follow-up tasks without reaching for your mouse.
              </p>

              {/* Keyboard Shortcuts List */}
              <div className="space-y-1.5 border-t border-neutral-100 pt-3.5">
                <div
                  onClick={() => setActiveShortcut('alt-space')}
                  className={`flex items-center justify-between text-xs py-2 px-2.5 border cursor-pointer transition-colors ${
                    activeShortcut === 'alt-space'
                      ? 'bg-neutral-100 border-neutral-300 text-neutral-900 font-medium'
                      : 'border-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <span>Global Summon</span>
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 text-neutral-800 text-[10px]">
                    Alt + Space
                  </kbd>
                </div>

                <div
                  onClick={() => setActiveShortcut('arrows')}
                  className={`flex items-center justify-between text-xs py-2 px-2.5 border cursor-pointer transition-colors ${
                    activeShortcut === 'arrows'
                      ? 'bg-neutral-100 border-neutral-300 text-neutral-900 font-medium'
                      : 'border-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <span>Cycle Results</span>
                  <div className="flex gap-1">
                    <kbd className="px-1 py-0.5 bg-white border border-neutral-200 text-neutral-800 text-[10px]">&uarr;</kbd>
                    <kbd className="px-1 py-0.5 bg-white border border-neutral-200 text-neutral-800 text-[10px]">&darr;</kbd>
                  </div>
                </div>

                <div
                  onClick={() => setActiveShortcut('enter')}
                  className={`flex items-center justify-between text-xs py-2 px-2.5 border cursor-pointer transition-colors ${
                    activeShortcut === 'enter'
                      ? 'bg-neutral-100 border-neutral-300 text-neutral-900 font-medium'
                      : 'border-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <span>Execute / Open</span>
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 text-neutral-800 text-[10px]">
                    Enter
                  </kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Screen Recording in Electric Cobalt Mosaic Frame */}
          <div className="lg:col-span-8 p-2.5 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
            <div className="relative w-full overflow-hidden border border-neutral-200">
              <DealcraftBrandMosaic />
              <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
                <div className="w-full max-w-[860px] border border-white/20 bg-black overflow-hidden shadow-sm">
                  <video
                    src="/assets/dealcraft-spotlight-demo.mp4"
                    poster="/assets/dealcraft-spotlight-poster.png"
                    className="w-full h-auto block select-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ITEM 02: INTERACTIVE TIMELINE [COMPONENT 1 - Direct Codebase Port]
           ========================================================================= */}
        <div id="timeline" className="grid grid-cols-1 lg:grid-cols-12 border-b border-neutral-200">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-4 p-5 sm:p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-neutral-200 flex flex-col justify-center bg-white min-w-0">
            <div>
              <div className="mb-3.5">
                <span className="text-xs font-bold text-neutral-400 tracking-wider">02</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-neutral-900 font-serif mb-3.5 break-words">
                Project Timeline &amp; Dependencies
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 font-normal break-words">
                Map project deliverables across clear milestones. Click and drag timeline bars horizontally to adjust target dates, with automatic dependency line updates in real time.
              </p>
              <ul className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-3.5">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Drag-to-move horizontal timeline bars with day snapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Curved SVG bezier dependency paths connecting predecessor tasks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Milestone diamond markers with October and November zoom views</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Live Interactive Draggable Timeline Component */}
          <div className="lg:col-span-8 p-2.5 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
            <div className="relative w-full overflow-hidden border border-neutral-200">
              <DealcraftBrandMosaic />
              <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
                <div className="w-full max-w-[860px] border border-white/20 bg-black overflow-hidden shadow-sm aspect-video">
                  <InteractiveTimeline />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ITEM 03: DEALCRAFT SALES CRM [SCREEN RECORDING 2 - 3x HD Video, Dark Mode]
           ========================================================================= */}
        <div id="crm" className="grid grid-cols-1 lg:grid-cols-12 border-b border-neutral-200">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-4 p-5 sm:p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-neutral-200 flex flex-col justify-center bg-white min-w-0">
            <div>
              <div className="mb-3.5">
                <span className="text-xs font-bold text-neutral-400 tracking-wider">03</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-neutral-900 font-serif mb-3.5 break-words">
                Pipeline &amp; Account Management
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 font-normal break-words">
                Track active enterprise accounts, pipeline values, and probability scores in a high-density desktop grid. Filter thousands of records instantly with zero cloud round-trips.
              </p>
              <ul className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-3.5">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Structured account records with stage values and real-time win probabilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Multi-stage filtering, owner assignments, and instant account dossier drawers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Embedded local SQLite storage with sub-millisecond query execution</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Screen Recording in Electric Cobalt Mosaic Frame */}
          <div className="lg:col-span-8 p-2.5 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
            <div className="relative w-full overflow-hidden border border-neutral-200">
              <DealcraftBrandMosaic />
              <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
                <div className="w-full max-w-[860px] border border-white/20 bg-black overflow-hidden shadow-sm">
                  <video
                    src="/assets/dealcraft-companies-demo.mp4"
                    poster="/assets/dealcraft-companies-poster.png"
                    className="w-full h-auto block select-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ITEM 04: INTERACTIVE CALENDAR [COMPONENT 2 - Direct Codebase Port]
           ========================================================================= */}
        <div id="calendar" className="grid grid-cols-1 lg:grid-cols-12 border-b border-neutral-200">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-4 p-5 sm:p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-neutral-200 flex flex-col justify-center bg-white min-w-0">
            <div>
              <div className="mb-3.5">
                <span className="text-xs font-bold text-neutral-400 tracking-wider">04</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-neutral-900 font-serif mb-3.5 break-words">
                Deliverable Scheduling &amp; Calendar
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 font-normal break-words">
                Keep client deliverables, sprint deadlines, and review milestones organized. Click <strong>+ New task</strong> or the plus button on any calendar day to schedule work directly into the month grid.
              </p>
              <ul className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-3.5">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Click "+ New task" to schedule work directly into active sprint state</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Month and week views with clear project color coding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Instant event chip rendering with real-time feedback toast</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Live Interactive Calendar Component */}
          <div className="lg:col-span-8 p-2.5 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
            <div className="relative w-full overflow-hidden border border-neutral-200">
              <DealcraftBrandMosaic />
              <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
                <div className="w-full max-w-[860px] border border-white/20 bg-black overflow-hidden shadow-sm aspect-video">
                  <InteractiveCalendar />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ITEM 05: FAST TASK CAPTURE & BACKLOG [SCREEN RECORDING 3 - 3x HD Video, Dark Mode]
           ========================================================================= */}
        <div id="tasks" className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-4 p-5 sm:p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-neutral-200 flex flex-col justify-center bg-white min-w-0">
            <div>
              <div className="mb-3.5">
                <span className="text-xs font-bold text-neutral-400 tracking-wider">05</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-neutral-900 font-serif mb-3.5 break-words">
                Task Capture &amp; Backlog
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 font-normal break-words">
                Prioritize incoming work and track sprint progress. Move tasks between Backlog and In Progress buckets with simple keyboard shortcuts and instant local state updates.
              </p>
              <ul className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-3.5">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Interactive completion checkboxes with strikethrough animation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Backlog and To Do groupings with live project and assignee badges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Optimized for fast keyboard entry and immediate local saving</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Screen Recording in Electric Cobalt Mosaic Frame */}
          <div className="lg:col-span-8 p-2.5 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
            <div className="relative w-full overflow-hidden border border-neutral-200">
              <DealcraftBrandMosaic />
              <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
                <div className="w-full max-w-[860px] border border-white/20 bg-black overflow-hidden shadow-sm">
                  <video
                    src="/assets/dealcraft-tasks-demo.mp4"
                    poster="/assets/dealcraft-tasks-poster.png"
                    className="w-full h-auto block select-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import InteractiveTableGrid from './InteractiveTableGrid';
import InteractiveTaskDrawer from './InteractiveTaskDrawer';
import InteractiveKanbanBoard from './InteractiveKanbanBoard';
import DealcraftBrandMosaic from './DealcraftBrandMosaic';

export default function TableAndDrawerSection() {
  const [activeTab, setActiveTab] = useState('table');

  return (
    <section id="table-and-drawer" className="w-full bg-white border-b border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto border-x border-neutral-200">
        {/* Section Header */}
        <div className="px-6 py-10 sm:px-10 sm:py-12 border-b border-neutral-200 bg-neutral-50/40">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-[2px] bg-[#2563eb]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
              SPREADSHEET &amp; WORKFLOW ENGINES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif">
            Table Grid, Task Drawer &amp; Kanban
            <br />
            <span className="text-neutral-500 font-serif">Three Cohesive Views of the Same Data</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Sort columns and double-click to edit cells in the Table Grid, review structured metadata in the Task Details Drawer, or drag cards across the Kanban board. Every change synchronizes across all views instantly.
          </p>

          {/* Tab Switcher Pills (Exact Hub Tabs from components code) */}
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1 mt-6 bg-neutral-100 border border-neutral-200 rounded-[6px]">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                activeTab === 'table'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <span className="opacity-60 mr-1.5 font-mono">7</span> Table Grid
            </button>
            <button
              onClick={() => setActiveTab('drawer')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                activeTab === 'drawer'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <span className="opacity-60 mr-1.5 font-mono">8</span> Task Details Drawer
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                activeTab === 'kanban'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <span className="opacity-60 mr-1.5 font-mono">6</span> Kanban Board
            </button>
          </div>
        </div>

        {/* Interactive Viewport */}
        <div className="p-4 sm:p-5 bg-neutral-50/50 flex items-center justify-center">
          <div className="relative w-full overflow-hidden border border-neutral-200">
            <DealcraftBrandMosaic />
            <div className="relative z-10 p-3 sm:p-5 flex items-center justify-center">
              <div className="w-full">
                {activeTab === 'table' && <InteractiveTableGrid />}
                {activeTab === 'drawer' && <InteractiveTaskDrawer />}
                {activeTab === 'kanban' && <InteractiveKanbanBoard />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

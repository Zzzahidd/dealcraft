import React, { useState } from 'react';
import InteractiveTableGrid from './InteractiveTableGrid';
import InteractiveTaskDrawer from './InteractiveTaskDrawer';
import InteractiveKanbanBoard from './InteractiveKanbanBoard';
import DealcraftBrandMosaic from './DealcraftBrandMosaic';

export default function TableAndDrawerSection() {
  const [activeTab, setActiveTab] = useState('table');

  return (
    <section id="table-and-drawer" className="w-full bg-white border-b border-neutral-200 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto border-x-0 md:border-x border-neutral-200">
        {/* Section Header */}
        <div className="px-4 py-8 sm:px-10 sm:py-12 border-b border-neutral-200 bg-neutral-50/40">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-[2px] bg-[#2563eb]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
              SPREADSHEET &amp; WORKFLOW ENGINES
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.14] sm:leading-[1.12] text-neutral-900 font-serif break-words">
            Table Grid, Task Drawer &amp; Kanban{' '}
            <br className="hidden sm:inline" />
            <span className="text-neutral-500 font-serif">Three Cohesive Views of the Same Data</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-neutral-600 max-w-2xl font-normal leading-relaxed break-words">
            Sort columns and double-click to edit cells in the Table Grid, review structured metadata in the Task Details Drawer, or drag cards across the Kanban board. Every change synchronizes across all views instantly.
          </p>

          {/* Tab Switcher Pills (Exact Hub Tabs from components code) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 mt-5 sm:mt-6 bg-neutral-100 border border-neutral-200 rounded-[6px] max-w-full">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                activeTab === 'table'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <span className="opacity-60 mr-1 font-mono">7</span> Table Grid
            </button>
            <button
              onClick={() => setActiveTab('drawer')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                activeTab === 'drawer'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <span className="opacity-60 mr-1 font-mono">8</span> Task Drawer
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
                activeTab === 'kanban'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              <span className="opacity-60 mr-1 font-mono">6</span> Kanban Board
            </button>
          </div>
        </div>

        {/* Interactive Viewport */}
        <div className="p-2 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
          <div className="relative w-full overflow-hidden border border-neutral-200">
            <DealcraftBrandMosaic />
            <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
              <div className="w-full min-w-0 overflow-hidden">
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

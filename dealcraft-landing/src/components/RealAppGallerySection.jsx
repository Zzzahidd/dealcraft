import React, { useState } from 'react';
import { ExternalLink, Layers, CheckCircle2 } from 'lucide-react';

export default function RealAppGallerySection() {
  const views = [
    {
      id: 'crm-table',
      name: 'Sales CRM Table',
      badge: 'sales-crm :3005',
      caption: 'Full companies table with 18 accounts, ARR valuations, win probability segment bars, and activity sparks.',
      image: '/assets/app-shots/sales_crm_table.png',
    },
    {
      id: 'crm-detail',
      name: 'Deal Detail & Health Drawer',
      badge: 'sales-crm :3005',
      caption: 'Live drawer inspecting Snowflake: 24% win probability, segmented stage health, 90 monthly touchpoints, and business fit scorecard.',
      image: '/assets/app-shots/sales_crm_detail.png',
    },
    {
      id: 'gr8r-board',
      name: 'Kanban Deals Board',
      badge: 'gr8r-studio :5180',
      caption: 'Website Redesign project board showing Backlog, To Do, In Progress, and Review columns with subtask progress bars.',
      image: '/assets/app-shots/gr8r_board.png',
    },
    {
      id: 'gr8r-timeline',
      name: 'Gantt Milestones & Timeline',
      badge: 'gr8r-studio :5180',
      caption: 'Interactive schedule grid with milestone flags, task duration spans, and bezier dependency connectors.',
      image: '/assets/app-shots/gr8r_timeline.png',
    },
    {
      id: 'gr8r-tasks',
      name: 'High-Density Tasks List',
      badge: 'gr8r-studio :5180',
      caption: 'Unified task list across 6 projects grouped by status, priority tiers, assignees, and due dates.',
      image: '/assets/app-shots/gr8r_tasks.png',
    },
    {
      id: 'gr8r-home',
      name: 'Executive Studio Home',
      badge: 'gr8r-studio :5180',
      caption: 'Cross-workspace command overview showing active projects, open tasks, upcoming deadlines, and real-time team activity.',
      image: '/assets/app-shots/gr8r_home.png',
    },
  ];

  const [activeViewId, setActiveViewId] = useState('crm-table');
  const activeView = views.find((v) => v.id === activeViewId) || views[0];

  return (
    <section className="py-24 bg-[#1D1D16] text-[#F4F4F0] border-t border-[#24241B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-sans text-[#F4F4F0]/50 uppercase tracking-wider mb-2">
              Production Applications
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F0] leading-tight">
              Direct from the local runtime.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F4F4F0]/80">
              High-resolution captures from both live applications running in the workspace. No mockups or marketing prototypes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-[#5cba86] bg-[#24241B] px-3 py-1.5 rounded border border-white/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#5cba86]" />
            <span>2 Servers Running Locally</span>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveViewId(v.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeViewId === v.id
                  ? 'bg-[#F4F4F0] text-[#1D1D16]'
                  : 'bg-[#24241B] text-[#F4F4F0]/70 hover:text-[#F4F4F0] border border-white/5'
              }`}
            >
              <span>{v.name}</span>
              <span
                className={`text-[10px] font-sans px-1.5 py-0.2 rounded ${
                  activeViewId === v.id
                    ? 'bg-[#1D1D16]/20 text-[#1D1D16]'
                    : 'bg-[#1D1D16] text-[#F4F4F0]/50'
                }`}
              >
                {v.badge}
              </span>
            </button>
          ))}
        </div>

        {/* View Canvas Frame */}
        <div className="rounded-xl border border-[#24241B] bg-[#141410] overflow-hidden shadow-2xl p-3 sm:p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#F4F4F0]/80">
              <Layers className="w-4 h-4 text-[#72a5ea]" />
              <span className="font-semibold text-[#F4F4F0]">{activeView.name}</span>
            </div>
            <p className="hidden sm:block text-[11px] text-[#F4F4F0]/60 max-w-xl truncate">
              {activeView.caption}
            </p>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#24241B] bg-[#0d0d0a]">
            <img
              src={activeView.image}
              alt={activeView.name}
              className="w-full h-auto block object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import InteractiveTeamDashboard from './InteractiveTeamDashboard';
import DealcraftBrandMosaic from './DealcraftBrandMosaic';

export default function TeamDashboardSection() {
  return (
    <section id="team-dashboards" className="w-full bg-white border-b border-neutral-200 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto border-x-0 md:border-x border-neutral-200">
        
        {/* Section Header */}
        <div className="px-4 py-8 sm:px-10 sm:py-12 border-b border-neutral-200 flex flex-col md:flex-row md:items-start md:justify-between gap-5 sm:gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-4 h-[2px] bg-[#2563eb]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
                06 PROJECT VISIBILITY
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.14] sm:leading-[1.12] text-neutral-900 font-serif break-words">
              Team Dashboards and{' '}
              <br className="hidden sm:inline" />
              Progress Tracking
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed break-words">
              Structured execution dashboards showing active project progress, team ownership, and open sprint tasks. Monitor cycle times, deadlines, and delivery milestones with zero network delay.
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-900">
              <span className="text-neutral-600 font-normal">Click status icons to advance tasks through review stages</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Blue Brand Mosaic container */}
        <div className="p-2 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
          <div className="relative w-full max-w-5xl overflow-hidden border border-neutral-200">
            <DealcraftBrandMosaic />
            <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
              <div className="w-full min-w-0 overflow-hidden">
                <InteractiveTeamDashboard />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

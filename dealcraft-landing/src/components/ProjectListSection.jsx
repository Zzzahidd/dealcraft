import React from 'react';
import InteractiveProjectList from './InteractiveProjectList';
import DealcraftBrandMosaic from './DealcraftBrandMosaic';

export default function ProjectListSection() {
  return (
    <section id="project-execution" className="w-full bg-white border-b border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto border-x border-neutral-200">
        
        {/* Section Header */}
        <div className="px-6 py-10 sm:px-10 sm:py-12 border-b border-neutral-200 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-4 h-[2px] bg-[#2563eb]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
                04 SPRINT EXECUTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif">
              Project Tasks,
              <br />
              Backlog &amp; Delivery
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
              Organize sprint work into Backlog and To Do lists. Assign priorities, track ownership, and check off completed work with instant local responsiveness.
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-900">
              <span className="text-neutral-600 font-normal">Toggle checkboxes or add a task inline to test live updates</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Blue Brand Mosaic container */}
        <div className="p-4 sm:p-5 bg-neutral-50/50 flex items-center justify-center">
          <div className="relative w-full max-w-5xl overflow-hidden border border-neutral-200">
            <DealcraftBrandMosaic />
            <div className="relative z-10 p-3 sm:p-5 flex items-center justify-center">
              <div className="w-full">
                <InteractiveProjectList />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

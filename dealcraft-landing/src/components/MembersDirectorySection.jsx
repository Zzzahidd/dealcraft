import React from 'react';
import InteractiveMembers from './InteractiveMembers';
import DealcraftBrandMosaic from './DealcraftBrandMosaic';

export default function MembersDirectorySection() {
  return (
    <section id="directory" className="w-full bg-white border-b border-neutral-200 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto border-x-0 md:border-x border-neutral-200">
        
        {/* Section Header */}
        <div className="px-4 py-8 sm:px-10 sm:py-12 border-b border-neutral-200 flex flex-col md:flex-row md:items-start md:justify-between gap-5 sm:gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-4 h-[2px] bg-[#2563eb]"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
                05 TEAM ACCESS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.14] sm:leading-[1.12] text-neutral-900 font-serif break-words">
              Team Directory and{' '}
              <br className="hidden sm:inline" />
              Role Permissions
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed break-words">
              Manage member access and ownership across projects. Filter colleagues by role, review task allocations, and assign workspace permissions with clean precision.
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-900">
              <span className="text-neutral-600 font-normal">Filter by role or search members to test live updates</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Blue Brand Mosaic container */}
        <div className="p-2 sm:p-5 bg-neutral-50/50 flex items-center justify-center min-w-0 overflow-hidden">
          <div className="relative w-full max-w-5xl overflow-hidden border border-neutral-200">
            <DealcraftBrandMosaic />
            <div className="relative z-10 p-2 sm:p-5 flex items-center justify-center">
              <div className="w-full min-w-0 overflow-hidden">
                <InteractiveMembers />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

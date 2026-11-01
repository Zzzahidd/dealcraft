import React from 'react';

export default function SpekCaseStudySection() {
  return (
    <section id="case-study" className="w-full bg-white border-b border-neutral-200 font-sans py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-[2px] bg-[#2563eb]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
              PROVEN PERFORMANCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif max-w-3xl">
            Engineered for Operators Who Value Speed Above All
          </h2>
        </div>

        {/* Spek.app 4-Column Line-Box Grid */}
        <div className="border border-neutral-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            
            {/* Column 1: Keyboard-First Execution */}
            <div className="p-7 sm:p-8 flex flex-col justify-between bg-white min-h-[260px]">
              <div>
                <span className="text-xs font-bold text-neutral-900 tracking-wider block mb-3 uppercase">
                  Global Keyboard Flow
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans mb-5">
                  Every deal stage, client account, and follow-up responds to direct keystrokes. Press Alt + Space anywhere in Windows to search your database, update pipeline values, and log meeting notes without opening a browser or waiting on page loads.
                </p>
              </div>
              <div className="pt-3.5 border-t border-neutral-100">
                <div className="font-semibold text-neutral-900 text-xs sm:text-sm">
                  Alt + Space Spotlight
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-500 font-normal">
                  Global desktop access
                </div>
              </div>
            </div>

            {/* Column 2: Local NVMe Storage */}
            <div className="p-7 sm:p-8 flex flex-col justify-between bg-white min-h-[260px]">
              <div>
                <span className="text-xs font-bold text-neutral-900 tracking-wider block mb-3 uppercase">
                  Local SQLite Storage
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans mb-5">
                  Web CRMs route every filter, sort, and status change through distant servers. Dealcraft writes directly to an embedded SQLite database on your local drive. Search thousands of accounts in 0.4 milliseconds and review deals anywhere, even without Wi-Fi.
                </p>
              </div>
              <div className="pt-3.5 border-t border-neutral-100">
                <div className="font-semibold text-neutral-900 text-xs sm:text-sm">
                  Embedded SQLite Engine
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-500 font-normal">
                  Sub-millisecond local reads · 100% offline
                </div>
              </div>
            </div>

            {/* Column 3: Large Bold Metric 1 - 0.4ms */}
            <div className="p-7 sm:p-8 flex flex-col justify-between bg-white min-h-[260px]">
              <div>
                <span className="text-xs font-medium text-neutral-500 tracking-tight block mb-1.5">
                  Local database query speed
                </span>
                <div className="text-5xl sm:text-6xl font-normal text-neutral-900 tracking-tight font-serif my-4 sm:my-5">
                  0.4ms
                </div>
              </div>
              <div className="text-xs font-semibold text-neutral-800 pt-3.5 border-t border-neutral-100">
                Direct NVMe query execution
              </div>
            </div>

            {/* Column 4: Large Bold Metric 2 - <65MB */}
            <div className="p-7 sm:p-8 flex flex-col justify-between bg-white min-h-[260px]">
              <div>
                <span className="text-xs font-medium text-neutral-500 tracking-tight block mb-1.5">
                  Native client memory footprint
                </span>
                <div className="text-5xl sm:text-6xl font-normal text-neutral-900 tracking-tight font-serif my-4 sm:my-5">
                  &lt;65MB
                </div>
              </div>
              <div className="text-xs font-semibold text-neutral-800 pt-3.5 border-t border-neutral-100">
                Lightweight Windows client
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-200 px-6 py-4 sm:px-8 bg-neutral-50/60 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="text-neutral-700 font-medium">
              Dealcraft runs locally on Windows with zero cloud latency. Built for founders and deal teams who move fast.
            </div>
            <a
              href="#features"
              className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 hover:text-blue-600 transition-colors group"
            >
              <span>Explore features</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export default function LinearPlanningSection() {
  // Scatter points simulation for "Cycle time by agent"
  const clusterPoints = [
    { x: 35, y: 40 }, { x: 38, y: 55 }, { x: 42, y: 30 }, { x: 45, y: 65 }, { x: 48, y: 45 },
    { x: 50, y: 52 }, { x: 52, y: 38 }, { x: 55, y: 60 }, { x: 58, y: 42 }, { x: 60, y: 48 },
    { x: 120, y: 45 }, { x: 125, y: 58 }, { x: 128, y: 35 }, { x: 132, y: 62 }, { x: 135, y: 40 },
    { x: 138, y: 50 }, { x: 142, y: 44 }, { x: 145, y: 55 }, { x: 148, y: 38 }, { x: 152, y: 60 },
    { x: 210, y: 42 }, { x: 215, y: 54 }, { x: 218, y: 32 }, { x: 222, y: 68 }, { x: 225, y: 46 },
    { x: 228, y: 58 }, { x: 232, y: 39 }, { x: 235, y: 62 }, { x: 238, y: 44 }, { x: 242, y: 50 },
    { x: 290, y: 48 }, { x: 295, y: 52 }, { x: 300, y: 38 }, { x: 305, y: 64 }, { x: 310, y: 45 },
  ];

  return (
    <section id="planning" className="w-full bg-white border-b border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto border-x border-neutral-200">
        
        {/* Header matching Linear Image 3 */}
        <div className="px-6 py-12 sm:px-10 sm:py-16 border-b border-neutral-200 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif">
              Planning and
              <br />
              monitoring
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
              Plan and navigate from idea to launch. Align your team with product initiatives, strategic roadmaps, and clear, up-to-date PRDs.
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

        {/* Dual Card Visual Showcase matching Linear Image 3 */}
        <div className="p-6 sm:p-10 bg-neutral-950 text-white overflow-hidden relative min-h-[500px]">
          <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Roadmap Milestone Timeline */}
            <div className="lg:col-span-6 bg-[#141416] border border-neutral-800 p-5 space-y-4 shadow-2xl">
              {/* Timeline Header Months Axis */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 border-b border-neutral-800 pb-2">
                <span className="font-semibold text-neutral-400">Roadmap Initiatives</span>
                <div className="flex gap-8">
                  <span>MAR</span>
                  <span>APR</span>
                  <span>MAY</span>
                </div>
              </div>

              {/* Item 1: UI Refresh */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-200 font-medium flex items-center gap-1.5">
                    <span className="text-emerald-400">✕</span> UI Refresh ✓
                  </span>
                </div>
                <div className="h-6 bg-[#1f1f24] border border-neutral-800 relative flex items-center px-2">
                  <div className="w-1/2 h-4 bg-neutral-700/60 rounded flex items-center px-2 text-[10px] text-neutral-300">
                    Core screens
                  </div>
                  <div className="absolute right-4 w-2 h-2 rotate-45 bg-amber-500 shadow-sm"></div>
                </div>
              </div>

              {/* Item 2: Split Fares */}
              <div className="space-y-1.5 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-200 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-blue-500"></span> Split fares
                  </span>
                </div>
                <div className="h-6 bg-[#1f1f24] border border-neutral-800 relative flex items-center px-4">
                  <div className="w-3/5 h-4 bg-blue-900/40 border border-blue-500/40 rounded flex items-center px-2 text-[10px] text-blue-200">
                    Internal Beta
                  </div>
                </div>
              </div>

              {/* Item 3: Autonomy Telemetry */}
              <div className="space-y-1.5 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium text-[11px]">
                    Autonomy telemetry reliability
                  </span>
                </div>
                <div className="h-6 bg-[#1f1f24] border border-neutral-800 relative flex items-center px-8">
                  <div className="w-2/3 h-4 bg-purple-900/40 border border-purple-500/40 rounded flex items-center px-2 text-[10px] text-purple-200">
                    Production Rollout
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Cycle Time by Agent Scatter Chart */}
            <div className="lg:col-span-6 bg-[#121214] border border-neutral-800 p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800/80">
                <h4 className="text-xs font-semibold text-neutral-300">
                  Cycle time by agent
                </h4>
                <span className="text-[10px] text-neutral-500 font-mono">Oct 2025 – Jan 2026</span>
              </div>

              {/* Scatter Chart Canvas */}
              <div className="relative h-[220px] bg-[#161619] border border-neutral-800/80 overflow-hidden">
                {/* Horizontal reference bands */}
                <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-red-900/30"></div>
                <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-neutral-800 border-dashed border-neutral-700"></div>
                <div className="absolute top-[65%] left-0 right-0 h-[1px] bg-emerald-900/30"></div>

                {/* SVG Cluster dots */}
                <svg className="w-full h-full">
                  {clusterPoints.map((pt, idx) => (
                    <circle
                      key={idx}
                      cx={`${pt.x * 1.1}%`}
                      cy={`${pt.y}%`}
                      r="2"
                      fill="#06b6d4"
                      opacity="0.85"
                    />
                  ))}
                  {/* Smoothing trend line */}
                  <path
                    d="M 20 110 Q 100 80 180 100 T 360 90"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[9px] text-neutral-500 font-mono">
                  <span>Oct 2025</span>
                  <span>Nov 2025</span>
                  <span>Dec 2025</span>
                  <span>Jan 2026</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Completed cycles
                </span>
                <span>Median: <strong>2.4 hrs</strong></span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

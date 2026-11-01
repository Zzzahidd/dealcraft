import React from 'react';

export default function LinearReviewSection() {
  return (
    <section id="review" className="w-full bg-white border-b border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto border-x border-neutral-200">
        
        {/* Header matching Linear Image 1 */}
        <div className="px-6 py-12 sm:px-10 sm:py-16 border-b border-neutral-200 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif">
              Build, review,
              <br />
              and ship
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
              Streamline code and deal reviews with clear diffs, better context, and fewer back-and-forth comments. Keep PRs moving without sacrificing quality.
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

        {/* Visual Showcase matching Linear Image 1 */}
        <div className="p-6 sm:p-10 bg-neutral-900 text-white overflow-hidden relative min-h-[520px] flex items-center justify-center">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Tasks Board Columns (In Review, In Progress, Todo) */}
            <div className="lg:col-span-5 bg-[#141416] border border-neutral-800 p-4 space-y-4 shadow-2xl">
              {/* Group: In Review */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-neutral-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-neutral-200 font-semibold">In Review</span>
                    <span className="text-neutral-500 font-mono text-[11px]">3</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 bg-[#1a1a1e] border border-neutral-800/80 hover:border-neutral-700 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-neutral-500 font-mono text-[10px]">ENG-2498</span>
                      <span className="text-neutral-200 truncate">Replace isFullySynced with sync status</span>
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full border border-emerald-500 text-emerald-500 text-[9px] flex items-center justify-center font-bold">✓</span>
                  </div>
                  <div className="p-2.5 bg-[#1a1a1e] border border-neutral-800/80 hover:border-neutral-700 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-neutral-500 font-mono text-[10px]">ENG-2380</span>
                      <span className="text-neutral-200 truncate">Show a stale data banner while syncing</span>
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full border border-emerald-500 text-emerald-500 text-[9px] flex items-center justify-center font-bold">✓</span>
                  </div>
                  <div className="p-2.5 bg-[#1a1a1e] border border-neutral-800/80 hover:border-neutral-700 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-neutral-500 font-mono text-[10px]">ENG-2039</span>
                      <span className="text-neutral-200 truncate">Pass sync status to the dashboard</span>
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full border border-neutral-600 text-neutral-600 text-[9px] flex items-center justify-center font-bold">·</span>
                  </div>
                </div>
              </div>

              {/* Group: In Progress */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-neutral-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-neutral-200 font-semibold">In Progress</span>
                    <span className="text-neutral-500 font-mono text-[11px]">4</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 bg-[#1a1a1e] border border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-neutral-500 font-mono text-[10px]">ENG-2076</span>
                      <span className="text-neutral-200 truncate">Reduce ETA jitter in websocket stream</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                  <div className="p-2.5 bg-[#1a1a1e] border border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-neutral-500 font-mono text-[10px]">ENG-2108</span>
                      <span className="text-neutral-200 truncate">Handle GPS dropouts gracefully</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                </div>
              </div>

              {/* Group: Todo */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-neutral-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full border border-neutral-500"></span>
                    <span className="text-neutral-200 font-semibold">Todo</span>
                    <span className="text-neutral-500 font-mono text-[11px]">4</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 bg-[#1a1a1e]/60 border border-neutral-800/60 text-neutral-400 truncate">
                    <span className="font-mono text-[10px] mr-2">ENG-2254</span>
                    Reduce unnecessary map re-rendering
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Code Review Diff Card matching Image 1 */}
            <div className="lg:col-span-7 bg-[#111113] border border-neutral-800 shadow-2xl overflow-hidden font-mono text-xs">
              {/* Diff Header */}
              <div className="px-4 py-2.5 bg-[#18181b] border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">📄</span>
                  <span className="text-neutral-200">kinetic-ios/src/screens/Home/HomeScreen.tsx</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-sans">Linear Review</span>
              </div>

              {/* Code Diff Lines */}
              <div className="p-3 text-[11.5px] leading-relaxed overflow-x-auto space-y-0.5">
                <div className="text-neutral-500"><span className="inline-block w-6 text-neutral-600">01</span>import React from 'react'</div>
                <div className="text-neutral-500"><span className="inline-block w-6 text-neutral-600">02</span>import &#123; View, ActivityIndicator &#125; from 'react-native'</div>
                <div className="text-neutral-500"><span className="inline-block w-6 text-neutral-600">03</span>import &#123; useVehicleState &#125; from '@/hooks/useVehicleState'</div>
                <div className="text-neutral-500"><span className="inline-block w-6 text-neutral-600">04</span>import &#123; Dashboard &#125; from '@/components/Dashboard'</div>
                <div className="text-neutral-600"><span className="inline-block w-6 text-neutral-700">05</span></div>
                <div className="text-neutral-400"><span className="inline-block w-6 text-neutral-600">06</span>export const HomeScreen = () =&gt; &#123;</div>
                <div className="bg-red-950/40 text-red-300 border-l-2 border-red-500 px-1"><span className="inline-block w-6 text-red-500/70">07</span>-  const &#123; vehicleState, isFullySynced &#125; = useVehicleState()</div>
                <div className="bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 px-1"><span className="inline-block w-6 text-emerald-500/70">08</span>+  const &#123; vehicleState, syncStatus &#125; = useVehicleState()</div>
                <div className="text-neutral-600"><span className="inline-block w-6 text-neutral-700">09</span></div>
                <div className="bg-red-950/40 text-red-300 border-l-2 border-red-500 px-1"><span className="inline-block w-6 text-red-500/70">10</span>-  if (!isFullySynced) &#123;</div>
                <div className="bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 px-1"><span className="inline-block w-6 text-emerald-500/70">11</span>+  if (syncStatus === SyncStatus.STALE) &#123;</div>
                <div className="text-neutral-400 pl-4"><span className="inline-block w-6 text-neutral-600">12</span>return &lt;ActivityIndicator size="large" /&gt;</div>
                <div className="text-neutral-400 pl-2"><span className="inline-block w-6 text-neutral-600">13</span>&#125;</div>
                <div className="text-neutral-500"><span className="inline-block w-6 text-neutral-600">14</span>return (</div>
                <div className="text-neutral-500 pl-2"><span className="inline-block w-6 text-neutral-600">15</span>&lt;View&gt;</div>
                <div className="text-neutral-500 pl-4"><span className="inline-block w-6 text-neutral-600">16</span>&lt;Dashboard state=&#123;vehicleState&#125; /&gt;</div>
                <div className="text-neutral-500 pl-2"><span className="inline-block w-6 text-neutral-600">17</span>&lt;/View&gt;</div>
                <div className="text-neutral-500"><span className="inline-block w-6 text-neutral-600">18</span>)</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

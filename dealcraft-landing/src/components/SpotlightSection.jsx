import React, { useState } from 'react';

// Dealcraft Brand Mosaic: Electric Cobalt (#4124fb) and Deep Midnight Indigo (#120e3d)
function DealcraftBrandMosaic() {
  const tileOpacities = [
    0.15, 0.22, 0.35, 0.50, 0.45, 0.38, 0.30, 0.42, 0.55, 0.45, 0.32, 0.18, 0.12, 0.20,
    0.20, 0.36, 0.55, 0.70, 0.65, 0.52, 0.42, 0.54, 0.72, 0.60, 0.42, 0.26, 0.18, 0.25,
    0.30, 0.50, 0.72, 0.90, 0.82, 0.68, 0.56, 0.68, 0.88, 0.75, 0.54, 0.38, 0.25, 0.32,
    0.28, 0.44, 0.62, 0.78, 0.72, 0.60, 0.48, 0.60, 0.78, 0.68, 0.48, 0.32, 0.22, 0.28,
    0.20, 0.32, 0.48, 0.60, 0.55, 0.44, 0.36, 0.48, 0.60, 0.52, 0.36, 0.25, 0.16, 0.22,
    0.14, 0.20, 0.32, 0.42, 0.38, 0.30, 0.24, 0.36, 0.44, 0.38, 0.26, 0.18, 0.12, 0.16,
  ];

  return (
    <div className="absolute inset-0 bg-[#3122e8] overflow-hidden select-none">
      <div className="absolute inset-0 grid grid-cols-14 grid-rows-6">
        {tileOpacities.map((op, idx) => (
          <div
            key={idx}
            className="border border-white/[0.07]"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${op * 0.38})`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#120e3d]/80 via-transparent to-[#4124fb]/30" />
      <div className="absolute -top-32 -left-32 w-[350px] h-[350px] bg-[#6366f1]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[350px] h-[350px] bg-[#4124fb]/40 blur-3xl pointer-events-none" />
    </div>
  );
}

export default function SpotlightSection() {
  const [activeShortcut, setActiveShortcut] = useState('alt-space');

  return (
    <section id="spotlight" className="py-24 sm:py-32 bg-[#050505] text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow tag */}
        <div className="flex items-center justify-start gap-2 mb-6">
          <span className="w-4 h-[2px] bg-[#3b82f6]"></span>
          <span className="text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">
            KEYBOARD-FIRST SPEED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Keyboard Shortcuts */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.025em] leading-[1.12] text-white font-serif">
              Find Any Deal or Task
              <br />
              <span className="text-neutral-500 font-serif">with a Single Keystroke.</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans font-normal">
              Press <kbd className="px-1.5 py-0.5 rounded-none bg-white/10 text-white font-sans text-xs border border-white/10">Alt + Space</kbd> from anywhere on your computer to jump directly to an account, log a meeting note, or advance a deal stage. Never touch your mouse to close work.
            </p>

            {/* Keyboard Command Hints */}
            <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
              <div
                onClick={() => setActiveShortcut('alt-space')}
                className={`flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-none cursor-pointer transition-all ${
                  activeShortcut === 'alt-space'
                    ? 'bg-white/10 text-white font-medium border border-white/15'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Summon Spotlight launcher</span>
                <kbd className="px-2 py-1 rounded-none bg-black/50 border border-white/15 font-sans text-xs text-neutral-200">
                  Alt + Space
                </kbd>
              </div>

              <div
                onClick={() => setActiveShortcut('fuzzy')}
                className={`flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-none cursor-pointer transition-all ${
                  activeShortcut === 'fuzzy'
                    ? 'bg-white/10 text-white font-medium border border-white/15'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Sub-5ms fuzzy search</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 rounded-none bg-black/50 border border-white/15 font-sans text-xs text-neutral-200">
                    &uarr;
                  </kbd>
                  <kbd className="px-2 py-1 rounded-none bg-black/50 border border-white/15 font-sans text-xs text-neutral-200">
                    &darr;
                  </kbd>
                </div>
              </div>

              <div
                onClick={() => setActiveShortcut('execute')}
                className={`flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-none cursor-pointer transition-all ${
                  activeShortcut === 'execute'
                    ? 'bg-white/10 text-white font-medium border border-white/15'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Execute deal stage / open dossier</span>
                <kbd className="px-2 py-1 rounded-none bg-black/50 border border-white/15 font-sans text-xs text-neutral-200">
                  &crarr; Enter
                </kbd>
              </div>

              <div
                onClick={() => setActiveShortcut('dismiss')}
                className={`flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-none cursor-pointer transition-all ${
                  activeShortcut === 'dismiss'
                    ? 'bg-white/10 text-white font-medium border border-white/15'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Dismiss instantly</span>
                <kbd className="px-2 py-1 rounded-none bg-black/50 border border-white/15 font-sans text-xs text-neutral-200">
                  Esc
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Dealcraft Spotlight Application Screen Recording with Electric Cobalt Brand Background */}
          <div className="lg:col-span-7">
            <div className="relative rounded-none overflow-hidden border border-indigo-400/40">
              {/* Electric Cobalt Brand Mosaic Background */}
              <DealcraftBrandMosaic />

              {/* Clean Frame - Strictly zero radius, zero shadow, hairline border */}
              <div className="relative z-10 p-2 sm:p-4 md:p-5 flex items-center justify-center">
                <div className="w-full rounded-none overflow-hidden border border-white/15 bg-black">
                  <video
                    src="/assets/dealcraft-spotlight-demo.mp4"
                    poster="/assets/dealcraft-spotlight-poster.png"
                    className="w-full h-auto block select-none"
                    style={{ aspectRatio: '1080 / 674' }}
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

import React from 'react';

// Dealcraft Brand Mosaic: Crafted using Dealcraft's official Electric Cobalt (#4124fb) and Deep Midnight Indigo (#1e1b4b)
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
      {/* 14 columns x 6 rows mosaic grid */}
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
      {/* Brand Gradient Overlays: Electric Cobalt #4124fb + Midnight Indigo #1e1b4b */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120e3d]/80 via-transparent to-[#4124fb]/30" />
      <div className="absolute -top-12 -left-12 sm:-top-28 sm:-left-28 w-[240px] h-[240px] sm:w-[450px] sm:h-[450px] bg-[#6366f1]/30 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 sm:-bottom-28 sm:-right-28 w-[240px] h-[240px] sm:w-[450px] sm:h-[450px] bg-[#4124fb]/40 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-white pt-10 sm:pt-12 pb-16 sm:pb-20 overflow-hidden border-b border-neutral-100 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Headline in high-contrast editorial serif */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-[-0.025em] text-neutral-900 leading-[1.1] sm:leading-[1.08] font-serif break-words">
            The Desktop CRM Built for{' '}
            <br className="hidden sm:inline" />
            Speed and Execution
          </h1>

          {/* 3. Subheading in clean sans-serif */}
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-lg text-neutral-600 max-w-2xl leading-relaxed font-sans font-normal break-words">
            Dealcraft brings visual sales pipelines and keyboard-driven project tracking into a single desktop application. Powered by local SQLite storage, so you never wait on slow browser tabs again.
          </p>

          {/* 4. Action Button: Strictly only one button - Download for Windows */}
          <div className="mt-6">
            <a
              href="/Dealcraft-Setup.exe?v=3.0"
              download="Dealcraft-Setup.exe"
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-none hover:bg-neutral-800 transition-colors shadow-none group max-w-full text-center"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M0 2.235L6.5 1.34v6.236H0V2.235zm7.34-1.455L16 0v7.576H7.34V.78zM0 8.424h6.5v6.236L0 13.765V8.424zm7.34 0H16V16l-8.66-.78V8.424z" />
              </svg>
              <span>Download for Windows</span>
            </a>
            <span className="mt-2.5 block text-xs text-neutral-500 font-sans">
              Free native installer for Windows 10 and 11 · 100% offline capable
            </span>
          </div>
        </div>

        {/* 5. Expanded Hero Visual Container: Pristine 1080p application video - Zero shadows, razor-sharp rendering */}
        <div className="mt-8 sm:mt-12 relative w-full rounded-none overflow-hidden border border-indigo-400/40">
          {/* Expansive Mosaic Background */}
          <DealcraftBrandMosaic />

          {/* Clean Frame - STRICTLY NO SHADOWS, 100% natural authentic video rendering */}
          <div className="relative z-10 p-2 sm:p-6 md:p-7 flex items-center justify-center">
            <div className="w-full max-w-[1366px] rounded-none overflow-hidden border border-white/15 bg-black">
              <video
                src="/assets/dealcraft-native.mp4"
                poster="/assets/dealcraft-hero-poster-native.png"
                className="w-full h-auto block select-none"
                style={{ aspectRatio: '1366 / 744' }}
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
    </section>
  );
}

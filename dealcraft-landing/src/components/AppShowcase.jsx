import React from 'react';

export default function AppShowcase() {
  return (
    <section className="py-24 bg-[#1D1D16] text-[#F4F4F0] border-t border-[#24241B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header matching Figma 1.png */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F0]">
            Never wait for a deal to load.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F4F4F0]/80">
            Dealcraft runs directly on your computer. Every account, note, and stage change opens the moment you click, with or without Wi-Fi.
          </p>
        </div>

        {/* Canvas Frame with Classical Landscape Background matching Figma 1.png */}
        <div className="relative rounded-[2px] overflow-hidden border border-[#24241B] p-3 sm:p-6 md:p-8 bg-[#1D1D16]">
          {/* Classical Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/recording-bg.jpg')` }}
          />
          {/* Subtle Dimmer */}
          <div className="absolute inset-0 bg-[#1D1D16]/25" />

          {/* Real Application Screen Recording - No fake double titlebar, no overlay control pills */}
          <div className="relative z-10 max-w-5xl mx-auto rounded-[2px] overflow-hidden border border-[#24241B] bg-[#12120e] shadow-2xl">
            <video
              src="/assets/full-app.mp4"
              poster="/assets/hero-poster.jpg"
              className="w-full h-auto block object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

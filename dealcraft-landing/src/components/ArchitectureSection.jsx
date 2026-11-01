import React from 'react';

function WindowsIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 2.235L6.5 1.34v6.236H0V2.235zm7.34-1.455L16 0v7.576H7.34V.78zM0 8.424h6.5v6.236L0 13.765V8.424zm7.34 0H16V16l-8.66-.78V8.424z" />
    </svg>
  );
}

export default function ArchitectureSection() {
  const specs = [
    {
      title: 'Local SQLite Database',
      desc: 'All accounts, deals, and notes live directly on your local drive. Queries return in less than a millisecond with zero network overhead.',
      badge: '0.4ms Query Time',
    },
    {
      title: 'Lightweight Desktop Footprint',
      desc: 'Engineered as a lean native desktop application that launches instantly, conserves battery life, and leaves your CPU quiet.',
      badge: '< 65MB RAM',
    },
    {
      title: 'Instant Search and Filtering',
      desc: 'Filter thousands of company records and change deal stages without loading wheels or blank screens. Everything renders as you type.',
      badge: 'Sub-5ms Response',
    },
    {
      title: '100% Offline Independence',
      desc: 'Review confidential contracts and prep for customer meetings on flights or spotty Wi-Fi with complete data security.',
      badge: 'Full Offline Access',
    },
  ];

  return (
    <section id="architecture" className="py-16 sm:py-20 bg-white text-neutral-900 border-b border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-4 text-center">
          <span className="w-4 h-[2px] bg-[#2563eb]"></span>
          <span className="text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
            LOCAL ARCHITECTURE
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-[-0.025em] leading-[1.12] text-neutral-900 font-serif">
            Desktop Performance with
            <br />
            Zero Server Latency
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-sans font-normal">
            While web tools load megabytes of script and wait on remote APIs for every keystroke, Dealcraft runs locally on your machine with direct SQLite storage.
          </p>
        </div>

        {/* 4 Clean Technical Specification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-none bg-white border border-neutral-200 hover:border-neutral-400 transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 font-sans">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-sans font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-none">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Block: Black background CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <a
            href="/Dealcraft-Setup.exe?v=3.0"
            download="Dealcraft-Setup.exe"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-none bg-black text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <WindowsIcon className="w-4 h-4 fill-current" />
            <span>Download Dealcraft for Windows (.exe)</span>
          </a>
          <p className="mt-3 text-xs font-sans text-neutral-500">
            Native x86_64 installer · Local SQLite engine · macOS Apple Silicon coming Q1
          </p>
        </div>
      </div>
    </section>
  );
}

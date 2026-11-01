import React from 'react';

// Geometric 3D Blue Wireframe Icon 1: Isometric Faceted Cube
function IsometricCubeIcon({ className = "w-14 h-14" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top face */}
      <polygon points="32,6 56,19 32,32 8,19" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Left face */}
      <polygon points="8,19 32,32 32,58 8,45" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Right face */}
      <polygon points="32,32 56,19 56,45 32,58" fill="#bfdbfe" stroke="#1e40af" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Inner architectural cutout */}
      <polygon points="26,24 38,18 44,21 32,27" fill="#3b82f6" fillOpacity="0.8" />
      <polygon points="32,35 44,28 44,40 32,46" fill="#2563eb" fillOpacity="0.9" />
    </svg>
  );
}

// Geometric 3D Blue Wireframe Icon 2: Isometric Rings / Orbit
function IsometricRingsIcon({ className = "w-14 h-14" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="28" rx="22" ry="11" stroke="#2563eb" strokeWidth="1.75" fill="#eff6ff" transform="rotate(-15 32 28)" />
      <ellipse cx="32" cy="38" rx="22" ry="11" stroke="#1d4ed8" strokeWidth="1.75" fill="#dbeafe" fillOpacity="0.6" transform="rotate(-15 32 38)" />
      {/* Connectors */}
      <path d="M14 26 L14 36 M50 30 L50 40" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="38" cy="22" r="3" fill="#1e40af" />
    </svg>
  );
}

// Geometric 3D Blue Wireframe Icon 3: Isometric Grid Matrix Cube
function IsometricMatrixIcon({ className = "w-14 h-14" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Cube Outline */}
      <polygon points="32,8 56,21 32,34 8,21" stroke="#2563eb" strokeWidth="1.5" fill="#eff6ff" />
      <polygon points="8,21 32,34 32,56 8,43" stroke="#1d4ed8" strokeWidth="1.5" fill="#dbeafe" />
      <polygon points="32,34 56,21 56,43 32,56" stroke="#1e40af" strokeWidth="1.5" fill="#bfdbfe" fillOpacity="0.8" />
      {/* Subdivisions */}
      <line x1="20" y1="14.5" x2="44" y2="27.5" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="44" y1="14.5" x2="20" y2="27.5" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="20" y1="27.5" x2="20" y2="49.5" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="44" y1="27.5" x2="44" y2="49.5" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="8" y1="32" x2="32" y2="45" stroke="#1d4ed8" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="32" y1="45" x2="56" y2="32" stroke="#1d4ed8" strokeWidth="1" strokeOpacity="0.8" />
    </svg>
  );
}

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-white text-neutral-900 py-12 sm:py-20 border-b border-neutral-200 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Eyebrow Tag: Blue Dash + THE REALITY OF WEB CRMS */}
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5 text-center">
          <span className="w-4 h-[2px] bg-[#2563eb]"></span>
          <span className="text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#2563eb]">
            THE REALITY OF WEB CRMS
          </span>
        </div>

        {/* Headline: Serif Editorial with distinct two-tone highlighting */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-[-0.025em] leading-[1.14] sm:leading-[1.12] font-serif text-neutral-900 break-words">
            Browser CRMs Were Built for Recording History,{' '}
            <br className="hidden sm:inline" />
            <span className="text-neutral-500 font-serif">Not for Closing Deals.</span>
          </h2>
        </div>

        {/* 3 Spek-Style Line-Box Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="relative rounded-none border border-neutral-200 bg-white p-5 sm:p-8 flex flex-col justify-between hover:border-neutral-400 transition-all duration-200 min-h-[240px] sm:min-h-[260px] group shadow-xs min-w-0">
            <div>
              <div className="mb-4 sm:mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <IsometricCubeIcon />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 tracking-tight font-sans break-words">
                Lost Context Between Sales and Delivery
              </h3>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed break-words">
              When pipeline stages live in a web CRM and execution tasks live in a separate issue tracker, customer requirements get buried. Deal handoffs turn into messy Slack threads and missed commitments.
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-none border border-neutral-200 bg-white p-5 sm:p-8 flex flex-col justify-between hover:border-neutral-400 transition-all duration-200 min-h-[240px] sm:min-h-[260px] group shadow-xs min-w-0">
            <div>
              <div className="mb-4 sm:mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <IsometricRingsIcon />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 tracking-tight font-sans break-words">
                Browser Latency and Tab Overload
              </h3>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed break-words">
              Jumping across fifteen browser tabs and waiting on three-second loading wheels breaks focus during client meetings. Account executives lose valuable selling hours each week to slow web dashboards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-none border border-neutral-200 bg-white p-5 sm:p-8 flex flex-col justify-between hover:border-neutral-400 transition-all duration-200 min-h-[240px] sm:min-h-[260px] group shadow-xs min-w-0">
            <div>
              <div className="mb-4 sm:mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <IsometricMatrixIcon />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 tracking-tight font-sans break-words">
                Zero Visibility on Blocked Deals
              </h3>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed break-words">
              When revenue pipelines cannot see active customer onboarding and delivery tasks, identifying deal blockers becomes manual guesswork. Quarterly revenue forecasts slip without early warning signs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

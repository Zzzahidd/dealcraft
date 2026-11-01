import React from 'react';

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="pricing" className="bg-white text-neutral-900 border-t border-neutral-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-200">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-serif font-semibold tracking-[-0.02em] text-neutral-900">
                Dealcraft
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed font-sans">
              The desktop sales CRM and project execution workspace. Built for founders, account executives, and operators who require native speed.
            </p>
            
            <div className="pt-2 flex items-center gap-3">
              <a
                href="/Dealcraft-Setup.exe?v=3.0"
                download="Dealcraft-Setup.exe"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-none hover:bg-neutral-800 transition-colors"
              >
                Download .exe
              </a>
              <span className="text-xs font-sans text-neutral-500">v2.4.1 (Stable for Windows)</span>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div>
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-900 mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
              <li>
                <a href="#pipeline" className="hover:text-black transition-colors">
                  Deals Pipeline Kanban
                </a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-black transition-colors">
                  Alt + Space Spotlight
                </a>
              </li>
              <li>
                <a href="#accounts" className="hover:text-black transition-colors">
                  Accounts &amp; Deal Dossier
                </a>
              </li>
              <li>
                <a href="#notes" className="hover:text-black transition-colors">
                  Meeting Notes &amp; Docs
                </a>
              </li>
              <li>
                <a href="#tasks" className="hover:text-black transition-colors">
                  Fast Task Capture &amp; Sprints
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Architecture */}
          <div>
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-900 mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-sans">
              <li>
                <a href="#architecture" className="hover:text-black transition-colors">
                  Local-First SQLite
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-black transition-colors">
                  Microsecond NVMe Latency
                </a>
              </li>
              <li>
                <a href="#case-study" className="hover:text-black transition-colors">
                  Case Studies &amp; Benchmarks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Security &amp; Encryption
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Desktop Changelog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Dealcraft Technologies, Inc.</span>
            <span>·</span>
            <span className="text-neutral-600">Pure Local Native Desktop Client</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="text-xs text-neutral-500 hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to top</span>
              <span>&uarr;</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

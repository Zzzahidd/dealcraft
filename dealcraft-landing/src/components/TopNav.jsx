import React, { useState, useEffect } from 'react';

function WindowsIcon({ className = "w-3.5 h-3.5 fill-current" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M0 2.235L6.5 1.34v6.236H0V2.235zm7.34-1.455L16 0v7.576H7.34V.78zM0 8.424h6.5v6.236L0 13.765V8.424zm7.34 0H16V16l-8.66-.78V8.424z" />
    </svg>
  );
}

export default function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Spotlight', href: '#spotlight' },
    { label: 'Sales CRM', href: '#crm' },
    { label: 'Timeline & Backlog', href: '#timeline' },
    { label: 'Local SQLite Engine', href: '#architecture' },
    { label: 'Benchmarks', href: '#case-study' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* 1. Announcement Bar: Matching Black CTA Button Color */}
      <div className="w-full bg-black text-white border-b border-neutral-800 py-2 px-3 sm:px-4 text-center">
        <a
          href="/Dealcraft-Setup.exe?v=3.0"
          download="Dealcraft-Setup.exe"
          className="group inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium tracking-tight text-neutral-300 hover:text-white transition-colors"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            <strong className="text-white font-semibold">Dealcraft 2.0 is live.</strong>{' '}
            <span className="hidden sm:inline">Native offline sales CRM and task workspace for high-velocity teams.</span>
            <span className="sm:hidden">Native offline CRM &amp; workspace.</span>
          </span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 text-neutral-400 group-hover:text-white">
            &rarr;
          </span>
        </a>
      </div>

      {/* 2. Main Navigation Bar with dynamic scroll elevation */}
      <nav
        className={`w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
          scrolled ? 'shadow-xs' : ''
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand */}
          <div className="flex items-center shrink-0">
            <a href="#" className="flex items-center group focus:outline-hidden focus-visible:ring-1 focus-visible:ring-black">
              <span className="text-xl sm:text-2xl font-serif font-semibold tracking-[-0.02em] text-neutral-900 select-none transition-opacity group-hover:opacity-80">
                Dealcraft
              </span>
            </a>
          </div>

          {/* Center: Editorial Section Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: High-Converting Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#architecture"
              className="hidden sm:inline-block text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors px-2 py-1"
            >
              Specs
            </a>
            
            <a
              href="/Dealcraft-Setup.exe?v=3.0"
              download="Dealcraft-Setup.exe"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-black text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 active:scale-[0.98] transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 whitespace-nowrap"
            >
              <WindowsIcon className="w-3.5 h-3.5 fill-current" />
              <span>Download .exe</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-900"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* 3. Responsive Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-6 py-4 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Workspace Modules
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 px-2 transition-colors border-b border-neutral-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href="/Dealcraft-Setup.exe?v=3.0"
                download="Dealcraft-Setup.exe"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white text-xs font-semibold tracking-wider uppercase"
              >
                <WindowsIcon className="w-3.5 h-3.5 fill-current" />
                <span>Download Dealcraft for Windows</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

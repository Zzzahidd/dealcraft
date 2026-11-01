import React, { useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';

export default function FeatureShowcases() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('powershell');

  const installCommand = "irm 'https://dealcraft.app/install.ps1' | iex";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#1D1D16] text-[#F4F4F0] border-t border-[#24241B]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* ==================== CARD 1 (Image 1 match: Text Left, App Window Right) ==================== */}
        <div className="rounded-[2px] border border-[#24241B] bg-[#24241B] p-6 sm:p-10 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Text & Link matching Image 1 */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F0] leading-tight">
                Turn customer conversations into closed deals
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#F4F4F0]/70 leading-relaxed">
                Accelerate your pipeline by handing off notes, stage transitions, and follow-ups to Dealcraft, while you focus on making decisions.
              </p>
              <div className="mt-6">
                <a
                  href="#components"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f54e00] hover:underline"
                >
                  <span>Learn about deal acceleration</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Sleek App Window matching Image 1 */}
            <div className="lg:col-span-7">
              <div className="rounded-[2px] overflow-hidden border border-white/10 bg-[#141410] shadow-2xl">
                {/* Titlebar with window dots */}
                <div className="h-9 px-4 bg-[#181813] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e57d70]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d8a443]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5cba86]/80" />
                  </div>
                  <span className="text-[11px] font-sans text-[#F4F4F0]/60">
                    Dealcraft · The Deals Pipeline
                  </span>
                  <div className="w-8" />
                </div>

                {/* Real Screen Recording from @assests */}
                <div className="relative aspect-[16/10] bg-[#0e0e0b] overflow-hidden">
                  <video
                    src="/assets/deals-pipeline.mp4"
                    className="w-full h-full object-cover block"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CARD 2 (Image 2 match: App Window Left, Text Right) ==================== */}
        <div className="rounded-[2px] border border-[#24241B] bg-[#24241B] p-6 sm:p-10 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: App Window matching Image 2 */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="rounded-[2px] overflow-hidden border border-white/10 bg-[#141410] shadow-2xl">
                {/* Titlebar with window dots and URL bar */}
                <div className="h-9 px-4 bg-[#181813] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e57d70]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d8a443]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5cba86]/80" />
                  </div>
                  <div className="px-3 py-0.5 rounded-[2px] bg-[#10100d] border border-white/5 text-[10px] font-sans text-[#F4F4F0]/60 flex items-center gap-1.5">
                    <span className="text-[#5cba86]">🔒</span>
                    <span>dealcraft://tasks/execution</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Real Screen Recording from @assests */}
                <div className="relative aspect-[16/10] bg-[#0e0e0b] overflow-hidden">
                  <video
                    src="/assets/fast-tasks.mp4"
                    className="w-full h-full object-cover block"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </div>

            {/* Right: Text & Link matching Image 2 */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F0] leading-tight">
                Works autonomously, runs in parallel
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#F4F4F0]/70 leading-relaxed">
                Dealcraft uses your local computer to search accounts, update stages, and log tasks end to end with zero server delays.
              </p>
              <div className="mt-6">
                <a
                  href="#spotlight"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f54e00] hover:underline"
                >
                  <span>Learn about local execution</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CARD 3 (Image 3 match: Text + Installer Left, Classical BG + Window Right) ==================== */}
        <div className="rounded-[2px] border border-[#24241B] bg-[#24241B] p-6 sm:p-10 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Text & Platform Installer matching Image 3 */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F0] leading-tight">
                In every tool, at every step
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#F4F4F0]/70 leading-relaxed">
                Dealcraft runs on your desktop, organizes meeting notes, and syncs high-density accounts in one unified workspace.
              </p>

              {/* Platform Switcher & Terminal Command Box matching Image 3 */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-3 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setActiveTab('powershell')}
                    className={`pb-1 border-b transition-colors ${
                      activeTab === 'powershell'
                        ? 'border-[#f54e00] text-[#F4F4F0] font-semibold'
                        : 'border-transparent text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    PowerShell
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('windows')}
                    className={`pb-1 border-b transition-colors ${
                      activeTab === 'windows'
                        ? 'border-[#f54e00] text-[#F4F4F0] font-semibold'
                        : 'border-transparent text-[#F4F4F0]/50 hover:text-[#F4F4F0]'
                    }`}
                  >
                    Windows
                  </button>
                </div>

                <div className="flex items-center justify-between px-3 py-2.5 rounded-[2px] bg-[#141410] border border-white/10 font-sans text-xs">
                  <span className="text-[#F4F4F0]/90 truncate pr-2 select-all">
                    {installCommand}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-[2px] hover:bg-white/10 text-[#F4F4F0]/60 hover:text-[#F4F4F0] transition-colors flex-shrink-0"
                    title="Copy command"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#5cba86]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Classical Background with Floating Window matching Image 3 */}
            <div className="lg:col-span-7">
              <div
                className="relative rounded-[2px] overflow-hidden p-4 sm:p-6 md:p-8 flex items-center justify-center border border-white/5 shadow-2xl"
                style={{
                  backgroundImage: `url('/assets/recording-bg.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Subtle Backdrop Darkener */}
                <div className="absolute inset-0 bg-[#1D1D16]/30 pointer-events-none" />

                {/* Overlaid Floating Window with Screen Recording */}
                <div className="relative z-10 w-full rounded-[2px] overflow-hidden border border-white/15 bg-[#141410] shadow-2xl">
                  {/* Titlebar */}
                  <div className="h-8 px-3.5 bg-[#181813] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#e57d70]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d8a443]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5cba86]/80" />
                    </div>
                    <span className="text-[10px] font-sans text-[#F4F4F0]/60">
                      dealcraft-agent · Accounts Directory
                    </span>
                    <div className="w-6" />
                  </div>

                  <div className="relative aspect-[16/10] bg-[#0e0e0b] overflow-hidden">
                    <video
                      src="/assets/accounts-directory.mp4"
                      className="w-full h-full object-cover block"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CARD 4 (Image 4 match: Classical BG + Window Left, Text Right) ==================== */}
        <div className="rounded-[2px] border border-[#24241B] bg-[#24241B] p-6 sm:p-10 md:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Classical Background with Floating Window matching Image 4 */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div
                className="relative rounded-[2px] overflow-hidden p-4 sm:p-6 md:p-8 flex items-center justify-center border border-white/5 shadow-2xl"
                style={{
                  backgroundImage: `url('/assets/layout-2.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Subtle Backdrop Darkener */}
                <div className="absolute inset-0 bg-[#1D1D16]/30 pointer-events-none" />

                {/* Overlaid Floating Window with Screen Recording */}
                <div className="relative z-10 w-full rounded-[2px] overflow-hidden border border-white/15 bg-[#141410] shadow-2xl">
                  {/* Titlebar */}
                  <div className="h-8 px-3.5 bg-[#181813] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#e57d70]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d8a443]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5cba86]/80" />
                    </div>
                    <span className="text-[10px] font-sans text-[#F4F4F0]/60">
                      Deal Dossier · Notes & Docs
                    </span>
                    <div className="w-6" />
                  </div>

                  <div className="relative aspect-[16/10] bg-[#0e0e0b] overflow-hidden">
                    <video
                      src="/assets/notes-dossier.mp4"
                      className="w-full h-full object-cover block"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text & Link matching Image 4 */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F4F0] leading-tight">
                Hand work to Dealcraft
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#F4F4F0]/70 leading-relaxed">
                Dealcraft signs in to your local workspace, organizes meeting notes, and updates account dossiers with finished work ready for review.
              </p>
              <div className="mt-6">
                <a
                  href="/Dealcraft-Setup.exe?v=3.0"
                  download="Dealcraft-Setup.exe"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f54e00] hover:underline"
                >
                  <span>Download Dealcraft for Windows</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

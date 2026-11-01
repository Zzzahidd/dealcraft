import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, Plus, ArrowUpRight } from 'lucide-react';

export default function LinearIntakeSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Nguyen',
      avatar: 'SN',
      avatarBg: 'bg-[#3b82f6]/20 text-[#93c5fd]',
      time: '8:54 AM',
      text: 'LVMH procurement submitted redlined terms on clause 4.2. Can we adjust payment milestones to net-30 and update ARR projection?',
    },
    {
      id: 2,
      sender: 'Tanjim Islam',
      avatar: 'TI',
      avatarBg: 'bg-[#10b981]/20 text-[#6ee7b7]',
      time: '8:54 AM',
      text: 'Confirmed with legal and finance. Local SQLite schema updated with milestone tier. Win probability recalculated from 65% to 78%.',
    },
    {
      id: 3,
      sender: 'James Taylor',
      avatar: 'JT',
      avatarBg: 'bg-[#f59e0b]/20 text-[#fcd34d]',
      time: '8:55 AM',
      text: 'Deal dossier updated. Advancing pipeline stage to Procurement now.',
    },
  ]);

  const [inputVal, setInputVal] = useState('@Dealcraft advance LVMH stage to Procurement and assign review to Sarah');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        avatar: 'ME',
        avatarBg: 'bg-[#8b5cf6]/20 text-[#c4b5fd]',
        time: 'Just now',
        text: inputVal.trim(),
      },
    ]);
    setInputVal('');
  };

  return (
    <section className="py-24 bg-[#1D1D16] text-[#F4F4F0] border-t border-[#24241B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-sans text-[#F4F4F0]/50 uppercase tracking-wider mb-2">
            Intake and CRM Triage
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F0] leading-tight">
            Purpose-built for fast deal movement.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F4F4F0]/80">
            Triage customer requests, sync deal terms, and advance pipeline stages directly from the keyboard without waiting on cloud latency.
          </p>
        </div>

        {/* Linear-Style Big Canvas: Board in background, Floating Thread Card on left */}
        <div className="relative rounded-xl border border-[#24241B] bg-[#141410] overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8">
          {/* Real Gr8r-Studio Board Screenshot in background */}
          <div className="relative w-full rounded-lg overflow-hidden border border-[#24241B] bg-[#1a1a14]">
            <img
              src="/assets/app-shots/gr8r_board.png"
              alt="Real Dealcraft Kanban Deals Board"
              className="w-full h-auto block object-cover opacity-60 filter brightness-90"
            />

            {/* Subtle Gradient Overlays for contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141410]/90 via-[#141410]/50 to-transparent pointer-events-none" />

            {/* Floating Thread Card on Left (matching Linear UI 1 exactly) */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-[92%] sm:w-[420px] max-w-full rounded-xl border border-white/10 bg-[#1D1D16]/95 backdrop-blur-md shadow-2xl p-4 sm:p-5 z-10">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#F4F4F0]/60" />
                  <span className="text-xs font-sans font-semibold text-[#F4F4F0]">
                    Thread <span className="text-[#F4F4F0]/40">#deal-ops</span>
                  </span>
                </div>
                <span className="text-xs text-[#F4F4F0]/40 font-sans">LVMH-2026</span>
              </div>

              {/* Messages List */}
              <div className="mt-3.5 space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div key={m.id} className="flex items-start gap-2.5 text-xs">
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${m.avatarBg}`}
                    >
                      {m.avatar}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-[#F4F4F0]">{m.sender}</span>
                        <span className="text-[10px] text-[#F4F4F0]/40 font-sans">{m.time}</span>
                      </div>
                      <p className="text-[#F4F4F0]/80 leading-relaxed text-[11.5px]">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Box with Command Input */}
              <form onSubmit={handleSend} className="mt-3.5 pt-3 border-t border-white/5">
                <div className="relative rounded-lg bg-[#24241B] border border-white/10 p-2 focus-within:border-white/30 transition-colors">
                  <div className="text-[10px] font-sans text-[#72a5ea] mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>@Dealcraft Command</span>
                  </div>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type command and hit Enter..."
                    className="w-full bg-transparent text-xs text-[#F4F4F0] placeholder-[#F4F4F0]/40 focus:outline-none"
                  />
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#F4F4F0]/40 font-sans">
                      <span>Shift + ↵ newline</span>
                    </div>
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded bg-[#F4F4F0] text-[#1D1D16] hover:bg-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Send</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Features Bar matching Linear UI 1 bottom footer */}
          <div className="mt-6 pt-4 border-t border-[#24241B] flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#F4F4F0]/60">
            <span className="text-[#F4F4F0] font-semibold uppercase tracking-wider">Features</span>
            <div className="flex items-center gap-6">
              <a href="#pipeline" className="hover:text-[#F4F4F0] transition-colors flex items-center gap-1">
                <span>Pipeline Velocity</span>
                <span className="text-[#F4F4F0]/40">+</span>
              </a>
              <a href="#spotlight" className="hover:text-[#F4F4F0] transition-colors flex items-center gap-1">
                <span>Keyboard Spotlight</span>
                <span className="text-[#F4F4F0]/40">+</span>
              </a>
              <a href="#architecture" className="hover:text-[#F4F4F0] transition-colors flex items-center gap-1">
                <span>Local SQLite</span>
                <span className="text-[#F4F4F0]/40">+</span>
              </a>
              <a href="#components" className="hover:text-[#F4F4F0] transition-colors flex items-center gap-1">
                <span>Deal Triage</span>
                <span className="text-[#F4F4F0]/40">+</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

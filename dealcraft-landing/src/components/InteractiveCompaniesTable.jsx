import React, { useState } from 'react';

const COMPANIES = [
  {
    id: 'apple',
    name: 'Apple',
    domain: 'apple.com',
    logo: '🍎',
    stage: 'Pilot',
    tags: ['Pilot'],
    ownerInitials: 'AS',
    ownerName: 'Alex Santos',
    pipelineValue: 530111,
    deals: 6,
    winRate: 82,
    lastInteraction: 'Exec 2026-03-12',
    sector: 'Consumer Electronics / Silicon Valley',
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    domain: 'snowflake.com',
    logo: '❄️',
    stage: 'Enterprise',
    tags: ['Enterprise', 'Mid-Market'],
    ownerInitials: 'GM',
    ownerName: 'Grace Miller',
    pipelineValue: 520000,
    deals: 6,
    winRate: 24,
    lastInteraction: 'Pricing 2026-09-11',
    sector: 'Cloud Data Warehouse',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    domain: 'stripe.com',
    logo: '💳',
    stage: 'Expansion',
    tags: ['Expansion', 'SMB', 'Upsell', 'Pilot'],
    ownerInitials: 'NL',
    ownerName: 'Noah Lee',
    pipelineValue: 442231,
    deals: 3,
    winRate: 44,
    lastInteraction: 'Demo 2026-09-09',
    sector: 'Financial Infrastructure / Global',
  },
  {
    id: 'attio',
    name: 'Attio',
    domain: 'attio.com',
    logo: '⚡',
    stage: 'Mid-Market',
    tags: ['Mid-Market', 'Upsell', 'Renewal', 'Co-Sell'],
    ownerInitials: 'JF',
    ownerName: 'Jamie Fox',
    pipelineValue: 420222,
    deals: 2,
    winRate: 38,
    lastInteraction: 'Pricing 2026-06-14',
    sector: 'Relationship Management',
  },
  {
    id: 'lvmh',
    name: 'LVMH',
    domain: 'lvmh.com',
    logo: '👜',
    stage: 'Enterprise',
    tags: ['Enterprise', 'Upsell', 'Expansion', 'Renewal'],
    ownerInitials: 'SN',
    ownerName: 'Sarah Nguyen',
    pipelineValue: 420000,
    deals: 7,
    winRate: 70,
    lastInteraction: 'QBR Call 2026-02-21',
    sector: 'Luxury Retail / EMEA',
  },
  {
    id: 'slack',
    name: 'Slack',
    domain: 'slack.com',
    logo: '💬',
    stage: 'Mid-Market',
    tags: ['Mid-Market', 'Co-Sell'],
    ownerInitials: 'AB',
    ownerName: 'Ava Brooks',
    pipelineValue: 333221,
    deals: 4,
    winRate: 23,
    lastInteraction: 'Discovery 2026-08-12',
    sector: 'Team Collaboration',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    domain: 'microsoft.com',
    logo: '🪟',
    stage: 'Strategic',
    tags: ['Strategic', 'Expansion'],
    ownerInitials: 'MD',
    ownerName: 'Mark Darnalds',
    pipelineValue: 320222,
    deals: 8,
    winRate: 86,
    lastInteraction: 'Pilot 2026-03-15',
    sector: 'Enterprise Cloud & OS',
  },
  {
    id: 'disney',
    name: 'Disney',
    domain: 'disney.com',
    logo: '🏰',
    stage: 'Enterprise',
    tags: ['Enterprise', 'New Logo'],
    ownerInitials: 'JT',
    ownerName: 'James Taylor',
    pipelineValue: 311242,
    deals: 4,
    winRate: 51,
    lastInteraction: 'Demo 2026-02-22',
    sector: 'Media & Entertainment',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    domain: 'zoom.com',
    logo: '📹',
    stage: 'Expansion',
    tags: ['Expansion', 'Land & Expand', 'Renewal'],
    ownerInitials: 'OC',
    ownerName: 'Oliver Chan',
    pipelineValue: 289921,
    deals: 8,
    winRate: 38,
    lastInteraction: 'Partner 2026-08-08',
    sector: 'Video Communications',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    domain: 'intercom.com',
    logo: '🤖',
    stage: 'Enterprise',
    tags: ['Enterprise', 'Mid-Market'],
    ownerInitials: 'LW',
    ownerName: 'Lina Wong',
    pipelineValue: 230112,
    deals: 5,
    winRate: 61,
    lastInteraction: 'Product 2026-03-28',
    sector: 'AI Customer Service',
  },
];

function formatMoney(amount) {
  return '$' + amount.toLocaleString();
}

function getWinRateColor(rate) {
  if (rate >= 60) return '#10b981'; // Green
  if (rate >= 35) return '#f59e0b'; // Amber
  return '#ef4444'; // Red
}

export default function InteractiveCompaniesTable() {
  const [companies, setCompanies] = useState(COMPANIES);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const filtered = companies.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.domain.toLowerCase().includes(q) ||
      c.ownerName.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    if (selectedCompany?.id === id) setSelectedCompany(null);
  };

  return (
    <div className="w-full bg-[#141416] text-[#e2e8f0] font-sans border border-neutral-800 select-none overflow-hidden text-xs relative">
      
      {/* 1. App Header Bar matching Image 3 */}
      <div className="px-4 py-3 border-b border-neutral-800 bg-[#18181b] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              Companies
              <span className="text-[10px] px-1.5 py-0.5 rounded-none bg-blue-500/20 text-blue-400 font-normal">
                {companies.length} Accounts
              </span>
            </h4>
            <p className="text-[11px] text-neutral-400">
              High-density local SQLite accounts directory with live search.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search CRM, accounts, owners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#202024] border border-neutral-700 text-neutral-200 text-xs px-2.5 py-1 rounded-none w-48 sm:w-64 focus:outline-none focus:border-blue-500"
          />
          {selectedIds.length > 0 && (
            <span className="text-[11px] bg-blue-600/30 text-blue-300 border border-blue-500/40 px-2 py-0.5 font-medium">
              {selectedIds.length} selected
            </span>
          )}
        </div>
      </div>

      {/* 2. Authentic Table matching Image 3 */}
      <div className="overflow-x-auto min-h-[380px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 bg-[#18181b] text-neutral-400 font-medium text-[11px]">
              <th className="py-2.5 px-3 w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filtered.length && filtered.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded-none cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3">COMPANY</th>
              <th className="py-2.5 px-3">STAGE &amp; TAGS</th>
              <th className="py-2.5 px-3">ACCOUNT OWNER</th>
              <th className="py-2.5 px-3 text-right">PIPELINE VALUE</th>
              <th className="py-2.5 px-3 text-center">DEALS</th>
              <th className="py-2.5 px-3">WIN RATE</th>
              <th className="py-2.5 px-3">LAST INTERACTION</th>
              <th className="py-2.5 px-3 text-right w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {filtered.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              const winColor = getWinRateColor(c.winRate);

              return (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCompany(c)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-950/20'
                      : 'hover:bg-neutral-800/40'
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => toggleSelectOne(c.id, e)}
                      className="rounded-none cursor-pointer"
                    />
                  </td>

                  {/* Company & Domain */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm shrink-0">{c.logo}</span>
                      <div>
                        <div className="font-semibold text-white tracking-tight">{c.name}</div>
                        <div className="text-[10px] text-neutral-400">{c.domain}</div>
                      </div>
                    </div>
                  </td>

                  {/* Stage & Tags */}
                  <td className="py-2.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-[#202024] border border-neutral-700/80 text-[10px] text-neutral-300 rounded-none font-medium"
                        >
                          {t}
                        </span>
                      ))}
                      {c.tags.length > 3 && (
                        <span className="text-[10px] text-neutral-500">
                          +{c.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Account Owner */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-300 text-[9px] font-bold flex items-center justify-center border border-blue-700/50">
                        {c.ownerInitials}
                      </span>
                      <span className="text-neutral-300 truncate">{c.ownerName}</span>
                    </div>
                  </td>

                  {/* Pipeline Value */}
                  <td className="py-2.5 px-3 text-right font-semibold text-white">
                    {formatMoney(c.pipelineValue)}
                  </td>

                  {/* Deals */}
                  <td className="py-2.5 px-3 text-center text-neutral-400">
                    {c.deals} deals
                  </td>

                  {/* Win Rate Progress Bar */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-neutral-800 h-1.5 rounded-none overflow-hidden">
                        <div
                          style={{ width: `${c.winRate}%`, backgroundColor: winColor }}
                          className="h-full rounded-none"
                        />
                      </div>
                      <span style={{ color: winColor }} className="text-[10px] font-semibold w-7 text-right">
                        {c.winRate}%
                      </span>
                    </div>
                  </td>

                  {/* Last Interaction */}
                  <td className="py-2.5 px-3 text-[11px] text-neutral-400 font-mono">
                    {c.lastInteraction}
                  </td>

                  {/* Delete & Chevron */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-60 hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => handleDelete(c.id, e)}
                        className="text-neutral-500 hover:text-red-400 text-xs p-1"
                        title="Delete account"
                      >
                        🗑
                      </button>
                      <span className="text-neutral-500">›</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Slide-Over Deal Dossier Drawer */}
      {selectedCompany && (
        <div className="absolute top-0 right-0 bottom-0 w-full sm:w-[360px] bg-[#1a1a1e] border-l border-neutral-700 z-30 flex flex-col p-5 shadow-2xl overflow-y-auto">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedCompany.logo}</span>
              <div>
                <h5 className="text-base font-bold text-white">{selectedCompany.name}</h5>
                <p className="text-[11px] text-neutral-400">{selectedCompany.domain}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCompany(null)}
              className="text-neutral-400 hover:text-white text-base"
            >
              ✕
            </button>
          </div>

          {/* Metric Scorecards */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-[#141416] p-2.5 border border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Pipeline ARR</div>
              <div className="text-sm font-bold text-white mt-1">{formatMoney(selectedCompany.pipelineValue)}</div>
            </div>
            <div className="bg-[#141416] p-2.5 border border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">Win Probability</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">{selectedCompany.winRate}%</div>
            </div>
          </div>

          <div className="space-y-3 text-xs text-neutral-300">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold mb-1">Account Executive</span>
              <div className="flex items-center gap-2 bg-[#141416] p-2 border border-neutral-800">
                <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-300 text-[9px] font-bold flex items-center justify-center">
                  {selectedCompany.ownerInitials}
                </span>
                <span>{selectedCompany.ownerName}</span>
              </div>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold mb-1">Market Sector</span>
              <div className="bg-[#141416] p-2 border border-neutral-800 text-neutral-200">
                {selectedCompany.sector}
              </div>
            </div>

            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold mb-1">Recent Activity</span>
              <div className="bg-[#141416] p-2 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                {selectedCompany.lastInteraction} · Next step logged
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedCompany(null)}
            className="mt-auto pt-3 pb-1 w-full text-center text-xs text-neutral-400 hover:text-white border-t border-neutral-800"
          >
            Close Dossier
          </button>
        </div>
      )}

      {/* Footer helper */}
      <div className="px-4 py-2 border-t border-neutral-800 bg-[#18181b] flex items-center justify-between text-[11px] text-neutral-400">
        <div>
          Showing <strong>{filtered.length}</strong> of {companies.length} enterprise accounts
        </div>
        <div className="text-neutral-500 italic">
          Click any row to open the complete Deal Dossier drawer.
        </div>
      </div>
    </div>
  );
}

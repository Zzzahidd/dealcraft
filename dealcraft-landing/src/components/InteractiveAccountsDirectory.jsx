import React, { useState, useMemo } from 'react';

const COMPANIES_DATA = [
  {
    id: 'stripe',
    name: 'Stripe',
    tags: ['Expansion', 'SMB', 'Upsell', 'Pilot'],
    owner: 'Noah Lee',
    avatar: 'NL',
    openDeals: 3,
    pipelineValue: 442231,
    winProbability: 44,
    sector: 'Enterprise Software / Global',
    businessFit: '4/5',
    technicalFit: '4/5',
    lastTouch: 'Today, 10:45 AM',
  },
  {
    id: 'lvmh',
    name: 'LVMH',
    tags: ['Enterprise', 'Upsell', 'Expansion', 'Renewal'],
    owner: 'Sarah Nguyen',
    avatar: 'SN',
    openDeals: 7,
    pipelineValue: 420000,
    winProbability: 70,
    sector: 'Luxury Retail / EMEA',
    businessFit: '5/5',
    technicalFit: '4/5',
    lastTouch: 'Yesterday',
  },
  {
    id: 'disney',
    name: 'Disney',
    tags: ['Enterprise', 'New Logo'],
    owner: 'James Taylor',
    avatar: 'JT',
    openDeals: 4,
    pipelineValue: 311242,
    winProbability: 51,
    sector: 'Media & Entertainment',
    businessFit: '4/5',
    technicalFit: '3/5',
    lastTouch: '2 days ago',
  },
  {
    id: 'apple',
    name: 'Apple',
    tags: ['Pilot', 'Enterprise'],
    owner: 'Alex Santos',
    avatar: 'AS',
    openDeals: 6,
    pipelineValue: 530111,
    winProbability: 82,
    sector: 'Consumer Electronics / Silicon',
    businessFit: '5/5',
    technicalFit: '5/5',
    lastTouch: '3 days ago',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tags: ['Strategic', 'Expansion'],
    owner: 'Mark Darnalds',
    avatar: 'MD',
    openDeals: 8,
    pipelineValue: 320222,
    winProbability: 86,
    sector: 'Enterprise Cloud & OS',
    businessFit: '5/5',
    technicalFit: '4/5',
    lastTouch: '4 days ago',
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    tags: ['Upsell', 'Expansion', 'SMB'],
    owner: 'Drew Nash',
    avatar: 'DN',
    openDeals: 3,
    pipelineValue: 122230,
    winProbability: 51,
    sector: 'Travel & Hospitality',
    businessFit: '4/5',
    technicalFit: '4/5',
    lastTouch: '5 days ago',
  },
];

function formatMoney(n) {
  return '$' + n.toLocaleString();
}

export default function InteractiveAccountsDirectory() {
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const [selectedIds, setSelectedIds] = useState(['stripe']);
  const [activeDossier, setActiveDossier] = useState(COMPANIES_DATA[0]);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [commandInput, setCommandInput] = useState('@Dealcraft advance Stripe to Expansion and schedule security review');
  const [commandExecuted, setCommandExecuted] = useState(false);

  const filtered = useMemo(() => {
    return COMPANIES_DATA.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.owner.toLowerCase().includes(search.toLowerCase());
      const matchesTag =
        filterTag === 'All' || c.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase());
      return matchesSearch && matchesTag;
    });
  }, [search, filterTag]);

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenDossier = (company) => {
    setActiveDossier(company);
    setIsDossierOpen(true);
  };

  const handleExecuteCommand = (e) => {
    e.preventDefault();
    setCommandExecuted(true);
    setTimeout(() => setCommandExecuted(false), 2400);
  };

  return (
    <div className="relative w-full bg-white border border-neutral-200">
      {/* Directory Toolbar Header */}
      <div className="p-4 border-b border-neutral-200 bg-neutral-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
          </div>
          <span className="text-xs font-semibold text-neutral-800 tracking-tight">
            Accounts Directory (Live NVMe Cache)
          </span>
          <span className="px-2 py-0.5 bg-neutral-200/60 text-neutral-700 text-[11px] font-medium">
            {filtered.length} of {COMPANIES_DATA.length} Accounts
          </span>
        </div>

        {/* Live Filter Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter accounts or owners..."
              className="text-xs px-2.5 py-1.5 border border-neutral-300 bg-white text-neutral-900 w-44 sm:w-56 focus:outline-hidden focus:border-blue-600"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2 top-1.5 text-neutral-400 hover:text-neutral-700 text-xs cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1">
            {['All', 'Enterprise', 'Expansion', 'Pilot'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilterTag(tag)}
                className={`px-2.5 py-1 text-[11px] font-medium cursor-pointer transition-colors ${
                  filterTag === tag
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table Layout */}
      <div className="overflow-x-auto min-h-[340px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/50 text-neutral-500 font-medium">
              <th className="py-2.5 px-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filtered.length && filtered.length > 0}
                  onChange={() => {
                    if (selectedIds.length === filtered.length) {
                      setSelectedIds([]);
                    } else {
                      setSelectedIds(filtered.map((c) => c.id));
                    }
                  }}
                  className="rounded-none cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-4">Company</th>
              <th className="py-2.5 px-4">Tags</th>
              <th className="py-2.5 px-4">Owner</th>
              <th className="py-2.5 px-4 text-center">Deals</th>
              <th className="py-2.5 px-4 text-right">Pipeline ARR</th>
              <th className="py-2.5 px-4 text-right">Win Prob</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <tr
                  key={c.id}
                  onClick={() => handleOpenDossier(c)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/30' : 'hover:bg-neutral-50/80'
                  }`}
                >
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => toggleSelect(c.id, e)}
                      className="rounded-none cursor-pointer"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-none bg-neutral-100 border border-neutral-200 text-neutral-900 font-bold text-xs flex items-center justify-center">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900">{c.name}</div>
                        <div className="text-[10px] text-neutral-400">{c.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 text-[9px] font-bold flex items-center justify-center">
                        {c.avatar}
                      </span>
                      <span className="text-neutral-700">{c.owner}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-neutral-600">
                    {c.openDeals}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-neutral-900">
                    {formatMoney(c.pipelineValue)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <span className="font-semibold text-neutral-700 text-[11px]">
                        {c.winProbability}%
                      </span>
                      <div className="w-12 h-1.5 bg-neutral-100 overflow-hidden border border-neutral-200">
                        <div
                          className={`h-full ${
                            c.winProbability >= 70
                              ? 'bg-emerald-500'
                              : c.winProbability >= 50
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${c.winProbability}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDossier(c);
                      }}
                      className="px-2 py-1 text-[11px] font-medium border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                    >
                      Dossier &rarr;
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Floating Linear-Style Command Intake Card (Faithfully matching Image 2) */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-50/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <form onSubmit={handleExecuteCommand} className="flex-1 flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>@Dealcraft Intake:</span>
          </div>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            className="flex-1 text-xs px-3 py-1.5 border border-neutral-300 bg-white text-neutral-900 focus:outline-hidden focus:border-blue-600"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            {commandExecuted ? '✓ Executed in 0.4ms' : 'Execute ↵'}
          </button>
        </form>

        <div className="text-[11px] text-neutral-500 shrink-0 self-center">
          Click any row to open full account dossier
        </div>
      </div>

      {/* Slide-over Deal Dossier Drawer (from component 2 company-detail.tsx) */}
      {isDossierOpen && activeDossier && (
        <div className="absolute inset-y-0 right-0 w-full sm:w-[420px] bg-white border-l border-neutral-200 shadow-2xl z-30 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
          {/* Drawer Top Header */}
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Account Details
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDossierOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-900 text-base leading-none cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* Company Brand Card */}
          <div className="p-5 border-b border-neutral-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-none bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                {activeDossier.name[0]}
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">{activeDossier.name}</h3>
                <p className="text-xs text-neutral-500">{activeDossier.sector}</p>
              </div>
            </div>

            {/* 3 Top Metric Blocks */}
            <div className="grid grid-cols-3 gap-2.5 p-3 bg-neutral-50 border border-neutral-200">
              <div>
                <div className="text-[10px] text-neutral-500 font-semibold uppercase">Pipeline</div>
                <div className="text-sm font-bold text-neutral-900">
                  {formatMoney(activeDossier.pipelineValue)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 font-semibold uppercase">Open Deals</div>
                <div className="text-sm font-bold text-neutral-900">{activeDossier.openDeals}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 font-semibold uppercase">Win Prob</div>
                <div className="text-sm font-bold text-emerald-600">
                  {activeDossier.winProbability}%
                </div>
              </div>
            </div>
          </div>

          {/* Dossier Tabs */}
          <div className="px-5 border-b border-neutral-200 flex gap-4 text-xs font-semibold text-neutral-600">
            <span className="py-2.5 border-b-2 border-blue-600 text-blue-600">Overview</span>
            <span className="py-2.5 text-neutral-400 hover:text-neutral-700 cursor-pointer">
              Pipeline &amp; Deals
            </span>
            <span className="py-2.5 text-neutral-400 hover:text-neutral-700 cursor-pointer">
              Stakeholders
            </span>
            <span className="py-2.5 text-neutral-400 hover:text-neutral-700 cursor-pointer">Notes</span>
          </div>

          {/* Dossier Content Body */}
          <div className="p-5 space-y-4 flex-1">
            <div>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                Account Executive
              </div>
              <div className="p-2.5 border border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-900">{activeDossier.owner}</span>
                <span className="text-[11px] text-neutral-500">Senior AE</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                Sales Stages
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeDossier.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
                Deal Health &amp; Scorecards
              </div>
              <div className="space-y-2">
                <div className="p-3 border border-neutral-200 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-neutral-900">Business fit</span>
                    <span className="font-bold text-blue-600">{activeDossier.businessFit}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Evaluates ARR expansion targets and executive sponsor alignment.
                  </p>
                </div>
                <div className="p-3 border border-neutral-200 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-neutral-900">Technical fit</span>
                    <span className="font-bold text-emerald-600">{activeDossier.technicalFit}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Local offline sync, SQLite WAL integrity, and enterprise security compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">Last touch: {activeDossier.lastTouch}</span>
            <button
              type="button"
              onClick={() => setIsDossierOpen(false)}
              className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

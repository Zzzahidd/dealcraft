import React, { useState } from 'react';

const INITIAL_DEALS = [
  {
    id: 'lvmh',
    name: 'LVMH Luxury Group',
    stage: 'New Logo',
    value: 420000,
    owner: 'Sarah Nguyen',
    avatar: 'SN',
    winProbability: 70,
    subtext: 'Technical demo for retail operations',
    tag: 'Enterprise',
  },
  {
    id: 'apple',
    name: 'Apple Inc.',
    stage: 'Pilot',
    value: 530111,
    owner: 'Alex Santos',
    avatar: 'AS',
    winProbability: 82,
    subtext: 'Review Master Services Agreement',
    tag: 'Pilot',
  },
  {
    id: 'disney',
    name: 'The Walt Disney Company',
    stage: 'New Logo',
    value: 311242,
    owner: 'James Taylor',
    avatar: 'JT',
    winProbability: 51,
    subtext: 'Security review with InfoSec team',
    tag: 'Enterprise',
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    stage: 'Expansion',
    value: 442231,
    owner: 'Noah Lee',
    avatar: 'NL',
    winProbability: 86,
    subtext: 'ARR Expansion · SMB & Upsell pilot',
    tag: 'Expansion',
  },
  {
    id: 'microsoft',
    name: 'Microsoft Corp',
    stage: 'Renewal',
    value: 320222,
    owner: 'Mark Darnalds',
    avatar: 'MD',
    winProbability: 88,
    subtext: 'Annual enterprise license renewal',
    tag: 'Strategic',
  },
  {
    id: 'united',
    name: 'United Airlines',
    stage: 'Expansion',
    value: 221231,
    owner: 'Nia Jameson',
    avatar: 'NJ',
    winProbability: 77,
    subtext: 'Operations workflow pilot rollout',
    tag: 'Renewal',
  },
];

const STAGES = ['New Logo', 'Pilot', 'Expansion', 'Renewal', 'Closed Won'];

function formatMoney(num) {
  return '$' + num.toLocaleString();
}

export default function InteractiveDealsPipeline() {
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [selectedDealId, setSelectedDealId] = useState(null);

  // Advance deal to next stage
  const advanceDeal = (dealId, e) => {
    e.stopPropagation();
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const currentIndex = STAGES.indexOf(deal.stage);
          const nextIndex = (currentIndex + 1) % STAGES.length;
          return { ...deal, stage: STAGES[nextIndex] };
        }
        return deal;
      })
    );
  };

  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="w-full bg-white border border-neutral-200">
      {/* App Window Header Bar */}
      <div className="px-5 py-3.5 border-b border-neutral-200 bg-neutral-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
          </div>
          <span className="text-xs font-semibold text-neutral-800 tracking-tight">
            Deals Pipeline
          </span>
          <span className="px-2 py-0.5 bg-neutral-200/60 text-neutral-700 text-[11px] font-medium">
            {deals.length} Active Accounts
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-neutral-500">
            Total Pipeline:{' '}
            <span className="font-bold text-neutral-900">{formatMoney(totalPipeline)}</span>
          </div>
          <button
            type="button"
            onClick={() => setDeals(INITIAL_DEALS)}
            className="px-2.5 py-1 text-[11px] font-medium border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
          >
            Reset Board
          </button>
        </div>
      </div>

      {/* Kanban Stage Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
        {STAGES.slice(0, 4).map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div key={stage} className="p-3.5 flex flex-col min-h-[380px] bg-white">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    {stage}
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-neutral-100 text-neutral-600">
                    {stageDeals.length}
                  </span>
                </div>
                <span className="text-xs font-semibold text-neutral-500">
                  {formatMoney(stageTotal)}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="flex flex-col gap-2.5 flex-grow">
                {stageDeals.length === 0 ? (
                  <div className="py-12 text-center text-xs text-neutral-400 border border-dashed border-neutral-200 bg-neutral-50/50">
                    No active deals in {stage}
                  </div>
                ) : (
                  stageDeals.map((deal) => {
                    const isSelected = selectedDealId === deal.id;
                    return (
                      <div
                        key={deal.id}
                        onClick={() => setSelectedDealId(isSelected ? null : deal.id)}
                        className={`p-3.5 border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600'
                            : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-none bg-neutral-100 border border-neutral-200 text-neutral-800 text-[10px] font-bold flex items-center justify-center">
                              {deal.name[0]}
                            </span>
                            <span className="text-xs font-semibold text-neutral-900 leading-tight">
                              {deal.name}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-neutral-900">
                            {formatMoney(deal.value)}
                          </span>
                        </div>

                        <p className="text-[11px] text-neutral-500 mb-2.5 line-clamp-1">
                          {deal.subtext}
                        </p>

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                            <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 text-[9px] font-bold flex items-center justify-center">
                              {deal.avatar}
                            </span>
                            <span>{deal.owner}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-neutral-500">
                              {deal.winProbability}%
                            </span>
                            <button
                              type="button"
                              onClick={(e) => advanceDeal(deal.id, e)}
                              className="px-2 py-0.5 text-[10px] font-medium bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer transition-colors"
                              title="Advance to next pipeline stage"
                            >
                              Advance &rarr;
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Deal Micro-Inspection Footer Bar */}
      {selectedDealId && (
        <div className="p-3 border-t border-neutral-200 bg-blue-50/50 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-700">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900">
              Selected Deal:{' '}
              {deals.find((d) => d.id === selectedDealId)?.name}
            </span>
            <span className="text-neutral-500">·</span>
            <span>
              Stage: {deals.find((d) => d.id === selectedDealId)?.stage}
            </span>
            <span className="text-neutral-500">·</span>
            <span>
              ARR: {formatMoney(deals.find((d) => d.id === selectedDealId)?.value || 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedDealId(null)}
            className="text-neutral-500 hover:text-neutral-900 cursor-pointer font-medium"
          >
            Dismiss &times;
          </button>
        </div>
      )}
    </div>
  );
}

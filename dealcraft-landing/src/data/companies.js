/* ---------- Sales CRM Data Module ---------- */

export const SEGMENTS = ['Enterprise', 'Mid-Market', 'SMB', 'Strategic'];

export const STAGES = [
  'New Logo',
  'Upsell',
  'Expansion',
  'Renewal',
  'Pilot',
  'Co-Sell',
  'Land & Expand',
];

export const TAG_TONES = {
  Enterprise: 'blue',
  'Mid-Market': 'moss',
  SMB: 'yellow',
  Strategic: 'red',
  'New Logo': 'green',
  Upsell: 'purple',
  Expansion: 'green',
  Renewal: 'green',
  Pilot: 'orange',
  'Co-Sell': 'amber',
  'Land & Expand': 'teal',
};

const AVATARS = Array.from(
  { length: 10 },
  (_, i) => '/assets/images/_common/avatars/avatar-' + (i + 1) + '.png',
);

const OWNER_NAMES = [
  "Sarah Nguyen",
  "James Taylor",
  "Maria Keller",
  "Nia Jameson",
  "Alex Santos",
  "Mark Darnalds",
  "Drew Nash",
  "Lina Wong",
  "Jamie Fox",
  "Kate Chen",
  "Ricky Brown",
  "Hannah Mills",
  "Emma Green",
  "Oliver Chan",
  "Ava Brooks",
  "Noah Lee",
  "Grace Miller",
  "Chloe Park",
];

export const OWNERS = OWNER_NAMES.map((name, i) => ({
  name,
  avatar: AVATARS[i % AVATARS.length],
  email: `${name.toLowerCase().replace(" ", ".")}@crm.com`,
  phone: `+1 (202) ${String(199 + i).padStart(3, "0")}-${String(5520 + i * 37).slice(-4)}`,
  role: i % 3 === 0 ? "Senior Account Executive" : "Account Executive",
}));

export const CURRENT_USER = {
  name: "Jensen Ackles",
  avatar: "/assets/images/_common/avatars/jensen.png",
  email: "jensen.ackles@crm.com",
  phone: "+1 (202) 184-5501",
  role: "Head of Sales",
};

export function ownerByName(name) {
  return OWNERS.find((owner) => owner.name === name) ?? OWNERS[0];
}

export function profileByName(name) {
  return name === CURRENT_USER.name ? CURRENT_USER : ownerByName(name);
}

export const TREND_PATTERN = [
  false,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
];

export const DEFAULT_TREND = [4, 4, 5, 5, 2, 7, 11, 7, 5, 7, 5, 3, 7, 14];

const TREND_A = [4, 4, 10, 3, 2, 4, 7, 4, 11, 4, 11, 7, 4, 14];
const TREND_B = [4, 4, 5, 5, 2, 7, 11, 7, 5, 7, 5, 3, 7, 14];
const TREND_C = [4, 4, 10, 5, 2, 7, 11, 7, 11, 7, 11, 7, 7, 14];
const TREND_D = [4, 4, 5, 12, 5, 7, 11, 3, 11, 3, 11, 3, 7, 14];

const COMPANY_RECORDS = [
  {
    id: "lvmh",
    name: "LVMH",
    tags: ["Enterprise", "Upsell", "Expansion", "Renewal"],
    owner: "Sarah Nguyen",
    openDeals: 7,
    pipelineValue: 420000,
    winProbability: 70,
    trend: TREND_A,
    lastInteraction: { date: "2026-02-21", label: "QBR Call" },
    activityDays: 88,
  },
  {
    id: "disney",
    name: "Disney",
    tags: ["Enterprise", "New Logo"],
    owner: "James Taylor",
    openDeals: 4,
    pipelineValue: 311242,
    winProbability: 51,
    trend: TREND_B,
    lastInteraction: { date: "2026-02-22", label: "Demo" },
    activityDays: 87,
  },
  {
    id: "paypal",
    name: "Paypal",
    tags: ["Enterprise"],
    owner: "Maria Keller",
    openDeals: 5,
    pipelineValue: 124232,
    winProbability: 22,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-12", label: "Security" },
    activityDays: 84,
  },
  {
    id: "united-airlines",
    name: "United Airlines",
    tags: ["Renewal"],
    owner: "Nia Jameson",
    openDeals: 2,
    pipelineValue: 221231,
    winProbability: 77,
    trend: TREND_D,
    lastInteraction: { date: "2026-03-17", label: "Legal" },
    activityDays: 81,
  },
  {
    id: "apple",
    name: "Apple",
    tags: ["Pilot"],
    owner: "Alex Santos",
    openDeals: 6,
    pipelineValue: 530111,
    winProbability: 82,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-12", label: "Exec" },
    activityDays: 83,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    tags: ["Strategic", "Expansion"],
    owner: "Mark Darnalds",
    openDeals: 8,
    pipelineValue: 320222,
    winProbability: 86,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-15", label: "Pilot" },
    activityDays: 79,
  },
  {
    id: "airbnb",
    name: "Airbnb",
    tags: ["Upsell", "Expansion", "SMB", "Pilot"],
    owner: "Drew Nash",
    openDeals: 3,
    pipelineValue: 122230,
    winProbability: 51,
    trend: TREND_B,
    lastInteraction: { date: "2026-03-18", label: "Pricing" },
    activityDays: 78,
  },
  {
    id: "intercom",
    name: "Intercom",
    tags: ["Enterprise", "Mid-Market"],
    owner: "Lina Wong",
    openDeals: 5,
    pipelineValue: 230112,
    winProbability: 61,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-28", label: "Product" },
    activityDays: 74,
  },
  {
    id: "attio",
    name: "Attio",
    tags: ["Mid-Market", "Upsell", "Renewal", "Co-Sell"],
    owner: "Jamie Fox",
    openDeals: 2,
    pipelineValue: 420222,
    winProbability: 38,
    trend: TREND_C,
    lastInteraction: { date: "2026-06-14", label: "Pricing" },
    activityDays: 58,
  },
  {
    id: "google",
    name: "Google",
    tags: ["SMB", "Enterprise", "Expansion", "Pilot"],
    owner: "Kate Chen",
    openDeals: 8,
    pipelineValue: 112277,
    winProbability: 24,
    trend: TREND_B,
    lastInteraction: { date: "2026-06-07", label: "Renewal" },
    activityDays: 62,
  },
  {
    id: "netflix",
    name: "Netflix",
    tags: ["Mid-Market"],
    owner: "Ricky Brown",
    openDeals: 3,
    pipelineValue: 221221,
    winProbability: 72,
    trend: TREND_C,
    lastInteraction: { date: "2026-06-18", label: "Pilot" },
    activityDays: 55,
  },
  {
    id: "spotify",
    name: "Spotify",
    tags: ["Land & Expand", "Expansion", "Strategic"],
    owner: "Hannah Mills",
    openDeals: 5,
    pipelineValue: 170991,
    winProbability: 55,
    trend: TREND_C,
    lastInteraction: { date: "2026-07-01", label: "Expansion" },
    activityDays: 48,
  },
  {
    id: "shopify",
    name: "Shopify",
    tags: ["Co-Sell", "Expansion"],
    owner: "Emma Green",
    openDeals: 9,
    pipelineValue: 139007,
    winProbability: 45,
    trend: TREND_C,
    lastInteraction: { date: "2026-07-18", label: "Renewal" },
    activityDays: 40,
  },
  {
    id: "zoom",
    name: "Zoom",
    tags: ["Expansion", "Land & Expand", "Renewal"],
    owner: "Oliver Chan",
    openDeals: 8,
    pipelineValue: 289921,
    winProbability: 38,
    trend: TREND_D,
    lastInteraction: { date: "2026-08-08", label: "Partner" },
    activityDays: 27,
  },
  {
    id: "slack",
    name: "Slack",
    tags: ["Mid-Market", "Co-Sell"],
    owner: "Ava Brooks",
    openDeals: 4,
    pipelineValue: 333221,
    winProbability: 23,
    trend: TREND_C,
    lastInteraction: { date: "2026-08-12", label: "Discovery" },
    activityDays: 24,
  },
  {
    id: "stripe",
    name: "Stripe",
    tags: ["Expansion", "SMB", "Upsell", "Pilot"],
    owner: "Noah Lee",
    openDeals: 3,
    pipelineValue: 442231,
    winProbability: 44,
    trend: TREND_C,
    lastInteraction: { date: "2026-09-09", label: "Demo" },
    activityDays: 8,
  },
  {
    id: "snowflake",
    name: "Snowflake",
    tags: ["Enterprise", "Mid-Market"],
    owner: "Grace Miller",
    openDeals: 6,
    pipelineValue: 520000,
    winProbability: 24,
    trend: TREND_C,
    lastInteraction: { date: "2026-09-11", label: "Pricing" },
    activityDays: 6,
  },
  {
    id: "hubspot",
    name: "Hubspot",
    tags: ["Expansion", "Co-Sell", "Renewal", "Pilot"],
    owner: "Chloe Park",
    openDeals: 2,
    pipelineValue: 210123,
    winProbability: 52,
    trend: TREND_C,
    lastInteraction: { date: "2026-09-18", label: "QBR Call" },
    activityDays: 2,
  },
];

export const COMPANIES = COMPANY_RECORDS.map((company) => ({
  ...company,
  logo: `/assets/images/companies/logos/${company.id}.svg`,
}));



export const SORT_OPTIONS = [
  { value: 'pipelineValue', label: 'Pipeline Value' },
  { value: 'winProbability', label: 'Win Probability' },
  { value: 'openDeals', label: 'Open Deals' },
  { value: 'lastInteraction', label: 'Last Interaction' },
  { value: 'name', label: 'Company Name' },
];

export const TODAY = new Date().toISOString().slice(0, 10);
export const ALL_OWNERS = 'all';
export const ANY_STAGE = 'any';

export function filterCompanies(companies, { sortBy = 'pipelineValue', owner = ALL_OWNERS, stage = ANY_STAGE, query = '' }) {
  if (!companies || !Array.isArray(companies)) return [];

  let list = companies.filter((c) => {
    if (owner !== ALL_OWNERS && c.owner !== owner) return false;
    if (stage !== ANY_STAGE && (!c.tags || !c.tags.includes(stage))) return false;
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      const matchName = (c.name || '').toLowerCase().includes(q);
      const matchOwner = (c.owner || '').toLowerCase().includes(q);
      const matchDomain = (c.domain || '').toLowerCase().includes(q);
      const matchTag = (c.tags || []).some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchOwner && !matchDomain && !matchTag) return false;
    }
    return true;
  });

  return list.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'lastInteraction':
        return (b.lastInteraction?.date || '').localeCompare(a.lastInteraction?.date || '');
      case 'openDeals':
        return (b.openDeals || 0) - (a.openDeals || 0);
      case 'winProbability':
        return (b.winProbability || 0) - (a.winProbability || 0);
      default:
        return (b.pipelineValue || 0) - (a.pipelineValue || 0);
    }
  });
}

export function formatMoney(val) {
  if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
  if (val >= 1000) return '$' + Math.round(val / 1000) + 'k';
  return '$' + Number(val || 0).toLocaleString('en-US');
}

export function formatCurrencyFull(val) {
  return '$' + Number(val || 0).toLocaleString('en-US');
}

export const SCORE_CARDS = [
  {
    title: 'Business fit',
    description: 'Evaluates how well the company aligns with our ideal customer profile and ARR expansion targets.',
    reviewer: 'Emma Green',
    reviewerAvatar: '/assets/images/_common/avatars/avatar-2.png',
    updated: 'Updated 2h ago',
    verdict: 'High potential SN',
    stars: 4,
  },
  {
    title: 'Technical fit',
    description: 'Evaluates technical compatibility, API throughput limits, security requirements, and integration readiness.',
    reviewer: 'Ricky Brown',
    reviewerAvatar: '/assets/images/_common/avatars/avatar-3.png',
    updated: 'Updated 4h ago',
    verdict: 'High potential SN',
    stars: 4,
  },
  {
    title: 'Security & Compliance',
    description: 'SOC 2 Type II certification, GDPR adherence, cloud escrow, and Okta SAML SSO evaluation.',
    reviewer: 'Taylor Leroy',
    reviewerAvatar: '/assets/images/_common/avatars/avatar-1.png',
    updated: 'Updated 1d ago',
    verdict: 'Enterprise Ready',
    stars: 5,
  },
];

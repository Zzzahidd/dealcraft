/* ---------- store ---------- */
import { TODAY, diffD, iso, parse, uid } from './utils.js';
import { PCOLORS, TEAMS_SEED } from './constants.js';
import { seed } from '../data/seed.js';

export const STORE_KEY = 'dealcraft.v5';
export const WS_INDEX_KEY = 'dealcraft.workspaces.v1';
export const WS_PREFIX = 'dealcraft.ws.';
export const PROFILE_KEY = 'dealcraft.profile.v1';

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export function getWorkspacesIndex() {
  try {
    const raw = localStorage.getItem(WS_INDEX_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveWorkspacesIndex(index) {
  try {
    localStorage.setItem(WS_INDEX_KEY, JSON.stringify(index));
  } catch {}
}

const currentProfile = getProfile();
export const DEFAULT_PREFS = {
  theme: 'system',
  accent: 'indigo',
  side: 'comfortable',
  density: 'comfortable',
  weekStart: 1,
  dateFmt: 'MMM d',
  lang: 'English (US)',
  tz: 'UTC',
  motion: 'system',
  home: 'home',
  openTasks: 'drawer',
  name: (currentProfile?.name && currentProfile.name !== 'Tanjim Islam') ? currentProfile.name : '',
  email: (currentProfile?.email && currentProfile.email !== 'tanjim@dealcraft.app') ? currentProfile.email : '',
  title: currentProfile?.title || 'Lead',
};

export function getActiveWorkspaceId() {
  const idx = getWorkspacesIndex();
  return idx?.activeId || 'w1';
}

export const DUMMY_TASK_TITLES = new Set([
  'Welcome to Dealcraft',
  'Create your first project or deal',
  'Define problem statement', 'User research plan', 'Write PRD', 'Design exploration', 'Build MVP', 'Beta launch',
  'Sitemap & information architecture', 'Wireframes', 'Visual design', 'Build page templates', 'Content migration', 'QA & launch',
  'Campaign brief', 'Audience research', 'Creative assets', 'Channel plan', 'Launch campaign', 'Performance report',
  'Discovery workshop', 'Moodboard', 'Concept directions', 'Refinement', 'Developer handoff',
  'Technical spec', 'Set up repo & CI', 'Implement core API', 'Write tests', 'Code review', 'Deploy to staging',
  'Brain dump ideas', 'Pick top 3 priorities', 'Schedule focus time', 'Weekly review',
  'Finalize navigation', 'Design responsive navigation', 'Prepare design system tokens',
  'Review responsive layouts', 'Prepare developer handoff', 'Design mobile onboarding',
  'Write homepage copy', 'Set up analytics events', 'Accessibility audit of templates',
  'Build hero component', 'Image optimization pipeline', 'Weekly design sync notes',
  'Migrate blog to new CMS', 'Footer and legal pages', 'Fix broken anchor links on pricing',
  'Onboarding flow prototype', 'Push notification service', 'Offline mode sync',
  'App Store screenshots', 'Crash reporting setup', 'Biometric sign-in',
  'Settings screen redesign', 'Triage beta tester feedback', 'Crash on Android 12 when rotating',
  'Landing page copy', 'Paid social creatives', 'Email nurture sequence',
  'Influencer outreach list', 'Launch webinar deck', 'Budget approval',
  'Launch readiness checklist', 'Go / no-go meeting', 'Post-launch metrics review',
  'Production smoke tests', 'Update status page', 'Press release draft',
]);

export const DUMMY_COMPANY_IDS = new Set([
  'lvmh', 'disney', 'paypal', 'attio', 'salesforce', 'gumroad', 'resend',
  'linear', 'brex', 'ramp', 'openai', 'figma', 'notion', 'apple', 'stripe',
  'microsoft', 'airbnb', 'google', 'amazon', 'netflix'
]);

export const DUMMY_PROJECT_NAMES = new Set([
  'Website Redesign', 'Mobile App', 'Marketing Campaign', 'Product Launch'
]);

export function loadWorkspaceRecord(wsId) {
  try {
    const raw = localStorage.getItem(WS_PREFIX + wsId);
    if (raw) {
      const j = JSON.parse(raw);
      if (j && j.data && j.data.tasks) return j;
    }
  } catch {}
  return null;
}

export function load() {
  try {
    const prof = getProfile();
    let idx = getWorkspacesIndex();

    // 1. If index exists, load active workspace
    if (idx && Array.isArray(idx.list)) {
      const cleanList = idx.list.filter(w => w && w.name !== 'Dealcraft' && w.name !== 'Acme Labs' && w.id !== 'w1');
      if (cleanList.length !== idx.list.length) {
        idx.list = cleanList;
        if (!cleanList.some(w => w.id === idx.activeId)) {
          idx.activeId = cleanList[0]?.id || '';
        }
        saveWorkspacesIndex(idx);
        try { localStorage.removeItem(WS_PREFIX + 'w1'); } catch {}
      }
    }

    if (prof?.onboarded && idx && Array.isArray(idx.list) && idx.list.length > 0) {
      const activeId = idx.activeId || idx.list[0].id;
      const wsRec = loadWorkspaceRecord(activeId);
      if (wsRec) {
        if (wsRec.prefs?.name === 'Tanjim Islam') wsRec.prefs.name = prof?.name || '';
        if (wsRec.data?.members?.[0]?.name === 'Tanjim Islam') {
          wsRec.data.members[0].name = prof?.name || 'Workspace Owner';
          wsRec.data.members[0].email = prof?.email || 'owner@dealcraft.local';
        }
        if (Array.isArray(wsRec.data?.workspaces)) {
          wsRec.data.workspaces = wsRec.data.workspaces.filter(w => w && w.name !== 'Dealcraft' && w.name !== 'Acme Labs' && w.id !== 'w1');
        }
        if (wsRec.data && Array.isArray(idx.list)) {
          wsRec.data.workspaces = idx.list;
        }
        if (Array.isArray(wsRec.data?.tasks)) {
          wsRec.data.tasks = wsRec.data.tasks.filter(t => !DUMMY_TASK_TITLES.has(t.title));
        }
        if (Array.isArray(wsRec.data?.companies)) {
          wsRec.data.companies = wsRec.data.companies.filter(c => !DUMMY_COMPANY_IDS.has(c.id));
        }
        if (Array.isArray(wsRec.data?.deals)) {
          wsRec.data.deals = wsRec.data.deals.filter(d => !DUMMY_COMPANY_IDS.has(d.companyId));
        }
        if (Array.isArray(wsRec.data?.projects)) {
          wsRec.data.projects = wsRec.data.projects.filter(p => !DUMMY_PROJECT_NAMES.has(p.name));
          if (wsRec.data.projects.length === 0) {
            wsRec.data.projects = [{
              id: 'p1',
              key: 'PRJ',
              name: 'My Project',
              icon: 'folder',
              color: 'indigo',
              status: 'active',
              team: 'product',
              lead: 'm1',
              due: null,
              start: null,
              fav: true,
              members: ['m1'],
              desc: 'Your first project in Dealcraft.',
              milestones: [],
              last: 0,
            }];
            wsRec.data.projOrder = ['p1'];
          }
        }
        localStorage.setItem(WS_PREFIX + activeId, JSON.stringify(wsRec));
        if (prof?.name && wsRec.prefs) wsRec.prefs.name = prof.name;
        if (prof?.email && wsRec.prefs) wsRec.prefs.email = prof.email;
        return wsRec;
      }
    }

    // 2. Check legacy storage key (dealcraft.v5) to seamlessly migrate
    const legacyRaw = localStorage.getItem(STORE_KEY);
    if (legacyRaw) {
      const leg = JSON.parse(legacyRaw);
      if (leg && leg.data && leg.data.tasks) {
        const wsId = leg.data.ws?.id || 'w1';
        if (leg.prefs?.name === 'Tanjim Islam') leg.prefs.name = prof?.name || '';
        if (leg.data?.members?.[0]?.name === 'Tanjim Islam') {
          leg.data.members[0].name = prof?.name || 'Workspace Owner';
          leg.data.members[0].email = prof?.email || 'owner@dealcraft.local';
        }
        if (Array.isArray(leg.data?.workspaces)) {
          leg.data.workspaces = leg.data.workspaces.filter(w => w.name !== 'Acme Labs');
        }
        if (Array.isArray(leg.data?.tasks)) {
          leg.data.tasks = leg.data.tasks.filter(t => !DUMMY_TASK_TITLES.has(t.title));
        }
        if (Array.isArray(leg.data?.companies)) {
          leg.data.companies = leg.data.companies.filter(c => !DUMMY_COMPANY_IDS.has(c.id));
        }
        if (Array.isArray(leg.data?.deals)) {
          leg.data.deals = leg.data.deals.filter(d => !DUMMY_COMPANY_IDS.has(d.companyId));
        }
        if (Array.isArray(leg.data?.projects)) {
          leg.data.projects = leg.data.projects.filter(p => !DUMMY_PROJECT_NAMES.has(p.name));
          if (leg.data.projects.length === 0) {
            leg.data.projects = [{
              id: 'p1',
              key: 'PRJ',
              name: 'My Project',
              icon: 'folder',
              color: 'indigo',
              status: 'active',
              team: 'product',
              lead: 'm1',
              due: null,
              start: null,
              fav: true,
              members: ['m1'],
              desc: 'Your first project in Dealcraft.',
              milestones: [],
              last: 0,
            }];
            leg.data.projOrder = ['p1'];
          }
        }
        const wsList = (leg.data.workspaces || []).filter(w => w && w.name !== 'Dealcraft' && w.name !== 'Acme Labs' && w.id !== 'w1');
        idx = { activeId: wsId, list: wsList };
        saveWorkspacesIndex(idx);
        localStorage.setItem(WS_PREFIX + wsId, JSON.stringify(leg));
        return leg;
      }
    }

    // 3. Fresh initialize with local profile
    const ownerName = prof?.name || DEFAULT_PREFS.name || 'Workspace Owner';
    const ownerEmail = prof?.email || DEFAULT_PREFS.email || 'owner@dealcraft.local';
    const ownerTitle = prof?.title || DEFAULT_PREFS.title;
    const initialSeed = seed({ ownerName, ownerEmail, ownerTitle, wsId: 'init', wsName: 'My Workspace' });
    const freshRec = {
      data: initialSeed,
      prefs: Object.assign({}, DEFAULT_PREFS, { name: ownerName, email: ownerEmail, title: ownerTitle }),
      views: {},
      collapsed: false,
    };
    idx = { activeId: '', list: [] };
    saveWorkspacesIndex(idx);
    return freshRec;
  } catch {
    /* storage blocked or corrupt: start from seed data */
  }
  return null;
}
export const saved = load();
export const S = {
  data: saved?.data || seed({ ownerName: DEFAULT_PREFS.name, ownerEmail: DEFAULT_PREFS.email }),
  prefs: Object.assign({}, DEFAULT_PREFS, saved?.prefs || {}),
  views: saved?.views || {},
  ui: {
    fx: {},
    auth: null,
    authStep: 'login',
    onb: 0,
    onbData: { use: 'product', team: 'kanban', size: '2-10', ws: '', proj: 'Website Launch', tmpl: 'web', invites: '' },
    route: 'home',
    params: {},
    history: [],
    collapsed: !!saved?.collapsed,
    mnav: false,
    expanded: { p1: true },
    drawer: null,
    drawerFull: false,
    drawerTab: 'comments',
    noteDrawer: null,
    noteDrawerFull: false,
    noteDrawerEdit: false,
    modals: [],
    pop: null,
    palette: null,
    loading: false,
    offline: false,
    sel: new Set(),
    composer: null,
    editCell: null,
    openTasks: {},
    collapsedGroups: {},
    calDate: iso(TODAY),
    calMode: 'month',
    tlZoom: 'week',
    tlGroup: 'status',
    fileView: 'grid',
    projView: 'grid',
    homeTab: 'upcoming',
    inboxCat: 'all',
    inboxUnread: false,
    inboxSel: null,
    notifFilter: 'all',
    settings: 'appearance',
    searchQ: '',
    searchCat: 'all',
    myView: 'list',
    membersTab: 'members',
    collapsedCols: {},
    errors: {},
    drafts: {},
    // CRM state
    companyDrawer: null,
    companyTab: 'overview',
    newCompanyOpen: false,
    companySort: 'pipelineValue',
    companyOwner: 'all',
    companyStage: 'any',
    companySearch: '',
    selectedCompanies: new Set(),
    // Raycast spotlight state
    raycastOpen: false,
    raycastQ: '',
    raycastIdx: 0,
    raycastResults: [],
  },
};
export let _saveT;
export function save(immediate = false) {
  const currentWsId = S.data?.ws?.id || getActiveWorkspaceId();
  const payload = JSON.stringify({ data: S.data, prefs: S.prefs, views: S.views, collapsed: S.ui.collapsed });

  const persist = () => {
    try {
      // 1. Save workspace-specific dataset
      localStorage.setItem(WS_PREFIX + currentWsId, payload);
      // 2. Also keep legacy key synced for fallback
      localStorage.setItem(STORE_KEY, payload);

      // 3. Keep workspace index updated
      let idx = getWorkspacesIndex();
      if (!idx) idx = { activeId: currentWsId, list: [] };
      idx.activeId = currentWsId;
      if (Array.isArray(S.data.workspaces)) {
        idx.list = S.data.workspaces;
      }
      saveWorkspacesIndex(idx);

      // 4. Desktop sync via Tauri or local service
      if (window.__TAURI__?.core?.invoke) {
        window.__TAURI__.core.invoke('save_workspace_data', { json: payload }).catch(() => {});
      } else if (typeof fetch === 'function') {
        fetch('http://127.0.0.1:3741/api/workspace', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: S.data, prefs: S.prefs, workspaceId: currentWsId }),
        }).catch(() => {});
      }
    } catch {
      /* storage full or blocked: keep working in memory */
    }
  };

  if (immediate) {
    persist();
    return;
  }
  clearTimeout(_saveT);
  _saveT = setTimeout(persist, 150);
}

export function switchWorkspaceTo(targetWsId) {
  if (!targetWsId) return false;
  // 1. Save current state first
  save(true);

  // 2. Load target record
  let rec = loadWorkspaceRecord(targetWsId);
  let idx = getWorkspacesIndex();

  if (!rec) {
    const wsMeta = idx?.list?.find(w => w.id === targetWsId) || { id: targetWsId, name: 'Workspace', c: '#5A67D8' };
    const prof = getProfile();
    const myName = prof?.name || S.prefs.name || DEFAULT_PREFS.name;
    const myEmail = prof?.email || S.prefs.email || DEFAULT_PREFS.email;
    const myTitle = prof?.title || S.prefs.title || DEFAULT_PREFS.title;
    const seeded = seed({ ownerName: myName, ownerEmail: myEmail, ownerTitle: myTitle, wsId: targetWsId, wsName: wsMeta.name, demo: false });
    rec = {
      data: seeded,
      prefs: Object.assign({}, S.prefs, { name: myName, email: myEmail, title: myTitle }),
      views: {},
      collapsed: false,
    };
    try {
      localStorage.setItem(WS_PREFIX + targetWsId, JSON.stringify(rec));
    } catch {}
  }

  // 3. Switch in memory
  if (idx) {
    idx.activeId = targetWsId;
    saveWorkspacesIndex(idx);
  }

  // Single device account: ALWAYS ensure the user profile matches getProfile()
  const currentProf = getProfile();
  if (currentProf?.name) {
    if (!rec.prefs) rec.prefs = {};
    rec.prefs.name = currentProf.name;
    if (currentProf.email) rec.prefs.email = currentProf.email;
    if (currentProf.title) rec.prefs.title = currentProf.title;
    if (rec.data?.members?.[0]) {
      rec.data.members[0].name = currentProf.name;
      if (currentProf.email) rec.data.members[0].email = currentProf.email;
      if (currentProf.title) rec.data.members[0].title = currentProf.title;
    }
  }

  S.data = rec.data;
  if (rec.prefs) S.prefs = Object.assign({}, DEFAULT_PREFS, rec.prefs);
  if (rec.views) S.views = rec.views;

  // Make sure workspaces list in D() contains all known workspaces
  if (idx?.list && Array.isArray(idx.list)) {
    idx.list = idx.list.filter(w => w && w.name !== 'Dealcraft' && w.name !== 'Acme Labs' && w.id !== 'w1');
    S.data.workspaces = idx.list;
  }
  if (!S.data.ws) {
    const meta = idx?.list?.find(w => w.id === targetWsId);
    S.data.ws = { id: targetWsId, name: meta?.name || 'Workspace', url: targetWsId, c: meta?.c || '#5A67D8' };
  }

  save(true);
  return true;
}

export function exportCurrentWorkspace() {
  const exportPayload = {
    dealcraft_version: '1.0.0',
    exported_at: Date.now(),
    workspace: S.data.ws,
    data: S.data,
    views: S.views,
  };
  return JSON.stringify(exportPayload, null, 2);
}

export function importWorkspaceData(rawJson) {
  try {
    const parsed = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
    const wsData = parsed.data || parsed;
    if (!wsData || !wsData.tasks) return { success: false, error: 'Invalid Dealcraft workspace backup' };

    const newId = uid('w');
    const wsName = parsed.workspace?.name || wsData.ws?.name || 'Imported Workspace';
    const wsColor = parsed.workspace?.c || wsData.ws?.c || '#23918A';

    wsData.ws = {
      id: newId,
      name: wsName,
      url: wsName.toLowerCase().replace(/[^a-z0-9]+/g, ''),
      c: wsColor,
      plan: 'Imported',
    };

    let idx = getWorkspacesIndex() || { activeId: 'w1', list: [] };
    const newMeta = { id: newId, name: wsName, c: wsColor, plan: 'Imported' };
    idx.list.push(newMeta);
    idx.activeId = newId;
    saveWorkspacesIndex(idx);

    wsData.workspaces = idx.list;
    const rec = {
      data: wsData,
      prefs: Object.assign({}, S.prefs),
      views: parsed.views || {},
      collapsed: false,
    };

    localStorage.setItem(WS_PREFIX + newId, JSON.stringify(rec));
    switchWorkspaceTo(newId);
    return { success: true, workspace: newMeta };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to parse workspace backup' };
  }
}

/* ---------- lookups ---------- */
export const D = () => S.data;
export const me = () => {
  const m = D().members?.find(x => x.id === D().me);
  if (m) {
    if (m.name === 'Tanjim Islam') {
      const prof = getProfile();
      m.name = prof?.name || S.prefs.name || 'Member';
      m.email = prof?.email || S.prefs.email || 'member@dealcraft.local';
    }
    return m;
  }
  const prof = getProfile();
  return { id: 'm1', name: prof?.name || S.prefs.name || 'Member', email: prof?.email || S.prefs.email || 'member@dealcraft.local', role: 'Owner' };
};
export const mem = id => D().members?.find(m => m.id === id) || (id === D().me ? me() : null);
export const proj = id => D().projects.find(p => p.id === id);
export const task = id => D().tasks.find(t => t.id === id);
export const company = id => D().companies?.find(c => c.id === id);
export const allCompanies = () => D().companies || [];
export const pColor = p => PCOLORS[p?.color] || PCOLORS.slate;
export const visibleProjects = () =>
  D()
    .projOrder.map(proj)
    .filter(Boolean)
    .filter(p => !p.archived);
export const canSee = p => !!p && (!p.private || (Array.isArray(p.members) && p.members.includes(D().me)));
export const tasksOf = pid => D().tasks.filter(t => t.project === pid && !t.archived);
export const allTasks = () => D().tasks.filter(t => !t.archived && canSee(proj(t.project)));
export const isOver = t => t.due && t.status !== 'done' && diffD(parse(t.due), TODAY) < 0;
export const commentsOf = tid => D().comments.filter(c => c.task === tid);
export function progressOf(pid) {
  const ts = tasksOf(pid);
  if (!ts.length) return 0;
  return Math.round((ts.filter(t => t.status === 'done').length / ts.length) * 100);
}
export function taskProg(t) {
  if (t.status === 'done') return 100;
  if (t.subtasks.length) return Math.round((t.subtasks.filter(s => s.done).length / t.subtasks.length) * 100);
  return { backlog: 0, todo: 5, progress: 45, review: 80 }[t.status] || 0;
}

/* ---------- activity + notification helpers ---------- */
export function logAct(verb, t, extra = '') {
  D().activity.unshift({ id: uid('a'), by: D().me, verb, task: t?.id || null, project: t?.project || null, at: Date.now(), extra });
  if (t) t.updated = Date.now();
}

/* ---------- teams (workspace data, seeded on first use) ---------- */
export const NO_TEAM = { id: '', name: 'No team', icon: 'users', c: '#8A867E', desc: '' };
export function teamsList() {
  const d = D();
  if (!d.teams) d.teams = TEAMS_SEED.map(t => ({ ...t }));
  return d.teams;
}
export function team(id) {
  return teamsList().find(t => t.id === id) || null;
}
export const TM = new Proxy({}, { get: (_, k) => team(k) || NO_TEAM });

/* ---------------- AUTH ---------------- */
import { esc } from '../core/utils.js';
import { LOGO, ic } from '../core/icons.js';
import { D, S, getProfile } from '../core/store.js';
import { effectiveDark } from '../core/theme.js';
import { TEMPLATES } from '../overlays/modals.js';
import { strengthMeter } from './settings.js';

export function authShell(inner, topRight = '') {
  return `<div class="auth"><div class="auth-top"><span class="brand">${LOGO(22)}</span><div class="row">${topRight}<button class="ibtn" data-a="toggleDark" data-tip="Toggle theme" aria-label="Toggle theme">${ic(effectiveDark() ? 'sun' : 'moon', 16)}</button></div></div>
    <div class="auth-c">${inner}</div>
    <div class="auth-foot" style="padding:18px;font-size:12px" ><span class="faint">© 2026 Dealcraft · Terms · Privacy</span></div></div>`;
}
export const socialBtns = () => `<div class="social">
  <button class="btn btn-secondary btn-lg" data-a="socialAuth" data-v="Google"><svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Continue with Google</button>
  <button class="btn btn-secondary btn-lg" data-a="socialAuth" data-v="Microsoft"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect width="6.4" height="6.4" fill="#F25022"/><rect x="7.6" width="6.4" height="6.4" fill="#7FBA00"/><rect y="7.6" width="6.4" height="6.4" fill="#00A4EF"/><rect x="7.6" y="7.6" width="6.4" height="6.4" fill="#FFB900"/></svg>Continue with Microsoft</button>
  <button class="btn btn-secondary btn-lg" data-a="socialAuth" data-v="Apple">${ic('apple', 15)}Continue with Apple</button></div>`;
export const ferr = k => (S.ui.errors[k] ? `<span class="err" id="${k}-err">${ic('circle-alert', 12)}${S.ui.errors[k]}</span>` : '');
export const icls = k => (S.ui.errors[k] ? 'is-error' : '');
export function renderAuth() {
  const s = S.ui.auth;
  if (s === 'onboarding') return renderOnboarding();
  // Dealcraft is a 100% offline desktop app: no cloud login or auth screens exist
  S.ui.auth = null;
  return '';
}

/* ---------------- ONBOARDING ---------------- */
export function renderOnboarding() {
  const st = S.ui.onb;
  const o = S.ui.onbData;
  const N = 6;
  const prof = getProfile();
  const isAlreadyOnboarded = !!(prof && prof.onboarded && prof.name && prof.name.trim() && prof.name !== 'Tanjim Islam');
  const nav = (next = 'Continue', skip = false) =>
    `<div class="row" style="margin-top:6px">${st > 0 && st < 5 ? `<button class="btn btn-ghost" data-a="onbBack">${ic('arrow-left', 14)}Back</button>` : ''}<span class="sp"></span>${skip ? `<button class="btn btn-ghost" data-a="onbNext" data-skip="1">Skip for now</button>` : ''}<button class="btn btn-primary btn-lg" data-a="onbNext" id="onb-next">${next}${ic('arrow-right', 15)}</button></div>`;
  const opt = (k, v, icon, n, s) =>
    `<button class="opt ${o[k] === v ? 'on' : ''}" role="radio" aria-checked="${o[k] === v}" data-a="onbSet" data-k="${k}" data-v="${v}">${ic(icon, 18)}<b>${n}</b>${s ? `<span>${s}</span>` : ''}</button>`;
  let body;
  if (st === 0)
    body = `<h1>What are you working on?</h1><p class="sub">We'll tailor templates and views to fit. You can change this later.</p><div class="opts" role="radiogroup">${[
      ['product', 'target', 'Product', 'Roadmaps & launches'],
      ['design', 'palette', 'Design', 'Reviews & handoff'],
      ['marketing', 'megaphone', 'Marketing', 'Campaigns & content'],
      ['engineering', 'code', 'Engineering', 'Sprints & releases'],
      ['personal', 'user', 'Personal', 'Goals & side projects'],
      ['other', 'sparkles', 'Other', 'Something else'],
    ]
      .map(x => opt('use', ...x))
      .join('')}</div>${nav()}`;
  if (st === 1) {
    const e = S.ui.errors.ws;
    body = `<h1>Create your workspace</h1><p class="sub">${isAlreadyOnboarded ? `Creating a new workspace under your account: <b style="color:var(--text-1)">${esc(prof.name)}</b>` : "A workspace is where your team's projects live."}</p>
    ${isAlreadyOnboarded ? '' : `<div class="field"><label class="label" for="o-name">Your full name</label><input class="input input-lg" id="o-name" data-in="onbName" value="${esc(o.name !== undefined ? o.name : S.prefs.name || '')}" placeholder="Your name (e.g. Alex Miller)"></div>`}
    <div class="field"><label class="label" for="o-ws">Workspace name</label><input class="input input-lg ${e ? 'is-error' : ''}" id="o-ws" data-in="onbWs" value="${esc(o.ws)}" placeholder="e.g. Dealcraft Studio" autofocus>${e ? `<span class="err" id="ws-err">${ic('circle-alert', 12)}${e}</span>` : ''}</div>
    <div class="field"><label class="label" for="o-url">Workspace URL</label><div class="row" style="gap:0"><span class="input input-lg" style="width:auto;background:var(--surface-2);border-right:0;border-radius:6px 0 0 6px;display:flex;align-items:center;color:var(--text-2)">dealcraft.app/</span><input class="input input-lg" id="o-url" value="${esc(o.url || '')}" data-in="onbUrl" style="border-radius:0 6px 6px 0" placeholder="dealcraft"></div><span id="o-url-hint" class="hint" style="color:var(--green);display:${o.url ? 'flex' : 'none'};gap:4px;align-items:center">${o.url ? ic('check', 12) + 'dealcraft.app/' + esc(o.url) + ' is available' : ''}</span></div>${nav()}`;
  }
  if (st === 2)
    body = `<h1>How does your team work?</h1><p class="sub">We'll set your default project view.</p><div class="opts" role="radiogroup" style="grid-template-columns:repeat(2,minmax(0,1fr))">${[
      ['kanban', 'square-kanban', 'Boards', 'Move cards through stages'],
      ['list', 'list-checks', 'Lists', 'Checklists and priorities'],
      ['timeline', 'chart-gantt', 'Timelines', 'Plan with dates & dependencies'],
      ['table', 'table-2', 'Tables', 'Spreadsheet-style tracking'],
    ]
      .map(x => opt('team', ...x))
      .join('')}</div>
    <div class="field"><span class="label">Team size</span><div class="seg" style="width:fit-content">${['Just me', '2-10', '11-50', '51-200', '200+'].map(s => `<button class="${o.size === s ? 'on' : ''}" data-a="onbSet" data-k="size" data-v="${s}">${s}</button>`).join('')}</div></div>${nav()}`;
  if (st === 3)
    body = `<h1>Create your first project</h1><p class="sub">Choose a focus area for your first project.</p><div class="field"><label class="label" for="o-proj">Project name</label><input class="input input-lg" id="o-proj" data-in="onbProj" value="${esc(o.proj)}" autofocus></div><div class="tmpls" role="radiogroup">${TEMPLATES.filter(
      t => t.id !== 'blank',
    )
      .map(t => opt('tmpl', t.id, t.icon, t.name, t.desc))
      .join('')}</div>${nav()}`;
  if (st === 4)
    body = `<h1>Invite your team</h1><p class="sub">Dealcraft works best with your teammates. They'll get an email invite.</p><div class="col" style="gap:8px">${[0, 1, 2].map(i => `<input class="input input-lg" id="o-inv-${i}" placeholder="teammate@company.com" type="email" value="${esc((o.invites || '').split(',')[i] || '')}" data-in="onbInv" data-i="${i}" aria-label="Teammate email ${i + 1}">`).join('')}</div><button class="btn btn-ghost btn-sm" style="align-self:flex-start" data-a="copyInviteLink">${ic('link', 13)}Copy invite link instead</button>${nav('Send invites', true)}`;
  if (st === 5) {
    const n = (o.invites || '').split(',').filter(x => x.includes('@')).length;
    body = `<div style="display:flex;justify-content:center"><span class="ftype ready-badge" style="--c:var(--green);width:48px;height:48px;border-radius:12px">${ic('circle-check', 22)}</span></div><h1>Your workspace is ready</h1><p class="sub">Here's what we set up for you.</p>
    <div class="panel">${[
      ['building-2', `Workspace “${esc(o.ws || 'My Workspace')}”`, 'dealcraft.app/' + esc(o.url || 'workspace')],
      [
        TEMPLATES.find(t => t.id === o.tmpl)?.icon || 'folder',
        `Project “${esc(o.proj)}”`,
        `${{ kanban: 'Board', list: 'List', timeline: 'Timeline', table: 'Table' }[o.team]} view`,
      ],
      [
        'user-plus',
        n ? `${n} invite${n > 1 ? 's' : ''} sent` : 'No invites yet',
        n ? "They'll appear in Members once they join" : 'Invite people any time from the sidebar',
      ],
    ]
      .map(
        ([i, t, s]) =>
          `<div class="row ready-row" style="padding:12px 14px;border-top:1px solid var(--divider);gap:12px"><span class="ftype" style="--c:var(--accent)">${ic(i, 14)}</span><div class="grow"><div style="font-weight:500">${t}</div><div class="faint" style="font-size:12px">${s}</div></div><span class="ok" style="color:var(--green);display:inline-flex">${ic('check', 15)}</span></div>`,
      )
      .join('')}</div>
    <button class="btn btn-primary btn-lg btn-block" data-a="onbFinish">Open workspace${ic('arrow-right', 15)}</button>`;
  }
  const exitBtn = isAlreadyOnboarded
    ? `<button class="btn btn-ghost btn-sm" data-a="onbExit">${ic('x', 14)}Back to workspace</button>`
    : `<button class="btn btn-ghost btn-sm" data-a="onbExit">Exit setup</button>`;
  return authShell(
    `<div class="auth-card onb${S.ui.fx.step ? ' fx-step' : ''}" style="max-width:${st === 5 ? 440 : 560}px">
    <div class="steps" aria-label="Step ${st + 1} of ${N}">${Array.from({ length: N }, (_, i) => `<i class="${i <= st ? 'on' : ''} ${i === st ? 'cur' : ''}"></i>`).join('')}</div>
    <div class="faint" style="text-align:center;font-size:12px">Step ${st + 1} of ${N}</div>
    ${body}</div>`,
    exitBtn,
  );
}

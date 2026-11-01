/* ---------- Company Detail Drawer (Sales CRM) ---------- */
import { esc } from '../core/utils.js';
import { ic } from '../core/icons.js';
import { D, S, save } from '../core/store.js';
import {
  OWNERS,
  SCORE_CARDS,
  STAGES,
  TAG_TONES,
  formatCurrencyFull,
  formatMoney,
  ownerByName,
} from '../data/companies.js';

export function renderCompanyDrawer() {
  const u = S.ui;
  const companyId = u.companyDrawer;
  if (!companyId) return '';

  const d = D();
  const c = d.companies?.find((item) => item.id === companyId);
  if (!c) return '';

  const activeTab = u.companyTab || 'overview';
  const owner = ownerByName(c.owner);

  return `
  <div class="drawer-scrim" data-a="closeCompanyDrawer"></div>
  <aside class="drawer company-drawer" style="width: 540px; max-width: 90vw; background: var(--surface); border-left: 1px solid var(--border); box-shadow: var(--shadow-pop); display: flex; flex-direction: column; height: 100vh; position: fixed; right: 0; top: 0; z-index: 999; animation: slideInDrawer 200ms cubic-bezier(0.16, 1, 0.3, 1);">
    <!-- Drawer Header -->
    <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--surface);">
      <div class="row align-center gap-2">
        <button class="ibtn ibtn-sm" data-a="closeCompanyDrawer" aria-label="Close drawer">
          ${ic('x', 16)}
        </button>
        <span class="faint" style="font-size: 13px;">Account Details</span>
      </div>
      <div class="row align-center gap-2">
        <button class="btn btn-secondary btn-xs" data-a="newTaskForCompany" data-id="${c.id}">
          ${ic('plus', 13)}
          <span>Add Task</span>
        </button>
        <button class="ibtn ibtn-sm" data-a="deleteCompany" data-id="${c.id}" data-tip="Delete account" aria-label="Delete">
          ${ic('trash-2', 15)}
        </button>
      </div>
    </div>

    <!-- Company Identity Banner -->
    <div style="padding: 20px; border-bottom: 1px solid var(--border); background: var(--surface-2);">
      <div class="row align-center gap-3">
        <div style="width: 48px; height: 48px; border-radius: var(--r); background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: var(--shadow-sm);">
          ${
            c.logo
              ? `<img src="${c.logo}" alt="${esc(c.name)}" style="width: 32px; height: 32px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" /><span style="display:none; font-weight:700; font-size:18px;">${c.name.slice(0, 1)}</span>`
              : `<span style="font-weight:700; font-size:18px;">${c.name.slice(0, 1)}</span>`
          }
        </div>
        <div class="grow">
          <div class="row align-center gap-2">
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text); margin: 0;">${esc(c.name)}</h2>
            <a href="https://${esc(c.domain || c.id + '.com')}" target="_blank" rel="noreferrer" class="ibtn ibtn-xs" style="color: var(--text-3);" aria-label="Visit website">
              ${ic('external-link', 13)}
            </a>
          </div>
          <div class="row align-center gap-2" style="margin-top: 4px;">
            <span class="faint" style="font-size: 12px;">${esc(c.industry || 'Enterprise Software')}</span>
            <span class="faint">/</span>
            <span class="faint" style="font-size: 12px;">${esc(c.country || 'Global')}</span>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Strip -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 16px;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 8px 12px;">
          <div class="faint" style="font-size: 11px; text-transform: uppercase;">Pipeline</div>
          <div style="font-size: 15px; font-weight: 700; font-family: var(--mono); margin-top: 2px;">${formatCurrencyFull(c.pipelineValue)}</div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 8px 12px;">
          <div class="faint" style="font-size: 11px; text-transform: uppercase;">Open Deals</div>
          <div style="font-size: 15px; font-weight: 700; margin-top: 2px;">${c.openDeals || 0}</div>
        </div>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 8px 12px;">
          <div class="faint" style="font-size: 11px; text-transform: uppercase;">Win Prob</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--green); margin-top: 2px;">${c.winProbability}%</div>
        </div>
      </div>
    </div>

    <!-- Drawer Navigation Tabs -->
    <div style="display: flex; border-bottom: 1px solid var(--border); padding: 0 20px; background: var(--surface);">
      <button class="tab-btn ${activeTab === 'overview' ? 'on' : ''}" data-a="setCompanyTab" data-tab="overview" style="padding: 10px 14px; font-size: 13px; font-weight: 600; border: none; background: transparent; cursor: pointer; color: ${activeTab === 'overview' ? 'var(--accent)' : 'var(--text-3)'}; border-bottom: 2px solid ${activeTab === 'overview' ? 'var(--accent)' : 'transparent'};">
        Overview
      </button>
      <button class="tab-btn ${activeTab === 'deals' ? 'on' : ''}" data-a="setCompanyTab" data-tab="deals" style="padding: 10px 14px; font-size: 13px; font-weight: 600; border: none; background: transparent; cursor: pointer; color: ${activeTab === 'deals' ? 'var(--accent)' : 'var(--text-3)'}; border-bottom: 2px solid ${activeTab === 'deals' ? 'var(--accent)' : 'transparent'};">
        Pipeline & Deals
      </button>
      <button class="tab-btn ${activeTab === 'contacts' ? 'on' : ''}" data-a="setCompanyTab" data-tab="contacts" style="padding: 10px 14px; font-size: 13px; font-weight: 600; border: none; background: transparent; cursor: pointer; color: ${activeTab === 'contacts' ? 'var(--accent)' : 'var(--text-3)'}; border-bottom: 2px solid ${activeTab === 'contacts' ? 'var(--accent)' : 'transparent'};">
        Stakeholders
      </button>
      <button class="tab-btn ${activeTab === 'notes' ? 'on' : ''}" data-a="setCompanyTab" data-tab="notes" style="padding: 10px 14px; font-size: 13px; font-weight: 600; border: none; background: transparent; cursor: pointer; color: ${activeTab === 'notes' ? 'var(--accent)' : 'var(--text-3)'}; border-bottom: 2px solid ${activeTab === 'notes' ? 'var(--accent)' : 'transparent'};">
        Notes
      </button>
    </div>

    <!-- Drawer Tab Content -->
    <div style="flex-grow: 1; overflow-y: auto; padding: 20px;">
      ${
        activeTab === 'overview'
          ? `
        <!-- Account Properties Form -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label class="faint" style="font-size: 11.5px; text-transform: uppercase; font-weight: 600;">Account Executive</label>
            <div class="row align-center gap-2" style="margin-top: 6px;">
              <select class="select grow" data-in="updateCompanyOwner" data-id="${c.id}">
                ${OWNERS.map((o) => `<option value="${esc(o.name)}" ${c.owner === o.name ? 'selected' : ''}>${esc(o.name)} (${esc(o.role)})</option>`).join('')}
              </select>
            </div>
          </div>

          <div>
            <label class="faint" style="font-size: 11.5px; text-transform: uppercase; font-weight: 600;">Sales Stages</label>
            <div class="row align-center wrap gap-1" style="margin-top: 6px;">
              ${(c.tags || [])
                .map((tag) => {
                  const tone = TAG_TONES[tag] || 'neutral';
                  return `<span class="badge badge-${tone}" style="font-size: 12px; padding: 3px 8px;">${esc(tag)}</span>`;
                })
                .join('')}
            </div>
          </div>

          <div>
            <label class="faint" style="font-size: 11.5px; text-transform: uppercase; font-weight: 600;">Deal Health & Scorecards</label>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
              ${SCORE_CARDS.map(
                (card) => `
                <div style="padding: 10px 12px; border: 1px solid var(--border); border-radius: var(--r-sm); background: var(--surface-2);">
                  <div class="row align-center justify-between">
                    <span style="font-weight: 600; font-size: 12.5px;">${esc(card.title)}</span>
                    <span class="badge" style="background: var(--surface); font-size: 11px;">Score: ${card.stars}/5</span>
                  </div>
                  <div class="faint" style="font-size: 11.5px; margin-top: 4px;">${esc(card.description)}</div>
                  <div class="row align-center justify-between" style="font-size: 11px; margin-top: 6px; color: var(--text-3);">
                    <span>${esc(card.verdict)}</span>
                    <span>${esc(card.updated)}</span>
                  </div>
                </div>
              `
              ).join('')}
            </div>
          </div>

          <div style="margin-top: 8px; padding-top: 14px; border-top: 1px solid var(--border);">
            <button class="btn btn-ghost btn-sm" data-a="deleteCompany" data-id="${c.id}" style="color:var(--red); width:100%; justify-content:center;">
              ${ic('trash-2', 13)}
              <span>Delete Company Account</span>
            </button>
          </div>
        </div>
      `
          : activeTab === 'deals'
            ? `
        <div>
          <div class="faint" style="font-size: 11.5px; text-transform: uppercase; font-weight: 600; margin-bottom: 12px;">Active Pipeline Deals</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--r-sm); background: var(--surface-2);">
              <div class="row align-center justify-between">
                <span style="font-weight: 600; font-size: 13px;">Q4 Enterprise Expansion</span>
                <span style="font-weight: 700; font-family: var(--mono);">${formatCurrencyFull(Math.round(c.pipelineValue * 0.65))}</span>
              </div>
              <div class="row align-center gap-2" style="margin-top: 6px;">
                <span class="badge badge-purple" style="font-size: 11px;">Expansion</span>
                <span class="faint" style="font-size: 11.5px;">Close date: Nov 30, 2026</span>
              </div>
            </div>
            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--r-sm); background: var(--surface-2);">
              <div class="row align-center justify-between">
                <span style="font-weight: 600; font-size: 13px;">Platform Add-on Seats</span>
                <span style="font-weight: 700; font-family: var(--mono);">${formatCurrencyFull(Math.round(c.pipelineValue * 0.35))}</span>
              </div>
              <div class="row align-center gap-2" style="margin-top: 6px;">
                <span class="badge badge-green" style="font-size: 11px;">Upsell</span>
                <span class="faint" style="font-size: 11.5px;">Close date: Dec 15, 2026</span>
              </div>
            </div>
          </div>
        </div>
      `
            : activeTab === 'contacts'
              ? `
        <div>
          <div class="faint" style="font-size: 11.5px; text-transform: uppercase; font-weight: 600; margin-bottom: 12px;">Key Stakeholders</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--r-sm); background: var(--surface-2);">
              <div class="row align-center gap-2">
                <span class="avatar" style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">JD</span>
                <div class="grow">
                  <div style="font-weight: 600; font-size: 13px;">John Doe</div>
                  <div class="faint" style="font-size: 11.5px;">VP of Engineering</div>
                </div>
              </div>
              <div class="row align-center gap-3" style="margin-top: 10px; font-size: 12px; color: var(--text-2);">
                <div class="row align-center gap-1">${ic('mail', 13, 'faint')}<span>j.doe@${esc(c.domain || 'company.com')}</span></div>
                <div class="row align-center gap-1">${ic('phone', 13, 'faint')}<span>+1 (415) 555-0192</span></div>
              </div>
            </div>
            <div style="padding: 12px; border: 1px solid var(--border); border-radius: var(--r-sm); background: var(--surface-2);">
              <div class="row align-center gap-2">
                <span class="avatar" style="width: 28px; height: 28px; border-radius: 50%; background: var(--violet); color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">AS</span>
                <div class="grow">
                  <div style="font-weight: 600; font-size: 13px;">Alice Smith</div>
                  <div class="faint" style="font-size: 11.5px;">Head of Procurement</div>
                </div>
              </div>
              <div class="row align-center gap-3" style="margin-top: 10px; font-size: 12px; color: var(--text-2);">
                <div class="row align-center gap-1">${ic('mail', 13, 'faint')}<span>a.smith@${esc(c.domain || 'company.com')}</span></div>
              </div>
            </div>
          </div>
        </div>
      `
              : `
        <div>
          <div class="faint" style="font-size: 11.5px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px;">Account Notes</div>
          <textarea
            class="input"
            rows="8"
            placeholder="Write meeting notes, deal strategy, or follow-up items..."
            data-in="updateCompanyNotes"
            data-id="${c.id}"
            style="width: 100%; resize: vertical; font-size: 13px; line-height: 1.5; padding: 10px; border-radius: var(--r-sm); background: var(--surface); border: 1px solid var(--border);"
          >${esc(c.notes || 'Spoke with executive sponsor regarding Q4 platform deployment. SSO architecture approval granted. Next call scheduled for contract redline.')}</textarea>
          <div class="faint" style="font-size: 11px; margin-top: 6px;">Notes are automatically saved to local storage.</div>
        </div>
      `
      }
    </div>
  </aside>
  `;
}

/* ---------- Pipeline Page (Sales CRM) ---------- */
import { esc } from '../core/utils.js';
import { ic } from '../core/icons.js';
import { D, S } from '../core/store.js';
import { STAGES, TAG_TONES, formatCurrencyFull, formatMoney } from '../data/companies.js';

export function pagePipeline() {
  const d = D();
  const companies = d.companies || [];

  return `
  <div class="page page-pipeline" style="padding-bottom: 60px;">
    <!-- Page Header -->
    <header class="page-h">
      <div class="row align-center wrap gap-3">
        <div class="grow">
          <div class="crumb"><span class="faint">CRM</span> / <span>Deals</span></div>
          <div class="row align-center gap-2" style="margin-top:2px;">
            <h1 class="page-t">Deals Pipeline</h1>
            <span class="badge" style="font-size:12px; font-weight:600;">${STAGES.length} Stages</span>
          </div>
        </div>
        <div class="row align-center gap-2">
          <button class="btn btn-secondary btn-sm" data-a="newTask">
            ${ic('circle-check', 14)}
            <span>New Task</span>
          </button>
          <button class="btn btn-secondary btn-sm" data-a="go" data-r="companies">
            ${ic('table', 14)}
            <span>Table View</span>
          </button>
          <button class="btn btn-primary btn-sm" data-a="newCompanyModal">
            ${ic('plus', 14)}
            <span>New Deal</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Pipeline Columns Board -->
    <div class="pipeline-board" style="display:flex; gap:16px; overflow-x:auto; padding-bottom:16px;">
      ${STAGES.map((stage) => {
        const stageCompanies = companies.filter((c) => c.tags?.includes(stage));
        const stageTotal = stageCompanies.reduce((acc, c) => acc + (c.pipelineValue || 0), 0);
        const tone = TAG_TONES[stage] || 'neutral';

        return `
        <div class="pipeline-column" style="flex: 0 0 300px; max-width: 300px; display:flex; flex-direction:column; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r); padding: 12px; height: calc(100vh - 190px);">
          <!-- Column Header -->
          <div class="column-header" style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border);">
            <div class="row align-center justify-between">
              <div class="row align-center gap-2">
                <span class="badge badge-${tone}" style="font-size: 11px; padding: 2px 7px; border-radius: 4px; font-weight:600;">${esc(stage)}</span>
                <span class="faint" style="font-size: 12px; font-weight: 500;">${stageCompanies.length}</span>
              </div>
              <span class="faint" style="font-size: 12px; font-family: var(--mono); font-weight: 600;">${formatMoney(stageTotal)}</span>
            </div>
          </div>

          <!-- Column Cards List -->
          <div class="column-cards" style="display:flex; flex-direction:column; gap: 10px; overflow-y:auto; flex-grow:1; padding-right: 2px;">
            ${
              stageCompanies.length === 0
                ? `<div style="text-align:center; padding: 32px 16px; color: var(--text-4); font-size: 12px;">No active deals in ${esc(stage)}</div>`
                : stageCompanies
                    .map((c) => {
                      return `
                <div class="card card-hover" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 12px; cursor: pointer; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);" data-a="openCompanyDrawer" data-id="${c.id}">
                  <!-- Card Header -->
                  <div class="row align-center gap-2" style="margin-bottom: 8px;">
                    <div style="width: 24px; height: 24px; border-radius: 4px; background: var(--surface-3); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border);">
                      ${
                        c.logo
                          ? `<img src="${c.logo}" alt="${esc(c.name)}" style="width: 16px; height: 16px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" /><span style="display:none; font-weight:700; font-size:11px;">${c.name.slice(0, 1)}</span>`
                          : `<span style="font-weight:700; font-size:11px;">${c.name.slice(0, 1)}</span>`
                      }
                    </div>
                    <div class="grow trunc">
                      <div style="font-weight: 600; font-size: 13px; color: var(--text);" class="trunc">${esc(c.name)}</div>
                    </div>
                    <span style="font-weight: 700; font-size: 13px; font-family: var(--mono); color: var(--text);">${formatMoney(c.pipelineValue)}</span>
                  </div>

                  <!-- Details & Owner -->
                  <div class="row align-center justify-between" style="font-size: 11.5px; margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--divider);">
                    <div class="row align-center gap-1">
                      <span class="avatar avatar-xs" style="width: 18px; height: 18px; border-radius: 50%; background: var(--accent); color: var(--on-accent); display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 600;">
                        ${c.owner ? c.owner.split(' ').map((n) => n[0]).join('') : 'U'}
                      </span>
                      <span class="faint trunc" style="max-width: 110px;">${esc(c.owner || 'Unassigned')}</span>
                    </div>

                    <div class="row align-center gap-1">
                      <span class="faint" style="font-family: var(--mono); font-size: 11px;">${c.winProbability}%</span>
                      <div style="width: 28px; height: 4px; background: var(--surface-3); border-radius: 2px; overflow: hidden;">
                        <div style="width: ${c.winProbability}%; height: 100%; background: ${c.winProbability >= 60 ? 'var(--green)' : 'var(--amber)'};"></div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
                    })
                    .join('')
            }
          </div>
        </div>
      `;
      }).join('')}
    </div>
  </div>
  `;
}

/* ---------- Companies Page (Sales CRM) ---------- */
import { esc } from '../core/utils.js';
import { ic } from '../core/icons.js';
import { D, S } from '../core/store.js';
import {
  ALL_OWNERS,
  ANY_STAGE,
  OWNERS,
  SEGMENTS,
  SORT_OPTIONS,
  STAGES,
  TAG_TONES,
  filterCompanies,
  formatCurrencyFull,
  formatMoney,
} from '../data/companies.js';

export function pageCompanies() {
  const d = D();
  const u = S.ui;
  const companies = d.companies || [];

  const filtered = filterCompanies(companies, {
    sortBy: u.companySort || 'pipelineValue',
    owner: u.companyOwner || ALL_OWNERS,
    stage: u.companyStage || ANY_STAGE,
    query: u.companySearch || '',
  });

  // Calculate CRM KPIs
  const totalPipeline = companies.reduce((acc, c) => acc + (c.pipelineValue || 0), 0);
  const avgWinProb = companies.length
    ? Math.round(companies.reduce((acc, c) => acc + (c.winProbability || 0), 0) / companies.length)
    : 0;
  const totalDeals = companies.reduce((acc, c) => acc + (c.openDeals || 0), 0);
  const expansionCount = companies.filter((c) => c.tags?.includes('Expansion')).length;

  return `
  <div class="page page-companies" style="padding-bottom: 60px;">
    <!-- Page Header -->
    <header class="page-h">
      <div class="row align-center wrap gap-3">
        <div class="grow">
          <div class="crumb"><span class="faint">CRM</span> / <span>Accounts</span></div>
          <div class="row align-center gap-2" style="margin-top:2px;">
            <h1 class="page-t">Companies</h1>
            <span class="badge" style="font-size:12px; font-weight:600;">${filtered.length} accounts</span>
          </div>
        </div>
        <div class="row align-center gap-2">
          <button class="btn btn-secondary btn-sm" data-a="exportCompaniesCSV">
            ${ic('download', 14)}
            <span>Export CSV</span>
          </button>
          <button class="btn btn-secondary btn-sm" data-a="newTask">
            ${ic('circle-check', 14)}
            <span>New Task</span>
          </button>
          <button class="btn btn-primary btn-sm" data-a="newCompanyModal">
            ${ic('plus', 14)}
            <span>New Company</span>
          </button>
        </div>
      </div>
    </header>

    <!-- CRM Summary KPI Cards -->
    <div class="kpi-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; margin-bottom: 20px;">
      <div class="card" style="padding: 14px 16px; border: 1px solid var(--border); border-radius: var(--r); background: var(--surface);">
        <div class="faint" style="font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Total Pipeline</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 4px; color: var(--text);">${formatCurrencyFull(totalPipeline)}</div>
        <div class="row align-center gap-1" style="font-size: 11.5px; color: var(--green); margin-top: 4px;">
          ${ic('trending-up', 13)}
          <span>+18.4% vs last quarter</span>
        </div>
      </div>
      <div class="card" style="padding: 14px 16px; border: 1px solid var(--border); border-radius: var(--r); background: var(--surface);">
        <div class="faint" style="font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Open Deals</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 4px; color: var(--text);">${totalDeals} Deals</div>
        <div class="faint" style="font-size: 11.5px; margin-top: 4px;">Across ${companies.length} target accounts</div>
      </div>
      <div class="card" style="padding: 14px 16px; border: 1px solid var(--border); border-radius: var(--r); background: var(--surface);">
        <div class="faint" style="font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Avg Win Probability</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 4px; color: var(--text);">${avgWinProb}%</div>
        <div class="progress-bar" style="height: 4px; background: var(--surface-3); border-radius: 2px; margin-top: 8px; overflow: hidden;">
          <div style="width: ${avgWinProb}%; height: 100%; background: var(--accent);"></div>
        </div>
      </div>
      <div class="card" style="padding: 14px 16px; border: 1px solid var(--border); border-radius: var(--r); background: var(--surface);">
        <div class="faint" style="font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Expansion Accounts</div>
        <div style="font-size: 22px; font-weight: 700; margin-top: 4px; color: var(--text);">${expansionCount} Accounts</div>
        <div class="faint" style="font-size: 11.5px; margin-top: 4px;">Active upsell or expansion</div>
      </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="card" style="padding: 10px 14px; margin-bottom: 16px; border: 1px solid var(--border); border-radius: var(--r); background: var(--surface);">
      <div class="row align-center wrap gap-2">
        <!-- Search Input -->
        <div class="row align-center gap-2 grow" style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 4px 10px; max-width: 320px;">
          ${ic('search', 14, 'faint')}
          <input
            type="text"
            placeholder="Search company, owner, tag..."
            value="${esc(u.companySearch || '')}"
            data-in="companySearch"
            style="border: none; background: transparent; outline: none; font-size: 13px; width: 100%; color: var(--text);"
          />
          ${u.companySearch ? `<button class="ibtn ibtn-xs" data-a="clearCompanySearch" aria-label="Clear">${ic('x', 12)}</button>` : ''}
        </div>

        <div class="sp"></div>

        <!-- Stage Filter -->
        <div class="row align-center gap-1">
          <span class="faint" style="font-size: 12px;">Stage:</span>
          <select class="select" data-in="companyStage" style="font-size: 12.5px; height: 30px; padding: 2px 8px; border-radius: var(--r-sm);">
            <option value="${ANY_STAGE}" ${u.companyStage === ANY_STAGE ? 'selected' : ''}>All Stages</option>
            ${STAGES.map((s) => `<option value="${esc(s)}" ${u.companyStage === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}
          </select>
        </div>

        <!-- Owner Filter -->
        <div class="row align-center gap-1">
          <span class="faint" style="font-size: 12px;">Owner:</span>
          <select class="select" data-in="companyOwner" style="font-size: 12.5px; height: 30px; padding: 2px 8px; border-radius: var(--r-sm);">
            <option value="${ALL_OWNERS}" ${u.companyOwner === ALL_OWNERS ? 'selected' : ''}>All Owners</option>
            ${OWNERS.map((o) => `<option value="${esc(o.name)}" ${u.companyOwner === o.name ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}
          </select>
        </div>

        <!-- Sort Filter -->
        <div class="row align-center gap-1">
          <span class="faint" style="font-size: 12px;">Sort:</span>
          <select class="select" data-in="companySort" style="font-size: 12.5px; height: 30px; padding: 2px 8px; border-radius: var(--r-sm);">
            ${SORT_OPTIONS.map((opt) => `<option value="${opt.value}" ${u.companySort === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>

    <!-- Companies Data Table -->
    <div class="card" style="border: 1px solid var(--border); border-radius: var(--r); background: var(--surface); overflow: hidden;">
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border); background: var(--surface-2); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-3);">
              <th style="padding: 10px 14px; width: 40px; text-align: center;">
                <input type="checkbox" data-a="toggleSelectAllCompanies" ${u.selectedCompanies?.size === filtered.length && filtered.length > 0 ? 'checked' : ''} />
              </th>
              <th style="padding: 10px 14px;">Company</th>
              <th style="padding: 10px 14px;">Stage & Tags</th>
              <th style="padding: 10px 14px;">Account Owner</th>
              <th style="padding: 10px 14px;">Pipeline Value</th>
              <th style="padding: 10px 14px;">Deals</th>
              <th style="padding: 10px 14px;">Win Rate</th>
              <th style="padding: 10px 14px;">Last Interaction</th>
              <th style="padding: 10px 14px; width: 40px;"></th>
            </tr>
          </thead>
          <tbody>
            ${
              filtered.length === 0
                ? `<tr><td colspan="9" style="text-align: center; padding: 48px; color: var(--text-3);">
                    ${ic('search-x', 32, 'faint')}
                    <div style="margin-top: 8px; font-weight: 500;">No matching accounts found</div>
                    <div class="faint" style="font-size: 12px; margin-top: 4px;">Try clearing your filters or search query</div>
                   </td></tr>`
                : filtered
                    .map((c) => {
                      const isSelected = u.selectedCompanies?.has(c.id);
                      return `
                <tr class="table-row-hover ${isSelected ? 'selected' : ''}" style="border-bottom: 1px solid var(--divider); cursor: pointer;" data-a="openCompanyDrawer" data-id="${c.id}">
                  <td style="padding: 10px 14px; text-align: center;">
                    <input type="checkbox" data-a="toggleSelectCompany" data-id="${c.id}" ${isSelected ? 'checked' : ''} />
                  </td>
                  <td style="padding: 10px 14px;">
                    <div class="row align-center gap-2">
                      <div class="company-logo-badge" style="width: 28px; height: 28px; border-radius: 6px; background: var(--surface-3); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border);">
                        ${
                          c.logo
                            ? `<img src="${c.logo}" alt="${esc(c.name)}" style="width: 18px; height: 18px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" /><span style="display:none; font-weight:700; font-size:12px;">${c.name.slice(0, 1)}</span>`
                            : `<span style="font-weight:700; font-size:12px;">${c.name.slice(0, 1)}</span>`
                        }
                      </div>
                      <div>
                        <div style="font-weight: 600; color: var(--text);">${esc(c.name)}</div>
                        <div class="faint" style="font-size: 11.5px;">${esc(c.domain || c.id + '.com')}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 10px 14px;">
                    <div class="row align-center wrap gap-1">
                      ${(c.tags || [])
                        .map((tag) => {
                          const tone = TAG_TONES[tag] || 'neutral';
                          return `<span class="badge badge-${tone}" style="font-size: 11px; padding: 2px 7px; border-radius: 4px;">${esc(tag)}</span>`;
                        })
                        .join('')}
                    </div>
                  </td>
                  <td style="padding: 10px 14px;">
                    <div class="row align-center gap-2">
                      <span class="avatar avatar-xs" style="width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600;">
                        ${c.owner ? c.owner.split(' ').map((n) => n[0]).join('') : 'U'}
                      </span>
                      <span style="font-weight: 500;">${esc(c.owner || 'Unassigned')}</span>
                    </div>
                  </td>
                  <td style="padding: 10px 14px; font-weight: 600; font-family: var(--mono); color: var(--text);">
                    ${formatCurrencyFull(c.pipelineValue)}
                  </td>
                  <td style="padding: 10px 14px;">
                    <span class="badge" style="background: var(--surface-2); font-weight: 600; font-size: 11.5px;">${c.openDeals || 0} deals</span>
                  </td>
                  <td style="padding: 10px 14px;">
                    <div class="row align-center gap-2">
                      <div style="width: 44px; height: 6px; background: var(--surface-3); border-radius: 3px; overflow: hidden;">
                        <div style="width: ${c.winProbability}%; height: 100%; background: ${c.winProbability >= 60 ? 'var(--green)' : c.winProbability >= 40 ? 'var(--amber)' : 'var(--red)'};"></div>
                      </div>
                      <span class="faint" style="font-size: 11.5px; font-family: var(--mono);">${c.winProbability}%</span>
                    </div>
                  </td>
                  <td style="padding: 10px 14px;">
                    <div>
                      <span style="font-size: 12px; font-weight: 500;">${esc(c.lastInteraction?.label || 'Call')}</span>
                      <span class="faint" style="font-size: 11px; margin-left: 4px;">${esc(c.lastInteraction?.date || '')}</span>
                    </div>
                  </td>
                  <td style="padding: 10px 14px; text-align: right;">
                    <div class="row align-center justify-end gap-1">
                      <button class="ibtn ibtn-xs" data-a="deleteCompany" data-id="${c.id}" title="Delete account" aria-label="Delete account" style="color:var(--text-3);" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--text-3)'">
                        ${ic('trash-2', 13)}
                      </button>
                      <button class="ibtn ibtn-xs" data-a="openCompanyDrawer" data-id="${c.id}" aria-label="Open company detail">
                        ${ic('chevron-right', 14)}
                      </button>
                    </div>
                  </td>
                </tr>
              `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

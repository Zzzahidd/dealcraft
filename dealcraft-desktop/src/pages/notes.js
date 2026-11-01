/* ---------- Notes & Docs Page ---------- */
import { ago, esc } from '../core/utils.js';
import { ic } from '../core/icons.js';
import { S } from '../core/store.js';
import { getNotes } from '../data/notes.js';

export function pageNotes() {
  const u = S.ui;
  const notes = getNotes();
  const cat = u.notesCategoryFilter || 'All';
  const q = (u.notesSearchQuery || '').toLowerCase().trim();

  const categories = ['All', 'Strategy', 'CRM Notes', 'Engineering', 'Reference', 'Design'];

  const filtered = notes.filter((n) => {
    if (cat !== 'All' && n.category !== cat) return false;
    if (q) {
      const matchTitle = (n.title || '').toLowerCase().includes(q);
      const matchContent = (n.content || '').toLowerCase().includes(q);
      const matchTags = (n.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchTags;
    }
    return true;
  });

  return `
    <div class="page page-notes" style="padding-bottom: 60px;">
      <!-- Page Header -->
      <header class="page-h">
        <div class="row align-center wrap gap-3">
          <div class="grow">
            <div class="crumb"><span class="faint">Workspace</span> / <span>Docs</span></div>
            <div class="row align-center gap-2" style="margin-top:2px;">
              <h1 class="page-t">Notes & Docs</h1>
              <span class="badge" style="font-size:12px; font-weight:600;">${filtered.length} documents</span>
            </div>
          </div>
          <div class="row align-center gap-2">
            <button class="btn btn-primary btn-sm" data-a="openNewNoteDrawer">
              ${ic('plus', 14)}
              <span>New Note</span>
            </button>
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div class="row align-center wrap gap-2" style="margin-top: 14px;">
          <!-- Category Tabs -->
          <div class="row align-center gap-1" style="flex-wrap:wrap;">
            ${categories
              .map(
                (c) => `
              <button
                class="pillbtn ${cat === c ? 'on' : ''}"
                data-a="setNotesCategory"
                data-cat="${c}"
                style="font-size:12px;"
              >
                ${c}
              </button>
            `,
              )
              .join('')}
          </div>

          <span class="sp"></span>

          <!-- Search Input -->
          <div class="inwrap" style="width:240px;">
            ${ic('search', 14)}
            <input
              type="text"
              class="input input-sm"
              placeholder="Filter notes..."
              value="${esc(u.notesSearchQuery || '')}"
              data-in="notesSearch"
            />
          </div>
        </div>
      </header>

      <!-- Notes Grid -->
      <div class="pbody" style="margin-top:16px;">
        ${
          filtered.length === 0
            ? `
          <div class="col align-center justify-center gap-2" style="padding:60px 20px;text-align:center;">
            <h3 style="margin:0;font-size:16px;">No notes found</h3>
            <p class="muted" style="margin:0;font-size:13px;">Try selecting another category or create a new note.</p>
          </div>
        `
            : `
          <div class="grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(290px, 1fr));gap:14px;">
            ${filtered
              .map(
                (n) => `
              <div
                class="kcard note-card"
                style="display:flex;flex-direction:column;padding:16px;border-radius:10px;background:var(--surface);border:1px solid var(--border);cursor:pointer;transition:transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;"
                data-a="openNoteFromGrid"
                data-id="${esc(n.id)}"
                onmouseover="this.style.borderColor='var(--border-strong, rgba(255,255,255,0.18))';this.style.transform='translateY(-2px)'"
                onmouseout="this.style.borderColor='var(--border)';this.style.transform='none'"
              >
                <div class="row align-center gap-2" style="margin-bottom:8px;">
                  <span class="note-category-badge" style="font-size:11px;padding:1px 8px;">
                    ${ic('folder', 11)} ${esc(n.category || 'General')}
                  </span>
                  <span class="sp"></span>
                  ${n.pinned ? `<span style="color:var(--amber);">${ic('star', 12)}</span>` : ''}
                  <span class="faint" style="font-size:11px;">${ago(n.updatedAt)}</span>
                  <button
                    class="ibtn ibtn-xs note-del-btn"
                    data-a="deleteNote"
                    data-id="${esc(n.id)}"
                    title="Delete note"
                    aria-label="Delete note"
                    style="color:var(--text-3);opacity:0.6;padding:2px;margin-left:4px;"
                    onmouseover="this.style.opacity='1';this.style.color='var(--red)';"
                    onmouseout="this.style.opacity='0.6';this.style.color='var(--text-3)';"
                  >
                    ${ic('trash-2', 13)}
                  </button>
                </div>

                <h3 style="font-size:15px;font-weight:600;margin:0 0 8px;line-height:1.35;color:var(--text);" class="trunc2">
                  ${esc(n.title)}
                </h3>

                <p style="font-size:12.5px;color:var(--text-3);line-height:1.55;margin:0 0 12px;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
                  ${esc(n.content.replace(/[#*`_[\]()-]/g, ' ').replace(/\s+/g, ' ').slice(0, 140))}
                </p>

                ${
                  n.tags && n.tags.length
                    ? `
                  <div class="row align-center wrap gap-1" style="margin-top:auto;">
                    ${n.tags.slice(0, 3).map((t) => `<span class="note-tag-chip" style="font-size:10.5px;">#${esc(t)}</span>`).join('')}
                    ${n.tags.length > 3 ? `<span class="faint" style="font-size:10.5px;">+${n.tags.length - 3}</span>` : ''}
                  </div>
                `
                    : ''
                }
              </div>
            `,
              )
              .join('')}
          </div>
        `
        }
      </div>
    </div>
  `;
}

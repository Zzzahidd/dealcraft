/* ============================================================
   NOTE DRAWER (SLIDE-OVER READING & COLLABORATION PANEL)
   Smooth right-side inspection drawer matching Quire design system.
   Zero center modals, zero intrusive delete prompts.
   ============================================================ */

import { ago, esc } from '../core/utils.js';
import { ic } from '../core/icons.js';
import { D, S } from '../core/store.js';
import { av } from '../ui/helpers.js';
import { getNote } from '../data/notes.js';
import { renderMarkdown } from './modals.js';

export function renderNoteDrawer() {
  const u = S.ui;
  const noteId = u.noteDrawer;
  if (!noteId) return '';

  const isNew = noteId === '__new__';
  const n = isNew ? null : getNote(noteId);
  const isEditing = u.noteDrawerEdit || isNew;

  // If existing note not found, close drawer
  if (!isNew && !n) {
    u.noteDrawer = null;
    return '';
  }

  const title = n ? n.title : '';
  const category = n ? n.category : 'General';
  const folder = n ? n.folder : 'Workspace';
  const content = n ? n.content : '';
  const tags = n && n.tags ? n.tags : [];
  const updatedAt = n && n.updatedAt ? ago(n.updatedAt) : 'just now';
  const isPinned = n ? !!n.pinned : false;

  // Find related tasks in the workspace that match keywords from title or tags
  const relatedTasks = !isNew && n ? findRelatedTasks(n) : [];

  return `
    <div class="drawer-scrim ${u.noteDrawerFull ? 'full' : ''}${u.fx.drawer ? ' enter' : ''}" data-a="closeNoteDrawer"></div>
    <aside
      class="drawer note-drawer ${u.noteDrawerFull ? 'full' : ''} ${u.fx.drawer ? 'enter' : ''}"
      role="dialog"
      aria-modal="${u.noteDrawerFull}"
      aria-labelledby="nd-h"
      tabindex="-1"
    >
      <!-- Drawer Header Bar -->
      <div class="drawer-h">
        <button class="pillbtn" data-a="go" data-r="notes" style="font-size:12.5px" title="View all notes">
          ${ic('file-text', 14)}
          <span>Notes</span>
        </button>
        <span class="faint">/</span>
        <span class="mono faint" style="font-size:11.5px;padding:0 6px">
          ${esc(category)}
        </span>
        <span class="badge ok hide-m" style="font-size:11px;font-weight:500">
          ${ic('shield-check', 12)} Shared in Workspace
        </span>

        <span class="sp"></span>

        ${
          !isEditing && n
            ? `
          <button
            class="ibtn ibtn-sm"
            data-a="togglePinNote"
            data-id="${esc(n.id)}"
            data-tip="${isPinned ? 'Unpin note' : 'Pin note'}"
            aria-label="Pin"
            style="${isPinned ? 'color:var(--amber)' : ''}"
          >
            ${ic('star', 15)}
          </button>
          <button
            class="ibtn ibtn-sm"
            data-a="copyNoteContent"
            data-id="${esc(n.id)}"
            data-tip="Copy note markdown"
            aria-label="Copy markdown"
          >
            ${ic('copy', 15)}
          </button>
          <button
            class="ibtn ibtn-sm"
            data-a="deleteNote"
            data-id="${esc(n.id)}"
            data-tip="Delete note"
            aria-label="Delete note"
            style="color:var(--text-3);"
            onmouseover="this.style.color='var(--red)'"
            onmouseout="this.style.color='var(--text-3)'"
          >
            ${ic('trash-2', 15)}
          </button>
          <button
            class="ibtn ibtn-sm hide-m"
            data-a="toggleNoteDrawerFull"
            data-tip="${u.noteDrawerFull ? 'Side panel' : 'Full page'}"
            aria-label="Toggle full page"
          >
            ${ic(u.noteDrawerFull ? 'minimize-2' : 'maximize-2', 15)}
          </button>
        `
            : ''
        }

        <button
          class="ibtn ibtn-sm"
          data-a="closeNoteDrawer"
          data-tip="Close  Esc"
          aria-label="Close"
        >
          ${ic('x', 16)}
        </button>
      </div>

      <!-- Drawer Body -->
      <div class="drawer-b" data-keep="note-drawer:${noteId}">
        ${
          !isEditing && n
            ? renderNoteViewMode(n, title, category, folder, tags, updatedAt, content, relatedTasks)
            : renderNoteEditMode(n, isNew, title, category, tags, content)
        }
      </div>

      <!-- Drawer Footer -->
      <div class="modal-f" style="padding:10px 16px;background:var(--surface);">
        ${
          !isEditing && n
            ? `
          <button class="btn btn-ghost btn-sm" data-a="deleteNote" data-id="${esc(n.id)}" style="color:var(--red);">
            ${ic('trash-2', 13)}
            <span>Delete</span>
          </button>
          <span class="faint hide-m" style="font-size:12px;margin-left:4px;">
            ${content.split(/\s+/).filter(Boolean).length} words · Markdown document
          </span>
          <span class="sp"></span>
          <button class="btn btn-secondary btn-sm" data-a="copyNoteContent" data-id="${esc(n.id)}">
            ${ic('copy', 13)}
            <span>Copy Text</span>
          </button>
          <button class="btn btn-secondary btn-sm" data-a="editNoteInDrawer" data-id="${esc(n.id)}">
            ${ic('pencil', 13)}
            <span>Edit</span>
          </button>
          <button class="btn btn-primary btn-sm" data-a="closeNoteDrawer">
            Done
          </button>
        `
            : `
          ${!isNew && n ? `
          <button class="btn btn-ghost btn-sm" data-a="deleteNote" data-id="${esc(n.id)}" style="color:var(--red);">
            ${ic('trash-2', 13)}
            <span>Delete</span>
          </button>` : ''}
          <span class="sp"></span>
          <button class="btn btn-secondary btn-sm" data-a="cancelEditNoteInDrawer">
            Cancel
          </button>
          <button class="btn btn-primary btn-sm" data-a="saveNoteFromDrawer">
            ${isNew ? 'Create Note' : 'Save Changes'}
          </button>
        `
        }
      </div>
    </aside>
  `;
}

function renderNoteViewMode(n, title, category, folder, tags, updatedAt, content, relatedTasks) {
  return `
    <div class="note-drawer-content" style="padding:4px 0 20px;">
      <h1
        id="nd-h"
        style="font-size:22px;font-weight:700;line-height:1.3;margin:0 0 12px;color:var(--text);letter-spacing:-0.02em"
      >
        ${esc(title)}
      </h1>

      <div
        class="row align-center wrap gap-2"
        style="font-size:12px;color:var(--text-3);padding-bottom:14px;border-bottom:1px solid var(--border-subtle, rgba(255,255,255,0.08));margin-bottom:18px"
      >
        <span class="row align-center gap-1" style="color:var(--text-2);font-weight:500;">
          ${av(D().me, 'xs', false)}
          <span>Workspace Team</span>
        </span>
        <span class="faint">·</span>
        <span>Updated ${updatedAt}</span>
        <span class="faint">·</span>
        <span class="badge" style="font-size:11px;font-weight:500;">
          ${ic('folder', 11)} ${esc(folder)}
        </span>
      </div>

      ${
        tags.length
          ? `
        <div class="row align-center wrap gap-1" style="margin-bottom:18px">
          ${tags.map((t) => `<span class="note-tag-chip">#${esc(t)}</span>`).join('')}
        </div>
      `
          : ''
      }

      <!-- Clean Markdown Reader -->
      <div class="note-body-content" style="font-size:14.5px;line-height:1.7;">
        ${renderMarkdown(content)}
      </div>

      <!-- Meaningful Workspace Context Section -->
      ${
        relatedTasks.length
          ? `
        <div class="dsec" style="margin-top:32px;padding-top:16px;border-top:1px solid var(--border-subtle, rgba(255,255,255,0.08));">
          <div class="dsec-h">
            <h3>Connected Tasks</h3>
            <span class="cnt num">${relatedTasks.length}</span>
          </div>
          <div class="col gap-1" style="margin-top:8px;">
            ${relatedTasks
              .map(
                (t) => `
              <div
                class="row align-center gap-2"
                style="padding:6px 10px;border-radius:6px;background:var(--surface-2);cursor:pointer;font-size:13px;"
                data-a="openTaskFromNote"
                data-id="${esc(t.id)}"
              >
                ${ic('circle-check', 14)}
                <span class="mono faint" style="font-size:11px;">${esc(t.key)}</span>
                <span class="grow trunc">${esc(t.title)}</span>
                <span class="badge" style="font-size:11px;">${esc(t.status)}</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }

      <!-- Collaborator Access Notice -->
      <div class="alert info" style="margin-top:24px;">
        ${ic('info', 14)}
        <span><b>Workspace Note</b> · Available to all invited members and collaborators in this workspace.</span>
      </div>
    </div>
  `;
}

function renderNoteEditMode(n, isNew, title, category, tags, content) {
  return `
    <form class="col gap-3" data-submit="saveNoteFromDrawer" style="padding:4px 0 16px;">
      <input type="hidden" id="nd-edit-id" value="${esc(n?.id || '')}">

      <div class="field">
        <label class="label" for="nd-edit-title">Title</label>
        <input
          class="input"
          id="nd-edit-title"
          value="${esc(title)}"
          placeholder="Note title..."
          autofocus
          required
          style="font-size:16px;font-weight:600"
        />
      </div>

      <div class="row gap-2">
        <div class="field" style="flex:1">
          <label class="label" for="nd-edit-cat">Category</label>
          <select class="select" id="nd-edit-cat">
            <option value="Strategy" ${category === 'Strategy' ? 'selected' : ''}>Strategy</option>
            <option value="CRM Notes" ${category === 'CRM Notes' ? 'selected' : ''}>CRM Notes</option>
            <option value="Engineering" ${category === 'Engineering' ? 'selected' : ''}>Engineering</option>
            <option value="Reference" ${category === 'Reference' ? 'selected' : ''}>Reference</option>
            <option value="Design" ${category === 'Design' ? 'selected' : ''}>Design</option>
            <option value="General" ${category === 'General' ? 'selected' : ''}>General</option>
          </select>
        </div>
        <div class="field" style="flex:1">
          <label class="label" for="nd-edit-tags">Tags</label>
          <input
            class="input"
            id="nd-edit-tags"
            value="${esc(tags.join(', '))}"
            placeholder="comma separated (e.g. q4, sprint)"
          />
        </div>
      </div>

      <div class="field">
        <label class="label" for="nd-edit-content">Content (Markdown)</label>
        <textarea
          class="textarea"
          id="nd-edit-content"
          rows="14"
          placeholder="Write markdown content or scratchpad memo here..."
          style="font-family:var(--font-mono);font-size:13px;line-height:1.6;"
        >${esc(content)}</textarea>
      </div>
    </form>
  `;
}

function findRelatedTasks(note) {
  const d = D();
  const tasks = d.tasks || [];
  if (!tasks.length) return [];

  const searchWords = [
    ...(note.tags || []),
    ...(note.title || '').toLowerCase().split(/\s+/).filter((w) => w.length > 3),
  ];

  return tasks
    .filter((t) => {
      const titleLower = (t.title || '').toLowerCase();
      const descLower = (t.desc || '').toLowerCase();
      return searchWords.some((w) => titleLower.includes(w) || descLower.includes(w));
    })
    .slice(0, 4);
}

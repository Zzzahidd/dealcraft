/* ============================================================
   APPLICATION WORKSPACE SPOTLIGHT LAUNCHER
   Clean, Calm, Native-to-App Workspace Search & Quick Actions
   (Notes, Files, Tasks, Projects, Companies, and Commands)
   With Mouse Dragging, Edge Cursor Resizing & Multi-Window Navigation
   ============================================================ */

import { esc } from '../core/utils.js';
import { ic } from '../core/icons.js';
import { D, S } from '../core/store.js';
import { formatMoney } from '../data/companies.js';
import { searchNotes } from '../data/notes.js';
import { FT } from '../ui/helpers.js';
import { commands } from './palette.js';

/**
 * Gather and search all workspace entities: Notes, Files, Tasks, Projects, Companies, and Commands.
 */
export function getRaycastResults(query) {
  const d = D();
  const q = (query || '').toLowerCase().trim();

  // 1. Notes from workspace notes store
  const notesMatches = searchNotes(q);
  const notes = notesMatches.map(({ note, score, snippet }) => ({
    id: `note-${note.id}`,
    category: 'Notes',
    title: note.title,
    subtitle: snippet || (note.content || '').slice(0, 70).replace(/\n/g, ' '),
    icon: 'file-text',
    typeLabel: 'Note',
    badge: note.tags?.[0] || '',
    noteId: note.id,
    noteObj: note,
    score: score + 50,
  }));

  // 2. Files from workspace
  const files = (d.files || []).map((f) => {
    const p = (d.projects || []).find((pr) => pr.id === f.project);
    return {
      id: `file-${f.id}`,
      category: 'Files',
      title: f.name,
      subtitle: `${p?.name || 'Project'} · ${f.size || 'File'}`,
      icon: FT[f.type]?.i || 'paperclip',
      typeLabel: 'File',
      fileObj: f,
      score: 40,
    };
  });

  // 3. Tasks from workspace
  const tasks = (d.tasks || []).map((t) => {
    const p = (d.projects || []).find((pr) => pr.id === t.project);
    return {
      id: `task-${t.id}`,
      category: 'Tasks',
      title: t.title,
      subtitle: `${p?.name || 'Project'} · ${t.status || 'todo'} · ${t.pri || 'med'}`,
      icon: t.status === 'done' ? 'check-circle' : 'circle-check',
      typeLabel: 'Task',
      taskId: t.id,
      score: 35,
    };
  });

  // 4. Projects from workspace
  const projects = (d.projects || []).map((p) => ({
    id: `proj-${p.id}`,
    category: 'Projects',
    title: p.name,
    subtitle: p.desc || 'Workspace project',
    icon: 'folder-kanban',
    typeLabel: 'Project',
    projectId: p.id,
    score: 30,
  }));

  // 5. Companies / CRM Accounts from workspace
  const companies = (d.companies || []).map((c) => ({
    id: `comp-${c.id}`,
    category: 'Companies',
    title: c.name,
    subtitle: `${c.tags?.join(' · ') || 'Account'} · ARR: ${formatMoney(c.pipelineValue)}`,
    icon: 'building-2',
    typeLabel: 'Company',
    companyId: c.id,
    score: 25,
  }));

  // 6. Application Workspace Commands
  const appCmds = commands().map((c) => ({
    id: `cmd-${c.id}`,
    category: 'Commands',
    title: c.name,
    subtitle: c.kbd ? `Shortcut: ${c.kbd}` : 'Workspace action',
    icon: c.icon || 'command',
    typeLabel: 'Command',
    cmdId: c.id,
    cmdObj: c,
    score: 20,
  }));

  // Add instant "Create note" command
  appCmds.unshift({
    id: 'cmd-create-note',
    category: 'Commands',
    title: 'Create note',
    subtitle: 'Write an instant scratchpad memo or meeting record',
    icon: 'file-plus',
    typeLabel: 'Command',
    act: 'openNewNoteModal',
    score: 22,
  });

  const allItems = [...notes, ...files, ...tasks, ...projects, ...companies, ...appCmds];

  if (!q) {
    return [
      ...notes.slice(0, 4),
      ...files.slice(0, 3),
      ...tasks.slice(0, 3),
      ...companies.slice(0, 2),
      ...appCmds.slice(0, 3),
    ];
  }

  const scored = [];
  for (const item of allItems) {
    const title = (item.title || '').toLowerCase();
    const sub = (item.subtitle || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();

    let score = item.score || 0;
    if (title === q) score += 200;
    else if (title.startsWith(q)) score += 120;
    else if (title.includes(q)) score += 60;

    if (sub.includes(q)) score += 30;
    if (cat.includes(q)) score += 15;

    if (score > (item.score || 0)) {
      scored.push({ item, finalScore: score });
    }
  }

  scored.sort((a, b) => b.finalScore - a.finalScore);
  return scored.slice(0, 30).map((s) => s.item);
}

/**
 * Render inner items HTML for the results list
 */
export function renderResultsListHTML(results, activeIdx) {
  if (results.length === 0) {
    return `
      <div class="raycast-empty">
        <div class="raycast-empty-icon">${ic('search-x', 24)}</div>
        <div class="raycast-empty-title">No results found</div>
        <div class="raycast-empty-desc">Try searching for a note title, task, project, or file</div>
      </div>
    `;
  }

  const groups = {};
  results.forEach((item, index) => {
    const cat = item.category || 'Workspace';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push({ ...item, globalIndex: index });
  });

  let html = `<div class="raycast-glider" id="raycast-glider" aria-hidden="true"></div>`;

  for (const [category, items] of Object.entries(groups)) {
    html += `
      <div class="raycast-group">
        <div class="raycast-group-header">${esc(category)}</div>
        ${items
          .map((item) => {
            const isSelected = item.globalIndex === activeIdx;
            return `
          <div
            class="raycast-item ${isSelected ? 'selected' : ''}"
            data-a="executeRaycastItem"
            data-idx="${item.globalIndex}"
            data-id="${item.id}"
            id="raycast-item-${item.globalIndex}"
            role="option"
            aria-selected="${isSelected ? 'true' : 'false'}"
          >
            <span class="raycast-item-icon">
              ${ic(item.icon || 'file-text', 15)}
            </span>
            <div class="raycast-item-content">
              <div class="raycast-item-title-row">
                <span class="raycast-item-title">${esc(item.title)}</span>
                ${item.badge ? `<span class="raycast-item-badge">${esc(item.badge)}</span>` : ''}
              </div>
              ${item.subtitle ? `<div class="raycast-item-subtitle">${esc(item.subtitle)}</div>` : ''}
            </div>
            <div class="raycast-item-type-label">
              ${esc(item.typeLabel || '')}
            </div>
          </div>
        `;
          })
          .join('')}
      </div>
    `;
  }

  return html;
}

/**
 * Render the Raycast Spotlight Component
 */
export function renderRaycast(isStandalone = false) {
  const u = S.ui;
  if (!u.raycastOpen && !isStandalone) return '';

  const results = getRaycastResults(u.raycastQ || '');
  const activeIdx = Math.min(u.raycastIdx || 0, Math.max(0, results.length - 1));
  const activeItem = results[activeIdx] || results[0];

  scheduleGliderUpdate(activeIdx);
  initResizeAndDragHandlers();

  const containerHtml = `
    <div
      class="raycast-container ${isStandalone ? 'standalone' : ''}"
      role="dialog"
      aria-modal="true"
      aria-label="Workspace Search"
      id="raycast-container-box"
    >
      <!-- Resize Grips (Around Edges & Corners for Mouse Cursor Resizing) -->
      <div class="raycast-resize-handle handle-r" data-resize="r" title="Resize width"></div>
      <div class="raycast-resize-handle handle-b" data-resize="b" title="Resize height"></div>
      <div class="raycast-resize-handle handle-l" data-resize="l" title="Resize width"></div>
      <div class="raycast-resize-handle handle-t" data-resize="t" title="Resize height"></div>
      <div class="raycast-resize-handle handle-br" data-resize="br" title="Drag with mouse to resize">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="7" y1="4" x2="4" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Search Input Header (Draggable Region) -->
      <div class="raycast-header" data-tauri-drag-region>
        <span class="raycast-search-icon" data-tauri-drag-region>
          ${ic('search', 16)}
        </span>
        <input
          type="text"
          class="raycast-input"
          placeholder="Search notes, files, tasks, projects, companies..."
          value="${esc(u.raycastQ || '')}"
          data-in="raycastSearch"
          autocomplete="off"
          spellcheck="false"
          autofocus
          id="raycast-main-input"
        />
        <div class="raycast-header-right">
          <kbd class="key-badge">Esc</kbd>
          <button class="ibtn ibtn-xs raycast-close-btn" data-a="closeRaycast" title="Close (Esc)" aria-label="Close search">
            ${ic('x', 14)}
          </button>
        </div>
      </div>

      <!-- Search Results Scroll Area -->
      <div class="raycast-results-wrapper">
        <div class="raycast-list" id="raycast-results-list" data-keep="raycast-list">
          ${renderResultsListHTML(results, activeIdx)}
        </div>
      </div>

      <!-- Footer Action & Status Bar (Draggable Region) -->
      <div class="raycast-footer" id="raycast-footer-bar" data-tauri-drag-region>
        <div class="raycast-footer-left" data-tauri-drag-region>
          <div class="raycast-footer-selection" data-tauri-drag-region>
            ${
              activeItem
                ? `<span class="raycast-footer-crumb">${esc(activeItem.category)}</span> <span class="crumb-sep">›</span> <span class="raycast-footer-title">${esc(activeItem.title)}</span>`
                : `<span class="faint">Type to search your workspace</span>`
            }
          </div>
        </div>

        <div class="raycast-footer-right">
          <span class="raycast-hint">
            <kbd class="key-badge">↑</kbd><kbd class="key-badge">↓</kbd>
            <span class="hint-label">Navigate</span>
          </span>
          <span class="raycast-hint" data-a="executeActiveRaycastItem">
            <kbd class="key-badge">↵</kbd>
            <span class="hint-label">Open</span>
          </span>
          <button class="ibtn ibtn-xs raycast-footer-close" data-a="closeRaycast" title="Close">
            ${ic('x', 13)}
          </button>
        </div>
      </div>
    </div>
  `;

  if (isStandalone) {
    return containerHtml;
  }

  return `
  <div class="raycast-scrim" data-a="closeRaycastIfScrim">
    ${containerHtml}
  </div>
  `;
}

/**
 * Fast targeted DOM update when typing
 */
export function updateRaycastDOM() {
  const u = S.ui;
  const listEl = document.getElementById('raycast-results-list');
  const footerEl = document.getElementById('raycast-footer-bar');
  if (!listEl) return;

  const results = getRaycastResults(u.raycastQ || '');
  const activeIdx = Math.min(u.raycastIdx || 0, Math.max(0, results.length - 1));
  const activeItem = results[activeIdx] || results[0];

  listEl.innerHTML = renderResultsListHTML(results, activeIdx);

  if (footerEl) {
    const leftEl = footerEl.querySelector('.raycast-footer-selection');
    if (leftEl) {
      leftEl.innerHTML = activeItem
        ? `<span class="raycast-footer-crumb">${esc(activeItem.category)}</span> <span class="crumb-sep">›</span> <span class="raycast-footer-title">${esc(activeItem.title)}</span>`
        : `<span class="faint">Type to search your workspace</span>`;
    }
  }

  scheduleGliderUpdate(activeIdx);
}

function scheduleGliderUpdate(activeIdx) {
  if (typeof window === 'undefined') return;
  requestAnimationFrame(() => {
    updateGliderPosition(activeIdx);
  });
}

export function updateGliderPosition(activeIdx) {
  const list = document.getElementById('raycast-results-list');
  const glider = document.getElementById('raycast-glider');
  const target = document.getElementById(`raycast-item-${activeIdx}`);
  if (!list || !glider || !target) {
    if (glider) glider.style.opacity = '0';
    return;
  }

  const listRect = list.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const top = targetRect.top - listRect.top + list.scrollTop;
  const height = targetRect.height;

  glider.style.transform = `translateY(${top}px)`;
  glider.style.height = `${height}px`;
  glider.style.opacity = '1';
}

/**
 * Mouse drag & edge resize handler initialization
 */
let isResizeInitialized = false;
export function initResizeAndDragHandlers() {
  if (isResizeInitialized || typeof window === 'undefined') return;
  isResizeInitialized = true;

  let isResizing = false;
  let resizeType = null;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;

  document.addEventListener('mousedown', (e) => {
    const handle = e.target.closest('[data-resize]');
    if (handle) {
      e.preventDefault();
      e.stopPropagation();
      isResizing = true;
      resizeType = handle.dataset.resize;
      startX = e.screenX;
      startY = e.screenY;

      const container = document.getElementById('raycast-container-box');
      startWidth = container ? container.offsetWidth : 640;
      startHeight = container ? container.offsetHeight : 480;

      document.body.style.userSelect = 'none';
      return;
    }

    // Native window drag via header
    const header = e.target.closest('[data-tauri-drag-region]');
    const isInteractive = e.target.closest('input, button, [data-a]');
    if (header && !isInteractive) {
      if (window.__TAURI__?.core?.invoke) {
        window.__TAURI__.core.invoke('start_spotlight_drag').catch(() => {});
      }
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    let newWidth = startWidth;
    let newHeight = startHeight;

    const deltaX = e.screenX - startX;
    const deltaY = e.screenY - startY;

    if (resizeType.includes('r')) {
      newWidth = Math.max(440, Math.min(1200, startWidth + deltaX));
    } else if (resizeType.includes('l')) {
      newWidth = Math.max(440, Math.min(1200, startWidth - deltaX));
    }

    if (resizeType.includes('b')) {
      newHeight = Math.max(300, Math.min(850, startHeight + deltaY));
    } else if (resizeType.includes('t')) {
      newHeight = Math.max(300, Math.min(850, startHeight - deltaY));
    }

    const container = document.getElementById('raycast-container-box');
    if (container) {
      container.style.width = `${newWidth}px`;
      container.style.height = `${newHeight}px`;
    }

    // Resize native Tauri spotlight window if available
    if (window.__TAURI__?.core?.invoke) {
      window.__TAURI__.core.invoke('resize_spotlight', {
        width: newWidth,
        height: newHeight,
      }).catch(() => {});
    }
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.userSelect = '';
      const list = document.getElementById('raycast-results-list');
      if (list) updateGliderPosition(S.ui.raycastIdx || 0);
    }
  });
}

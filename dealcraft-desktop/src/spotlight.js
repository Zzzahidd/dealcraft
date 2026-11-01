/* ============================================================
   STANDALONE RAYCAST SPOTLIGHT LAUNCHER (DESKTOP WINDOW)
   Direct, Zero-Scrim, Frameless, Pure Application UI
   ============================================================ */

import './styles/index.css';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { esc } from './core/utils.js';
import { ic } from './core/icons.js';
import { S, STORE_KEY } from './core/store.js';
import { applyPrefs } from './core/theme.js';
import { getRaycastResults, renderResultsListHTML } from './overlays/raycast.js';

let query = '';
let activeIdx = 0;
let results = [];

const root = document.getElementById('spotlight-root');

function syncThemeAndData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const j = JSON.parse(raw);
      if (j && j.prefs) {
        Object.assign(S.prefs, j.prefs);
      }
      if (j && j.data) {
        S.data = j.data;
      }
    }
  } catch (err) {
    console.warn('[Spotlight] sync error:', err);
  }
  applyPrefs();
}

function renderApp() {
  results = getRaycastResults(query);
  if (activeIdx >= results.length) activeIdx = Math.max(0, results.length - 1);
  const activeItem = results[activeIdx] || results[0];

  root.innerHTML = `
    <div
      class="raycast-container standalone"
      role="dialog"
      aria-modal="true"
      aria-label="Workspace Search"
      id="raycast-container-box"
    >
      <!-- Resize Grips (Around Edges & Corners for Mouse Cursor Resizing & Aspect Ratio) -->
      <div class="raycast-resize-handle handle-r" data-resize="r" title="Drag to resize width"></div>
      <div class="raycast-resize-handle handle-b" data-resize="b" title="Drag to resize height"></div>
      <div class="raycast-resize-handle handle-l" data-resize="l" title="Drag to resize width"></div>
      <div class="raycast-resize-handle handle-t" data-resize="t" title="Drag to resize height"></div>
      <div class="raycast-resize-handle handle-bl" data-resize="bl" title="Drag to resize aspect ratio"></div>
      <div class="raycast-resize-handle handle-tr" data-resize="tr" title="Drag to resize aspect ratio"></div>
      <div class="raycast-resize-handle handle-tl" data-resize="tl" title="Drag to resize aspect ratio"></div>
      <div class="raycast-resize-handle handle-br" data-resize="br" title="Drag with mouse to change size & aspect ratio">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="9" y1="4" x2="4" y2="9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="9" y1="7" x2="7" y2="9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Search Input Header (Draggable Region) -->
      <div class="raycast-header" data-tauri-drag-region id="raycast-header-bar">
        <span class="raycast-search-icon" data-tauri-drag-region>
          ${ic('search', 16)}
        </span>
        <input
          type="text"
          class="raycast-input"
          placeholder="Search notes, files, tasks, projects, companies..."
          value="${esc(query)}"
          autocomplete="off"
          spellcheck="false"
          autofocus
          id="raycast-main-input"
        />
        <div class="raycast-header-right">
          <kbd class="key-badge">Esc</kbd>
          <button class="ibtn ibtn-xs raycast-close-btn" id="raycast-btn-close" title="Close (Esc)" aria-label="Close search">
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
          <div class="raycast-footer-selection" data-tauri-drag-region id="raycast-footer-crumb">
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
          <span class="raycast-hint" id="raycast-btn-open-hint" style="cursor:pointer">
            <kbd class="key-badge">↵</kbd>
            <span class="hint-label">Open</span>
          </span>
          <button class="ibtn ibtn-xs raycast-footer-close" id="raycast-btn-footer-close" title="Close">
            ${ic('x', 12)}
          </button>
        </div>
      </div>
    </div>
  `;

  bindEvents();
  updateGlider();
}

function updateListOnly() {
  results = getRaycastResults(query);
  if (activeIdx >= results.length) activeIdx = Math.max(0, results.length - 1);
  const activeItem = results[activeIdx] || results[0];

  const listEl = document.getElementById('raycast-results-list');
  if (listEl) {
    listEl.innerHTML = renderResultsListHTML(results, activeIdx);
  }

  const crumbEl = document.getElementById('raycast-footer-crumb');
  if (crumbEl) {
    crumbEl.innerHTML = activeItem
      ? `<span class="raycast-footer-crumb">${esc(activeItem.category)}</span> <span class="crumb-sep">›</span> <span class="raycast-footer-title">${esc(activeItem.title)}</span>`
      : `<span class="faint">Type to search your workspace</span>`;
  }

  updateGlider();
}

function updateGlider() {
  requestAnimationFrame(() => {
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
  });
}

function scrollItemIntoView(idx) {
  const itemEl = document.getElementById(`raycast-item-${idx}`);
  const listEl = document.getElementById('raycast-results-list');
  if (!itemEl || !listEl) return;

  const itemTop = itemEl.offsetTop;
  const itemBottom = itemTop + itemEl.offsetHeight;
  const scrollCurrent = listEl.scrollTop;
  const viewHeight = listEl.clientHeight;

  if (itemTop < scrollCurrent) {
    listEl.scrollTop = itemTop;
  } else if (itemBottom > scrollCurrent + viewHeight) {
    listEl.scrollTop = itemBottom - viewHeight;
  }
}

async function executeItem(item) {
  if (!item) return;

  // Immediate smooth visual fade for spotlight container
  const box = document.getElementById('raycast-container-box');
  if (box) {
    box.style.transition = 'opacity 0.12s cubic-bezier(0.16, 1, 0.3, 1), transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)';
    box.style.opacity = '0';
    box.style.transform = 'scale(0.985) translateY(-3px)';
  }

  let payload = null;

  if (item.cmdId === 'c-task' || item.act === 'openNewTask' || item.id === 'cmd-task') {
    payload = { type: 'createTask' };
  } else if (item.act === 'openNewNoteModal' || item.id === 'cmd-create-note') {
    payload = { type: 'createNote' };
  } else if (item.taskId) {
    payload = { type: 'openTask', id: item.taskId, title: item.title };
  } else if (item.noteId) {
    payload = { type: 'openNote', id: item.noteId, title: item.title };
  } else if (item.fileObj) {
    payload = { type: 'openFile', id: item.fileObj.id, projectId: item.fileObj.project, title: item.title };
  } else if (item.companyId) {
    payload = { type: 'openCompany', id: item.companyId, title: item.title };
  } else if (item.projectId) {
    payload = { type: 'openProject', id: item.projectId, title: item.title };
  } else if (item.cmdId) {
    payload = { type: 'runCommand', id: item.cmdId, route: item.cmdObj?.route };
  }

  if (payload) {
    try {
      await invoke('open_main_window', {
        route: null,
        payload: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('[Spotlight] invoke open_main_window error:', err);
    }
  }
}

async function openFullAppDirect() {
  const box = document.getElementById('raycast-container-box');
  if (box) {
    box.style.transition = 'opacity 0.12s cubic-bezier(0.16, 1, 0.3, 1), transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)';
    box.style.opacity = '0';
    box.style.transform = 'scale(0.985) translateY(-3px)';
  }
  try {
    await invoke('open_main_window', {
      route: null,
      payload: null,
    });
  } catch (err) {
    console.warn('[Spotlight] invoke open_main_window error:', err);
  }
}

async function closeSpotlight() {
  try {
    await invoke('hide_spotlight');
  } catch (err) {
    console.warn('[Spotlight] invoke hide_spotlight error:', err);
  }
}

function bindEvents() {
  const inp = document.getElementById('raycast-main-input');
  if (inp) {
    inp.addEventListener('input', () => {
      query = inp.value || '';
      activeIdx = 0;
      updateListOnly();
    });
  }

  // Click on results list items
  const listEl = document.getElementById('raycast-results-list');
  if (listEl) {
    listEl.addEventListener('click', (e) => {
      const itemEl = e.target.closest('.raycast-item');
      if (itemEl && itemEl.dataset.idx != null) {
        const idx = Number(itemEl.dataset.idx);
        const item = results[idx];
        if (item) executeItem(item);
      }
    });
  }

  // Close buttons
  const closeBtn = document.getElementById('raycast-btn-close');
  if (closeBtn) closeBtn.addEventListener('click', closeSpotlight);

  const footerCloseBtn = document.getElementById('raycast-btn-footer-close');
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeSpotlight);

  // Open hint click
  const openHintBtn = document.getElementById('raycast-btn-open-hint');
  if (openHintBtn) {
    openHintBtn.addEventListener('click', () => {
      if (results[activeIdx]) {
        executeItem(results[activeIdx]);
      } else {
        openFullAppDirect();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSpotlight();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        activeIdx = (activeIdx + 1) % results.length;
        updateListOnly();
        scrollItemIntoView(activeIdx);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        activeIdx = (activeIdx - 1 + results.length) % results.length;
        updateListOnly();
        scrollItemIntoView(activeIdx);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        openFullAppDirect();
        return;
      }
      if (results[activeIdx]) {
        executeItem(results[activeIdx]);
      } else {
        openFullAppDirect();
      }
      return;
    }
  });

  // Full Mouse Window Dragging & Real-Time Aspect Ratio Resizing
  let isResizing = false;
  let activeDir = null;
  let startX = 0;
  let startY = 0;
  let startW = 0;
  let startH = 0;
  let activeHandle = null;

  document.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return; // Left mouse click only

    // 1. Mouse Resize Handles (Aspect Ratio & Window Sizing)
    const handle = e.target.closest('[data-resize]');
    if (handle) {
      e.preventDefault();
      e.stopPropagation();
      isResizing = true;
      activeDir = handle.dataset.resize;
      activeHandle = handle;
      startX = e.screenX;
      startY = e.screenY;
      startW = window.innerWidth;
      startH = window.innerHeight;

      try {
        handle.setPointerCapture(e.pointerId);
      } catch {}

      document.body.style.userSelect = 'none';
      document.body.style.cursor = window.getComputedStyle(handle).cursor;
      return;
    }

    // 2. Mouse Window Dragging (Header, Footer, Non-interactive areas)
    const dragRegion = e.target.closest('[data-tauri-drag-region]');
    const isInteractive = e.target.closest('input, button, kbd, .ibtn, [data-resize]');
    if (dragRegion && !isInteractive) {
      invoke('start_spotlight_drag').catch(() => {});
    }
  });

  document.addEventListener('pointermove', (e) => {
    if (!isResizing || !activeDir) return;
    e.preventDefault();

    const dx = e.screenX - startX;
    const dy = e.screenY - startY;

    let newW = startW;
    let newH = startH;

    if (activeDir.includes('r')) {
      newW = Math.max(440, Math.min(1800, startW + dx));
    } else if (activeDir.includes('l')) {
      newW = Math.max(440, Math.min(1800, startW - dx));
    }

    if (activeDir.includes('b')) {
      newH = Math.max(300, Math.min(1200, startH + dy));
    } else if (activeDir.includes('t')) {
      newH = Math.max(300, Math.min(1200, startH - dy));
    }

    invoke('resize_spotlight', {
      width: Math.round(newW),
      height: Math.round(newH),
    }).catch(() => {});
  });

  const endResize = (e) => {
    if (isResizing) {
      isResizing = false;
      activeDir = null;
      if (activeHandle) {
        try {
          activeHandle.releasePointerCapture(e.pointerId);
        } catch {}
        activeHandle = null;
      }
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  };

  document.addEventListener('pointerup', endResize);
  document.addEventListener('pointercancel', endResize);
}

// Listen for Tauri native hotkey trigger
try {
  listen('spotlight-show', () => {
    syncThemeAndData();
    const box = document.getElementById('raycast-container-box');
    if (box) {
      box.style.transition = 'none';
      box.style.opacity = '1';
      box.style.transform = 'none';
    }
    query = '';
    activeIdx = 0;
    const inp = document.getElementById('raycast-main-input');
    if (inp) {
      inp.value = '';
      requestAnimationFrame(() => inp.focus());
    }
    updateListOnly();
  });
} catch (err) {
  console.warn('[Spotlight] listen error:', err);
}

// Real-time theme sync across windows
try {
  listen('theme-changed', (event) => {
    if (event.payload) {
      Object.assign(S.prefs, event.payload);
      applyPrefs();
    }
  });
} catch (err) {
  console.warn('[Spotlight] theme listen error:', err);
}

// Storage listener for cross-window data / theme sync
window.addEventListener('storage', (e) => {
  if (e.key === STORE_KEY) {
    syncThemeAndData();
    updateListOnly();
  }
});

// OS color scheme listener for system theme mode
try {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (S.prefs.theme === 'system') {
      applyPrefs();
    }
  });
} catch {}

// Initialize on boot with synced theme & data
syncThemeAndData();
renderApp();
const firstInp = document.getElementById('raycast-main-input');
if (firstInp) firstInp.focus();

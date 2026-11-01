/* ---------- CRM & Raycast Actions Module ---------- */
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { A, IN, confirmDlg } from './actions.js';
import { D, S, save, task } from '../core/store.js';
import { go, render } from '../shell/render.js';
import { toast } from '../ui/toast.js';
import { openModal, closeModal } from '../overlays/modals.js';
import { isSpotlightWindow } from '../core/utils.js';
import { getRaycastResults, updateGliderPosition, updateRaycastDOM } from '../overlays/raycast.js';
import { ALL_OWNERS, ANY_STAGE, formatMoney } from '../data/companies.js';
import { getNotes, createNote, deleteNote, updateNote } from '../data/notes.js';

/**
 * Open Full Application (Raycast reverse engineering feature)
 * Focuses and brings the main window forward.
 */
export function openFullApp(targetRoute = null, targetParams = {}) {
  // If running inside Tauri desktop app
  if (window.__TAURI__?.core?.invoke) {
    try {
      window.__TAURI__.core.invoke('open_main_window', {
        route: targetRoute || null,
      });
    } catch (e) {
      console.warn('[Desktop] invoke open_main_window error:', e);
    }
  }

  // Ensure window gets focus
  window.focus();

  // Close the raycast spotlight bar
  S.ui.raycastOpen = false;

  if (targetRoute) {
    go(targetRoute, targetParams);
  } else {
    render();
  }
}

/* ============================================================
   CRM ACTIONS
   ============================================================ */
A.openCompanyDrawer = (el) => {
  const row = el.closest('[data-id]');
  const id = row?.dataset.id;
  if (id) {
    S.ui.companyDrawer = id;
    S.ui.companyTab = 'overview';
    render();
  }
};

A.closeCompanyDrawer = () => {
  S.ui.companyDrawer = null;
  render();
};

A.setCompanyTab = (el) => {
  S.ui.companyTab = el.dataset.tab || 'overview';
  render();
};

A.newCompanyModal = () => {
  S.ui.raycastOpen = false;
  openModal({ type: 'company' });
};

A.closeNewCompanyModal = () => {
  closeModal();
  S.ui.newCompanyOpen = false;
};

A.newTaskForCompany = (el) => {
  const companyId = el?.dataset?.id || S.ui.companyDrawer;
  const c = D().companies?.find(item => item.id === companyId);
  const companyName = c ? c.name : 'Account';
  A.newTask();
  if (S.ui.form) {
    S.ui.form.title = `Follow up with ${companyName}`;
    S.ui.form.desc = `Action item regarding ${companyName} sales pipeline and contract discussion.`;
    render();
  }
};

A.deleteCompany = (el, e) => {
  if (e && e.stopPropagation) e.stopPropagation();
  const id = el?.dataset?.id || S.ui.companyDrawer;
  if (!id) return;
  const d = D();
  const c = d.companies?.find((item) => item.id === id);
  const name = c ? c.name : 'this company';
  confirmDlg({
    title: `Delete ${name}?`,
    body: `This account, its associated pipeline deals, and scorecards will be permanently removed.`,
    ok: 'Delete Account',
    danger: true,
    icon: 'trash-2',
    run: () => {
      d.companies = (d.companies || []).filter((item) => item.id !== id);
      if (S.ui.companyDrawer === id) {
        S.ui.companyDrawer = null;
      }
      if (S.ui.selectedCompanies) {
        S.ui.selectedCompanies.delete(id);
      }
      toast(`Deleted account for ${name}`);
      save();
      render();
    },
  });
};

A.deleteNote = (el, e) => {
  if (e && e.stopPropagation) e.stopPropagation();
  const id = el?.dataset?.id || S.ui.noteDrawer;
  if (!id || id === '__new__') {
    S.ui.noteDrawer = null;
    S.ui.noteDrawerEdit = false;
    S.ui.noteDrawerFull = false;
    render();
    return;
  }
  const n = getNote(id);
  const title = n ? n.title : 'this note';
  confirmDlg({
    title: `Delete "${title}"?`,
    body: 'This note will be permanently removed from the workspace. This action cannot be undone.',
    ok: 'Delete Note',
    danger: true,
    icon: 'trash-2',
    run: () => {
      deleteNote(id);
      if (S.ui.noteDrawer === id) {
        S.ui.noteDrawer = null;
        S.ui.noteDrawerEdit = false;
        S.ui.noteDrawerFull = false;
      }
      toast(`Deleted note: "${title}"`);
      render();
    },
  });
};
A.deleteNoteModal = A.deleteNote;

A.toggleSelectCompany = (el) => {
  const id = el.dataset.id;
  if (!id) return;
  if (!S.ui.selectedCompanies) S.ui.selectedCompanies = new Set();

  if (S.ui.selectedCompanies.has(id)) {
    S.ui.selectedCompanies.delete(id);
  } else {
    S.ui.selectedCompanies.add(id);
  }
  render();
};

A.toggleSelectAllCompanies = () => {
  const all = D().companies || [];
  if (!S.ui.selectedCompanies) S.ui.selectedCompanies = new Set();

  if (S.ui.selectedCompanies.size === all.length) {
    S.ui.selectedCompanies.clear();
  } else {
    S.ui.selectedCompanies = new Set(all.map((c) => c.id));
  }
  render();
};

A.clearCompanySearch = () => {
  S.ui.companySearch = '';
  render();
};

A.exportCompaniesCSV = () => {
  const companies = D().companies || [];
  const headers = ['ID', 'Name', 'Domain', 'Tags', 'Owner', 'Deals', 'Pipeline Value', 'Win Probability'];
  const rows = companies.map((c) => [
    c.id,
    `"${c.name}"`,
    c.domain || '',
    `"${(c.tags || []).join(';')}"`,
    `"${c.owner || ''}"`,
    c.openDeals || 0,
    c.pipelineValue || 0,
    `${c.winProbability || 0}%`,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `dealcraft_crm_companies_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast('Exported companies to CSV');
};

/* ============================================================
   CRM FORM & INPUT HANDLERS
   ============================================================ */
IN.companySearch = (el) => {
  S.ui.companySearch = el.value || '';
  render();
};

IN.companyStage = (el) => {
  S.ui.companyStage = el.value || ANY_STAGE;
  render();
};

IN.companyOwner = (el) => {
  S.ui.companyOwner = el.value || ALL_OWNERS;
  render();
};

IN.companySort = (el) => {
  S.ui.companySort = el.value || 'pipelineValue';
  render();
};

IN.updateCompanyOwner = (el) => {
  const id = el.dataset.id;
  const newOwner = el.value;
  const c = D().companies?.find((item) => item.id === id);
  if (c) {
    c.owner = newOwner;
    toast(`Account executive updated to ${newOwner}`);
    save();
    render();
  }
};

IN.updateCompanyNotes = (el) => {
  const id = el.dataset.id;
  const notes = el.value;
  const c = D().companies?.find((item) => item.id === id);
  if (c) {
    c.notes = notes;
    save();
  }
};

A.submitNewCompany = (formEl) => {
  const form = formEl && formEl.tagName === 'FORM' ? formEl : document.getElementById('new-company-form');
  if (!form) return;

  const formData = new FormData(form);
  const name = formData.get('name')?.trim();
  if (!name) {
    toast('Please enter a company name', { kind: 'error' });
    return;
  }

  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const domain = formData.get('domain')?.trim() || `${id}.com`;
  const segment = formData.get('segment') || 'Mid-Market';
  const stage = formData.get('stage') || 'New Logo';
  const owner = formData.get('owner') || 'Sarah Nguyen';
  const pipelineValue = Number(formData.get('pipelineValue')) || 100000;
  const winProbability = Number(formData.get('winProbability')) || 50;

  const newCompany = {
    id,
    name,
    domain,
    tags: [segment, stage],
    owner,
    openDeals: 1,
    pipelineValue,
    winProbability,
    trend: [4, 4, 5, 5, 2, 7, 11, 7, 5, 7, 5, 3, 7, 14],
    lastInteraction: { date: new Date().toISOString().slice(0, 10), label: 'Created' },
    activityDays: 0,
    logo: `/assets/images/companies/logos/${id}.svg`,
    industry: 'Enterprise Software',
    employees: '50-500',
    country: 'United States',
  };

  if (!D().companies) D().companies = [];
  D().companies.unshift(newCompany);

  closeModal();
  S.ui.newCompanyOpen = false;
  S.ui.companyDrawer = id;
  toast(`Created account for ${name}`);
  save();
  render();
};

document.addEventListener('submit', (e) => {
  const form = e.target.closest('#new-company-form');
  if (form) {
    e.preventDefault();
    A.submitNewCompany(form);
  }
});

/* ============================================================
   WORKSPACE SPOTLIGHT ACTIONS (NATIVE TO APP)
   ============================================================ */
export function openInMainApp(payload) {
  S.ui.raycastOpen = false;

  if (!isSpotlightWindow) {
    handleWorkspaceAction(payload);
  }

  try {
    invoke('open_main_window', {
      route: null,
      payload: JSON.stringify(payload),
    }).catch((err) => {
      console.warn('[Desktop] open_main_window error:', err);
    });
  } catch (err) {
    console.warn('[Desktop] invoke error:', err);
  }
}

export function handleWorkspaceAction(payload) {
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {}
  }
  if (!payload) return;

  // Immediately close any in-app raycast overlay so it never lingers
  S.ui.raycastOpen = false;

  if (payload.type === 'openTask') {
    const t = task(payload.id);
    const targetRoute = t && t.project ? 'project' : 'tasks';
    const targetParams = t && t.project ? { id: t.project, tab: 'board' } : {};

    // Single atomic state update to prevent any intermediate render or jitter
    S.ui.route = targetRoute;
    S.ui.params = targetParams;
    S.ui.mnav = false;
    S.ui.sel.clear();
    S.ui.pop = null;
    S.ui.composer = null;
    S.ui.editCell = null;
    S.ui.modals = [];
    S.ui.companyDrawer = null;
    S.ui.noteDrawer = null;
    S.ui.drawer = payload.id;
    S.ui.drawerFull = false;
    S.ui.drawerTab = 'comments';
    S.ui.fx = {}; // Calm, stable render - zero staggered jitter

    render();
    return;
  }

  if (payload.type === 'openNote') {
    // Open in clean slide-over Note Drawer directly - zero center modal, zero delete prompt!
    S.ui.modals = [];
    S.ui.drawer = null;
    S.ui.companyDrawer = null;
    S.ui.noteDrawer = payload.id;
    S.ui.noteDrawerEdit = false;
    S.ui.noteDrawerFull = false;
    S.ui.fx = {};

    render();
    return;
  }

  if (payload.type === 'createNote') {
    // Open Note Drawer smoothly in creation mode - butter-smooth transition
    S.ui.modals = [];
    S.ui.drawer = null;
    S.ui.companyDrawer = null;
    S.ui.noteDrawer = '__new__';
    S.ui.noteDrawerEdit = true;
    S.ui.noteDrawerFull = false;
    S.ui.fx = {};

    render();
    requestAnimationFrame(() => {
      document.getElementById('nd-edit-title')?.focus({ preventScroll: true });
    });
    return;
  }

  if (payload.type === 'createTask') {
    // Atomic state update: route to tasks + open task form modal in ONE render pass (no flicker!)
    S.ui.route = 'tasks';
    S.ui.params = {};
    S.ui.mnav = false;
    S.ui.sel.clear();
    S.ui.pop = null;
    S.ui.composer = null;
    S.ui.editCell = null;
    S.ui.drawer = null;
    S.ui.noteDrawer = null;
    S.ui.companyDrawer = null;

    S.ui.form = {
      title: payload.title || '',
      desc: '',
      project: 'p1',
      status: 'todo',
      assignee: D().me,
      priority: 'medium',
      due: null,
      start: null,
      labels: [],
      subtasks: [],
      files: [],
      recur: null,
      more: false,
    };
    S.ui.errors = {};
    S.ui.modalOpeners = [];
    S.ui.modals = [{ type: 'task' }];
    S.ui.fx = {}; // No layout shifts

    render();
    requestAnimationFrame(() => {
      document.getElementById('f-title')?.focus({ preventScroll: true });
    });
    return;
  }

  if (payload.type === 'openFile') {
    S.ui.modals = [];
    S.ui.drawer = null;
    S.ui.noteDrawer = null;
    S.ui.companyDrawer = null;
    S.ui.route = 'project';
    S.ui.params = { id: payload.projectId || 'p1', tab: 'files' };
    S.ui.mnav = false;
    S.ui.sel.clear();
    S.ui.pop = null;
    S.ui.composer = null;
    S.ui.editCell = null;
    S.ui.fx = {}; // Zero staggered jitter

    render();
    return;
  }

  if (payload.type === 'openCompany') {
    S.ui.route = 'companies';
    S.ui.params = {};
    S.ui.mnav = false;
    S.ui.sel.clear();
    S.ui.pop = null;
    S.ui.composer = null;
    S.ui.editCell = null;
    S.ui.drawer = null;
    S.ui.noteDrawer = null;
    S.ui.modals = [];
    S.ui.companyDrawer = payload.id;
    S.ui.companyTab = 'overview';
    S.ui.fx = {};

    render();
    return;
  }

  if (payload.type === 'openProject') {
    S.ui.modals = [];
    S.ui.drawer = null;
    S.ui.noteDrawer = null;
    S.ui.companyDrawer = null;
    S.ui.route = 'project';
    S.ui.params = { id: payload.id, tab: 'board' };
    S.ui.mnav = false;
    S.ui.sel.clear();
    S.ui.pop = null;
    S.ui.composer = null;
    S.ui.editCell = null;
    S.ui.fx = {};

    render();
    return;
  }

  if (payload.type === 'runCommand') {
    if (payload.id === 'c-task') {
      handleWorkspaceAction({ type: 'createTask' });
      return;
    }
    if (payload.id === 'c-proj') {
      A.newProject();
      return;
    }
    if (payload.id === 'c-dark') {
      A.toggleDark();
      return;
    }
    if (payload.id === 'c-set') {
      go('settings');
      return;
    }
    if (payload.id === 'c-home') {
      go('home');
      return;
    }
    if (payload.id === 'c-inbox') {
      go('inbox');
      return;
    }
    if (payload.id === 'c-my') {
      go('mytasks');
      return;
    }
    if (payload.id === 'c-projs') {
      go('projects');
      return;
    }
    if (payload.id === 'c-notes') {
      go('notes');
      return;
    }
    if (payload.id === 'c-cal') {
      go('calendar');
      return;
    }
    if (payload.route) {
      go(payload.route);
      return;
    }
  }

  if (payload.route) {
    go(payload.route);
  }
}

A.openRaycast = () => {
  if (window.__TAURI__?.core?.invoke) {
    if (S.ui.raycastOpen) {
      S.ui.raycastOpen = false;
      render();
    }
    invoke('toggle_spotlight').catch(() => {
      S.ui.raycastOpen = true;
      S.ui.raycastQ = '';
      S.ui.raycastIdx = 0;
      render();
      focusRaycastInput();
    });
    return;
  }
  S.ui.raycastOpen = true;
  S.ui.raycastQ = '';
  S.ui.raycastIdx = 0;
  render();
  focusRaycastInput();
};

export function focusRaycastInput() {
  requestAnimationFrame(() => {
    const inp = document.getElementById('raycast-main-input');
    if (inp) {
      inp.focus();
    }
  });
  setTimeout(() => {
    const inp = document.getElementById('raycast-main-input');
    if (inp && document.activeElement !== inp) {
      inp.focus();
    }
  }, 40);
}

A.closeRaycast = () => {
  S.ui.raycastOpen = false;
  try {
    invoke('hide_spotlight').catch(() => {});
  } catch {}
  render();
};

A.closeRaycastIfScrim = (el, e) => {
  if (e && e.target && e.target.classList.contains('raycast-scrim')) {
    A.closeRaycast();
  }
};

A.clearRaycastQ = () => {
  S.ui.raycastQ = '';
  S.ui.raycastIdx = 0;
  const inp = document.getElementById('raycast-main-input');
  if (inp) inp.value = '';
  updateRaycastDOM();
  focusRaycastInput();
};

A.executeActiveRaycastItem = () => {
  const results = getRaycastResults(S.ui.raycastQ || '');
  const activeItem = results[S.ui.raycastIdx || 0];
  if (activeItem) {
    executeItem(activeItem);
  }
};

A.openFullApp = () => {
  openFullApp();
};

A.executeRaycastItem = (el) => {
  const results = getRaycastResults(S.ui.raycastQ || '');
  const idx = Number(el.dataset.idx);
  const item = results[idx] || results.find((r) => r.id === el.dataset.id);
  if (!item) return;

  executeItem(item);
};

/* ============================================================
   NOTE DRAWER & NOTES PAGE ACTIONS
   Smooth slide-over panel, Zero center modal, Zero delete prompts
   ============================================================ */
A.closeNoteDrawer = () => {
  S.ui.noteDrawer = null;
  S.ui.noteDrawerEdit = false;
  S.ui.noteDrawerFull = false;
  render();
};

A.toggleNoteDrawerFull = () => {
  S.ui.noteDrawerFull = !S.ui.noteDrawerFull;
  render();
};

A.openNewNoteDrawer = () => {
  S.ui.noteDrawer = '__new__';
  S.ui.noteDrawerEdit = true;
  S.ui.noteDrawerFull = false;
  S.ui.fx = { drawer: true };
  render();
  setTimeout(() => {
    document.getElementById('nd-edit-title')?.focus();
  }, 40);
};

A.editNoteInDrawer = () => {
  S.ui.noteDrawerEdit = true;
  render();
  setTimeout(() => {
    document.getElementById('nd-edit-title')?.focus();
  }, 40);
};

A.cancelEditNoteInDrawer = () => {
  if (S.ui.noteDrawer === '__new__') {
    S.ui.noteDrawer = null;
  }
  S.ui.noteDrawerEdit = false;
  S.ui.noteDrawerFull = false;
  render();
};

A.saveNoteFromDrawer = (el, e) => {
  if (e && e.preventDefault) e.preventDefault();
  const idEl = document.getElementById('nd-edit-id');
  const titleEl = document.getElementById('nd-edit-title');
  const catEl = document.getElementById('nd-edit-cat');
  const tagsEl = document.getElementById('nd-edit-tags');
  const contentEl = document.getElementById('nd-edit-content');

  const title = titleEl?.value?.trim();
  if (!title) {
    toast('Please enter a note title');
    return;
  }
  const category = catEl?.value?.trim() || 'General';
  const tags = tagsEl?.value ? tagsEl.value.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean) : [];
  const content = contentEl?.value || '';

  const id = idEl?.value;
  if (id && id !== '__new__') {
    updateNote(id, { title, category, tags, content });
    S.ui.noteDrawer = id;
    S.ui.noteDrawerEdit = false;
    toast(`Saved note: "${title}"`);
  } else {
    const created = createNote({ title, category, tags, content });
    S.ui.noteDrawer = created.id;
    S.ui.noteDrawerEdit = false;
    toast(`Created note: "${title}"`);
  }
  render();
};

A.togglePinNote = (el) => {
  const id = el?.dataset?.id;
  if (!id) return;
  const n = getNote(id);
  if (n) {
    const newPinned = !n.pinned;
    updateNote(id, { pinned: newPinned });
    toast(newPinned ? 'Note pinned' : 'Note unpinned');
    render();
  }
};

A.openTaskFromNote = (el) => {
  const id = el?.dataset?.id;
  if (id) {
    S.ui.noteDrawer = null;
    handleWorkspaceAction({ type: 'openTask', id });
  }
};

A.openNoteFromGrid = (el) => {
  const id = el?.dataset?.id;
  if (id) {
    S.ui.noteDrawer = id;
    S.ui.noteDrawerEdit = false;
    S.ui.noteDrawerFull = false;
    S.ui.fx = { drawer: true };
    render();
  }
};

A.setNotesCategory = (el) => {
  S.ui.notesCategoryFilter = el.dataset.cat || 'All';
  render();
};

IN.notesSearch = (el) => {
  S.ui.notesSearchQuery = el.value || '';
  render();
};

A.openNewNoteModal = () => {
  handleWorkspaceAction({ type: 'createNote' });
};

A.copyNoteContent = (el) => {
  const id = el?.dataset?.id;
  const n = id ? getNote(id) : null;
  if (n && n.content) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(n.content).catch(() => {});
    }
    toast('Note content copied to clipboard');
  }
};

function executeItem(item) {
  if (!item) return;

  // Workspace Command / Action
  if (item.cmdId === 'c-task' || item.act === 'openNewTask') {
    openInMainApp({ type: 'createTask' });
    return;
  }

  if (item.act === 'openNewNoteModal') {
    openInMainApp({ type: 'createNote' });
    return;
  }

  if (item.cmdId) {
    openInMainApp({ type: 'runCommand', id: item.cmdId, route: item.cmdObj?.route });
    return;
  }

  // Note Selection
  if (item.noteId) {
    openInMainApp({ type: 'openNote', id: item.noteId, title: item.title });
    return;
  }

  // File Selection
  if (item.fileObj) {
    openInMainApp({ type: 'openFile', id: item.fileObj.id, projectId: item.fileObj.project, title: item.title });
    return;
  }

  // Company Selection
  if (item.companyId) {
    openInMainApp({ type: 'openCompany', id: item.companyId, title: item.title });
    return;
  }

  // Task Selection
  if (item.taskId) {
    openInMainApp({ type: 'openTask', id: item.taskId, title: item.title });
    return;
  }

  // Project Selection
  if (item.projectId) {
    openInMainApp({ type: 'openProject', id: item.projectId, title: item.title });
    return;
  }

  if (item.act && A[item.act]) {
    S.ui.raycastOpen = false;
    A[item.act](item);
  }
}

IN.raycastSearch = (el) => {
  S.ui.raycastQ = el.value || '';
  S.ui.raycastIdx = 0;
  // Update results in-place without destroying the input element!
  updateRaycastDOM();
};

/* ============================================================
   GLOBAL KEYBOARD HANDLERS FOR RAYCAST
   Ctrl+Space and Alt+Space (Global OS + in-app)
   ============================================================ */
// Listen for Tauri native global OS hotkey events & cross-window navigation
try {
  listen('spotlight-show', () => {
    // When the native standalone spotlight window opens, ensure any in-app overlay in the main window is closed
    if (S.ui.raycastOpen) {
      S.ui.raycastOpen = false;
      render();
    }
  });

  listen('toggle-raycast', () => {
    if (S.ui.raycastOpen) {
      A.closeRaycast();
    } else {
      A.openRaycast();
    }
  });

  listen('workspace-action', (event) => {
    handleWorkspaceAction(event.payload);
  });

  listen('navigate-to', (event) => {
    if (event.payload) go(event.payload);
  });
} catch (err) {
  console.warn('[Tauri] spotlight listener error:', err);
}

window.addEventListener('keydown', (e) => {
  const isSpace = e.code === 'Space' || e.key === ' ' || e.keyCode === 32;
  const isCtrl = e.ctrlKey || e.metaKey;
  const isAlt = e.altKey;

  // Intercept Ctrl+Space or Alt+Space
  if (isSpace && (isCtrl || isAlt)) {
    e.preventDefault();
    e.stopPropagation();

    // If running in Tauri desktop environment:
    if (window.__TAURI__?.core?.invoke) {
      if (S.ui.raycastOpen) {
        A.closeRaycast();
      }
      invoke('toggle_spotlight').catch(() => {
        if (S.ui.raycastOpen) {
          A.closeRaycast();
        } else {
          A.openRaycast();
        }
      });
      return;
    }

    if (S.ui.raycastOpen) {
      A.closeRaycast();
    } else {
      A.openRaycast();
    }
    return;
  }

  // When Spotlight is open
  if (S.ui.raycastOpen) {
    const results = getRaycastResults(S.ui.raycastQ || '');

    // Escape closes Spotlight
    if (e.key === 'Escape') {
      e.preventDefault();
      A.closeRaycast();
      return;
    }

    // Arrow Down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        S.ui.raycastIdx = ((S.ui.raycastIdx || 0) + 1) % results.length;
        updateRaycastDOM();
        scrollRaycastItemIntoView(S.ui.raycastIdx);
      }
      return;
    }

    // Arrow Up
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        S.ui.raycastIdx = ((S.ui.raycastIdx || 0) - 1 + results.length) % results.length;
        updateRaycastDOM();
        scrollRaycastItemIntoView(S.ui.raycastIdx);
      }
      return;
    }

    // Enter or Ctrl+Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        openFullApp();
        return;
      }
      const activeItem = results[S.ui.raycastIdx || 0];
      if (activeItem) {
        executeItem(activeItem);
      } else {
        openFullApp();
      }
      return;
    }
  }
});

function scrollRaycastItemIntoView(index) {
  const list = document.getElementById('raycast-results-list');
  const item = document.getElementById(`raycast-item-${index}`);
  if (list && item) {
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;

    if (itemTop < viewTop) {
      list.scrollTop = Math.max(0, itemTop - 4);
    } else if (itemBottom > viewBottom) {
      list.scrollTop = itemBottom - list.clientHeight + 4;
    }
  }
}

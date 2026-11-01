/* ---------------- MODALS ---------------- */
import { $$, MOD, ago, esc, fmtDate } from '../core/utils.js';
import { ic } from '../core/icons.js';
import { PCOLORS, PICONS } from '../core/constants.js';
import { D, S, mem, pColor, proj, task, teamsList } from '../core/store.js';
import { FT, av, filePrev, lbl, prPill, stPill } from '../ui/helpers.js';
import { focusKey, render } from '../shell/render.js';
import { teamModal } from '../features/teams.js';
import { getNote } from '../data/notes.js';
import { OWNERS, SEGMENTS, STAGES } from '../data/companies.js';

export function openModal(m) {
  S.ui.modalOpeners = S.ui.modalOpeners || [];
  S.ui.modalOpeners[S.ui.modals.length] = S.ui.popOpener && S.ui.pop ? S.ui.popOpener : focusKey(document.activeElement);
  S.ui.modals.push(m);
  S.ui.pop = null;
  render();
  setTimeout(() => {
    const all = $$('.modal');
    const last = all[all.length - 1];
    const af = last?.querySelector('[autofocus]');
    (af || last?.querySelector('input,textarea,button'))?.focus();
  }, 30);
}
export function closeModal() {
  S.ui.modals.pop();
  S.ui.pop = null;
  render();
}
export function modalHtml(m) {
  const H = (title, sub = '') =>
    `<div class="modal-h"><div><h2 id="mt-${m.type}">${title}</h2>${sub ? `<div class="muted" style="font-size:12.5px;margin-top:2px">${sub}</div>` : ''}</div><button class="ibtn ibtn-sm" data-a="closeModal" aria-label="Close">${ic('x', 16)}</button></div>`;
  const wrap = (cls, inner) => `<div class="modal ${cls}" role="dialog" aria-modal="true" aria-labelledby="mt-${m.type}">${inner}</div>`;
  switch (m.type) {
    case 'task':
      return wrap('', taskModal(m, H));
    case 'project':
      return wrap('', projectModal(m, H));
    case 'share':
      return wrap('', shareModal(m, H));
    case 'invite':
      return wrap('', inviteModal(m, H));
    case 'confirm':
      return wrap('sm', confirmModal(m, H));
    case 'prompt':
      return wrap(
        'sm',
        `${H(m.title)}<form class="modal-b" data-submit="promptSubmit"><div class="field"><label class="label" for="prompt-in">${esc(m.label)}</label><input class="input" id="prompt-in" value="${esc(m.value || '')}" autofocus></div></form><div class="modal-f"><span class="sp"></span><button class="btn btn-secondary" data-a="closeModal">Cancel</button><button class="btn btn-primary" data-a="promptSubmit">${esc(m.ok || 'Save')}</button></div>`,
      );
    case 'shortcuts':
      return wrap('lg', shortcutsModal(H));
    case 'team':
      return wrap('', teamModal(m, H));
    case 'filePreview':
      return wrap('lg', filePreviewModal(m, H));
    case 'saveView':
      return wrap(
        'sm',
        `${H('Save view', 'Save the current filters as a tab on this project.')}<form class="modal-b" data-submit="saveViewSubmit"><div class="field"><label class="label" for="sv-name">View name</label><input class="input" id="sv-name" placeholder="e.g. Design review queue" autofocus></div><div class="field"><label class="label" for="sv-type">Layout</label><select class="select" id="sv-type"><option value="list">List</option><option value="board">Board</option><option value="table">Table</option></select></div>${m.nf ? `<div class="hint">${m.nf} filter${m.nf > 1 ? 's' : ''} will be saved with this view.</div>` : '<div class="alert info">' + ic('info', 14) + '<span>No filters are active - the view will show all tasks. You can add filters after saving.</span></div>'}</form><div class="modal-f"><span class="sp"></span><button class="btn btn-secondary" data-a="closeModal">Cancel</button><button class="btn btn-primary" data-a="saveViewSubmit">Save view</button></div>`,
      );
    case 'note':
      return wrap('md', noteModal(m, H));
    case 'company':
      return companyModal(m);
  }
  return '';
}

export function formatInlineMd(text) {
  let s = esc(text);
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
  s = s.replace(/`([^`]+)`/g, '<code class="note-code">$1</code>');
  return s;
}

export function renderMarkdown(md) {
  if (!md) return '<p class="note-p faint">No content in this note.</p>';
  const lines = md.split('\n');
  let html = [];
  let inList = false;

  for (let line of lines) {
    let l = line.trim();

    if (!l) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      continue;
    }

    // Headings
    if (l.startsWith('### ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h3 class="note-h3">${formatInlineMd(l.slice(4))}</h3>`);
      continue;
    }
    if (l.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h2 class="note-h2">${formatInlineMd(l.slice(3))}</h2>`);
      continue;
    }
    if (l.startsWith('# ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h1 class="note-h1">${formatInlineMd(l.slice(2))}</h1>`);
      continue;
    }

    // Checkboxes
    if (l.startsWith('- [x] ') || l.startsWith('- [X] ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<div class="note-check-item done">${ic('circle-check', 15)}<span>${formatInlineMd(l.slice(6))}</span></div>`);
      continue;
    }
    if (l.startsWith('- [ ] ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<div class="note-check-item">${ic('circle', 15)}<span>${formatInlineMd(l.slice(6))}</span></div>`);
      continue;
    }

    // Bullets
    if (l.startsWith('- ') || l.startsWith('* ')) {
      if (!inList) {
        html.push('<ul class="note-ul">');
        inList = true;
      }
      html.push(`<li>${formatInlineMd(l.slice(2))}</li>`);
      continue;
    }

    if (inList) {
      html.push('</ul>');
      inList = false;
    }

    // Blockquote
    if (l.startsWith('> ')) {
      html.push(`<blockquote class="note-quote">${formatInlineMd(l.slice(2))}</blockquote>`);
      continue;
    }

    html.push(`<p class="note-p">${formatInlineMd(l)}</p>`);
  }

  if (inList) {
    html.push('</ul>');
  }

  return html.join('');
}

export function companyModal(m) {
  return `
  <div class="modal card" style="width: 480px; max-width: 92vw; padding: 0; border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--shadow-pop); background: var(--surface);" role="dialog" aria-modal="true">
    <!-- Modal Header -->
    <div style="padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
      <div class="row align-center gap-2">
        ${ic('building-2', 18, 'accent')}
        <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text);">Add New Company Account</h3>
      </div>
      <button class="ibtn ibtn-xs" data-a="closeModal" aria-label="Close">
        ${ic('x', 15)}
      </button>
    </div>

    <!-- Modal Body Form -->
    <form id="new-company-form" data-submit="submitNewCompany" style="padding: 20px; display: flex; flex-direction: column; gap: 14px;">
      <div>
        <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 4px;">Company Name *</label>
        <input type="text" name="name" required placeholder="e.g. Acme Corp" class="input" style="width: 100%; font-size: 13px; padding: 7px 10px; border-radius: var(--r-sm); border: 1px solid var(--border); background: var(--bg);" autofocus />
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 4px;">Domain / Website</label>
          <input type="text" name="domain" placeholder="acme.com" class="input" style="width: 100%; font-size: 13px; padding: 7px 10px; border-radius: var(--r-sm); border: 1px solid var(--border); background: var(--bg);" />
        </div>
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 4px;">Segment</label>
          <select name="segment" class="select" style="width: 100%; font-size: 13px; padding: 7px 10px; border-radius: var(--r-sm); border: 1px solid var(--border);">
            ${SEGMENTS.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 4px;">Initial Stage</label>
          <select name="stage" class="select" style="width: 100%; font-size: 13px; padding: 7px 10px; border-radius: var(--r-sm); border: 1px solid var(--border);">
            ${STAGES.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 4px;">Account Executive</label>
          <select name="owner" class="select" style="width: 100%; font-size: 13px; padding: 7px 10px; border-radius: var(--r-sm); border: 1px solid var(--border);">
            ${OWNERS.map((o) => `<option value="${esc(o.name)}">${esc(o.name)}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 4px;">Estimated Pipeline ($)</label>
          <input type="number" name="pipelineValue" placeholder="150000" min="0" step="5000" class="input" style="width: 100%; font-size: 13px; padding: 7px 10px; border-radius: var(--r-sm); border: 1px solid var(--border); background: var(--bg);" />
        </div>
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-2); margin-bottom: 4px;">Win Probability (%)</label>
          <input type="number" name="winProbability" placeholder="50" min="0" max="100" class="input" style="width: 100%; font-size: 13px; padding: 7px 10px; border-radius: var(--r-sm); border: 1px solid var(--border); background: var(--bg);" />
        </div>
      </div>

      <!-- Modal Footer Actions -->
      <div style="margin-top: 10px; padding-top: 14px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 8px;">
        <button type="button" class="btn btn-secondary btn-sm" data-a="closeModal">Cancel</button>
        <button type="submit" class="btn btn-primary btn-sm" data-a="submitNewCompany">Create Account</button>
      </div>
    </form>
  </div>`;
}

export function noteModal(m, H) {
  const n = m.noteId ? getNote(m.noteId) : null;
  const isExisting = !!n;
  const isEditing = m.mode === 'edit' || !isExisting;

  const title = n ? n.title : (m.title || '');
  const category = n ? n.category : 'General';
  const content = n ? n.content : '';
  const tags = n && n.tags ? n.tags : [];
  const updatedAt = n && n.updatedAt ? ago(n.updatedAt) : 'recently';

  // 1. Clean Reading / Inspection View (Beneficial information, no raw input boxes!)
  if (!isEditing) {
    return `${H(
      esc(title),
      `<div class="row" style="gap:8px;align-items:center;margin-top:2px">
        <span class="note-category-badge">${ic('folder', 11)} ${esc(category)}</span>
        <span class="faint" style="font-size:11.5px">Updated ${updatedAt}</span>
      </div>`
    )}
    <div class="note-viewer">
      ${tags.length ? `
        <div class="row" style="gap:5px;flex-wrap:wrap">
          ${tags.map(t => `<span class="note-tag-chip">#${esc(t)}</span>`).join('')}
        </div>
      ` : ''}

      <div class="note-body-content">
        ${renderMarkdown(content)}
      </div>
    </div>
    <div class="modal-f">
      <button class="btn btn-secondary btn-sm" data-a="copyNoteContent" data-id="${esc(n.id)}" title="Copy note markdown">
        ${ic('copy', 13)} Copy text
      </button>
      <button class="btn btn-ghost btn-sm" data-a="deleteNoteModal" data-id="${esc(n.id)}" style="color:var(--red)">
        ${ic('trash-2', 13)} Delete
      </button>
      <span class="sp"></span>
      <button class="btn btn-secondary" data-a="editNoteMode" data-id="${esc(n.id)}">
        ${ic('pencil', 13)} Edit note
      </button>
      <button class="btn btn-primary" data-a="closeModal">Done</button>
    </div>`;
  }

  // 2. Edit Mode (Only when creating new note or clicking "Edit note")
  return `${H(
    isExisting ? 'Edit Note · ' + esc(title) : 'New Note',
    isExisting ? `Last modified ${updatedAt}` : 'Workspace Scratchpad'
  )}
  <form class="modal-b" data-submit="saveNoteModal" style="gap:12px">
    <input type="hidden" id="note-modal-id" value="${esc(n?.id || '')}">
    <div class="field">
      <label class="label" for="note-modal-title">Title</label>
      <input class="input" id="note-modal-title" value="${esc(title)}" placeholder="Note title..." autofocus required style="font-size:15px;font-weight:600">
    </div>
    <div class="row" style="gap:10px">
      <div class="field" style="flex:1">
        <label class="label" for="note-modal-cat">Category</label>
        <input class="input" id="note-modal-cat" value="${esc(category)}" placeholder="e.g. Planning, Sales, Design">
      </div>
      <div class="field" style="flex:1">
        <label class="label" for="note-modal-tags">Tags</label>
        <input class="input" id="note-modal-tags" value="${esc(tags.join(', '))}" placeholder="comma separated (e.g. q4, sprint)">
      </div>
    </div>
    <div class="field">
      <label class="label" for="note-modal-content">Note Content (Markdown)</label>
      <textarea class="textarea" id="note-modal-content" rows="10" placeholder="Write markdown content or scratchpad memo here..." style="font-family:var(--font-mono);font-size:13px;line-height:1.6">${esc(content)}</textarea>
    </div>
  </form>
  <div class="modal-f">
    ${isExisting ? `<button class="btn btn-ghost btn-sm" data-a="viewNoteMode" data-id="${esc(n.id)}">Cancel edit</button>` : ''}
    <span class="sp"></span>
    <button class="btn btn-secondary" data-a="closeModal">Cancel</button>
    <button class="btn btn-primary" data-a="saveNoteModal">${isExisting ? 'Save Changes' : 'Create Note'}</button>
  </div>`;
}
export function formChip(pop, html, label) {
  return `<button class="pillbtn bordered" data-a="pop" data-pop="${pop}" data-id="__form" ${pop === 'date' ? `data-field="${label}"` : ''} aria-label="${esc(label)}">${html}</button>`;
}
export function taskModal(m, H) {
  const f = S.ui.form;
  const p = proj(f.project);
  const err = S.ui.errors.title;
  return `${H(m.edit ? 'Edit task' : 'New task', m.edit ? `<span class="mono">${task(m.edit)?.key}</span>` : '')}
  <form class="modal-b" data-submit="submitTask" style="gap:12px">
    <div class="field"><label class="sr" for="f-title">Task name</label><input class="input input-lg ${err ? 'is-error' : ''}" id="f-title" data-in="form" data-f="title" value="${esc(f.title)}" placeholder="Task name" autofocus aria-invalid="${!!err}" aria-describedby="f-title-err" style="font-size:15px;font-weight:500">${err ? `<span class="err" id="f-title-err">${ic('circle-alert', 12)}${err}</span>` : ''}</div>
    <div class="field"><label class="sr" for="f-desc">Description</label><textarea class="textarea" id="f-desc" data-in="form" data-f="desc" placeholder="Add a description… (optional)" rows="3">${esc(f.desc)}</textarea></div>
    <div class="row" style="flex-wrap:wrap;gap:6px">
      ${formChip('project', `<span class="pdot" style="--c:${pColor(p)}"></span>${esc(p?.name || 'Project')}`, 'Project')}
      ${formChip('status', stPill(f.status), 'Status')}
      ${formChip('assignee', `${av(f.assignee, 'sm', false)}${esc(mem(f.assignee)?.name || 'Assignee')}`, 'Assignee')}
      ${formChip('priority', prPill(f.priority), 'Priority')}
      ${formChip('date', `${ic('calendar', 13)}${f.due ? 'Due ' + fmtDate(f.due) : 'Due date'}`, 'due')}
      ${formChip('date', `${ic('calendar-arrow-up', 13)}${f.start ? 'Starts ' + fmtDate(f.start) : 'Start date'}`, 'start')}
      ${formChip('labels', f.labels.length ? f.labels.map(lbl).join('') : `${ic('tag', 13)}Labels`, 'Labels')}
      ${formChip('recur', `${ic('repeat', 13)}${f.recur || 'Repeat'}`, 'Repeat')}
    </div>
    <div class="field"><span class="label">Subtasks</span>
      ${f.subtasks.map((s, i) => `<div class="subt" style="padding:0 4px">${ic('circle', 13)}<span class="s">${esc(s.title)}</span><button type="button" class="ibtn ibtn-xs x" style="opacity:1" data-a="formRmSub" data-i="${i}" aria-label="Remove">${ic('x', 12)}</button></div>`).join('')}
      <div class="inwrap">${ic('plus', 14)}<input class="input" id="f-sub" data-key-enter="formAddSub" placeholder="Add a subtask and press Enter"></div></div>
    <div class="field"><span class="label">Attachments</span>
      ${f.files.length ? `<div class="col" style="gap:4px">${f.files.map((x, i) => `<div class="upl" style="padding:6px 10px"><span class="ftype" style="--c:${FT[x.type].c};width:22px;height:22px">${ic(FT[x.type].i, 12)}</span><span class="grow trunc">${esc(x.name)}</span><span class="faint" style="font-size:11.5px">${x.size}</span><button type="button" class="ibtn ibtn-xs" data-a="formRmFile" data-i="${i}" aria-label="Remove">${ic('x', 12)}</button></div>`).join('')}</div>` : ''}
      <label class="dropzone" style="padding:10px">${ic('paperclip', 14)}<span>Attach files</span><input type="file" multiple hidden data-in="formFiles"></label></div>
  </form>
  <div class="modal-f">${m.edit ? `<button type="button" class="btn btn-ghost btn-sm" data-a="delTaskModal" data-id="${m.edit}" style="color:var(--red)">${ic('trash-2', 13)} Delete task</button>` : `<label class="row" style="gap:8px;font-size:12.5px;color:var(--text-2);cursor:pointer"><input type="checkbox" class="toggle" id="f-more" data-in="formMore" ${f.more ? 'checked' : ''}>Create more</label>`}<span class="sp"></span>
    <span class="faint hide-m" style="font-size:11.5px"><kbd>${MOD}</kbd> <kbd>↵</kbd></span>
    <button class="btn btn-secondary" data-a="closeModal">Cancel</button><button class="btn btn-primary" data-a="submitTask" id="f-submit">${m.edit ? 'Save changes' : 'Create task'}</button></div>`;
}
export const TEMPLATES = [
  { id: 'blank', name: 'Blank project', icon: 'file', desc: 'Start from scratch', tasks: [] },
  {
    id: 'product',
    name: 'Product Development',
    icon: 'target',
    desc: 'Discovery to launch',
    tasks: [],
  },
  {
    id: 'web',
    name: 'Website',
    icon: 'globe',
    desc: 'IA, design, build, launch',
    tasks: [],
  },
  {
    id: 'mkt',
    name: 'Marketing Campaign',
    icon: 'megaphone',
    desc: 'Brief, assets, channels',
    tasks: [],
  },
  {
    id: 'design',
    name: 'Design Project',
    icon: 'palette',
    desc: 'Discovery to handoff',
    tasks: [],
  },
  {
    id: 'software',
    name: 'Software Development',
    icon: 'code',
    desc: 'Spec, build, ship',
    tasks: [],
  },
  {
    id: 'personal',
    name: 'Personal Project',
    icon: 'heart',
    desc: 'Plan your own goals',
    tasks: [],
  },
];
export function projectModal(m, H) {
  const f = S.ui.pform;
  const err = S.ui.errors.pname;
  return `${H(m.edit ? 'Project settings' : 'New project', m.edit ? '' : 'Projects hold tasks, files, and conversations for one body of work.')}
  <form class="modal-b" data-submit="submitProject">
    <div class="row" style="gap:10px;align-items:flex-start">
      <button type="button" class="picon lg" style="--c:${PCOLORS[f.color]};cursor:default;flex-shrink:0;margin-top:22px" aria-hidden="true" tabindex="-1">${ic(f.icon, 18)}</button>
      <div class="field grow"><label class="label" for="p-name">Project name</label><input class="input ${err ? 'is-error' : ''}" id="p-name" data-in="pform" data-f="name" value="${esc(f.name)}" placeholder="e.g. Website Redesign" autofocus aria-invalid="${!!err}">${err ? `<span class="err">${ic('circle-alert', 12)}${err}</span>` : ''}</div>
    </div>
    <div class="field"><label class="label" for="p-desc">Description</label><textarea class="textarea" id="p-desc" data-in="pform" data-f="desc" rows="2" placeholder="What is this project about?">${esc(f.desc)}</textarea></div>
    <div class="row" style="gap:16px;align-items:flex-start;flex-wrap:wrap">
      <div class="field" style="flex:1;min-width:220px"><span class="label">Icon</span><div class="iconpick" role="radiogroup" aria-label="Icon">${PICONS.map(i => `<button type="button" role="radio" aria-checked="${f.icon === i}" class="${f.icon === i ? 'on' : ''}" data-a="pformSet" data-f="icon" data-v="${i}" aria-label="${i}">${ic(i, 15)}</button>`).join('')}</div></div>
      <div class="field"><span class="label">Color</span><div class="swatches" role="radiogroup" aria-label="Color" style="max-width:140px">${Object.entries(
        PCOLORS,
      )
        .map(
          ([k, v]) =>
            `<button type="button" role="radio" aria-checked="${f.color === k}" class="sw ${f.color === k ? 'on' : ''}" style="--c:${v};width:22px;height:22px" data-a="pformSet" data-f="color" data-v="${k}" aria-label="${k}">${f.color === k ? ic('check', 12) : ''}</button>`,
        )
        .join('')}</div></div>
    </div>
    <div class="row" style="gap:12px;flex-wrap:wrap">
      <div class="field" style="flex:1;min-width:150px"><label class="label" for="p-team">Team</label><select class="select" id="p-team" data-in="pform" data-f="team">${teamsList()
        .map(t => `<option value="${t.id}" ${f.team === t.id ? 'selected' : ''}>${t.name}</option>`)
        .join('')}</select></div>
      <div class="field" style="flex:1;min-width:150px"><label class="label" for="p-lead">Lead</label><select class="select" id="p-lead" data-in="pform" data-f="lead">${D()
        .members.filter(x => x.status === 'active')
        .map(x => `<option value="${x.id}" ${f.lead === x.id ? 'selected' : ''}>${esc(x.name)}</option>`)
        .join('')}</select></div>
      <div class="field" style="flex:1;min-width:150px"><label class="label" for="p-due">Target date</label><input type="date" class="input" id="p-due" data-in="pform" data-f="due" value="${f.due || ''}"></div>
    </div>
    ${m.edit ? '' : `<div class="field"><span class="label">Template</span><div class="tmpls" role="radiogroup">${TEMPLATES.map(t => `<button type="button" role="radio" aria-checked="${f.tmpl === t.id}" class="opt ${f.tmpl === t.id ? 'on' : ''}" data-a="pformSet" data-f="tmpl" data-v="${t.id}" style="padding:10px">${ic(t.icon, 16)}<b style="font-size:12.5px">${t.name}</b><span>${t.desc}</span></button>`).join('')}</div></div>`}
  </form>
  <div class="modal-f">${m.edit ? `<button type="button" class="btn btn-ghost btn-sm" data-a="delProjectModal" data-id="${m.edit}" style="color:var(--red)">${ic('trash-2', 13)} Delete project</button>` : ''}<span class="sp"></span><button class="btn btn-secondary" data-a="closeModal">Cancel</button><button class="btn btn-primary" data-a="submitProject">${m.edit ? 'Save changes' : 'Create project'}</button></div>`;
}
export const PERMS = ['Can view', 'Can comment', 'Can edit', 'Full access'];
export function shareModal(m, H) {
  const p = proj(m.id);
  p.perms = p.perms || {};
  p.access = p.access || 'workspace';
  return `${H(`Share “${esc(p.name)}”`)}
  <div class="modal-b">
    <form class="row" style="gap:6px" data-submit="shareInvite"><div class="grow"><label class="sr" for="share-in">Invite by email</label><input class="input" id="share-in" placeholder="Add people by name or email" value="${esc(S.ui.shareQ || '')}" data-in="shareQ" autofocus></div>
      <select class="select" id="share-perm" style="width:132px" aria-label="Permission">${PERMS.map(x => `<option ${x === 'Can edit' ? 'selected' : ''}>${x}</option>`).join('')}</select>
      <button class="btn btn-primary" data-a="shareInvite" type="button">Invite</button></form>
    ${
      S.ui.shareQ
        ? `<div class="panel" style="padding:4px">${
            D()
              .members.filter(
                x => !p.members.includes(x.id) && (x.name.toLowerCase().includes(S.ui.shareQ.toLowerCase()) || x.email.includes(S.ui.shareQ.toLowerCase())),
              )
              .map(
                x =>
                  `<button class="mi" data-a="shareAdd" data-id="${p.id}" data-mid="${x.id}">${av(x.id, 'sm', false)}${esc(x.name)}<span class="r">${esc(x.email)}</span></button>`,
              )
              .join('') ||
            `<div class="mi faint" style="cursor:default">${S.ui.shareQ.includes('@') ? `Press Invite to send an invitation to ${esc(S.ui.shareQ)}` : 'No matching members - enter an email to invite someone new'}</div>`
          }</div>`
        : ''
    }
    <div><div class="eyebrow" style="margin-bottom:4px">People with access</div>
      ${p.members
        .map(id => {
          const x = mem(id);
          if (!x) return '';
          const perm = id === p.lead ? 'Full access' : p.perms[id] || (x.role === 'Guest' ? 'Can comment' : 'Can edit');
          return `<div class="row" style="height:44px">${av(id, 'md', false)}<div class="grow"><div style="font-weight:500;font-size:13px">${esc(x.name)}${id === D().me ? ' <span class="faint" style="font-weight:400">(you)</span>' : ''}</div><div class="faint" style="font-size:11.5px">${esc(x.email)}${id === p.lead ? ' · Project lead' : ''}</div></div>
          ${id === p.lead ? `<span class="muted" style="font-size:12.5px;padding-right:8px">Full access</span>` : `<select class="select" style="width:auto;height:26px;font-size:12px;border-color:transparent;background-color:transparent" data-in="sharePerm" data-id="${p.id}" data-mid="${id}" aria-label="Permission for ${esc(x.name)}">${PERMS.map(q => `<option ${q === perm ? 'selected' : ''}>${q}</option>`).join('')}<option value="__remove">Remove access</option></select>`}</div>`;
        })
        .join('')}
    </div>
    <div style="border-top:1px solid var(--divider);padding-top:12px"><div class="eyebrow" style="margin-bottom:8px">General access</div>
      <div class="row" style="gap:10px"><span class="ftype" style="--c:var(--text-2)">${ic(p.access === 'private' ? 'lock' : 'building-2', 14)}</span><div class="grow"><select class="select" style="height:28px;width:auto;border-color:transparent;padding-left:4px;font-weight:500" data-in="shareAccess" data-id="${p.id}" aria-label="General access"><option value="private" ${p.access === 'private' ? 'selected' : ''}>Only people invited</option><option value="workspace" ${p.access === 'workspace' ? 'selected' : ''}>Everyone at ${esc(D().ws.name)}</option></select><div class="faint" style="font-size:11.5px;padding-left:4px">${p.access === 'private' ? 'Only people listed above can open this project.' : 'Anyone in the workspace can view and comment.'}</div></div></div></div>
  </div>
  <div class="modal-f"><button class="btn btn-secondary" data-a="copyLink" data-pid="${p.id}">${ic('link', 14)}Copy link</button><span class="sp"></span><button class="btn btn-primary" data-a="closeModal">Done</button></div>`;
}
export function inviteModal(m, H) {
  const err = S.ui.errors.invite;
  return `${H('Invite to ' + esc(D().ws.name), 'Invited people get an email with a link to join.')}
  <form class="modal-b" data-submit="submitInvite">
    <div class="field"><label class="label" for="inv-emails">Email addresses</label><textarea class="textarea ${err ? 'is-error' : ''}" id="inv-emails" placeholder="name@company.com, another@company.com" rows="3" autofocus>${esc(S.ui.inviteDraft || '')}</textarea>${err ? `<span class="err">${ic('circle-alert', 12)}${err}</span>` : '<span class="hint">Separate multiple addresses with commas.</span>'}</div>
    <div class="row" style="gap:12px"><div class="field grow"><label class="label" for="inv-role">Role</label><select class="select" id="inv-role">${['Member', 'Admin', 'Guest'].map(r => `<option>${r}</option>`).join('')}</select></div>
    <div class="field grow"><label class="label" for="inv-team">Team</label><select class="select" id="inv-team">${teamsList()
      .map(t => `<option value="${t.id}">${t.name}</option>`)
      .join('')}</select></div></div>
    <div class="alert info">${ic('info', 14)}<span><b>Guests</b> can only see projects they're added to and can't create projects.</span></div>
  </form>
  <div class="modal-f"><button class="btn btn-ghost" data-a="copyInviteLink">${ic('link', 14)}Copy invite link</button><span class="sp"></span><button class="btn btn-secondary" data-a="closeModal">Cancel</button><button class="btn btn-primary" data-a="submitInvite" id="inv-submit">Send invites</button></div>`;
}
export function confirmModal(m) {
  const needs = m.typeName;
  const ok = !needs || (S.ui.confirmText || '') === needs;
  return `<div class="modal-b" style="padding-top:18px;gap:10px">
    <div class="row" style="gap:12px;align-items:flex-start"><span class="ftype" style="--c:${m.danger ? 'var(--red)' : 'var(--amber)'};width:34px;height:34px;border-radius:9px">${ic(m.icon || (m.danger ? 'trash-2' : 'archive'), 17)}</span>
    <div class="grow"><h2 id="mt-confirm" style="font-size:15px;font-weight:600;margin:4px 0 6px">${esc(m.title)}</h2><p class="muted" style="margin:0;font-size:13px;line-height:1.55">${m.body}</p></div></div>
    ${needs ? `<div class="field" style="margin-top:6px"><label class="label" for="confirm-in" style="font-weight:400;color:var(--text-2)">Type <b style="color:var(--text);font-weight:600">${esc(needs)}</b> to confirm</label><input class="input" id="confirm-in" data-in="confirmText" autocomplete="off" autofocus value="${esc(S.ui.confirmText || '')}"></div>` : ''}
  </div>
  <div class="modal-f"><span class="sp"></span><button class="btn btn-secondary" data-a="closeModal" ${needs ? '' : 'autofocus'}>Cancel</button><button class="btn ${m.danger ? 'btn-danger' : 'btn-primary'}" data-a="confirmOk" ${ok ? '' : 'disabled'}>${esc(m.ok)}</button></div>`;
}
export const SHORTCUTS = [
  [
    'General',
    [
      ['Command menu', [MOD, 'K']],
      ['Search', ['/']],
      ['Keyboard shortcuts', ['?']],
      ['Toggle sidebar', ['[']],
      ['Toggle dark mode', [MOD, 'Shift', 'L']],
      ['Close panel or dialog', ['Esc']],
    ],
  ],
  [
    'Create',
    [
      ['New task', ['N']],
      ['New project', ['P']],
      ['Submit form', [MOD, '↵']],
      ['Send comment', [MOD, '↵']],
    ],
  ],
  [
    'Navigate',
    [
      ['Go to Home', ['G', 'H']],
      ['Go to My Tasks', ['G', 'T']],
      ['Go to Projects', ['G', 'P']],
      ['Go to Inbox', ['G', 'I']],
      ['Go to Calendar', ['G', 'C']],
      ['Go to Settings', ['G', 'S']],
    ],
  ],
  [
    'Command menu',
    [
      ['Move selection', ['↑', '↓']],
      ['Run command', ['↵']],
      ['Search mode', ['Tab']],
    ],
  ],
];
export function shortcutsModal(H) {
  return `${H('Keyboard shortcuts')}<div class="modal-b" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px">${SHORTCUTS.map(([g, list]) => `<div><div class="eyebrow" style="margin-bottom:6px">${g}</div>${list.map(([n, k]) => `<div class="row" style="height:30px;font-size:13px;border-bottom:1px solid var(--divider)"><span class="grow">${n}</span>${k.map((x, i) => `${i && k[0] === 'G' ? '<span class="faint" style="font-size:11px">then</span>' : ''}<kbd>${x}</kbd>`).join('')}</div>`).join('')}</div>`).join('')}</div>`;
}
export function filePreviewModal(m, H) {
  const f = m.file;
  const t = FT[f.type] || FT.other;
  return `${H(esc(f.name), `${t.n} · ${f.size} · Uploaded by ${esc(mem(f.by)?.name || 'you')} ${ago(f.at)}`)}
  <div class="modal-b"><div style="border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden">${filePrev(f).replace('class="fprev"', 'class="fprev" style="aspect-ratio:16/9"')}</div>
  ${m.tid ? `<div class="row faint" style="font-size:12.5px">${ic('link', 13)}Attached to <button class="link" data-a="openTask" data-id="${m.tid}">${esc(task(m.tid)?.title)}</button></div>` : ''}</div>
  <div class="modal-f"><button class="btn btn-secondary" data-a="copyLink" data-fid="${f.id}">${ic('link', 14)}Copy link</button><span class="sp"></span><button class="btn btn-primary" data-a="closeModal">Close</button></div>`;
}

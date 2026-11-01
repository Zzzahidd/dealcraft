import{Z as T,S as w,a2 as B,a3 as _,W as $,a4 as j,M as u,a5 as E,U as h}from"./toast-CIU4FusM.js";let g="",r=0,n=[];const A=document.getElementById("spotlight-root");function S(){try{const t=localStorage.getItem(_);if(t){const e=JSON.parse(t);e&&e.prefs&&Object.assign(w.prefs,e.prefs),e&&e.data&&(w.data=e.data)}}catch(t){console.warn("[Spotlight] sync error:",t)}B()}function O(){n=$(g),r>=n.length&&(r=Math.max(0,n.length-1));const t=n[r]||n[0];A.innerHTML=`
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
          ${E("search",16)}
        </span>
        <input
          type="text"
          class="raycast-input"
          placeholder="Search notes, files, tasks, projects, companies..."
          value="${u(g)}"
          autocomplete="off"
          spellcheck="false"
          autofocus
          id="raycast-main-input"
        />
        <div class="raycast-header-right">
          <kbd class="key-badge">Esc</kbd>
          <button class="ibtn ibtn-xs raycast-close-btn" id="raycast-btn-close" title="Close (Esc)" aria-label="Close search">
            ${E("x",14)}
          </button>
        </div>
      </div>

      <!-- Search Results Scroll Area -->
      <div class="raycast-results-wrapper">
        <div class="raycast-list" id="raycast-results-list" data-keep="raycast-list">
          ${j(n,r)}
        </div>
      </div>

      <!-- Footer Action & Status Bar (Draggable Region) -->
      <div class="raycast-footer" id="raycast-footer-bar" data-tauri-drag-region>
        <div class="raycast-footer-left" data-tauri-drag-region>
          <div class="raycast-footer-selection" data-tauri-drag-region id="raycast-footer-crumb">
            ${t?`<span class="raycast-footer-crumb">${u(t.category)}</span> <span class="crumb-sep">›</span> <span class="raycast-footer-title">${u(t.title)}</span>`:'<span class="faint">Type to search your workspace</span>'}
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
            ${E("x",12)}
          </button>
        </div>
      </div>
    </div>
  `,N(),H()}function f(){n=$(g),r>=n.length&&(r=Math.max(0,n.length-1));const t=n[r]||n[0],e=document.getElementById("raycast-results-list");e&&(e.innerHTML=j(n,r));const s=document.getElementById("raycast-footer-crumb");s&&(s.innerHTML=t?`<span class="raycast-footer-crumb">${u(t.category)}</span> <span class="crumb-sep">›</span> <span class="raycast-footer-title">${u(t.title)}</span>`:'<span class="faint">Type to search your workspace</span>'),H()}function H(){requestAnimationFrame(()=>{const t=document.getElementById("raycast-results-list"),e=document.getElementById("raycast-glider"),s=document.getElementById(`raycast-item-${r}`);if(!t||!e||!s){e&&(e.style.opacity="0");return}const c=t.getBoundingClientRect(),l=s.getBoundingClientRect(),d=l.top-c.top+t.scrollTop,i=l.height;e.style.transform=`translateY(${d}px)`,e.style.height=`${i}px`,e.style.opacity="1"})}function C(t){const e=document.getElementById(`raycast-item-${t}`),s=document.getElementById("raycast-results-list");if(!e||!s)return;const c=e.offsetTop,l=c+e.offsetHeight,d=s.scrollTop,i=s.clientHeight;c<d?s.scrollTop=c:l>d+i&&(s.scrollTop=l-i)}async function I(t){var c;if(!t)return;const e=document.getElementById("raycast-container-box");e&&(e.style.transition="opacity 0.12s cubic-bezier(0.16, 1, 0.3, 1), transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)",e.style.opacity="0",e.style.transform="scale(0.985) translateY(-3px)");let s=null;if(t.cmdId==="c-task"||t.act==="openNewTask"||t.id==="cmd-task"?s={type:"createTask"}:t.act==="openNewNoteModal"||t.id==="cmd-create-note"?s={type:"createNote"}:t.taskId?s={type:"openTask",id:t.taskId,title:t.title}:t.noteId?s={type:"openNote",id:t.noteId,title:t.title}:t.fileObj?s={type:"openFile",id:t.fileObj.id,projectId:t.fileObj.project,title:t.title}:t.companyId?s={type:"openCompany",id:t.companyId,title:t.title}:t.projectId?s={type:"openProject",id:t.projectId,title:t.title}:t.cmdId&&(s={type:"runCommand",id:t.cmdId,route:(c=t.cmdObj)==null?void 0:c.route}),s)try{await h("open_main_window",{route:null,payload:JSON.stringify(s)})}catch(l){console.warn("[Spotlight] invoke open_main_window error:",l)}}async function z(){const t=document.getElementById("raycast-container-box");t&&(t.style.transition="opacity 0.12s cubic-bezier(0.16, 1, 0.3, 1), transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)",t.style.opacity="0",t.style.transform="scale(0.985) translateY(-3px)");try{await h("open_main_window",{route:null,payload:null})}catch(e){console.warn("[Spotlight] invoke open_main_window error:",e)}}async function x(){try{await h("hide_spotlight")}catch(t){console.warn("[Spotlight] invoke hide_spotlight error:",t)}}function N(){const t=document.getElementById("raycast-main-input");t&&t.addEventListener("input",()=>{g=t.value||"",r=0,f()});const e=document.getElementById("raycast-results-list");e&&e.addEventListener("click",a=>{const o=a.target.closest(".raycast-item");if(o&&o.dataset.idx!=null){const y=Number(o.dataset.idx),p=n[y];p&&I(p)}});const s=document.getElementById("raycast-btn-close");s&&s.addEventListener("click",x);const c=document.getElementById("raycast-btn-footer-close");c&&c.addEventListener("click",x);const l=document.getElementById("raycast-btn-open-hint");l&&l.addEventListener("click",()=>{n[r]?I(n[r]):z()}),window.addEventListener("keydown",a=>{if(a.key==="Escape"){a.preventDefault(),x();return}if(a.key==="ArrowDown"){a.preventDefault(),n.length>0&&(r=(r+1)%n.length,f(),C(r));return}if(a.key==="ArrowUp"){a.preventDefault(),n.length>0&&(r=(r-1+n.length)%n.length,f(),C(r));return}if(a.key==="Enter"){if(a.preventDefault(),a.ctrlKey||a.metaKey){z();return}n[r]?I(n[r]):z();return}});let d=!1,i=null,D=0,M=0,m=0,b=0,v=null;document.addEventListener("pointerdown",a=>{if(a.button!==0)return;const o=a.target.closest("[data-resize]");if(o){a.preventDefault(),a.stopPropagation(),d=!0,i=o.dataset.resize,v=o,D=a.screenX,M=a.screenY,m=window.innerWidth,b=window.innerHeight;try{o.setPointerCapture(a.pointerId)}catch{}document.body.style.userSelect="none",document.body.style.cursor=window.getComputedStyle(o).cursor;return}const y=a.target.closest("[data-tauri-drag-region]"),p=a.target.closest("input, button, kbd, .ibtn, [data-resize]");y&&!p&&h("start_spotlight_drag").catch(()=>{})}),document.addEventListener("pointermove",a=>{if(!d||!i)return;a.preventDefault();const o=a.screenX-D,y=a.screenY-M;let p=m,k=b;i.includes("r")?p=Math.max(440,Math.min(1800,m+o)):i.includes("l")&&(p=Math.max(440,Math.min(1800,m-o))),i.includes("b")?k=Math.max(300,Math.min(1200,b+y)):i.includes("t")&&(k=Math.max(300,Math.min(1200,b-y))),h("resize_spotlight",{width:Math.round(p),height:Math.round(k)}).catch(()=>{})});const L=a=>{if(d){if(d=!1,i=null,v){try{v.releasePointerCapture(a.pointerId)}catch{}v=null}document.body.style.userSelect="",document.body.style.cursor=""}};document.addEventListener("pointerup",L),document.addEventListener("pointercancel",L)}try{T("spotlight-show",()=>{S();const t=document.getElementById("raycast-container-box");t&&(t.style.transition="none",t.style.opacity="1",t.style.transform="none"),g="",r=0;const e=document.getElementById("raycast-main-input");e&&(e.value="",requestAnimationFrame(()=>e.focus())),f()})}catch(t){console.warn("[Spotlight] listen error:",t)}try{T("theme-changed",t=>{t.payload&&(Object.assign(w.prefs,t.payload),B())})}catch(t){console.warn("[Spotlight] theme listen error:",t)}window.addEventListener("storage",t=>{t.key===_&&(S(),f())});try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{w.prefs.theme==="system"&&B()})}catch{}S();O();const R=document.getElementById("raycast-main-input");R&&R.focus();

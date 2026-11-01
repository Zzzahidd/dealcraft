/* ---------- icons: inlined Lucide subset (src/00-icons.js), rendered to inline svg ---------- */
import { ICONS } from 'virtual:icons';
import { esc } from './utils.js';

export const _icCache = {};
export function ic(name, size = 16, cls = '') {
  const k = name + '|' + size + '|' + cls;
  if (_icCache[k]) return _icCache[k];
  const inner = ICONS[name] || '<rect x="5" y="5" width="14" height="14" rx="3"/>';
  return (_icCache[k] =
    `<svg class="i ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`);
}
/* Dealcraft brand: Precision Node app icon and clean modern wordmark. */
export const MARK = (px = 22) =>
  `<img src="/favicon.png" width="${px}" height="${px}" style="border-radius:22%;display:block;object-fit:cover;" alt="Dealcraft" />`;
export const LOGO = (h = 22) =>
  `<span class="brand-logo" style="display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:${Math.max(12, Math.round(h * 0.75))}px;line-height:1;letter-spacing:-0.02em;"><img src="/favicon.png" width="${h}" height="${h}" style="border-radius:22%;display:block;object-fit:cover;" alt="" /><span>Dealcraft</span></span>`;
export function wsLogo(w, px = 22) {
  return w && w.brand
    ? `<span class="ws-logo brand" style="width:${px}px;height:${px}px;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;border-radius:22%">${MARK(px)}</span>`
    : `<span class="ws-logo" style="--c:${w.c};width:${px}px;height:${px}px;font-size:${Math.max(9, Math.round(px * 0.46))}px">${esc(w.name[0])}</span>`;
}

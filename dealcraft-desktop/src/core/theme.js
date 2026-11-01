/* ---------- theme ---------- */
import { setDateFormat } from './utils.js';
import { S } from './store.js';
import { emit } from '@tauri-apps/api/event';

export function applyPrefs() {
  const r = document.documentElement,
    p = S.prefs;
  setDateFormat(p.dateFmt);
  if (p.theme === 'system') r.removeAttribute('data-theme');
  else r.setAttribute('data-theme', p.theme);
  if (p.accent === 'indigo') r.removeAttribute('data-accent');
  else r.setAttribute('data-accent', p.accent);
  r.setAttribute('data-side', p.side);
  r.setAttribute('data-density', p.density);
  if (p.motion === 'reduce') r.setAttribute('data-motion', 'reduce');
  else r.removeAttribute('data-motion');

  try {
    emit('theme-changed', {
      theme: p.theme,
      accent: p.accent,
      side: p.side,
      density: p.density,
      motion: p.motion,
    }).catch(() => {});
  } catch {}
}
export function effectiveDark() {
  if (S.prefs.theme === 'dark') return true;
  if (S.prefs.theme === 'light') return false;
  return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
}

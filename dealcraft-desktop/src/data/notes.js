/* ============================================================
   NOTES DATA LAYER & CRUD ENGINE
   Persistent workspace notes with full-text search & snippet indexing
   ============================================================ */

const NOTES_STORAGE_KEY = 'dealcraft.notes.v2';

const DUMMY_NOTE_IDS = new Set([
  'note-roadmap-q4',
  'note-acme-meeting',
  'note-motion-retro',
  'note-shortcuts-guide',
  'note-design-tokens',
  'note-sales-sequence',
]);

export const INITIAL_NOTES = [];

/**
 * Load all notes from localStorage or fallback to empty set
 */
export function getNotes() {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const clean = parsed.filter(n => !DUMMY_NOTE_IDS.has(n.id));
        if (clean.length !== parsed.length) {
          saveNotes(clean);
        }
        return clean;
      }
    }
  } catch (err) {
    console.warn('[Notes] Failed to load notes from localStorage:', err);
  }
  return [];
}

/**
 * Get single note by id
 */
export function getNote(id) {
  if (!id) return null;
  return getNotes().find((n) => n.id === id) || null;
}

/**
 * Save notes list to localStorage
 */
export function saveNotes(notes) {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('[Notes] Failed to persist notes:', err);
  }
}

/**
 * Add a new note
 */
export function createNote({ title, content, category = 'General', tags = [], folder = 'Personal', pinned = false }) {
  const notes = getNotes();
  const id = `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const newNote = {
    id,
    title: title.trim() || 'Untitled Note',
    content: content || '',
    category,
    pinned: Boolean(pinned),
    tags: Array.isArray(tags) ? tags : [],
    folder,
    updatedAt: new Date().toISOString(),
  };
  notes.unshift(newNote);
  saveNotes(notes);
  return newNote;
}

/**
 * Update an existing note
 */
export function updateNote(id, patch) {
  const notes = getNotes();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  notes[idx] = {
    ...notes[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  saveNotes(notes);
  return notes[idx];
}

/**
 * Delete a note
 */
export function deleteNote(id) {
  const notes = getNotes();
  const filtered = notes.filter((n) => n.id !== id);
  saveNotes(filtered);
  return filtered;
}

/**
 * Search notes and extract highlighted snippets around matched queries
 */
export function searchNotes(query) {
  const notes = getNotes();
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    return notes.map((note) => ({
      note,
      score: note.pinned ? 50 : 20,
      snippet: extractSnippet(note.content, ''),
    }));
  }

  const results = [];
  for (const note of notes) {
    const title = (note.title || '').toLowerCase();
    const content = (note.content || '').toLowerCase();
    const tags = (note.tags || []).join(' ').toLowerCase();
    const category = (note.category || '').toLowerCase();

    let score = 0;
    if (title === q) score += 150;
    else if (title.startsWith(q)) score += 90;
    else if (title.includes(q)) score += 60;

    if (tags.includes(q)) score += 40;
    if (category.includes(q)) score += 20;

    const contentIdx = content.indexOf(q);
    if (contentIdx !== -1) {
      score += 30;
    }

    if (note.pinned) score += 10;

    if (score > 0) {
      results.push({
        note,
        score,
        snippet: extractSnippet(note.content, q),
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

/**
 * Generate a clean 60-character snippet surrounding the search query
 */
export function extractSnippet(content, query) {
  if (!content) return '';
  const clean = content.replace(/[#*`_[\]()-]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!query) {
    return clean.slice(0, 75) + (clean.length > 75 ? '...' : '');
  }

  const lower = clean.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) {
    return clean.slice(0, 75) + (clean.length > 75 ? '...' : '');
  }

  const start = Math.max(0, idx - 25);
  const end = Math.min(clean.length, idx + query.length + 45);
  let snippet = clean.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < clean.length) snippet = snippet + '...';
  return snippet;
}

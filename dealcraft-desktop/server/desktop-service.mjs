/**
 * Gr8r Studio CRM - Desktop Service
 * High-performance Node.js desktop logic backend.
 * Provides atomic persistence, fuzzy search indexing for Raycast launcher,
 * and workspace data management.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const PORT = process.env.PORT || 3741;
const DATA_DIR = path.join(os.homedir(), '.gr8r-studio-crm');
const DATA_FILE = path.join(DATA_DIR, 'workspace-data.json');

// Ensure storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory Search Index & Workspace Cache
let workspaceCache = null;
let searchIndex = [];

/**
 * Build fast in-memory search index
 */
export function buildSearchIndex(data) {
  const index = [];

  // 1. Core System Actions
  const systemActions = [
    {
      id: 'act-open-main',
      type: 'action',
      category: 'Actions',
      title: 'Open Full Application',
      subtitle: 'Bring Gr8r Studio CRM window to foreground',
      icon: 'maximize-2',
      action: 'open_main_window',
      shortcut: 'Enter',
    },
    {
      id: 'act-new-task',
      type: 'action',
      category: 'Actions',
      title: 'Create New Task',
      subtitle: 'Add a new task to your workspace',
      icon: 'plus-circle',
      action: 'new_task',
      shortcut: 'C',
    },
    {
      id: 'act-new-company',
      type: 'action',
      category: 'Actions',
      title: 'Add New Company',
      subtitle: 'Register a new sales CRM company account',
      icon: 'building-2',
      action: 'new_company',
      shortcut: 'N',
    },
    {
      id: 'act-toggle-theme',
      type: 'action',
      category: 'Actions',
      title: 'Toggle Color Theme',
      subtitle: 'Switch between light and dark appearance',
      icon: 'sun-medium',
      action: 'toggle_theme',
      shortcut: 'T',
    },
    {
      id: 'act-open-settings',
      type: 'action',
      category: 'Actions',
      title: 'Open Settings',
      subtitle: 'Configure preferences, shortcuts, and workspace',
      icon: 'settings',
      action: 'navigate_settings',
      shortcut: 'S',
    },
  ];
  index.push(...systemActions);

  // 2. Navigation items
  const navItems = [
    {
      id: 'nav-companies',
      type: 'navigation',
      category: 'Navigation',
      title: 'Go to Companies Directory',
      subtitle: 'Browse all accounts, pipeline stages, and valuations',
      icon: 'building-2',
      route: 'companies',
    },
    {
      id: 'nav-pipeline',
      type: 'navigation',
      category: 'Navigation',
      title: 'Go to Deals Pipeline',
      subtitle: 'Visual sales pipeline grouped by deal stage',
      icon: 'git-pull-request',
      route: 'pipeline',
    },
    {
      id: 'nav-tasks',
      type: 'navigation',
      category: 'Navigation',
      title: 'Go to My Tasks',
      subtitle: 'Assigned tasks, due dates, and priority items',
      icon: 'check-square',
      route: 'my-tasks',
    },
    {
      id: 'nav-inbox',
      type: 'navigation',
      category: 'Navigation',
      title: 'Go to Inbox',
      subtitle: 'Notifications, mentions, and updates',
      icon: 'inbox',
      route: 'inbox',
    },
    {
      id: 'nav-members',
      type: 'navigation',
      category: 'Navigation',
      title: 'Go to Team & Owners',
      subtitle: 'Team members, roles, and account executives',
      icon: 'users',
      route: 'members',
    },
    {
      id: 'nav-activity',
      type: 'navigation',
      category: 'Navigation',
      title: 'Go to Activity Feed',
      subtitle: 'Workspace and CRM sales interaction log',
      icon: 'activity',
      route: 'activity',
    },
  ];
  index.push(...navItems);

  // 3. CRM Companies
  if (data?.companies && Array.isArray(data.companies)) {
    for (const comp of data.companies) {
      index.push({
        id: `company-${comp.id}`,
        type: 'company',
        category: 'CRM Companies',
        title: comp.name,
        subtitle: `${comp.tags?.join(' / ') || 'Account'} - Owner: ${comp.owner || 'Unassigned'} - Value: $${((comp.pipelineValue || 0) / 1000).toFixed(0)}k`,
        icon: 'building',
        meta: comp,
        companyId: comp.id,
      });
    }
  }

  // 4. Projects
  if (data?.projects && Array.isArray(data.projects)) {
    for (const proj of data.projects) {
      index.push({
        id: `project-${proj.id}`,
        type: 'project',
        category: 'Projects',
        title: proj.name,
        subtitle: `${proj.desc || 'Active project'} - ${proj.tasks?.length || 0} tasks`,
        icon: 'folder',
        projectId: proj.id,
      });
    }
  }

  // 5. Tasks
  if (data?.tasks && Array.isArray(data.tasks)) {
    for (const task of data.tasks) {
      index.push({
        id: `task-${task.id}`,
        type: 'task',
        category: 'Tasks',
        title: task.title,
        subtitle: `Status: ${task.status || 'todo'} - Priority: ${task.pri || 'med'}${task.due ? ' - Due: ' + task.due : ''}`,
        icon: 'check-circle-2',
        taskId: task.id,
      });
    }
  }

  searchIndex = index;
  return searchIndex;
}

/**
 * Score and query search index
 */
export function querySearch(query) {
  if (!query || !query.trim()) {
    // Return top actions and recent navigation items
    return searchIndex.slice(0, 10);
  }

  const q = query.toLowerCase().trim();
  const scored = [];

  for (const item of searchIndex) {
    const title = item.title.toLowerCase();
    const subtitle = (item.subtitle || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();

    let score = 0;
    if (title === q) {
      score += 100;
    } else if (title.startsWith(q)) {
      score += 60;
    } else if (title.includes(q)) {
      score += 40;
    } else if (subtitle.includes(q)) {
      score += 20;
    } else if (cat.includes(q)) {
      score += 10;
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 15).map((s) => s.item);
}

/**
 * Save workspace data atomically
 */
export function saveWorkspace(data) {
  workspaceCache = data;
  buildSearchIndex(data);

  const tmpFile = `${DATA_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpFile, DATA_FILE);
  return { success: true, timestamp: Date.now() };
}

/**
 * Load workspace data
 */
export function loadWorkspace() {
  if (workspaceCache) return workspaceCache;

  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      workspaceCache = JSON.parse(raw);
      buildSearchIndex(workspaceCache);
      return workspaceCache;
    } catch (err) {
      console.error('[DesktopService] Error reading workspace data:', err);
    }
  }

  return null;
}

/**
 * HTTP REST Server
 */
const server = http.createServer(async (req, res) => {
  // CORS Headers for Desktop Webview
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // Health check
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'Gr8r Studio CRM Desktop Service', uptime: process.uptime() }));
    return;
  }

  // Search API
  if (pathname === '/api/search' && req.method === 'GET') {
    const q = parsedUrl.searchParams.get('q') || '';
    const results = querySearch(q);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ results }));
    return;
  }

  // Get workspace data
  if (pathname === '/api/workspace' && req.method === 'GET') {
    const data = loadWorkspace();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data }));
    return;
  }

  // Save workspace data
  if (pathname === '/api/workspace' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const result = saveWorkspace(payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // 404 fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Start listening if run directly
if (process.argv[1] && process.argv[1].endsWith('desktop-service.mjs')) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`[DesktopService] Running at http://127.0.0.1:${PORT}`);
  });
}

// Graceful shutdown
process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());

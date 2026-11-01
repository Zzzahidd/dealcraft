const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeHuman(page, text, delayMs = 70) {
  for (const char of text) {
    await page.keyboard.press(char);
    await sleep(delayMs);
  }
}

(async () => {
  const outputDir = path.resolve('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/public/assets/recordings');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // RECORDING 1: REAL DEALS PIPELINE
  console.log('--- 1. Recording Deals Pipeline ---');
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1280, height: 720 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175');
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await sleep(1000);

    // Click Pipeline
    await page.click('button[data-r="pipeline"]');
    await sleep(1500);

    // Hover cards
    const cards = page.locator('.deal, .card, [data-deal]');
    const count = await cards.count();
    if (count > 0) {
      await cards.nth(0).hover();
      await sleep(800);
      if (count > 2) {
        await cards.nth(2).hover();
        await sleep(800);
      }
    }

    // Horizontal smooth scroll across pipeline stages
    await page.mouse.move(600, 400);
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(150, 0);
      await sleep(200);
    }
    await sleep(1200);
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(-150, 0);
      await sleep(200);
    }
    await sleep(1500);

    await context.close();
    console.log('Saved Pipeline video');
  }

  // RECORDING 2: REAL SPOTLIGHT SEARCH
  console.log('--- 2. Recording Spotlight Search ---');
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1280, height: 720 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175');
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await sleep(1000);

    // Click Spotlight search button
    await page.click('button.topsearch');
    await sleep(1000);

    // Search "Acme"
    const input = page.locator('#pal-in, .pal-in, input[placeholder*="Search"]').first();
    await input.focus();
    await sleep(400);
    await typeHuman(page, 'Acme Corp');
    await sleep(1500);

    // Navigate with keyboard
    await page.keyboard.press('ArrowDown');
    await sleep(600);
    await page.keyboard.press('ArrowDown');
    await sleep(1000);

    // Clear and search "wireframes"
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press('Backspace');
      await sleep(40);
    }
    await sleep(400);
    await typeHuman(page, 'wireframe');
    await sleep(1800);

    await context.close();
    console.log('Saved Spotlight video');
  }

  // RECORDING 3: REAL TASKS WORKFLOW
  console.log('--- 3. Recording Tasks Workflow ---');
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1280, height: 720 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175');
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await sleep(1000);

    // Click My Tasks
    await page.click('button[data-r="mytasks"]');
    await sleep(1500);

    // Hover task item
    const taskRows = page.locator('.task-row, .trow, .task-item, [data-task]');
    if (await taskRows.count() > 0) {
      await taskRows.first().hover();
      await sleep(1000);
    }

    // Scroll
    await page.mouse.wheel(0, 200);
    await sleep(1000);
    await page.mouse.wheel(0, -200);
    await sleep(1200);

    // Click Tasks under Workspace
    await page.click('button[data-r="tasks"]');
    await sleep(2000);

    await context.close();
    console.log('Saved Tasks video');
  }

  // RECORDING 4: REAL COMPANIES DIRECTORY
  console.log('--- 4. Recording Companies Directory ---');
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1280, height: 720 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175');
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await sleep(1000);

    // Click Companies
    await page.click('button[data-r="companies"]');
    await sleep(1800);

    // Smooth scroll down through companies (LVMH, Disney, Apple, etc.)
    await page.mouse.wheel(0, 300);
    await sleep(1200);
    await page.mouse.wheel(0, 300);
    await sleep(1200);
    await page.mouse.wheel(0, -600);
    await sleep(1500);

    await context.close();
    console.log('Saved Companies video');
  }

  await browser.close();
  console.log('All 4 real Dealcraft app recordings completed!');
})();

const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Simulated human typing
async function typeHuman(page, selector, text, delayMs = 60) {
  for (const char of text) {
    await page.type(selector, char, { delay: delayMs });
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

  // RECORDING 1: Pipeline & Companies Screen Recording
  console.log('--- Starting Recording 1: Pipeline & Deals ---');
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1280, height: 720 }
      }
    });
    const page = await context.newPage();
    // Clear localStorage to load fresh rich seed data
    await page.goto('http://127.0.0.1:5175');
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await sleep(1500);

    // Look for Pipeline or Companies in sidebar
    const pipelineLink = page.locator('text=Pipeline').first();
    if (await pipelineLink.isVisible()) {
      await pipelineLink.click();
      await sleep(1500);
    }

    // Scroll down and inspect deals
    await page.mouse.wheel(0, 300);
    await sleep(1000);
    await page.mouse.wheel(0, -300);
    await sleep(800);

    // Search within CRM if search input exists
    const searchInputs = page.locator('input[type="text"], input[type="search"]');
    if (await searchInputs.count() > 0) {
      await searchInputs.first().click();
      await sleep(300);
      await typeHuman(page, 'input[type="text"], input[type="search"]', 'Stripe', 80);
      await sleep(1500);
    }

    await sleep(1000);
    await context.close();
    console.log('Finished Recording 1');
  }

  // RECORDING 2: Spotlight & Command Navigation
  console.log('--- Starting Recording 2: Spotlight ---');
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1280, height: 720 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175', { waitUntil: 'networkidle' });
    await sleep(1200);

    // Press Ctrl+Space or click the search box
    const searchBtn = page.locator('text=Search CRM, t').or(page.locator('input[placeholder*="Search"]')).first();
    if (await searchBtn.isVisible()) {
      await searchBtn.click();
      await sleep(600);
    } else {
      await page.keyboard.down('Control');
      await page.keyboard.press('Space');
      await page.keyboard.up('Control');
      await sleep(800);
    }

    // Type query in active search
    await page.keyboard.type('Sarah', { delay: 90 });
    await sleep(1200);
    await page.keyboard.press('ArrowDown');
    await sleep(400);
    await page.keyboard.press('ArrowDown');
    await sleep(800);

    // Backspace and type another query
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Backspace');
      await sleep(50);
    }
    await page.keyboard.type('Website Redesign', { delay: 70 });
    await sleep(1500);

    await context.close();
    console.log('Finished Recording 2');
  }

  // RECORDING 3: Task Execution & Board
  console.log('--- Starting Recording 3: Tasks ---');
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1280, height: 720 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175', { waitUntil: 'networkidle' });
    await sleep(1000);

    // Navigate to Tasks
    const tasksLink = page.locator('text=My Tasks').or(page.locator('text=Tasks')).first();
    if (await tasksLink.isVisible()) {
      await tasksLink.click();
      await sleep(1200);
    }

    // Click "+ New task"
    const newTaskBtn = page.locator('text=+ New task').or(page.locator('button:has-text("New task")')).first();
    if (await newTaskBtn.isVisible()) {
      await newTaskBtn.click();
      await sleep(800);

      // Type new task name
      const titleInput = page.locator('input[placeholder*="task"], input[placeholder*="Title"], input[type="text"]').last();
      if (await titleInput.isVisible()) {
        await titleInput.click();
        await titleInput.fill('Sign enterprise MSA with Acme Corp counsel');
        await sleep(1000);
      }
    }

    await sleep(1200);
    await context.close();
    console.log('Finished Recording 3');
  }

  await browser.close();
  console.log('All screen recordings generated successfully!');
})();

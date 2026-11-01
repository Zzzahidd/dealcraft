const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
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

  // RECORDING 1: Pipeline & Deals
  console.log('Recording 1: Pipeline');
  {
    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1366, height: 768 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175');
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await sleep(1500);

    // Click Pipeline
    await page.click('button[data-r="pipeline"]');
    await sleep(2000);

    // Smoothly scroll pipeline
    await page.mouse.wheel(0, 350);
    await sleep(1200);
    await page.mouse.wheel(0, -350);
    await sleep(1200);

    // Hover a company card or row
    const card = page.locator('.deal, .card, .crow, tr, .pipeline-card').first();
    if (await card.isVisible()) {
      await card.hover();
      await sleep(1500);
    }

    await context.close();
    console.log('Finished Recording 1');
  }

  // RECORDING 2: Spotlight Command Palette
  console.log('Recording 2: Spotlight');
  {
    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1366, height: 768 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175', { waitUntil: 'networkidle' });
    await sleep(1500);

    // Click top search button to open Raycast / Spotlight
    await page.click('button.topsearch');
    await sleep(1200);

    // Type "Stripe" in active search
    await page.keyboard.type('Stripe', { delay: 90 });
    await sleep(1800);

    // Navigate down
    await page.keyboard.press('ArrowDown');
    await sleep(600);
    await page.keyboard.press('ArrowDown');
    await sleep(1200);

    // Backspace
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Backspace');
      await sleep(60);
    }
    await sleep(500);

    // Type "Pipeline"
    await page.keyboard.type('Pipeline', { delay: 80 });
    await sleep(1500);
    await page.keyboard.press('Enter');
    await sleep(2000);

    await context.close();
    console.log('Finished Recording 2');
  }

  // RECORDING 3: Companies & CRM Directory
  console.log('Recording 3: Companies');
  {
    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1366, height: 768 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175', { waitUntil: 'networkidle' });
    await sleep(1500);

    // Click Companies
    await page.click('button[data-r="companies"]');
    await sleep(2000);

    // Scroll table
    await page.mouse.wheel(0, 400);
    await sleep(1500);
    await page.mouse.wheel(0, -400);
    await sleep(1200);

    // Filter by search if input exists
    const searchInput = page.locator('input[type="text"], input[type="search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.click();
      await page.keyboard.type('Apple', { delay: 90 });
      await sleep(2000);
    }

    await context.close();
    console.log('Finished Recording 3');
  }

  // RECORDING 4: Tasks & Board Execution
  console.log('Recording 4: Tasks');
  {
    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1366, height: 768 }
      }
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5175', { waitUntil: 'networkidle' });
    await sleep(1500);

    // Click Tasks
    await page.click('button[data-r="tasks"]');
    await sleep(2000);

    // Switch between views or scroll
    await page.mouse.wheel(0, 300);
    await sleep(1200);
    await page.mouse.wheel(0, -300);
    await sleep(1500);

    await context.close();
    console.log('Finished Recording 4');
  }

  await browser.close();
  console.log('All 4 real Dealcraft screen recordings captured!');
})();

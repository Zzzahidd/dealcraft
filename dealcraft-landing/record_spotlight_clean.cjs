const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  const outputDir = path.resolve('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/public/assets/recordings');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

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

  // Click topsearch to open Spotlight
  console.log('Opening spotlight...');
  await page.click('button.topsearch');
  await sleep(1200);

  // Focus and type in the palette input
  const input = page.locator('#pal-in, .pal-in, input[placeholder*="Search"]').first();
  await input.focus();
  await sleep(400);

  const query = 'Acme Corp';
  for (const char of query) {
    await page.keyboard.press(char);
    await sleep(90);
  }
  await sleep(1500);

  // Press down arrow twice
  await page.keyboard.press('ArrowDown');
  await sleep(600);
  await page.keyboard.press('ArrowDown');
  await sleep(1200);

  // Clear query
  for (let i = 0; i < query.length; i++) {
    await page.keyboard.press('Backspace');
    await sleep(50);
  }
  await sleep(400);

  // Type second query "wireframes"
  const q2 = 'wireframe';
  for (const char of q2) {
    await page.keyboard.press(char);
    await sleep(80);
  }
  await sleep(1800);

  await context.close();
  await browser.close();
  console.log('Spotlight recording finished!');
})();

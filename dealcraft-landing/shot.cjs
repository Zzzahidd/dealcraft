const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle0' });
  
  const tempDir = 'C:\\Users\\zahid\\.gemini\\antigravity\\brain\\e1b246d1-afb6-40de-a503-1ca5a9fd6295';
  
  // Hero shot
  await page.screenshot({ path: path.join(tempDir, 'shot_1_hero.png') });
  
  // Interactive demo shot
  await page.evaluate(() => {
    const el = document.getElementById('interactive-demo');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(tempDir, 'shot_2_interactive.png') });

  // Technical architecture
  await page.evaluate(() => {
    const el = document.getElementById('architecture');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(tempDir, 'shot_3_architecture.png') });

  // Editorial gallery & Philosophy
  await page.evaluate(() => {
    const el = document.getElementById('art-and-craft');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(tempDir, 'shot_4_art.png') });

  // Keyboard Shortcuts & Download CTA & Footer
  await page.evaluate(() => {
    const el = document.getElementById('download');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(tempDir, 'shot_5_download.png') });
  
  await browser.close();
  console.log('All 5 screenshots captured!');
})();

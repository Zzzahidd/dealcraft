const path = require('path');
const puppeteer = require('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/node_modules/puppeteer-core');
const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\zahid\\.gemini\\antigravity\\brain\\e1b246d1-afb6-40de-a503-1ca5a9fd6295';

(async () => {
  const browser = await puppeteer.launch({ executablePath, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // Capture full page
  await page.screenshot({ path: path.join(brainDir, 'verify_cursor_fullpage.png'), fullPage: true });

  await browser.close();
  console.log('Cursor layout screenshot captured!');
})();

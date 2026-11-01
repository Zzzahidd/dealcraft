const puppeteer = require('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/node_modules/puppeteer-core');
const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  const nav = await page.$('header');
  if (nav) {
    await nav.screenshot({
      path: 'C:/Users/zahid/.gemini/antigravity/brain/2dcf59ca-95e0-4cca-969d-2f0afd367bca/verified_black_announcement_bar.png'
    });
  }

  console.log('Black announcement bar screenshot captured successfully.');
  await browser.close();
})();

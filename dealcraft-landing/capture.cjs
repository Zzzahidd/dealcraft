const fs = require('fs');
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
  await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });

  await new Promise(r => setTimeout(r, 1500));

  // 1. Showcase
  const showcase = await page.$('#showcase');
  if (showcase) {
    await showcase.screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/fixed_showcase.png' });
  }

  // 2. Spotlight
  const spotlight = await page.$('#spotlight');
  if (spotlight) {
    await spotlight.screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/fixed_spotlight.png' });
  }

  // 3. Components
  const components = await page.$('#components');
  if (components) {
    await components.screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/fixed_components.png' });
  }

  // 4. Footer
  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/fixed_footer.png' });
  }

  // 5. Fullpage
  await page.screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/fixed_fullpage.png', fullPage: true });

  await browser.close();
  console.log('Fixed screenshots captured successfully!');
})();

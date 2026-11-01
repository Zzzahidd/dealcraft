const puppeteer = require('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/node_modules/puppeteer-core');
const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  const sections = await page.$$('section');
  console.log('Found sections:', sections.length);
  // Indices:
  // 0: Hero
  // 1: AppShowcase
  // 2: SpotlightSection
  // 3: InteractiveAppComponents
  // 4: Feature Pipeline
  // 5: Feature Tasks
  // 6: Feature Accounts
  // 7: Feature Notes
  // 8: Architecture
  if (sections[4]) {
    await sections[4].screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/verify_feature_pipeline.png' });
  }
  if (sections[5]) {
    await sections[5].screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/verify_feature_tasks.png' });
  }
  if (sections[6]) {
    await sections[6].screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/verify_feature_accounts.png' });
  }
  if (sections[7]) {
    await sections[7].screenshot({ path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/verify_feature_notes.png' });
  }
  await browser.close();
  console.log('Feature showcase screenshots captured');
})();

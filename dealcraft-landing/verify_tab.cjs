const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: false
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto('http://127.0.0.1:4173');
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => {
    const el = document.getElementById('interactive-demo');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  
  // Click Spotlight Search tab
  await page.click('button:has-text("Spotlight Search")');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/public/assets/recordings/verified_spotlight_tab.png' });
  
  await browser.close();
  console.log('Spotlight tab verified!');
})();

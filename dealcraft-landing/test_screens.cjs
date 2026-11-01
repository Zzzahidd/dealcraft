const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: false
  });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://127.0.0.1:5175');
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await new Promise(r => setTimeout(r, 1000));
  
  // Click pipeline
  console.log('Navigating to Pipeline...');
  await page.click('button[data-r="pipeline"]');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/public/assets/recordings/test_pipeline_screen.png' });
  
  // Click search
  console.log('Opening Spotlight...');
  await page.click('button.topsearch');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/public/assets/recordings/test_spotlight_screen.png' });
  
  await browser.close();
  console.log('Test screenshots taken!');
})();

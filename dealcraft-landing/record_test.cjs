const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const outputDir = path.resolve('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/public/assets/recordings');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: false, // run visible or headless: 'new'
  });

  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1366, height: 768 }
    }
  });

  const page = await context.newPage();
  console.log('Navigating to Dealcraft app...');
  await page.goto('http://127.0.0.1:5175', { waitUntil: 'networkidle' });

  // Take a high-res screenshot as well
  await page.screenshot({ path: path.join(outputDir, 'dealcraft_real_dashboard.png') });
  console.log('Real dashboard screenshot captured!');

  await page.waitForTimeout(3000);
  await context.close();
  await browser.close();
  console.log('Done test recording');
})();

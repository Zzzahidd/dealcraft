const fs = require('fs');
const path = require('path');
const puppeteer = require('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/node_modules/puppeteer-core');
const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const outDir = 'c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/public/assets/app-shots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture sales-crm-main (http://localhost:3005)
  console.log('Capturing sales-crm-main...');
  try {
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle0', timeout: 25000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(outDir, 'sales_crm_table.png') });

    // Click on the second row (Snowflake or LVMH) to open detail drawer
    const rows = await page.$$('tr[role="row"].cursor-pointer');
    if (rows.length > 1) {
      await rows[1].click();
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(outDir, 'sales_crm_detail.png') });
    }
  } catch (err) {
    console.error('sales-crm-main capture error:', err.message);
  }

  // 2. Capture gr8r-studio-main (http://localhost:5180)
  console.log('Capturing gr8r-studio-main...');
  try {
    await page.goto('http://localhost:5180', { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(outDir, 'gr8r_home.png') });

    // Navigate to tasks
    await page.evaluate(() => {
      const btn = document.querySelector('[data-a="go"][data-r="tasks"]');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, 'gr8r_tasks.png') });

    // Navigate to board (click on Website Redesign project board)
    await page.evaluate(() => {
      const projLink = document.querySelector('[data-drag-proj="p1"]');
      if (projLink) projLink.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, 'gr8r_board.png') });

    // Navigate to timeline
    await page.evaluate(() => {
      const tlBtn = document.querySelector('[data-a="go"][data-tab="timeline"]') || document.querySelector('[data-a="go"][data-r="timeline"]');
      if (tlBtn) tlBtn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, 'gr8r_timeline.png') });
  } catch (err) {
    console.error('gr8r-studio-main capture error:', err.message);
  }

  await browser.close();
  console.log('App screenshots refreshed!');
})();

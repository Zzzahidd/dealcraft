const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  // Check border-radius values across the sections
  const radiusInfo = await page.evaluate(() => {
    // Feature showcase cards
    const cards = Array.from(document.querySelectorAll('section div.rounded-\\[2px\\]'));
    const allBorderRadii = cards.map(el => ({
      tag: el.tagName,
      className: el.className.split(' ').slice(0, 3).join(' '),
      borderRadius: window.getComputedStyle(el).borderRadius
    }));

    return allBorderRadii.slice(0, 15);
  });

  console.log('Sample Computed Radii:', JSON.stringify(radiusInfo, null, 2));

  // Take screenshot of FeatureShowcases section
  const featureSection = await page.$('section.border-t.border-\\[\\#24241B\\]:nth-of-type(4)');
  // Or find by text
  const sections = await page.$$('section');
  for (let i = 0; i < sections.length; i++) {
    const text = await page.evaluate(el => el.textContent, sections[i]);
    if (text.includes('Turn customer conversations into closed deals')) {
      await sections[i].screenshot({
        path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/verify_2px_radius_features.png'
      });
      console.log('Saved features screenshot!');
    }
    if (text.includes('Built for closing deals.')) {
      await sections[i].screenshot({
        path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/verify_2px_radius_components.png'
      });
      console.log('Saved components screenshot!');
    }
  }

  // Scroll back to top before capturing fullpage so fixed header stays at the top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));

  // Full page screenshot
  await page.screenshot({
    path: 'C:/Users/zahid/.gemini/antigravity/brain/e1b246d1-afb6-40de-a503-1ca5a9fd6295/verify_2px_radius_fullpage.png',
    fullPage: true
  });
  console.log('Saved fullpage screenshot!');

  await browser.close();
})();

const path = require('path');
const puppeteer = require('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/node_modules/puppeteer-core');
const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\zahid\\.gemini\\antigravity\\brain\\e1b246d1-afb6-40de-a503-1ca5a9fd6295';

(async () => {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Linear Intake Section
  const elIntake = await page.$('#intake');
  if (elIntake) {
    await elIntake.screenshot({ path: path.join(brainDir, 'verify_linear_intake.png') });
  }

  // 2. Capture Linear Planning Section
  const elPlanning = await page.$('#planning');
  if (elPlanning) {
    await elPlanning.screenshot({ path: path.join(brainDir, 'verify_linear_planning.png') });
  }

  // 3. Capture Linear Review Section
  const elReview = await page.$('#review');
  if (elReview) {
    await elReview.screenshot({ path: path.join(brainDir, 'verify_linear_review.png') });
  }

  // 4. Capture Interactive Components Section (Section 4 / Image 4)
  const elComponents = await page.$('#components');
  if (elComponents) {
    await elComponents.screenshot({ path: path.join(brainDir, 'verify_components_section4.png') });
  }

  // 5. Capture Real App Gallery
  const elGallery = await page.$('#gallery');
  if (elGallery) {
    await elGallery.screenshot({ path: path.join(brainDir, 'verify_gallery.png') });
  }

  // 6. Capture Spotlight Section (verify cropping)
  const elSpotlight = await page.$('#spotlight');
  if (elSpotlight) {
    await elSpotlight.screenshot({ path: path.join(brainDir, 'verify_spotlight_cropped.png') });
  }

  // 7. Full Page Screenshot
  await page.screenshot({ path: path.join(brainDir, 'verify_fullpage_redesign.png'), fullPage: true });

  await browser.close();
  console.log('Verification screenshots captured!');
})();

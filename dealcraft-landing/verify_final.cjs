const puppeteer = require('c:/Users/zahid/Desktop/Dekstop test/dealcraft-landing/node_modules/puppeteer-core');
const path = require('path');
const executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const brainDir = 'C:\\Users\\zahid\\.gemini\\antigravity\\brain\\e1b246d1-afb6-40de-a503-1ca5a9fd6295';

(async () => {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Hero Section specifically
  const heroSection = await page.$('section');
  if (heroSection) {
    await heroSection.screenshot({
      path: path.join(brainDir, 'verify_final_hero.png')
    });
    console.log('Hero screenshot captured: verify_final_hero.png');
  }

  // 2. Full Page Screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(brainDir, 'verify_final_clean.png'),
    fullPage: true
  });
  console.log('Fullpage clean screenshot captured: verify_final_clean.png');

  // 3. Comprehensive DOM Audit
  const audit = await page.evaluate(() => {
    // Audit fonts
    const elements = Array.from(document.querySelectorAll('*'));
    const fontFamilies = new Set();
    const consolasElements = [];
    const monospaceElements = [];

    for (const el of elements) {
      const computed = window.getComputedStyle(el);
      const ff = computed.fontFamily;
      fontFamilies.add(ff);
      if (ff.toLowerCase().includes('consolas')) {
        consolasElements.push({ tag: el.tagName, class: el.className, text: el.innerText?.slice(0, 30) });
      }
      if (ff.toLowerCase().includes('monospace') && !ff.toLowerCase().includes('schibsted')) {
        monospaceElements.push({ tag: el.tagName, class: el.className, text: el.innerText?.slice(0, 30) });
      }
    }

    // Audit blue outside hero section
    const hero = document.querySelector('section');
    const nonHeroElements = elements.filter(el => !hero || !hero.contains(el));
    const unexpectedBlueElements = [];

    for (const el of nonHeroElements) {
      const computed = window.getComputedStyle(el);
      const color = computed.color;
      const bg = computed.backgroundColor;
      const border = computed.borderColor;

      // Check if blue shades like #001B9D (0, 27, 157) or similar are present
      function isBlue(c) {
        const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return false;
        const [r, g, b] = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        // Check for dominant blue #001B9D
        return b > 140 && r < 40 && g < 60;
      }

      if (isBlue(color) || isBlue(bg) || isBlue(border)) {
        unexpectedBlueElements.push({
          tag: el.tagName,
          class: el.className,
          text: el.innerText?.slice(0, 40),
          color,
          bg,
          border
        });
      }
    }

    // Inspect CTA buttons
    const ctas = Array.from(document.querySelectorAll('a[download], a[href*="download"], button'))
      .map(btn => {
        const style = window.getComputedStyle(btn);
        return {
          text: btn.innerText.trim().replace(/\n/g, ' '),
          bg: style.backgroundColor,
          color: style.color,
          borderRadius: style.borderRadius
        };
      });

    // Check existing sections
    const sectionIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);

    return {
      uniqueFontFamilies: Array.from(fontFamilies).slice(0, 10),
      consolasCount: consolasElements.length,
      consolasElements,
      monospaceCount: monospaceElements.length,
      unexpectedBlueCount: unexpectedBlueElements.length,
      unexpectedBlueElements,
      ctas,
      sectionIds
    };
  });

  console.log('--- AUDIT RESULTS ---');
  console.log('Font families detected:', audit.uniqueFontFamilies);
  console.log('Consolas count:', audit.consolasCount);
  console.log('Monospace count:', audit.monospaceCount);
  console.log('Unexpected blue elements outside hero count:', audit.unexpectedBlueCount);
  if (audit.unexpectedBlueCount > 0) {
    console.log('Blue elements:', audit.unexpectedBlueElements);
  }
  console.log('CTAs found:', audit.ctas);
  console.log('Sections present:', audit.sectionIds);

  await browser.close();
})();

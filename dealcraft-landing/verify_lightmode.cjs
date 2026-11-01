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
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture Hero Section specifically
  const heroSection = await page.$('section');
  if (heroSection) {
    await heroSection.screenshot({
      path: path.join(brainDir, 'verify_hero_cobalt.png')
    });
    console.log('Hero screenshot captured!');
  }

  // 2. Full Page Screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(brainDir, 'verify_lightmode_fullpage.png'),
    fullPage: true
  });
  console.log('Fullpage light mode screenshot captured!');

  // 3. Contrast audit of key elements
  const audit = await page.evaluate(() => {
    function parseRgb(colorStr) {
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return [0, 0, 0];
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    function luminance(r, g, b) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    function contrast(rgb1, rgb2) {
      const l1 = luminance(...rgb1);
      const l2 = luminance(...rgb2);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    const elements = [
      { name: 'Body Text', el: document.querySelector('body') },
      { name: 'Section Heading', el: document.querySelector('h2') },
      { name: 'Feature Card Heading', el: document.querySelector('div.bg-white h2') },
      { name: 'Feature Link', el: document.querySelector('a.text-\\[\\#001B9D\\]') },
    ];

    return elements.map(item => {
      if (!item.el) return { name: item.name, status: 'not found' };
      const style = window.getComputedStyle(item.el);
      const color = parseRgb(style.color);
      // Assume light background #F4F4F0 [244, 244, 240] or white [255, 255, 255]
      const crLight = contrast(color, [244, 244, 240]);
      const crWhite = contrast(color, [255, 255, 255]);
      return {
        name: item.name,
        color: style.color,
        contrastVsLightBg: crLight.toFixed(2),
        contrastVsWhite: crWhite.toFixed(2),
        passesWcagAAA: crLight >= 7.0
      };
    });
  });

  console.log('Contrast Audit:', JSON.stringify(audit, null, 2));

  await browser.close();
})();

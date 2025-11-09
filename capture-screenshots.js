import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080');
  await page.waitForLoadState('networkidle');
  
  // Capture hero screenshot (initial state)
  await page.screenshot({ path: 'docs/screenshots/hero.png', fullPage: false });
  console.log('✓ Hero screenshot captured');
  
  // Capture feature screenshot - performing calculation
  await page.click('#btn-5');
  await page.click('#btn-add');
  await page.click('#btn-3');
  await page.screenshot({ path: 'docs/screenshots/feature-01-operation.png' });
  console.log('✓ Feature screenshot 1 captured');
  
  await page.click('#btn-equals');
  await page.screenshot({ path: 'docs/screenshots/feature-02-result.png' });
  console.log('✓ Feature screenshot 2 captured');
  
  // Capture decimal operation
  await page.click('#btn-clear');
  await page.click('#btn-3');
  await page.click('#btn-decimal');
  await page.click('#btn-1');
  await page.click('#btn-4');
  await page.click('#btn-multiply');
  await page.click('#btn-2');
  await page.click('#btn-equals');
  await page.screenshot({ path: 'docs/screenshots/feature-03-decimal.png' });
  console.log('✓ Feature screenshot 3 captured');
  
  // Create manifest
  const manifest = {
    generated: new Date().toISOString(),
    baseURL: 'http://localhost:8080',
    projectType: 'web-app',
    screenshots: [
      {
        filename: 'hero.png',
        path: 'docs/screenshots/hero.png',
        type: 'hero',
        description: 'Calculator initial view with clean UI'
      },
      {
        filename: 'feature-01-operation.png',
        path: 'docs/screenshots/feature-01-operation.png',
        type: 'feature',
        description: 'Calculator showing operation in progress (5 + 3)'
      },
      {
        filename: 'feature-02-result.png',
        path: 'docs/screenshots/feature-02-result.png',
        type: 'feature',
        description: 'Calculator displaying calculation result'
      },
      {
        filename: 'feature-03-decimal.png',
        path: 'docs/screenshots/feature-03-decimal.png',
        type: 'feature',
        description: 'Calculator handling decimal operations (3.14 × 2)'
      }
    ],
    total: 4,
    failed: 0
  };
  
  await page.context().close();
  await browser.close();
  
  // Write manifest
  const fs = await import('fs');
  fs.writeFileSync('docs/screenshots/manifest.json', JSON.stringify(manifest, null, 2));
  console.log('✓ Manifest created');
  console.log(`\nScreenshot capture complete: ${manifest.total} screenshots`);
})();

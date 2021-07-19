import { chromium } from 'playwright';

(async function () {
    const chrome = await chromium.launch({
        headless: false,
        tracesDir: './trace',
        args: ['--start-maximized'],
    });
    const page = await chrome.newPage({
        viewport: null,
        recordHar: { omitContent: true, path: './hars' },
    });
    await page.goto('https://www.google.co.in');
    await page.fill("[name='q']", 'Playwright');
    await page.click("[name='btnK']");
    await page.close();
    await chrome.close();
})();

import {chromium} from "playwright-core"

(async function () {
    const chrome = await chromium.launch({ headless: false });
    const page = await chrome.newPage();
    await page.goto("https://www.google.co.in");
    await page.fill("[name='q']", "Playwright");
    await page.click("[name='btnK']");
    await page.close();
    await chrome.close();
})();

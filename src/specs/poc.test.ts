import {
    Browser,
    BrowserContext,
    BrowserServer,
    chromium,
    Page,
} from 'playwright';
import BasePage from '../pages/base_page';

let basePage;
let server: BrowserServer;
let browser: Browser;
let browserContext: BrowserContext;
let page: Page;

describe('PoC For Playwright', () => {
    beforeAll(async () => {
        browser = await chromium.launch({
            args: ['--start-maximized'],
            executablePath: process.env.CHROME_PATH,
            headless: true,
        });

        // browser = await chromium.connectOverCDP({
        //     endpointURL: 'wss://cloud.testingbot.com?key=cdbcbd135a8e6c646d1126bf2a2f13c4&secret=00c135b18a6e969c8e751df89e6883dc&browserName=chrome&browserVersion=latest'
        // })

        browserContext = await browser.newContext({
            acceptDownloads: true,
            javaScriptEnabled: true,
            // recordHar: {
            //     path: "./har"
            // },
            recordVideo: {
                dir: './video',
            },
            viewport: null,
        });
    });

    beforeEach(async () => {
        await browserContext.clearCookies();
        await browserContext.clearPermissions();
        browserContext.setDefaultTimeout(30000);
        browserContext.setDefaultNavigationTimeout(60000);

        page = await browserContext.newPage();
        basePage = new BasePage(page);
    });

    test('should work perfect - 4', async () => {
        await basePage.open_url('https://the-internet.herokuapp.com/windows');
        const [popup1] = await Promise.all([
            page.waitForEvent('popup'),
            page.evaluate(() => window.open('https://example.com', '_blank')),
        ]);
        console.log(await popup1.evaluate('location.href'));
        await popup1.close();

        await basePage.open_url('https://the-internet.herokuapp.com/windows');
        const [popup2] = await Promise.all([
            page.waitForEvent('popup'),
            page.click('#content a'),
        ]);
        console.log(await popup2.url());
        await page.bringToFront();
        await popup2.close();
    });

    test('should work perfect - 5', async () => {
        await basePage.open_url('https://the-internet.herokuapp.com/');
        await page.on('dialog', (dialog) => {
            dialog.accept('Send In Dialog');
            // dialog.dismiss();
            // dialog.type();
            // dialog.defaultValue();
        });
    });

    test('should work perfect - 5', async () => {
        await basePage.open_url('https://the-internet.herokuapp.com/');
    });

    afterEach(async () => {
        await page.close();
    });

    afterAll(async () => {
        await browserContext.close();
        await server.kill();
        await browser.close();
    });
});

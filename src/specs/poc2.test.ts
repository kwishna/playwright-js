import {Browser, BrowserContext, BrowserServer, chromium, FileChooser, Page} from "playwright-core";
import BasePage from "../pages/base_page";

let basePage;
let server: BrowserServer;
let browser: Browser;
let browserContext: BrowserContext;
let page: Page;

describe("PoC For Playwright", () => {

    beforeAll(async () => {

        server = await chromium.launchServer({
            downloadsPath: "./downloads",
            executablePath: process.env.CHROME_PATH,
            logger: {
                isEnabled: (name, severity) => name === 'browser',
                log: (name, severity, message, args) => console.log(`${name} ${message}`)
            },
            headless: false,
            args: ["--start-maximized"]
        });

        browser = await chromium.connect({
            wsEndpoint: server.wsEndpoint(),
            slowMo: 0,
        });

        browserContext = await browser.newContext({
            acceptDownloads: true,
            javaScriptEnabled: true,
            // recordHar: {
            //     path: "./har"
            // },
            recordVideo: {
                dir: "./video"
            },
            // viewport: {
            //     height: 850,
            //     width: 1550
            // },
            // viewport: null
        });
    });

    beforeEach(async () => {
        await browserContext.clearCookies();
        await browserContext.clearPermissions();
        browserContext.setDefaultTimeout(30000);
        browserContext.setDefaultNavigationTimeout(60000);

        page = await browserContext.newPage();
        basePage = new BasePage(page);
    })

    test("should work perfect - 1", async () => {
        await basePage.open_url("https://the-internet.herokuapp.com/windows");
        const [popup1] = await Promise.all([
            page.waitForEvent('popup'),
            page.evaluate(() => window.open('https://example.com', '_blank')),
        ]);
        console.log(await popup1.evaluate('location.href'));
        await popup1.close();

        await basePage.open_url("https://the-internet.herokuapp.com/windows");
        const [popup2] = await Promise.all([
            page.waitForEvent('popup'),
            page.click("#content a")
        ]);
        console.log(await popup2.url());
        await page.bringToFront();
        await popup2.close();
    })

    test("should work perfect - 2", async () => {
        await basePage.open_url("https://the-internet.herokuapp.com/");
        await page.on("dialog", dialog => {
            dialog.accept("Send In Dialog")
        })
    })

    test("should work perfect - 3", async () => {
        await basePage.open_url("https://the-internet.herokuapp.com/");
    })

    afterEach(async () => {
        await page.close();
    })

    afterAll(async () => {
        await browserContext.close();
        await server.kill();
        await browser.close();
    })
})

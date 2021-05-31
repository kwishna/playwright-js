import {BrowserFactory} from "../factory/driver_factory_v2";
import {Browser, BrowserContext, Page} from "playwright-core";
import {chromeConfiguration} from "../configurations/browser_configurations";


describe("In Order To Test The Framework", () => {
    let handler: BrowserFactory;
    let factory: BrowserContext;
    let driver: Page;

    let browser: Browser;

    beforeAll(async () => {
        handler = new BrowserFactory(chromeConfiguration);

    });

    beforeEach(async () => {
        factory = await handler.driverFactory();
        driver = await handler.getNewDriver(factory);
    });

    test("I Open Chrome Browser Once", async () => {
        await driver.goto("http://google.co.in");
    });

    test("I Open Chrome Browser Twice", async () => {
        await driver.goto("http://google.co.in");
    });

    test("I Open Chrome Browser Thrice", async () => {
        await driver.goto("http://google.co.in");
    });

    afterEach(async () => {
        await handler.closeAllConnections();
    })

    afterAll(async () => {
        await handler.destroyBrowser();
    })

})

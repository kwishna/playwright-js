import {Browser, BrowserContext, Page} from "playwright";
import {BrowserConfiguration} from "../configurations/browser_interfaces_v2";
import {defaultConfiguration, defaultContext} from "../configurations/browser_configurations";
import {ServiceProvider} from "../services/service_provider_v2"

export class BrowserFactory {
    private readonly browserName: string;
    private readonly serverConfiguration: BrowserConfiguration;

    private browser: Browser;
    private serviceProvider: ServiceProvider;

    private pages: Page[] = [];
    private ctxes: BrowserContext[] = [];

    constructor(server_config: BrowserConfiguration) {
        if(!server_config || Object.keys(server_config).includes("channel")) {
            server_config = defaultConfiguration;
        }

        this.browserName = server_config["channel"] ? server_config["channel"] : "chrome";
        this.serverConfiguration = server_config;
    }

    async driverFactory(): Promise<BrowserContext> {
        let ctx = await (await this.connection_factory()).newContext(defaultContext);
        this.ctxes.push(ctx);
        return ctx;
    }

    async getNewDriver(context?: BrowserContext): Promise<Page> {
        if (this.ctxes.length == 0) {
            await this.driverFactory();
        }

        context = context ? context : this.ctxes[0];
        let pg = await context.newPage();
        this.pages.push(pg);
        return pg;
    }

    private getBrowserProvider(): ServiceProvider {
        if(!this.serviceProvider) {
            this.serviceProvider = new ServiceProvider(this.serverConfiguration);
        }
        return this.serviceProvider;
    }

    private async connection_factory(): Promise<Browser> {
        if(!this.browser) {
            this.browser = await this.getBrowserProvider().construct();
        }
        return this.browser;
    }

    async closeAllConnections(): Promise<void> {
        for (const ctx of this.ctxes) {
            await ctx.close();
            this.ctxes.splice(0, 1);
        }

        for (const pg of this.pages) {
            await pg.close();
            this.pages.splice(0, 1);
        }
    }

    async destroyBrowser(): Promise<void> {
        await this.serviceProvider.destruct();
    }

}

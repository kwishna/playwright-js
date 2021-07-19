import {Browser, BrowserServer, chromium} from "playwright";
import {BrowserConfiguration, BrowserLauncher} from "../configurations/browser_interfaces_v2"

export class ChromiumLauncher implements BrowserLauncher {
    private readonly configuration: BrowserConfiguration;

    constructor(config: BrowserConfiguration) {
        this.configuration = config;
    }

    async launch_server(): Promise<BrowserServer> {
        return chromium.launchServer(this.configuration);
    }

    async browser_server_launcher(endpoint: string): Promise<Browser> {
        return chromium.connect({wsEndpoint: endpoint});
    }

    async browser_direct_launcher(): Promise<Browser> {
        return chromium.launch(this.configuration)
    }
}

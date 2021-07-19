import {Browser, BrowserServer, firefox} from "playwright";
import {BrowserConfiguration, BrowserLauncher} from "../configurations/browser_interfaces_v2"

export class FirefoxLauncher implements BrowserLauncher {
    private readonly configuration: BrowserConfiguration;

    constructor(config: BrowserConfiguration) {
        this.configuration = config;
    }

    async launch_server(): Promise<BrowserServer> {
        return firefox.launchServer(this.configuration);
    }

    async browser_server_launcher(endpoint: string): Promise<Browser> {
        return firefox.connect({wsEndpoint: endpoint});
    }

    async browser_direct_launcher(): Promise<Browser> {
        return firefox.launch(this.configuration)
    }
}

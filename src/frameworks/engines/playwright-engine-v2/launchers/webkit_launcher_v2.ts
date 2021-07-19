import {Browser, BrowserServer, webkit} from "playwright";
import {BrowserConfiguration, BrowserLauncher} from "../configurations/browser_interfaces_v2"

export class WebkitLauncher implements BrowserLauncher {
    private readonly configuration: BrowserConfiguration;

    constructor(config: BrowserConfiguration) {
        this.configuration = config;
    }

    async launch_server(): Promise<BrowserServer> {
        return webkit.launchServer(this.configuration);
    }

    async browser_server_launcher(endpoint: string): Promise<Browser> {
        return webkit.connect({wsEndpoint: endpoint});
    }

    async browser_direct_launcher(): Promise<Browser> {
        return webkit.launch(this.configuration)
    }
}

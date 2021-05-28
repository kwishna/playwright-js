import {Browser, BrowserServer} from "playwright-core";
import {BrowserConfiguration, BrowserLauncher} from "../configurations/browser_interfaces_v2";
import {ChromiumLauncher} from "../launchers/chrome_launcher_v2"
import {WebkitLauncher} from "../launchers/webkit_launcher_v2"
import {FirefoxLauncher} from "../launchers/firefox_launcher_v2";

export class ServerHandler {
    private browser: Promise<Browser>
    private browserServer: Promise<BrowserServer>
    private launcher: BrowserLauncher;
    private readonly serverConfiguration: BrowserConfiguration;

    constructor(config: BrowserConfiguration) {
        this.serverConfiguration = config;
        this.setLauncher(this.serverConfiguration);
    }

    private setLauncher(config: BrowserConfiguration): BrowserLauncher {
        let browserName = config['channel'] ? config['channel'].toLowerCase() : "chrome";

        if(!this.launcher) {
            switch (browserName.toLowerCase()) {
                case "chrome":
                    this.launcher = new ChromiumLauncher(this.serverConfiguration);
                    break;

                case "firefox":
                    this.launcher = new FirefoxLauncher(this.serverConfiguration);
                    break;

                case "safari":
                    this.launcher = new WebkitLauncher(this.serverConfiguration);
                    break;

                case "webkit":
                    this.launcher = new WebkitLauncher(this.serverConfiguration);
                    break;

                default:
                    console.warn(`${browserName} is not a valid Supported Browser! Spinning up "chrome.`)
                    this.launcher = new ChromiumLauncher(this.serverConfiguration);
                    break;
            }
        }

        return this.launcher;
    }

    private async start_server(): Promise<BrowserServer> {
        if(!this.browserServer) {
            this.browserServer = this.launcher.launch_server();
        }
        return this.browserServer;
    }

    private async endPoint(): Promise<string> {
        if(!this.browserServer) {
            await this.start_server();
        }
        return (await this.browserServer).wsEndpoint();
    }

    private async browser_server_launcher(): Promise<Browser> {
        let endpoint = await this.endPoint();
        if(!this.browser) {
            this.browser = this.launcher.browser_server_launcher(endpoint)
        }
        return this.browser;
    }

    private async kill_server(): Promise<void> {
        if(this.browserServer) {
            await (await this.browserServer).close();
            await (await this.browserServer).kill()
            this.browserServer = null;
        }
    }

    private async browser_direct_launcher(): Promise<Browser> {
        if(!this.browser) {
            this.browser = this.launcher.browser_direct_launcher();
        }
        return this.browser;
    }

    async start_browser_connection(): Promise<Browser> {
        if(process.env.DIRECT_CONNECT == "true") return this.browser_direct_launcher();
        else return this.browser_server_launcher();
    }

    async kill_browser_connection(): Promise<void> {
        if(this.browser) {
            await this.kill_server();
            await (await this.browser).close();
            this.browser = null;
        }
    }
}

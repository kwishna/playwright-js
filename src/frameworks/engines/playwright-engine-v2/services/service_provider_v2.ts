import {BrowserConfiguration} from "../configurations/browser_interfaces_v2";
import {Browser} from "playwright-core";
import {ServerHandler} from "./service_handler_v2";

export class ServiceProvider {
    private readonly serverConfiguration: BrowserConfiguration;
    private serverHandler: ServerHandler;
    private browserConnection: Promise<Browser>;

    constructor(config: BrowserConfiguration) {
        this.serverConfiguration = config;
        this.initHandler();
    }

    initHandler() {
        if(!this.serverHandler) {
            this.serverHandler = new ServerHandler(this.serverConfiguration);
        }
    }

    async construct(): Promise<Browser> {
        if(!this.browserConnection) {
            this.browserConnection = this.serverHandler.start_browser_connection();
        }
        return this.browserConnection;
    }

    async destruct(): Promise<void> {
        await this.serverHandler.kill_browser_connection();
        this.serverHandler = null;
    }
}

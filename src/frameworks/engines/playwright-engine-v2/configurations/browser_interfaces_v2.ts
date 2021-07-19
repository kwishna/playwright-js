import {Browser, BrowserServer} from "playwright";

export interface BrowserLauncher {
    browser_server_launcher(endpoint: string): Promise<Browser>
    browser_direct_launcher(): Promise<Browser>
    launch_server(): Promise<BrowserServer>
}

export interface BrowserConfiguration {
    channel?: "chrome" | "firefox-stable" | "msedge"
    args?: string[]
    downloadPath?: string | undefined
    headless?: boolean
    executablePath?: string
    timeout?: number
    sloMo?: number
}

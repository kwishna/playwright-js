import { BrowserConfiguration } from "./browser_interfaces_v2";
import { BrowserContextOptions } from "playwright";
import { currentProjectDir } from "../../../../utils/utils"

export const defaultConfiguration: BrowserConfiguration = {
    channel: "chrome",
    args: ["--start-maximized"]
};

export const defaultContext: BrowserContextOptions = {
    acceptDownloads: true,
    recordVideo: {
        dir: `${currentProjectDir}/video`
    },
    viewport: null
}

export const chromeConfiguration: BrowserConfiguration = {
    args: ["--start-maximized"],
    channel: "chrome",
    headless: false,
}

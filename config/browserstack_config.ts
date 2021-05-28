import {decodeString} from "../src/utils/utils";

const basic_caps = {
    'browserstack.user': `${decodeString(process.env.BROWSERSTACK_USER)}`,
    'browserstack.key': `${decodeString(process.env.BROWSERSTACK_KEY)}`,
    'browserstack.networkLogs': 'true',
    'browserstack.debug': 'true',
    'browserstack.console': 'errors',
    'browserstack.video': 'false',
    "browserstack.local": 'false',
    'acceptSslCerts': true,
    'unexpectedAlertBehaviour': 'accept',
    'name': 'End to End Smoke Test On ' + new Date().toLocaleString(),
    'build': 'Jest Selenium Webdriver',
    'project': 'Selenium-Js',
}

export const bs_win_chrome90 = {
    ...basic_caps,
    'os': 'Windows',
    'os_version': '10',
    'browserName': 'chrome',
    'browserstack.seleniumLogs': 'true',
};

export const iPhone = {
    ...basic_caps,
    "os_version": "14",
    "device": "iPhone 12",
    "real_mobile": "true",
    "browserName": "iPhone",
    'browserstack.appiumLogs': 'true',
};

export const safari = {
    ...basic_caps,
    "os" : "OS X",
    "os_version" : "Big Sur",
    "browserName" : "Safari",
    "browser_version" : "14.0",
    "browserstack.local" : "false"
}

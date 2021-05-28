import {Frame, Page} from "playwright-core";

export interface SearchContext {
    locator: string
    timeout: number
    context: Page | Frame | any;
}

export interface PageContext {
    context: Page | Frame | any;
    timeout: number;
    waitUntil: string;

}

export interface PageLoadContext {
    context: Page | Frame | any;
    state: string; // "load"|"domcontentloaded"|"networkidle"
    timeout: number;
}

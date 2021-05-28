import moment from "moment";
import path from "path";
import projectRootDirectory from "project-root-directory"
import {addAttach, addMsg} from "jest-html-reporters/helper"
import {ElementHandle, Page} from "playwright-core";

export async function attachScreenshot(page: Page, testName: string) {
    try {
        const savePath = currentProjectDir() + "/screenshots"
        const file = testName.replace(/[^a-zA-Z0-9.-_]+/gi, "_") + "-" + timestamp();
        await page.screenshot({fullPage: true, path: savePath + file + ".PNG"});
        const fileName = path.format({dir: savePath, name: file, ext: '.PNG'})
        await addAttach(fileName, file);
    }
    catch (e) {
        console.log(e)
    }
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function encodeString(str: string) {
    return str ? Buffer.from(str).toString("base64") : str;
}

export function decodeString(str: string) {
    return str ? Buffer.from(str, "base64").toString("ascii") : str;
}

export function remove_from_list(array: Array<string>, to_be_removed: string) {
    return array.filter((value => value != to_be_removed));
}

export function get_any_random_value(array: Array<string>) {
    return array[Math.floor(Math.random() * array.length)];
}

export function last_child(locator: string) {
    return locator + ":last-child";
}

export function timestamp() {
    return moment().format("YYYY-MM-DD_HH_mm_ss");
}

export function currentProjectDir() {
    return projectRootDirectory;
}

export async function drag_and_drop(page: Page, source: string, target: string){
    const src: ElementHandle<SVGElement | HTMLElement> = await page.$(source)
    const dest: ElementHandle<SVGElement | HTMLElement> = await page.$(target)

    const srcbound = await src.boundingBox();
    const destbound = await dest.boundingBox();

    if (srcbound && destbound) {
        await page.mouse.move(srcbound.x, srcbound.y, {steps: 5});
        await page.mouse.down();
        await page.mouse.move(destbound.x + 20, destbound.y + 20, {steps: 5});
        await page.mouse.up();
    }
}

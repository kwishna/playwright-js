import {ElementHandle, Frame, Page, Response} from "playwright-core"
import {PageContext, PageLoadContext, SearchContext} from "../interfaces/search_context";

export default class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    open_url(url: string = 'https://google.co.in'): Promise<Response | null> {
        return this.page.goto(url);
    }

    wait_for_invisible(option: SearchContext = {locator: undefined, context: this.page, timeout: 10000}): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return option.context.waitForSelector(option.locator, {state: "hidden", timeout: option.timeout});
    }

    wait_for_visible(option: SearchContext = {locator: undefined, context: this.page, timeout: 10000}): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return option.context.waitForSelector(option.locator, {state: "visible", timeout: option.timeout});
    }

    wait_for_navigation(option: PageContext = {context: this.page, timeout: 30000, waitUntil: "domcontentloaded"}): Promise<null|Response> {
        return option.context.waitForNavigation({ timeout: option.timeout, })
    }

    wait_for_load(option: PageLoadContext = {context: this.page, timeout: 40000, state: "domcontentloaded"}): Promise<void> {
        return option.context.waitForLoadState(option.state, {timeout: option.timeout})
    }

    value_of_element<R>(element: ElementHandle<SVGElement | HTMLElement>, context: Page | Frame | any = this.page): Promise<R> {
        return context.evaluate( ([element]) => element.value, [element])
    }

    async get_texts_from_elements(elements: ElementHandle<SVGElement | HTMLElement>[]): Promise<string[]> {
        const all_texts = [];
        for (const el of elements) {
            all_texts.push(await el.textContent())
        }
        return all_texts;
    }

    async get_attrs_from_elements(elements: ElementHandle<SVGElement | HTMLElement>[], attribute: string): Promise<string[]> {
        const all_texts = [];
        for (const el of elements) {
            all_texts.push(await el.getAttribute(attribute));
        }
        return all_texts;
    }

    switch_to_frame_url(url: string | URL, context: Page | Frame | any = this.page) {
        return context.frame({url: url});
    }

    switch_to_frame_element(element: ElementHandle<SVGElement | HTMLElement>):  Promise<Frame> {
        return element.contentFrame();
    }

    dispatch_click_event(element: ElementHandle<SVGElement | HTMLElement>) {
        return this.page.evaluate(
            ([el]) => el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window})), [element])
    }

    scroll_to_bottom(context: Page | Frame = this.page) {
        return context.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    }

    scroll_to_top(context: Page | Frame = this.page) {
        return context.evaluate(() => window.scrollTo(0, -document.body.scrollHeight))
    }

    scroll_into_view(element: ElementHandle<SVGElement | HTMLElement>) {
        return this.page.evaluate(([el]) => el.scrollIntoView(), [element])
    }

    make_visible(element: ElementHandle<SVGElement | HTMLElement>, context: Page | Frame | any) {
        return context.evaluate(([el]) => el.style.display = 'block', [element]);
    }

    css_value(locator: string, context: Page | Frame | any, css: string) {
        return this.page.$eval(locator, (el, css_key) => getComputedStyle(el)[css_key], css)
    }

    async assert_visible(element: ElementHandle<SVGElement | HTMLElement>) {
        expect(await element.isVisible()).toBe(true)
    }

    async assertText(element: ElementHandle<SVGElement | HTMLElement>, expectedText: string) {
        expect(await element.textContent()).toBe(expectedText);
    }
}

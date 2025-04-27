import {Page, Locator} from "@playwright/test";
import {ProductCard} from "../components/ProductCard";
import { TabName, Interval, CardName } from "../utils/types";
import {Header} from "../components/Header";

export class PremiumPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator(`//h1`);
        this.header = new Header(this.page.locator('//header'));
    }

    // async clickTabByName(name: TabName) {
    //     await this.page.locator(`(//span[@data-test="adaptive-switcher__switcher"]//div[contains(text(), '${name}')])[1]`).click();
    // }
    //
    // async clickIntervalByName(name: Interval) {
    //     await this.page.locator(`//div[@class='wt-css-content-switcher__block']//*[@data-test="adaptive-switcher__switcher"]//*[contains(text(), '${name}')]`).click();
    // }
    //
    // async getCardByName(name: CardName) {
    //     const cardLocator = this.page.locator(`//div[@class="wt-css-content-switcher__block"]//h3[contains(text(), "${name}")]/ancestor::div[contains(@data-test, 'product-card')]`);
    //
    //     return new ProductCard(cardLocator);
    // }

}


import {Page, Locator} from "@playwright/test";
import {Header} from "../components/Header";

export class PremiumPage {
    readonly page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page.locator('//header'));
    }

    // async getCardByName(name: CardName) {
    //     const cardLocator = this.page.locator(`//div[@class="wt-css-content-switcher__block"]//h3[contains(text(), "${name}")]/ancestor::div[contains(@data-test, 'product-card')]`);
    //
    //     return new ProductCard(cardLocator);
    // }
}


import { Page, Locator } from "@playwright/test";
import { PricesBlock } from "./PricesBlock"
import { ProductName, LinkName } from "../utils/types";

export class ProductCard {
    readonly page: Page;
    readonly self: Locator;
    readonly title: Locator;
    readonly buyButton: Locator;
    readonly priceTag: Locator;
    readonly checkbox: Locator;
    readonly pricesBlock: PricesBlock;
    readonly getQuoteLink: Locator;
    readonly learnMoreLink: Locator;

    constructor(page: Page, cardName: ProductName) {
        const baseLocator = `//div[@class="wt-css-content-switcher__block"]//h3[contains(text(), "${cardName}")]/ancestor::div[contains(@data-test, 'product-card')]`;

        this.page = page;
        this.self = page.locator(`${baseLocator}`);
        this.title = page.locator(`${baseLocator}//h3`);

        this.buyButton = page.locator(`${baseLocator}//a[@data-test="product-card-footer-buy-button"]`);
        this.priceTag = page.locator(`${baseLocator}//div[@data-test="product-price"]`);
        this.checkbox = page.locator(`${baseLocator}//span[@data-test="checkbox"]`)

        this.pricesBlock = new PricesBlock(page, baseLocator);

        this.getQuoteLink = this.page.locator(`${baseLocator}//a[contains(@href, 'shop/quote')]`);
        this.learnMoreLink = this.page.locator(`${baseLocator}//a[contains(@href, 'all')]`)

    }

    async clickCheckbox() {
        await this.checkbox.click();
    }

    async clickBuyButton() {
        await this.buyButton.click();
    }

    async clickLinkByName(name: LinkName){
        if (name === 'Get quote') { await this.getQuoteLink.click() }
        if (name === 'Learn more') { await this.learnMoreLink.click() }
    }

}
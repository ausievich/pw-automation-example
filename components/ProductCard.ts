import { Locator } from "@playwright/test";
import { PricesBlock } from "./PricesBlock"
import { LinkName } from "../utils/types";

export class ProductCard {
    readonly self: Locator;
    readonly title: Locator;
    readonly buyButton: Locator;
    readonly priceTag: Locator;
    readonly checkbox: Locator;
    readonly pricesBlock: PricesBlock;
    readonly getQuoteLink: Locator;
    readonly learnMoreLink: Locator;

    constructor(cardLocator: Locator) {
        //const baseLocator = page.locator(`//div[@class="wt-css-content-switcher__block"]//h3[contains(text(), "${cardName}")]/ancestor::div[contains(@data-test, 'product-card')]`);

        this.self = cardLocator;
        this.title = cardLocator.locator(`//h3`);

        this.buyButton = cardLocator.locator(`//*[@data-test="buy-page-buy-action-button" or @data-test="product-card-footer-buy-button"]`);
        this.priceTag = cardLocator.locator(`//div[@data-test="product-price"]`);
        this.checkbox = cardLocator.locator(`//span[@data-test="checkbox"]`)

        this.pricesBlock = new PricesBlock(cardLocator);

        this.getQuoteLink = cardLocator.locator(`//a[contains(@href, 'shop/quote')]`);
        this.learnMoreLink = cardLocator.locator(`//a[contains(@href, 'all')]`)

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
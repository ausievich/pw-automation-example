import { Locator } from "@playwright/test";
import { LinkName } from "../utils/types";
import { Element } from "../utils/element";

export class ProductCard extends Element {
    readonly title: Locator;
    readonly buyButton: Locator;
    readonly checkbox: Locator;
    readonly getQuoteLink: Locator;
    readonly learnMoreLink: Locator;

    constructor(cardLocator: Locator) {
        super(cardLocator);

        this.title = cardLocator.locator(`//h3`);

        this.buyButton = cardLocator.locator(`//*[@data-test="buy-page-buy-action-button" or @data-test="product-card-footer-buy-button"]`);
        this.checkbox = cardLocator.locator(`//span[@data-test="checkbox"]`)

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
import {Page, Locator} from "@playwright/test";

export class PricesBlock {
    readonly page: Page;
    readonly productPrice: Locator;
    readonly secondYearPrice: Locator;
    readonly thirdYearPrice: Locator;

    constructor(page: Page, cardLocator: string) {
        const baseLocator = `${cardLocator}//div[@data-test="product-price"]/../..`;

        this.page = page;
        this.secondYearPrice = page.locator(`${baseLocator}//p[@data-test="product-price-second-year"]`)
        this.thirdYearPrice = page.locator(`${baseLocator}//p[@data-test="product-price-third-year-onwards"]`)
        this.productPrice = page.locator(`${baseLocator}//div[@data-test="product-price"]`);
    }

    async getProductPriceValue() {
        return await this.productPrice.textContent();
    }

}
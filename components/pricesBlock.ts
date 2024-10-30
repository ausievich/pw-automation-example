import {Locator, Page} from "@playwright/test";

export class PricesBlock {
    private page: Page;
    private baseSelector: string;

    constructor(page: Page, cardSelector: string) {
        this.page = page;
        this.baseSelector = `${cardSelector}//div[@data-test="product-price"]/../..`;
    }

    get secondYearPrice() {
        return this.page.locator(`${this.baseSelector}//p[@data-test="product-price-second-year"]`)
    }

    get thirdYearPrice() {
        return this.page.locator(`${this.baseSelector}//p[@data-test="product-price-third-year-onwards"]`)
    }

    get productPrice() {
        return this.page.locator(`${this.baseSelector}//div[@data-test="product-price"]`)
    }

    async getProductPriceValue() {
        return await this.page.locator(`${this.baseSelector}//div[@data-test="product-price"]`).textContent();
    }

}
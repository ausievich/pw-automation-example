import { Locator} from "@playwright/test";

export class PricesBlock {
    readonly productPrice: Locator;
    readonly secondYearPrice: Locator;
    readonly thirdYearPrice: Locator;
    readonly self: Locator;

    constructor(cardLocator: Locator) {
        this.self = cardLocator.locator(`//div[@data-test="product-price"]/../..`);
        this.secondYearPrice = cardLocator.locator(`//p[@data-test="product-price-second-year"]`)
        this.thirdYearPrice = cardLocator.locator(`//p[@data-test="product-price-third-year-onwards"]`)
        this.productPrice = cardLocator.locator(`//div[@data-test="product-price"]`);
    }

}
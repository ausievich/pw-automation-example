import {Page, Locator} from "@playwright/test";
import {ProductCard} from "../components/ProductCard";
import { TabName, Interval, CardName, PRODUCT_NAMES } from "../utils/types";

export class BuyPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly productCard: ProductCard;
    readonly allProductsPackCard: ProductCard;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator(`//h1`);

        this.productCard = new ProductCard(page, PRODUCT_NAMES[process.env.PRODUCT_NAME]);
        this.allProductsPackCard = new ProductCard(page, 'All Products Pack')
    }

    async clickTabByName(name: TabName) {
        await this.page.locator(`(//span[@data-test="adaptive-switcher__switcher"]//div[contains(text(), '${name}')])[1]`).click()
    }

    async clickIntervalByName(name: Interval) {
        await this.page.locator(`//div[@class='wt-css-content-switcher__block']//*[@data-test="adaptive-switcher__switcher"]//*[contains(text(), '${name}')]`).click()
    }

    async getCardByName(name: CardName) {
        return new ProductCard(this.page, name);
    }

}


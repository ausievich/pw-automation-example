import {Page} from "@playwright/test";
import {ProductCard} from "../components/ProductCard";
import {DiscountCard} from "../components/DiscountCard";
import { TabName, Interval, CardName } from "../utils/types";

export class BuyPage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get heading() {
        return this.page.locator(`//h1`);
    }

    async clickTabByName(name: TabName) {
        await this.page.locator(`(//span[@data-test="adaptive-switcher__switcher"]//div[contains(text(), '${name}')])[1]`).click()

    }

    async clickIntervalByName(name: Interval) {
        await this.page.locator(`//div[@class='wt-css-content-switcher__block']//*[@data-test="adaptive-switcher__switcher"]//*[contains(text(), '${name}')]`).click()

    }

    getCardByName(name: CardName) {
        return new ProductCard(this.page, name);
    }

    getDiscountCardByName(name: string) {
        return new DiscountCard(this.page, name);
    }

}


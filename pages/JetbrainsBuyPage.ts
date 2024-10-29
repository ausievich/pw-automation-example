import {Page} from "@playwright/test";
import {JetbrainsProductCard} from "../components/JetbrainsProductCard";
import {CurrencyPicker} from "../components/currencyPicker";

export type CardName = "IntelliJ IDEA Ultimate" | "All Products Pack";
export type TabName = "For Organizations" | "For Individual Use" | "Special Categories";

export class JetbrainsBuyPage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get heading() {
        return this.page.locator(`//h1`);
    }

    getTabByName(name: TabName) {
        return this.page.locator(`//span[@data-test="adaptive-switcher__switcher"]//div[contains(text(), '${name}')]`)
    }

    getCardByName(name: CardName) {
        return new JetbrainsProductCard(this.page, name);
    }


}


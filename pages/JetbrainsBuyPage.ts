import {Page} from "@playwright/test";
import {JetbrainsProductCard} from "../components/JetbrainsProductCard";

export type CardName = "IntelliJ IDEA Ultimate" | "All Products Pack";
export type TabName = "For Organizations" | "For Individual Use" | "Special Categories" | "Monthly" | "Yearly";

export class JetbrainsBuyPage {
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

    getCardByName(name: CardName) {
        return new JetbrainsProductCard(this.page, name);
    }


}


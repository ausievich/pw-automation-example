import {Page} from "@playwright/test";
import {SubscriptionCard} from "../components/subscriptionCard";
import {CurrencyPicker} from "../components/currencyPicker";

export type CardName = "Free" | "Plus" | "Enterprise" | "Business";
export type TabName = "yearly" | "monthly";

export class NotionBuyPage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get heading() {
        return this.page.locator(`//div[contains(@class, "headline")]/h2`);
    }

    getTabByName(name: TabName) {
        return this.page.locator(`//label[contains(@class, 'BillingIntervalToggle')]//span[contains(text(), '${name}')]`)
    }

    getCardByName(name: CardName) {
        return new SubscriptionCard(this.page, name);
    }

    getCurrencyPicker() {
        return new CurrencyPicker(this.page);
    }

}


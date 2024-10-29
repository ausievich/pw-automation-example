import {Page} from "@playwright/test";
import {SubscriptionCard} from "../components/subscriptionCard";

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
        //label[contains(@class, 'BillingIntervalToggle')]//span[contains(text(), 'yearly')]
        return this.page.locator(`//label[contains(@class, 'BillingIntervalToggle')]//span[contains(text(), '${name}')]`)
    }

    getCardByName(name: CardName) {
        return new SubscriptionCard(this.page, name);
    }

    get freeSubscriptionCard() {
        return new SubscriptionCard(this.page, 'Free')
    }

    get plusSubscriptionCard() {
        return new SubscriptionCard(this.page, 'Plus')
    }

    get businessSubscriptionCard() {
        return new SubscriptionCard(this.page, 'Business')
    }

    get enterpriseSubscriptionCard() {
        return new SubscriptionCard(this.page, 'Enterprise')
    }

}
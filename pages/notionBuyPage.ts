import {Page} from "@playwright/test";
import {SubscriptionCard} from "../components/subscriptionCard";

export class NotionBuyPage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get heading() {
        return this.page.locator(`//div[contains(@class, "headline")]/h2`);
    }

    getTabByName(name: string) {
        //label[contains(@class, 'BillingIntervalToggle')]//span[contains(text(), 'yearly')]
        return this.page.locator(`//label[contains(@class, 'BillingIntervalToggle')]//span[contains(text(), '${name}')]`)
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

}
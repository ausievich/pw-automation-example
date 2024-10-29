import {Locator, Page} from "@playwright/test";

export class SubscriptionCard {
    private page: Page;
    private subscriptionName: string;
    private baseSelector = `//section[contains(@class, 'pricingPlanCard')]`

    constructor(page: Page, subscriptionName: string) {
        this.page = page;
        this.subscriptionName = subscriptionName;
    }

    // Геттер для заголовка карточки
    get title(): Locator {
        return this.page.locator(`${this.baseSelector}//h4[contains(text(), '${this.subscriptionName}')]`);
    }

    get priceTag() {
        return this.page.locator(`${this.baseSelector}//h4[contains(text(), '${this.subscriptionName}')]/ancestor::div[contains(@class, 'gridItem')]//h3`);
    }

}
import {Locator, Page} from "@playwright/test";

export class SubscriptionCard {
    private page: Page;
    private baseSelector: string;

    constructor(page: Page, subscriptionName: string) {
        this.page = page;
        this.baseSelector = `//h4[contains(text(), '${subscriptionName}')]/ancestor::div[contains(@class, 'gridItem')]`;
    }

    get title(): Locator {
        return this.page.locator(`${this.baseSelector}//h4`);
    }

    get priceTag() {
        return this.page.locator(`${this.baseSelector}//h3`);
    }

    get navButton() {
        return this.page.locator(`${this.baseSelector}//nav`)
    }

    get self() {
        return this.page.locator(`${this.baseSelector}/section`)
    }

}
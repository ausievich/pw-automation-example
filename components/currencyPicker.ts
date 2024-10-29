import {Locator, Page} from "@playwright/test";

export type CurrencyType = "USD" | "EUR"

export class CurrencyPicker {
    private page: Page;
    private baseSelector: string;

    constructor(page: Page) {
        this.page = page;
        this.baseSelector = `//div[contains(@class, 'DropdownMenuFilter_picker')]`;
    }

    async clickOnCurrency(currency: CurrencyType) {
        await this.page.locator(`${this.baseSelector}//div/span[contains(text(), '${currency}')]`).click()
    }

    async open() {
        await this.page.locator(`${this.baseSelector}`).click()
    }

}
import { Locator, expect } from "@playwright/test";

export class Element {
    readonly locator: Locator;

    constructor(locator: Locator) {
        this.locator = locator;
    }

    async takeScreenshot(name: string | readonly string[], options?: { [key: string]: any }) {
        await expect(this.locator).toHaveScreenshot(name, {
            ...options,
        });

        // Additional logic if required
    }

    async click() {
        await this.locator.click();
    }

}
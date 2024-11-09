import { Locator, expect } from "@playwright/test";

export class Element {
    readonly locator: Locator;

    constructor(locator: Locator) {
        this.locator = locator;
    }

    async takeScreenshot(snapshotPath: string | string[], options: { [key: string]: any } = {}) {
        await expect(this.locator).toHaveScreenshot(snapshotPath, {
            ...options,
        });

        // Additional logic related to S3 uploading or something
    }

}
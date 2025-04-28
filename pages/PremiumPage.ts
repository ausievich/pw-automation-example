import {Page, Locator} from "@playwright/test";
import {Header} from "../components/Header";
import {Section} from "../components/Section";

export class PremiumPage {
    readonly page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page.locator('//header'));
    }

    async getSectionByPosition(position: Number) {
        const sectionLocator = this.page.locator(`//section[@data-component-position="${position}"]`);

        return new Section(sectionLocator);
    }
}


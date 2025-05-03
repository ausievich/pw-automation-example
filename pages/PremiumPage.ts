import {Page, Locator} from "@playwright/test";
import {Header} from "../components/Header";
import {Section} from "../components/Section";

export class PremiumPage {
    readonly page: Page;
    readonly header: Header;
    readonly getStartedButton: Locator;
    readonly viewAllPlansButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page.locator('//header'));

        this.getStartedButton = this.page.locator(`//span[contains(text(),"Get started")]`)
        this.viewAllPlansButton = this.page.locator(`//span[contains(text(),"View all plans")]`)
    }

    async getSectionByPosition(position: Number) {
        const sectionLocator = this.page.locator(`//section[@data-component-position="${position}"]`);

        return new Section(sectionLocator);
    }


}


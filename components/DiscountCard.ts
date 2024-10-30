import {Page} from "@playwright/test";

export class DiscountCard {
    private page: Page;
    private baseSelector: string;

    constructor(page: Page, name: string) {
        this.page = page;
        this.baseSelector = `//div[@class='wt-css-content-switcher__block']//h3[contains(text(), '${name}')]/..`;
    }

    get learnMoreLink() {
        return this.page.locator(`${this.baseSelector}//a[contains(text(), 'Learn more')]`)
    }

    async clickLinkByName(name: string){
        await this.page.locator(`${this.baseSelector}//a[contains(text(), '${name}')]`).click()
    }

}
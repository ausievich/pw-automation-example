import {Page, Locator} from "@playwright/test";

export class DiscountCard {
    readonly page: Page;
    readonly learnMoreLink: Locator;

    constructor(page: Page, name: string) {
        // Подумать, можно ли адаптировать для разных языков
        const baseLocator = `//div[@class='wt-css-content-switcher__block']//h3[contains(text(), '${name}')]/..`;

        this.page = page;
        this.learnMoreLink = page.locator(`${baseLocator}//a`)
    }

    async clickLearnMoreLink(){
        await this.learnMoreLink.click()
    }

}
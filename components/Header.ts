import { Locator } from "@playwright/test";
import { PremiumPlan} from "../utils/types";
import { Element } from "../utils/element";

export class Header extends Element {
    readonly logo: Locator;
    readonly premiumLink: Locator;
    readonly supportLink: Locator;
    readonly downloadLink: Locator;
    readonly premiumMenu: PremiumMenu;

    constructor(headerLocator: Locator) {
        super(headerLocator);

        this.logo = headerLocator.locator(`//div[contains(@class, 'brand-wrapper')]`);

        this.premiumLink = headerLocator.locator(`//li[contains(@class, "premium")]`);
        this.supportLink = headerLocator.locator(`//a[@data-ga-action="help"]`);
        this.downloadLink = headerLocator.locator(`//a[@data-ga-action="download"]`);

        this.premiumMenu = new PremiumMenu(headerLocator.locator(`//div[@id="premiumMenu"]`));

    }

}

export class PremiumMenu extends Element {
    constructor(locator: Locator) {
        super(locator);
    }

    async clickLinkByName(premiumPlan: PremiumPlan){
        const linkLocator = this.locator.locator(`//a[@data-ga-action="${premiumPlan}"]`)

        await linkLocator.click();
    }
}
import { Locator } from "@playwright/test";
import { Element } from "../utils/element";

export class QuestionContainer extends Element {
    readonly questionContent: Locator;
    readonly questionTitle: Locator;

    constructor(locator: Locator) {
        super(locator);
        this.questionTitle = locator.locator(`//*[@data-sentry-element="QuestionTitle"]`)
        this.questionContent = locator.locator(`//p[@data-sentry-element="QuestionContent"]`);
    }
}


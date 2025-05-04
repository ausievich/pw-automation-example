import { Locator } from "@playwright/test";
import { Element } from "../utils/element";

export class Section extends Element {
    constructor(locator: Locator) {
        super(locator);
    }
}


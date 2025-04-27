import { Locator } from "@playwright/test";
import { PremiumPlan} from "../utils/types";
import { Element } from "../utils/element";

export class Section extends Element {
    constructor(locator: Locator) {
        super(locator);
    }
}


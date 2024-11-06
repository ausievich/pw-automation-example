export type ProductName =
    | "IntelliJ IDEA Ultimate"
    | "All Products Pack"
    | "CLion"
    | "PyCharm Professional"
    | "DataGrip";

// DataSpell
// RubyMine
// GoLand

export enum PRODUCT_NAMES {
    IDEA = "IntelliJ IDEA Ultimate",
    CLION = "CLion",
    PYCHARM = "PyCharm Professional",
    DATAGRIP = "DataGrip"
}

export type TabName =
    | "For Organizations"
    | "For Individual Use"
    | "Special Categories";

export type Interval =
    | "Monthly billing"
    | "Yearly billing";

export type LinkName =
    | "Get quote"
    | "Learn more";

export interface SubscriptionType {
    interval: Interval,
    tabName: TabName
}



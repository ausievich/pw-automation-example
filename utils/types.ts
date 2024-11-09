export enum PRODUCT_NAMES {
    IDEA = "IntelliJ IDEA Ultimate",
    CLION = "CLion",
    PYCHARM = "PyCharm Professional",
    DATAGRIP = "DataGrip",
    DATASPELL = "DataSpell",
    RUBY = "RubyMine",
    GO = "GoLand"
}

export type CardName = PRODUCT_NAMES | "All Products Pack";

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



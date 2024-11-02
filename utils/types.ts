export type ProductName =
    | "IntelliJ IDEA Ultimate"
    | "All Products Pack"
    | "CLion"
    | "PyCharm Professional";

export type TabName =
    | "For Organizations"
    | "For Individual Use"
    | "Special Categories";

export type Interval =
    | "Monthly billing"
    | "Yearly billing";


export interface SubscriptionType {
    interval: Interval,
    tabName: TabName
}

export enum LINKS {
    IDEA = "https://www.jetbrains.com/idea/buy/",
    CLION = "https://www.jetbrains.com/clion/buy/",
    PYCHARM = "https://www.jetbrains.com/pycharm/buy/",
}

export enum PRODUCT_NAMES {
    IDEA = "IntelliJ IDEA Ultimate",
    CLION = "CLion",
    PYCHARM = "PyCharm Professional",
}

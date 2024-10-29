import { test, expect } from '@playwright/test';
import {JetbrainsBuyPage, CardName } from "../pages/JetbrainsBuyPage";


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.jetbrains.com/idea/buy/');
});

test.describe('Buy page tests', () => {

  test('Check heading content', async ({ page }) => {
    const expectedValue: string = 'Subscription Options and Pricing';

    const buyPage = new JetbrainsBuyPage(page);
    const heading = buyPage.heading;
    const headingContent = await heading.textContent();

    expect(headingContent).toBe(expectedValue);

  });

  test('Check Free-subscription card title', async ({ page }) => {
    const expectedValue: string = 'IntelliJ IDEA Ultimate';

    const buyPage = new JetbrainsBuyPage(page);
    const ideaCard = buyPage.getCardByName('IntelliJ IDEA Ultimate');
    const cardTitle = await ideaCard.title.textContent();

    expect(cardTitle).toBe(expectedValue);
  });

  // Можно попробовать добавить параметризацию
  // test('Check IDEA card price', async ({ page }) => {
  //   const expectedValue: string = '0';
  //
  //   const buyPage = new JetbrainsBuyPage(page);
  //   const ideaCard = buyPage.getCardByName('IntelliJ IDEA Ultimate');
  //
  //   const cardPrice = await ideaCard.priceTag.textContent();
  //   expect(cardPrice).toBe(expectedValue);
  //
  // });

  // test('Check Plus-subscription card price', async ({ page }) => {
  //   const expectedValue: string = '€9.50';
  //
  //   const buyPage = new JetbrainsBuyPage(page);
  //   const currencyPicker = buyPage.getCurrencyPicker();
  //   const freeSubscriptionCard = buyPage.getCardByName('Plus');
  //
  //   await currencyPicker.open()
  //   await currencyPicker.clickOnCurrency('EUR');
  //
  //   const cardPrice = await freeSubscriptionCard.priceTag.textContent();
  //   expect(cardPrice).toBe(expectedValue);
  //
  // });

  // test('Toggle subscription interval: monthly', async ({ page }) => {
  //   const expectedValue: string = '€17';
  //
  //   const notionBuyPage = new NotionBuyPage(page)
  //   const businessSubscriptionCard = notionBuyPage.getCardByName('Business');
  //   const currencyPicker = notionBuyPage.getCurrencyPicker();
  //   const monthlyTab = notionBuyPage.getTabByName('monthly')
  //
  //   await currencyPicker.open()
  //   await currencyPicker.clickOnCurrency('EUR');
  //   await monthlyTab.click()
  //
  //   const cardPrice = await businessSubscriptionCard.priceTag.textContent();
  //   expect(cardPrice).toBe(expectedValue);
  //
  // });
  //
  // test('Toggle subscription interval: yearly', async ({ page }) => {
  //   const expectedValue: string = '€14';
  //
  //   const notionBuyPage = new NotionBuyPage(page)
  //   const businessSubscriptionCard = notionBuyPage.getCardByName('Business');
  //   const currencyPicker = notionBuyPage.getCurrencyPicker();
  //   const yearlyTab = notionBuyPage.getTabByName('yearly')
  //
  //   await currencyPicker.open()
  //   await currencyPicker.clickOnCurrency('EUR');
  //   await yearlyTab.click()
  //
  //   const cardPrice = await businessSubscriptionCard.priceTag.textContent();
  //   expect(cardPrice).toBe(expectedValue);
  //
  // });
  //
  // test('Click subscription card button', async ({ page }) => {
  //
  //   const notionBuyPage = new NotionBuyPage(page)
  //   const plusSubscriptionCard = notionBuyPage.getCardByName('Plus');
  //   const navButton = plusSubscriptionCard.navButton
  //
  //   await navButton.click()
  //
  //   await expect(page).toHaveURL(/.*www.notion.so\/signup.*/)
  //
  // });
  //
  // test('Enterprise card button contents', async ({ page }) => {
  //   const notionBuyPage = new NotionBuyPage(page)
  //   const enterpriseSubscriptionCard = notionBuyPage.getCardByName('Enterprise');
  //   const navButton = enterpriseSubscriptionCard.navButton
  //
  //   const navButtonTextContent = await navButton.textContent();
  //
  //   expect(navButtonTextContent).toBe('Contact Sales')
  //
  // });
  //
  //
  // const cardNames: { cardName: CardName }[] = [
  //   { cardName: 'Free' },
  //   { cardName: 'Plus' },
  //   { cardName: 'Enterprise' },
  //   { cardName: 'Business' },
  // ];
  //
  // cardNames.forEach(({ cardName }) => {
  //   test(`Screenshot card nav button: ${cardName}`, async ({ page }) => {
  //     const notionBuyPage = new NotionBuyPage(page);
  //     const navButton = notionBuyPage.getCardByName(cardName).navButton;
  //
  //     // Делаем скриншот конкретной карточки
  //     // await navButton.screenshot({ path: `screenshots/navButton-${cardName}-subscriptionCard.png` });
  //
  //     // Для проверки соответствия
  //     await expect(navButton).toHaveScreenshot()
  //   });
  // });



})







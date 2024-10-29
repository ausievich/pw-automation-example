import { test, expect, Page, Locator } from '@playwright/test';
import {NotionBuyPage} from "../pages/notionBuyPage";

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.notion.so/pricing');
});

test.describe('Buy page tests', () => {

  test('Check heading content', async ({ page }) => {
    const expectedValue: string = 'One tool for your whole company.Free for teams to try.';

    const notionBuyPage = new NotionBuyPage(page)
    const heading = notionBuyPage.heading;
    const headingContent = await heading.textContent();
    expect(headingContent).toBe(expectedValue);

  });

  test('Check Free-subscription card title', async ({ page }) => {
    const expectedValue: string = 'Free';

    const notionBuyPage = new NotionBuyPage(page)
    const freeSubscriptionCard = notionBuyPage.freeSubscriptionCard;
    const cardTitle = await freeSubscriptionCard.title.textContent();
    expect(cardTitle).toBe(expectedValue);

    // Можно попробовать добавить параметризацию для всех типов карточек

  });

  test('Check Free-subscription card price', async ({ page }) => {
    const expectedValue: string = '€0';

    const notionBuyPage = new NotionBuyPage(page)
    const freeSubscriptionCard = notionBuyPage.freeSubscriptionCard;
    const cardPrice = await freeSubscriptionCard.priceTag.textContent();

    expect(cardPrice).toBe(expectedValue);

    // Можно попробовать добавить параметризацию
  });

  test('Check Plus-subscription card price', async ({ page }) => {
    const expectedValue: string = '€9.50';

    const notionBuyPage = new NotionBuyPage(page)
    const plusSubscriptionCard = notionBuyPage.plusSubscriptionCard;
    const cardPrice = await plusSubscriptionCard.priceTag.textContent();

    expect(cardPrice).toBe(expectedValue);

  });

  test('Toggle subscription interval: monthly', async ({ page }) => {
    const expectedValue: string = '€17';

    const notionBuyPage = new NotionBuyPage(page)
    const businessSubscriptionCard = notionBuyPage.businessSubscriptionCard;

    const monthlyTab = notionBuyPage.getTabByName('monthly')

    await monthlyTab.click()

    const cardPrice = await businessSubscriptionCard.priceTag.textContent();
    expect(cardPrice).toBe(expectedValue);

  });

  test('Toggle subscription interval: yearly', async ({ page }) => {
    const expectedValue: string = '€14';

    const notionBuyPage = new NotionBuyPage(page)
    const businessSubscriptionCard = notionBuyPage.businessSubscriptionCard;

    const yearlyTab = notionBuyPage.getTabByName('yearly')

    await yearlyTab.click()

    const cardPrice = await businessSubscriptionCard.priceTag.textContent();
    expect(cardPrice).toBe(expectedValue);

  });


  // Написать пока проверки на псевдокоде. Что я буду проверять?





})





// Селектор карточек


// Селектор табов (месяц / год)

// Селектор кнопки на карточке
// Селектор цены на карточке

// УРЛ страницы (до перехода по кнопке, после)

// Тест дизайн. Что проверять.


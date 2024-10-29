import { test, expect, Page, Locator } from '@playwright/test';
import {NotionBuyPage, CardName, TabName} from "../pages/notionBuyPage";


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
    const freeSubscriptionCard = notionBuyPage.getCardByName('Free');
    const cardTitle = await freeSubscriptionCard.title.textContent();
    expect(cardTitle).toBe(expectedValue);
  });

  test('Check Free-subscription card price', async ({ page }) => {
    const expectedValue: string = '€0';

    const notionBuyPage = new NotionBuyPage(page)
    const freeSubscriptionCard = notionBuyPage.getCardByName('Free');
    const cardPrice = await freeSubscriptionCard.priceTag.textContent();

    expect(cardPrice).toBe(expectedValue);

    // Можно попробовать добавить параметризацию
  });

  test('Check Plus-subscription card price', async ({ page }) => {
    const expectedValue: string = '€9.50';

    const notionBuyPage = new NotionBuyPage(page)
    const plusSubscriptionCard = notionBuyPage.getCardByName('Plus');
    const cardPrice = await plusSubscriptionCard.priceTag.textContent();

    expect(cardPrice).toBe(expectedValue);

  });

  test('Toggle subscription interval: monthly', async ({ page }) => {
    const expectedValue: string = '€17';

    const notionBuyPage = new NotionBuyPage(page)
    const businessSubscriptionCard = notionBuyPage.getCardByName('Business');

    const monthlyTab = notionBuyPage.getTabByName('monthly')

    await monthlyTab.click()

    const cardPrice = await businessSubscriptionCard.priceTag.textContent();
    expect(cardPrice).toBe(expectedValue);

  });

  test('Toggle subscription interval: yearly', async ({ page }) => {
    const expectedValue: string = '€14';

    const notionBuyPage = new NotionBuyPage(page)
    const businessSubscriptionCard = notionBuyPage.getCardByName('Business');

    const yearlyTab = notionBuyPage.getTabByName('yearly')

    await yearlyTab.click()

    const cardPrice = await businessSubscriptionCard.priceTag.textContent();
    expect(cardPrice).toBe(expectedValue);

  });

  test('Click subscription card button', async ({ page }) => {

    const notionBuyPage = new NotionBuyPage(page)
    const plusSubscriptionCard = notionBuyPage.getCardByName('Plus');
    const navButton = plusSubscriptionCard.navButton

    await navButton.click()

    await expect(page).toHaveURL(/.*www.notion.so\/signup.*/)

  });

  test('Enterprise card button contents', async ({ page }) => {
    const notionBuyPage = new NotionBuyPage(page)
    const enterpriseSubscriptionCard = notionBuyPage.getCardByName('Enterprise');
    const navButton = enterpriseSubscriptionCard.navButton

    const navButtonTextContent = await navButton.textContent();

    expect(navButtonTextContent).toBe('Contact Sales')

  });


  const cardNames: { cardName: CardName }[] = [
    { cardName: 'Free' },
    { cardName: 'Plus' },
    { cardName: 'Enterprise' },
    { cardName: 'Business' },
  ];

  cardNames.forEach(({ cardName }) => {
    test(`Screenshot card nav button: ${cardName}`, async ({ page }) => {
      const notionBuyPage = new NotionBuyPage(page);
      const navButton = notionBuyPage.getCardByName(cardName).navButton;

      // Делаем скриншот конкретной карточки
      // await navButton.screenshot({ path: `screenshots/navButton-${cardName}-subscriptionCard.png` });

      // Для проверки соответствия
      await expect(navButton).toHaveScreenshot()
    });
  });



})







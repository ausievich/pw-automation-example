import { test, expect } from '@playwright/test';
import {JetbrainsBuyPage, CardName } from "../pages/JetbrainsBuyPage";

test.beforeEach(async ({ page, context }) => {
  await context.addCookies([
    {
      name: 'jb_cookies_consent_closed',
      value: 'true',
      domain: '.jetbrains.com',
      path: '/',
    }
  ]);

  await page.goto('https://www.jetbrains.com/idea/buy/');
});

test.describe('Buy page tests', () => {

  [
    { cardName: 'IntelliJ IDEA Ultimate', priceRegex: /.*599\.00.*/ },
    { cardName: 'All Products Pack', priceRegex: /.*779\.00.*/ },
  ].forEach(({ cardName, priceRegex }: { cardName: CardName, priceRegex: RegExp }) => {
    test(`Check card product price: ${cardName}`, async ({page}) => {
      const buyPage = new JetbrainsBuyPage(page);
      const card = buyPage.getCardByName(cardName);
      const productPrice = await card.pricesBlock.getProductPriceValue();

      expect(productPrice).toMatch(priceRegex)

    });
  })

  test('Click on buy button', async ({ page }) => {
    const urlRegex = /.*www\.jetbrains\.com\/shop\/customer.*/;

    const buyPage = new JetbrainsBuyPage(page)
    const ideaCard = buyPage.getCardByName('IntelliJ IDEA Ultimate');

    await ideaCard.buyButton.click()

    await expect(page).toHaveURL(urlRegex)
  });

  test('Click on checkbox hides "Get quote" link', async ({ page }) => {
    const buyPage = new JetbrainsBuyPage(page)
    const card = buyPage.getCardByName('IntelliJ IDEA Ultimate');

    await card.clickCheckbox();

    await expect(card.getQuoteLink).not.toBeVisible();
  });

  test('Click on checkbox does not hide "Learn more" link', async ({ page }) => {
    const buyPage = new JetbrainsBuyPage(page)
    const card = buyPage.getCardByName('All Products Pack');

    await card.clickCheckbox();

    await expect(card.learnMoreLink).toBeVisible();
  });

  [
    { linkName: 'Get quote', urlRegex: /.*jetbrains\.com\/shop\/customer.*/ },
    { linkName: 'Learn more', urlRegex: /.*jetbrains\.com\/all.*/ },
  ].forEach(({ linkName, urlRegex }) => {
    test(`Click link by name: ${linkName}`, async ({ page }) => {
      const buyPage = new JetbrainsBuyPage(page)
      const allProductsCard = buyPage.getCardByName('All Products Pack');

      await allProductsCard.clickLinkByName(linkName);

      await expect(page).toHaveURL(urlRegex)
    });
  });

  test.only('Toggle subscription interval', async ({ page, context }) => {
    const buyPage = new JetbrainsBuyPage(page)

    await buyPage.clickTabByName("For Individual Use");


    await page.pause();
  });

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

})







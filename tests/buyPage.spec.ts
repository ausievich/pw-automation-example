import { test, expect } from '@playwright/test';
import {JetbrainsBuyPage, CardName, TabName } from "../pages/JetbrainsBuyPage";


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

  test('Click on buy button', async ({ page }) => {
    const urlRegex = /.*www\.jetbrains\.com\/shop\/customer.*/;

    const buyPage = new JetbrainsBuyPage(page)
    const ideaCard = buyPage.getCardByName('IntelliJ IDEA Ultimate');

    await ideaCard.buyButton.click()

    await expect(page).toHaveURL(urlRegex)
  });

  test(`Monthly individual price displayed correctly`, async ({ page }) => {
    const priceRegex = /.*16\.90.*/;

    const buyPage = new JetbrainsBuyPage(page)
    const card = buyPage.getCardByName('IntelliJ IDEA Ultimate');

    await buyPage.clickTabByName('For Individual Use')
    await buyPage.clickIntervalByName('Monthly billing')

    const productPrice = await card.pricesBlock.getProductPriceValue();

    expect(productPrice).toMatch(priceRegex)
  });

  [
    { cardName: 'IntelliJ IDEA Ultimate', priceRegex: /.*599\.00.*/ },
    { cardName: 'All Products Pack', priceRegex: /.*779\.00.*/ },
  ].forEach(({ cardName, priceRegex }: { cardName: CardName, priceRegex: RegExp }) => {
    test(`Yearly prices for organizations: ${cardName}`, async ({page}) => {
      const buyPage = new JetbrainsBuyPage(page);
      const card = buyPage.getCardByName(cardName);
      const productPrice = await card.pricesBlock.getProductPriceValue();

      expect(productPrice).toMatch(priceRegex)

    });
  })

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

  test(`Monthly tab hides annual prices`, async ({ page }) => {
    const buyPage = new JetbrainsBuyPage(page)
    const card = buyPage.getCardByName('IntelliJ IDEA Ultimate');

    await buyPage.clickIntervalByName('Monthly billing')

    await expect(card.pricesBlock.secondYearPrice).not.toBeVisible();
    await expect(card.pricesBlock.thirdYearPrice).not.toBeVisible();

  });

})







import { test, expect } from '@playwright/test';
import { BuyPage } from "../pages/BuyPage";
import { ProductName, SubscriptionType, PRODUCT_NAMES, LINKS, LinkName } from "../utils/types";
import { ProductCard } from "../components/ProductCard";

const productName = PRODUCT_NAMES[process.env.PRODUCT_NAME];
const pageUrl = LINKS[process.env.PRODUCT_NAME];

const allProductsCardName: ProductName = 'All Products Pack';

let buyPage: BuyPage;
let productCard: ProductCard;
let allProductsCard: ProductCard;

test.beforeEach(async ({ page, context }) => {

  await context.addCookies([
    {
      name: 'jb_cookies_consent_closed',
      value: 'true',
      domain: '.jetbrains.com',
      path: '/',
    },
    {
      name: 'ncountryCodeCookie',
      value: 'US',
      domain: 'www.jetbrains.com',
      path: '/',
    },
  ]);

  await page.goto(pageUrl);

  buyPage = new BuyPage(page);
  productCard = buyPage.productCard;
  allProductsCard = buyPage.allProductsPackCard;

});

test.describe(`Navigation tests`, () => {

  [productName, allProductsCardName].forEach((cardName) => {

    test(`Click on buy button: ${cardName}`, async ({ page }) => {
      const urlRegex = /.*www\.jetbrains\.com\/shop\/customer.*/;
      const card = await buyPage.getCardByName(cardName);

      await card.buyButton.click()

      await expect(page).toHaveURL(urlRegex)
    });

    test(`Navigate "AI Pro" link ${cardName}`, async ({ page }) => {
      // Проверим переход по ссылке "JetBrains AI Pro"
    });

  });

  [
    { linkName: 'Get quote', urlRegex: /.*jetbrains\.com\/shop\/customer.*/ },
    { linkName: 'Learn more', urlRegex: /.*jetbrains\.com\/all.*/ },
  ].forEach(({ linkName, urlRegex }: {linkName: LinkName, urlRegex: RegExp}) => {
    test(`Click link by name: ${linkName}`, async ({ page }) => {
      await allProductsCard.clickLinkByName(linkName);

      await expect(page).toHaveURL(urlRegex)
    });
  });

})

test.describe(`Behaviour tests`, () => {

  test('Click on checkbox hides "Get quote" link', async ({ page }) => {
    await productCard.clickCheckbox();

    await expect(productCard.getQuoteLink).not.toBeVisible();
  });

  test('Click on checkbox does not hide "Learn more" link', async ({ page }) => {
    await allProductsCard.clickCheckbox();

    await expect(allProductsCard.getQuoteLink).not.toBeVisible();
    await expect(allProductsCard.learnMoreLink).toBeVisible();
  });

  test(`Monthly tab hides annual prices`, async ({ page }) => {
    await buyPage.clickIntervalByName('Monthly billing')

    await expect(productCard.pricesBlock.secondYearPrice).not.toBeVisible();
    await expect(productCard.pricesBlock.thirdYearPrice).not.toBeVisible();
  });

  test('Show "Includes 18 tools" dropdown', async ({ page }) => {
    // В тесте проверить работу компонента "Includes 18 tools" в карточке "All Products Pack"
    // По клику компонент раскрывается.
  });

  test('Hide "Includes 18 tools" dropdown', async ({ page }) => {
    // Элемент сворачивается
  });

})

test.describe(`Screenshot tests`, () => {
  const subscriptionTypes: SubscriptionType[] = [
    { interval: 'Monthly billing', tabName: 'For Individual Use' },
    { interval: 'Monthly billing', tabName: 'For Organizations' },
    { interval: 'Yearly billing', tabName: 'For Individual Use' },
    { interval: 'Yearly billing', tabName: 'For Organizations' },
  ];

  subscriptionTypes.forEach(({ interval, tabName }) => {
    test(`${productName} - ${tabName} (${interval})`, async () => {
      await buyPage.clickTabByName(tabName);
      await buyPage.clickIntervalByName(interval);

      await expect(productCard.self).toHaveScreenshot(['cards', productName, `${productName}_${tabName}_${interval}.png`]);
    });

    test(`${allProductsCardName} - ${tabName} (${interval})`, async () => {
      await buyPage.clickTabByName(tabName);
      await buyPage.clickIntervalByName(interval);

      await expect(allProductsCard.self).toHaveScreenshot(['cards', productName, `${allProductsCardName}_${tabName}_${interval}.png`]);
    });
  });

  // Можно дополнительно снять скриншоты карточек с активным чекбоксом
})

test.describe.skip(`Special categories tab tests`, () => {
  // Здесь можно все ссылки проверить

  test(`Click on a special card link`, async ({ page }) => {
    const card = await buyPage.getDiscountCardByName('For startups')

    await buyPage.clickTabByName('Special Categories')
    await card.clickLearnMoreLink()

    await expect(page).toHaveURL(/.*\/store\/startups.*/)
  });

})

test.describe(`Further information block tests`, () => {
  // Сделать скриншот блока
  // Проверить работу ссылок
  // Проверить работу кнопки "Contact us"
})

// Только для IDEA нужно проверить блок "Get a 90-day trial for your whole team"








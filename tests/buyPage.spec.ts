import { test, expect } from '@playwright/test';
import { BuyPage } from "../pages/BuyPage";
import { CardName, SubscriptionType, PRODUCT_NAMES } from "../utils/types";
import { ProductCard } from "../components/ProductCard";

const PRODUCT_NAME = process.env.PRODUCT_NAME;

const productCardName: CardName = PRODUCT_NAMES[PRODUCT_NAME];
const allProductsCardName: CardName = 'All Products Pack';

const pageUrl = `https://www.jetbrains.com/${PRODUCT_NAME.toLowerCase()}/buy/`

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
  productCard = await buyPage.getCardByName(productCardName);
  allProductsCard = await buyPage.getCardByName(allProductsCardName);

});

test.describe(`Navigation tests`, () => {
  [productCardName, allProductsCardName].forEach((cardName) => {
    test(`Click on buy button: ${cardName}`, async ({ page }) => {
      const urlRegex = /.*www\.jetbrains\.com\/shop\/customer.*/;
      const card = await buyPage.getCardByName(cardName);

      await card.clickBuyButton();

      await expect(page).toHaveURL(urlRegex);
    });

    test(`Click "Get quote" link: ${cardName}`, async ({ page }) => {
      const urlRegex = /.*www\.jetbrains\.com\/shop\/customer.*/;
      const card = await buyPage.getCardByName(cardName);

      await card.clickLinkByName('Get quote');

      await expect(page).toHaveURL(urlRegex)
    });

    test(`Navigate "AI Pro" link ${cardName}`, async () => {
      // Проверим переход по ссылке "JetBrains AI Pro"
    });

  });

  test(`Click "Learn more" link`, async ({ page }) => {
    const urlRegex = /.*jetbrains\.com\/all.*/;
    const card = await buyPage.getCardByName('All Products Pack');

    await card.clickLinkByName("Learn more");

    await expect(page).toHaveURL(urlRegex)
  });

  test(`Navigate "VAT ID" link`, async () => {
    // Проверим переход по ссылке "VAT ID"
  });

  test(`Navigate "Perpetual license" link`, async () => {
    // Проверим переход по ссылке "Perpetual license"
  });

})

test.describe(`Behaviour tests`, () => {
  test('Show "Includes 18 tools" dropdown', async () => {
    // В тесте проверить работу компонента "Includes 18 tools"
    // По клику компонент раскрывается
  });

  test('Hide "Includes 18 tools" dropdown', async () => {
    // В тесте проверить работу компонента "Includes 18 tools"
    // По клику элемент сворачивается
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
    test(`${productCardName} - ${tabName} (${interval})`, async () => {
      await buyPage.clickTabByName(tabName);
      await buyPage.clickIntervalByName(interval);

      const snapshotPath = ['cards', productCardName, `${productCardName}_${tabName}_${interval}.png`];

      await productCard.takeScreenshot(snapshotPath);
    });

    test(`${allProductsCardName} - ${tabName} (${interval})`, async () => {
      await buyPage.clickTabByName(tabName);
      await buyPage.clickIntervalByName(interval);

      const snapshotPath = ['cards', allProductsCardName, `${allProductsCardName}_${tabName}_${interval}.png`];

      await allProductsCard.takeScreenshot(snapshotPath, { mask: [allProductsCard.buyButton] });
    });

    test(`Supercharge - ${productCardName} - ${tabName} (${interval})`, async () => {
      await buyPage.clickTabByName(tabName);
      await buyPage.clickIntervalByName(interval);
      await productCard.clickCheckbox();

      const snapshotPath = ['cards', productCardName, 'Supercharge',`${productCardName}_${tabName}_${interval}.png`];

      await productCard.takeScreenshot(snapshotPath);
    });

    test(`Supercharge - ${allProductsCardName} - ${tabName} (${interval})`, async () => {
      await buyPage.clickTabByName(tabName);
      await buyPage.clickIntervalByName(interval);
      await allProductsCard.clickCheckbox();

      const snapshotPath = ['cards', allProductsCardName, 'Supercharge', `${allProductsCardName}_${tabName}_${interval}.png`];
      await allProductsCard.takeScreenshot(snapshotPath,{ mask: [allProductsCard.buyButton, allProductsCard.checkbox] });
    });

  });
})

test.describe(`Currency tests`, () => {
  const countryCodes = ['AM', 'DE', 'GB', 'CN', 'CZ', 'JP'];

  test.beforeEach(async ({ page, context }, testInfo) => {
    // Gets country code from the test name
    const countryCode = testInfo.title.split(': ')[1];

    await context.addCookies([
      {
        name: 'ncountryCodeCookie',
        value: countryCode,
        domain: 'www.jetbrains.com',
        path: '/',
      },
    ]);

    await page.goto(pageUrl);
  });

  countryCodes.forEach((countryCode) => {
    test(`Product Card currency: ${countryCode}`, async () => {
      const snapshotPath = ['cards', productCardName, 'Currencies', `${productCardName}_${countryCode}.png`];

      await productCard.takeScreenshot(snapshotPath);
    });

    test(`All Products Card currency: ${countryCode}`, async () => {
      const snapshotPath = ['cards', allProductsCardName, 'Currencies', `${allProductsCardName}_${countryCode}.png`];

      await allProductsCard.takeScreenshot(snapshotPath, { mask: [allProductsCard.buyButton] });
    });
  });
});

test.describe(`Special categories tab tests`, () => {
  // Сделать один общий кадр этого раздела
  // Нужен для него data-test атрибут
  // Аналогично для второго special-таба (Students, Teachers and Community)
  // Учесть небольшие отличия idea, clion, pycharm

})

test.describe(`Further information block tests`, () => {
  // Сделать скриншот блока
  // Проверить работу ссылок
  // Проверить работу кнопки "Contact us"

})

// Только для IDEA нужно проверить блок "Get a 90-day trial for your whole team"

// Можно ли добавить фикстуры?
// Посмотреть, что еще можно сделать с конфигом (возможно передавать productName оттуда, а не из ci)
// Посмотреть кейсы с мобильными устройствами и другими браузерами





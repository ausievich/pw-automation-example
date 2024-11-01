import {test, expect, Page} from '@playwright/test';
import { BuyPage } from "../pages/BuyPage";
import { CardName } from "../utils/types";
import {ProductCard} from "../components/ProductCard";

// Только для IDEA нужно проверить блок "Get a 90-day trial for your whole team"

const buyPageUrl = 'https://www.jetbrains.com/clion/buy/';
const productCardName: CardName = 'CLion';

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
    }
  ]);

  await page.goto(buyPageUrl);

  buyPage = new BuyPage(page);
  productCard = buyPage.getCardByName(productCardName);
  allProductsCard = buyPage.getCardByName('All Products Pack')

});

test.describe('Card navigation tests', () => {
  test('Click on buy button', async ({ page }) => {
    const urlRegex = /.*www\.jetbrains\.com\/shop\/customer.*/;

    await productCard.buyButton.click()

    await expect(page).toHaveURL(urlRegex)
  });

  [
    { linkName: 'Get quote', urlRegex: /.*jetbrains\.com\/shop\/customer.*/ },
    { linkName: 'Learn more', urlRegex: /.*jetbrains\.com\/all.*/ },
  ].forEach(({ linkName, urlRegex }) => {
    test(`Click link by name: ${linkName}`, async ({ page }) => {
      await allProductsCard.clickLinkByName(linkName);

      await expect(page).toHaveURL(urlRegex)
    });
  });

  test('Navigate "JetBrains AI Pro" link', async ({ page }) => {
    // Проверим переход по ссылке "JetBrains AI Pro"
  });

})

test.describe('Behaviour tests', () => {

  test('Click on checkbox hides "Get quote" link', async ({ page }) => {
    await productCard.clickCheckbox();

    await expect(productCard.getQuoteLink).not.toBeVisible();
  });

  test('Click on checkbox does not hide "Learn more" link', async ({ page }) => {
    await allProductsCard.clickCheckbox();

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
    // Проверить, что он отобразился.
  });

  test('Hide "Includes 18 tools" dropdown', async ({ page }) => {
    // Тест похож на предыдущий, но здесь проверим, что этот элемент можно обратно скрыть
  });

})

test.describe('Special categories tab tests', () => {
  // Здесь можно все ссылки проверить

  test(`Click on a special card link`, async ({ page }) => {
    const card = buyPage.getDiscountCardByName('For startups')

    await buyPage.clickTabByName('Special Categories')
    await card.clickLinkByName('Learn more')

    await expect(page).toHaveURL(/.*\/store\/startups.*/)
  });

})

test.describe('Cards screenshot tests', () => {
  // Наверное, проще скриншотить карточки.
  // Потому что поддерживать цены в коде тестов будет сложно.

})

test.describe('Further information block tests', () => {
  // Сделать скриншот блока
  // Проверить работу ссылок
  // Проверить работу кнопки Contact us
})





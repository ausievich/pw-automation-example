import {test, expect, Page} from '@playwright/test';
import { BuyPage } from "../pages/BuyPage";
import { CardName } from "../types/types";
import {ProductCard} from "../components/ProductCard";

const buyPageUrl = 'https://www.jetbrains.com/clion/buy/';
const productCardName: CardName = 'CLion';

let buyPage: BuyPage;
let productCard: ProductCard;
let allProductsCard: ProductCard;

test.beforeEach(async ({ page, context }) => {
  buyPage = new BuyPage(page);
  productCard = buyPage.getCardByName(productCardName);
  allProductsCard = buyPage.getCardByName('All Products Pack')

  await context.addCookies([
    {
      name: 'jb_cookies_consent_closed',
      value: 'true',
      domain: '.jetbrains.com',
      path: '/',
    }
  ]);

  await page.goto(buyPageUrl);
});

test.describe('Navigation tests', () => {
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

  test(`Click on a special card link`, async ({ page }) => {
    const card = buyPage.getDiscountCardByName('For startups')

    await buyPage.clickTabByName('Special Categories')
    await card.clickLinkByName('Learn more')

    await expect(page).toHaveURL(/.*\/store\/startups.*/)
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

test.describe('Prices assertions', () => {
  // Здесь, вероятно, можно хранить цены в каком-то отдельном файле,
  // и обращаться к ним через переменные. Чтобы легче было поддерживать код.
  // На данном этапе решил сильно не заморачиваться

  [
    { cardName: 'CLion', yearPriceRegex: /.*\$229\.00.*/ },
    { cardName: 'All Products Pack', yearPriceRegex: /.*\$779\.00.*/ },
  ].forEach(({ cardName, yearPriceRegex }: { cardName: CardName, yearPriceRegex: RegExp }) => {

    test(`Yearly price for organizations: ${cardName}`, async ({page}) => {
      const card = buyPage.getCardByName(cardName);
      const productPrice = await card.pricesBlock.getProductPriceValue();

      expect(productPrice).toMatch(yearPriceRegex)
    });
  });

  [
    { cardName: 'CLion', monthPriceRegex: /.*\$9\.90.*/ },
    { cardName: 'All Products Pack', monthPriceRegex: /.*\$28\.90.*/ }
  ].forEach(({ cardName, monthPriceRegex }: { cardName: CardName, yearPriceRegex: RegExp, monthPriceRegex: RegExp }) => {
    test(`Monthly price for individuals: ${cardName}`, async ({ page }) => {
      const card = buyPage.getCardByName(cardName);

      await buyPage.clickTabByName('For Individual Use')
      await buyPage.clickIntervalByName('Monthly billing')

      const productPrice = await card.pricesBlock.getProductPriceValue();

      expect(productPrice).toMatch(monthPriceRegex)
    });
  })

})

test.describe('Screenshot tests', () => {

  test('Screenshot ProductCard', async ({ page }) => {
    // Сделать скриншоты ProductCard.
    // Для карточки продукта и для "All Products Pack"
  });

  test('Screenshot DiscountCard', async ({ page }) => {
    // Сделать скриншот одного из элементов DiscountCard.
  });

})






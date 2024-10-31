import { test, expect } from '@playwright/test';
import { BuyPage } from "../pages/BuyPage";
import { CardName } from "../types/types";

const buyPageUrl = 'https://www.jetbrains.com/clion/buy/';
const productCardName: CardName = 'CLion';

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
});

test.describe('Navigation tests', () => {
  test('Click on buy button', async ({ page }) => {
    const urlRegex = /.*www\.jetbrains\.com\/shop\/customer.*/;

    const buyPage = new BuyPage(page)
    const productCard = buyPage.getCardByName(productCardName);

    await productCard.buyButton.click()

    await expect(page).toHaveURL(urlRegex)
  });

  [
    { linkName: 'Get quote', urlRegex: /.*jetbrains\.com\/shop\/customer.*/ },
    { linkName: 'Learn more', urlRegex: /.*jetbrains\.com\/all.*/ },
  ].forEach(({ linkName, urlRegex }) => {
    test(`Click link by name: ${linkName}`, async ({ page }) => {
      const buyPage = new BuyPage(page)
      const allProductsCard = buyPage.getCardByName('All Products Pack');

      await allProductsCard.clickLinkByName(linkName);

      await expect(page).toHaveURL(urlRegex)
    });
  });

  test(`Click on a special card link`, async ({ page }) => {
    const buyPage = new BuyPage(page)
    const card = buyPage.getDiscountCardByName('For startups')

    await buyPage.clickTabByName('Special Categories')
    card.clickLinkByName('Learn more')

    await expect(page).toHaveURL(/.*\/store\/startups.*/)
  });


  test('Navigate "JetBrains AI Pro" link', async ({ page }) => {
    // Проверим переход по ссылке "JetBrains AI Pro"
  });

})

test.describe('Behaviour tests', () => {
  test('Click on checkbox hides "Get quote" link', async ({ page }) => {
    const buyPage = new BuyPage(page)
    const card = buyPage.getCardByName(productCardName);

    await card.clickCheckbox();

    await expect(card.getQuoteLink).not.toBeVisible();
  });

  test('Click on checkbox does not hide "Learn more" link', async ({ page }) => {
    const buyPage = new BuyPage(page)
    const card = buyPage.getCardByName('All Products Pack');

    await card.clickCheckbox();

    await expect(card.learnMoreLink).toBeVisible();
  });

  test(`Monthly tab hides annual prices`, async ({ page }) => {
    const buyPage = new BuyPage(page)
    const card = buyPage.getCardByName(productCardName);

    await buyPage.clickIntervalByName('Monthly billing')

    await expect(card.pricesBlock.secondYearPrice).not.toBeVisible();
    await expect(card.pricesBlock.thirdYearPrice).not.toBeVisible();

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
  // Здесь вероятно можно хранить цены в каком-то отдельном файле,
  // и обращаться к ним через переменные. Чтобы легче было поддерживать код.
  // На данном этапе решил сильно не заморачиваться

  [
    { cardName: 'CLion', yearPriceRegex: /.*\$229\.00.*/ },
    { cardName: 'All Products Pack', yearPriceRegex: /.*\$779\.00.*/ },
  ].forEach(({ cardName, yearPriceRegex }: { cardName: CardName, yearPriceRegex: RegExp }) => {

    test(`Yearly price for organizations: ${cardName}`, async ({page}) => {
      const buyPage = new BuyPage(page);
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
      const buyPage = new BuyPage(page)
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






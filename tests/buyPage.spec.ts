import { test, expect } from '@playwright/test';
import { PremiumPage } from "../pages/PremiumPage";
import {PremiumPlan} from "../utils/types";

const pageUrl = `https://www.spotify.com/am/premium/`;
let premiumPage: PremiumPage;

test.beforeEach(async ({ page, context }) => {
  await page.goto(pageUrl);

  premiumPage = new PremiumPage(page);
});

test.describe(`Navigation tests`, () => {
  test(`header support link`, async ({ page }) => {
    const urlRegex = /.support.*/;
    await premiumPage.header.supportLink.click();

    await expect(page).toHaveURL(urlRegex);
  });

  test(`header download link`, async ({page}) => {
    const urlRegex = /.download.*/;
    await premiumPage.header.downloadLink.click();

    await expect(page).toHaveURL(urlRegex);
  });

  test(`header premium link menu displayed`, async ({page}) => {
    await premiumPage.header.premiumLink.hover();

    await expect(premiumPage.header.premiumMenu.locator).toBeVisible();
  });

  const subscriptionPlans: { subscriptionPlan: PremiumPlan; urlRegex: RegExp }[] = [
    { subscriptionPlan: 'premium-family', urlRegex: /.family.*/ },
    { subscriptionPlan: 'premium-duo', urlRegex: /.duo.*/ },
    { subscriptionPlan: 'premium-student', urlRegex: /.student.*/ },
    { subscriptionPlan: 'premium-individual', urlRegex: /.individual.*/ },
  ];

  subscriptionPlans.forEach(({ subscriptionPlan, urlRegex }) => {
    test(`header premium link menu navigation: ${subscriptionPlan}`, async ({ page }) => {
      await premiumPage.header.premiumLink.hover();
      await premiumPage.header.premiumMenu.clickLinkByName(subscriptionPlan);

      await expect(page).toHaveURL(urlRegex);
    });
  });
})



test.describe(`Behaviour tests`, () => {


})

// test.describe(`Screenshot tests`, () => {
//   const subscriptionTypes: SubscriptionType[] = [
//     { interval: 'Monthly billing', tabName: 'For Individual Use' },
//     { interval: 'Monthly billing', tabName: 'For Organizations' },
//     { interval: 'Yearly billing', tabName: 'For Individual Use' },
//     { interval: 'Yearly billing', tabName: 'For Organizations' },
//   ];
//
//   subscriptionTypes.forEach(({ interval, tabName }) => {
//     test(`${productCardName} - ${tabName} (${interval})`, async () => {
//       await premiumPage.clickTabByName(tabName);
//       await premiumPage.clickIntervalByName(interval);
//
//       const snapshotPath = ['cards', productCardName, `${productCardName}_${tabName}_${interval}.png`];
//
//       await productCard.takeScreenshot(snapshotPath);
//     });
//
//     test(`${allProductsCardName} - ${tabName} (${interval})`, async () => {
//       await premiumPage.clickTabByName(tabName);
//       await premiumPage.clickIntervalByName(interval);
//
//       const snapshotPath = ['cards', allProductsCardName, `${allProductsCardName}_${tabName}_${interval}.png`];
//
//       await allProductsCard.takeScreenshot(snapshotPath, { mask: [allProductsCard.buyButton] });
//     });
//
//     test(`Supercharge - ${productCardName} - ${tabName} (${interval})`, async () => {
//       await premiumPage.clickTabByName(tabName);
//       await premiumPage.clickIntervalByName(interval);
//       await productCard.clickCheckbox();
//
//       const snapshotPath = ['cards', productCardName, 'Supercharge',`${productCardName}_${tabName}_${interval}.png`];
//
//       await productCard.takeScreenshot(snapshotPath);
//     });
//
//     test(`Supercharge - ${allProductsCardName} - ${tabName} (${interval})`, async () => {
//       await premiumPage.clickTabByName(tabName);
//       await premiumPage.clickIntervalByName(interval);
//       await allProductsCard.clickCheckbox();
//
//       const snapshotPath = ['cards', allProductsCardName, 'Supercharge', `${allProductsCardName}_${tabName}_${interval}.png`];
//       await allProductsCard.takeScreenshot(snapshotPath,{ mask: [allProductsCard.buyButton, allProductsCard.checkbox] });
//     });
//
//   });
// })






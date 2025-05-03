import { test, expect } from '@playwright/test';
import { PremiumPage } from "../pages/PremiumPage";
import {PremiumPlan} from "../utils/types";

const pageUrl = `https://www.spotify.com/am/premium/`;
let premiumPage: PremiumPage;

test.beforeEach(async ({ page }) => {
  await page.goto(pageUrl);

  premiumPage = new PremiumPage(page);
});

test.describe(`Navigation tests`, () => {
  test(`header logo link`, async ({ page }) => {
    const urlRegex = /.open.*/;
    await premiumPage.header.logo.click();

    await expect(page).toHaveURL(urlRegex);
  });

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

  test(`header premium link menu displayed`, async () => {
    await premiumPage.header.premiumLink.hover();

    await expect(premiumPage.header.premiumMenu.locator).toBeVisible();
  });

  test(`header premium link menu snapshot`, async () => {
    const premiumMenu = premiumPage.header.premiumMenu;
    const snapshotPath = ['header', `PremiumMenu.png`];

    await premiumPage.header.premiumLink.hover();

    await premiumMenu.takeScreenshot(snapshotPath);
  })

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

  test(`get started button`, async ({ page }) => {
    const urlRegex = /.login.*/;
    await premiumPage.getStartedButton.click();

    await expect(page).toHaveURL(urlRegex);
  })

  test.only(`view all plans button`, async ({ page }) => {
    const urlRegex = /.#plans.*/;
    await premiumPage.viewAllPlansButton.click();

    await expect(page).toHaveURL(urlRegex);
  })
})

test.describe(`Section snapshot tests`, () => {
  const sectionPositions: Number[] = [0, 1, 3];

  sectionPositions.forEach((position) => {
    test(`screenshot section: position ${position}`, async () => {
      const section = await premiumPage.getSectionByPosition(position);
      const snapshotPath = ['sections', `Section_${position}.png`];

      await section.takeScreenshot(snapshotPath);
    });

  });
})

test.describe(`Behaviour tests`, () => {


})

// Добавить allure
// Добавить побольше интересных тест-кейсов






import { test, expect } from '@playwright/test';
import { PremiumPage } from "../pages/PremiumPage";
import {CardId, PremiumPlan} from "../utils/types";
import { Element } from "../utils/element";

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

  const subscriptionPlans: { subscriptionPlan: PremiumPlan; urlRegex: RegExp }[] = [
    { subscriptionPlan: 'premium-family', urlRegex: /.family.*/ },
    { subscriptionPlan: 'premium-duo', urlRegex: /.duo.*/ },
    { subscriptionPlan: 'premium-student', urlRegex: /.student.*/ },
    { subscriptionPlan: 'premium-individual', urlRegex: /.individual.*/ },
  ];

  subscriptionPlans.forEach(({ subscriptionPlan, urlRegex }) => {
    test(`header premium link menu navigation: ${subscriptionPlan}`, async ({ page }) => {
      await premiumPage.header.premiumLink.hover();
      await premiumPage.header.clickLinkByName(subscriptionPlan);

      await expect(page).toHaveURL(urlRegex);
    });
  });

  test(`get started button`, async ({ page }) => {
    const urlRegex = /.login.*/;
    await premiumPage.getStartedButton.click();

    await expect(page).toHaveURL(urlRegex);
  })

  test(`view all plans button`, async ({ page }) => {
    const urlRegex = /.#plans.*/;
    await premiumPage.viewAllPlansButton.click();

    await expect(page).toHaveURL(urlRegex);
  })
})

test.describe(`Snapshot tests`, () => {
  const sectionPositions: Number[] = [0, 1, 3];
  sectionPositions.forEach((position) => {
    test(`screenshot section: position ${position}`, async () => {
      const section = await premiumPage.getSectionByPosition(position);
      const snapshotPath = ['sections', `Section_${position}.png`];

      await section.takeScreenshot(snapshotPath);
    });

  });

  const subcriptionTypes: CardId[] = ['plan-premium-individual', 'plan-premium-duo', 'plan-premium-student', 'plan-premium-family'];
  subcriptionTypes.forEach((id) => {
    test(`subscription card: ${id}`, async () => {
      const subscriptionCard = await premiumPage.getPremiumCardById(id);
      const snapshotPath = ['subscriptionCards', `SubscriptionCard_${id}.png`];

      await subscriptionCard.takeScreenshot(snapshotPath);
    });

  });

  test(`header premium link menu snapshot`, async () => {
    const premiumMenu = premiumPage.header.premiumMenu;
    const snapshotPath = ['header', `PremiumMenu.png`];

    await premiumPage.header.premiumLink.hover();

    await premiumMenu.takeScreenshot(snapshotPath);
  })

})

test.describe(`Behaviour tests`, () => {
  test(`open question`, async ({ page }) => {
    const q = await premiumPage.getQuestionContainerByText('How much is Spotify Premium in Armenia?')

    await q.questionTitle.click();

    await expect(q.questionContent).toBeVisible();
  })

  test(`close question`, async ({ page }) => {
    const q = await premiumPage.getQuestionContainerByText('How does the Spotify Premium trial work?')

    await q.questionTitle.click();
    await q.questionTitle.click();

    await expect(q.questionContent).not.toBeVisible();
  })

  test(`show tooltip`, async ({ page }) => {
    const tooltipTrigger = await premiumPage.getTooltipTriggerByText('Download');
    await tooltipTrigger.hover();

    await expect(premiumPage.tooltip).toBeVisible();
  })


})

// TODO
// add allure report
// add localization tests
// add s3 for snapshots
// add telegram reporter
// add small screens
// add various browsers








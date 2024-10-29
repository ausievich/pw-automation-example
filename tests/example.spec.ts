import { test, expect } from '@playwright/test';

test.describe.skip('Example tests', () => {

  test('has title', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);

  });

  test('get started link', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', {name: 'Get started'}).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
  });

  // JB tests
  test('jb test', async ({page}) => {
    await page.goto('https://www.jetbrains.com/pycharm/buy/');

    // Expect a title "to contain" a substring.
    //await expect(page).toHaveTitle(/Playwright/);

    await page.pause()

  });
})
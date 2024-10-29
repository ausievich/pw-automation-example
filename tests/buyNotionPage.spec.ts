import { test, expect } from '@playwright/test';

// JB tests
test.only('page loading', async ({ page }) => {
  await page.goto('https://www.notion.so/pricing');

  //await expect(page).toHaveURL(/.*section=commercial&billing=yearly/);

  await page.pause()

});

// Селектор карточек


// Селектор табов (месяц / год)

// Селектор кнопки на карточке
// Селектор цены на карточке

// УРЛ страницы (до перехода по кнопке, после)

// Тест дизайн. Что проверять.


import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Form' }).click();

  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Submit' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Deeplink' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Go to page one' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Go to page two' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Go back to page one' }).click();

  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Video' }).click();
});

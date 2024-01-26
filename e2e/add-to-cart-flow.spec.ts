import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('navigates to product view and adds item to cart', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await expect(page).toHaveTitle(/Just Like People - Home/);

  await page.getByRole('link', { name: 'Products'}).click();
  await page.getByRole('link', { name: 'Animals in Glasses'}).click();
  await expect(page).toHaveTitle(/Just Like People - Products/);

  const addButton = page.getByRole('button', { name: 'Add one to cart'}).filter({
    hasText: '+'
  });

  // 0 in cart
  await addButton.click();
  // 1 in cart
  await addButton.click();
  // 2 in cart
  await page.getByRole('button', { name: 'Add one to the 2 in the cart'}).click();
  // 3 in cart
  await page.getByRole('button', { name: 'Remove one from cart'}).click();
  // 2 in cart

  await page.getByRole('link', { name: 'Cart'}).click();
  await expect(page).toHaveTitle(/Just Like People - Cart/);

  const addedItem = page.getByRole('listitem').filter({ hasText: /Dark Shades for Cool Cats/});
  const quantityButton = addedItem.getByRole('button').filter({ hasText: '2'});
  await expect(quantityButton).toBeVisible();
});

test.describe('Axe test', () => {
  test('home should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('cart should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200/cart');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('contact should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200/contact');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('products should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200/products/glasses?productId=cat-glasses-1');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

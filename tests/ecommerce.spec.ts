import { test, expect } from '@playwright/test';
import { PRODUCT_CARD } from '../locator/locator';
import { PRODUCT_FISRT, PRODUCT_SECOND } from '../locator/mock-data';

test.use({ storageState: 'storageState.json' });
test.beforeEach(async ({ page }) => {
  // Go to the Home page
  await page.goto('https://web-demo.qahive.com/product-list');
  await expect(page.locator('.btn-container')).toContainText('creamqa');
});

test('customer able to see product information', async ({ page }) => {
  // Assertion product image 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_IMAGE).first()).toHaveAttribute('src', `${PRODUCT_FISRT.IMAGE_URL}`)
  // Assertion product name 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_NAME).first()).toHaveText(`${PRODUCT_FISRT.NAME}`);
  // Assertion product price 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_PRICE).first()).toHaveText(`Price: ${PRODUCT_FISRT.PRICE} THB`);
  // Assertion product short description 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_DESCRIPTION).nth(1)).toHaveText(`${PRODUCT_FISRT.DESCRIPTION}`);
  // Assertion product can click 
  await expect(page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).first()).toBeEnabled();
});

test('customer able to add 2 products to cart', async ({ page }) => {
  const productTotalPrice = Number(PRODUCT_FISRT.PRICE) + Number(PRODUCT_SECOND.PRICE);
  // Add 1st product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(0).click();
  // Add 2nd product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(1).click();
  // Go to cart page 
  await page.getByRole('link', { name: '(2)' }).click();
  // Assertion name 1st product 
  await expect(page.getByRole('heading', { name: 'Travel Bag' })).toHaveText(`${PRODUCT_FISRT.NAME}`);
  // Assertion price in line 1st product 
  await expect(page.getByRole('heading', { name: '3000' })).toHaveText(`${PRODUCT_FISRT.PRICE}`);
  // Assertion name 2nd product 
  await expect(page.getByRole('heading', { name: 'Apple Watch' })).toHaveText(`${PRODUCT_SECOND.NAME}`);
  // Assertion price in line 2nd product 
  await expect(page.getByRole('heading', { name: '12500' })).toHaveText(`${PRODUCT_SECOND.PRICE}`);
  // Assertion total quantity products
  await expect(page.getByText('You have 2 items in your cart')).toContainText('2');
  // Assertion total price products
  await expect(page.getByText('15500')).toHaveText(`${productTotalPrice}`)
});

test('customer able to adjust cart', async ({ page }) => {
  let productFristTotalPrice = (Number(PRODUCT_FISRT.PRICE) * 2);
  let productSecondTotalPrice = (Number(PRODUCT_SECOND.PRICE) * 2);
  const productTotalPrice = productFristTotalPrice + productSecondTotalPrice;
  // Add 1st product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(0).click();
  // Add 2nd product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(1).click();
  // Go to cart page 
  await page.getByRole('link', { name: '(2)' }).click();
  await page.getByRole('link', { name: ' Continue shopping' }).click();
  // Add 1st product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(0).click();
  // Add 2nd product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(1).click();
  await page.getByRole('link', { name: '(4)' }).click();
  // Assertion name 1st product 
  await expect(page.getByRole('heading', { name: 'Travel Bag' })).toHaveText(`${PRODUCT_FISRT.NAME}`);
  // Assertion price in line 1st product 
  await expect(page.getByRole('heading', { name: '3000' })).toHaveText(`${PRODUCT_FISRT.PRICE}`);
  // Assertion name 2nd product 
  await expect(page.getByRole('heading', { name: 'Apple Watch' })).toHaveText(`${PRODUCT_SECOND.NAME}`);
  // Assertion price in line 2nd product 
  await expect(page.getByRole('heading', { name: '12500' })).toHaveText(`${PRODUCT_SECOND.PRICE}`);
  // Assertion total quantity products
  await expect(page.getByText('You have 4 items in your cart')).toContainText('4');
  // Assertion total price products
  await expect(page.getByText('31000')).toHaveText(`${productTotalPrice}`)
});
import { test, expect } from '@playwright/test';
import { PRODUCT_CARD } from '../locator/locator';


test.use({ storageState: 'storageState.json' });
test.beforeEach(async ({ page }) => {
  // Go to the Home page
  await page.goto('https://web-demo.qahive.com/product-list');
  await expect(page.locator('.btn-container')).toContainText('creamqa');
});

test('customer able to see product information', async ({ page }) => {
  const expectedProduct = {
    name: 'Travel Bag',
    description: 'A big bag is a general term used to describe a large-sized bag or tote that provides ample storage space for carrying various items.',
    price: '3000',
    imageUrl: '/static/media/1.c2116c2b714f83257962.png',
  };
  // Assertion product image 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_IMAGE).first()).toHaveAttribute('src', `${expectedProduct.imageUrl}`)
  // Assertion product name 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_NAME).first()).toHaveText(`${expectedProduct.name}`);
  // Assertion product price 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_PRICE).first()).toHaveText(`Price: ${expectedProduct.price} THB`);
  // Assertion product short description 
  await expect(page.locator(PRODUCT_CARD.PRODUCT_DESCRIPTION).nth(1)).toHaveText(`${expectedProduct.description}`);
  // Assertion product can click 
  await expect(page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).first()).toBeEnabled();
});

test('customer able to add product to cart', async ({ page }) => {
  const productFirst = {
    name: 'Travel Bag',
    description: 'A big bag is a general term used to describe a large-sized bag or tote that provides ample storage space for carrying various items.',
    price: '3000',
    imageUrl: '/static/media/1.c2116c2b714f83257962.png',
  };
  const productSecond = {
    name: 'Apple Watch',
    description: 'Apple Watch is a popular wearable device developed and sold by Apple Inc. It was first introduced in 2015, primarily women men.',
    price: '12500',
    imageUrl: '/static/media/2.33b94cb35c0245715553.png"',
  };
  const productTotalPrice= Number(productFirst.price)+Number(productSecond.price);
  // Add 1st product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(0).click();
  // Add 2nd product to cart 
  await page.locator(PRODUCT_CARD.ADD_TO_CART_BUTTON).nth(1).click();
  // Go to cart page 
  await page.getByRole('link', { name: '(2)' }).click();
  // Assertion name 1st product 
  await expect(page.getByRole('heading', { name: 'Travel Bag' })).toHaveText(`${productFirst.name}`);
  // Assertion price in line 1st product 
  await expect(page.getByRole('heading', { name: '3000' })).toHaveText(`${productFirst.price}`);
  // Assertion name 2nd product 
  await expect(page.getByRole('heading', { name: 'Apple Watch' })).toHaveText(`${productSecond.name}`);
  // Assertion price in line 2nd product 
  await expect(page.getByRole('heading', { name: '12500' })).toHaveText(`${productSecond.price}`);
  // Assertion total quantity products
  await expect(page.getByText('You have 2 items in your cart')).toContainText('2');
  // Assertion total price products
  await expect(page.getByText('15500')).toHaveText(`${productTotalPrice}`)
});




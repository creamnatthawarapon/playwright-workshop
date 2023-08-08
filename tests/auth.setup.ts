import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://web-demo.qahive.com/register');
    await page.getByTestId('email').fill('cream.natthawarapon@maqe.com');
    await page.getByTestId('password').fill('cream1234');
    await Promise.all([
        page.getByRole('button', { name: /submit/i }).click()
      ]);
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://web-demo.qahive.com/product-list');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.locator('.btn-container')).toContainText('creamqa');
  
    // End of authentication steps.
  
    await page.context().storageState({ path: authFile });
  });
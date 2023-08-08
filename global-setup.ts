import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://web-demo.qahive.com/register');
  await page.getByTestId('email').fill('cream.natthawarapon@maqe.com');
  await page.getByTestId('password').fill('cream1234');
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('button', { name: /submit/i }).click()
  ]);
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
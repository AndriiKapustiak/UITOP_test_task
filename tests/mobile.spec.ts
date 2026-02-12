import { test, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_CREDENTIALS } from '../utils/test-data';

test.describe('Mobile - iPhone 13', () => {
  test('TC-MOB-001: Login on iPhone 13', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPhone 13'] });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.openLoginModal();
    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.login(TEST_CREDENTIALS.valid.email, TEST_CREDENTIALS.valid.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await context.close();
  });
});

test.describe('Mobile - Pixel 5', () => {
  test('TC-MOB-002: Login on Pixel 5', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['Pixel 5'] });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.openLoginModal();
    await loginPage.login(TEST_CREDENTIALS.valid.email, TEST_CREDENTIALS.valid.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await context.close();
  });

  test('TC-MOB-003: Invalid credentials on Pixel 5', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['Pixel 5'] });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.openLoginModal();
    await loginPage.login('invalid@email.com', 'wrongpassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);

    await context.close();
  });
});

test.describe('Tablet - iPad Pro', () => {
  test('TC-MOB-004: Login on iPad Pro', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPad Pro'] });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.openLoginModal();
    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.login(TEST_CREDENTIALS.valid.email, TEST_CREDENTIALS.valid.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    await context.close();
  });
});


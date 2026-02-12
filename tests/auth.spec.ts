import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_CREDENTIALS } from '../utils/test-data';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.openLoginModal();
  });

  test('TC-AUTH-001: Login with valid credentials', async () => {
    await loginPage.fillEmail(TEST_CREDENTIALS.valid.email);
    await loginPage.fillPassword(TEST_CREDENTIALS.valid.password);
    await loginPage.submitForm();
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('TC-AUTH-002: Display login form elements', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('TC-AUTH-003: Invalid email shows error', async () => {
    await loginPage.fillEmail(TEST_CREDENTIALS.invalid.wrongEmail);
    await loginPage.fillPassword(TEST_CREDENTIALS.valid.password);
    await loginPage.submitForm();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
  });

  test('TC-AUTH-004: Invalid password shows error', async () => {
    await loginPage.fillEmail(TEST_CREDENTIALS.valid.email);
    await loginPage.fillPassword(TEST_CREDENTIALS.invalid.wrongPassword);
    await loginPage.submitForm();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
  });
});


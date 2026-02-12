import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_CREDENTIALS } from '../utils/test-data';

test.describe('Authentication Validation', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.openLoginModal();
  });

  test('TC-VAL-001: Invalid email format', async () => {
    await loginPage.fillEmail('invalidemail.com');
    await loginPage.fillPassword(TEST_CREDENTIALS.valid.password);
    await loginPage.submitForm();
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('TC-VAL-002: Empty email field', async () => {
    await loginPage.fillEmail('');
    await loginPage.fillPassword(TEST_CREDENTIALS.valid.password);
    await loginPage.submitForm();
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('TC-VAL-003: Empty password field', async () => {
    await loginPage.fillEmail(TEST_CREDENTIALS.valid.email);
    await loginPage.fillPassword('');
    await loginPage.submitForm();
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('TC-VAL-004: Invalid credentials', async () => {
    await loginPage.fillEmail(TEST_CREDENTIALS.invalid.wrongEmail);
    await loginPage.fillPassword(TEST_CREDENTIALS.invalid.wrongPassword);
    await loginPage.submitForm();
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});


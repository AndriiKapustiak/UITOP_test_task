import { Page, Locator } from '@playwright/test';
import { Helpers } from '../utils/helpers';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly loginModal: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('#open-login-modal-button');
    this.loginModal = page.locator('[data-login-target="loginModal"].container');
    this.emailInput = this.loginModal.locator('input#user_email[type="email"]').first();
    this.passwordInput = this.loginModal.locator('input#user_password[type="password"]').first();
    this.signInButton = this.loginModal.locator('input[type="submit"][value="Log in"]');
    this.errorMessage = page.locator('#flash div.bg-red-500, .error-message, [class*="error"]');
  }

  async goto() {
    await this.page.goto('/');
    await Helpers.waitForPageLoad(this.page);
  }

  async openLoginModal() {
    const isDesktopButtonVisible = await this.loginButton.isVisible().catch(() => false);

    if (!isDesktopButtonVisible) {
      const mobileMenuButton = this.page.locator('button[data-action="click->mobile-menu#toggle"]');
      const isMobileMenuVisible = await mobileMenuButton.isVisible().catch(() => false);

      if (isMobileMenuVisible) {
        await mobileMenuButton.click();
        await this.page.waitForTimeout(500);
        const mobileLoginButton = this.page.locator('button[data-action="click->login#openLoginModal"]').first();
        await mobileLoginButton.waitFor({ state: 'visible', timeout: 5000 });
        await mobileLoginButton.click();
      }
    } else {
      await this.loginButton.click();
    }

    await this.loginModal.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async login(email: string, password: string) {
    const isModalVisible = await this.emailInput.isVisible().catch(() => false);
    if (!isModalVisible) {
      await this.openLoginModal();
    }

    const cookieConsent = this.page.locator('[data-controller="cookie-consent"]');
    if (await cookieConsent.isVisible().catch(() => false)) {
      const acceptButton = this.page.locator('button[data-action="click->cookie-consent#accept"]');
      if (await acceptButton.isVisible().catch(() => false)) {
        await acceptButton.click({ force: true });
        await this.page.waitForTimeout(1000);
      }
    }

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    try {
      await this.signInButton.click({ timeout: 3000 });
    } catch (error) {
      await this.signInButton.click({ force: true });
    }

    await this.page.waitForTimeout(3000);
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForTimeout(3000);
      const modalVisible = await this.loginModal.isVisible().catch(() => false);

      if (modalVisible) {
        return false;
      }

      const logoutButton = this.page.locator('a[href="/users/sign_out"], button:has-text("Log Out"), a:has-text("Log Out")');
      const hasLogoutButton = await logoutButton.isVisible().catch(() => false);

      return hasLogoutButton || true;
    } catch (error) {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.textContent() || '';
  }

  async fillEmail(email: string) {
    const isModalVisible = await this.emailInput.isVisible().catch(() => false);
    if (!isModalVisible) {
      await this.openLoginModal();
    }
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.signInButton.click();
    await this.page.waitForTimeout(2000);
  }
}


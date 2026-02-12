import { Page, Locator, expect } from '@playwright/test';
import { Helpers } from '../utils/helpers';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator; // "Log in" button in header
  readonly loginModal: Locator; // Login modal dialog
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly createAccountTab: Locator;
  readonly logInTab: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header login button - desktop version with ID
    // Note: There's also a mobile menu version without ID
    this.loginButton = page.locator('#open-login-modal-button');

    // Modal dialog - target the content div specifically (not the overlay)
    // There are 2 elements with data-login-target="loginModal", we want the one with bg-white
    this.loginModal = page.locator('[data-login-target="loginModal"].container');

    // Form fields - scoped within the modal to avoid duplicates from "Create account" tab
    // The modal has both "Log in" and "Create account" forms, so we need to scope to the visible one
    this.emailInput = this.loginModal.locator('input#user_email[type="email"]').first();
    this.passwordInput = this.loginModal.locator('input#user_password[type="password"]').first();
    this.signInButton = this.loginModal.locator('input[type="submit"][value="Log in"]');

    // Tabs in modal - the "Log in" tab is disabled when active
    this.logInTab = page.locator('button:has-text("Log in")').first();
    this.createAccountTab = page.locator('button[data-action="click->login#switch"]:has-text("Create account")');

    // Error and links
    this.errorMessage = page.locator('#flash div.bg-red-500, .error-message, [class*="error"]');
    this.forgotPasswordLink = page.locator('a[href="/users/password/new"]:has-text("Lost your password")');
    this.signUpLink = page.locator('button:has-text("Create account")');
  }

  async goto() {
    await this.page.goto('/');
    await Helpers.waitForPageLoad(this.page);
  }

  async openLoginModal() {
    // Check if desktop login button is visible
    const isDesktopButtonVisible = await this.loginButton.isVisible().catch(() => false);

    if (!isDesktopButtonVisible) {
      // On mobile, we need to click the burger menu button first
      // The mobile menu toggle button has data-action="click->mobile-menu#toggle"
      const mobileMenuButton = this.page.locator('button[data-action="click->mobile-menu#toggle"]');
      const isMobileMenuVisible = await mobileMenuButton.isVisible().catch(() => false);

      if (isMobileMenuVisible) {
        await mobileMenuButton.click();
        await this.page.waitForTimeout(500); // Wait for menu animation

        // After opening mobile menu, use the mobile login button (different from desktop)
        // Mobile login button has data-action but no ID
        const mobileLoginButton = this.page.locator('button[data-action="click->login#openLoginModal"]').first();
        await mobileLoginButton.waitFor({ state: 'visible', timeout: 5000 });
        await mobileLoginButton.click();
      }
    } else {
      // Desktop: Click the login button with ID
      await this.loginButton.click();
    }

    // Wait for modal to appear
    await this.loginModal.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async login(email: string, password: string) {
    // Open modal if not already open
    const isModalVisible = await this.emailInput.isVisible().catch(() => false);
    if (!isModalVisible) {
      await this.openLoginModal();
    }

    // Dismiss cookie consent FIRST (before filling form)
    const cookieConsent = this.page.locator('[data-controller="cookie-consent"]');
    if (await cookieConsent.isVisible().catch(() => false)) {
      const acceptButton = this.page.locator('button[data-action="click->cookie-consent#accept"]');
      if (await acceptButton.isVisible().catch(() => false)) {
        await acceptButton.click({ force: true });
        await this.page.waitForTimeout(1000);
      }
    }

    // Fill credentials
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // Try to click submit button normally first, then with force if needed
    try {
      await this.signInButton.click({ timeout: 3000 });
    } catch (error) {
      // If normal click fails (cookie consent blocking), use force click
      await this.signInButton.click({ force: true });
    }

    // Wait a bit for login to process
    await this.page.waitForTimeout(3000);
  }

  async isLoggedIn(): Promise<boolean> {
    // Wait for navigation or dashboard element, or modal to close
    try {
      // Wait a bit for login to process
      await this.page.waitForTimeout(3000);

      // Check if modal is still visible (if visible, login failed)
      const modalVisible = await this.loginModal.isVisible().catch(() => false);

      // If modal is still visible, login failed
      if (modalVisible) {
        return false;
      }

      // Check for logged-in indicators (user menu, logout button, etc.)
      const logoutButton = this.page.locator('a[href="/users/sign_out"], button:has-text("Log Out"), a:has-text("Log Out")');
      const hasLogoutButton = await logoutButton.isVisible().catch(() => false);

      if (hasLogoutButton) {
        return true;
      }

      // Modal is hidden and no error visible, assume login was successful
      return true;
    } catch (error) {
      console.log('isLoggedIn error:', error);
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.textContent() || '';
  }

  async isEmailFieldEmpty(): Promise<boolean> {
    return (await this.emailInput.inputValue()) === '';
  }

  async isPasswordFieldEmpty(): Promise<boolean> {
    return (await this.passwordInput.inputValue()) === '';
  }

  async clearEmailField() {
    await this.emailInput.clear();
  }

  async clearPasswordField() {
    await this.passwordInput.clear();
  }

  async isSignInButtonEnabled(): Promise<boolean> {
    return await this.signInButton.isEnabled();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

  async getEmailValidationError(): Promise<string> {
    const validationMessage = await this.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    return validationMessage;
  }

  async fillEmail(email: string) {
    // Open modal if not already open
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

  async ensureModalOpen() {
    const isModalVisible = await this.emailInput.isVisible().catch(() => false);
    if (!isModalVisible) {
      await this.openLoginModal();
    }
  }
}


import { Page } from '@playwright/test';

export class Helpers {
  /**
   * Wait for page to be fully loaded
   */
  static async waitForPageLoad(page: Page): Promise<void> {
    try {
      await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (error) {
      // If networkidle times out, just wait for load state
      await page.waitForLoadState('load', { timeout: 10000 });
    }
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number = 10): string {
    return Math.random().toString(36).substring(2, length + 2);
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {
    return `test_${this.generateRandomString()}@test.com`;
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `screenshots/${name}_${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for element to be visible and stable
   */
  static async waitForElement(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }
}


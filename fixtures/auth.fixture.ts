import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { TEST_CREDENTIALS } from '../utils/test-data';
import { ErrorLogger } from '../utils/error-logger';

type MyFixtures = {
  loginPage: LoginPage;
  projectsPage: ProjectsPage;
  authenticatedPage: void;
  errorLogger: ErrorLogger;
};

/**
 * Custom fixtures for Playwright tests
 * Provides pre-configured page objects and authenticated sessions
 */
export const test = base.extend<MyFixtures>({
  // Error logger fixture - automatically logs console and network errors
  errorLogger: async ({ page }, use, testInfo) => {
    const logger = new ErrorLogger(page, testInfo.title);
    await use(logger);

    // Log errors after test completes
    if (logger.hasErrors()) {
      logger.logToConsole();
      logger.saveToFile();
    }
  },

  // LoginPage fixture
  loginPage: async ({ page, errorLogger }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // ProjectsPage fixture
  projectsPage: async ({ page, errorLogger }, use) => {
    const projectsPage = new ProjectsPage(page);
    await use(projectsPage);
  },

  // Authenticated session fixture
  authenticatedPage: async ({ page, errorLogger }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      TEST_CREDENTIALS.valid.email,
      TEST_CREDENTIALS.valid.password
    );
    await page.waitForTimeout(2000); // Wait for login to complete
    await use();
  },
});

export { expect } from '@playwright/test';


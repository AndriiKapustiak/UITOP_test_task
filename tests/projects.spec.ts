import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { TEST_CREDENTIALS } from '../utils/test-data';

test.describe('Projects', () => {
  let loginPage: LoginPage;
  let projectsPage: ProjectsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    projectsPage = new ProjectsPage(page);
    await loginPage.goto();
    await loginPage.openLoginModal();
    await loginPage.login(TEST_CREDENTIALS.valid.email, TEST_CREDENTIALS.valid.password);
    await page.waitForTimeout(2000);
    await projectsPage.navigateToProjects();
  });

  test('TC-PROJ-001: Navigate to Projects page', async ({ page }) => {
    await expect(projectsPage.projectsMenuItem).toBeVisible();
    expect(page.url()).toContain('project');
  });

  test('TC-PROJ-002: Display project creation form', async () => {
    await projectsPage.clickCreateProject();
    const isFormVisible = await projectsPage.isCreateProjectFormVisible();
    expect(isFormVisible).toBeTruthy();
    await expect(projectsPage.projectNameInput).toBeVisible();
  });

  test('TC-PROJ-003: Fill project name', async () => {
    const projectName = `Test Project ${Date.now()}`;
    await projectsPage.clickCreateProject();
    await projectsPage.fillProjectName(projectName);
    const value = await projectsPage.projectNameInput.inputValue();
    expect(value).toBe(projectName);
  });

  test('TC-PROJ-004: Empty name disables submit', async () => {
    await projectsPage.clickCreateProject();
    await expect(projectsPage.createProjectSubmitButton).toBeDisabled();
  });

  test('TC-PROJ-005: Cancel project creation', async ({ page }) => {
    const projectName = `Canceled ${Date.now()}`;
    await projectsPage.clickCreateProject();
    await projectsPage.fillProjectName(projectName);
    await projectsPage.cancelProjectCreation();
    await page.waitForTimeout(1000);
    const isVisible = await projectsPage.isProjectVisible(projectName);
    expect(isVisible).toBeFalsy();
  });
});


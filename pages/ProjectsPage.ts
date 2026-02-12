import { Page, Locator, expect } from '@playwright/test';
import { Helpers } from '../utils/helpers';

export class ProjectsPage {
  readonly page: Page;
  readonly projectsMenuItem: Locator;
  readonly createProjectButton: Locator;
  readonly projectNameInput: Locator;
  readonly jurisdictionSelect: Locator;
  readonly addressInput: Locator;
  readonly unitApartmentInput: Locator;
  readonly createProjectSubmitButton: Locator;
  readonly cancelButton: Locator;
  readonly projectsList: Locator;
  readonly projectCard: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly customProjectInfo: Locator;
  readonly exploreProjectTemplatesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selectors based on actual page structure
    // Use nav link specifically to avoid homepage card
    this.projectsMenuItem = page.locator('nav a:has-text("Projects")').first();
    this.createProjectButton = page.locator('a[href="/projects/new"]');
    this.projectNameInput = page.locator('input[name="project[name]"]');
    this.jurisdictionSelect = page.locator('#project_jurisdiction_id-ts-control');
    this.addressInput = page.locator('input[name="address"]');
    this.unitApartmentInput = page.locator('input[name="unit_number"]');
    this.createProjectSubmitButton = page.locator('input[type="submit"][value="Create Project"]');
    this.cancelButton = page.locator('a:has-text("Cancel")');
    this.projectsList = page.locator('.projects-list, [data-testid="projects-list"], .project-grid');
    this.projectCard = page.locator('.project-card, [data-testid="project-card"], .project-item');
    this.errorMessage = page.locator('#flash div.bg-red-500, #flash .bg-red-500');
    this.successMessage = page.locator('#flash div.bg-green-500, #flash .bg-green-500, .success, .success-message');
    this.customProjectInfo = page.locator('text=Custom Project Info');
    this.exploreProjectTemplatesButton = page.locator('a[href="/project_templates"]');
  }

  async navigateToProjects() {
    // Check viewport size to determine if we're on mobile
    const viewport = this.page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      // Mobile: Click the Projects card on homepage
      const projectsCard = this.page.locator('a[href="/projects"].homepage-card, a[href="/projects"]:has-text("Work within project space")').first();
      await projectsCard.click();
    } else {
      // Desktop: Click sidebar link
      await this.projectsMenuItem.click();
    }

    await Helpers.waitForPageLoad(this.page);
  }

  async clickCreateProject() {
    await this.createProjectButton.click();
    await this.page.waitForTimeout(500); // Wait for form to load
  }

  async fillProjectName(name: string) {
    await this.projectNameInput.fill(name);
  }

  async fillAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async fillUnitApartment(unit: string) {
    await this.unitApartmentInput.fill(unit);
  }

  async selectJurisdiction(jurisdictionName: string) {
    // Click to open dropdown
    await this.jurisdictionSelect.click();
    // Wait for dropdown to appear and click the option
    await this.page.locator(`.ts-dropdown .option:has-text("${jurisdictionName}")`).click();
  }

  async submitCreateProject() {
    await this.createProjectSubmitButton.click();
  }

  async createProject(name: string, address?: string) {
    await this.clickCreateProject();
    await this.fillProjectName(name);
    if (address) {
      await this.fillAddress(address);
    }
    // Wait for submit button to be enabled (form validation)
    await this.createProjectSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(1000); // Wait for any validation to complete
    await this.submitCreateProject();
  }

  async isProjectVisible(projectName: string): Promise<boolean> {
    try {
      const project = this.page.locator(`text="${projectName}"`);
      await project.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getProjectsCount(): Promise<number> {
    await this.projectCard.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    return await this.projectCard.count();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.textContent() || '';
  }

  async getSuccessMessage(): Promise<string> {
    await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.successMessage.textContent() || '';
  }

  async cancelProjectCreation() {
    // Use force click to bypass cookie consent overlay
    await this.cancelButton.click({ force: true });
  }

  async isCreateProjectFormVisible(): Promise<boolean> {
    try {
      await this.projectNameInput.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}


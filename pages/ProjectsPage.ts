import { Page, Locator } from '@playwright/test';
import { Helpers } from '../utils/helpers';

export class ProjectsPage {
  readonly page: Page;
  readonly projectsMenuItem: Locator;
  readonly createProjectButton: Locator;
  readonly projectNameInput: Locator;
  readonly addressInput: Locator;
  readonly unitApartmentInput: Locator;
  readonly createProjectSubmitButton: Locator;
  readonly cancelButton: Locator;
  readonly customProjectInfo: Locator;
  readonly exploreProjectTemplatesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectsMenuItem = page.locator('nav a:has-text("Projects")').first();
    this.createProjectButton = page.locator('a[href="/projects/new"]');
    this.projectNameInput = page.locator('input[name="project[name]"]');
    this.addressInput = page.locator('input[name="address"]');
    this.unitApartmentInput = page.locator('input[name="unit_number"]');
    this.createProjectSubmitButton = page.locator('input[type="submit"][value="Create Project"]');
    this.cancelButton = page.locator('a:has-text("Cancel")');
    this.customProjectInfo = page.locator('text=Custom Project Info');
    this.exploreProjectTemplatesButton = page.locator('a[href="/project_templates"]');
  }

  async navigateToProjects() {
    const viewport = this.page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      const projectsCard = this.page.locator('a[href="/projects"].homepage-card, a[href="/projects"]:has-text("Work within project space")').first();
      await projectsCard.click();
    } else {
      await this.projectsMenuItem.click();
    }

    await Helpers.waitForPageLoad(this.page);
  }

  async clickCreateProject() {
    await this.createProjectButton.click();
    await this.page.waitForTimeout(500);
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

  async createProject(name: string, address?: string) {
    await this.clickCreateProject();
    await this.fillProjectName(name);
    if (address) {
      await this.fillAddress(address);
    }
    await this.createProjectSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(1000);
    await this.createProjectSubmitButton.click();
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

  async cancelProjectCreation() {
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


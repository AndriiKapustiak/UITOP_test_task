import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export interface ConsoleError {
  type: string;
  text: string;
  url: string;
  timestamp: string;
}

export interface NetworkError {
  url: string;
  status: number;
  statusText: string;
  method: string;
  timestamp: string;
}

export class ErrorLogger {
  private consoleErrors: ConsoleError[] = [];
  private networkErrors: NetworkError[] = [];
  private page: Page;
  private testName: string;

  constructor(page: Page, testName: string) {
    this.page = page;
    this.testName = testName;
    this.setupListeners();
  }

  private setupListeners() {
    // Listen for console errors
    this.page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        this.consoleErrors.push({
          type: msg.type(),
          text: msg.text(),
          url: this.page.url(),
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Listen for page errors
    this.page.on('pageerror', (error) => {
      this.consoleErrors.push({
        type: 'pageerror',
        text: error.message,
        url: this.page.url(),
        timestamp: new Date().toISOString(),
      });
    });

    // Listen for failed network requests
    this.page.on('response', (response) => {
      if (response.status() >= 400) {
        this.networkErrors.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          method: response.request().method(),
          timestamp: new Date().toISOString(),
        });
      }
    });
  }

  getConsoleErrors(): ConsoleError[] {
    return this.consoleErrors;
  }

  getNetworkErrors(): NetworkError[] {
    return this.networkErrors;
  }

  hasErrors(): boolean {
    return this.consoleErrors.length > 0 || this.networkErrors.length > 0;
  }

  getErrorSummary(): string {
    let summary = `\n=== Error Summary for: ${this.testName} ===\n`;
    
    if (this.consoleErrors.length > 0) {
      summary += `\nConsole Errors (${this.consoleErrors.length}):\n`;
      this.consoleErrors.forEach((error, index) => {
        summary += `  ${index + 1}. [${error.type}] ${error.text}\n`;
        summary += `     URL: ${error.url}\n`;
        summary += `     Time: ${error.timestamp}\n`;
      });
    }

    if (this.networkErrors.length > 0) {
      summary += `\nNetwork Errors (${this.networkErrors.length}):\n`;
      this.networkErrors.forEach((error, index) => {
        summary += `  ${index + 1}. ${error.method} ${error.url}\n`;
        summary += `     Status: ${error.status} ${error.statusText}\n`;
        summary += `     Time: ${error.timestamp}\n`;
      });
    }

    if (!this.hasErrors()) {
      summary += '\nNo errors detected! ✅\n';
    }

    return summary;
  }

  saveToFile(outputDir: string = 'test-results/error-logs') {
    if (!this.hasErrors()) {
      return;
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTestName = this.testName.replace(/[^a-z0-9]/gi, '_');
    const filename = `${sanitizedTestName}_${timestamp}.json`;
    const filepath = path.join(outputDir, filename);

    const errorData = {
      testName: this.testName,
      timestamp: new Date().toISOString(),
      consoleErrors: this.consoleErrors,
      networkErrors: this.networkErrors,
    };

    fs.writeFileSync(filepath, JSON.stringify(errorData, null, 2));
    console.log(`Error log saved to: ${filepath}`);
  }

  logToConsole() {
    if (this.hasErrors()) {
      console.log(this.getErrorSummary());
    }
  }

  clear() {
    this.consoleErrors = [];
    this.networkErrors = [];
  }
}


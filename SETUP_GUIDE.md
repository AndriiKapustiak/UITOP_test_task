# Setup Guide

This guide will help you set up and run the Alynea Playwright test suite.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` - Playwright test framework
- `@types/node` - TypeScript type definitions for Node.js
- `typescript` - TypeScript compiler

### 2. Install Playwright Browsers

```bash
npx playwright install
```

This downloads the browser binaries for Chromium, Firefox, and WebKit.

### 3. Verify Installation

```bash
npx playwright --version
```

You should see the Playwright version number.

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run all tests with UI mode (recommended for development)
npm run test:ui

# Run tests in headed mode (see the browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

### Run Specific Test Suites

```bash
# Authentication tests (20 tests)
npm run test:auth

# Projects tests (12 tests)
npm run test:projects

# API tests (14 tests)
npm run test:api

# Mobile device tests (6 tests)
npm run test:mobile
```

### Run Tests in Specific Browsers

```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit only
npm run test:webkit
```

### View Test Reports

```bash
# Show HTML report
npm run test:report
```

The report will open in your default browser showing:
- Test results
- Screenshots (on failure)
- Videos (on failure)
- Traces (on retry)

## Test Environment

The tests run against the staging environment by default:
- **URL**: https://staging-stack.alynea.io
- **Credentials**: bacos38210@aixind.com / 123123

To change the environment, modify `playwright.config.ts` or use the environment configuration in `config/environments.ts`.

## Troubleshooting

### Tests are failing

1. **Check browser installation**:
   ```bash
   npx playwright install
   ```

2. **Clear test artifacts**:
   ```bash
   Remove-Item -Recurse -Force test-results, playwright-report
   ```

3. **Run in headed mode to see what's happening**:
   ```bash
   npm run test:headed
   ```

### Import errors

Make sure all dependencies are installed:
```bash
npm install
```

### TypeScript errors

Check your TypeScript configuration:
```bash
npx tsc --noEmit
```

## Next Steps

1. **Explore the tests**: Check out the test files in `tests/` folder
2. **Read the documentation**: See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. **Write your own tests**: Follow the patterns in existing test files
4. **Use fixtures**: Leverage `fixtures/auth.fixture.ts` for authenticated tests

## Useful Commands

```bash
# Generate test code by recording actions
npm run test:codegen

# Run a specific test file
npx playwright test tests/auth.spec.ts

# Run tests matching a pattern
npx playwright test -g "login"

# Update snapshots (if using visual regression)
npx playwright test --update-snapshots
```

## CI/CD

The project includes a GitHub Actions workflow. Tests will run automatically on:
- Push to main branch
- Pull requests

See `.github/workflows/playwright.yml` for configuration.

## Support

For more information:
- [Playwright Documentation](https://playwright.dev)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Test Documentation](./TEST_DOCUMENTATION.md)


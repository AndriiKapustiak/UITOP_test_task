# Alynea Playwright Test Suite

[![Playwright Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright-tests.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright-tests.yml)
[![Test Report](https://img.shields.io/badge/Test%20Report-GitHub%20Pages-blue)](https://YOUR_USERNAME.github.io/YOUR_REPO/)

E2E testing suite for Alynea platform using Playwright with TypeScript.

## Test Coverage

**17 Essential Tests**

| Test Suite | Tests | Coverage |
|------------|-------|----------|
| Authentication | 4 | Login, form display, error handling |
| Validation | 4 | Email/password validation |
| Projects | 5 | Navigation, creation, validation |
| Mobile | 4 | iPhone 13, Pixel 5, iPad Pro |
| API | 4 | Products, search, validation |

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- Docker (optional)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npx playwright install
```

### Running Tests

```bash
npm test
npm run test:auth
npm run test:projects
npm run test:api
npm run test:mobile

npm run test:chromium
npm run test:firefox
npm run test:webkit

npm run test:ui
npm run test:report
```

### Docker

```bash
docker-compose up playwright-tests
docker-compose up playwright-chromium
docker-compose up playwright-firefox
docker-compose up playwright-webkit
```

## Project Structure

```
test_task/
├── config/
│   └── environments.ts
├── fixtures/
│   └── auth.fixture.ts
├── pages/
│   ├── LoginPage.ts
│   └── ProjectsPage.ts
├── tests/
│   ├── api.spec.ts
│   ├── auth.spec.ts
│   ├── auth-validation.spec.ts
│   ├── mobile.spec.ts
│   └── projects.spec.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   ├── test-data.ts
│   └── error-logger.ts
├── docs/
│   ├── BUGS.md
│   ├── TEST_CASES.md
│   └── TEST_SUMMARY.md
├── .github/workflows/
│   └── playwright-tests.yml
├── Dockerfile
├── docker-compose.yml
└── playwright.config.ts
```

## Configuration

**Base URL**: `https://staging-stack.alynea.io`
**API URL**: `https://automationexercise.com/api`
**Credentials**: `bacos38210@aixind.com` / `123123`

**Browsers**: Chromium, Firefox, WebKit
**Mobile**: iPhone 13, Pixel 5, iPad Pro

## Features

- Page Object Model
- Custom Fixtures
- Multi-browser (Chromium, Firefox, WebKit)
- Mobile Testing (iPhone 13, Pixel 5, iPad Pro)
- API Testing
- Error Logging (console + network)
- Parallel Execution
- Docker Support
- CI/CD (GitHub Actions)
- GitHub Pages Reports

## Documentation

- [Setup Guide](./SETUP_GUIDE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Test Cases](./docs/TEST_CASES.md)
- [Bug Reports](./docs/BUGS.md)
- [Test Summary](./docs/TEST_SUMMARY.md)

## CI/CD

**Triggers**: Push to main/develop, Pull Requests, Manual, Daily (2 AM UTC)

**Execution**:
- Tests run on Chromium, Firefox, WebKit (parallel)
- Generates HTML reports
- Captures screenshots/videos on failure
- Logs console and network errors

**Reports**: Published to GitHub Pages at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Error Logging

Automatic logging of:
- Console errors (JavaScript errors, warnings)
- Network errors (4xx, 5xx)
- Page errors (uncaught exceptions)

Logs saved to: `test-results/error-logs/`

## License

ISC


# Project Structure

This document describes the organization of the Alynea Playwright test automation project.

## Directory Structure

```
test_task/
├── config/                 # Configuration files
├── fixtures/              # Test fixtures and custom test extensions
│   └── auth.fixture.ts   # Authentication fixtures
├── pages/                 # Page Object Models (POM)
│   ├── LoginPage.ts      # Login page object
│   └── ProjectsPage.ts   # Projects page object
├── tests/                 # Test specifications
│   ├── api.spec.ts       # API tests
│   ├── auth.spec.ts      # Authentication tests
│   ├── auth-validation.spec.ts  # Auth field validation tests
│   ├── mobile.spec.ts    # Mobile device tests
│   └── projects.spec.ts  # Projects functionality tests
├── utils/                 # Utility functions and test data
│   ├── helpers.ts        # Helper functions
│   └── test-data.ts      # Test data constants
├── .gitignore            # Git ignore rules
├── package.json          # NPM dependencies and scripts
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Folder Descriptions

### `/config`
Contains configuration files for different environments or test settings.

### `/fixtures`
Custom Playwright fixtures that extend the base test functionality:
- **auth.fixture.ts**: Provides authenticated sessions and page object fixtures

### `/pages`
Page Object Models following the POM design pattern:
- **LoginPage.ts**: Encapsulates login page elements and actions
- **ProjectsPage.ts**: Encapsulates projects page elements and actions

### `/tests`
Test specification files organized by feature:
- **api.spec.ts**: API integration tests (14 tests)
- **auth.spec.ts**: Authentication flow tests (10 tests)
- **auth-validation.spec.ts**: Field validation tests (10 tests)
- **mobile.spec.ts**: Mobile responsive tests (6 tests)
- **projects.spec.ts**: Project management tests (12 tests)

### `/utils`
Shared utilities and test data:
- **helpers.ts**: Common helper functions (page load, random data generation, screenshots)
- **test-data.ts**: Test credentials and data constants

## Design Patterns

### Page Object Model (POM)
All page interactions are encapsulated in page classes located in `/pages`. This provides:
- Better maintainability
- Reusable page actions
- Clear separation of test logic and page structure

### Fixtures
Custom fixtures in `/fixtures` provide:
- Pre-configured page objects
- Authenticated test sessions
- Reduced boilerplate code in tests

## Best Practices

1. **Keep tests in `/tests`**: All `.spec.ts` files should be in the tests folder
2. **One page = One class**: Each page should have its own Page Object class
3. **Reusable utilities**: Common functions go in `/utils/helpers.ts`
4. **Test data separation**: Keep test data in `/utils/test-data.ts`
5. **Use fixtures**: Leverage fixtures for common setup tasks

## Adding New Tests

1. Create a new `.spec.ts` file in `/tests`
2. Import required page objects from `/pages`
3. Import test data from `/utils/test-data.ts`
4. Use fixtures from `/fixtures` if needed
5. Follow existing naming conventions (TC-XXX-NNN)

## Adding New Pages

1. Create a new page class in `/pages`
2. Extend with locators and methods
3. Export the class
4. Import in test files as needed


# Test Documentation

## Test Environment

- **URL:** https://staging-stack.alynea.io/
- **Credentials:** bacos38210@aixind.com / 123123
- **API:** https://automationexercise.com/api

---

## Task 1: Authentication & Projects Tests

### Authentication Tests (auth.spec.ts)

**Positive:**
- TC-AUTH-001: Valid login
- TC-AUTH-002: Form elements display
- TC-AUTH-003: Password field security

**Negative:**
- TC-AUTH-004: Invalid email
- TC-AUTH-005: Invalid password
- TC-AUTH-006: Both invalid
- TC-AUTH-007: Empty email
- TC-AUTH-008: Empty password
- TC-AUTH-009: Empty form

### Field Validation (auth-validation.spec.ts)

**Email Validation:**
- TC-VAL-001: Missing @
- TC-VAL-002: Missing domain
- TC-VAL-003: Special characters
- TC-VAL-004: Spaces in email
- TC-VAL-005: Whitespace trimming

**Password & Form:**
- TC-VAL-006: Min length
- TC-VAL-007: Max length
- TC-VAL-008: Special chars
- TC-VAL-009: Error clearing
- TC-VAL-010: Rapid submissions

### Projects Tests (projects.spec.ts)

**Navigation:**
- TC-PROJ-001: Navigate to Projects
- TC-PROJ-002: Create button display

**Creation - Positive:**
- TC-PROJ-003: Required fields only
- TC-PROJ-004: All fields
- TC-PROJ-005: Multiple projects
- TC-PROJ-006: Special characters

**Creation - Negative:**
- TC-PROJ-007: Empty name
- TC-PROJ-008: Long name
- TC-PROJ-009: Cancel creation
- TC-PROJ-010: Duplicate names

**Display:**
- TC-PROJ-011: Projects list
- TC-PROJ-012: Project cards

### Mobile Tests (mobile.spec.ts)

**iPhone 13:**
- TC-MOB-001: Login
- TC-MOB-002: Create project

**Pixel 5:**
- TC-MOB-003: Login
- TC-MOB-004: Form validation

**iPad Pro:**
- TC-MOB-005: Login
- TC-MOB-006: Projects

---

## Task 2: API Testing (api.spec.ts)

### Positive Tests

| Test ID | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| TC-API-001 | GET | /productsList | Get all products |
| TC-API-003 | GET | /brandsList | Get all brands |
| TC-API-005 | POST | /searchProduct | Search products |
| TC-API-007 | POST | /verifyLogin | Verify login |
| TC-API-010 | POST | /createAccount | Create account |

### Negative Tests

| Test ID | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| TC-API-002 | POST | /productsList | Wrong method (405) |
| TC-API-004 | PUT | /brandsList | Wrong method (405) |
| TC-API-006 | POST | /searchProduct | Missing parameter (400) |
| TC-API-008 | POST | /verifyLogin | Missing email (400) |
| TC-API-009 | DELETE | /verifyLogin | Wrong method (405) |
| TC-API-011 | GET | /invalidEndpoint | Invalid endpoint |
| TC-API-012 | POST | /searchProduct | Invalid data |

### E2E Tests

- TC-API-013: Search product flow
- TC-API-014: Verify brands accessible

---

## Running Tests

```bash
# All tests
npm test

# Specific suites
npm run test:auth
npm run test:projects
npm run test:api
npm run test:mobile

# By browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# View report
npm run test:report
```

---

## CI/CD

GitHub Actions workflow runs on:
- Push to main/master/develop
- Pull requests
- Daily at 2 AM UTC
- Manual trigger

---

## Total: 52 Test Cases

- Authentication: 10
- Validation: 10
- Projects: 12
- Mobile: 6
- API: 14


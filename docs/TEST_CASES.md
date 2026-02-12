# Test Cases Documentation

## Overview
This document describes all test cases implemented for the Alynea Playwright testing project.

---

## 1. Authentication Tests (`tests/auth.spec.ts`)

### Positive Scenarios

#### TC-AUTH-001: Successful Login with Valid Credentials
- **Objective**: Verify that users can successfully log in with valid credentials
- **Preconditions**: User has valid email and password
- **Steps**:
  1. Navigate to the application homepage
  2. Click "Log In" button to open login modal
  3. Enter valid email address
  4. Enter valid password
  5. Click "Sign In" button
- **Expected Result**: User is successfully logged in and redirected to the dashboard
- **Status**: ✅ Passing

#### TC-AUTH-002: Display Login Form Elements
- **Objective**: Verify all login form elements are displayed correctly
- **Steps**:
  1. Navigate to homepage
  2. Open login modal
- **Expected Result**: Email input, password input, and sign-in button are visible
- **Status**: ✅ Passing

#### TC-AUTH-003: Password Visibility Toggle
- **Objective**: Verify password can be shown/hidden
- **Steps**:
  1. Open login modal
  2. Enter password
  3. Toggle password visibility
- **Expected Result**: Password visibility toggles between hidden and visible
- **Status**: ✅ Passing

### Negative Scenarios

#### TC-AUTH-004: Invalid Email
- **Objective**: Verify error message is shown for invalid email
- **Steps**:
  1. Open login modal
  2. Enter invalid email
  3. Enter valid password
  4. Click sign in
- **Expected Result**: Error message is displayed
- **Status**: ✅ Passing

#### TC-AUTH-005: Invalid Password
- **Objective**: Verify error message is shown for invalid password
- **Steps**:
  1. Open login modal
  2. Enter valid email
  3. Enter invalid password
  4. Click sign in
- **Expected Result**: Error message is displayed
- **Status**: ✅ Passing

#### TC-AUTH-006: Both Invalid Credentials
- **Objective**: Verify error for both invalid email and password
- **Expected Result**: Error message is displayed
- **Status**: ✅ Passing

#### TC-AUTH-007: Empty Email Field
- **Objective**: Verify validation for empty email
- **Expected Result**: Error message is displayed
- **Status**: ✅ Passing

#### TC-AUTH-008: Empty Password Field
- **Objective**: Verify validation for empty password
- **Expected Result**: Error message is displayed
- **Status**: ✅ Passing

#### TC-AUTH-009: Both Empty Fields
- **Objective**: Verify validation for both empty fields
- **Expected Result**: Error message is displayed
- **Status**: ✅ Passing

---

## 2. Authentication Validation Tests (`tests/auth-validation.spec.ts`)

### Email Field Validation

#### TC-VAL-001: Email Format - Missing @
- **Objective**: Validate email format without @ symbol
- **Test Data**: "invalidemail.com"
- **Expected Result**: Validation error
- **Status**: ✅ Passing

#### TC-VAL-002: Email Format - Missing Domain
- **Objective**: Validate email format without domain
- **Test Data**: "user@"
- **Expected Result**: Validation error
- **Status**: ✅ Passing

#### TC-VAL-003: Email Format - Special Characters
- **Objective**: Validate email with special characters
- **Test Data**: "user!#$%@example.com"
- **Expected Result**: Handled appropriately
- **Status**: ✅ Passing

#### TC-VAL-004: Email Field - Spaces
- **Objective**: Validate email with spaces
- **Test Data**: "user @example.com"
- **Expected Result**: Validation error
- **Status**: ✅ Passing

#### TC-VAL-005: Trim Whitespace from Email
- **Objective**: Verify whitespace is trimmed from email
- **Test Data**: "  user@example.com  "
- **Expected Result**: Whitespace is trimmed
- **Status**: ✅ Passing

### Password Field Validation

#### TC-VAL-006: Minimum Password Length
- **Objective**: Verify password with minimum length is accepted
- **Test Data**: "Pass123!"
- **Expected Result**: Password is accepted
- **Status**: ✅ Passing

#### TC-VAL-007: Very Long Password
- **Objective**: Verify system handles very long passwords
- **Test Data**: 100-character password
- **Expected Result**: Password is handled correctly
- **Status**: ✅ Passing

#### TC-VAL-008: Special Characters in Password
- **Objective**: Verify special characters are accepted
- **Test Data**: "P@ssw0rd!#$%"
- **Expected Result**: Password is accepted
- **Status**: ✅ Passing

### Form Behavior

#### TC-VAL-009: Clear Error on Field Edit
- **Objective**: Verify error message clears when user edits field
- **Expected Result**: Error message disappears on field edit
- **Status**: ✅ Passing

#### TC-VAL-010: Rapid Form Submissions
- **Objective**: Verify system handles rapid form submissions
- **Expected Result**: System handles multiple submissions gracefully
- **Status**: ✅ Passing

---

## 3. Projects Tests (`tests/projects.spec.ts`)

### Project Navigation

#### TC-PROJ-001: Navigate to Projects Page
- **Objective**: Verify navigation to Projects page from menu
- **Expected Result**: URL contains "project" and page loads
- **Status**: ⚠️ Intermittent (viewport detection issue)

#### TC-PROJ-002: Display Create Project Button
- **Objective**: Verify Create Project button is visible and enabled
- **Expected Result**: Button is visible and clickable
- **Status**: ✅ Passing

### Project Creation - Positive Scenarios

#### TC-PROJ-003: Display Custom Project Creation Form
- **Objective**: Verify project creation form displays correctly
- **Expected Result**: Form with all fields is visible
- **Status**: ✅ Passing

#### TC-PROJ-004: Fill Project Name Field
- **Objective**: Verify project name can be entered
- **Expected Result**: Name is entered and retained
- **Status**: ✅ Passing

#### TC-PROJ-005: Display Address Search Field
- **Objective**: Verify address field is visible and functional
- **Expected Result**: Address can be entered
- **Status**: ✅ Passing

#### TC-PROJ-006: Display Unit/Apartment Field
- **Objective**: Verify optional unit field is visible
- **Expected Result**: Field is visible and accepts input
- **Status**: ⚠️ Intermittent (login context issue)

### Project Creation - Negative Scenarios

#### TC-PROJ-007: Empty Project Name
- **Objective**: Verify submit button is disabled with empty name
- **Expected Result**: Submit button is disabled
- **Status**: ✅ Passing

#### TC-PROJ-008: Very Long Project Name
- **Objective**: Verify system handles very long project names
- **Test Data**: 500-character name
- **Expected Result**: Name is truncated or validated
- **Status**: ✅ Passing

#### TC-PROJ-009: Cancel Project Creation
- **Objective**: Verify project creation can be canceled
- **Expected Result**: Form closes without creating project
- **Status**: ✅ Passing

#### TC-PROJ-010: Display Create Project Submit Button
- **Objective**: Verify submit button is visible in form
- **Expected Result**: Button is visible with correct text
- **Status**: ✅ Passing

### Project List Display

#### TC-PROJ-011: Display Create Custom Project Button
- **Objective**: Verify button text is correct
- **Expected Result**: Button shows "Create Custom Project"
- **Status**: ⚠️ Intermittent (login context issue)

#### TC-PROJ-012: Display Explore Project Templates Button
- **Objective**: Verify templates button is visible
- **Expected Result**: Button is visible and links to templates
- **Status**: ✅ Passing

---

## 4. Mobile Tests (`tests/mobile.spec.ts`)

### iPhone 13 Tests

#### TC-MOB-001: Login on iPhone 13
- **Objective**: Verify login works on iPhone 13
- **Device**: iPhone 13 (390x844)
- **Expected Result**: Successful login via mobile menu
- **Status**: ✅ Passing

#### TC-MOB-002: Create Project on iPhone 13
- **Objective**: Verify project creation on mobile
- **Device**: iPhone 13
- **Expected Result**: Project is created successfully
- **Status**: ❌ Failing (form validation issue)

### Pixel 5 Tests

#### TC-MOB-003: Login on Pixel 5
- **Objective**: Verify login works on Pixel 5
- **Device**: Pixel 5 (393x851)
- **Expected Result**: Successful login
- **Status**: ✅ Passing

#### TC-MOB-004: Form Validation on Pixel 5
- **Objective**: Verify form validation on mobile
- **Device**: Pixel 5
- **Expected Result**: Validation works correctly
- **Status**: ✅ Passing

### iPad Pro Tests

#### TC-MOB-005: Login on iPad Pro
- **Objective**: Verify login works on iPad Pro
- **Device**: iPad Pro (1024x1366)
- **Expected Result**: Successful login
- **Status**: ✅ Passing

#### TC-MOB-006: Create and View Projects on iPad Pro
- **Objective**: Verify project creation on tablet
- **Device**: iPad Pro
- **Expected Result**: Project is created and visible
- **Status**: ❌ Failing (form validation issue)

---

## 5. API Tests (`tests/api.spec.ts`)

### Positive Tests

#### TC-API-001: GET All Products List
- **Endpoint**: GET /api/productsList
- **Expected**: 200 status, products array
- **Status**: ✅ Passing

#### TC-API-003: GET All Brands List
- **Endpoint**: GET /api/brandsList
- **Expected**: 200 status, brands array
- **Status**: ✅ Passing

#### TC-API-005: POST Search Product
- **Endpoint**: POST /api/searchProduct
- **Expected**: Matching products returned
- **Status**: ✅ Passing

#### TC-API-007: POST Verify Login
- **Endpoint**: POST /api/verifyLogin
- **Expected**: Success response
- **Status**: ✅ Passing

#### TC-API-010: POST Create User Account
- **Endpoint**: POST /api/createAccount
- **Expected**: Account creation handled
- **Status**: ✅ Passing

### Negative Tests

#### TC-API-002: POST to Products List (Invalid Method)
- **Expected**: 405 Method Not Allowed
- **Status**: ✅ Passing

#### TC-API-004: PUT to Brands List (Invalid Method)
- **Expected**: 405 Method Not Allowed
- **Status**: ✅ Passing

#### TC-API-006: POST Search Without Parameter
- **Expected**: 400 Bad Request
- **Status**: ✅ Passing

#### TC-API-008: POST Login Without Email
- **Expected**: 400 Bad Request
- **Status**: ✅ Passing

#### TC-API-009: DELETE to Verify Login (Invalid Method)
- **Expected**: 405 Method Not Allowed
- **Status**: ✅ Passing

#### TC-API-011: GET Invalid Endpoint
- **Expected**: 404 Not Found
- **Status**: ✅ Passing

#### TC-API-012: POST Search with Invalid Data
- **Expected**: Handled gracefully
- **Status**: ✅ Passing

### E2E Scenarios

#### TC-API-013: Search Product and Verify Structure
- **Objective**: End-to-end product search flow
- **Status**: ✅ Passing

#### TC-API-014: Verify All Brands Accessible
- **Objective**: End-to-end brands verification
- **Status**: ✅ Passing

---

## Test Execution Summary

| Test Suite | Total | Passing | Failing | Pass Rate |
|------------|-------|---------|---------|-----------|
| Authentication | 9 | 9 | 0 | 100% |
| Auth Validation | 10 | 10 | 0 | 100% |
| Projects | 12 | 10 | 2 | 83.3% |
| Mobile | 6 | 4 | 2 | 66.7% |
| API | 14 | 14 | 0 | 100% |
| **Total** | **51** | **47** | **4** | **92.2%** |

---

## Browser Compatibility

All tests are executed across:
- ✅ Chromium (Desktop Chrome)
- ✅ Firefox (Desktop Firefox)
- ✅ WebKit (Desktop Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 13)
- ✅ Mobile Tablet (iPad Pro)


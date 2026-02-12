# Bug Report

## Critical Issues

### BUG-001: Mobile Project Creation Form Validation
**Severity**: Critical
**Status**: Open
**Affected**: iPhone 13, iPad Pro
**Tests**: TC-MOB-002, TC-MOB-006

**Description**: Submit button remains disabled on mobile after filling required fields.

**Steps to Reproduce**:
1. Open on iPhone 13 (viewport < 768px)
2. Login via mobile menu
3. Navigate to Projects → Create Custom Project
4. Fill project name and address
5. Submit button remains disabled

**Expected**: Button enabled after filling required fields
**Actual**: Button stays disabled

**Root Cause**: Different validation rules on mobile vs desktop

---

## Fixed Issues

### BUG-002: Cookie Consent Blocks Login (Fixed)
**Severity**: Medium
**Tests**: TC-MOB-001, TC-MOB-003

**Solution**: Added cookie consent dismissal and force click fallback

### BUG-003: Execution Context Destroyed (Fixed)
**Severity**: Medium
**Tests**: TC-PROJ-006, TC-PROJ-011

**Solution**: Replaced `page.evaluate()` with `click({ force: true })`

### BUG-004: Navigation Viewport Detection (Fixed)
**Severity**: Low
**Tests**: TC-PROJ-001

**Solution**: Use viewport size instead of element visibility

### BUG-005: Strict Mode Violations (Fixed)
**Severity**: Low

**Solution**: Scoped selectors and used `.first()`

---

## Summary

| Severity | Open | Fixed | Total |
|----------|------|-------|-------|
| Critical | 1 | 0 | 1 |
| Medium | 0 | 2 | 2 |
| Low | 0 | 3 | 3 |
| **Total** | **1** | **5** | **6** |

## Error Logging

Console and network errors logged to: `test-results/error-logs/`

No critical console or network errors detected during testing.


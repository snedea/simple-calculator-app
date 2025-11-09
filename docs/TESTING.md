# Testing Documentation

## Test Overview

The calculator app has comprehensive test coverage across two levels:

1. **Unit Tests** - Test calculation logic in isolation
2. **E2E Tests** - Test full user workflows in real browser

**Total Tests:** 42 (16 unit + 26 E2E)
**Success Rate:** 100%

## Running Tests

### All Tests

```bash
npm test && npm run test:e2e
```

### Unit Tests Only

```bash
npm test
```

### E2E Tests Only

```bash
npm run test:e2e
```

### Watch Mode (Development)

```bash
npm test -- --watch
```

## Unit Tests

**File:** `tests/calculator.test.js`
**Framework:** Jest
**Coverage:** 100% of `js/calculator.js`

### Test Categories

#### Addition Tests
```javascript
✓ should add two positive numbers (2 + 3 = 5)
✓ should add negative numbers (-5 + 3 = -2)
✓ should handle floating point precision (0.1 + 0.2 = 0.3)
```

#### Subtraction Tests
```javascript
✓ should subtract two positive numbers (10 - 4 = 6)
✓ should subtract negative numbers (-5 - -3 = -2)
✓ should handle floating point precision (0.3 - 0.1 = 0.2)
```

#### Multiplication Tests
```javascript
✓ should multiply two positive numbers (7 × 8 = 56)
✓ should multiply by zero (5 × 0 = 0)
✓ should multiply negative numbers (-3 × 4 = -12)
✓ should handle decimal multiplication (3.14 × 2 = 6.28)
```

#### Division Tests
```javascript
✓ should divide two positive numbers (20 ÷ 5 = 4)
✓ should throw error on division by zero
✓ should handle decimal division (10 ÷ 3 = 3.333...)
✓ should divide negative numbers (-20 ÷ 4 = -5)
```

#### Validation Tests
```javascript
✓ should validate valid numbers ('123', '3.14', '-5')
✓ should reject invalid numbers ('abc', '')
```

### Running Specific Unit Tests

```bash
# Run only addition tests
npm test -- -t "add"

# Run only division tests
npm test -- -t "divide"
```

## E2E Tests

**Files:** `tests/e2e.spec.js`, `tests/e2e/calculator.spec.js`
**Framework:** Playwright
**Browser:** Chromium (Desktop Chrome)

### Test Categories

#### Page Load Tests
```javascript
✓ should load the page and display initial state
✓ buttons are visible and clickable
✓ has no console errors during operation
```

#### Basic Operation Tests
```javascript
✓ should perform basic addition (5 + 3 = 8)
✓ should perform basic subtraction (10 - 4 = 6)
✓ should perform multiplication (7 × 8 = 56)
✓ should perform division (20 ÷ 5 = 4)
```

#### Advanced Feature Tests
```javascript
✓ should handle decimal numbers (3.14 × 2 = 6.28)
✓ should chain operations (5 + 3 + 2 = 10)
✓ should prevent multiple decimal points
```

#### Error Handling Tests
```javascript
✓ should handle division by zero (displays "Error")
```

#### Keyboard Input Tests
```javascript
✓ should support keyboard input (8*7= via keyboard)
✓ handles keyboard input for numbers (0-9)
✓ handles keyboard input for operations (+, -, *, /)
✓ clears with Escape key
✓ deletes with Backspace key
```

#### UI Control Tests
```javascript
✓ should handle clear button (C resets to 0)
✓ clears calculator with C button
```

### Running Specific E2E Tests

```bash
# Run only addition tests
npm run test:e2e -- -g "addition"

# Run only keyboard tests
npm run test:e2e -- -g "keyboard"

# Run with headed browser (see the tests run)
npm run test:e2e -- --headed
```

## Test Results

### Latest Test Run

**Date:** 2025-01-13
**Iteration:** 2 (1 fix applied)
**Result:** ✅ ALL PASSED

```
Unit Tests:  16/16 passed (100%)
E2E Tests:   26/26 passed (100%)
Duration:    ~3.5 seconds total
```

### Issues Found and Fixed

#### Iteration 1 - Operation Chaining Bug

**Issue:** Chained operations not calculating intermediate results
**Test Failed:** `should chain operations` (5 + 3 + 2 showed "5" instead of "10")
**Root Cause:** Logic bug in `handleOperator` function
**Fix Applied:** Removed `shouldResetDisplay` check, always calculate intermediate results
**Verification:** All 26 E2E tests now pass

## Adding New Tests

### Adding a Unit Test

Edit `tests/calculator.test.js`:

```javascript
test('should handle your new test case', () => {
  expect(Calculator.yourFunction(input)).toBe(expected);
});
```

### Adding an E2E Test

Edit `tests/e2e.spec.js`:

```javascript
test('should test new feature', async ({ page }) => {
  await page.goto('/');
  
  // Interact with the app
  await page.click('#btn-5');
  
  // Assert result
  const display = page.locator('#display');
  await expect(display).toHaveText('5');
});
```

## Test Success Criteria

Tests are considered passing when:

✅ All unit tests pass (16/16)
✅ All E2E tests pass (26/26)
✅ No console errors in browser
✅ Calculator functions correctly for all operations
✅ Error handling works properly
✅ Keyboard input works
✅ UI updates correctly

## Continuous Integration

To run tests in CI/CD:

```bash
# Install dependencies
npm ci

# Run unit tests
npm test

# Install browser
npx playwright install --with-deps chromium

# Run E2E tests
npm run test:e2e
```

## Test Coverage

```
File              | Coverage
------------------|----------
calculator.js     | 100%
app.js            | ~85% (UI logic, some branches)
```

To generate coverage report:

```bash
npm test -- --coverage
```

## Debugging Failed Tests

### Unit Test Failures

1. Check test output for specific assertion that failed
2. Run test in isolation: `npm test -- -t "test name"`
3. Add `console.log` in test or source code
4. Check if calculator.js logic is correct

### E2E Test Failures

1. Run with headed browser: `npm run test:e2e -- --headed`
2. Check Playwright trace: `npx playwright show-trace test-results/...`
3. View test artifacts in `test-results/` directory
4. Check if dev server is running properly

### Common Issues

**Issue:** E2E tests timeout
**Solution:** Ensure http-server is not already running on port 8080

**Issue:** Screenshots missing in reports
**Solution:** Tests generate screenshots automatically in `test-results/`

**Issue:** Tests pass locally but fail in CI
**Solution:** Install Playwright with dependencies: `npx playwright install --with-deps`

## Performance

### Test Execution Time

- Unit tests: ~0.1 seconds
- E2E tests: ~3 seconds
- Total: ~3.5 seconds

### Optimization Tips

1. Run unit tests first (faster feedback)
2. Use `--headed` only when debugging
3. Run specific tests during development
4. Run full suite before committing

## Best Practices

✅ Write tests before fixing bugs (TDD)
✅ Test edge cases (zero, negative, decimals)
✅ Test error conditions (division by zero)
✅ Test user workflows, not just functions
✅ Keep tests simple and readable
✅ Use descriptive test names
✅ Verify both happy path and error path

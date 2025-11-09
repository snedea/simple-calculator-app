/**
 * End-to-end tests for Calculator app
 */

import { test, expect } from '@playwright/test';

test.describe('Calculator E2E Tests', () => {
  test('should load the page and display initial state', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Simple Calculator/);
    
    // Check display shows 0
    const display = page.locator('#display');
    await expect(display).toHaveText('0');
    
    // Check no console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(1000);
    expect(errors).toHaveLength(0);
  });

  test('should perform basic addition', async ({ page }) => {
    await page.goto('/');
    
    // Click: 5 + 3 =
    await page.click('#btn-5');
    await page.click('#btn-add');
    await page.click('#btn-3');
    await page.click('#btn-equals');
    
    // Verify result
    const display = page.locator('#display');
    await expect(display).toHaveText('8');
  });

  test('should perform basic subtraction', async ({ page }) => {
    await page.goto('/');
    
    // Click: 10 - 4 =
    await page.click('#btn-1');
    await page.click('#btn-0');
    await page.click('#btn-subtract');
    await page.click('#btn-4');
    await page.click('#btn-equals');
    
    // Verify result
    const display = page.locator('#display');
    await expect(display).toHaveText('6');
  });

  test('should perform multiplication', async ({ page }) => {
    await page.goto('/');
    
    // Click: 7 × 8 =
    await page.click('#btn-7');
    await page.click('#btn-multiply');
    await page.click('#btn-8');
    await page.click('#btn-equals');
    
    // Verify result
    const display = page.locator('#display');
    await expect(display).toHaveText('56');
  });

  test('should perform division', async ({ page }) => {
    await page.goto('/');
    
    // Click: 20 ÷ 5 =
    await page.click('#btn-2');
    await page.click('#btn-0');
    await page.click('#btn-divide');
    await page.click('#btn-5');
    await page.click('#btn-equals');
    
    // Verify result
    const display = page.locator('#display');
    await expect(display).toHaveText('4');
  });

  test('should handle decimal numbers', async ({ page }) => {
    await page.goto('/');
    
    // Click: 3.14 × 2 =
    await page.click('#btn-3');
    await page.click('#btn-decimal');
    await page.click('#btn-1');
    await page.click('#btn-4');
    await page.click('#btn-multiply');
    await page.click('#btn-2');
    await page.click('#btn-equals');
    
    // Verify result
    const display = page.locator('#display');
    await expect(display).toHaveText('6.28');
  });

  test('should handle clear button', async ({ page }) => {
    await page.goto('/');
    
    // Enter some numbers
    await page.click('#btn-5');
    await page.click('#btn-add');
    await page.click('#btn-3');
    
    // Click clear
    await page.click('#btn-clear');
    
    // Verify display reset to 0
    const display = page.locator('#display');
    await expect(display).toHaveText('0');
  });

  test('should handle division by zero', async ({ page }) => {
    await page.goto('/');
    
    // Click: 5 ÷ 0 =
    await page.click('#btn-5');
    await page.click('#btn-divide');
    await page.click('#btn-0');
    await page.click('#btn-equals');
    
    // Verify error display
    const display = page.locator('#display');
    await expect(display).toHaveText('Error');
  });

  test('should support keyboard input', async ({ page }) => {
    await page.goto('/');
    
    // Type: 8*7=
    await page.keyboard.type('8*7');
    await page.keyboard.press('Enter');
    
    // Verify result
    const display = page.locator('#display');
    await expect(display).toHaveText('56');
  });

  test('should chain operations', async ({ page }) => {
    await page.goto('/');
    
    // Click: 5 + 3 + 2 =
    await page.click('#btn-5');
    await page.click('#btn-add');
    await page.click('#btn-3');
    await page.click('#btn-add');
    await page.click('#btn-2');
    await page.click('#btn-equals');
    
    // Verify result
    const display = page.locator('#display');
    await expect(display).toHaveText('10');
  });

  test('should prevent multiple decimal points', async ({ page }) => {
    await page.goto('/');
    
    // Click: 3 . . . 5
    await page.click('#btn-3');
    await page.click('#btn-decimal');
    await page.click('#btn-decimal');
    await page.click('#btn-decimal');
    await page.click('#btn-5');
    
    // Verify only one decimal point
    const display = page.locator('#display');
    await expect(display).toHaveText('3.5');
  });
});

/**
 * End-to-End Tests for Calculator
 * Tests real browser behavior and user interactions
 */

import { test, expect } from '@playwright/test';

test.describe('Calculator E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to calculator app
        await page.goto('http://localhost:8080');

        // Wait for calculator to be visible
        await page.waitForSelector('.calculator');
    });

    test('loads calculator with initial display of 0', async ({ page }) => {
        const display = await page.textContent('#display');
        expect(display).toBe('0');
    });

    test('performs basic addition', async ({ page }) => {
        // Click: 5 + 3 =
        await page.click('#btn-5');
        await page.click('#btn-add');
        await page.click('#btn-3');
        await page.click('#btn-equals');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('8');
    });

    test('performs basic subtraction', async ({ page }) => {
        // Click: 10 - 3 =
        await page.click('#btn-1');
        await page.click('#btn-0');
        await page.click('#btn-subtract');
        await page.click('#btn-3');
        await page.click('#btn-equals');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('7');
    });

    test('performs basic multiplication', async ({ page }) => {
        // Click: 6 × 7 =
        await page.click('#btn-6');
        await page.click('#btn-multiply');
        await page.click('#btn-7');
        await page.click('#btn-equals');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('42');
    });

    test('performs basic division', async ({ page }) => {
        // Click: 15 ÷ 3 =
        await page.click('#btn-1');
        await page.click('#btn-5');
        await page.click('#btn-divide');
        await page.click('#btn-3');
        await page.click('#btn-equals');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('5');
    });

    test('handles division by zero', async ({ page }) => {
        // Click: 5 ÷ 0 =
        await page.click('#btn-5');
        await page.click('#btn-divide');
        await page.click('#btn-0');
        await page.click('#btn-equals');

        // Verify error display
        const display = await page.textContent('#display');
        expect(display).toBe('Error');
    });

    test('handles decimal numbers', async ({ page }) => {
        // Click: 1.5 + 2.3 =
        await page.click('#btn-1');
        await page.click('#btn-decimal');
        await page.click('#btn-5');
        await page.click('#btn-add');
        await page.click('#btn-2');
        await page.click('#btn-decimal');
        await page.click('#btn-3');
        await page.click('#btn-equals');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('3.8');
    });

    test('chains multiple operations', async ({ page }) => {
        // Click: 5 + 3 + 2 =
        await page.click('#btn-5');
        await page.click('#btn-add');
        await page.click('#btn-3');
        await page.click('#btn-add');
        await page.click('#btn-2');
        await page.click('#btn-equals');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('10');
    });

    test('clears calculator with C button', async ({ page }) => {
        // Enter some numbers and operation
        await page.click('#btn-5');
        await page.click('#btn-add');
        await page.click('#btn-3');

        // Click C button
        await page.click('#btn-clear');

        // Verify display reset to 0
        const display = await page.textContent('#display');
        expect(display).toBe('0');
    });

    test('handles keyboard input for numbers', async ({ page }) => {
        // Type numbers using keyboard
        await page.keyboard.type('5+3=');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('8');
    });

    test('handles keyboard input for operations', async ({ page }) => {
        // Type using keyboard
        await page.keyboard.type('10-3');
        await page.keyboard.press('Enter');

        // Verify result
        const display = await page.textContent('#display');
        expect(display).toBe('7');
    });

    test('clears with Escape key', async ({ page }) => {
        // Enter numbers
        await page.keyboard.type('123');

        // Press Escape
        await page.keyboard.press('Escape');

        // Verify cleared
        const display = await page.textContent('#display');
        expect(display).toBe('0');
    });

    test('deletes with Backspace key', async ({ page }) => {
        // Enter numbers
        await page.keyboard.type('123');

        // Press Backspace
        await page.keyboard.press('Backspace');

        // Verify last digit removed
        const display = await page.textContent('#display');
        expect(display).toBe('12');
    });

    test('has no console errors during operation', async ({ page }) => {
        const consoleErrors = [];

        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Perform various operations
        await page.click('#btn-5');
        await page.click('#btn-add');
        await page.click('#btn-3');
        await page.click('#btn-equals');
        await page.click('#btn-clear');

        // Verify no errors
        expect(consoleErrors).toHaveLength(0);
    });

    test('buttons are visible and clickable', async ({ page }) => {
        const button = page.locator('#btn-5');

        // Hover over button
        await button.hover();

        // Verify button is visible
        await expect(button).toBeVisible();

        // Click button
        await button.click();

        // Verify display updated
        const display = await page.textContent('#display');
        expect(display).toBe('5');
    });
});

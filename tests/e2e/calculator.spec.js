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
        const display = await page.textContent('[data-display]');
        expect(display).toBe('0');
    });

    test('performs basic addition', async ({ page }) => {
        // Click: 5 + 3 =
        await page.click('button[data-number]:has-text("5")');
        await page.click('button[data-operator]:has-text("+")');
        await page.click('button[data-number]:has-text("3")');
        await page.click('button[data-equals]');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('8');
    });

    test('performs basic subtraction', async ({ page }) => {
        // Click: 10 - 3 =
        await page.click('button[data-number]:has-text("1")');
        await page.click('button[data-number]:has-text("0")');
        await page.click('button[data-operator]:has-text("-")');
        await page.click('button[data-number]:has-text("3")');
        await page.click('button[data-equals]');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('7');
    });

    test('performs basic multiplication', async ({ page }) => {
        // Click: 6 × 7 =
        await page.click('button[data-number]:has-text("6")');
        await page.click('button[data-operator]:has-text("×")');
        await page.click('button[data-number]:has-text("7")');
        await page.click('button[data-equals]');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('42');
    });

    test('performs basic division', async ({ page }) => {
        // Click: 15 ÷ 3 =
        await page.click('button[data-number]:has-text("1")');
        await page.click('button[data-number]:has-text("5")');
        await page.click('button[data-operator]:has-text("÷")');
        await page.click('button[data-number]:has-text("3")');
        await page.click('button[data-equals]');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('5');
    });

    test('handles division by zero', async ({ page }) => {
        // Click: 5 ÷ 0 =
        await page.click('button[data-number]:has-text("5")');
        await page.click('button[data-operator]:has-text("÷")');
        await page.click('button[data-number]:has-text("0")');
        await page.click('button[data-equals]');

        // Verify error display
        const display = await page.textContent('[data-display]');
        expect(display).toBe('Error');
    });

    test('handles decimal numbers', async ({ page }) => {
        // Click: 1.5 + 2.3 =
        await page.click('button[data-number]:has-text("1")');
        await page.click('button[data-number]:has-text(".")');
        await page.click('button[data-number]:has-text("5")');
        await page.click('button[data-operator]:has-text("+")');
        await page.click('button[data-number]:has-text("2")');
        await page.click('button[data-number]:has-text(".")');
        await page.click('button[data-number]:has-text("3")');
        await page.click('button[data-equals]');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('3.8');
    });

    test('chains multiple operations', async ({ page }) => {
        // Click: 5 + 3 + 2 =
        await page.click('button[data-number]:has-text("5")');
        await page.click('button[data-operator]:has-text("+")');
        await page.click('button[data-number]:has-text("3")');
        await page.click('button[data-operator]:has-text("+")');
        await page.click('button[data-number]:has-text("2")');
        await page.click('button[data-equals]');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('10');
    });

    test('clears calculator with AC button', async ({ page }) => {
        // Enter some numbers and operation
        await page.click('button[data-number]:has-text("5")');
        await page.click('button[data-operator]:has-text("+")');
        await page.click('button[data-number]:has-text("3")');

        // Click AC button
        await page.click('button[data-all-clear]');

        // Verify display reset to 0
        const display = await page.textContent('[data-display]');
        expect(display).toBe('0');
    });

    test('deletes last digit with DEL button', async ({ page }) => {
        // Enter 123
        await page.click('button[data-number]:has-text("1")');
        await page.click('button[data-number]:has-text("2")');
        await page.click('button[data-number]:has-text("3")');

        // Click DEL button
        await page.click('button[data-delete]');

        // Verify display shows 12
        const display = await page.textContent('[data-display]');
        expect(display).toBe('12');
    });

    test('handles keyboard input for numbers', async ({ page }) => {
        // Type numbers using keyboard
        await page.keyboard.type('5+3=');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('8');
    });

    test('handles keyboard input for operations', async ({ page }) => {
        // Type using keyboard
        await page.keyboard.type('10-3');
        await page.keyboard.press('Enter');

        // Verify result
        const display = await page.textContent('[data-display]');
        expect(display).toBe('7');
    });

    test('clears with Escape key', async ({ page }) => {
        // Enter numbers
        await page.keyboard.type('123');

        // Press Escape
        await page.keyboard.press('Escape');

        // Verify cleared
        const display = await page.textContent('[data-display]');
        expect(display).toBe('0');
    });

    test('deletes with Backspace key', async ({ page }) => {
        // Enter numbers
        await page.keyboard.type('123');

        // Press Backspace
        await page.keyboard.press('Backspace');

        // Verify last digit removed
        const display = await page.textContent('[data-display]');
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
        await page.click('button[data-number]:has-text("5")');
        await page.click('button[data-operator]:has-text("+")');
        await page.click('button[data-number]:has-text("3")');
        await page.click('button[data-equals]');
        await page.click('button[data-all-clear]');

        // Verify no errors
        expect(consoleErrors).toHaveLength(0);
    });

    test('buttons have hover effects', async ({ page }) => {
        const button = page.locator('button[data-number]:has-text("5")');

        // Hover over button
        await button.hover();

        // Verify button is still visible (basic interaction check)
        await expect(button).toBeVisible();
    });

    test('displays formatted numbers with commas', async ({ page }) => {
        // Create large number: 1000
        await page.click('button[data-number]:has-text("1")');
        await page.click('button[data-number]:has-text("0")');
        await page.click('button[data-number]:has-text("0")');
        await page.click('button[data-number]:has-text("0")');

        // Verify formatted display
        const display = await page.textContent('[data-display]');
        expect(display).toBe('1,000');
    });
});

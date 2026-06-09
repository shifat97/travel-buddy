import { test, expect } from '@playwright/test';

test.describe('Example Authenticated Tests', () => {
    test('Should be logged in by default', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*inventory.html/);
        // Verify some content that is only visible when logged in
        await expect(page.locator('.inventory_list')).toBeVisible();
    });
});

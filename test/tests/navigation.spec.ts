import { test, expect } from '../fixtures/fixtures';

test.describe('Navigate authenticated URLs @regression', () => {
    test.beforeEach(async ({ page, homePage }) => {
        await homePage.navigate();

        const context = page.context();
        await context.clearCookies();
    });

    test('login + clear cookies + navigate bookings link → move back to login page', async ({ page, homePage }) => {
        await homePage.clickBookingsLink();
        await expect(page).toHaveURL(/.*login/);
    });

    test('login + clear cookies + profile bookings link → move back to login page', async ({ page, homePage }) => {
        await homePage.hoverUserProfileButton();
        await homePage.clickProfileLink();
        await expect(page).toHaveURL(/.*login/);
    });
});

test.describe('Navigate authenticated url without login @smoke @regression', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('copy bookings url + paste to a fresh tab or browser', async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/bookings`);
        await expect(page).toHaveURL(/.*login/);
    });

    test('copy profile url + paste to a fresh tab or browser', async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}/profile`);
        await expect(page).toHaveURL(/.*login/);
    });
});

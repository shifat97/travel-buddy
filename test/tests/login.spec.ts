import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Login Tests', () => {
    // Override storage state to start logged out
    // test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ page, loginPage }) => {
        await page.addInitScript(() => {
            localStorage.removeItem('travel_buddy_current_user');
        });
        await loginPage.navigate();
    });

    test('valid username + valid password → move to home page', async ({ loginPage, page }) => {
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');
    });

    test('invalid username + valid password → wrong credential error', async ({ loginPage }) => {
        await loginPage.login('invalid_user@email.com', testData.validUser.password);
        await loginPage.assertErrorMessage(testData.errorMessages.wrongCredentials);
    });

    test('valid username + invalid password → wrong credential error', async ({ loginPage, page }) => {
        await loginPage.login(testData.validUser.username, 'wrong_password');
        await loginPage.assertErrorMessage(testData.errorMessages.wrongCredentials);
    });

    test('empty username + empty password → ask for data input', async ({ loginPage }) => {
        await expect(loginPage.usernameInput).toHaveAttribute('required');
        await expect(loginPage.passwordInput).toHaveAttribute('required');
    });
});

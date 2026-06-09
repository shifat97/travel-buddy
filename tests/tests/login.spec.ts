import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Login Tests', () => {
    // Override storage state to start logged out
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('Valid login', async ({ loginPage, page }) => {
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('Invalid login', async ({ loginPage }) => {
        await loginPage.login('invalid_user', 'wrong_password');
        await loginPage.assertErrorMessage(testData.errorMessages.wrongCredentials);
    });
});

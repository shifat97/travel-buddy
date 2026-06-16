import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Login Tests @regression', () => {
    // Override storage state to start logged out
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('valid email + valid password → move to home page @smoke', async ({ loginPage, page }) => {
        await loginPage.login(testData.validUser.email, testData.validUser.password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');
    });

    test('invalid email + valid password → wrong credential error', async ({ loginPage }) => {
        await loginPage.login('invalid_user@email.com', testData.validUser.password);
        await loginPage.assertErrorMessage(testData.errorMessages.wrongCredentials);
    });

    test('valid email + invalid password → wrong credential error', async ({ loginPage }) => {
        await loginPage.login(testData.validUser.email, 'wrong_password');
        await loginPage.assertErrorMessage(testData.errorMessages.wrongCredentials);
    });

    test('empty email + empty password → ask for data input', async ({ loginPage }) => {
        await expect(loginPage.emailInput).toHaveAttribute('required');
        await expect(loginPage.passwordInput).toHaveAttribute('required');
    });

    test('trailing space before email → should validate and login', async ({ loginPage, page }) => {
        await loginPage.login(`  ${testData.validUser.email}`, testData.validUser.password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');
    });

    test('trailing space before password → should validate and show wrong credential', async ({ loginPage }) => {
        await loginPage.login(testData.validUser.email, `   ${testData.validUser.password}`);
        await loginPage.assertErrorMessage(testData.errorMessages.wrongCredentials);
    });

    test('all uppercase email characters → should validate and show wrong credential', async ({ loginPage }) => {
        await loginPage.login(testData.validUser.email.toUpperCase(), testData.validUser.password);
        await loginPage.assertErrorMessage(testData.errorMessages.wrongCredentials);
    });

    test('click on forgot password link → move to forgot password page', async ({ loginPage, page }) => {
        await loginPage.navigateToForgotPassword();
        await expect(page).toHaveURL(/.*forgot-password/);
    });

    test('click on sign up link → move to sign page', async ({ loginPage, page }) => {
        await loginPage.navigateToSignUpPage();
        await expect(page).toHaveURL(/.*register/);
    });

    test('login  → check cookies for token', async ({ page, loginPage }) => {
        await loginPage.login(testData.validUser.email, testData.validUser.password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');

        const cookies = await page.context().cookies();
        const token = cookies.find((cookie) => cookie.name == 'travel_buddy_token');

        expect(token).toBeTruthy();
    });
});

test.describe('Logout user workflow @smoke', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Logout should clear the cookies', async ({ page, loginPage, homePage }) => {
        await loginPage.navigate();
        await loginPage.login(testData.validUser.email, testData.validUser.password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');

        await homePage.hoverUserProfileButton();
        await homePage.clickLogout();

        const cookies = await page.context().cookies();
        const token = cookies.find((cookie) => cookie.name == 'travel_buddy_token');

        expect(token).toBeFalsy();
    });
});

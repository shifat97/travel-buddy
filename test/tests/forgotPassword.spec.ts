import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';
import { faker } from '@faker-js/faker';

test.describe('Forgot password workflow @regression', () => {
    test.beforeEach(async ({ forgotPasswordPage }) => {
        await forgotPasswordPage.navigate();
    });

    test('valid email + new password + confirm password → password changed @smoke', async ({
        page,
        forgotPasswordPage,
    }) => {
        const password = faker.internet.password();

        await forgotPasswordPage.changePassword('test003@email.com', password, password);

        await expect(page).toHaveURL(/.*login/);
    });

    test('email with uppercase → covert to lower case and login', async ({ page, forgotPasswordPage, loginPage }) => {
        const password = faker.internet.password();
        const email = 'test003@email.com';

        await forgotPasswordPage.changePassword(email.toUpperCase(), password, password);

        await expect(page).toHaveURL(/.*login/);

        await loginPage.login(email.toLocaleLowerCase(), password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');
    });

    test('email with trailing spaces → must trim the spaces and login', async ({
        page,
        forgotPasswordPage,
        loginPage,
    }) => {
        const password = faker.internet.password();
        const email = `   test003@email.com   `;

        await forgotPasswordPage.changePassword(email, password, password);

        await expect(page).toHaveURL(/.*login/);

        await loginPage.login(email, password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');
    });

    test('email not exist → show proper validation error', async ({ forgotPasswordPage }) => {
        const password = faker.internet.password();

        await forgotPasswordPage.changePassword('randomemail99@gmail.com', password, password);
        await forgotPasswordPage.assertErrorMessage(testData.errorMessages.userNotFound);
    });

    test('password length less than 8 → show proper validation message', async ({ forgotPasswordPage }) => {
        await forgotPasswordPage.changePassword('test003@email.com', 'Test@2#', 'Test@2#');
        await forgotPasswordPage.assertErrorMessage(testData.errorMessages.passwordLengthError);
    });

    test('password does not have special char → show proper validation message', async ({ forgotPasswordPage }) => {
        await forgotPasswordPage.changePassword('test003@email.com', '534543665', '534543665');
        await forgotPasswordPage.assertErrorMessage(testData.errorMessages.specialCharacterError);
    });

    test('different new password and confirm password → show proper validation error', async ({
        forgotPasswordPage,
    }) => {
        await forgotPasswordPage.changePassword('test003@email.com', 'Test#12345', 'Test#123466');
        await forgotPasswordPage.assertErrorMessage(testData.errorMessages.passwordNotMatched);
    });
});

test.describe('sign up + logout + forgot password + login @smoke', () => {
    test('create user → update password → login with the updated password @smoke', async ({
        page,
        forgotPasswordPage,
        signUpPage,
        loginPage,
        homePage,
    }) => {
        const password = faker.internet.password();
        const fullName = faker.person.fullName();
        const email = faker.internet.email();

        await signUpPage.navigate();

        await signUpPage.createAccount(fullName, email, password, password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');

        await homePage.hoverUserProfileButton();
        await homePage.clickLogout();
        await homePage.clickLoginButton();

        await loginPage.navigateToForgotPassword();
        await expect(page).toHaveURL(/.*forgot-password/);

        await forgotPasswordPage.changePassword(email, password + '@123', password + '@123');

        await expect(page).toHaveURL(`${process.env.BASE_URL}/login`);

        await loginPage.login(email, password + '@123');
        await expect(page).toHaveURL(process.env.BASE_URL || '');
    });
});

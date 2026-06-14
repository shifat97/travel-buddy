import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';
import { faker } from '@faker-js/faker';

test.describe('Sign up user workflow @regression', () => {
    test.beforeEach(async ({ signUpPage }) => {
        await signUpPage.navigate();
    });

    test('valid name + email + password + confirm password → sign up successful @smoke', async ({
        page,
        signUpPage,
    }) => {
        const password = faker.internet.password();

        await signUpPage.createAccount(faker.person.fullName(), faker.internet.email(), password, password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');

        const cookies = await page.context().cookies();
        const token = cookies.find((cookie) => cookie.name == 'travel_buddy_token');

        expect(token).toBeTruthy();
    });

    test('name with more than 50 characters → show character error', async ({ signUpPage }) => {
        const password = faker.internet.password();

        await signUpPage.createAccount(
            'Alexander Montgomery-Wellington the Third Junior De Senior',
            faker.internet.email(),
            password,
            password,
        );
        await signUpPage.assertErrorMessage(testData.errorMessages.characterError);
    });

    test('name with trailing space → should trim spaces', async ({ page, signUpPage, profilePage }) => {
        const fullName = `   ${faker.person.fullName()}`;
        const password = faker.internet.password();

        await signUpPage.createAccount(fullName, faker.internet.email(), password, password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');

        await profilePage.navigate();

        const fullNameWithoutTrailing = fullName.trim();
        const getCreatedFullName = await profilePage.getUsername();

        expect(getCreatedFullName).toEqual(fullNameWithoutTrailing);
    });

    test('email with uppercase → covert it to lowercase', async ({ page, signUpPage, profilePage }) => {
        const password = faker.internet.password();
        const email = faker.internet.email().toUpperCase();

        await signUpPage.createAccount(faker.person.fullName(), email, password, password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');

        await profilePage.navigate();

        const createdEmail = await profilePage.getEmail();

        expect(createdEmail).toEqual(email.toLocaleLowerCase());
    });

    test('create user with same email → show proper validation error', async ({ signUpPage }) => {
        const password = faker.internet.password();
        await signUpPage.createAccount(faker.person.fullName(), 'test@email.com', password, password);
        await signUpPage.assertErrorMessage(testData.errorMessages.userAlreadyExist);
    });

    test('password without special character → show special character validation error', async ({ signUpPage }) => {
        await signUpPage.createAccount(faker.person.fullName(), faker.internet.email(), '534543665', '534543665');
        await signUpPage.assertErrorMessage(testData.errorMessages.specialCharacterError);
    });

    test('password length less than 8 → show password length validation error', async ({ signUpPage }) => {
        await signUpPage.createAccount(faker.person.fullName(), faker.internet.email(), 'Test@2#', 'Test@2#');
        await signUpPage.assertErrorMessage(testData.errorMessages.passwordLengthError);
    });

    test('different passwords → should show the error message', async ({ signUpPage }) => {
        await signUpPage.createAccount(
            faker.person.fullName(),
            faker.internet.email(),
            faker.internet.password(),
            faker.internet.password(),
        );
        await signUpPage.assertErrorMessage(testData.errorMessages.passwordNotMatched);
    });

    test('empty all fields → all fields must be required', async ({ signUpPage }) => {
        await expect(signUpPage.emailInput).toHaveAttribute('required');
        await expect(signUpPage.fullNameInput).toHaveAttribute('required');
        await expect(signUpPage.passwordInput).toHaveAttribute('required');
        await expect(signUpPage.confirmPasswordInput).toHaveAttribute('required');
    });
});

import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';
import { faker } from '@faker-js/faker';

test.describe('Sign up user workflow @smoke', () => {
    test('valid name + email + password + confirm password → sign up successful', async ({ page, signUpPage }) => {
        const password = faker.internet.password();

        await signUpPage.navigate();

        await signUpPage.createAccount(faker.person.fullName(), faker.internet.email(), password, password);
        await expect(page).toHaveURL(process.env.BASE_URL || '');

        const cookies = await page.context().cookies();
        const token = cookies.find((cookie) => cookie.name == 'travel_buddy_token');

        expect(token).toBeTruthy();
    });
});

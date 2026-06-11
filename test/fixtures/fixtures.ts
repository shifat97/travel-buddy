import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';

type MyFixtures = {
    signUpPage: SignUpPage;
    loginPage: LoginPage;
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    signUpPage: async ({ page }, use) => {
        await use(new SignUpPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

export { expect } from '@playwright/test';

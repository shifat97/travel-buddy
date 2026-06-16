import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { DestinationPage } from '../pages/DestinationPage';

type MyFixtures = {
    signUpPage: SignUpPage;
    loginPage: LoginPage;
    homePage: HomePage;
    forgotPasswordPage: ForgotPasswordPage;
    profilePage: ProfilePage;
    destinationPage: DestinationPage;
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
    forgotPasswordPage: async ({ page }, use) => {
        await use(new ForgotPasswordPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
    destinationPage: async ({ page }, use) => {
        await use(new DestinationPage(page));
    },
});

export { expect } from '@playwright/test';

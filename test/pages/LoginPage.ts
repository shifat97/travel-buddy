import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="login-email-input"]');
        this.passwordInput = page.locator('[data-test="login-password-input"]');
        this.loginButton = page.locator('[data-test="login-submit-btn"]');
        this.errorMessage = page.locator('[data-test="login-error"] span');
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/login`);
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/login`);
    }

    async login(username: string, password: string) {
        if (username !== null) await this.usernameInput.fill(username);
        if (password !== null) await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async clearInputs() {
        await this.usernameInput.clear();
        await this.passwordInput.clear();
    }

    async assertErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async assertErrorMessageNotVisible() {
        await expect(this.errorMessage).not.toBeVisible();
    }

    async assertPasswordMasked() {
        const type = await this.passwordInput.getAttribute('type');
        expect(type).toBe('password');
    }
}

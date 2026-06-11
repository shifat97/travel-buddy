import { Page, Locator, expect } from '@playwright/test';

export class SignUpPage {
    readonly page: Page;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly createButton: Locator;
    readonly errorMessage: Locator;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullNameInput = page.locator("[data-test='register-name-input']");
        this.emailInput = page.locator('[data-test="register-email-input"]');
        this.passwordInput = page.locator('[data-test="register-password-input"]');
        this.confirmPasswordInput = page.locator('[data-test="register-confirm-password-input"]');
        this.createButton = page.locator('[data-test="register-submit-btn"]');
        this.errorMessage = page.locator('[data-test="register-error"]');
        this.loginLink = page.locator('[data-test="login-link"]');
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/register`);
        await expect(this.page).toHaveURL(/.*register/);
    }

    async navigateToLoginPage() {
        await this.loginLink.click();
    }

    async createAccount(fullName: string, email: string, password: string, confirmPassword: string) {
        if (fullName !== null) await this.fullNameInput.fill(fullName);
        if (email !== null) await this.emailInput.fill(email);
        if (password !== null) await this.passwordInput.fill(password);
        if (confirmPassword !== null) await this.confirmPasswordInput.fill(confirmPassword);
        await this.createButton.click();
    }

    async assertErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async assertErrorMessageNotVisible() {
        await expect(this.errorMessage).not.toBeVisible();
    }
}

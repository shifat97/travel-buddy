import { Page, Locator, expect } from '@playwright/test';

export class ForgotPasswordPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly newPasswordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly resetPasswordButton: Locator;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    readonly backToLoginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[id="email"]');
        this.newPasswordInput = page.locator('[id="new-password"]');
        this.confirmPasswordInput = page.locator('[id="confirm-password"]');
        this.resetPasswordButton = page.locator('[type="submit"]');
        this.errorMessage = page.locator("//div[@class='auth-message error']//span");
        this.successMessage = page.locator("//div[@class='auth-message success']//span");
        this.backToLoginLink = page.locator("//div[@class='auth-footer']//a//span");
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/forgot-password`);
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/forgot-password`);
    }

    async navigateToLoginPage() {
        await this.backToLoginLink.click();
    }

    async changePassword(email: string, password: string, confirmPassword: string) {
        if (email !== null) await this.emailInput.fill(email);
        if (password !== null) await this.newPasswordInput.fill(password);
        if (confirmPassword !== null) await this.confirmPasswordInput.fill(confirmPassword);
        await this.resetPasswordButton.click();
    }

    async assertErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }
}

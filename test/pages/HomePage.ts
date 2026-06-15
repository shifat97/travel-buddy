import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly userDropdown: Locator;
    readonly logoutButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userDropdown = page.locator('//div[@class="nav-user-dropdown"]');
        this.logoutButton = page.locator('[data-test="nav-logout-btn"]');
        this.loginButton = page.locator('[data-test="nav-login-btn"]');
    }

    async hoverUserProfileButton() {
        await this.userDropdown.hover();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}

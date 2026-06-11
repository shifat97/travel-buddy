import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly username: Locator;
    readonly email: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="profile-name"]');
        this.email = page.locator("[data-test='profile-email'] span");
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/profile`);
        await expect(this.page).toHaveURL(/.*profile/);
    }

    async getUsername() {
        return await this.username.textContent();
    }

    async getEmail() {
        return await this.email.textContent();
    }
}

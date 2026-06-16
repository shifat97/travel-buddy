import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly userDropdown: Locator;
    readonly logoutButton: Locator;
    readonly loginButton: Locator;
    readonly bookingsLink: Locator;
    readonly profileLink: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userDropdown = page.locator('//div[@class="nav-user-dropdown"]');
        this.logoutButton = page.locator('[data-test="nav-logout-btn"]');
        this.loginButton = page.locator('[data-test="nav-login-btn"]');
        this.bookingsLink = page.locator('[data-test="nav-my-bookings"]');
        this.profileLink = page.locator('[data-test="nav-profile-link"]');
        this.searchInput = page.locator('[data-test="home-search-input"]');
        this.searchButton = page.locator('[data-test="home-search-btn"]');
    }

    async navigate() {
        await this.page.goto(process.env.BASE_URL || '');
        await expect(this.page).toHaveURL(process.env.BASE_URL || '');
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

    async clickBookingsLink() {
        await this.bookingsLink.click();
    }

    async clickProfileLink() {
        await this.profileLink.click();
    }

    async search(locationName: string) {
        await this.searchInput.fill(locationName);
        await this.searchButton.click();
    }
}

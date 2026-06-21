import { Page, Locator, expect } from '@playwright/test';

export class BookingsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/bookings`);
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/bookings`);
    }
}

import { Page, Locator, expect } from '@playwright/test';

export class SingleDestinationPage {
    readonly page: Page;
    readonly singleDestinationTitle: Locator;
    readonly singleDestinationPrice: Locator;
    readonly checkInDate: Locator;
    readonly checkoutDate: Locator;
    readonly guestSelection: Locator;
    readonly confirmBookingButton: Locator;
    readonly bookingSuccessMessage: Locator;
    readonly bookingErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.singleDestinationTitle = page.locator('//h1[@class="detail-title"]');
        this.singleDestinationPrice = page.locator('//span[@class="price-value"]');
        this.checkInDate = page.locator('[data-test="check-in-date"]');
        this.checkoutDate = page.locator('[data-test="check-out-date"]');
        this.guestSelection = page.locator('[data-test="guest-select"]');
        this.confirmBookingButton = page.locator('[data-test="confirm-booking-btn"]');
        this.bookingSuccessMessage = page.locator('//div[@class="booking-message success"]');
        this.bookingErrorMessage = page.locator('//div[@data-test="booking-message"]//span')
    }

    async assertErrorMessage(expectedMessage: string) {
        await expect(this.bookingErrorMessage).toBeVisible();
        await expect(this.bookingErrorMessage).toContainText(expectedMessage);
    }
}

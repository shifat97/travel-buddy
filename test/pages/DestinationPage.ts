import { Page, Locator, expect } from '@playwright/test';

export class DestinationPage {
    readonly page: Page;
    readonly destinationGridContainer: Locator;
    readonly noDestinationFoundText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.destinationGridContainer = page.locator("//div[@class='destination-grid']");
        this.noDestinationFoundText = page.locator('//div[@class="no-results"]//h3');
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/destinations`);
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/destinations`);
    }

    async destinationGridCounter(): Promise<number> {
        return await this.destinationGridContainer.count();
    }

    async getAllDestinationGrids(): Promise<Locator[]> {
        return await this.destinationGridContainer.all();
    }

    async getNoDestinationFoundText(): Promise<string> {
        await expect(this.noDestinationFoundText).toBeVisible();
        return (await this.noDestinationFoundText.textContent()) ?? '';
    }

    // async search(locationName: string) {
    //     await this.searchInput.fill(locationName);
    //     await this.searchButton.click();
    // }
}

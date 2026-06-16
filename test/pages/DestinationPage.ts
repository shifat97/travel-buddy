import { Page, Locator, expect } from '@playwright/test';

export class DestinationPage {
    readonly page: Page;
    readonly destinationGridContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.destinationGridContainer = page.locator("//div[@class='destination-grid']");
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

    // async search(locationName: string) {
    //     await this.searchInput.fill(locationName);
    //     await this.searchButton.click();
    // }
}

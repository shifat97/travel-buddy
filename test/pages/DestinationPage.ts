import { Page, Locator, expect } from '@playwright/test';

export class DestinationPage {
    readonly page: Page;
    readonly destinationGridContainer: Locator;
    readonly noDestinationFoundText: Locator;
    readonly searchInput: Locator;
    readonly categoryFilters: Locator;
    readonly categoryFiltersActive: Locator;
    readonly cardBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.destinationGridContainer = page.locator("//div[@class='destination-grid']");
        this.noDestinationFoundText = page.locator('//div[@class="no-results"]//h3');
        this.searchInput = page.locator('[data-test="dest-search-input"]');
        this.categoryFilters = page.locator('//button[@class="category-btn "]');
        this.categoryFiltersActive = page.locator('//button[@class="category-btn active"]');
        this.cardBadge = page.locator('//div[@class="card-badge"]');
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

    async getCategoriesName(): Promise<Locator[]> {
        return await this.categoryFilters.all();
    }

    async getCardBadges(): Promise<Locator[]> {
        return await this.cardBadge.all();
    }

    async getActiveCategoryFilters(): Promise<string> {
        return await this.categoryFiltersActive.first().textContent();
    }

    async getNoDestinationFoundText(): Promise<string> {
        await expect(this.noDestinationFoundText).toBeVisible();
        return (await this.noDestinationFoundText.textContent()) ?? '';
    }

    async search(location: string) {
        await this.searchInput.fill(location);
    }

    // async search(locationName: string) {
    //     await this.searchInput.fill(locationName);
    //     await this.searchButton.click();
    // }
}

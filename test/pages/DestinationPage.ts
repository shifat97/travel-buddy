import { Page, Locator, expect } from '@playwright/test';

export class DestinationPage {
    readonly page: Page;
    readonly destinationGridContainer: Locator;
    readonly noDestinationFoundText: Locator;
    readonly searchInput: Locator;
    readonly categoryFilters: Locator;
    readonly categoryFiltersActive: Locator;
    readonly cardBadge: Locator;
    readonly maxPriceRange: Locator;
    readonly cardPrice: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.destinationGridContainer = page.locator("//div[@class='destination-grid']");
        this.noDestinationFoundText = page.locator('//div[@class="no-results"]//h3');
        this.searchInput = page.locator('[data-test="dest-search-input"]');
        this.categoryFilters = page.locator('//button[@class="category-btn "]');
        this.categoryFiltersActive = page.locator('//button[@class="category-btn active"]');
        this.cardBadge = page.locator('//div[@class="card-badge"]');
        this.maxPriceRange = page.locator('[data-test="price-range-slider"]');
        this.cardPrice = page.locator('//div[@class="card-price"]//span[@class="price-value"]');
        this.nextButton = page.locator('[data-test="next-page-btn"]');
    }

    async navigate() {
        await this.page.goto(`${process.env.BASE_URL}/destinations`);
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/destinations`);
    }

    async destinationGridCounter(): Promise<number> {
        return await this.destinationGridContainer.locator('.destination-card').count();
    }

    async getAllDestinationGrids(): Promise<Locator[]> {
        return await this.destinationGridContainer.locator('.destination-card').all();
    }

    async getRandomCardViewDetailsButton(): Promise<Locator> {
        const allGrids = await this.getAllDestinationGrids();
        const gridLength = await this.destinationGridCounter();
        const grid = allGrids[Math.floor(Math.random() * gridLength)];

        const randomCard = grid.locator('.card-footer .btn').first();
        return randomCard;
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

    async setMaxPriceRange(price: number) {
        await this.maxPriceRange.fill(price.toString());
    }

    async getCardPrices(): Promise<Locator[]> {
        return await this.cardPrice.all();
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

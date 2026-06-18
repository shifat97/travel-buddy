import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Destination page interactions @regression', () => {
    test.beforeEach(async ({ destinationPage }) => {
        await destinationPage.navigate();
    });

    /* Test with existed location names */
    test('search existed location → result found @smoke', async ({ page, destinationPage }) => {
        await destinationPage.search(testData.searchLocations.validLocationName);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/destinations`);

        const count = await destinationPage.destinationGridCounter();
        expect(count).toBeGreaterThanOrEqual(1);

        const grids = await destinationPage.getAllDestinationGrids();

        for (const grid of grids) {
            await expect(grid).toBeVisible();
        }
    });

    /* Test with existed country name */
    test('search existed country name → result found @smoke', async ({ page, destinationPage }) => {
        await destinationPage.search(testData.searchLocations.validCountryName);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/destinations`);

        const count = await destinationPage.destinationGridCounter();
        expect(count).toBeGreaterThanOrEqual(1);

        const grids = await destinationPage.getAllDestinationGrids();

        for (const grid of grids) {
            await expect(grid).toBeVisible();
        }
    });

    /* Test location that doesn't exists */
    test('search location that does not exist → result not found found', async ({ page, destinationPage }) => {
        await destinationPage.search(testData.searchLocations.invalidLocationName);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/destinations`);

        const getText = await destinationPage.getNoDestinationFoundText();

        expect(getText).toEqual('No destinations found');
    });

    /* Test location with blank filed */
    test('search with blank field → field is required', async ({ destinationPage }) => {
        await expect(destinationPage.searchInput).toHaveAttribute('required');
    });

    /* Test search location with trailing spaces */
    test('search location with trailing spaces → must trim the spaces and result found', async ({
        page,
        destinationPage,
    }) => {
        await destinationPage.search(`   ${testData.searchLocations.validLocationName}   `);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/destinations`);

        const count = await destinationPage.destinationGridCounter();
        expect(count).toBeGreaterThanOrEqual(1);

        const grids = await destinationPage.getAllDestinationGrids();

        for (const grid of grids) {
            await expect(grid).toBeVisible();
        }
    });

    /* Test search location with different character cases */
    test('search location with different character combinations → result found', async ({ page, destinationPage }) => {
        const combinationList = [
            testData.searchLocations.validLocationName.toUpperCase(),
            testData.searchLocations.validLocationName.toLowerCase(),
            testData.searchLocations.validLocationName.charAt(0).toUpperCase() +
                testData.searchLocations.validLocationName.slice(1),
        ];

        for (const combination of combinationList) {
            await destinationPage.search(combination);
            await expect(page).toHaveURL(`${process.env.BASE_URL}/destinations`);

            const count = await destinationPage.destinationGridCounter();
            expect(count).toBeGreaterThanOrEqual(1);

            const grids = await destinationPage.getAllDestinationGrids();

            for (const grid of grids) {
                await expect(grid).toBeVisible();
            }

            await destinationPage.navigate();
        }
    });

    /* Test category filters with card badge */
    test('select category → card badge equals to category type', async ({ destinationPage }) => {
        const categories = await destinationPage.getCategoriesName();

        for (const category of categories) {
            await category.click();

            const categoryType = await destinationPage.getActiveCategoryFilters();
            const badges = await destinationPage.getCardBadges();

            for (const badge of badges) {
                await expect(badge).toBeVisible();

                const cardBadgeText = await badge.textContent();

                expect(categoryType).toEqual(cardBadgeText);
            }
        }
    });

    /* Test max price with 300 */
    test('set max price to 300 → show locations within 300', async ({ page, destinationPage }) => {
        await destinationPage.setMaxPriceRange(300);

        const grids = await destinationPage.getAllDestinationGrids();

        for (const grid of grids) {
            await expect(grid).toBeVisible();

            const prices = await destinationPage.getCardPrices();

            for (const price of prices) {
                await expect(price).toBeVisible();

                const cardPriceText = (await price.textContent()).split('$')[1];
                expect(Number(cardPriceText)).toBeLessThanOrEqual(300);
            }
        }
    });
});

test.describe('Frontend + API Integration @smoke', () => {
    test('get all destinations with API → check frontend data', async ({
        request,
        page,
        destinationPage,
        homePage,
    }) => {
        await homePage.navigate();

        const cookies = await page.context().cookies();
        const token = cookies[0]['value'];

        const destinationApiData = await request.get(`${process.env.SERVER_BASE_URL}/api/destinations`, {
            headers: {
                Cookie: `token=${token}`,
            },
        });

        const customDestinationAPIData = [];

        for (const data of await destinationApiData.json()) {
            const myData = {
                name: data['name'],
                location: data['location'],
                price: data['price'].toString(),
                rating: data['rating'].toString(),
            };

            customDestinationAPIData.push(myData);
        }

        await destinationPage.navigate();

        let frontendUIData = [];
        while (true) {
            const cards = await destinationPage.destinationGridContainer.locator('.destination-card').all();

            const pageResults = await Promise.all(
                cards.map(async (card) => ({
                    name: (await card.locator('.card-title').textContent()) ?? '',
                    location: (await card.locator('.card-location span').textContent()) ?? '',
                    price: (await card.locator('.price-value').textContent()).split('$')[1] ?? '',
                    rating: (await card.locator('.card-rating span').textContent()) ?? '',
                })),
            );

            frontendUIData.push(...pageResults);

            if (await destinationPage.nextButton.isDisabled()) break;
            await destinationPage.nextButton.click();
        }

        expect(frontendUIData).toEqual(customDestinationAPIData);
    });
});

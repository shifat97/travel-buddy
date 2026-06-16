import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Home page search workflow', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    });

    /* Test with existed location names */
    test('search existed location → result found', async ({ page, homePage, destinationPage }) => {
        await homePage.search(testData.searchLocations.validLocationName);
        await expect(page).toHaveURL(
            `${process.env.BASE_URL}/destinations?search=${testData.searchLocations.validLocationName}`,
        );

        const count = await destinationPage.destinationGridCounter();
        expect(count).toBeGreaterThanOrEqual(1);

        const grids = await destinationPage.getAllDestinationGrids();

        for (const grid of grids) {
            await expect(grid).toBeVisible();
        }
    });
    /* Test with existed country name */
    /* Test location that doesn't exists */
    /* Test location with blank filed */
    /* Test search location with trailing spaces */
    /* Test search location with different character cases */
    /* Test search location on enter key press */
});

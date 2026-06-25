import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Home page search workflow @regression', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    });

    /* Test with existed location names */
    test('search existed location → result found @smoke', async ({ page, homePage, destinationPage }) => {
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
    test('search existed country name → result found @smoke', async ({ page, homePage, destinationPage }) => {
        await homePage.search(testData.searchLocations.validCountryName);
        await expect(page).toHaveURL(
            `${process.env.BASE_URL}/destinations?search=${testData.searchLocations.validCountryName}`,
        );

        const count = await destinationPage.destinationGridCounter();
        expect(count).toBeGreaterThanOrEqual(1);

        const grids = await destinationPage.getAllDestinationGrids();

        for (const grid of grids) {
            await expect(grid).toBeVisible();
        }
    });

    /* Test location that doesn't exist */
    test('search location that does not exist → result not found found', async ({
        page,
        homePage,
        destinationPage,
    }) => {
        await homePage.search(testData.searchLocations.invalidLocationName);
        await expect(page).toHaveURL(
            `${process.env.BASE_URL}/destinations?search=${testData.searchLocations.invalidLocationName}`,
        );

        const getText = await destinationPage.getNoDestinationFoundText();

        expect(getText).toEqual('No destinations found');
    });

    /* Test location with blank filed */
    test('search with blank field → field is required', async ({ homePage }) => {
        await expect(homePage.searchInput).toHaveAttribute('required');
    });

    /* Test search location with trailing spaces */
    test('search location with trailing spaces → must trim the spaces and result found', async ({
        page,
        homePage,
        destinationPage,
    }) => {
        await homePage.search(`   ${testData.searchLocations.validLocationName}   `);
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

    /* Test search location with different character cases */
    test('search location with different character combinations → result found', async ({
        page,
        homePage,
        destinationPage,
    }) => {
        const combinationList = [
            testData.searchLocations.validLocationName.toUpperCase(),
            testData.searchLocations.validLocationName.toLowerCase(),
            testData.searchLocations.validLocationName.charAt(0).toUpperCase() +
                testData.searchLocations.validLocationName.slice(1),
        ];

        for (const combination of combinationList) {
            await homePage.search(combination);
            await expect(page).toHaveURL(`${process.env.BASE_URL}/destinations?search=${combination}`);

            const count = await destinationPage.destinationGridCounter();
            expect(count).toBeGreaterThanOrEqual(1);

            const grids = await destinationPage.getAllDestinationGrids();

            for (const grid of grids) {
                await expect(grid).toBeVisible();
            }

            await homePage.navigate();
        }
    });

    /* Test search location on enter key press */
    test('search existed location + enter key press → result found @smoke', async ({
        page,
        homePage,
        destinationPage,
    }) => {
        await homePage.searchInput.fill(testData.searchLocations.validLocationName);

        await page.keyboard.press('Enter');

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
});

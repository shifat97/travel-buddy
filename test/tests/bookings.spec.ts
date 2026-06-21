import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Destination booking flow @regression', () => {
    // Check in and out are dates are valid
    test('go to destination page → select destination → book with valid date @smoke @debug', async ({
        page,
        destinationPage,
        bookingsPage,
        singleDestinationPage,
    }) => {
        await destinationPage.navigate();
        const viewDetailsButton = await destinationPage.getRandomCardViewDetailsButton();

        // get the card id from data-test attribute
        const id = (await viewDetailsButton.getAttribute('data-test')).split('-')[2];

        await viewDetailsButton.click();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/destinations/${id}`);

        const pageData = {
            title: singleDestinationPage.singleDestinationTitle,
            price: singleDestinationPage.singleDestinationPrice,
        };

        await expect(pageData.title).toBeVisible();
        await expect(pageData.price).toBeVisible();

        await singleDestinationPage.checkInDate.fill('2026-06-21');
        await singleDestinationPage.checkoutDate.fill('2026-06-25');
        await singleDestinationPage.guestSelection.selectOption('4');
        await singleDestinationPage.confirmBookingButton.click();

        await expect(singleDestinationPage.bookingSuccessMessage).toBeVisible();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/bookings`);
    });

    // Check in and out date are same
    test('go to destination page → select destination → book with same date', async ({}) => {});

    // Check in invalid date and out valid date
    test('go to destination page → select destination → invalid in date + valid out date', async ({}) => {});

    // Check in valid date and out invalid date
    test('go to destination page → select destination → valid in date + invalid out date', async ({}) => {});

    // Booking two different hotel within same day
    test('go to destination page → select two destination → book two different hotel within same day', async ({}) => {});
});

import { test, expect } from '../fixtures/fixtures';
import openRandomDestination from "../helper/booking_navigation";
import {testData} from "../data/testData";

test.describe('Destination booking flow @regression', () => {
    // Check in and out are dates are valid
    test('go to destination page → select destination → book with valid date @smoke', async ({
        page,
        destinationPage,
        singleDestinationPage,
    }) => {
        await openRandomDestination({
            page,
            destinationPage,
            singleDestinationPage,
        });

        const today = new Date();

        const dateIn = today.toISOString().split('T')[0];

        today.setDate(today.getDate() + 3);
        const dateOut = today.toISOString().split('T')[0];


        await singleDestinationPage.checkInDate.fill(dateIn);
        await singleDestinationPage.checkoutDate.fill(dateOut);
        await singleDestinationPage.guestSelection.selectOption('4');
        await singleDestinationPage.confirmBookingButton.click();

        await expect(singleDestinationPage.bookingSuccessMessage).toBeVisible();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/bookings`);
    });

    // Check in and out date are same
    test('go to destination page → select destination → book with same date', async ({page, destinationPage, singleDestinationPage,}) => {
        await openRandomDestination({
            page,
            destinationPage,
            singleDestinationPage,
        });

        const today = new Date();

        const dateIn = today.toISOString().split('T')[0];
        const dateOut = today.toISOString().split('T')[0];

        await singleDestinationPage.checkInDate.fill(dateIn);
        await singleDestinationPage.checkoutDate.fill(dateOut);
        await singleDestinationPage.guestSelection.selectOption('4');
        await singleDestinationPage.confirmBookingButton.click();

       await singleDestinationPage.assertErrorMessage(testData.errorMessages.sameDateError)

    });

    // Check in invalid date and out valid date
    test('go to destination page → select destination → invalid in date + valid out date', async ({page, destinationPage, singleDestinationPage}) => {
        await openRandomDestination({
            page,
            destinationPage,
            singleDestinationPage,
        });

        const today = new Date();

        today.setDate(today.getDate() - 1);
        const dateIn = today.toISOString().split('T')[0];

        today.setDate(today.getDate() + 1);
        const dateOut = today.toISOString().split('T')[0];

        await singleDestinationPage.checkInDate.fill(dateIn);
        await singleDestinationPage.checkoutDate.fill(dateOut);
        await singleDestinationPage.guestSelection.selectOption('3');
        await singleDestinationPage.confirmBookingButton.click();

        await singleDestinationPage.assertErrorMessage(testData.errorMessages.oldDateError)
    });

    // Check in valid date and out invalid date
    test('go to destination page → select destination → valid in date + invalid out date', async ({page, destinationPage, singleDestinationPage}) => {
        await openRandomDestination({
            page,
            destinationPage,
            singleDestinationPage,
        });

        const today = new Date();

        const dateIn = today.toISOString().split('T')[0];

        today.setDate(today.getDate() - 5);
        const dateOut = today.toISOString().split('T')[0];

        await singleDestinationPage.checkInDate.fill(dateIn);
        await singleDestinationPage.checkoutDate.fill(dateOut);
        await singleDestinationPage.guestSelection.selectOption('3');
        await singleDestinationPage.confirmBookingButton.click();

        await singleDestinationPage.assertErrorMessage(testData.errorMessages.sameDateError)
    });

    // Booking two different hotel within same day
    test('go to destination page → select two destination → book two different hotel within same day', async ({page, destinationPage, singleDestinationPage}) => {
        await openRandomDestination({
            page,
            destinationPage,
            singleDestinationPage,
        });

        const today = new Date();

        const dateIn = today.toISOString().split('T')[0];

        today.setDate(today.getDate() + 5);
        const dateOut = today.toISOString().split('T')[0];

        await singleDestinationPage.checkInDate.fill(dateIn);
        await singleDestinationPage.checkoutDate.fill(dateOut);
        await singleDestinationPage.guestSelection.selectOption('3');
        await singleDestinationPage.confirmBookingButton.click();

        await expect(singleDestinationPage.bookingSuccessMessage).toBeVisible();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/bookings`);


        // Book again on different destination using same date
        await openRandomDestination({
            page,
            destinationPage,
            singleDestinationPage,
        });

        await singleDestinationPage.checkInDate.fill(dateIn);
        await singleDestinationPage.checkoutDate.fill(dateOut);
        await singleDestinationPage.guestSelection.selectOption('5');
        await singleDestinationPage.confirmBookingButton.click();

        await singleDestinationPage.assertErrorMessage(testData.errorMessages.sameDayError)
    });
});

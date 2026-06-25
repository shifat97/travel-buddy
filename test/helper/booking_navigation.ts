import {Page} from "@playwright/test";
import {DestinationPage} from "../pages/DestinationPage";
import {SingleDestinationPage} from "../pages/SingleDestinationPage";
import {expect} from "playwright/test";

export default async function openRandomDestination({page, destinationPage, singleDestinationPage}: {
    page: Page;
    destinationPage: DestinationPage;
    singleDestinationPage: SingleDestinationPage;
}) {
    await destinationPage.navigate();

    const viewDetailsButton = await destinationPage.getRandomCardViewDetailsButton();

    const id = await viewDetailsButton.getAttribute('data-test');

    await viewDetailsButton.click();

    await expect(page).toHaveURL(
        `${process.env.BASE_URL}/destinations/${id?.split('-')[2]}`
    );

    await expect(singleDestinationPage.singleDestinationTitle).toBeVisible();
    await expect(singleDestinationPage.singleDestinationPrice).toBeVisible();
}
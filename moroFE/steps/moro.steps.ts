import { Page, test } from "@playwright/test";
import { GoogleHomePage } from "../pages/googleHome.page.ts";
import { GoogleResultPage } from "../pages/googleResult.page.ts";
import { MoroHomePage } from "../pages/moroHome.page.ts";
import { MoroCareerPage } from "../pages/moroCareer.page.ts";

export async function goToGoogle(page: Page, url: string): Promise<void> {
    await test.step('Go to google page', async () => {
        const googleHome = new GoogleHomePage(page);

        await googleHome.goToHome(url);
        await googleHome.getRidOfPopup();
    })
}

export async function enterString(page: Page, moroString: string): Promise<void> {
    await test.step('Enter moro string', async () => {
        const googleHome = new GoogleHomePage(page);

        await googleHome.enterString(moroString);
    })
}

export async function checkResultPage(page: Page, title: string): Promise<void> {
    await test.step('Check result page', async () => {
        const googleResult = new GoogleResultPage(page);

        await googleResult.checkResultPage(title);
    })
}

export async function goToMorosystem(page: Page): Promise<void> {
    await test.step('Go to morosystem', async () => {
        const googleResult = new GoogleResultPage(page);

        await googleResult.clickMoroLink();
    })
}

export async function goToCareer(page: Page, nthElement: number): Promise<void> {
    await test.step('Go to career', async () => {
        const moroHome = new MoroHomePage(page);

        // await moroHome.cookieHandling();
        // await moroHome.goToCareer(nthElement);
        await moroHome.goToCareerFromMenu();
    })
}

export async function selectTown(page: Page): Promise<void> {
    await test.step('Select town', async () => {
        const moroCareer = new MoroCareerPage(page);

        await moroCareer.selectTown();
        await moroCareer.checkCareerList();
    })
}


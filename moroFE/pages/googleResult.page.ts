import { expect, Locator, Page } from '@playwright/test';

export class GoogleResultPage {
    readonly page: Page;
    readonly moroLink: Locator;
    readonly moroLinkXpath: Locator;

    constructor(page: Page) {
        this.page = page;
        this.moroLink = this.page.getByRole('link', { name: 'MoroSystems - užitečná IT řeš' });
        this.moroLinkXpath = this.page.locator('//h3[contains(text(), "MoroSystems - smysluplná IT řešení a technologické inovace")]');
    }

    async clickMoroLink(): Promise<void> {
        await expect(this.moroLinkXpath).toBeVisible();
        await this.moroLinkXpath.click();
    }

    async checkResultPage(title: string): Promise<void> {
        expect(await this.page.title()).toEqual(title);
    }
}
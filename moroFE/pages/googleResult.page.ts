import { expect, Locator, Page } from '@playwright/test';

export class GoogleResultPage {
    readonly page: Page;
    readonly moroLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.moroLink = this.page.getByRole('link', { name: 'MoroSystems - užitečná IT řeš' });

    }

    async clickMoroLink(): Promise<void> {
        await expect(this.moroLink).toBeVisible();
        await this.moroLink.click();
    }

    async checkResultPage(title: string): Promise<void> {
        expect(await this.page.title()).toEqual(title);
    }
}
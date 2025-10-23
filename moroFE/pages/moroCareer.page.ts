import { expect, Locator, Page } from '@playwright/test';

export class MoroCareerPage {
    readonly page: Page;
    readonly townSelector: Locator;
    readonly brnoButton: Locator;
    readonly careerList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.townSelector = this.page.getByRole('link', { name: 'Všechna města' });
        this.brnoButton = this.page.locator('label').filter({ hasText: 'Brno' });
        this.careerList = this.page.locator('a.c-positions__link');
    }

    async selectTown(): Promise<void> {
        await expect(this.townSelector).toBeVisible({ timeout: 10000 });
        await this.townSelector.click();
        await expect(this.brnoButton).toBeVisible({ timeout: 10000 });
        await this.brnoButton.click();
    }

    async checkCareerList(): Promise<void> {
        await expect(this.careerList.nth(0)).toBeVisible();
        const career = await this.careerList.all();
        console.log(career.length);
    }
}
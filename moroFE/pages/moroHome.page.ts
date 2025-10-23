import { expect, Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';

export class MoroHomePage {
    readonly page: Page;
    readonly aboutUsLink: Locator;
    readonly careerLink: Locator;
    readonly cookieButton: Locator;
    readonly menulink: Locator;
    readonly careerMenuLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.aboutUsLink = this.page.locator('div.dropdown__toggle');
        this.careerLink = this.page.locator('#menu-hlavni-menu').getByRole('link', { name: 'Kariéra' });
        this.cookieButton = this.page.getByRole('button', { name: 'Pouze nutné' });
        this.menulink = this.page.locator('a.m-main__link');
        this.careerMenuLink = this.page.locator('a.m-main__link[href*="kariera"]');
    }

    async goToCareer(nthElement: number): Promise<void> {
        await expect(this.menulink.nth(nthElement)).toBeVisible({ timeout: 50000 });
        await this.menulink.nth(nthElement).click();
        await expect(this.careerLink).toBeVisible({ timeout: 50000 });
        await this.careerLink.click();
    }

    async cookieHandling(): Promise<void> {
        await clickIfElementExist(this.cookieButton);
    }

    async goToCareerFromMenu(): Promise<void> {
        await expect(this.careerMenuLink).toBeVisible();
        await this.careerMenuLink.click();
    }
}
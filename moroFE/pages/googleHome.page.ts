import { Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';

export class GoogleHomePage {
    readonly page: Page;
    readonly logoHome: Locator;
    readonly inputBox: Locator;
    readonly buttonDeny: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoHome = this.page.locator('div#app header a');
        this.inputBox = this.page.getByRole('combobox', { name: 'Najít' });
        this.buttonDeny = this.page.getByRole('button', { name: 'Odmítnout vše' });
    }

    async goToHome(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async enterString(string: string): Promise<void> {
        await this.inputBox.fill(string);
        await this.page.keyboard.press('Enter');
    }

    async getRidOfPopup(): Promise<void> {
        await clickIfElementExist(this.buttonDeny);
    }

}
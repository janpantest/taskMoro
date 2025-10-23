import { Locator } from '@playwright/test';


export async function clickIfElementExist(locator: Locator): Promise<void> {
    const elementVisible = await isElementVisible(locator);
    if (elementVisible) {
        await locator.click();
    }
}

export async function isElementVisible(locator: Locator, timeout?: number): Promise<boolean> {
    try {
        await locator.waitFor({ state: 'visible', timeout: timeout ?? 5000 });
        return true;
    }
    catch {
        return false;
    }
}

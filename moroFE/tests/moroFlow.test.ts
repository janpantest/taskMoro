import { test } from '@playwright/test';
import * as moroSteps from '../steps/moro.steps';

const url = 'https://www.google.com';
const moroString = 'MoroSystems';
const resultPageTitle = 'MoroSystems - Hledat Googlem';

test('Moro workflow', { tag: '@moro' }, async ({ page }) => {
    await moroSteps.goToGoogle(page, url)
    await moroSteps.enterString(page, moroString);

    // timeout for google captcha for manual solving
    await page.waitForTimeout(20000);

    await moroSteps.checkResultPage(page, resultPageTitle);
    await moroSteps.goToMorosystem(page);
    
    await moroSteps.goToCareer(page, 10);
    await moroSteps.selectTown(page);
});

// npx playwright test moroFlow.test.ts --headed --project=chromium
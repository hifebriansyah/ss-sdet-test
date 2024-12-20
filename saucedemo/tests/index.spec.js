const { test, expect } = require('@playwright/test');
const Index = require('../pages/index');
const Inventory = require('../pages/inventory');

test.describe('Login Tests', () => {
    test('Successful Login', async ({ page }) => {
        const index = new Index(page);
        const inventory = new Inventory(page);

        await index.navigate();
        await index.login('standard_user', 'secret_sauce');
        await inventory.isVisible();
    });

    test('Failed Login : wrong password', async ({ page }) => {
        const index = new Index(page);

        await index.navigate();
        await index.login('standard_user', 'wrong_password');
        await index.isFailed()
    });

    test('Failed Login : locked', async ({ page }) => {
        const index = new Index(page);

        await index.navigate();
        await index.login('locked_out_user', 'secret_sauce');
        await index.isFailed()
    });

    test('Failed Login : no password', async ({ page }) => {
        const index = new Index(page);

        await index.navigate();
        await index.login('standard_user', '');
        await index.isFailed()
    });

    test('Failed Login : no username', async ({ page }) => {
        const index = new Index(page);

        await index.navigate();
        await index.login('', 'wrong_password');
        await index.isFailed()
    });
});

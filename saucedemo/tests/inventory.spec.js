const { test, expect } = require('@playwright/test');
const Index = require('../pages/index');
const Inventory = require('../pages/inventory');

test.describe('Select Item Tests', () => {
    test('1 Items', async ({ page }) => {
        const inventory = new Inventory(page);

        await inventory.navigate();
        await inventory.isInventoryVisible();

        const addToCartButtons = await page.$$('[data-test^="add-to-cart-"]');

        addToCartButtons[0].click();
        await inventory.delay();

        const value = await inventory.getCartBadgeValue();
        expect(value).toBe('1');
    });

    test('2 Items', async ({ page }) => {
        const inventory = new Inventory(page);

        await inventory.navigate();
        await inventory.isInventoryVisible();

        const addToCartButtons = await page.$$('[data-test^="add-to-cart-"]');

        addToCartButtons[0].click();
        await inventory.delay();

        addToCartButtons[1].click();
        await inventory.delay();

        const value = await inventory.getCartBadgeValue();
        expect(value).toBe('2');
    });

    test('3 Items', async ({ page }) => {
        const inventory = new Inventory(page);

        await inventory.navigate();
        await inventory.isInventoryVisible();

        const addToCartButtons = await page.$$('[data-test^="add-to-cart-"]');

        addToCartButtons[0].click();
        await inventory.delay();

        addToCartButtons[1].click();
        await inventory.delay();

        addToCartButtons[2].click();
        await inventory.delay();

        const value = await inventory.getCartBadgeValue();
        expect(value).toBe('3');
    });

    test('Random Items', async ({ page }) => {
        const inventory = new Inventory(page);

        await inventory.navigate();
        await inventory.isInventoryVisible();

        const addToCartButtons = await page.$$('[data-test^="add-to-cart-"]');

        if (addToCartButtons.length > 0) {
            const shuffled = addToCartButtons.sort(() => Math.random() - 0.5);
            const clicksToMake = Math.max(2, Math.floor(Math.random() * addToCartButtons.length));
            
            for (let i = 0; i < clicksToMake; i++) {
                await shuffled[i].click();
                await inventory.delay();
            }
        } else {
            console.log('No element found to click.');
        }

        const value = await inventory.getCartBadgeValue();
    });
})
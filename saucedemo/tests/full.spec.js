const { test, expect } = require('@playwright/test');
const Index = require('../pages/index');
const Inventory = require('../pages/inventory');
const Cart = require('../pages/cart');
const CheckoutS1 = require('../pages/checkout-s1');
const CheckoutS2 = require('../pages/checkout-s2');
const CheckoutComplete = require('../pages/checkout-complete');

test.describe('Full Tests', () => {
    test('Success Flow', async ({ page }) => {

        const index = new Index(page);
        const inventory = new Inventory(page);
        const cart = new Cart(page);
        const checkoutS1 = new CheckoutS1(page);
        const checkoutS2 = new CheckoutS2(page);
        const checkoutComplete = new CheckoutComplete(page);

        /* on index page */
        await index.navigate();
        await index.login('standard_user', 'secret_sauce');

        /* on inventory page */
        // select 3 random item
        await inventory.isInventoryVisible();

        const addToCartButtons = await page.$$('[data-test^="add-to-cart-"]');

        for (let i = 0; i < 3; i++) {
            await addToCartButtons[i].click();
        }

        await inventory.toCart();

        /* on cart page */
        await cart.isVisible();

        // remove 1 random item
        await cart.removeRandomItem();
        await inventory.delay();

        await cart.toCheckOut()

        /* on checkout 1 page */
        await checkoutS1.isVisible()
        await checkoutS1.fillData("Febriansyah", "PSM, PSO, ISM", "12034");
        await checkoutS1.toContinue()

        /* on checkout 2 page */
        await checkoutS2.isVisible()
        await checkoutS2.toContinue()

        /* on checkout complete page */
        await checkoutComplete.isVisible()
    });

})
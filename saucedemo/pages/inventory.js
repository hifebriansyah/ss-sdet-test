const Index = require('../pages/index');

class Inventory {
  constructor(page) {
    this.page = page;
    this.title = '[data-test="title"]';
    this.menuButton = '[data-test="open-menu"]';
    this.logoutLink = '[data-test="logout-sidebar-link"]';
    this.InventoryDiv = '[data-test="inventory-container"]';
    this.cartBadge = '[data-test="shopping-cart-badge"]';
    this.cartLink = '.shopping_cart_link';
  }

  async navigate() {
    const index = new Index(this.page);
    await index.navigate();
    await index.login('standard_user', 'secret_sauce');
    await this.isVisible();
  }

  async isVisible() {
    await this.page.waitForSelector(this.title, { timeout: 1000 });
  }

  async isInventoryVisible() {
    await this.page.waitForSelector(this.InventoryDiv, { timeout: 2000 });
  }

  async getCartBadgeValue() {
    await this.page.waitForSelector(this.cartBadge, { timeout: 5000 });
    return await this.page.locator(this.cartBadge).textContent();
  }

  async logout() {
    await this.page.locator(this.menuButton).locator('..').click();
    await this.page.click(this.logoutLink);
  }

  async toCart() {
    await this.page.click(this.cartLink);
  }

  async delay() {
      await this.page.waitForTimeout(1000);
  }
}

module.exports = Inventory;

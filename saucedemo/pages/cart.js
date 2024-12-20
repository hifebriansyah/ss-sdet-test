class Cart {
  constructor(page) {
    this.page = page;
    this.title = '[data-test="title"]';
    this.item = '[data-test="inventory-item"]'
    this.checkoutLink = '[data-test="checkout"]'
    this.removeLink = '[data-test^="remove-"]'
  }

  async isVisible() {
    await this.page.waitForSelector(this.title, { timeout: 5000 });
  }

  async removeRandomItem(){
    const randomNum = Math.floor(Math.random() * 3);
    const removeButtons = await this.page.$$(this.removeLink);
    await removeButtons[randomNum].click();
  }

  async toCheckOut() {
    await this.page.click(this.checkoutLink);
  }
}

module.exports = Cart;
class CheckoutComplete {
  constructor(page) {
    this.page = page;
    this.title = '[data-test="title"]';
  }

  async isVisible() {
    await this.page.waitForSelector(this.title, { timeout: 5000 });
  }
}

module.exports = CheckoutComplete;
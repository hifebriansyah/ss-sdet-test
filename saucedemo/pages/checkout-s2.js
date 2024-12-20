class CheckoutS2 {
  constructor(page) {
    this.page = page;
    this.title = '[data-test="title"]';
    this.continueLink = '[data-test="finish"]'
  }

  async isVisible() {
    await this.page.waitForSelector(this.title, { timeout: 5000 });
  }

  async toContinue() {
    await this.page.click(this.continueLink);
  }
}

module.exports = CheckoutS2;
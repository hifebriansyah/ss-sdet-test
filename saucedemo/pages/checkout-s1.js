class CheckoutS1 {
  constructor(page) {
    this.page = page;
    this.title = '[data-test="title"]';
    this.continueLink = '[data-test="continue"]'
    this.firstName =  '[data-test="firstName"]'
    this.lastName =  '[data-test="lastName"]'
    this.postalCode =  '[data-test="postalCode"]'
  }

  async isVisible() {
    await this.page.waitForSelector(this.title, { timeout: 5000 });
  }

  async fillData(firstName, lastName, postalCode){
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.postalCode, postalCode);
  }

  async toContinue() {
    await this.page.click(this.continueLink);
  }
}

module.exports = CheckoutS1;
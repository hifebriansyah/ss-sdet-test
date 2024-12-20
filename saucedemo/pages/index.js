class Index {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[data-test="username"]';
    this.passwordInput = 'input[data-test="password"]';
    this.loginButton = 'input[data-test="login-button"]';
    this.error = 'h3[data-test="error"]'
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async isFailed() {
    await this.page.waitForSelector(this.error, { timeout: 1000 });
  }
}

module.exports = Index;

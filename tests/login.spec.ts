import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PuplitPage } from "../pages/puplit.page";

test.describe("User login to DemoBank", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });

  test(
    "Successful login with valid credentials",
    {
      tag: ["@login", "@smoke"],
      annotation: {
        type: "Happy path",
        description: "Basic happy test for login",
      },
    },
    async ({ page }) => {
      //Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userPassword;
      const expectedUserName = "Jan Demobankowy";

      // Act

      await loginPage.login(userId, userPassword);
      await page.getByTestId("user-name").click();

      // Assert
      const pulpitPage = new PuplitPage(page);

      await expect(pulpitPage.userName).toHaveText(expectedUserName);
    },
  );

  test(
    "Unsuccessful login with invalid credentials - login too short",
    { tag: "@login" },
    async ({ page }) => {
      // Arrange
      const url = "https://demo-bank.vercel.app/index.html";
      const badUserId = "estes";
      const expectedErrorMessage = "identyfikator ma min. 8 znaków";

      // Act
      await loginPage.loginInput.fill(badUserId);
      await loginPage.passwordInput.click();
      await loginPage.loginError.click();

      // Assert
      await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
    },
  );

  test(
    "Unsuccessful login with invalid credentials - password too short",
    { tag: "@login" },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const badPassword = "123123";
      const expectedErrorMessage = "hasło ma min. 8 znaków";

      // Act
      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(badPassword);
      await loginPage.passwordInput.blur();
      await loginPage.passwordError.click();

      // Assert
      await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
    },
  );
});

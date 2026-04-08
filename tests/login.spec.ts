import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("User login to DemoBank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Successful login with valid credentials", async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";

    // Act

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await page.getByTestId("user-name").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("Unsuccessful login with invalid credentials - login too short", async ({
    page,
  }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/index.html";
    const badUserId = "estes";
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(badUserId);
    await page.getByTestId("password-input").click();
    await page.getByTestId("error-login-id").click();

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorMessage,
    );
  });

  test("Unsuccessful login with invalid credentials - password too short", async ({
    page,
  }) => {
    // Arrange
    const userId = loginData.userId;
    const badPassword = "123123";
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(badPassword);
    await page.getByTestId("password-input").blur();
    await page.getByTestId("error-login-password").click();

    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorMessage,
    );
  });
});

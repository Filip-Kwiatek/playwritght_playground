import { test, expect } from "@playwright/test";

test.describe("User login to DemoBank", () => {
  test("Successful login with valid credentials", async ({ page }) => {
    //Arrange
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "tester12";
    const userPassword = "12312312";
    const expectedUserName = "Jan Demobankowy";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
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
    await page.goto(url);
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
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "estes";
    const badPassword = "123123";
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    // Act
    await page.goto(url);
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

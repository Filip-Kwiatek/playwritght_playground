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
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").fill("estes");
    await page.getByTestId("password-input").click();
    await page.getByTestId("error-login-id").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków",
    );
  });

  test("Unsuccessful login with invalid credentials - password too short", async ({
    page,
  }) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").fill("estes");
    await page.getByTestId("password-input").fill("123123");
    await page.getByTestId("password-input").blur();
    await page.getByTestId("error-login-password").click();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków",
    );
  });
});

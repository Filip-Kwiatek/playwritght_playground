import { test, expect } from "@playwright/test";

test.describe("Puplit test", () => {
  test("quick payment with correct data", async ({ page }) => {
    //Arrange
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "tester12";
    const userPassword = "12312312";

    const receiverId = "2";
    const transferAmount = "120";
    const transferTitle = "szmeks";
    const expectedTransferReceiver = "Chuck Demobankowy";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.getByRole("button", { name: "wykonaj" }).click();
    // await page.locator('#execute_btn').click();
    await page.getByTestId("close-button").click();
    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
    // await expect(page.getByRole("link", { name: "Przelew wykonany! Chuck" })).toBeVisible();
  });
  test("successful mobile top-up with correct data", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "tester12";
    const userPassword = "12312312";

    const expectedTopUpReceiver = "500 xxx xxx";
    const topUpAmount = "40";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(expectedTopUpReceiver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.getByText("zapoznałem się z regulaminem").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    // Assert
    // await expect(page.getByRole('link', { name: 'Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx' })).toBeVisible();
    await expect(page.locator("#show_messages")).toHaveText(`Doładowanie wykonane! ${topUpAmount},00PLN na numer ${expectedTopUpReceiver}`,);
    await page.getByTestId("close-button").click();
  });
});

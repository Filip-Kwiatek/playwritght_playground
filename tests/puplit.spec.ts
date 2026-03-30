import { test, expect } from "@playwright/test";

test.describe("Puplit test", () => {
  test.beforeEach(async ({ page }) => {
    const userId = "tester12";
    const userPassword = "12312312";

    await page.goto("/");

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
  });
  test("quick payment with correct data", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "120";
    const transferTitle = "szmeks";
    const expectedTransferReceiver = "Chuck Demobankowy";

    // Act
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
    const expectedTopUpReceiver = "500 xxx xxx";
    const topUpAmount = "40";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${expectedTopUpReceiver}`;

    // Act
    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(expectedTopUpReceiver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.getByText("zapoznałem się z regulaminem").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    // Assert
    // await expect(page.getByRole('link', { name: 'Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx' })).toBeVisible();
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
    await page.getByTestId("close-button").click();
  });

  test("correct balance after successful mobile top-up with correct data", async ({
    page,
  }) => {
    // Arrange
    const expectedTopUpReceiver = "500 xxx xxx";
    const topUpAmount = "40";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${expectedTopUpReceiver}`;
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    // Act
    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(expectedTopUpReceiver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.getByText("zapoznałem się z regulaminem").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    // Assert
    // await expect(page.getByRole('link', { name: 'Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx' })).toBeVisible();
    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
    await page.getByTestId("close-button").click();
  });
});

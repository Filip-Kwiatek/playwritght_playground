import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PuplitPage } from "../pages/puplit.page";

test.describe("Puplit test", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test("quick payment with correct data", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "120";
    const transferTitle = "szmeks";
    const expectedTransferReceiver = "Chuck Demobankowy";

    // Act
    const puplitPage = new PuplitPage(page);
    await puplitPage.transferReceiver.selectOption(receiverId);
    await puplitPage.transferAmount.fill(transferAmount);
    await puplitPage.transferTitle.fill(transferTitle);

    await puplitPage.executreTransferButton.click();
    await puplitPage.closeButton.click();

    // Assert
    await expect(puplitPage.textShowMessages).toHaveText(
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
    const puplitPage = new PuplitPage(page);
    await puplitPage.widgetTopUpReceiver.selectOption(expectedTopUpReceiver);
    await puplitPage.widgetTopUpAmount.fill(topUpAmount);
    await puplitPage.widgetTopUpRegulationCheckbox.click();
    await puplitPage.widgetTopUpButton.click();

    // Assert
    await expect(puplitPage.textShowMessages).toHaveText(expectedMessage);
    await puplitPage.closeButton.click();
  });

  test("correct balance after successful mobile top-up with correct data", async ({
    page,
  }) => {
    // Arrange
    const puplitPage = new PuplitPage(page);
    const expectedTopUpReceiver = "500 xxx xxx";
    const topUpAmount = "40";
    const initialBalance = await puplitPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    // Act

    await puplitPage.widgetTopUpReceiver.selectOption(expectedTopUpReceiver);
    await puplitPage.widgetTopUpAmount.fill(topUpAmount);
    await puplitPage.widgetTopUpRegulationCheckbox.click();
    await puplitPage.widgetTopUpButton.click();
    // await page.locator("#widget_1_topup_receiver").selectOption(expectedTopUpReceiver);
    // await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    // await page.getByText("zapoznałem się z regulaminem").click();
    // await page.getByRole("button", { name: "doładuj telefon" }).click();

    // Assert
    // await expect(page.getByRole('link', { name: 'Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx' })).toBeVisible();
    await expect(puplitPage.moneyValue).toHaveText(`${expectedBalance}`);
    await puplitPage.closeButton.click();
  });
});

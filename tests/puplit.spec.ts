import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PuplitPage } from "../pages/puplit.page";

test.describe("Puplit test", () => {
  let puplitPage: PuplitPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");

    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    puplitPage = new PuplitPage(page);
  });
  test("quick payment with correct data", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "120";
    const transferTitle = "szmeks";
    const expectedTransferReceiver = "Chuck Demobankowy";

    // Act
    await puplitPage.quickPaymentWithCorrectData(receiverId, transferAmount, transferTitle);

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
    await puplitPage.successfulMobileTopUp(expectedTopUpReceiver, topUpAmount);

    // Assert
    await expect(puplitPage.textShowMessages).toHaveText(expectedMessage);
    await puplitPage.closeButton.click();
  });

  test("correct balance after successful mobile top-up with correct data", async ({
    page,
  }) => {
    // Arrange
    const expectedTopUpReceiver = "500 xxx xxx";
    const topUpAmount = "40";
    const initialBalance = await puplitPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    // Act

    await puplitPage.successfulMobileTopUp(expectedTopUpReceiver, topUpAmount);

    // Assert
    await expect(puplitPage.moneyValue).toHaveText(`${expectedBalance}`);
    await puplitPage.closeButton.click();
  });
});
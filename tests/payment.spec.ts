import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PuplitPage } from "../pages/puplit.page";

test.describe("Payment test", () => {
  let paymentPage: PaymentPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");

    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const puplitPage = new PuplitPage(page);
    await puplitPage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);

  });
  test("simple payment", async ({ page }) => {
    // Arrange
    const exportReceiver = "Jan Nowak";
    const transferAccount = "12 3456 7890 1234 5678 9012 34568";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${exportReceiver}`;
    // Act
    await paymentPage.transferReceiver.fill(exportReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.paymentButtonTransfer.click();
    await paymentPage.paymentCloseButton.click();

    // Assert
    await expect(paymentPage.paymentText).toHaveText(expectedMessage);
  });
});

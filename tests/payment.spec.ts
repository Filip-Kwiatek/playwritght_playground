import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Payment test", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await page.getByRole("link", { name: "płatności" }).click();
  });
  test("simple payment", async ({ page }) => {
    // Arrange
    const exportReceiver = "Jan Nowak";
    const transferAccount = "12 3456 7890 1234 5678 9012 34568";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${exportReceiver}`;
    // Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiver.fill(exportReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.paymentButton.click();
    await paymentPage.paymentCloseButton.click();

    // Assert
    await expect(paymentPage.paymentText).toHaveText(expectedMessage);
  });
});

import { test, expect } from "@playwright/test";

test.describe("Puplit test", () => {
  test("quick payment with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").fill("12312312");
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("120");
    await page.locator("#widget_1_transfer_title").fill("szmeks");
    await page.getByRole("button", { name: "wykonaj" }).click();
    // await page.locator('#execute_btn').click();
    await page.getByTestId("close-button").click();
    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 120,00PLN - szmeks",
    );
    // await expect(page.getByRole("link", { name: "Przelew wykonany! Chuck" })).toBeVisible();
  });
  test("successful mobile top-up with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").fill("12312312");
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("40");
    await page.getByText("zapoznałem się z regulaminem").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await expect(page.locator("#show_messages")).toHaveText("Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx",);
    // await expect(page.getByRole('link', { name: 'Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx' })).toBeVisible();
    await page.getByTestId("close-button").click();
  });
});

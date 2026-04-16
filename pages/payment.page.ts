import { Locator, Page } from "@playwright/test";

export class PaymentPage {
  paymentButton: Locator;

  transferReceiver: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  paymentButtonTransfer: Locator;
  paymentCloseButton: Locator;
  paymentText: Locator;

  constructor(private page: Page) {
    this.paymentButton = this.page.getByRole("link", { name: "płatności" });

    this.transferReceiver = this.page.getByTestId("transfer_receiver");
    this.transferAccount = this.page.getByTestId("form_account_to");
    this.transferAmount = this.page.getByTestId("form_amount");
    this.paymentButtonTransfer = this.page.getByRole("button", {
      name: "wykonaj przelew",
    });
    this.paymentCloseButton = this.page.getByTestId("close-button");
    this.paymentText = this.page.locator("#show_messages");
  }
  async makeTransfer(
    exportReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiver.fill(exportReceiver);
    await this.transferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);

    await this.paymentButtonTransfer.click();
    await this.paymentCloseButton.click();
  }
}

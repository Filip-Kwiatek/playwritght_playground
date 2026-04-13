import { Locator, Page } from "@playwright/test";

export class PaymentPage {
  transferReceiver: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  paymentButton: Locator;
  paymentCloseButton: Locator;
  paymentText: Locator;
  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId("transfer_receiver");
    this.transferAccount = this.page.getByTestId("form_account_to");
    this.transferAmount = this.page.getByTestId("form_amount");
    this.paymentButton = this.page.getByRole("button", {
      name: "wykonaj przelew",
    });
    this.paymentCloseButton = this.page.getByTestId("close-button");
    this.paymentText = this.page.locator("#show_messages");
  }
}

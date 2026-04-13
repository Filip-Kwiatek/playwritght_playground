import { Locator, Page } from "@playwright/test";

export class PuplitPage {
    transferReceiver: Locator;
    transferAmount: Locator;
    transferTitle: Locator;
    executreTransferButton: Locator;
    closeButton: Locator;
    textShowMessages: Locator;

    widgetTopUpReceiver: Locator;
    widgetTopUpAmount: Locator
    widgetTopUpRegulationCheckbox: Locator;
    widgetTopUpButton: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator("#widget_1_transfer_receiver");
    this.transferAmount = this.page.locator("#widget_1_transfer_amount");
    this.transferTitle = this.page.locator("#widget_1_transfer_title");
    this.executreTransferButton = this.page.locator('#execute_btn');
    this.closeButton = this.page.getByTestId("close-button");
    this.textShowMessages = this.page.locator("#show_messages");

    this.widgetTopUpReceiver = this.page.locator("#widget_1_topup_receiver");
    this.widgetTopUpAmount = this.page.locator("#widget_1_topup_amount");
    this.widgetTopUpRegulationCheckbox = this.page.getByText("zapoznałem się z regulaminem");
    this.widgetTopUpButton = this.page.getByRole("button", { name: "doładuj telefon" });
  }
}

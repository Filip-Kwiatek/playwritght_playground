import { Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PuplitPage {
  sideMenu: SideMenuComponent;

  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  executreTransferButton: Locator;
  closeButton: Locator;
  textShowMessages: Locator;

  widgetTopUpReceiver: Locator;
  widgetTopUpAmount: Locator;
  widgetTopUpRegulationCheckbox: Locator;
  widgetTopUpButton: Locator;

  moneyValue: Locator;

  userName: Locator;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);

    this.transferReceiver = this.page.locator("#widget_1_transfer_receiver");
    this.transferAmount = this.page.locator("#widget_1_transfer_amount");
    this.transferTitle = this.page.locator("#widget_1_transfer_title");
    this.executreTransferButton = this.page.locator("#execute_btn");
    this.closeButton = this.page.getByTestId("close-button");
    this.textShowMessages = this.page.locator("#show_messages");

    this.widgetTopUpReceiver = this.page.locator("#widget_1_topup_receiver");
    this.widgetTopUpAmount = this.page.locator("#widget_1_topup_amount");
    this.widgetTopUpRegulationCheckbox = this.page.locator(
      "#uniform-widget_1_topup_agreement span",
    );
    this.widgetTopUpButton = this.page.getByRole("button", {
      name: "doładuj telefon",
    });

    this.moneyValue = this.page.locator("#money_value");

    this.userName = this.page.getByTestId("user-name");
  }
}

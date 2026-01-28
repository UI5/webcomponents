import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import NotificationListItem from "../../../src/NotificationListItem.js";
import NotificationList from "../../../src/NotificationList.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";

describe("Event bubbling", () => {
	before(() => {
		cy.wrap({ setAnimationMode })
			.invoke("setAnimationMode", AnimationMode.None);
	})

	it("test bubbling events", () => {
		cy.mount(
			<div id="app">
				<Dialog id="myDialog" headerText="Dialog">
					<NotificationList id="myNotList" header-text="Notifications">
						<NotificationListItem id="myNotItem" show-close
							title-text="Single line notification."
							state="Information">
								<span slot="footnotes">Office Notifications</span>
								<span slot="footnotes">3 Days</span>
						</NotificationListItem>
					</NotificationList>
				</Dialog>
			</div>
		);

		cy.get("#app")
			.as("app");

		cy.get("[ui5-dialog]")
			.as("dialog");

		cy.get("[ui5-notification-list]")
			.as("notificationList");

		cy.get("[ui5-li-notification]")
			.as("notificationListItem");

		cy.get("@app")
			.then(app => {
				app.get(0).addEventListener("ui5-close", cy.stub().as("appClosed"));
			});

		cy.get("@dialog")
			.then(dialog => {
				dialog.get(0).addEventListener("ui5-close", cy.stub().as("dialogClosed"));
			});

		cy.get("@notificationList")
			.then(notificationList => {
				notificationList.get(0).addEventListener("ui5-close", cy.stub().as("notListClosed"));
			});

		cy.get("@notificationListItem")
			.then(notificationListItem => {
				notificationListItem.get(0).addEventListener("ui5-close", cy.stub().as("notListItemClosed"));
			});

		cy.get("@dialog").invoke("attr", "open", true);

		// act - close NotificationListItem
		cy.get("@notificationListItem")
			.shadow()
			.find(".ui5-nli-close-btn")
			.realClick();

		// assert - the close event of the NotificationListItem does not bubble
		cy.get("@notListItemClosed")
			.should("have.been.calledOnce");
		cy.get("@notListClosed")
			.should("have.been.not.called");
		cy.get("@dialogClosed")
			.should("have.been.not.called");
		cy.get("@appClosed")
			.should("have.been.not.called");
	});
});

import UserSettingsDialog from "../../src/UserSettingsDialog.js";
import UserSettingsItem from "../../src/UserSettingsItem.js";
import UserSettingsView from "../../src/UserSettingsView.js";
import UserSettingsNotificationsView from "../../src/UserSettingsNotificationsView.js";
import UserSettingsNotificationsViewGroup, { isInstanceOfUserSettingsNotificationsViewGroup } from "../../src/UserSettingsNotificationsViewGroup.js";
import UserSettingsNotificationsViewItem, { isInstanceOfUserSettingsNotificationsViewItem } from "../../src/UserSettingsNotificationsViewItem.js";
import MessageStrip from "@ui5/webcomponents/dist/MessageStrip.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";

describe("Notifications view", () => {
	it("renders the view with no items", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").should("exist");
		cy.get("[ui5-user-settings-notifications-view]").shadow().find("[ui5-list]").should("exist");
	});

	it("renders items with title, byline and switch", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem
						itemKey="successfactors"
						text="SuccessFactors"
						bylineText="Compensation | Learning | HR"
						checked
						navigable
					/>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").should("have.attr", "text", "SuccessFactors");
		cy.get("@item").should("have.attr", "byline-text", "Compensation | Learning | HR");
		cy.get("@item").should("have.attr", "checked");
		cy.get("@item").should("have.attr", "navigable");

		cy.get("@item").shadow().find(".ui5-user-settings-notifications-item-title").contains("SuccessFactors");
		cy.get("@item").shadow().find(".ui5-user-settings-notifications-item-byline").contains("Compensation | Learning | HR");
		cy.get("@item").shadow().find("[ui5-switch]").should("exist");
		cy.get("@item").shadow().find("[ui5-switch]").should("have.attr", "checked");
		cy.get("@item").shadow().find("[ui5-icon][name=\"slim-arrow-right\"]").should("exist");
	});

	it("renders items without arrow when not navigable", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" checked />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").shadow().find("[ui5-icon][name=\"slim-arrow-right\"]").should("not.exist");
	});

	it("fires switch-change event when the switch is toggled", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").then($item => {
			$item.get(0).addEventListener("switch-change", cy.stub().as("switchChanged"));
		});

		cy.get("@item").shadow().find("[ui5-switch]").click();
		cy.get("@switchChanged").should("have.been.calledOnce");
	});

	it("fires item-click on the view only for navigable items", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Navigable" navigable />
					<UserSettingsNotificationsViewItem text="Static" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("@view").then($view => {
			$view.get(0).addEventListener("item-click", cy.stub().as("itemClick"));
		});

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("@itemClick").should("have.been.calledOnce");
		cy.get("@itemClick").then((stub: any) => {
			const call = stub.getCall(0);
			expect(call.args[0].detail.item.text).to.equal("Navigable");
		});

		cy.get("[ui5-user-settings-notifications-view-item]").eq(1).click();
		cy.get("@itemClick").should("have.been.calledOnce");
	});

	it("renders groups with items", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewGroup headerText="Sales">
						<UserSettingsNotificationsViewItem text="Sales Order Updates" checked />
						<UserSettingsNotificationsViewItem text="Sales Order Approvals" checked />
					</UserSettingsNotificationsViewGroup>
					<UserSettingsNotificationsViewGroup headerText="Purchasing">
						<UserSettingsNotificationsViewItem text="Purchase Order Approval" checked />
					</UserSettingsNotificationsViewGroup>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-group]").should("have.length", 2);
		cy.get("[ui5-user-settings-notifications-view-item]").should("have.length", 3);
	});

	it("renders additionalContent slot above the list", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<MessageStrip slot="additionalContent" id="ns-info" design="Information" hideCloseButton>
						Some settings are managed by your organization.
					</MessageStrip>
					<UserSettingsNotificationsViewItem text="Allow Notifications" checked />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("@view").find("#ns-info").should("exist");
	});

	it("renders endContent slot instead of the switch and does not fire switch-change", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Frequency">
						<Select slot="endContent" id="freq-select">
							<Option selected>Daily</Option>
							<Option>Weekly</Option>
						</Select>
					</UserSettingsNotificationsViewItem>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").shadow().find("[ui5-switch]").should("not.exist");
		cy.get("@item").find("#freq-select").should("exist");

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("@item").then($item => {
			$item.get(0).addEventListener("switch-change", cy.stub().as("itemSwitchChange"));
		});
		cy.get("@view").then($view => {
			$view.get(0).addEventListener("switch-change", cy.stub().as("viewSwitchChange"));
		});

		cy.get("#freq-select").click();
		cy.get("#freq-select").find("[ui5-option]").eq(1).click();

		cy.get("@itemSwitchChange").should("not.have.been.called");
		cy.get("@viewSwitchChange").should("not.have.been.called");
	});

	it("does not navigate to the secondary view when item-click is prevented", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Navigable" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsView slot="pages" text="Details" id="details-page" secondary>
					<span>secondary content</span>
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("@view").then($view => {
			$view.get(0).addEventListener("item-click", (e: Event) => {
				e.preventDefault();
			});
			$view.get(0).addEventListener("item-click", cy.stub().as("itemClick"));
		});

		cy.get("[ui5-user-settings-notifications-view-item]").click();

		cy.get("@itemClick").should("have.been.calledOnce");
		cy.get("#details-page").should("not.have.attr", "selected");
	});

	it("getItemByKey returns the matching item", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="allow" text="Allow Notifications" />
					<UserSettingsNotificationsViewGroup headerText="Sales">
						<UserSettingsNotificationsViewItem itemKey="sales-updates" text="Sales Order Updates" />
						<UserSettingsNotificationsViewItem itemKey="sales-approvals" text="Sales Order Approvals" />
					</UserSettingsNotificationsViewGroup>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").then($view => {
			const view = $view.get(0) as UserSettingsNotificationsView;
			const item = view.getItemByKey("sales-approvals");
			expect(item).to.exist;
			expect(item!.text).to.equal("Sales Order Approvals");

			const rootItem = view.getItemByKey("allow");
			expect(rootItem).to.exist;
			expect(rootItem!.text).to.equal("Allow Notifications");

			expect(view.getItemByKey("missing")).to.be.undefined;
		});
	});

	it("getAllItems returns a flat list including grouped items", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
					<UserSettingsNotificationsViewGroup headerText="Sales">
						<UserSettingsNotificationsViewItem text="Sales Order Updates" />
						<UserSettingsNotificationsViewItem text="Sales Order Approvals" />
					</UserSettingsNotificationsViewGroup>
					<UserSettingsNotificationsViewGroup headerText="Purchasing">
						<UserSettingsNotificationsViewItem text="Purchase Order Approval" />
					</UserSettingsNotificationsViewGroup>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").then($view => {
			const view = $view.get(0) as UserSettingsNotificationsView;
			const all = view.getAllItems();
			expect(all).to.have.length(4);
			expect(all.map(i => i.text)).to.deep.equal([
				"Allow Notifications",
				"Sales Order Updates",
				"Sales Order Approvals",
				"Purchase Order Approval",
			]);
		});
	});

	it("routes to the secondary view whose id matches the clicked item's itemKey", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="one" text="One" navigable />
					<UserSettingsNotificationsViewItem itemKey="two" text="Two" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="one" secondary text="One detail page">
					<UserSettingsNotificationsViewItem text="One detail" />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="two" secondary text="Two detail page">
					<UserSettingsNotificationsViewItem text="Two detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("#one").should("have.attr", "selected");
		cy.get("#one").should("have.attr", "text", "One detail page");
		cy.get("#two").should("not.have.attr", "selected");
	});

	it("falls back to the first secondary view when no id matches", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="unknown-key" text="Any" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="fallback" secondary>
					<UserSettingsNotificationsViewItem text="Fallback detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("#fallback").should("have.attr", "selected");
		cy.get("#fallback").should("have.attr", "text", "Any");
	});

	it("does not move focus on mouse drill-in (no lingering ring for mouse users)", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="detail" text="Open" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="detail" secondary>
					<UserSettingsNotificationsViewItem text="First item in secondary" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("#detail").should("have.attr", "selected");
		// Mouse-triggered drill-in should NOT auto-focus the back button.
		cy.get("[ui5-user-settings-item]").shadow()
			.find(".ui5-user-settings-item-collapse-btn")
			.should("not.be.focused");
	});
});

describe("Notifications view item", () => {
	it("reflects the itemKey attribute", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="allow" text="Allow" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").should("have.attr", "item-key", "allow");
	});

	it("does not render the title span when text is empty", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find(".ui5-user-settings-notifications-item-title").should("not.exist");
	});

	it("does not set the has-byline class when bylineText is empty", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find(".ui5-user-settings-notifications-item")
			.should("not.have.class", "has-byline");
	});

	it("sets the has-byline class when bylineText is present", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" bylineText="Manage notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find(".ui5-user-settings-notifications-item.has-byline").should("exist");
	});

	it("reflects the initial checked state on the internal switch", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow" checked />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-switch]").should("have.attr", "checked");

		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-switch]").should("not.have.attr", "checked");
	});

	it("sets the accessible name of the switch to the text when no byline", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Foo" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-switch]").should("have.attr", "accessible-name", "Foo");
	});

	it("sets the accessible name of the switch to text and byline when byline is present", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Foo" bylineText="Bar" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-switch]").should("have.attr", "accessible-name", "Foo Bar");
	});

	it("fires switch-change with the item and checked flag in detail", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").then($item => {
			$item.get(0).addEventListener("switch-change", cy.stub().as("switchChanged"));
		});

		cy.get("@item").shadow().find("[ui5-switch]").click();
		cy.get("@switchChanged").should("have.been.calledOnce");
		cy.get("@item").then($item => {
			cy.get("@switchChanged").then((stub: any) => {
				const call = stub.getCall(0);
				expect(call.args[0].detail.item).to.equal($item.get(0));
				expect(call.args[0].detail.checked).to.be.a("boolean");
			});
		});
	});

	it("bubbles switch-change to a wrapping parent element", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<div id="wrapper">
						<UserSettingsNotificationsViewItem text="Allow Notifications" />
					</div>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("#wrapper").then($wrapper => {
			$wrapper.get(0).addEventListener("switch-change", cy.stub().as("outerSwitchChanged"));
		});

		cy.get("[ui5-user-settings-notifications-view-item]").shadow().find("[ui5-switch]").click();
		cy.get("@outerSwitchChanged").should("have.been.calledOnce");
	});

	it("isInstanceOfUserSettingsNotificationsViewItem identifies items correctly", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").then($item => {
			expect(isInstanceOfUserSettingsNotificationsViewItem($item.get(0))).to.be.true;
			const div = document.createElement("div");
			expect(isInstanceOfUserSettingsNotificationsViewItem(div)).to.be.false;
		});
	});

	it("renders switch when endContent is empty and hides it when endContent is provided", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-switch]").should("exist");

		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Frequency">
						<Select slot="endContent" id="freq-select">
							<Option selected>Daily</Option>
							<Option>Weekly</Option>
						</Select>
					</UserSettingsNotificationsViewItem>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-switch]").should("not.exist");
		cy.get("[ui5-user-settings-notifications-view-item]").find("#freq-select").should("exist");
	});

	it("renders a slim-arrow-right icon when navigable", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Open" navigable />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-icon][name=\"slim-arrow-right\"]").should("exist");
	});

	it("does not render a slim-arrow-right icon when not navigable", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find("[ui5-icon][name=\"slim-arrow-right\"]").should("not.exist");
	});

	it("updates the title when text is changed programmatically", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Original" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").then($item => {
			const item = $item.get(0) as UserSettingsNotificationsViewItem;
			item.text = "Updated";
		});

		cy.get("[ui5-user-settings-notifications-view-item]").shadow()
			.find(".ui5-user-settings-notifications-item-title").should("contain.text", "Updated");
	});
});

describe("Notifications view — event forwarding", () => {
	it("re-fires switch-change at the view level with {item, checked}", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("[ui5-user-settings-notifications-view-item]").as("item");

		cy.get("@view").then($view => {
			$view.get(0).addEventListener("switch-change", cy.stub().as("viewSwitchChange"));
		});

		cy.get("@item").shadow().find("[ui5-switch]").click();

		cy.get("@viewSwitchChange").should("have.been.calledOnce");
		cy.get("@viewSwitchChange").then((stub: any) => {
			const call = stub.getCall(0);
			cy.get("@item").then($item => {
				expect(call.args[0].detail.item).to.equal($item.get(0));
			});
			expect(call.args[0].detail.checked).to.equal(true);
		});
	});

	it("does not fire item-click on the view for non-navigable items", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Static" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("@view").then($view => {
			$view.get(0).addEventListener("item-click", cy.stub().as("itemClick"));
		});

		cy.get("[ui5-user-settings-notifications-view-item]").click();

		cy.get("@itemClick").should("not.have.been.called");
	});

	it("fires item-click only for the navigable clicked item", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Static" />
					<UserSettingsNotificationsViewItem text="Navigable" navigable />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("@view").then($view => {
			$view.get(0).addEventListener("item-click", cy.stub().as("itemClick"));
		});

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("[ui5-user-settings-notifications-view-item]").eq(1).click();

		cy.get("@itemClick").should("have.been.calledOnce");
		cy.get("@itemClick").then((stub: any) => {
			const call = stub.getCall(0);
			expect(call.args[0].detail.item.text).to.equal("Navigable");
		});
	});

	it("item-click event is cancelable", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Navigable" navigable />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").as("view");
		cy.get("@view").then($view => {
			$view.get(0).addEventListener("item-click", cy.stub().as("itemClick"));
		});

		cy.get("[ui5-user-settings-notifications-view-item]").click();

		cy.get("@itemClick").should("have.been.calledOnce");
		cy.get("@itemClick").then((stub: any) => {
			const call = stub.getCall(0);
			expect(call.args[0].cancelable).to.be.true;
		});
	});
});

describe("Notifications view group", () => {
	it("renders items inside a group", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewGroup headerText="Sales">
						<UserSettingsNotificationsViewItem text="Sales Order Updates" />
						<UserSettingsNotificationsViewItem text="Sales Order Approvals" />
						<UserSettingsNotificationsViewItem text="Sales Order Rejections" />
					</UserSettingsNotificationsViewGroup>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-group]").as("group");
		cy.get("@group").should("have.attr", "header-text", "Sales");
		cy.get("@group").find("[ui5-user-settings-notifications-view-item]").should("have.length", 3);
	});

	it("isInstanceOfUserSettingsNotificationsViewGroup returns true for the group and false for a plain div", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewGroup headerText="Sales">
						<UserSettingsNotificationsViewItem text="Sales Order Updates" />
					</UserSettingsNotificationsViewGroup>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-group]").then($group => {
			expect(isInstanceOfUserSettingsNotificationsViewGroup($group.get(0))).to.equal(true);
			const div = document.createElement("div");
			expect(isInstanceOfUserSettingsNotificationsViewGroup(div)).to.equal(false);
		});
	});

	it("getAllItems on the view includes items from all groups plus non-grouped items", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewGroup headerText="Sales">
						<UserSettingsNotificationsViewItem text="Sales Order Updates" />
						<UserSettingsNotificationsViewItem text="Sales Order Approvals" />
					</UserSettingsNotificationsViewGroup>
					<UserSettingsNotificationsViewGroup headerText="Purchasing">
						<UserSettingsNotificationsViewItem text="Purchase Order Approval" />
						<UserSettingsNotificationsViewItem text="Purchase Order Rejection" />
					</UserSettingsNotificationsViewGroup>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").then($view => {
			const view = $view.get(0) as UserSettingsNotificationsView;
			expect(view.getAllItems().length).to.equal(5);
		});
	});

	it("reflects the headerText attribute", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewGroup headerText="Sales">
						<UserSettingsNotificationsViewItem text="Sales Order Updates" />
					</UserSettingsNotificationsViewGroup>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-group]").should("have.attr", "header-text", "Sales");
	});
});

describe("Notifications view — drill-in edge cases", () => {
	it("keeps the target view's own text when the target was matched by itemKey", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="specific" text="Clicked item" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="specific" secondary text="Preserved title">
					<UserSettingsNotificationsViewItem text="Detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("#specific").should("have.attr", "selected");
		cy.get("#specific").should("have.attr", "text", "Preserved title");
	});

	it("uses the clicked item's text when the target was the fallback view — and updates on subsequent clicks", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView id="primary">
					<UserSettingsNotificationsViewItem itemKey="first" text="First" navigable />
					<UserSettingsNotificationsViewItem itemKey="second" text="Second" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="fallback" secondary>
					<UserSettingsNotificationsViewItem text="Detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("#fallback").should("have.attr", "text", "First");

		// Simulate back navigation before triggering the second drill-in.
		cy.get("#fallback").invoke("removeAttr", "selected");
		cy.get("#primary").invoke("attr", "selected", "");

		cy.get("[ui5-user-settings-notifications-view-item]").eq(1).click();
		cy.get("#fallback").should("have.attr", "text", "Second");
	});

	it("does not drill in when the switch of a navigable item is clicked", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="drill" text="Row" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="drill" secondary>
					<UserSettingsNotificationsViewItem text="Detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).shadow()
			.find("[ui5-switch]").click();
		cy.get("#drill").should("not.have.attr", "selected");
	});

	it("deselects the primary view when drilling into a secondary view", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView id="primary" selected>
					<UserSettingsNotificationsViewItem itemKey="target" text="Open" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="target" secondary>
					<UserSettingsNotificationsViewItem text="Detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("#target").should("have.attr", "selected");
		cy.get("#primary").should("not.have.attr", "selected");
	});

	it("does not drill in when clicking inside the endContent slot on a navigable item", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="drill" text="Row" navigable>
						<Select slot="endContent" id="end-select">
							<Option selected>Daily</Option>
							<Option>Weekly</Option>
						</Select>
					</UserSettingsNotificationsViewItem>
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="drill" secondary>
					<UserSettingsNotificationsViewItem text="Detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("#end-select").click();
		cy.get("#drill").should("not.have.attr", "selected");
	});

	it("clicking the navigation arrow drills into the secondary view", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="drill" text="Row" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="drill" secondary>
					<UserSettingsNotificationsViewItem text="Detail" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).shadow()
			.find("[ui5-icon][name=\"slim-arrow-right\"]").click();
		cy.get("#drill").should("have.attr", "selected");
	});

	it("does not drill in when there are no secondary sibling views", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="drill" text="Row" navigable />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view]").then($view => {
			$view.get(0).addEventListener("item-click", cy.stub().as("itemClick"));
		});

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).click();
		cy.get("[ui5-user-settings-notifications-view]").should("not.have.attr", "selected");
	});
});

describe("Notifications view item — checked state", () => {
	it("updates checked on the item after the switch is toggled", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").shadow().find("[ui5-switch]").click();
		cy.get("@item").should("have.attr", "checked");

		cy.get("@item").shadow().find("[ui5-switch]").click();
		cy.get("@item").should("not.have.attr", "checked");
	});

	it("switch-change detail.checked matches the new item.checked state", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").then($item => {
			$item.get(0).addEventListener("switch-change", cy.stub().as("changed"));
		});

		cy.get("@item").shadow().find("[ui5-switch]").click();
		cy.get("@changed").then((stub: any) => {
			const call = stub.getCall(0);
			expect(call.args[0].detail.checked).to.be.true;
			cy.get("@item").then($item => {
				expect(($item.get(0) as UserSettingsNotificationsViewItem).checked).to.be.true;
			});
		});
	});
});

describe("Notifications view item — keyboard interaction (ACC)", () => {
	it("Space on the focused row toggles the switch and fires switch-change", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").then($item => {
			$item.get(0).addEventListener("switch-change", cy.stub().as("changed"));
		});

		cy.get("@item").shadow().find("li").focus();
		cy.realPress("Space");

		cy.get("@changed").should("have.been.calledOnce");
		cy.get("@item").should("have.attr", "checked");
	});

	it("Space on row toggles switch back to unchecked", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Allow Notifications" checked />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").then($item => {
			$item.get(0).addEventListener("switch-change", cy.stub().as("changed"));
		});

		cy.get("@item").shadow().find("li").focus();
		cy.realPress("Space");

		cy.get("@changed").should("have.been.calledOnce");
		cy.get("@item").should("not.have.attr", "checked");
	});

	it("Space on row does not fire switch-change when endContent is present", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem text="Frequency">
						<Select slot="endContent" id="freq-select">
							<Option selected>Daily</Option>
						</Select>
					</UserSettingsNotificationsViewItem>
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").as("item");
		cy.get("@item").then($item => {
			$item.get(0).addEventListener("switch-change", cy.stub().as("changed"));
		});

		cy.get("@item").shadow().find("li").focus();
		cy.realPress("Space");

		cy.get("@changed").should("not.have.been.called");
	});

	it("Enter on a navigable row drills into the secondary view and focuses content", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Notifications">
				<UserSettingsNotificationsView>
					<UserSettingsNotificationsViewItem itemKey="detail" text="Open" navigable />
				</UserSettingsNotificationsView>
				<UserSettingsNotificationsView id="detail" secondary>
					<UserSettingsNotificationsViewItem text="Detail item" />
				</UserSettingsNotificationsView>
			</UserSettingsItem>
		</UserSettingsDialog>);

		cy.get("[ui5-user-settings-notifications-view-item]").eq(0).shadow().find("li").focus();
		cy.realPress("Enter");

		cy.get("#detail").should("have.attr", "selected");
		cy.get("[ui5-user-settings-item]").should("include.focused");
	});
});


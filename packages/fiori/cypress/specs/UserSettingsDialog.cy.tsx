import UserSettingsItem from "../../src/UserSettingsItem.js";
import UserSettingsView from "../../src/UserSettingsView.js";
import UserSettingsAccountView from "../../src/UserSettingsAccountView.js";
import UserSettingsAppearanceView from "../../src/UserSettingsAppearanceView.js";
import UserSettingsAppearanceViewItem from "../../src/UserSettingsAppearanceViewItem.js";
import UserSettingsAppearanceViewGroup from "../../src/UserSettingsAppearanceViewGroup.js";
import UserMenuAccount from "../../src/UserMenuAccount.js";
import UserSettingsDialog from "../../src/UserSettingsDialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import {USER_SETTINGS_ACCOUNT_MANAGE_ACCOUNT_BUTTON_TXT} from "../../src/generated/i18n/i18n-defaults.js";

describe("Initial rendering", () => {
	it("tests no config provided", () => {
		cy.mount(<UserSettingsDialog open>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-toolbar]").as("toolbar");
		cy.get("@toolbar").should("exist");
		cy.get("@toolbar").find("[ui5-toolbar-button]").should("have.length", 1);
		cy.get("@dialog").find("div").should("have.class", "ui5-user-settings-content");
		cy.get("@dialog").find("div").should("have.class", "ui5-user-settings-side");
	});

	it("tests header-text provided", () => {
		cy.mount(<UserSettingsDialog headerText="Settings" open>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-title]").contains("Settings");
		cy.get("@dialog").find("[ui5-title]").should("have.length", 1);
	});

	it("tests show-search-field provided", () => {
		cy.mount(<UserSettingsDialog showSearchField open>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-input]").should("have.length", 1);
		cy.get("@dialog").find("[ui5-input]").should("have.attr", "placeholder", "Search");
	});

	it("tests setting item no config", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView>
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingView");
		cy.get("@settingView").should("exist");
	});

	it("tests fixed setting item no config", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem slot="fixedItems" selected>
				<UserSettingsView>
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingView");
		cy.get("@settingView").should("exist");
	});

	it("tests setting with button", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView>
					<Button>Setting 3 Content 1</Button>
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingView");
		cy.get("@settingView").should("exist");
		cy.get("@settingView").find("[ui5-button]").should("have.length", 1);
		cy.get("@settingView").find("[ui5-button]").contains("Setting 3 Content 1");
	});

	it("tests setting text", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Setting">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").should("have.attr", "text", "Setting");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingView");
		cy.get("@settingView").should("exist");
		cy.get("@settingView").should("have.attr", "text", "Setting1");
	});

	it("tests setting tooltip", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Setting" tooltip="Setting tooltip">
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").should("have.attr", "text", "Setting");
		cy.get("@settingItem").should("have.attr", "tooltip", "Setting tooltip");
	});

	it("tests setting icon", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem icon="accessibility">
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").should("have.attr", "icon", "accessibility");
	});

	it('tests setting no icon', () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem icon="" text="Setting with no icon">
			</UserSettingsItem>
			<UserSettingsItem icon="bell" text="Setting with bell icon">
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").should("have.attr", "icon", "");
		cy.get("@settings").shadow().find("[ui5-li].ui5-user-settings-item-no-icon").should("exist");
		cy.get("@settings").shadow().find("[ui5-li].ui5-user-settings-item-no-icon").should("not.have.attr", "icon");
	});

	it('tests when all settings does not have icon we do not add css class', () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem icon="" text="Setting with no icon">
			</UserSettingsItem>
			<UserSettingsItem icon="" text="Second Setting with no icon">
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-li].ui5-user-settings-item-no-icon").should("not.exist");
	});

	it("tests setting header-text", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem headerText="Header title | Setting 3">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").shadow().find("[ui5-title]").as("title");
		cy.get("@title").should("have.length", 1);
		cy.get("@title").contains("Header title | Setting 3");
	});

	it("tests setting tabs", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView text="Setting1" slot="tabs">
						 </UserSettingsView>
				<UserSettingsView text="Setting2" slot="tabs">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 2);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("exist");
	});

	it("tests setting page", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView text="Setting1" slot="pages">
						 </UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 1);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
	});

	it("tests setting page with secondary", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView slot="pages">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</UserSettingsView>
				<UserSettingsView slot="pages" text="Inner Page" id="notification-second-page" secondary>second page content
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 2);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
	});

	it("tests setting page secondary selected", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView slot="pages" text="Inner Page" id="notification-second-page" secondary selected>
					<Text>second page content</Text>
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 1);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
		cy.get("@settingItem").find("[ui5-text]").should("exist");
		cy.get("@settingItem").shadow().find("[ui5-button]").as("navigateBackButton");
		cy.get("@navigateBackButton").should("exist");
		cy.get("@navigateBackButton").should("have.attr", "icon", "nav-back");
	});
});

describe("Events", () => {
	it("tests selection-change", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Setting">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
				<UserSettingsView text="Setting2">
				</UserSettingsView>
				<UserSettingsView text="Setting3">
				</UserSettingsView>
			</UserSettingsItem>
			<UserSettingsItem text="Fixed" slot="fixedItems">
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings")
			.shadow()
			.find("[ui5-dialog]")
			.find("[ui5-list]")
			.as("list");
		cy.get("@list")
			.find("[ui5-li]").first()
			.as("item");
		cy.get("@item").should("have.attr", "type", "Active");
		cy.get("@settings")
			.then($settings => {
				$settings.get(0).addEventListener("selection-change", cy.stub().as("selection-change"));
			});

		cy.get("@item").click();

		cy.get("@selection-change").should("have.been.calledOnce");
	});

	it("tests open event", () => {
		cy.mount(<><Button id="openSettingsBtn">Settings</Button>
			<UserSettingsDialog>
				<UserSettingsItem text="Setting">
					<UserSettingsView text="Setting1">
					</UserSettingsView>
				</UserSettingsItem>
			</UserSettingsDialog></>);

		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings")
			.then($settings => {
				$settings.get(0).addEventListener("open", cy.stub().as("opened"));
			});

		cy.get("@settings").invoke("attr", "open", true);

		cy.get("@settings").should("have.attr", "open");

		cy.get("@settings").shadow().find("[ui5-dialog]").should("have.attr", "open");
		cy.get("@opened").should("have.been.calledOnce");
	});

	it("tests before close event", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Setting">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("before-close", cy.stub().as("beforeClosed"));
			});

		cy.get("@settings").shadow().find("[ui5-toolbar]")
			.find("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("[ui5-button]")
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@beforeClosed").should("have.been.calledOnce");
	});

	it("tests close event", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Setting">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("close", cy.stub().as("closed"));
			});

		cy.get("@settings").shadow().find("[ui5-toolbar]")
			.find("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("[ui5-button]")
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@closed").should("have.been.calledOnce");
	});

	it("tests back-click event on secondary page", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView>
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</UserSettingsView>
				<UserSettingsView text="Inner Page" id="notification-second-page" secondary selected>second page content
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("selection-change", cy.stub().as("backClicked"));
			});
		cy.get("@settingsItem").shadow()
			.find(".ui5-user-settings-item-collapse-btn")
			.first()
			.as("backButton");

		cy.get("@backButton")
			.click();

		cy.get("@backClicked").should("have.been.calledOnce");
	});

	it("tests _collapse event on secondary page mobile", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView>
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</UserSettingsView>
				<UserSettingsView text="Inner Page" id="notification-second-page" secondary>second page content
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("_collapse", cy.stub().as("collapsed"));
			});
		cy.get("@settings")
			.shadow()
			.find("[ui5-dialog]")
			.find("[ui5-list]")
			.as("list");
		cy.get("@list")
			.find("[ui5-li]")
			.as("item");
		cy.get("@item").click();

		cy.get("@settingsItem").shadow()
			.find(".ui5-user-settings-item-collapse-btn")
			.first()
			.as("backButton");

		cy.get("@backButton")
			.click();

		cy.get("@collapsed").should("have.been.calledOnce");
	});

	it("tests selection-change event", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView text="First tab" slot="tabs">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</UserSettingsView>
				<UserSettingsView text="Second tab" id="notification-second-page" slot="tabs">second tab
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("selection-change", cy.stub().as("selectionChanged"));
			});

		cy.get("@settingsItem").shadow().find("[ui5-tabcontainer]").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__header>.ui5-tc__tabStrip>.ui5-tab-strip-item").last()
			.as("secondTab");
		cy.get("@secondTab").click();
		cy.get("@selectionChanged").should("have.been.calledOnce");
	});

	it("tests selection-change event prevented", () => {
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView text="First tab" slot="tabs">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</UserSettingsView>
				<UserSettingsView text="Second tab" id="notification-second-page" slot="tabs">second tab
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingsItem");
		cy.get("@settingsItem")
			.then(settingsItem => {
				settingsItem.get(0).addEventListener("selection-change", e => e.preventDefault());
				settingsItem.get(0).addEventListener("selection-change", cy.stub().as("selectionChanged"));
			});

		cy.get("@settingsItem").shadow().find("[ui5-tabcontainer]").as("tabContainer");
		cy.get("@tabContainer").shadow().find(".ui5-tc__header>.ui5-tc__tabStrip>.ui5-tab-strip-item").last()
			.as("secondTab");
		cy.get("@secondTab").click();
		cy.get("@selectionChanged").should("have.been.calledOnce");
	});

	it("tests search", () => {
		cy.mount(<UserSettingsDialog showSearchField open>
			<UserSettingsItem text="Setting">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
				<UserSettingsView text="Setting2" slot="fixedItems">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").shadow().find("[ui5-dialog]").as("dialog");
		cy.get("@dialog").should("exist");
		cy.get("@dialog").find("[ui5-input]").as("search");
		cy.get("@search").should("have.attr", "placeholder", "Search");
		cy.get("@search").shadow().find("input").type("test");
	});
});

describe("Responsiveness", () => {
	it("test basic structure on phone", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Setting">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("close", cy.stub().as("closed"));
			});
		cy.get("@settings").shadow().find("[ui5-dialog]").should("exist");
		cy.get("@settings").shadow().find("[ui5-toolbar]").should("exist");
		cy.get("@settings").shadow().find("[ui5-toolbar]")
			.find("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("[ui5-button]")
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@closed").should("have.been.calledOnce");
		cy.get("@settings").should("not.have.attr", "open");
		cy.get("@settings").shadow().find("[ui5-dialog]").should("not.have.attr", "open");
	});

	it("test basic structure on phone", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem text="Setting">
				<UserSettingsView text="Setting1">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings")
			.then(settings => {
				settings.get(0).addEventListener("close", cy.stub().as("closed"));
			});
		cy.get("@settings").shadow().find("[ui5-dialog]").should("exist");
		cy.get("@settings").shadow().find("[ui5-toolbar]").should("exist");
		cy.get("@settings")
			.shadow()
			.find("[ui5-dialog]")
			.find("[ui5-list]")
			.as("list");
		cy.get("@list")
			.find("[ui5-li]")
			.as("item");
		cy.get("@item").should("have.attr", "type", "Navigation");
		cy.get("@settings").shadow().find("[ui5-toolbar]")
			.find("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("[ui5-button]")
			.as("closeButton");
		cy.get("@closeButton")
			.click();
		cy.get("@closed").should("have.been.calledOnce");
		cy.get("@settings").should("not.have.attr", "open");
		cy.get("@settings").shadow().find("[ui5-dialog]").should("not.have.attr", "open");
	});

	it("tests setting tabs", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView text="Setting1" slot="tabs">
						 </UserSettingsView>
				<UserSettingsView text="Setting2" slot="tabs">
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 2);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("exist");
	});

	it("tests setting page", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView text="Setting1" slot="pages">
						 </UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 1);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
	});

	it("tests setting page with secondary", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView slot="pages">
					<Button id="product1-button">Product 1</Button>
					<Button id="product2-button">Product 2</Button>
				</UserSettingsView>
				<UserSettingsView slot="pages" text="Inner Page" id="notification-second-page" secondary>second page content
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 2);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
	});

	it("tests setting page secondary selected", () => {
		cy.ui5SimulateDevice("phone");
		cy.mount(<UserSettingsDialog open>
			<UserSettingsItem>
				<UserSettingsView slot="pages" text="Inner Page" id="notification-second-page" secondary selected>
					<Text>second page content</Text>
				</UserSettingsView>
			</UserSettingsItem>
		</UserSettingsDialog>);
		cy.get("[ui5-user-settings-dialog]").as("settings");
		cy.get("@settings").should("exist");
		cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
		cy.get("@settingItem").should("exist");
		cy.get("@settingItem").find("[ui5-user-settings-view]").as("settingViews");
		cy.get("@settingViews").should("exist");
		cy.get("@settingViews").should("have.length", 1);
		cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
		cy.get("@settingItem").find("[ui5-text]").should("exist");
		cy.get("@settingItem").shadow().find("[ui5-button]").as("navigateBackButton");
		cy.get("@navigateBackButton").should("exist");
		cy.get("@navigateBackButton").should("have.attr", "icon", "nav-back");
	});
});

describe("User account view", () => {
    it("tests setting item no config", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem>
                <UserSettingsAccountView>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").should("exist");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").should("exist");
    });

    it("tests setting text", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").should("exist");
        cy.get("@settingView").should("have.attr", "text", "Setting1");
        cy.get("@settingView").should("have.length", 1);
        cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
    });

    it("tests setting account title", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                    <UserMenuAccount slot="account"
                                     titleText="Alain Chevalier">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").should("exist");
        cy.get("@settingView").shadow().find("[ui5-text]").as("name");
        cy.get("@name").should("have.length", 1);
        cy.get("@name").contains("Alain Chevalier");
        cy.get("@name").should("have.class", "ui5-user-settings-account-title");
    });

    it("tests setting account subtitle", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                    <UserMenuAccount slot="account"
                                     subtitleText="Alain.Chevalier@sap.com">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").should("exist");
        cy.get("@settingView").shadow().find("[ui5-text]").as("email");
        cy.get("@email").should("have.length", 1);
        cy.get("@email").contains("Alain.Chevalier@sap.com");
        cy.get("@email").should("have.class", "ui5-user-settings-account-subtitleText");
    });

    it("tests setting account description", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                    <UserMenuAccount slot="account"
                                     description="Delivery Manager, SAP SE">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").should("exist");
        cy.get("@settingView").shadow().find("[ui5-text]").as("role");
        cy.get("@role").should("have.length", 1);
        cy.get("@role").contains("Delivery Manager, SAP SE");
        cy.get("@role").should("have.class", "ui5-user-settings-account-description");
    });

    it("tests config show-manage-account", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1" showManageAccount={true}>
                    <UserMenuAccount slot="account"
                                     titleText="Alain Chevalier 1"
                                     subtitleText="alian.chevalier@sap.com"
                                     description="Delivery Manager, SAP SE">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").should("exist");
        cy.get("@settingItem").should("have.attr", "text", "Setting");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").should("exist");
        cy.get("@settingView").shadow().find("[ui5-button]").contains(USER_SETTINGS_ACCOUNT_MANAGE_ACCOUNT_BUTTON_TXT.defaultText);
        cy.get("@settingView").shadow().find("[ui5-button]").should("have.length", 1);
    });

    it("tests avatar default", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                    <UserMenuAccount slot="account"
                                     titleText="Alain Chevalier 1"
                                     subtitleText="alian.chevalier@sap.com"
                                     description="Delivery Manager, SAP SE">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").shadow().find("[ui5-avatar]").as("avatar");
        cy.get("@avatar").should("exist");
        cy.get("@avatar").should("have.length", 1);
        cy.get("@avatar").should("have.attr", "fallback-icon", "person-placeholder");
        cy.get("@avatar").find("[ui5-tag]").should("exist");
    });

    it("tests avatar initials", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                    <UserMenuAccount slot="account"
                                     avatarInitials="AC"
                                     titleText="Alain Chevalier 1"
                                     subtitleText="alian.chevalier@sap.com"
                                     description="Delivery Manager, SAP SE">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").shadow().find("[ui5-avatar]").as("avatar");
        cy.get("@avatar").should("exist");
        cy.get("@avatar").should("have.length", 1);
        cy.get("@avatar").should("have.attr", "initials", "AC");
    });

    it("tests avatar initials", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                    <UserMenuAccount slot="account"
                                     avatarSrc="./../../test/pages/img/man_avatar_1.png"
                                     titleText="Alain Chevalier 1"
                                     subtitleText="alian.chevalier@sap.com"
                                     description="Delivery Manager, SAP SE">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView").shadow().find("[ui5-avatar]").as("avatar");
        cy.get("@avatar").should("exist");
        cy.get("@avatar").should("have.length", 1);
        cy.get("@avatar").find("img").as("image");
        cy.get("@image").should("have.length", 1);
        cy.get("@image").should("have.attr", "src", "./../../test/pages/img/man_avatar_1.png");
    });

    it("tests edit-avatar-click event", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1">
                    <UserMenuAccount slot="account"
                                     titleText="Alain Chevalier 1">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView")
            .shadow()
            .find("[ui5-avatar]")
            .as("avatar");

        cy.get("@settingView")
            .then($avatar => {
                $avatar.get(0).addEventListener("edit-accounts-click", cy.stub().as("clicked"));
            });

        cy.get("@avatar").click();

        cy.get("@clicked").should("have.been.calledOnce");
    });

    it("tests manage-account-click event", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Setting">
                <UserSettingsAccountView text="Setting1" showManageAccount={true}>
                    <UserMenuAccount slot="account"
                                     titleText="Alain Chevalier 1">
                    </UserMenuAccount>
                </UserSettingsAccountView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-account-view]").as("settingView");
        cy.get("@settingView")
            .shadow()
            .find("[ui5-button]")
            .eq(0)
            .as("manageAccountBtn");

        cy.get("@settingView").then($settingView => {
            $settingView.get(0).addEventListener("manage-account-click", cy.stub().as("clicked"));
        });

        cy.get("@manageAccountBtn").click();

        cy.get("@clicked").should("have.been.calledOnce");
    });
});

describe("Appearance view", () => {
    it("tests appearance view no config", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem>
                <UserSettingsAppearanceView>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").should("exist");
        cy.get("@settingItem").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").should("exist");
    });

    it("tests appearance view text", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").should("exist");
        cy.get("@appearanceView").should("have.attr", "text", "Themes");
        cy.get("@settingItem").shadow().find("[ui5-tabcontainer]").should("not.exist");
    });

    it("tests appearance view items exist", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon"></UserSettingsAppearanceViewItem>
                    <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-item]").as("settingItem");
        cy.get("@settingItem").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").should("exist");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("items");
        cy.get("@items").should("have.length", 2);
    });

    it("tests appearance view item properties", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette" color-scheme="Accent5"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").should("exist");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("item");
        cy.get("@item").should("exist");
        cy.get("@item").should("have.attr", "text", "SAP Morning Horizon");
        cy.get("@item").should("have.attr", "icon", "palette");
        cy.get("@item").should("have.attr", "color-scheme", "Accent5");
        cy.get("@item").then($item => {
            const item = $item.get(0) as any;
            expect(item.itemKey).to.equal("sap_horizon");
            expect(item.text).to.equal("SAP Morning Horizon");
            expect(item.icon).to.equal("palette");
            expect(item.colorScheme).to.equal("Accent5");
        });
    });

    it("tests appearance view item default icon", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="custom_theme" text="Custom Theme"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("item");
        cy.get("@item").then($item => {
            const item = $item.get(0) as any;
            expect(item.icon).to.equal("product");
        });
    });

    it("tests appearance view item default color-scheme", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="custom_theme" text="Custom Theme"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("item");
        cy.get("@item").then($item => {
            const item = $item.get(0) as any;
            expect(item.colorScheme).to.equal("Accent7");
        });
    });

    it("tests appearance view item custom color-scheme", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="custom_theme" text="Custom Theme" color-scheme="Accent3"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("item");
        cy.get("@item").shadow().find("[ui5-avatar]").as("avatar");
        cy.get("@avatar").should("have.attr", "color-scheme", "Accent3");
    });

    it("tests appearance view item avatar", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("item");
        cy.get("@item").shadow().find("[ui5-avatar]").as("avatar");
        cy.get("@avatar").should("exist");
        cy.get("@avatar").should("have.length", 2); // Two avatars: one for cozy, one for compact mode
        cy.get("@avatar").first().should("have.attr", "icon", "palette");
        cy.get("@avatar").first().should("have.attr", "shape", "Square");
        cy.get("@avatar").first().should("have.attr", "color-scheme", "Accent7");
    });

    it("tests appearance view item text displayed", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("item");
        cy.get("@item").shadow().find(".item-title").as("title");
        cy.get("@title").should("exist");
        cy.get("@title").contains("SAP Morning Horizon");
    });

    it("tests appearance view with groups", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewGroup header-text="SAP Horizon">
                        <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                        <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    </UserSettingsAppearanceViewGroup>
                    <UserSettingsAppearanceViewGroup header-text="SAP Quartz">
                        <UserSettingsAppearanceViewItem item-key="sap_fiori_3" text="SAP Quartz Light" icon="palette"></UserSettingsAppearanceViewItem>
                    </UserSettingsAppearanceViewGroup>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-group]").should("have.length", 2);
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").should("have.length", 3);
    });

    it("tests appearance view group header-text", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewGroup header-text="SAP Horizon">
                        <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    </UserSettingsAppearanceViewGroup>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-group]").as("group");
        cy.get("@group").should("have.attr", "header-text", "SAP Horizon");
        cy.get("@group").shadow().find("[ui5-li-group-header]").contains("SAP Horizon");
    });

    it("tests appearance view mixed grouped and ungrouped items", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
					<UserSettingsAppearanceViewItem item-key="custom_theme" text="Custom Theme" icon="palette"></UserSettingsAppearanceViewItem>

                    <UserSettingsAppearanceViewGroup header-text="SAP Horizon">
                        <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    </UserSettingsAppearanceViewGroup>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-group]").should("have.length", 1);
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").should("have.length", 2);
    });

    it("tests selection-change event", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        
        cy.get("@appearanceView").then($view => {
            $view.get(0).addEventListener("selection-change", cy.stub().as("selectionChange"));
        });

        cy.get("@appearanceView")
            .find("[ui5-user-settings-appearance-view-item]")
            .first()
            .click();

        cy.get("@selectionChange").should("have.been.calledOnce");
    });

    it("tests selection-change event detail contains correct item", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        
        cy.get("@appearanceView").then($view => {
            $view.get(0).addEventListener("selection-change", cy.stub().as("selectionChangeWithDetail"));
        });

        cy.get("@appearanceView")
            .find("[ui5-user-settings-appearance-view-item]")
            .eq(1)
            .click();

        cy.get("@selectionChangeWithDetail").should("have.been.calledOnce");
        cy.get("@selectionChangeWithDetail").then((stub: any) => {
            const call = stub.getCall(0);
            expect(call.args[0].detail.item.itemKey).to.equal("sap_horizon_dark");
            expect(call.args[0].detail.item.text).to.equal("SAP Evening Horizon");
        });
    });

    it("tests item selection state", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" icon="palette" selected></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").eq(1).then($item => {
            const item = $item.get(0) as any;
            expect(item.selected).to.be.true;
        });
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").eq(0).then($item => {
            const item = $item.get(0) as any;
            expect(item.selected).to.be.false;
        });
    });

    it("tests item clickable and hover states", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").as("item");
        
        cy.get("@item").then($item => {
            const item = $item.get(0) as any;
            expect(item.type).to.equal("Active");
        });
        
        cy.get("@item").shadow().find(".ui5-li-root").should("exist");
    });

    it("tests additionalContent slot", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    <div slot="additionalContent">Additional content here</div>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").shadow().find("slot[name='additionalContent']").should("exist");
    });

    it("tests additionalContent slot renders above items", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    <div slot="additionalContent" id="additional-content-test">Additional content above items</div>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        
        // Get positions of additionalContent and the list
        cy.get("@appearanceView").find("#additional-content-test").then($additional => {
            const additionalTop = $additional.get(0).getBoundingClientRect().top;
            
            cy.get("@appearanceView").shadow().find("[ui5-list]").then($list => {
                const listTop = $list.get(0).getBoundingClientRect().top;
                
                // Additional content should be positioned above the list
                expect(additionalTop).to.be.lessThan(listTop);
            });
        });
    });

    it("tests selection-change event can be prevented", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette" selected></UserSettingsAppearanceViewItem>
                    <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        
        cy.get("@appearanceView").then($view => {
            $view.get(0).addEventListener("selection-change", (e: Event) => e.preventDefault());
            $view.get(0).addEventListener("selection-change", cy.stub().as("selectionChange"));
        });
        
        cy.get("@appearanceView")
            .find("[ui5-user-settings-appearance-view-item]")
            .eq(1)
            .click();

        cy.get("@selectionChange").should("have.been.calledOnce");
        
        // First item should still be selected because event was prevented
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").eq(0).then($item => {
            const item = $item.get(0) as any;
            expect(item.selected).to.be.true;
        });
        
        // Second item should not be selected
        cy.get("@appearanceView").find("[ui5-user-settings-appearance-view-item]").eq(1).then($item => {
            const item = $item.get(0) as any;
            expect(item.selected).to.be.false;
        });
    });

    it("tests items in groups fire selection-change event", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewGroup header-text="SAP Horizon">
                        <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                        <UserSettingsAppearanceViewItem item-key="sap_horizon_dark" text="SAP Evening Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                    </UserSettingsAppearanceViewGroup>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        
        cy.get("@appearanceView").then($view => {
            $view.get(0).addEventListener("selection-change", cy.stub().as("selectionChange"));
        });

        cy.get("@appearanceView")
            .find("[ui5-user-settings-appearance-view-group]")
            .find("[ui5-user-settings-appearance-view-item]")
            .first()
            .click();

        cy.get("@selectionChange").should("have.been.calledOnce");
        cy.get("@selectionChange").then((stub: any) => {
            const call = stub.getCall(0);
            expect(call.args[0].detail.item.itemKey).to.equal("sap_horizon");
        });
    });

    it("tests appearance view list renders correctly", () => {
        cy.mount(<UserSettingsDialog open>
            <UserSettingsItem text="Appearance">
                <UserSettingsAppearanceView text="Themes">
                    <UserSettingsAppearanceViewItem item-key="sap_horizon" text="SAP Morning Horizon" icon="palette"></UserSettingsAppearanceViewItem>
                </UserSettingsAppearanceView>
            </UserSettingsItem>
        </UserSettingsDialog>);
        cy.get("[ui5-user-settings-dialog]").as("settings");
        cy.get("@settings").find("[ui5-user-settings-appearance-view]").as("appearanceView");
        cy.get("@appearanceView").shadow().find("[ui5-list]").as("list");
        cy.get("@list").should("exist");
        cy.get("@list").should("have.class", "user-settings-appearance-view-list");
    });
});

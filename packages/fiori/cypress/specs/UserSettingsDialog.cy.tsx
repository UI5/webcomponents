import UserSettingsItem from "../../src/UserSettingsItem.js";
import UserSettingsView from "../../src/UserSettingsView.js";
import UserSettingsDialog from "../../src/UserSettingsDialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Text from "@ui5/webcomponents/dist/Text.js";

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

	it("tests setting item no config", () => {
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

import TabContainer from "../../../src/TabContainer.js";
import Tab from "../../../src/Tab.js";
import TabSeparator from "../../../src/TabSeparator.js";
import Button from "../../../src/Button.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/menu2.js";

describe("TabContainer visual", () => {
	it("basic — first tab selected by default", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Products">Products content</Tab>
				<Tab text="Availability">Availability content</Tab>
				<Tab text="Reviews">Reviews content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("second tab selected", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Products">Products content</Tab>
				<Tab text="Availability" selected>Availability content</Tab>
				<Tab text="Reviews">Reviews content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("with icons", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Employees" icon="sap-icon://employee" selected>Employees content</Tab>
				<Tab text="Calendar" icon="sap-icon://calendar">Calendar content</Tab>
				<Tab text="Settings" icon="sap-icon://settings">Settings content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("icon-only tabs", () => {
		cy.mount(
			<TabContainer>
				<Tab icon="sap-icon://employee" selected>Content 1</Tab>
				<Tab icon="sap-icon://calendar">Content 2</Tab>
				<Tab icon="sap-icon://settings">Content 3</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("tab designs — Positive, Negative, Critical", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Default" selected>Default content</Tab>
				<Tab text="Positive" design="Positive">Positive content</Tab>
				<Tab text="Negative" design="Negative">Negative content</Tab>
				<Tab text="Critical" design="Critical">Critical content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("with disabled tab", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Active" selected>Active content</Tab>
				<Tab text="Disabled" disabled>Disabled content</Tab>
				<Tab text="Also Active">Also Active content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("with additional text", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Products" additionalText="42" selected>Content</Tab>
				<Tab text="Reviews" additionalText="8">Content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("overflow — end overflow mode", () => {
		cy.mount(
			<TabContainer overflowMode="End" style={{ width: "400px" }}>
				<Tab text="One" selected>One</Tab>
				<Tab text="Two">Two</Tab>
				<Tab text="Three">Three</Tab>
				<Tab text="Four">Four</Tab>
				<Tab text="Five">Five</Tab>
				<Tab text="Six">Six</Tab>
				<Tab text="Seven">Seven</Tab>
				<Tab text="Eight">Eight</Tab>
				<Tab text="Nine">Nine</Tab>
				<Tab text="Ten">Ten</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("overflow — end overflow popover open", () => {
		cy.mount(
			<TabContainer overflowMode="End" style={{ width: "400px" }}>
				<Tab text="One" selected>One</Tab>
				<Tab text="Two">Two</Tab>
				<Tab text="Three">Three</Tab>
				<Tab text="Four">Four</Tab>
				<Tab text="Five">Five</Tab>
				<Tab text="Six">Six</Tab>
				<Tab text="Seven">Seven</Tab>
				<Tab text="Eight">Eight</Tab>
				<Tab text="Nine">Nine</Tab>
				<Tab text="Ten">Ten</Tab>
			</TabContainer>
		);
		cy.get("[ui5-tabcontainer]").ui5TabContainerOpenEndOverflow();
		cy.screenshot();
	});

	it("overflow — end overflow popover open with nested tabs", () => {
		cy.mount(
			<TabContainer overflowMode="End" style={{ width: "300px" }}>
				<Tab text="One" selected>One</Tab>
				<Tab text="Two">
					<Tab slot="items" text="2.1">Two One</Tab>
					<Tab slot="items" text="2.2">Two Two</Tab>
				</Tab>
				<Tab text="Three">
					<Tab slot="items" text="3.1">
						<Tab slot="items" text="3.1.1">Three One One</Tab>
					</Tab>
				</Tab>
				<Tab text="Four">Four</Tab>
				<Tab text="Five">Five</Tab>
				<Tab text="Six">Six</Tab>
				<Tab text="Seven">Seven</Tab>
			</TabContainer>
		);
		cy.get("[ui5-tabcontainer]").ui5TabContainerOpenEndOverflow();
		cy.screenshot();
	});

	it("overflow — StartAndEnd mode", () => {
		cy.mount(
			<TabContainer id="tcStartAndEnd" overflowMode="StartAndEnd" style={{ width: "400px" }}>
				<Tab text="One">One</Tab>
				<Tab text="Two">Two</Tab>
				<Tab text="Three">Three</Tab>
				<Tab text="Four">Four</Tab>
				<Tab text="Five">Five</Tab>
				<Tab text="Six">Six</Tab>
				<Tab text="Seven">Seven</Tab>
				<Tab text="Eight">Eight</Tab>
				<Tab text="Nine">Nine</Tab>
				<Tab text="Ten" selected>Ten</Tab>
				<Tab text="Eleven">Eleven</Tab>
				<Tab text="Twelve">Twelve</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("overflow — StartAndEnd start overflow popover open", () => {
		cy.mount(
			<TabContainer id="tcStartAndEnd" overflowMode="StartAndEnd" style={{ width: "400px" }}>
				<Tab text="One">One</Tab>
				<Tab text="Two">Two</Tab>
				<Tab text="Three">Three</Tab>
				<Tab text="Four">Four</Tab>
				<Tab text="Five">Five</Tab>
				<Tab text="Six">Six</Tab>
				<Tab text="Seven">Seven</Tab>
				<Tab text="Eight">Eight</Tab>
				<Tab text="Nine">Nine</Tab>
				<Tab text="Ten" selected>Ten</Tab>
				<Tab text="Eleven">Eleven</Tab>
				<Tab text="Twelve">Twelve</Tab>
			</TabContainer>
		);
		cy.get("#tcStartAndEnd").shadow().find("[data-ui5-stable='overflow-start']").should("be.visible").click();
		cy.get("#tcStartAndEnd").shadow().find(".ui5-tab-container-responsive-popover").should("be.visible");
		cy.screenshot();
	});

	it("overflow — custom overflow buttons", () => {
		cy.mount(
			<TabContainer overflowMode="StartAndEnd" style={{ width: "400px" }}>
				<Button slot="startOverflowButton">Start</Button>
				<Button slot="overflowButton">End</Button>
				<Tab text="One">One</Tab>
				<Tab text="Two">Two</Tab>
				<Tab text="Three">Three</Tab>
				<Tab text="Four">Four</Tab>
				<Tab text="Five">Five</Tab>
				<Tab text="Six">Six</Tab>
				<Tab text="Seven">Seven</Tab>
				<Tab text="Eight">Eight</Tab>
				<Tab text="Nine">Nine</Tab>
				<Tab text="Ten" selected>Ten</Tab>
				<Tab text="Eleven">Eleven</Tab>
				<Tab text="Twelve">Twelve</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("nested tabs — strip with expand arrows", () => {
		cy.mount(
			<TabContainer>
				<Tab text="One" selected>One content</Tab>
				<Tab text="Two">Two content
					<Tab slot="items" text="2.1">Two One</Tab>
					<Tab slot="items" text="2.2">Two Two</Tab>
				</Tab>
				<Tab text="Three">Three content
					<Tab slot="items" icon="sap-icon://menu2" text="3.1">
						<Tab slot="items" icon="sap-icon://menu2" text="3.1.1">Three One One</Tab>
					</Tab>
				</Tab>
				<Tab text="Four">Four content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("nested tabs — sub-tab list open", () => {
		cy.mount(
			<TabContainer id="tcNested">
				<Tab text="One" selected>One content</Tab>
				<Tab text="Two">Two content
					<Tab slot="items" text="2.1">Two One</Tab>
					<Tab slot="items" text="2.2">Two Two</Tab>
				</Tab>
				<Tab text="Three">Three content
					<Tab slot="items" icon="sap-icon://menu2" text="3.1">
						<Tab slot="items" icon="sap-icon://menu2" text="3.1.1">Three One One</Tab>
					</Tab>
				</Tab>
				<Tab text="Four">Four content</Tab>
			</TabContainer>
		);
		cy.get("#tcNested").shadow().find(".ui5-tab-expand-button [ui5-button]").first().realClick();
		cy.get("#tcNested").shadow().find(".ui5-tab-container-responsive-popover").should("be.visible");
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<TabContainer>
					<Tab text="Products" selected>Products content</Tab>
					<Tab text="Availability">Availability content</Tab>
					<Tab text="Reviews">Reviews content</Tab>
				</TabContainer>
			</div>
		);
		cy.screenshot();
	});
});

describe("Tab visual", () => {
	it("unselected tab", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Unselected">Content</Tab>
				<Tab text="Also Unselected" selected>Content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("selected tab", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Selected" selected>Selected content</Tab>
				<Tab text="Other">Other content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("disabled tab", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Active" selected>Active content</Tab>
				<Tab text="Disabled" disabled>Disabled content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("tab with icon and text", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Employees" icon="sap-icon://employee" selected>Content</Tab>
				<Tab text="Calendar" icon="sap-icon://calendar">Content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("tab design — Positive", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Positive" design="Positive" selected>Content</Tab>
				<Tab text="Default">Content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("tab design — Negative", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Negative" design="Negative" selected>Content</Tab>
				<Tab text="Default">Content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("tab design — Critical", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Critical" design="Critical" selected>Content</Tab>
				<Tab text="Default">Content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("tab with additional text", () => {
		cy.mount(
			<TabContainer>
				<Tab text="Products" additionalText="42" selected>Content</Tab>
				<Tab text="Reviews" additionalText="8">Content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});
});

describe("TabSeparator visual", () => {
	it("single separator between tabs", () => {
		cy.mount(
			<TabContainer>
				<Tab text="One" selected>One content</Tab>
				<Tab text="Two">Two content</Tab>
				<TabSeparator />
				<Tab text="Three">Three content</Tab>
				<Tab text="Four">Four content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});

	it("multiple separators", () => {
		cy.mount(
			<TabContainer>
				<Tab text="One" selected>One content</Tab>
				<TabSeparator />
				<Tab text="Two">Two content</Tab>
				<Tab text="Three">Three content</Tab>
				<TabSeparator />
				<Tab text="Four">Four content</Tab>
			</TabContainer>
		);
		cy.screenshot();
	});
});

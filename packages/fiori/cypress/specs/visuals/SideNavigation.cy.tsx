import SideNavigation from "../../../src/SideNavigation.js";
import SideNavigationItem from "../../../src/SideNavigationItem.js";
import SideNavigationSubItem from "../../../src/SideNavigationSubItem.js";
import SideNavigationGroup from "../../../src/SideNavigationGroup.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/bell.js";

describe("SideNavigation visual", () => {
	it("basic state — expanded", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon="home" selected />
				<SideNavigationItem text="Calendar" icon="calendar" />
				<SideNavigationItem text="Employees" icon="employee" />
				<SideNavigationItem text="Notifications" icon="bell" />
				<SideNavigationItem text="Settings" icon="settings" slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("collapsed state", () => {
		cy.mount(
			<SideNavigation collapsed style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon="home" selected />
				<SideNavigationItem text="Calendar" icon="calendar" />
				<SideNavigationItem text="Employees" icon="employee" />
				<SideNavigationItem text="Notifications" icon="bell" />
				<SideNavigationItem text="Settings" icon="settings" slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with sub-items expanded", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon="home" />
				<SideNavigationItem text="Employees" icon="employee" expanded>
					<SideNavigationSubItem text="Overview" />
					<SideNavigationSubItem text="HR Management" />
					<SideNavigationSubItem text="Payroll" selected />
				</SideNavigationItem>
				<SideNavigationItem text="Settings" icon="settings" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with groups", () => {
		cy.mount(
			<SideNavigation style={{ height: "450px" }}>
				<SideNavigationGroup text="Main">
					<SideNavigationItem text="Home" icon="home" selected />
					<SideNavigationItem text="Calendar" icon="calendar" />
				</SideNavigationGroup>
				<SideNavigationGroup text="Administration">
					<SideNavigationItem text="Employees" icon="employee" />
					<SideNavigationItem text="Settings" icon="settings" />
				</SideNavigationGroup>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with fixed items", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon="home" selected />
				<SideNavigationItem text="Calendar" icon="calendar" />
				<SideNavigationItem text="Notifications" icon="bell" slot="fixedItems" />
				<SideNavigationItem text="Settings" icon="settings" slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<SideNavigation style={{ height: "300px" }}>
					<SideNavigationItem text="Home" icon="home" selected />
					<SideNavigationItem text="Calendar" icon="calendar" />
					<SideNavigationItem text="Settings" icon="settings" />
				</SideNavigation>
			</div>
		);
		cy.screenshot();
	});
});

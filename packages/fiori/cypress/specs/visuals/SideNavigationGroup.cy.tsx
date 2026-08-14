import SideNavigation from "../../../src/SideNavigation.js";
import SideNavigationGroup from "../../../src/SideNavigationGroup.js";
import SideNavigationItem from "../../../src/SideNavigationItem.js";
import home from "@ui5/webcomponents-icons/dist/home.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";
import settings from "@ui5/webcomponents-icons/dist/settings.js";

describe("SideNavigationGroup visual", () => {
	it("basic state — collapsed group", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationGroup text="Workspace">
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Employees" icon={employee} />
				</SideNavigationGroup>
				<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("expanded group", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon={home} />
				<SideNavigationGroup text="Workspace" expanded>
					<SideNavigationItem text="Calendar" icon={calendar} selected />
					<SideNavigationItem text="Employees" icon={employee} />
				</SideNavigationGroup>
				<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("multiple groups", () => {
		cy.mount(
			<SideNavigation style={{ height: "500px" }}>
				<SideNavigationGroup text="Main" expanded>
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
				</SideNavigationGroup>
				<SideNavigationGroup text="Administration" expanded>
					<SideNavigationItem text="Employees" icon={employee} />
					<SideNavigationItem text="Settings" icon={settings} />
				</SideNavigationGroup>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("consecutive groups — below-group separator", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationGroup text="Group A" expanded>
					<SideNavigationItem text="Item A1" icon={home} selected />
					<SideNavigationItem text="Item A2" icon={calendar} />
				</SideNavigationGroup>
				<SideNavigationGroup text="Group B" expanded>
					<SideNavigationItem text="Item B1" icon={employee} />
					<SideNavigationItem text="Item B2" icon={settings} />
				</SideNavigationGroup>
				<SideNavigationGroup text="Group C">
					<SideNavigationItem text="Item C1" icon={home} />
				</SideNavigationGroup>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("disabled group", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationGroup text="Workspace" disabled>
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Employees" icon={employee} />
				</SideNavigationGroup>
				<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<SideNavigation style={{ height: "400px" }}>
					<SideNavigationGroup text="Workspace" expanded>
						<SideNavigationItem text="Calendar" icon={calendar} selected />
						<SideNavigationItem text="Employees" icon={employee} />
					</SideNavigationGroup>
				</SideNavigation>
			</div>
		);
		cy.screenshot();
	});
});

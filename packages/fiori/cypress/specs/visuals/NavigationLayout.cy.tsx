import NavigationLayout from "../../../src/NavigationLayout.js";
import SideNavigation from "../../../src/SideNavigation.js";
import SideNavigationItem from "../../../src/SideNavigationItem.js";
import SideNavigationGroup from "../../../src/SideNavigationGroup.js";
import home from "@ui5/webcomponents-icons/dist/home.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";
import settings from "@ui5/webcomponents-icons/dist/settings.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";

describe("NavigationLayout visual", () => {
	it("basic state — expanded side navigation", () => {
		cy.viewport(1200, 800);
		cy.mount(
			<NavigationLayout style={{ height: "400px" }}>
				<div slot="header" style={{ padding: "0 16px", height: "44px", background: "var(--sapShellColor)", display: "flex", alignItems: "center", color: "var(--sapShell_TextColor)" }}>
					<strong>My Application</strong>
				</div>
				<SideNavigation slot="sideContent">
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Employees" icon={employee} />
					<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
				</SideNavigation>
				<div style={{ padding: "16px" }}>Main content area</div>
			</NavigationLayout>
		);
		cy.screenshot();
	});

	it("mode — Collapsed", () => {
		cy.viewport(1200, 800);
		cy.mount(
			<NavigationLayout mode="Collapsed" style={{ height: "400px" }}>
				<div slot="header" style={{ padding: "0 16px", height: "44px", background: "var(--sapShellColor)", display: "flex", alignItems: "center", color: "var(--sapShell_TextColor)" }}>
					<strong>My Application</strong>
				</div>
				<SideNavigation slot="sideContent">
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Employees" icon={employee} />
					<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
				</SideNavigation>
				<div style={{ padding: "16px" }}>Main content area</div>
			</NavigationLayout>
		);
		cy.screenshot();
	});

	it("mode — Expanded with groups", () => {
		cy.viewport(1200, 800);
		cy.mount(
			<NavigationLayout mode="Expanded" style={{ height: "500px" }}>
				<div slot="header" style={{ padding: "0 16px", height: "44px", background: "var(--sapShellColor)", display: "flex", alignItems: "center", color: "var(--sapShell_TextColor)" }}>
					<strong>My Application</strong>
				</div>
				<SideNavigation slot="sideContent">
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationGroup text="Workspace" expanded>
						<SideNavigationItem text="Calendar" icon={calendar} />
						<SideNavigationItem text="Employees" icon={employee} />
					</SideNavigationGroup>
					<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
				</SideNavigation>
				<div style={{ padding: "16px" }}>Main content area</div>
			</NavigationLayout>
		);
		cy.screenshot();
	});

	it("without header slot", () => {
		cy.viewport(1200, 800);
		cy.mount(
			<NavigationLayout mode="Expanded" style={{ height: "300px" }}>
				<SideNavigation slot="sideContent">
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
				</SideNavigation>
				<div style={{ padding: "16px" }}>Main content — no header.</div>
			</NavigationLayout>
		);
		cy.screenshot();
	});

	it("without side navigation", () => {
		cy.viewport(1200, 800);
		cy.mount(
			<NavigationLayout style={{ height: "300px" }}>
				<div slot="header" style={{ padding: "0 16px", height: "44px", background: "var(--sapShellColor)", display: "flex", alignItems: "center", color: "var(--sapShell_TextColor)" }}>
					<strong>My Application</strong>
				</div>
				<div style={{ padding: "16px" }}>Full-width content — no side navigation.</div>
			</NavigationLayout>
		);
		cy.screenshot();
	});

	it("small screen — side navigation hidden by default", () => {
		cy.viewport(500, 600);
		cy.mount(
			<NavigationLayout style={{ height: "400px" }}>
				<div slot="header" style={{ padding: "0 16px", height: "44px", background: "var(--sapShellColor)", display: "flex", alignItems: "center", color: "var(--sapShell_TextColor)" }}>
					<strong>My Application</strong>
				</div>
				<SideNavigation slot="sideContent">
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
				</SideNavigation>
				<div style={{ padding: "16px" }}>Main content — side nav auto-hidden on small screen.</div>
			</NavigationLayout>
		);
		cy.screenshot();
	});

	it("small screen — mode Expanded forces side navigation visible", () => {
		cy.viewport(500, 600);
		cy.mount(
			<NavigationLayout mode="Expanded" style={{ height: "400px" }}>
				<div slot="header" style={{ padding: "0 16px", height: "44px", background: "var(--sapShellColor)", display: "flex", alignItems: "center", color: "var(--sapShell_TextColor)" }}>
					<strong>My Application</strong>
				</div>
				<SideNavigation slot="sideContent">
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
				</SideNavigation>
				<div style={{ padding: "16px" }}>Content behind expanded side nav.</div>
			</NavigationLayout>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.viewport(1200, 800);
		cy.mount(
			<div data-ui5-compact-size>
				<NavigationLayout mode="Expanded" style={{ height: "400px" }}>
					<div slot="header" style={{ padding: "0 8px", height: "36px", background: "var(--sapShellColor)", display: "flex", alignItems: "center", color: "var(--sapShell_TextColor)" }}>
						<strong>My Application</strong>
					</div>
					<SideNavigation slot="sideContent">
						<SideNavigationItem text="Home" icon={home} selected />
						<SideNavigationItem text="Calendar" icon={calendar} />
						<SideNavigationItem text="Settings" icon={settings} slot="fixedItems" />
					</SideNavigation>
					<div style={{ padding: "8px" }}>Compact mode content.</div>
				</NavigationLayout>
			</div>
		);
		cy.screenshot();
	});
});

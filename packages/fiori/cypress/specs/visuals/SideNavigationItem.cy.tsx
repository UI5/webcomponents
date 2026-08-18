import SideNavigation from "../../../src/SideNavigation.js";
import SideNavigationItem from "../../../src/SideNavigationItem.js";
import SideNavigationSubItem from "../../../src/SideNavigationSubItem.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import home from "@ui5/webcomponents-icons/dist/home.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";
import settings from "@ui5/webcomponents-icons/dist/settings.js";

describe("SideNavigationItem visual", () => {
	it("basic state — text only", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" />
				<SideNavigationItem text="Calendar" />
				<SideNavigationItem text="Settings" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("selected", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} disabled />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with sub-items — collapsed", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar}>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" />
					<SideNavigationSubItem text="Monthly" />
				</SideNavigationItem>
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with sub-items — expanded", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon={home} />
				<SideNavigationItem text="Calendar" icon={calendar} expanded>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" selected />
					<SideNavigationSubItem text="Monthly" />
				</SideNavigationItem>
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("design — Action", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Add New" icon={calendar} design="Action" unselectable />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with tag", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar}>
					<Tag slot="tag" design="Set2" colorScheme="6" hideStateIcon>New</Tag>
				</SideNavigationItem>
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("collapsed side navigation", () => {
		cy.mount(
			<SideNavigation collapsed style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with fixed items", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Legal" icon={settings} slot="fixedItems" />
				<SideNavigationItem text="Help" icon={home} slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<SideNavigation style={{ height: "300px" }}>
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Settings" icon={settings} />
				</SideNavigation>
			</div>
		);
		cy.screenshot();
	});
});

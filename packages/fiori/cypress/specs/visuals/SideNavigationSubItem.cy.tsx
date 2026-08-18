import SideNavigation from "../../../src/SideNavigation.js";
import SideNavigationItem from "../../../src/SideNavigationItem.js";
import SideNavigationSubItem from "../../../src/SideNavigationSubItem.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";

describe("SideNavigationSubItem visual", () => {
	it("basic state", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Calendar" icon={calendar} expanded>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" />
					<SideNavigationSubItem text="Monthly" />
				</SideNavigationItem>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("selected sub-item", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Calendar" icon={calendar} expanded>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" selected />
					<SideNavigationSubItem text="Monthly" />
				</SideNavigationItem>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("disabled sub-item", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Calendar" icon={calendar} expanded>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" disabled />
					<SideNavigationSubItem text="Monthly" selected />
				</SideNavigationItem>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("design — Action", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Calendar" icon={calendar} expanded>
					<SideNavigationSubItem text="Daily" selected />
					<SideNavigationSubItem text="Add Event" design="Action" unselectable />
				</SideNavigationItem>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with tag", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Calendar" icon={calendar} expanded>
					<SideNavigationSubItem text="Daily" selected />
					<SideNavigationSubItem text="Weekly">
						<Tag slot="tag" design="Set2" colorScheme="7" hideStateIcon>New</Tag>
					</SideNavigationSubItem>
					<SideNavigationSubItem text="Monthly" />
				</SideNavigationItem>
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<SideNavigation style={{ height: "300px" }}>
					<SideNavigationItem text="Calendar" icon={calendar} expanded>
						<SideNavigationSubItem text="Daily" />
						<SideNavigationSubItem text="Weekly" selected />
						<SideNavigationSubItem text="Monthly" />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		);
		cy.screenshot();
	});
});

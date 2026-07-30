import ShellBar from "../../../src/ShellBar.js";
import ShellBarItem from "../../../src/ShellBarItem.js";
import ShellBarBranding from "../../../src/ShellBarBranding.js";
import ShellBarSearch from "../../../src/ShellBarSearch.js";
import ShellBarSpacer from "../../../src/ShellBarSpacer.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import SearchItem from "../../../src/SearchItem.js";
import activities from "@ui5/webcomponents-icons/dist/activities.js";
import sysHelp from "@ui5/webcomponents-icons/dist/sys-help.js";
import navBack from "@ui5/webcomponents-icons/dist/nav-back.js";
import da from "@ui5/webcomponents-icons/dist/da.js";
import bell from "@ui5/webcomponents-icons/dist/bell.js";
import grid from "@ui5/webcomponents-icons/dist/grid.js";
import history from "@ui5/webcomponents-icons/dist/history.js";

describe("ShellBar visual", () => {
	it("basic state — title only", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title" />
		);
		cy.screenshot();
	});

	it("primary and secondary title", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title" secondaryTitle="Solution Name" />
		);
		cy.screenshot();
	});

	it("with logo and title", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title" secondaryTitle="Solution Name">
				<Avatar slot="logo" initials="S" colorScheme="Accent10" shape="Square" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with branding slot", () => {
		cy.mount(
			<ShellBar>
				<ShellBarBranding slot="branding">
					<Avatar slot="logo" initials="S" colorScheme="Accent10" shape="Square" />
					Product Title
				</ShellBarBranding>
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with profile avatar", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with notifications", () => {
		cy.mount(
			<ShellBar
				primaryTitle="Product Title"
				showNotifications
				notificationsCount="12"
			>
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with product switch", () => {
		cy.mount(
			<ShellBar
				primaryTitle="Product Title"
				showProductSwitch
			>
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with shell bar items", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarItem icon={activities} text="Activities" />
				<ShellBarItem icon={sysHelp} text="Help" />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with item count badge", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarItem icon={bell} text="Notifications" count="5" />
				<ShellBarItem icon={activities} text="Activities" count="99+" />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with start button", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title" secondaryTitle="Solution Name">
				<Button slot="startButton" icon={navBack} />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with assistant button", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ToggleButton slot="assistant" icon={da} />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with search field — expanded", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title" showSearchField>
				<ShellBarSearch slot="searchField" placeholder="Search...">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
				</ShellBarSearch>
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("full setup", () => {
		cy.mount(
			<ShellBar
				primaryTitle="Product Title"
				secondaryTitle="Solution Name"
				showNotifications
				notificationsCount="99+"
				showProductSwitch
			>
				<Button slot="startButton" icon={navBack} />
				<ToggleButton slot="assistant" icon={da} />
				<ShellBarItem icon={activities} text="Activities" />
				<ShellBarItem icon={sysHelp} text="Help" count="3" />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
				<Avatar slot="logo" initials="S" colorScheme="Accent10" shape="Square" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with spacer in content", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<Button slot="content">Action 1</Button>
				<ShellBarSpacer slot="content" />
				<Button slot="content">Action 2</Button>
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ShellBar
					primaryTitle="Product Title"
					showNotifications
					notificationsCount="5"
					showProductSwitch
				>
					<ShellBarItem icon={activities} text="Activities" />
					<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
					<Avatar slot="logo" initials="S" colorScheme="Accent10" shape="Square" />
				</ShellBar>
			</div>
		);
		cy.screenshot();
	});
});

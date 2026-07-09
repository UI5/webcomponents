import ShellBar from "../../../src/ShellBar.js";
import ShellBarItem from "../../../src/ShellBarItem.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import activities from "@ui5/webcomponents-icons/dist/activities.js";
import sysHelp from "@ui5/webcomponents-icons/dist/sys-help.js";
import bell from "@ui5/webcomponents-icons/dist/bell.js";
import settingsIcon from "@ui5/webcomponents-icons/dist/settings.js";

describe("ShellBarItem visual", () => {
	it("basic state — icon only", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarItem icon={activities} />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with text — visible in overflow", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarItem icon={activities} text="Activities" />
				<ShellBarItem icon={sysHelp} text="Help" />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with count badge", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarItem icon={bell} text="Notifications" count="5" />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with large count badge", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarItem icon={bell} text="Notifications" count="99+" />
				<ShellBarItem icon={activities} text="Activities" count="3" />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("multiple items", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarItem icon={activities} text="Activities" />
				<ShellBarItem icon={bell} text="Notifications" count="2" />
				<ShellBarItem icon={sysHelp} text="Help" />
				<ShellBarItem icon={settingsIcon} text="Settings" />
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ShellBar primaryTitle="Product Title">
					<ShellBarItem icon={activities} text="Activities" />
					<ShellBarItem icon={bell} text="Notifications" count="5" />
					<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
				</ShellBar>
			</div>
		);
		cy.screenshot();
	});
});

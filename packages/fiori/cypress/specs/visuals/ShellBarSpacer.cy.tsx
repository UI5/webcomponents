import ShellBar from "../../../src/ShellBar.js";
import ShellBarSpacer from "../../../src/ShellBarSpacer.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";

describe("ShellBarSpacer visual", () => {
	it("basic state — spacer between content items", () => {
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

	it("spacer pushing content to the end", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ShellBarSpacer slot="content" />
				<Button slot="content">End Action</Button>
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("multiple spacers", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<Button slot="content">Left</Button>
				<ShellBarSpacer slot="content" />
				<Button slot="content">Center</Button>
				<ShellBarSpacer slot="content" />
				<Button slot="content">Right</Button>
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("spacer with toggle button content", () => {
		cy.mount(
			<ShellBar primaryTitle="Product Title">
				<ToggleButton slot="content">Toggle</ToggleButton>
				<ShellBarSpacer slot="content" />
				<Button slot="content">Action</Button>
				<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
			</ShellBar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ShellBar primaryTitle="Product Title">
					<Button slot="content">Action 1</Button>
					<ShellBarSpacer slot="content" />
					<Button slot="content">Action 2</Button>
					<Avatar slot="profile" initials="JD" colorScheme="Accent6" />
				</ShellBar>
			</div>
		);
		cy.screenshot();
	});
});

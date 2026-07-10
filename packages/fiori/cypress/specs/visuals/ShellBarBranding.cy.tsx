import ShellBar from "../../../src/ShellBar.js";
import ShellBarBranding from "../../../src/ShellBarBranding.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";

describe("ShellBarBranding visual", () => {
	it("basic state — text only", () => {
		cy.mount(
			<ShellBar>
				<ShellBarBranding slot="branding">
					Product Title
				</ShellBarBranding>
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with logo and text", () => {
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

	it("logo only", () => {
		cy.mount(
			<ShellBar>
				<ShellBarBranding slot="branding">
					<Avatar slot="logo" initials="S" colorScheme="Accent10" shape="Square" />
				</ShellBarBranding>
			</ShellBar>
		);
		cy.screenshot();
	});

	it("with href — renders as link", () => {
		cy.mount(
			<ShellBar>
				<ShellBarBranding slot="branding" href="https://www.sap.com">
					<Avatar slot="logo" initials="S" colorScheme="Accent10" shape="Square" />
					Product Title
				</ShellBarBranding>
			</ShellBar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ShellBar>
					<ShellBarBranding slot="branding">
						<Avatar slot="logo" initials="S" colorScheme="Accent10" shape="Square" />
						Product Title
					</ShellBarBranding>
				</ShellBar>
			</div>
		);
		cy.screenshot();
	});
});

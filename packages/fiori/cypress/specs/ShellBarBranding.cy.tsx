import ShellBar from "../../src/ShellBar.js";
import ShellBarBranding from "../../src/ShellBarBranding.js"

describe("ShellBarBranding", () => {
	const basicTemplate = (brandingProps = {}, shellBarProps = {}) => {
		const defaultShellBarProps = {
			id: "shellbar",
			...shellBarProps
		};

		const defaultBrandingProps = {
			id: "shellbarBranding",
			slot: "branding",
			...brandingProps
		};

		cy.mount(
			<ShellBar {...defaultShellBarProps}>
				<ShellBarBranding {...defaultBrandingProps}>
					Branding Comp
					<img id="brandingLogo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" slot="logo"/>
				</ShellBarBranding>
			</ShellBar>
		);

		cy.get("#shellbar").find("#shellbarBranding").shadow().as("shellbarBranding");
	};

	describe("Properties", () => {
		it("Test ui5-shellbar-branding href property", () => {
			basicTemplate({ href: "https://ui5.github.io/webcomponents/", target: "_blank" });

			cy.get("@shellbarBranding")
				.find("a")
				.should("have.prop", "href", "https://ui5.github.io/webcomponents/");
		});

		it("Test ui5-shellbar-branding target property", () => {
			basicTemplate({ href: "https://ui5.github.io/webcomponents/", target: "_blank" });

			cy.get("@shellbarBranding")
				.find("a")
				.should("have.attr", "target", "_blank");
		});

		it("Test ui5-shellbar-branding accessibleName property", () => {
			basicTemplate({ accessibleName: "Accessible Name" });

			cy.get("@shellbarBranding")
				.find("a")
				.should("have.attr", "aria-label", "Accessible Name");
		});
	});

	describe("Slots", () => {
		it("Test ui5-shellbar-branding logo slot", () => {
			basicTemplate();

			cy.get("#brandingLogo")
				.should("exist")
				.should("have.attr", "slot", "logo");

			cy.get("@shellbarBranding")
				.find("slot[name='logo']")
				.should("exist");
		});

		it("Test ui5-shellbar-branding default content slot", () => {
		basicTemplate();

		cy.get("@shellbarBranding")
		 	.find(".ui5-shellbar-title")
			.find("slot")
			.should("exist");
		});

	});

	describe("Accessibility", () => {
		it("Test ui5-shellbar-branding accessibility - role when href is not added", () => {
			basicTemplate();

			cy.get("@shellbarBranding")
				.find("a")
				.should("have.attr", "role", "button");
		});

		it("Test ui5-shellbar-branding accessibility - role when href is added", () => {
			basicTemplate({ href: "https://ui5.github.io/webcomponents/" });

			cy.get("@shellbarBranding")
				.find("a")
				.should("have.attr", "role", "link");
		});

		it("Test ui5-shellbar-branding accessibility - default aria-label", () => {
			basicTemplate();

			cy.get("@shellbarBranding")
				.find("a")
				.should("have.attr", "aria-label", "Branding Comp");
		});

		it("Test ui5-shellbar-branding tabIndex", () => {
			basicTemplate();

			cy.get("@shellbarBranding")
				.find("a")
				.should("have.attr", "tabIndex", "0");
		});
	});
});

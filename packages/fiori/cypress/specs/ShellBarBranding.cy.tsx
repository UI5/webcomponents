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

	it("fires click event on Enter and Space", () => {
			basicTemplate();

			cy.get("[slot='branding']").then(branding => {
				branding.get(0).addEventListener("ui5-click", cy.stub().as("brandingClick"));
			});

			cy.get("@shellbarBranding")
				.find("a")
				.focus()
				.realPress("Enter")
				.realPress("Space");

			cy.get("@brandingClick")
				.should("have.been.calledTwice");
		});

	describe("Empty branding", () => {
		it("renders nothing when it has neither logo nor title text", () => {
			cy.mount(
				<ShellBar id="shellbar">
					<ShellBarBranding id="shellbarBranding" slot="branding"></ShellBarBranding>
				</ShellBar>
			);

			cy.get("#shellbarBranding")
				.should("have.attr", "_empty");

			cy.get("#shellbarBranding")
				.should("not.be.visible");
		});

		it("is not rendered as a focusable branding area in the shellbar", () => {
			cy.mount(
				<ShellBar id="shellbar">
					<ShellBarBranding id="shellbarBranding" slot="branding"></ShellBarBranding>
				</ShellBar>
			);

			cy.get("#shellbar")
				.shadow()
				.find(".ui5-shellbar-branding-area")
				.should("not.exist");
		});

		it("stays visible and focusable when only a logo is present", () => {
			cy.mount(
				<ShellBar id="shellbar">
					<ShellBarBranding id="shellbarBranding" slot="branding">
						<img id="logoOnly" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" slot="logo"/>
					</ShellBarBranding>
				</ShellBar>
			);

			cy.get("#shellbarBranding")
				.should("not.have.attr", "_empty");

			cy.get("#shellbarBranding")
				.should("be.visible");

			cy.get("#shellbarBranding")
				.shadow()
				.find("a")
				.should("have.attr", "tabIndex", "0");
		});

		it("becomes visible when title text is added at runtime", () => {
			cy.mount(
				<ShellBar id="shellbar">
					<ShellBarBranding id="shellbarBranding" slot="branding"></ShellBarBranding>
				</ShellBar>
			);

			cy.get("#shellbarBranding").should("have.attr", "_empty");

			cy.get("#shellbarBranding").then($b => {
				$b.get(0).textContent = "Added Later";
			});

			cy.get("#shellbarBranding")
				.should("not.have.attr", "_empty");

			cy.get("#shellbarBranding")
				.should("be.visible");

			cy.get("#shellbar")
				.shadow()
				.find(".ui5-shellbar-branding-area")
				.should("exist");
		});
	});
});

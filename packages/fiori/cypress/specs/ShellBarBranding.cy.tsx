import ShellBar from "../../src/ShellBar.js";
import ShellBarBranding from "../../src/ShellBarBranding.js"
import Avatar from "@ui5/webcomponents/dist/Avatar.js";

const RESIZE_THROTTLE_RATE = 300; // ms

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

describe("Branding overflow entry", () => {
	const LOGO_SRC = "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg";

	const mountWithTitle = (title = "Product Title") => {
		cy.mount(
			<ShellBar id="shellbar" showNotifications={true} showProductSwitch={true}>
				<ShellBarBranding id="shellbarBranding" slot="branding">
					{title}
					<img id="brandingLogo" src={LOGO_SRC} slot="logo" />
				</ShellBarBranding>
			</ShellBar>
		);

		cy.get("#shellbar").as("shellbar");
	};

	const mountLogoOnly = () => {
		cy.mount(
			<ShellBar id="shellbar" showNotifications={true} showProductSwitch={true}>
				<ShellBarBranding id="shellbarBranding" slot="branding">
					<img id="brandingLogo" src={LOGO_SRC} slot="logo" />
				</ShellBarBranding>
			</ShellBar>
		);

		cy.get("#shellbar").as("shellbar");
	};

	const mountWithAvatarLogo = (title = "Product Title") => {
		cy.mount(
			<ShellBar id="shellbar" showNotifications={true} showProductSwitch={true}>
				<ShellBarBranding id="shellbarBranding" slot="branding">
					{title}
					<Avatar id="brandingLogo" slot="logo" initials="PT" />
				</ShellBarBranding>
			</ShellBar>
		);

		cy.get("#shellbar").as("shellbar");
	};

	const forceIdentifierOverflow = () => {
		cy.viewport(200, 1080);
		cy.wait(RESIZE_THROTTLE_RATE);

		// The identifier must be reported hidden before we open the popover.
		cy.get("@shellbar").should(($shellbar) => {
			const hidden = ($shellbar[0] as any).hiddenItemsIds as string[];
			expect(hidden, "branding identifier should be in overflow").to.include("branding-identifier");
		});
	};

	const forceLogoOverflow = () => {
		cy.viewport(120, 1080);
		cy.wait(RESIZE_THROTTLE_RATE);

		// For logo-only branding the logo itself must overflow.
		cy.get("@shellbar").should(($shellbar) => {
			const hidden = ($shellbar[0] as any).hiddenItemsIds as string[];
			expect(hidden, "branding logo should be in overflow").to.include("branding-logo");
		});
	};

	const openOverflowPopover = () => {
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-button")
			.should("exist")
			.realClick();

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-popover")
			.should("have.attr", "open");
	};

	it("shows a branding entry first in the popover when the identifier is hidden", () => {
		mountWithTitle("Product Title");
		forceIdentifierOverflow();
		openOverflowPopover();

		// Branding entry exists and is the first child of the overflow list.
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-popover .ui5-shellbar-overflow-branding")
			.should("exist");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-popover ui5-list")
			.children()
			.first()
			.should("have.class", "ui5-shellbar-overflow-branding");

		// Title span equals the identifier text.
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-branding .ui5-shellbar-overflow-branding-title")
			.should("have.text", "Product Title");
	});

	it("clones the img logo into the popover entry", () => {
		mountWithTitle("Product Title");
		forceIdentifierOverflow();
		openOverflowPopover();

		// The cloned <img> lives inside the popover subtree with the fixture src.
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-popover .ui5-shellbar-overflow-branding-logo img")
			.should("exist")
			.and("have.attr", "src", LOGO_SRC)
			.and("not.have.attr", "slot");

		// The original slotted logo is still in the light DOM (not moved).
		cy.get("#brandingLogo")
			.should("exist")
			.and("have.attr", "slot", "logo");
	});

	it("clones a ui5-avatar logo into the popover entry", () => {
		mountWithAvatarLogo("Product Title");
		forceIdentifierOverflow();
		openOverflowPopover();

		// The cloned ui5-avatar lives inside the popover subtree with no slot attribute.
		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-popover .ui5-shellbar-overflow-branding-logo [ui5-avatar]")
			.should("exist")
			.and("not.have.attr", "slot");

		// The original slotted logo is still in the light DOM (not moved).
		cy.get("#brandingLogo")
			.should("exist")
			.and("have.attr", "slot", "logo");
	});

	it("fires the branding click event and closes the popover on entry click", () => {
		mountWithTitle("Product Title");

		cy.get("[slot='branding']").then(branding => {
			branding.get(0).addEventListener("ui5-click", cy.stub().as("brandingClick"));
		});

		forceIdentifierOverflow();
		openOverflowPopover();

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-branding")
			.realClick();

		cy.get("@brandingClick").should("have.been.calledOnce");

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-popover")
			.should("not.have.attr", "open");

		cy.get("@shellbar").should("have.prop", "overflowPopoverOpen", false);
	});

	it("sets aria-label to '[Identifier] Home'", () => {
		mountWithTitle("Product Title");
		forceIdentifierOverflow();
		openOverflowPopover();

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-branding")
			.should("have.attr", "aria-label", "Product Title Home");
	});

	it("falls back to 'Home' for a logo-only branding", () => {
		mountLogoOnly();
		forceLogoOverflow();
		openOverflowPopover();

		cy.get("@shellbar")
			.shadow()
			.find(".ui5-shellbar-overflow-branding")
			.should("have.attr", "aria-label", "Home");
	});
});

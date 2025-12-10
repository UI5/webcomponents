import Bar from "../../src/Bar.js";
import Button from "../../src/Button.js";
import Dialog from "../../src/Dialog.js";
import Link from "../../src/Link.js";

describe("General API", () => {
	it("render initially", () => {
		cy.mount(<Link></Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("exist");
	});

	it("tests rel attribute", () => {
		cy.mount(<Link href="https://www.sap.com" target="_blank"></Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "rel", "noreferrer noopener");
	});

	it("should wrap the text of the link", () => {
		cy.mount(
			<>
				<Link style="width: 100px" id="wrapping-link">Eu enim consectetur do amet elit Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Link>
				<Link style="width: 100px" id="non-wrapping-link" wrappingType="None">Eu enim consectetur do amet elit Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Link>
			</>
		);

		cy.get("#wrapping-link")
			.shadow()
			.find(".ui5-link-root")
			.should($root => {
				const clientHeight = $root[0].clientHeight;
				expect(clientHeight).to.be.greaterThan(16);
			});

		cy.get("#non-wrapping-link")
			.shadow()
			.find(".ui5-link-root")
			.should($root => {
				const clientHeight = $root[0].clientHeight;
				expect(clientHeight).to.be.eq(16);
			});
	});

	it("clicking the link works", () => {
		cy.mount(<Link href="#testClick">Click me</Link>);

		cy.url()
			.should("not.include", "#testClick");

		cy.get("[ui5-link]")
			.realClick();

		cy.url()
			.should("include", "#testClick");
	});

	it("should prevent clicking on disabled link", () => {
		cy.mount(<Link href="#testDisabled" disabled>Click me</Link>);

		cy.url()
			.should("not.include", "#testDisabled");

		cy.get("[ui5-link]")
			.realClick();

		cy.url().should("not.include", "#testDisabled");
	});

	it("disabled link should not be enabled", () => {
		cy.mount(<Link disabled>Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-disabled", "true");
	});

	it("tests prevent default", () => {
		cy.mount(<Link href="#testPreventDefault">Click me</Link>);

		cy.url()
			.should("not.include", "#testPreventDefault");

		cy.get("[ui5-link]")
			.then($link => {
				$link.get(0).addEventListener("click", event => {
					event.preventDefault();
				});
			});

		cy.get("[ui5-link]")
			.realClick();

		cy.url()
			.should("not.include", "#testPreventDefault");
	});

	it("link renders aria-expanded attribute", () => {
		cy.mount(<Link href="#">Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.as("innerLink");

		cy.get<Link>("[ui5-link]")
			.then($link => {
				$link.get(0).accessibilityAttributes = {
					"expanded": true,
				};
			});

		cy.get("@innerLink")
			.should("have.attr", "aria-expanded", "true");

		cy.get<Link>("[ui5-link]")
			.then($link => {
				$link.get(0).accessibilityAttributes = {
					"expanded": false,
				};
			});

		cy.get("@innerLink")
			.should("have.attr", "aria-expanded", "false");
	});

	it("link renders proper aria-haspopup attribute", () => {
		cy.mount(<Link>Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.as("innerLink");

		cy.get<Link>("[ui5-link]")
			.then($link => {
				$link.get(0).accessibilityAttributes = {
					"hasPopup": "dialog",
				};
			});

		cy.get("@innerLink")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("setting accessible-name applied on the host element is reflected on the anchor tag", () => {
		cy.mount(<Link accessibleName="more info" tooltip="my tooltip">Click me</Link>);

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-label", "more info");

		cy.get("[ui5-link]")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "title", "my tooltip");
	});

	it("passes special keys pressed while item clicked", () => {
		cy.mount(<Link>Link</Link>);

		cy.get("[ui5-link]")
			.then($link => {
				$link[0].addEventListener("click", cy.stub().as("clickHandler"));
			});

		// CTRL Key
		cy.get("[ui5-link]")
			.realClick({ ctrlKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { ctrlKey: true } });

		// META Key
		cy.get("[ui5-link]")
			.realClick({ metaKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { metaKey: true } });

		// ALT Key
		cy.get("[ui5-link]")
			.realClick({ altKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { altKey: true } });

		// SHIFT Key
		cy.get("[ui5-link]").realClick({ shiftKey: true });

		cy.get("@clickHandler")
			.should("be.calledWithMatch", { detail: { shiftKey: true } });
	});

	it("links have icons", () => {
		cy.mount(
			<>
				<Link id="linkWithIcon" icon="employee">View employee profile</Link>
				<Link id="linkWithEndIcon" endIcon="cloud">Weather today</Link>
			</>
		);
		cy.get("#linkWithIcon")
			.shadow()
			.find("[ui5-icon]")
			.should("exist");

		cy.get("#linkWithEndIcon")
			.shadow()
			.find("[ui5-icon]")
			.should("exist");
	});

	it("should open the dialog when the link is clicked", () => {
		cy.mount(<>
				<Link>Sign in</Link>
				<Dialog>
					<Button ></Button>
				</Dialog>
			</>
		);

		cy.get("[ui5-link]")
			.as("signInLink");

		cy.get("[ui5-dialog]")
			.as("signInDialog");

		cy.get("@signInDialog")
			.should("not.be.visible");
	
		cy.get("@signInLink")
			.then($link => {
				$link[0].addEventListener("click", () => {
					(document.querySelector("ui5-dialog") as Dialog).open = true;
				});
			});

		cy.get("@signInDialog")
			.find("[ui5-button]")
			.then($button => {
				$button[0].addEventListener("click", () => {
					(document.querySelector("ui5-dialog") as Dialog).open = false;
			});
		});

		cy.get("@signInLink")
			.shadow()
			.find("a")
			.focus()
			.should("be.focused")
			.realPress("Enter");

		cy.get("@signInDialog")
			.should("be.visible");
	});

	it("tabindex should update when text content is added after mount", () => {
		// Mount link without text content
		cy.mount(<Link id="dynamic-link"></Link>);

		// Initially, tabindex should be -1 because there's no text content
		cy.get("#dynamic-link")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "tabindex", "-1");

		// Add text content dynamically
		cy.get("#dynamic-link")
			.then($link => {
				$link[0].textContent = "Click me";
			});

		// After text is added, tabindex should become 0
		cy.get("#dynamic-link")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "tabindex", "0");
	});

	it("tabindex should remain 0 when text content changes", () => {
		cy.mount(<Link id="text-change-link">Initial Text</Link>);

		cy.get("#text-change-link")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "tabindex", "0");

		cy.get("#text-change-link")
			.then($link => {
				$link[0].textContent = "Updated Text";
			});

		cy.get("#text-change-link")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "tabindex", "0");
	});

	it("tabindex should be -1 when text content is removed", () => {
		cy.mount(<Link id="remove-text-link">Some text</Link>);

		cy.get("#remove-text-link")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "tabindex", "0");

		cy.get("#remove-text-link")
			.then($link => {
				$link[0].textContent = "";
			});

		cy.get("#remove-text-link")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "tabindex", "-1");
	});
});

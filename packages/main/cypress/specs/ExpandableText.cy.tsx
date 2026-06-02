import ExpandableText from "../../src/ExpandableText.js";
import {
	EXPANDABLE_TEXT_SHOW_MORE,
	EXPANDABLE_TEXT_SHOW_LESS,
	EXPANDABLE_TEXT_CLOSE,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("ExpandableText", () => {
	describe("Rendering and Interaction", () => {
		it("Should display only 100 characters by default", () => {
			const text = "This is a very long text that should be displayed. This is a very long text that should be displayed. This is a very long text that should be displayed.";

			cy.mount(<ExpandableText text={text}></ExpandableText>);

			expect(text.length).to.be.greaterThan(100);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text.substring(0, 100))
				.should("exist");
		});

		it("Should display full text if maxCharacters are set, but not exceeded", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(<ExpandableText text={text} maxCharacters={9999}></ExpandableText>);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.contains(text)
				.should("exist");
		});

		it("Should display 'Show More' if maxCharacters are set and exceeded", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(<ExpandableText text={text} maxCharacters={maxCharacters}></ExpandableText>);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist")
				.should("have.attr", "ui5-link");
		});

		it("Should display 'Show More' if maxCharacters are exceeded, set to 0", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(<ExpandableText text={text} maxCharacters={0}></ExpandableText>);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(/^$/)
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("Should NOT display 'Show More' if maxCharacters are 0, but text is empty", () => {
			cy.mount(<ExpandableText maxCharacters={0}></ExpandableText>);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(/^$/)
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.should("not.exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.should("not.exist");
		});

		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(<ExpandableText text={text} maxCharacters={maxCharacters}></ExpandableText>);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text)
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("Toggling 'Show More' and 'Show Less' with keyboard", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(
				<>
					<button id="before">before</button>
					<ExpandableText text={text} maxCharacters={maxCharacters}></ExpandableText>
				</>
			);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("#before")
				.focus();

			cy.get("#before")
				.realPress("Tab");

			cy.get("@toggle")
				.realPress("Enter");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text)
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.realPress("Enter");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("Scrolls toggle link into view on expansion", () => {
			const text = "A".repeat(5000);
			const maxCharacters = 5;

			cy.mount(
				<div style={{ height: "200px", overflow: "auto" }}>
					<ExpandableText text={text} maxCharacters={maxCharacters}></ExpandableText>
				</div>
			);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.realClick();

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.should("be.visible");
		});

		it("ARIA attributes", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(<ExpandableText text={text} maxCharacters={5}></ExpandableText>);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@toggle")
				.should("have.attr", "accessible-role", "Button");

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: false,
				});

			cy.get("@toggle")
				.realClick();

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: true,
				});
		});
	});

	describe("CSS Inheritance", () => {
		it("Text element inherits white-space from host", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(
				<div style={{ whiteSpace: "pre-wrap" }}>
					<ExpandableText text={text} maxCharacters={9999}></ExpandableText>
				</div>
			);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find(".ui5-exp-text-text")
				.should("have.css", "white-space", "pre-wrap")
				.and("have.css", "display", "inline");
		});

		it("Text element inherits white-space 'nowrap' from host", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(
				<div style={{ whiteSpace: "nowrap" }}>
					<ExpandableText text={text} maxCharacters={9999}></ExpandableText>
				</div>
			);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find(".ui5-exp-text-text")
				.should("have.css", "white-space", "nowrap");
		});

		it("Popover and popover text inherit white-space, font-family, and font-size from host", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(
				<div style={{ whiteSpace: "pre-line" }}>
					<ExpandableText text={text} maxCharacters={maxCharacters} overflowMode="Popover"></ExpandableText>
				</div>
			);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.realClick();

			cy.get("[ui5-expandable-text]")
				.invoke("css", "font-family")
				.then(hostFontFamily => {
					cy.get("[ui5-expandable-text]")
						.invoke("css", "font-size")
						.then(hostFontSize => {
							cy.get("@expTextShadow")
								.find(".ui5-exp-text-popover")
								.should("have.css", "white-space", "pre-line")
								.and("have.css", "font-family", hostFontFamily as unknown as string)
								.and("have.css", "font-size", hostFontSize as unknown as string);

							cy.get("@expTextShadow")
								.find(".ui5-exp-text-popover-text")
								.should("have.css", "white-space", "pre-line")
								.and("have.css", "font-family", hostFontFamily as unknown as string)
								.and("have.css", "font-size", hostFontSize as unknown as string);
						});
				});
		});
	});

	describe("Empty Indicator", () => {
		it("Should display empty indicator if text is empty and emptyIndicatorMode=On", () => {
			cy.mount(<ExpandableText text="" emptyIndicatorMode="On"></ExpandableText>);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.should("have.attr", "empty-indicator-mode", "On");
		});

		it("Should NOT display empty indicator if text is empty and emptyIndicatorMode=Off", () => {
			cy.mount(<ExpandableText text="" emptyIndicatorMode="Off"></ExpandableText>);

			cy.get("[ui5-expandable-text]")
				.shadow()
				.find("[ui5-text]")
				.should("have.attr", "empty-indicator-mode", "Off");
		});
	});

	describe("Rendering and Interaction with overflowMode=Popover", () => {
		it("Toggling 'Show More' and 'Show Less'", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(<ExpandableText text={text} maxCharacters={maxCharacters} overflowMode="Popover"></ExpandableText>);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@expTextShadow")
				.find("[ui5-text]")
				.contains(text.substring(0, maxCharacters))
				.should("exist");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-ellipsis")
				.contains("... ")
				.should("exist");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.realClick();

			cy.get("@toggle")
				.invoke("attr", "id")
				.as("expectedOpenerId");

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.as("rpo");

			cy.get("@rpo")
				.should("exist")
				.should("have.attr", "open");

			cy.get("@rpo")
				.should("have.attr", "content-only-on-desktop");

			cy.get("@rpo")
				.invoke("attr", "opener")
				.then(function testOpenerId(opener) {
					expect(opener).to.equal(this.expectedOpenerId);
				});

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.should("not.have.attr", "open");
		});

		it("ARIA attributes", () => {
			const text = "This is a very long text that should be displayed";

			cy.mount(<ExpandableText text={text} maxCharacters={5} overflowMode="Popover"></ExpandableText>);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("@toggle")
				.should("have.attr", "accessible-name");

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: false,
					hasPopup: "dialog",
				});

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.should("have.attr", "accessible-name-ref", "popover-text");

			cy.get("@toggle")
				.realClick();

			cy.get("@toggle")
				.invoke("prop", "accessibilityAttributes")
				.should("deep.equal", {
					expanded: true,
					hasPopup: "dialog",
				});
		});

		it("Toggling 'Show More' and 'Show Less' with keyboard", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(
				<>
					<button id="before">before</button>
					<ExpandableText text={text} maxCharacters={maxCharacters} overflowMode="Popover"></ExpandableText>
				</>
			);

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");
			cy.get("@expTextShadow").find(".ui5-exp-text-toggle").as("toggle");

			cy.get("#before")
				.focus();

			cy.get("#before")
				.realPress("Tab");

			cy.get("@toggle")
				.realPress("Enter");

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]")
				.as("rpo");

			cy.get("@rpo")
				.should("exist")
				.should("have.attr", "open");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_LESS.defaultText)
				.should("exist");

			cy.realPress("Escape");

			cy.get("@rpo")
				.should("not.have.attr", "open");

			cy.get("@toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.should("exist");
		});

		it("Toggling 'Show More' and 'Show Less' on Mobile Device", () => {
			const text = "This is a very long text that should be displayed";
			const maxCharacters = 5;

			cy.mount(<ExpandableText text={text} maxCharacters={maxCharacters} overflowMode="Popover"></ExpandableText>);
			cy.ui5SimulateDevice("phone");

			cy.get("[ui5-expandable-text]").shadow().as("expTextShadow");

			cy.get("@expTextShadow")
				.find(".ui5-exp-text-toggle")
				.contains(EXPANDABLE_TEXT_SHOW_MORE.defaultText)
				.realClick();

			cy.get("@expTextShadow")
				.find("[ui5-responsive-popover]").as("rpo");

			cy.get("@rpo")
				.should("exist")
				.should("have.attr", "open");

			cy.get("@rpo")
				.should("have.attr", "_hide-header");

			cy.get("@rpo")
				.contains("[slot=footer] [ui5-button]", EXPANDABLE_TEXT_CLOSE.defaultText)
				.should("exist")
				.and("be.visible");

			cy.get("@rpo")
				.contains("[slot=footer] [ui5-button]", EXPANDABLE_TEXT_CLOSE.defaultText)
				.realClick();

			cy.get("@rpo")
				.should("not.have.attr", "open");
		});
	});
});

import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base/dist/index.js";
import Button from "../../src/Button.js";
import { TOKENIZER_ARIA_LABEL, MULTIINPUT_SHOW_MORE_TOKENS } from "../../src/generated/i18n/i18n-defaults.js";

const onTokenDelete = (event: UI5CustomEvent<Tokenizer, "token-delete">) => {
	event.detail.tokens.forEach(token => {
		(event.target as Tokenizer).removeChild(token);
	});
};

describe("General Interaction", () => {
	it("tests focus handling when clicking on the tokenizer", () => {
		cy.mount(
			<>
				<div style={{ display: "flex", flexDirection: "column", width: "240px" }}>
					<Tokenizer>
						<Token text="Andora"></Token>
						<Token text="Bulgaria"></Token>
						<Token text="So close no matter how far"></Token>
						<Token text="Lose yourself in the music bum bam tupturup"></Token>
					</Tokenizer>
				</div>
				<Button> Dummy button </Button>
			</>
		);

		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("@firstToken")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.should("have.attr", "expanded");

		cy.get("@firstToken")
			.should("have.attr", "focused");

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.realPress("Tab");

		cy.get("[ui5-tokenizer]")
			.should("not.have.attr", "expanded");

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.realPress(["Shift", "Tab"]);

		cy.get("[ui5-tokenizer]")
			.should("have.attr", "expanded");

		cy.get("@firstToken")
			.should("have.attr", "focused");
	});
});

describe("Tokenizer nMore Popover", () => {
	it("tests opening of nMore Popover", () => {
		cy.mount(
			<div style={{display: "flex", flexDirection: "column", width: "240px"}}>
				<Tokenizer id="nmore-tokenizer">
					<Token text="Andora"></Token>
					<Token text="Bulgaria"></Token>
					<Token text="Canada"></Token>
					<Token text="Denmark"></Token>
					<Token text="Estonia"></Token>
				</Tokenizer>
			</div>
		);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("nMoreLabel");

		cy.get("@nMoreLabel")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("ui5-li")
			.eq(0)
			.should("be.focused");

		cy.realPress("Escape");

		cy.get("[ui5-token]")
			.eq(4)
			.should("have.attr", "focused");
	});

	it("tests F7 list item navigation", () => {
		cy.mount(
			<div style={{display: "flex", flexDirection: "column", width: "240px"}}>
				<Tokenizer id="nmore-tokenizer">
					<Token text="Andora"></Token>
					<Token text="Bulgaria"></Token>
					<Token text="Canada"></Token>
					<Token text="Denmark"></Token>
					<Token text="Estonia"></Token>
				</Tokenizer>
			</div>
		);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("nMoreLabel");

		cy.get("@nMoreLabel")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("ui5-li")
			.eq(0)
			.as("firstLI");

		cy.get("@firstLI")
			.should("be.focused");

		cy.get("@firstLI")
			.shadow()
			.find("[ui5-button]")
			.as("deleteButton");

		cy.realPress("F7");

		cy.get("@deleteButton")
			.should("be.focused");

		cy.realPress("F7");

		cy.get("@firstLI")
			.should("be.focused");

		cy.get("@deleteButton")
			.should("not.be.focused");
	});

	it("tests item deletion via mouse", () => {
		cy.mount(
			<Tokenizer id="test-token-delete" style={{ width: "100px" }} onTokenDelete={onTokenDelete}>
				<Token text="aute"></Token>
				<Token text="ad"></Token>
				<Token text="exercitation"></Token>
				<Token text="esse"></Token>
				<Token text="labore"></Token>
				<Token text="amet"></Token>
				<Token text="excepteur"></Token>
			</Tokenizer>
		);

		cy.get("#test-token-delete")
			.find("[ui5-token]")
			.should("have.length", 7);

		cy.get("#test-token-delete")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.realClick();

		cy.get("#test-token-delete")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("be.visible");

		cy.get("#test-token-delete")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]").eq(0)
			.shadow()
			.find(".ui5-li-deletebtn [ui5-button]")
			.realClick();

		cy.get("#test-token-delete")
			.find("[ui5-token]")
			.should("have.length", 6);
	});

	it("tests item deletion via keyboard", () => {
		cy.mount(
			<div style={{display: "flex", flexDirection: "column", width: "240px"}}>
				<Tokenizer id="nmore-tokenizer">
					<Token text="Andora"></Token>
					<Token text="Bulgaria"></Token>
					<Token text="Canada"></Token>
					<Token text="Denmark"></Token>
					<Token text="Estonia"></Token>
				</Tokenizer>
			</div>
		);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("nMoreLabel");

		cy.get("@nMoreLabel")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("ui5-li")
			.eq(0)
			.should("be.focused");

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("ui5-li")
			.eq(1)
			.as("secondListItem");

		cy.realPress("Delete");

		cy.get("@secondListItem")
			.should("be.focused");
	});
});

describe("Disabled", () => {
	it("Disabled Tokenizer should not be interactive", () => {
		cy.mount(
			<Tokenizer disabled>
				<Token text="Test Token"></Token>

			</Tokenizer>
		);

		cy.get("[ui5-tokenizer]")
			.should("have.attr", "disabled");

		// Verify tokenizer is not interactive by checking that clicking doesn't expand it
		cy.get("[ui5-token]")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.should("not.have.attr", "expanded");
	});

	it("should not fire events when disabled", () => {
		cy.mount(
			<Tokenizer disabled onTokenDelete={cy.stub().as("tokenDelete")}>
				<Token text="Test Token"></Token>
			</Tokenizer>
		);

		cy.get("[ui5-token]")
			.realClick();

		cy.realPress("Backspace");
		cy.realPress("Delete");

		cy.get("@tokenDelete")
			.should("not.have.been.called");

		cy.get("[ui5-token]")
			.should("have.length", 1);
	});
});

describe("Single token", () => {
	it("should open popover on click of single token", () => {
		cy.mount(
			<Tokenizer style={{ width: "150px" }}>
				<Token text="This is a very long token text that should be truncated"></Token>
			</Tokenizer>
		);

		cy.get("[ui5-token]")
			.eq(0)
			.as("singleToken");

		cy.get("@singleToken")
			.should("have.prop", "singleToken", true);

		cy.get("@singleToken")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("@singleToken")
			.should("have.attr", "selected");

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("ui5-li")
			.eq(0)
			.should("be.focused");

		cy.get("@singleToken")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("not.have.attr", "open");

		cy.get("@singleToken")
			.should("not.have.attr", "selected");

		cy.get("@singleToken")
			.should("have.attr", "focused");
	});
});

describe("Readonly", () => {
	it("should not fire token-delete when Tokenizer is readonly", () => {
		cy.mount(
			<Tokenizer readonly onTokenDelete={onTokenDelete}>
				<Token text="Andora" readonly></Token>
				<Token text="Bulgaria" readonly></Token>
				<Token text="Canada" readonly></Token>
				<Token text="Denmark" readonly></Token>
				<Token text="Estonia" readonly></Token>
			</Tokenizer>
		);

		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("Backspace");
		cy.realPress("Delete");

		cy.get("[ui5-token]")
			.should("have.length", 5);
	});

	it("tests expanding of tokenizer + focus handling in readonly mode.", () => {
		cy.mount(
			<div style={{display: "flex", flexDirection: "column", width: "240px"}}>
				<Tokenizer readonly onTokenDelete={onTokenDelete}>
					<Token text="Andora" readonly></Token>
					<Token text="Bulgaria" readonly></Token>
					<Token text="Canada" readonly></Token>
					<Token text="Denmark" readonly></Token>
					<Token text="Estonia" readonly></Token>
				</Tokenizer>
			</div>
		);

		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("@secondToken")
			.realClick();

		cy.get("[ui5-tokenizer]")
			.should("have.attr", "expanded");

		cy.get("@secondToken")
			.should("have.attr", "selected")

		cy.get("@secondToken")
			.should("be.focused");

		cy.realPress("Tab");

		cy.get("[ui5-tokenizer]")
			.should("not.have.attr", "expanded");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.get("@secondToken")
			.should("not.be.focused");
	});
});

describe("Tokenizer - multi-line and Clear All", () => {
	it("'Clear All' link is rendered for multi-line tokenizer and show-clear-all set to true", () => {
		cy.mount(
			<Tokenizer showClearAll={true} multiLine={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("exist");
	});

	it("'Clear All' link is rendered even for 1 token when in multi-line mode", () => {
		cy.mount(
			<Tokenizer showClearAll={true} multiLine={true}>
				<Token text="Andora"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("exist");
	});

	it("'Clear All' link is not rendered for single-line tokenizer even when show-clear-all is set to true", () => {
		cy.mount(
			<Tokenizer showClearAll={true}>
				<Token text="Andora"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'Clear All' link is not rendered for multi-line tokenizer when show-clear-all is set to false", () => {
		cy.mount(
			<Tokenizer multiLine={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'Clear All' link is not rendered for multi-line readonly tokenizer when show-clear-all 'true'", () => {
		cy.mount(
			<Tokenizer showClearAll={true} multiLine={true} readonly={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.should("not.exist");
	});

	it("'n-more' link is not rendered for multi-line tokenizer", () => {
		cy.mount(
			<Tokenizer multiLine={true} style={{ width: "100px" }}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--more-text")
			.should("not.exist");
	});

	it("Pressing 'Clear All' link fires token-delete event", () => {
		cy.mount(
			<Tokenizer multiLine={true} showClearAll={true}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]").then($tokenizer => $tokenizer.get(0).addEventListener("token-delete", cy.stub().as("delete")));

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--clear-all")
			.eq(0)
			.click();

		cy.get("@delete")
			.should("have.been.calledOnce");
	});

	it("tests token removal", () => {
		cy.mount(
			<Tokenizer id="test-token-delete" style={{ width: "100px" }} onTokenDelete={onTokenDelete}>
				<Token text="aute"></Token>
				<Token text="ad"></Token>
				<Token text="exercitation"></Token>
				<Token text="esse"></Token>
				<Token text="labore"></Token>
				<Token text="amet"></Token>
				<Token text="excepteur"></Token>
			</Tokenizer>
		);

		cy.get("#test-token-delete")
			.find("[ui5-token]")
			.should("have.length", 7);

		cy.get("#test-token-delete")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.realClick();

		cy.get("#test-token-delete")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("be.visible");

		cy.get("#test-token-delete")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]").eq(0)
			.shadow()
			.find(".ui5-li-deletebtn [ui5-button]")
			.realClick();

		cy.get("#test-token-delete")
			.find("[ui5-token]")
			.should("have.length", 6);
	});

	it("handles overflow mechanism as expected", () => {
		cy.mount(
			<Tokenizer style={{ width: "100%" }}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Andora"></Token>
			</Tokenizer>
		);

		cy.get("ui5-token")
			.eq(5)
			.as("lastToken");

		cy.get("@lastToken")
			.should("be.visible");

		cy.viewport(500, 600);

		cy.get("ui5-tokenizer")
			.shadow()
			.find("span")
			.should("have.attr", "aria-haspopup", "dialog")
			.as("n-more");

		cy.get("@lastToken")
			.should("be.hidden");

		cy.viewport(600, 600);

		cy.get("@lastToken")
			.should("be.visible");
	});
});

describe("Tokenizer - Popover List Item Text Updates", () => {
	it("updates list item text in popover when token text changes", () => {
		cy.mount(
			<Tokenizer id="test-token-text-update" style={{ width: "100px" }}>
				<Token text="Original Text" id="token-to-modify"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
				<Token text="Finland"></Token>
				<Token text="Germany"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.realClick();

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("be.visible");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Original Text");

		cy.get("#token-to-modify").invoke("prop", "text", "Updated Text");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Updated Text");

		cy.get("#test-token-text-update")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("not.have.attr", "text", "Original Text");
	});

	it("updates multiple list items when multiple token texts change", () => {
		cy.mount(
			<Tokenizer id="test-multiple-token-updates" style={{ width: "100px" }}>
				<Token text="Token 1" id="token-1"></Token>
				<Token text="Token 2" id="token-2"></Token>
				<Token text="Token 3" id="token-3"></Token>
				<Token text="Denmark"></Token>
				<Token text="Estonia"></Token>
			</Tokenizer>
		);

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.realClick();

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Token 1");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(1)
			.should("have.attr", "text", "Token 2");

		cy.get<Token>("[ui5-token]").eq(0).invoke("prop", "text", "Modified Token 1");
		cy.get<Token>("[ui5-token]").eq(1).invoke("prop", "text", "Modified Token 2");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(0)
			.should("have.attr", "text", "Modified Token 1");

		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(1)
			.should("have.attr", "text", "Modified Token 2");

		// Verify unchanged token remains the same
		cy.get<Tokenizer>("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-list] [ui5-li]")
			.eq(2)
			.should("have.attr", "text", "Token 3");
	});
});

describe("Accessibility", () => {
	it("should test aria-readonly attribute", () => {
		cy.mount(
			<Tokenizer readonly>
				<Token text="Andora" readonly></Token>
			</Tokenizer>
		);

		cy.get("[ui5-tokenizer]")
			.should("have.attr", "readonly");

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--list")
			.should("have.attr", "aria-readonly");
	});

	it("should test aria-disabled attribute", () => {
		cy.mount(
			<Tokenizer disabled>
				<Token>Andorra</Token>
			</Tokenizer>
		);

		cy.get("[ui5-tokenizer]")
			.should("have.attr", "disabled");

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--list")
			.should("have.attr", "aria-disabled");
	});

	it("should test tokenizer content aria attributes",  () => {
		cy.mount(
			<Tokenizer>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
			</Tokenizer>
		);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--list")
			.as("list");

		cy.get("@list")
			.should("have.attr", "role", "listbox");

		cy.get("@list")
			.should("have.attr", "aria-label", TOKENIZER_ARIA_LABEL.defaultText);

		cy.get("[ui5-tokenizer]")
			.invoke("attr", "accessible-name", "Test label");

		cy.get("@list")
			.should("have.attr", "aria-label", "Test label");

		cy.get("@list")
			.should("have.attr", "aria-description", TOKENIZER_ARIA_LABEL.defaultText);
	});

	it("should test nMore aria attributes", () => {
		cy.mount(
			<div style={{ display: "flex", flexDirection: "column", width: "240px" }}>
				<Tokenizer>
					<Token text="Andora"></Token>
					<Token text="Bulgaria"></Token>
					<Token text="So close no matter how far"></Token>
					<Token text="Lose yourself in the music bum bam tupturup"></Token>
				</Tokenizer>
			</div>
		);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("nMoreLabel");

		cy.get("@nMoreLabel")
			.should("have.attr", "role", "button");

		cy.get("@nMoreLabel")
			.should("have.attr", "aria-haspopup", "dialog");
	});
	it("nMore link should be translated", () => {
		cy.mount(
			<div style={{ display: "flex", flexDirection: "column", width: "240px" }}>
				<Tokenizer>
					<Token text="Andora"></Token>
					<Token text="Bulgaria"></Token>
					<Token text="So close no matter how far"></Token>
					<Token text="Lose yourself in the music bum bam tupturup"></Token>
				</Tokenizer>
			</div>
		);
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer-more-text")
			.as("nMoreLabel");

		cy.get("[ui5-tokenizer]")
			.then($tokenizer => {
				const tokenizer = $tokenizer[0];
				const resourceBundle = (tokenizer.constructor as any).i18nBundle;

				cy.get("@nMoreLabel")
					.should("have.text", resourceBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS.defaultText, 2));
			});
	});
});

describe("Scrolling Behavior", () => {
	it("should scroll to end when tokenizer is expanded without focused token", () => {
		cy.mount(
			<div style={{ width: "150px" }}>
				<Tokenizer>
					<Token text="Very long token text that will definitely cause overflow in this narrow container"></Token>
					<Token text="Another very long token text that also causes overflow"></Token>
					<Token text="Third very long token text for overflow"></Token>
					<Token text="Fourth very long token text for overflow"></Token>
					<Token text="Fifth very long token text for overflow"></Token>
				</Tokenizer>
			</div>
		);

		// Verify there's actually overflow to test
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				const element = $content[0];
				// Only proceed if there's actual overflow
				if (element.scrollWidth > element.clientWidth) {
					expect(element.scrollLeft).to.equal(0);
				}
			});

		// Click on tokenizer container to expand it
		cy.get("[ui5-tokenizer]")
			.realClick();

		// Verify tokenizer is expanded
		cy.get("[ui5-tokenizer]")
			.should("have.attr", "expanded");

		// Should scroll to end when expanded without focused token (only if there's overflow)
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				const element = $content[0];
				const maxScroll = element.scrollWidth - element.clientWidth;
				if (maxScroll > 0) {
					// Should be scrolled to the end (or close to it)
					expect(element.scrollLeft).to.be.greaterThan(maxScroll * 0.5);
				}
			});
	});

	it("should scroll to specific token when token is clicked", () => {
		cy.mount(
			<div style={{ width: "150px" }}>
				<Tokenizer>
					<Token text="Very long token text that will definitely cause overflow in this narrow container"></Token>
					<Token text="Another very long token text that also causes overflow"></Token>
					<Token text="Third very long token text for overflow"></Token>
					<Token text="Fourth very long token text for overflow"></Token>
					<Token text="Fifth very long token text for overflow"></Token>
				</Tokenizer>
			</div>
		);

		// Click on the third token (middle token)
		cy.get("[ui5-token]")
			.eq(2)
			.as("thirdToken")
			.realClick();

		// Verify token is selected and focused (separate assertions)
		cy.get("@thirdToken")
			.should("have.attr", "selected");

		cy.get("@thirdToken")
			.should("have.attr", "focused");

		// Verify tokenizer is expanded
		cy.get("[ui5-tokenizer]")
			.should("have.attr", "expanded");

		// Should scroll to show the selected token
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				const element = $content[0];
				const maxScroll = element.scrollWidth - element.clientWidth;
				if (maxScroll > 0) {
					// Should be scrolled some amount to show the token
					expect(element.scrollLeft).to.be.greaterThan(0);
				}
			});
	});

	it("should scroll when navigating with Home and End keys", () => {
		cy.mount(
			<div style={{ width: "150px" }}>
				<Tokenizer>
					<Token text="Very long token text that will definitely cause overflow in this narrow container"></Token>
					<Token text="Another very long token text that also causes overflow"></Token>
					<Token text="Third very long token text for overflow"></Token>
					<Token text="Fourth very long token text for overflow"></Token>
					<Token text="Fifth very long token text for overflow"></Token>
				</Tokenizer>
			</div>
		);

		// Click on first token
		cy.get("[ui5-token]")
			.eq(0)
			.realClick();

		// Navigate to the last token using End key
		cy.realPress("End");

		cy.get("[ui5-token]")
			.eq(4)
			.should("have.attr", "focused");

		// Should scroll to end for last token
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				const element = $content[0];
				const maxScroll = element.scrollWidth - element.clientWidth;
				if (maxScroll > 0) {
					expect(element.scrollLeft).to.be.closeTo(maxScroll, 20);
				}
			});

		// Navigate back to first token using Home key
		cy.realPress("Home");

		cy.get("[ui5-token]")
			.eq(0)
			.should("have.attr", "focused");

		// Should scroll back to start for first token
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				const element = $content[0];
				expect(element.scrollLeft).to.be.closeTo(0, 20);
			});
	});

	it("should maintain scroll position when token selection is toggled", () => {
		cy.mount(
			<div style={{ width: "150px" }}>
				<Tokenizer>
					<Token text="Very long token text that will definitely cause overflow in this narrow container"></Token>
					<Token text="Another very long token text that also causes overflow"></Token>
					<Token text="Third very long token text for overflow"></Token>
					<Token text="Fourth very long token text for overflow"></Token>
					<Token text="Fifth very long token text for overflow"></Token>
				</Tokenizer>
			</div>
		);

		// Click on middle token to select it
		cy.get("[ui5-token]")
			.eq(2)
			.as("middleToken")
			.realClick();

		// Get scroll position after clicking middle token
		let scrollAfterClick;
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				scrollAfterClick = $content[0].scrollLeft;
			});

		// Toggle selection with space (should deselect but maintain focus)
		cy.realPress("Space");

		cy.get("@middleToken")
			.should("not.have.attr", "selected");

		cy.get("@middleToken")
			.should("have.attr", "focused");

		// Scroll position should remain the same since token is still focused
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				expect($content[0].scrollLeft).to.equal(scrollAfterClick);
			});
	});

	it("should scroll to end when tokenizer regains focus without focused token", () => {
		cy.mount(
			<div style={{ width: "150px" }}>
				<Tokenizer>
					<Token text="Very long token text that will definitely cause overflow in this narrow container"></Token>
					<Token text="Another very long token text that also causes overflow"></Token>
					<Token text="Third very long token text for overflow"></Token>
					<Token text="Fourth very long token text for overflow"></Token>
					<Token text="Fifth very long token text for overflow"></Token>
				</Tokenizer>
				<button>External button</button>
			</div>
		);

		// Click on a token to expand tokenizer
		cy.get("[ui5-token]")
			.eq(1)
			.realClick();

		// Tab to external button (lose focus)
		cy.realPress("Tab");

		// Verify tokenizer is collapsed
		cy.get("[ui5-tokenizer]")
			.should("not.have.attr", "expanded");

		// Tab back to tokenizer (regain focus)
		cy.realPress(["Shift", "Tab"]);

		// Verify tokenizer is expanded again
		cy.get("[ui5-tokenizer]")
			.should("have.attr", "expanded");

		// Should scroll to end when regaining focus (as per _scrollToEndIfNeeded logic)
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find(".ui5-tokenizer--content")
			.then($content => {
				const element = $content[0];
				const maxScroll = element.scrollWidth - element.clientWidth;
				if (maxScroll > 0) {
					expect(element.scrollLeft).to.be.greaterThan(maxScroll * 0.5);
				}
			});
	});
});

describe("Keyboard Handling", () => {
	beforeEach(() => {
		cy.mount(
			<Tokenizer onTokenDelete={onTokenDelete}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
			</Tokenizer>
		);
	});
	it("token selection", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("ArrowRight");

		cy.get("@secondToken")
			.should("be.focused");

		cy.realPress("Space");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.realPress("Space");

		cy.get("@secondToken")
			.should("not.have.attr", "selected");
	});

	it("LeftArrow/RightArrow navigation", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("ArrowRight");

		cy.get("@secondToken")
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("@firstToken")
			.should("be.focused");
	});

	it("Home/End navigation", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("lastToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("End");

		cy.get("@lastToken")
			.should("be.focused");

		cy.realPress("Home");

		cy.get("@firstToken")
			.should("be.focused");
	});

	it("should select tokens with [Shift] key modifier", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress(["Shift", "ArrowRight"]);

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.get("@secondToken")
			.should("be.focused");

		cy.realPress(["Shift", "ArrowLeft"]);

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.get("@firstToken")
			.should("be.focused");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.get("@secondToken")
			.realClick();

		cy.get("@firstToken")
			.should("not.have.attr", "selected");

		cy.get("@secondToken")
			.should("not.have.attr", "selected");

		cy.get("@secondToken")
			.should("be.focused");
	});

	it("should select tokens with [Shift] + [End] key modifier", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("lastToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress(["Shift", "End"]);

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.get("@lastToken")
			.should("have.attr", "selected");

		cy.get("@lastToken")
			.should("be.focused");
	});

	it("should select tokens with [Shift] + [Home] key modifier", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("lastToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("End");

		cy.get("@lastToken")
			.should("be.focused");

		cy.realPress(["Shift", "Home"]);

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.get("@firstToken")
			.should("be.focused");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.get("@lastToken")
			.should("have.attr", "selected");
	});

	it("should select tokens with [Shift] + [PageDown] key modifier", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("lastToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress(["Shift", "PageDown"]);

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.get("@lastToken")
			.should("have.attr", "selected");

		cy.get("@lastToken")
			.should("be.focused");
	});

	it("should select tokens with [Shift] + [PageUp] key modifier", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("lastToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("End");

		cy.get("@lastToken")
			.should("be.focused");

		cy.realPress(["Shift", "PageUp"]);

		cy.get("@firstToken")
			.should("have.attr", "selected");

		cy.get("@firstToken")
			.should("be.focused");

		cy.get("@secondToken")
			.should("have.attr", "selected");

		cy.get("@lastToken")
			.should("have.attr", "selected");
	});

	it("should delete first token on [Backspace]", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("Backspace");

		cy.get("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);
	});

	it("should delete all selected tokens on [Backspace]", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress(["Shift", "ArrowRight"]);

		cy.realPress("Backspace");

		cy.get("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("@firstToken")
			.shadow()
			.find(".ui5-token--text")
			.should("have.text", "Canada");

	});

	it("should delete first and second token with [Backspace] when focus is on second", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("thirdToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("ArrowRight");
		cy.realPress("Space");
		cy.realPress("Backspace");

		cy.get("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("@firstToken")
			.shadow()
			.find(".ui5-token--text")
			.should("have.text", "Canada");
	});

	it("should delete first and third token with [Backspace] when focus is on second", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("thirdToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("ArrowRight");
		cy.realPress("ArrowRight");
		cy.realPress("Space");
		cy.realPress("ArrowLeft");
		cy.realPress("Backspace");

		cy.get("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("@firstToken")
			.shadow()
			.find(".ui5-token--text")
			.should("have.text", "Bulgaria");
	});

	it("should delete first and third token with [Backspace] when focus is on fourth", () => {
		cy.mount(
			<Tokenizer onTokenDelete={onTokenDelete}>
				<Token text="Andora"></Token>
				<Token text="Bulgaria"></Token>
				<Token text="Canada"></Token>
				<Token text="Denmark"></Token>
			</Tokenizer>
		);
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("thirdToken");

		cy.get("[ui5-token]")
			.eq(3)
			.as("fourthToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("ArrowRight");
		cy.realPress("ArrowRight");
		cy.realPress("Space");
		cy.realPress("ArrowRight");
		cy.realPress("Backspace");

		cy.get("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("@firstToken")
			.shadow()
			.find(".ui5-token--text")
			.should("have.text", "Bulgaria");
	});

	it("should delete second token on [Delete]", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("thirdToken");

		cy.get("@firstToken")
			.realClick();

		cy.realPress("ArrowRight");
		cy.realPress("Delete");

		cy.get("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 2);

		cy.get("@firstToken")
			.shadow()
			.find(".ui5-token--text")
			.should("have.text", "Bulgaria");
	});

	it("should delete first and second token with [Delete] when focus is on third", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.as("firstToken");

		cy.get("[ui5-token]")
			.eq(1)
			.as("secondToken");

		cy.get("[ui5-token]")
			.eq(2)
			.as("thirdToken");


		cy.get("@firstToken")
			.realClick();

		cy.realPress("ArrowRight");
		cy.realPress("Space");
		cy.realPress("ArrowRight");
		cy.realPress("Delete");

		cy.get("[ui5-tokenizer]")
			.find("[ui5-token]")
			.should("have.length", 1);

		cy.get("@firstToken")
			.shadow()
			.find(".ui5-token--text")
			.should("have.text", "Canada");
	});

	it("should open popover on keyboard combination [Ctrl] + [I]", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.realClick();

		cy.realPress(["Control", "i"]);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("be.visible");

		cy.realPress(["Control", "i"]);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("not.be.visible");
	});

	it("should close popover on token selection via mouse", () => {
		cy.get("[ui5-token]")
			.eq(0)
			.realClick();

		cy.realPress(["Control", "i"]);

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("be.visible");

		cy.get("[ui5-token]")
			.eq(1)
			.realClick();

		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("not.be.visible");

		cy.get("[ui5-token]")
			.eq(1)
			.should("have.attr", "selected");
	});
});

describe("Tokenizer - getFocusDomRef Method", () => {
    it("should focus the last focused token on tokenizer focus if its visible", () => {
        const onButtonClick = () => {
            document.getElementById("tokenizer").focus();
        }
        cy.mount(
            <>
				<Tokenizer id="tokenizer">
					<Token text="Andora"></Token>
					<Token text="Bulgaria"></Token>
					<Token text="Canada"></Token>
					<Token text="Denmark"></Token>
				</Tokenizer>
                <Button>Dummy Btn</Button>
                <Button onClick={onButtonClick}>Focus Tokenizer</Button>
            </>
        );

        cy.get("[ui5-token]")
            .eq(1)
            .realClick();

        cy.get("[ui5-button]")
            .eq(0)
            .realClick();

        cy.get("[ui5-button]")
            .eq(1)
            .realClick();

        cy.get("[ui5-token]")
            .eq(1)
            .should("be.focused");
    });

    it("should focus the first token if the previously focused token is not visible", () => {
        const onButtonClick = () => {
            document.getElementById("nmore-token").focus();
        }
        cy.mount(
            <>
				<div style={"width: 200px"}>
					<Tokenizer id="nmore-token" style={"width: 200px"}>
						<Token text="Andora"></Token>
						<Token text="Bulgaria"></Token>
						<Token text="Canada"></Token>
						<Token text="Denmark"></Token>
						<Token text="Estonia"></Token>
					</Tokenizer>
				</div>
				<Button>Dummy Btn</Button>
                <Button onClick={onButtonClick}>Focus Tokenizer</Button>
            </>
        );

        cy.get("[ui5-button]")
			.eq(1)
            .realClick();

        cy.get("[ui5-token]")
            .eq(2)
            .realClick();

		cy.get("[ui5-button]")
			.eq(0)
            .realClick();

		cy.get("[ui5-button]")
			.eq(1)
            .realClick();

		cy.get("[ui5-token]")
            .eq(0)
            .should("be.focused");
	});
});

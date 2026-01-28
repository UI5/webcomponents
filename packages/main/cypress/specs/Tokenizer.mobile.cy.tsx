import Tokenizer from "../../src/Tokenizer.js";
import Button from "../../src/Button.js";
import Token from "../../src/Token.js";
import { TOKENIZER_DIALOG_OK_BUTTON, TOKENIZER_DIALOG_CANCEL_BUTTON, TOKENIZER_POPOVER_REMOVE } from "../../src/generated/i18n/i18n-defaults.js";
import Label from "../../src/Label.js";

describe("Phone mode", () => {
    beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

    it("verifies OK and Cancel button texts in mobile dialog", () => {
        cy.mount(
            <Tokenizer style={{ width: "50%" }}>
                <Token text="Andora"></Token>
                <Token text="Bulgaria"></Token>
                <Token text="Canada"></Token>
                <Token text="Denmark"></Token>
                <Token text="Estonia"></Token>
            </Tokenizer>
        );

        cy.get("[ui5-tokenizer]")
            .as("tokenizer");

        cy.get("@tokenizer")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .click();

        cy.get("@tokenizer")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .should("have.attr", "open");

        cy.get("@popover")
            .find(".ui5-responsive-popover-footer")
            .as("footer");

        cy.get("@footer")
            .find("[ui5-button]")
            .eq(0)
            .should("have.text", TOKENIZER_DIALOG_OK_BUTTON.defaultText);

        cy.get("@footer")
            .find("[ui5-button]")
            .eq(1)
            .should("have.text", TOKENIZER_DIALOG_CANCEL_BUTTON.defaultText);
    });

    it("tests token selection after clicking cancel buttton in the dialog", () => {
        cy.mount(
            <>
                <Tokenizer style={{ width: "75%" }}>
                    <Token text="Andora"></Token>
                    <Token text="Bulgaria"></Token>
                    <Token text="Canada"></Token>
                    <Token text="Denmark"></Token>
                </Tokenizer>
                <Button>Dummy Button</Button>
            </>
        );
        cy.get("[ui5-tokenizer]")
            .as("tokenizer");

        cy.get("@tokenizer")
            .find("[ui5-token]")
            .eq(1)
            .realClick();

        cy.get("[ui5-button]")
            .realClick();

        cy.get("@tokenizer")
            .shadow()
            .find("span")
            .realClick();

        cy.get("@tokenizer")
            .shadow()
            .find("[ui5-responsive-popover]")
            .as("popover");

        cy.get("@popover")
            .find(".ui5-responsive-popover-footer")
            .as("footer");

        cy.get("@footer")
            .find("[ui5-button]")
            .eq(1)
            .realClick();

        cy.get("@tokenizer")
            .find("[ui5-token]")
            .eq(1)
            .should("have.attr", "selected");
    });

    it("n-more picker dialog is properly rendered", () => {
        cy.mount(
            <Tokenizer id="nmore-tokenizer" style={{ width: "50%" }}>
                <Token text="Andora"></Token>
                <Token text="Bulgaria"></Token>
                <Token text="Canada"></Token>
            </Tokenizer>
        );

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .as("nMoreLabel");

        cy.get("@nMoreLabel")
            .realClick();

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find("ui5-responsive-popover")
            .as("nMoreDialog");

        cy.get("@nMoreDialog")
            .should("have.attr", "open");

        cy.get("@nMoreDialog")
            .find(".ui5-responsive-popover-footer ui5-button[design='Emphasized']")
            .should("be.visible");

        cy.get("@nMoreDialog")
            .find(".ui5-responsive-popover-footer ui5-button[design='Transparent']")
            .should("be.visible");

        cy.get("@nMoreDialog")
            .find(".ui5-responsive-popover-header .ui5-responsive-popover-header-text")
            .should("have.text", TOKENIZER_POPOVER_REMOVE.defaultText);
    });

    it("Should fire the ui5-token-delete event when the 'X' is pressed in the n-more picker and confirmed with OK", () => {
        cy.mount(
            <Tokenizer style={{ width: "50%" }}>
                <Token text="Andora"></Token>
                <Token text="Bulgaria"></Token>
                <Token text="Canada"></Token>
            </Tokenizer>
        );

        cy.get("[ui5-tokenizer]")
            .invoke("on", "token-delete", cy.spy().as("tokenDeleteSpy"));

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .as("nMoreLabel");

        cy.get("@nMoreLabel")
            .realClick();

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find("ui5-responsive-popover")
            .as("nMoreDialog");

        cy.get("@nMoreDialog")
            .find("ui5-li")
            .eq(0)
            .shadow()
            .find(".ui5-li-deletebtn ui5-button")
            .as("firstListItemDeleteButton");

        cy.get("@firstListItemDeleteButton")
            .realClick();

        cy.get("@nMoreDialog")
            .find(".ui5-responsive-popover-footer ui5-button")
            .eq(0)
            .realClick();

        cy.get("@tokenDeleteSpy")
            .should("have.been.calledOnce");
    });

    it("Should NOT fire the ui5-token-delete event when no items are deleted and OK is pressed", () => {
        cy.mount(
            <Tokenizer style={{ width: "50%" }}>
                <Token text="Andora"></Token>
                <Token text="Bulgaria"></Token>
                <Token text="Canada"></Token>
            </Tokenizer>
        );

        cy.get("[ui5-tokenizer]")
            .invoke("on", "token-delete", cy.spy().as("tokenDeleteSpy"));

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .as("nMoreLabel");

        cy.get("@nMoreLabel")
            .realClick();

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find("ui5-responsive-popover")
            .as("nMoreDialog");

        cy.get("@nMoreDialog")
            .find(".ui5-responsive-popover-footer ui5-button")
            .eq(0)
            .realClick();

        cy.get("@tokenDeleteSpy")
            .should("not.have.been.called");
    });

    it("Should NOT fire the ui5-token-delete event when the 'X' is pressed in the n-more picker and canceled", () => {
        cy.mount(
            <Tokenizer style={{ width: "50%" }}>
                <Token text="Andora"></Token>
                <Token text="Bulgaria"></Token>
                <Token text="Canada"></Token>
            </Tokenizer>
        );
        cy.get("[ui5-tokenizer]")
            .invoke("on", "token-delete", cy.spy().as("tokenDeleteSpy"));

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find(".ui5-tokenizer-more-text")
            .as("nMoreLabel");

        cy.get("@nMoreLabel")
            .realClick();

        cy.get("[ui5-tokenizer]")
            .shadow()
            .find("ui5-responsive-popover")
            .as("nMoreDialog");

        cy.get("@nMoreDialog")
            .find("ui5-li")
            .eq(0)
            .shadow()
            .find(".ui5-li-deletebtn ui5-button")
            .as("firstListItemDeleteButton");

        cy.get("@firstListItemDeleteButton")
            .realClick();

        cy.get("@nMoreDialog")
            .find(".ui5-responsive-popover-footer ui5-button")
            .eq(1)
            .realClick();

        cy.get("@tokenDeleteSpy")
            .should("not.have.been.called");
    });

	it("Should test dialog title with default text", () => {
		cy.mount(
            <Tokenizer id="countries" style={{ width: "50%" }}>
                <Token text="Andora"></Token>
                <Token text="Bulgaria"></Token>
                <Token text="Canada"></Token>
            </Tokenizer>
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

		// Without label, should use default text from i18n
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [slot='header'] [ui5-title]")
			.should("have.text", TOKENIZER_POPOVER_REMOVE.defaultText);
		
	});

	it("Should test dialog title with label", () => {
		cy.mount(
            <>
                <Label for="countries">Countries</Label>
                <Tokenizer id="countries" style={{ width: "50%" }}>
                    <Token text="Andora"></Token>
                    <Token text="Bulgaria"></Token>
                    <Token text="Canada"></Token>
                </Tokenizer>
			</>
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

		// When label is present, it should be used as the mobile dialog title
		cy.get("[ui5-tokenizer]")
			.shadow()
			.find("[ui5-responsive-popover] [slot='header'] [ui5-title]")
			.should("have.text", "Countries");
	});
})
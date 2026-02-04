import MultiInput from "../../src/MultiInput.js";
import Token from "../../src/Token.js";
import SuggestionItem from "../../src/SuggestionItem.js";
import Button from "../../src/Button.js";
import "../../src/features/InputSuggestions.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import { INPUT_SUGGESTIONS_TITLE } from "../../src/generated/i18n/i18n-defaults.js";
import Label from "../../src/Label.js";

const createTokenFromText = (text: string): HTMLElement => {
	const token = document.createElement("ui5-token");
	token.setAttribute("text", text);
	token.setAttribute("slot", "tokens");
	return token;
};

const addTokenToMI = (token: HTMLElement, id: string) => {
	document.getElementById(id)?.appendChild(token);
};

const handleTokenDelete = (event) => {
	const mi = event.target;
	event.detail.tokens.forEach(token => {
		mi.removeChild(token);
	});
};

describe("Multi Input on mobile device", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("should return old value if dialog is cancelled and change should not be called", () => {
		const onChange = cy.spy().as("onChange");

		cy.mount(
			<MultiInput showSuggestions={true} onChange={onChange} value="test"></MultiInput>
		);

		cy.get("[ui5-multi-input]")
			.as("multiInput");

		cy.get("@multiInput")
			.shadow()
			.find(".ui5-input-inner")
			.realClick();

		cy.get("@multiInput")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.as("popover")
			.ui5ResponsivePopoverOpened();

		cy.wait(500);

		cy.get("@multiInput")
			.shadow().find(".ui5-input-inner-phone").realClick();

		cy.get("@multiInput")
			.shadow().find(".ui5-input-inner-phone").realType("b");

		// press cancel
		cy.get("@multiInput")
			.shadow()
			.find(".ui5-responsive-popover-close-btn")
			.realClick();

		cy.get("@multiInput")
			.should("have.value", "test");
		cy.get("@onChange").should("not.have.been.called");
	});

	describe("Filter-Selected Button", () => {
		it("Filter-selected button state changes when tokens are added/removed", () => {
			cy.mount(
				<>
					<MultiInput id="test-multi-input" showSuggestions>
						<SuggestionItem text="Argentina"></SuggestionItem>
						<SuggestionItem text="Brazil"></SuggestionItem>
						<SuggestionItem text="Canada"></SuggestionItem>
					</MultiInput>
					<Button id="add-token">Add Token</Button>
				</>
			);

			cy.get("#add-token").then(button => {
				button[0].addEventListener("click", () => {
					addTokenToMI(createTokenFromText("Test Token"), "test-multi-input");
				});
			});

			cy.get("#test-multi-input").then(multiInput => {
				multiInput[0].addEventListener("ui5-token-delete", handleTokenDelete);
			});

			cy.get("#test-multi-input")
				.shadow()
				.find(".ui5-input-inner")
				.realClick();

			cy.get("#test-multi-input")
				.shadow()
				.find<ResponsivePopover>("[ui5-responsive-popover]")
				.as("popover")
				.ui5ResponsivePopoverOpened();

			// Assert: Button should be initially disabled (no tokens)
			cy.get("@popover")
				.find("[ui5-toggle-button]")
				.as("filterButton")
				.should("have.attr", "disabled");

			cy.get("#test-multi-input")
				.shadow()
				.find(".ui5-responsive-popover-close-btn")
				.realClick();

			cy.get("#add-token").realClick();

			cy.get("#test-multi-input")
				.find("[ui5-token]")
				.should("have.length", 1);

			cy.get("#test-multi-input")
				.shadow()
				.find(".ui5-input-inner")
				.realClick();

			cy.get<ResponsivePopover>("@popover")
				.ui5ResponsivePopoverOpened();

			// Assert: Button should be enabled after adding a token
			cy.get("@filterButton")
				.should("not.have.attr", "disabled")
			cy.get("@filterButton")
				.should("have.attr", "pressed");

			cy.get("@popover")
				.find("[ui5-li].ui5-suggestion-token-item")
				.first()
				.shadow()
				.find("[ui5-button]")
				.realClick();

			cy.get("#test-multi-input")
				.find("[ui5-token]")
				.should("have.length", 0);

			// Assert: Button should be disabled after removing all tokens
			cy.get("@filterButton")
				.should("have.attr", "disabled");
		});

		it("Filter-selected button affects list content display", () => {
			cy.mount(
				<MultiInput id="test-multi-input" showSuggestions>
					<Token slot="tokens" text="Token 1"></Token>
					<Token slot="tokens" text="Token 2"></Token>
					<Token slot="tokens" text="Token 3"></Token>
					<SuggestionItem text="Argentina"></SuggestionItem>
					<SuggestionItem text="Brazil"></SuggestionItem>
				</MultiInput>
			);

			cy.get("#test-multi-input")
				.shadow()
				.find(".ui5-input-inner")
				.click();

			cy.get("#test-multi-input")
				.shadow()
				.find("[ui5-responsive-popover]")
				.as("popover")

			cy.get("@popover")
				.find("[ui5-toggle-button]")
				.as("filterButton");

			// Assert: Initially showing tokens (button pressed)
			cy.get("@filterButton")
				.should("have.attr", "pressed");

			// Assert: Should see token list items
			cy.get("@popover")
				.find("[ui5-list].ui5-tokenizer-list")
				.should("exist");

			cy.get("@popover")
				.find("[ui5-li].ui5-suggestion-token-item")
				.should("have.length", 3);

			// Act: Toggle to hide tokens
			cy.get("@filterButton").realClick();

			// Assert: Should see suggestion items instead
			cy.get("@popover")
				.find("[ui5-list]:not(.ui5-tokenizer-list)")
				.should("exist");

			cy.get("#test-multi-input")
				.find("[ui5-suggestion-item]")
				.should("have.length", 2);

			// Act: Toggle back to show tokens
			cy.get("@filterButton").realClick();

			// Assert: Should see token list items again
			cy.get("@popover")
				.find("[ui5-list].ui5-tokenizer-list")
				.should("exist");

			cy.get("@popover")
				.find("[ui5-li].ui5-suggestion-token-item")
				.should("have.length", 3);
		});
	});
});

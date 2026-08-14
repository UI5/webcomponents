import Input from "../../../src/Input.js";
import SuggestionItemCustom from "../../../src/SuggestionItemCustom.js";

describe("SuggestionItemCustom visual", () => {
	it("suggestions dropdown open", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItemCustom text="Item 1">Item 1</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 2">Item 2</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 3">Item 3</SuggestionItemCustom>
			</Input>
		);
		cy.get("[ui5-input]").realClick();
		cy.realType("i");
		cy.get("[ui5-input]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("first item focused via arrow key", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItemCustom text="Item 1">Item 1</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 2">Item 2</SuggestionItemCustom>
				<SuggestionItemCustom text="Item 3">Item 3</SuggestionItemCustom>
			</Input>
		);
		cy.get("[ui5-input]").realClick();
		cy.realType("i");
		cy.get("[ui5-input]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});
});

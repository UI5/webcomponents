import Input from "../../../src/Input.js";
import SuggestionItem from "../../../src/SuggestionItem.js";

describe("SuggestionItem visual", () => {
	it("suggestions dropdown open", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Iron" />
				<SuggestionItem text="Gold" />
				<SuggestionItem text="Silver" />
			</Input>
		);
		cy.get("[ui5-input]").realClick();
		cy.realType("i");
		cy.get("[ui5-input]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with additionalText", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItem text="Iron" additionalText="Fe" />
				<SuggestionItem text="Gold" additionalText="Au" />
				<SuggestionItem text="Silver" additionalText="Ag" />
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
				<SuggestionItem text="Iron" />
				<SuggestionItem text="Gold" />
				<SuggestionItem text="Silver" />
			</Input>
		);
		cy.get("[ui5-input]").realClick();
		cy.realType("i");
		cy.get("[ui5-input]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});
});

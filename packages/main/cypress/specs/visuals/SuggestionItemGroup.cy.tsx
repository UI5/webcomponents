import Input from "../../../src/Input.js";
import SuggestionItem from "../../../src/SuggestionItem.js";
import SuggestionItemGroup from "../../../src/SuggestionItemGroup.js";

describe("SuggestionItemGroup visual", () => {
	it("grouped suggestions dropdown open", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItemGroup headerText="Group 1">
					<SuggestionItem text="Item 1" />
					<SuggestionItem text="Item 2" />
					<SuggestionItem text="Item 3" />
				</SuggestionItemGroup>
				<SuggestionItemGroup headerText="Group 2">
					<SuggestionItem text="Item 4" />
					<SuggestionItem text="Item 5" />
					<SuggestionItem text="Item 6" />
				</SuggestionItemGroup>
			</Input>
		);
		cy.get("[ui5-input]").realClick();
		cy.realType("i");
		cy.get("[ui5-input]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("item focused via arrow key", () => {
		cy.mount(
			<Input showSuggestions>
				<SuggestionItemGroup headerText="Group 1">
					<SuggestionItem text="Item 1" />
					<SuggestionItem text="Item 2" />
				</SuggestionItemGroup>
				<SuggestionItemGroup headerText="Group 2">
					<SuggestionItem text="Item 3" />
					<SuggestionItem text="Item 4" />
				</SuggestionItemGroup>
			</Input>
		);
		cy.get("[ui5-input]").realClick();
		cy.realType("i");
		cy.get("[ui5-input]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});
});

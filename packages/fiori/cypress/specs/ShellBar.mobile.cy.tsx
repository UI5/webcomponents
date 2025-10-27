import ShellBar from "../../src/ShellBar.js";
import ShellBarSearch from "../../src/ShellBarSearch.js";

describe("Mobile Behaviour", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("Test self-collapsible search is expanded and collapsed by the show-search-field property", () => {
		cy.mount(
			<ShellBar id="shellbar" showSearchField={true}>
				<ShellBarSearch id="search" slot="searchField"></ShellBarSearch>
			</ShellBar>
		);

		cy.get("#search").should("have.prop", "open", true);
	});

	it("Test shellbar should have show-search-field when search is open", () => {
		cy.mount(
			<ShellBar id="shellbar">
				<ShellBarSearch id="search" slot="searchField" open={true}></ShellBarSearch>
			</ShellBar>
		);

		cy.get("#shellbar").should("have.prop", "showSearchField", true);
	});
});

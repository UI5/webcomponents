import ShellBar from "../../src/ShellBar.js";
import ShellBarSearch from "../../src/ShellBarSearch.js";

describe("Mobile Behaviour", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("Test self-collapsible search is not auto-opened on initial load", () => {
		cy.mount(
			<ShellBar id="shellbar" showSearchField={true}>
				<ShellBarSearch id="search" slot="searchField"></ShellBarSearch>
			</ShellBar>
		);

		// On initial load, search should stay collapsed even with showSearchField=true
		// to prevent the full-screen search dialog from appearing unexpectedly
		cy.get("#search").should("have.prop", "open", false);
	});

	it("Test self-collapsible search opens when user clicks the search field", () => {
		cy.mount(
			<ShellBar id="shellbar">
				<ShellBarSearch id="search" slot="searchField"></ShellBarSearch>
			</ShellBar>
		);

		// Click search field to open search dialog
		cy.get("#search").click();
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

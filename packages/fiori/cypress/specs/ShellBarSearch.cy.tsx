import SearchItem from "../../src/SearchItem.js";
import ShellBarSearch from "../../src/ShellBarSearch.js";
import {
	SHELLBAR_SEARCH_COLLAPSED,
	SEARCH_FIELD_SEARCH_ICON,
	SHELLBAR_SEARCH_EXPANDED,
} from "../../src/generated/i18n/i18n-defaults.js";

describe("Behaviour", () => {
	it("Toggles collapsed property upon icon press", () => {
		cy.mount(<ShellBarSearch />);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-icon][name=\"search\"]")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "collapsed", true);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-button][icon=\"search\"]")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "collapsed", false);
	});

	it("Tests icon tooltips for diffrent states", () => {
		cy.mount(<ShellBarSearch />);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-icon]")
			.as("searchIcon");

		cy.get("@searchIcon")
			.should("have.attr", "accessible-name", SHELLBAR_SEARCH_EXPANDED.defaultText);

		cy.get("@searchIcon")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "collapsed", true);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-button]")
			.should("have.attr", "accessible-name", SHELLBAR_SEARCH_COLLAPSED.defaultText);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-button]")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("input")
			.type("test");

		cy.get("@searchIcon")
			.should("have.attr", "accessible-name", SEARCH_FIELD_SEARCH_ICON.defaultText);
	});

	it("Tests autoOpen property", () => {
		cy.mount(
			<ShellBarSearch autoOpen={true}>
				<SearchItem text="Item 1"></SearchItem>
			</ShellBarSearch>
		);

		cy.get("[ui5-shellbar-search]")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "open", true);
	});
});
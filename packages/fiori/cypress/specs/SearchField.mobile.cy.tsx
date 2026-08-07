import SearchField from "../../src/SearchField.js";
import SearchScope from "../../src/SearchScope.js";
import { SEARCH_FIELD_SCOPE_SELECT_LABEL } from "../../src/generated/i18n/i18n-defaults.js";

describe("SearchField Responsive Scope Selector", () => {
	describe("Desktop Mode", () => {
		beforeEach(() => {
			cy.viewport(1024, 768);
		});

		it("should render Select component on desktop", () => {
			cy.mount(
				<SearchField scopeValue="apps">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.should("exist");

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.should("not.exist");
		});

		it("should have correct aria-label on Select", () => {
			cy.mount(
				<SearchField scopeValue="apps">
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.shadow()
				.find("[role='combobox']")
				.should("have.attr", "aria-label", SEARCH_FIELD_SCOPE_SELECT_LABEL.defaultText);
		});
	});

	describe("Mobile Mode", () => {
		beforeEach(() => {
			cy.viewport(400, 600);
		});

		it("should render button instead of Select on mobile", () => {
			cy.mount(
				<SearchField scopeValue="apps">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.should("exist");

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.should("not.exist");
		});

		it("should show popover when clicking mobile button", () => {
			cy.mount(
				<SearchField scopeValue="all">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-busy-indicator]")
				.find(".ui5-search-field-scope-popover")
				.should("have.attr", "open");
		});

		it("should display all scope options in popover", () => {
			cy.mount(
				<SearchField scopeValue="all">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
					<SearchScope text="Products" value="products" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.should("exist")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-busy-indicator]")
				.find("[ui5-responsive-popover]")
				.as("popover")
				.should("have.attr", "open")
				
			cy.get("@popover")
				.find("[ui5-list]")
				.find("[ui5-li]")
				.should("have.length", 3);
		});

		it("should mark selected scope in popover", () => {
			cy.mount(
				<SearchField scopeValue="apps">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-busy-indicator]")
				.find("[ui5-responsive-popover]")
				.find("[ui5-list]")
				.find("[ui5-li][selected]")
				.should("have.length", 1)
				.should("contain.text", "Apps");
		});

		it("should fire scope-change event when selecting from popover", () => {
			cy.mount(
				<SearchField scopeValue="all">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-scope-change", cy.stub().as("scopeChanged"));
				});

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-busy-indicator]")
				.find("[ui5-responsive-popover]")
				.find("[ui5-list]")
				.find("[ui5-li]")
				.eq(1)
				.realClick();

			cy.get("@scopeChanged")
				.should("have.been.calledOnce");
		});

		it("should close popover after selecting an item", () => {
			cy.mount(
				<SearchField scopeValue="all">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-busy-indicator]")
				.find("[ui5-responsive-popover]")
				.find("[ui5-list]")
				.find("[ui5-li]")
				.eq(1)
				.realClick();

			// Popover element is removed from DOM when closed
			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-busy-indicator]")
				.find(".ui5-search-field-scope-popover")
				.should("not.exist");
		});
	});

	describe("Responsive Switching", () => {
		it("should switch from desktop to mobile on resize", () => {
			cy.viewport(1024, 768);

			cy.mount(
				<SearchField scopeValue="all">
					<SearchScope text="All" value="all" slot="scopes"></SearchScope>
					<SearchScope text="Apps" value="apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.should("exist");

			cy.viewport(400, 600);
			cy.wait(100);

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-scope-button")
				.should("exist");

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.should("not.exist");
		});
	});
});

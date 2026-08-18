import ShellBarSearch from "../../../src/ShellBarSearch.js";
import SearchItem from "../../../src/SearchItem.js";
import SearchItemGroup from "../../../src/SearchItemGroup.js";
import SearchScope from "../../../src/SearchScope.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";

describe("ShellBarSearch visual", () => {
	it("basic state — expanded", () => {
		cy.mount(<ShellBarSearch placeholder="Search..." />);
		cy.screenshot();
	});

	it("collapsed state", () => {
		cy.mount(<ShellBarSearch placeholder="Search..." collapsed />);
		cy.screenshot();
	});

	it("with value", () => {
		cy.mount(<ShellBarSearch value="Algeria" placeholder="Search..." />);
		cy.screenshot();
	});

	it("showClearIcon — with value", () => {
		cy.mount(<ShellBarSearch value="Algeria" showClearIcon placeholder="Search..." />);
		cy.screenshot();
	});

	it("with scopes", () => {
		cy.mount(
			<ShellBarSearch placeholder="Search...">
				<SearchScope slot="scopes" text="All" />
				<SearchScope slot="scopes" text="Products" />
				<SearchScope slot="scopes" text="Orders" />
			</ShellBarSearch>
		);
		cy.screenshot();
	});

	it("open — with items", () => {
		cy.mount(
			<ShellBarSearch open placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
				<SearchItem text="Canada" icon={searchIcon} />
			</ShellBarSearch>
		);
		cy.get("[ui5-shellbar-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("open — with grouped items", () => {
		cy.mount(
			<ShellBarSearch open placeholder="Search...">
				<SearchItemGroup headerText="Recent Searches">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
				</SearchItemGroup>
				<SearchItemGroup headerText="Suggestions">
					<SearchItem text="Canada" icon={searchIcon} />
					<SearchItem text="Denmark" icon={searchIcon} />
				</SearchItemGroup>
			</ShellBarSearch>
		);
		cy.get("[ui5-shellbar-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("open — with scopes and items", () => {
		cy.mount(
			<ShellBarSearch open placeholder="Search...">
				<SearchScope slot="scopes" text="All" />
				<SearchScope slot="scopes" text="Products" />
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
			</ShellBarSearch>
		);
		cy.get("[ui5-shellbar-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ShellBarSearch open placeholder="Search...">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
					<SearchItem text="Canada" icon={searchIcon} />
				</ShellBarSearch>
			</div>
		);
		cy.get("[ui5-shellbar-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});

import Search from "../../../src/Search.js";
import SearchItem from "../../../src/SearchItem.js";
import SearchScope from "../../../src/SearchScope.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";

describe("SearchScope visual", () => {
	it("single scope", () => {
		cy.mount(
			<Search placeholder="Search...">
				<SearchScope slot="scopes" text="All" />
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
			</Search>
		);
		cy.screenshot();
	});

	it("multiple scopes", () => {
		cy.mount(
			<Search placeholder="Search...">
				<SearchScope slot="scopes" text="All" />
				<SearchScope slot="scopes" text="Products" />
				<SearchScope slot="scopes" text="Orders" />
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
			</Search>
		);
		cy.screenshot();
	});

	it("open — scopes with items", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchScope slot="scopes" text="All" />
				<SearchScope slot="scopes" text="Products" />
				<SearchScope slot="scopes" text="Orders" />
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={searchIcon} />
				<SearchItem text="Canada" icon={history} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Search placeholder="Search...">
					<SearchScope slot="scopes" text="All" />
					<SearchScope slot="scopes" text="Products" />
					<SearchScope slot="scopes" text="Orders" />
					<SearchItem text="Algeria" icon={history} />
				</Search>
			</div>
		);
		cy.screenshot();
	});
});

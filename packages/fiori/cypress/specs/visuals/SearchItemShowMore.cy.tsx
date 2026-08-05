import Search from "../../../src/Search.js";
import SearchItem from "../../../src/SearchItem.js";
import SearchItemShowMore from "../../../src/SearchItemShowMore.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";

describe("SearchItemShowMore visual", () => {
	it("basic state — with count", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
				<SearchItemShowMore itemsToShowCount={12} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("without count", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
				<SearchItemShowMore />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("in grouped list", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={searchIcon} />
				<SearchItem text="Bulgaria" icon={searchIcon} />
				<SearchItem text="Canada" icon={searchIcon} />
				<SearchItemShowMore itemsToShowCount={24} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Search open placeholder="Search...">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
					<SearchItemShowMore itemsToShowCount={8} />
				</Search>
			</div>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});

import Search from "../../../src/Search.js";
import SearchItem from "../../../src/SearchItem.js";
import SearchItemGroup from "../../../src/SearchItemGroup.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";

describe("SearchItemGroup visual", () => {
	it("basic state — with header text", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItemGroup headerText="Recent Searches">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
					<SearchItem text="Canada" icon={history} />
				</SearchItemGroup>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("multiple groups", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItemGroup headerText="Recent Searches">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
				</SearchItemGroup>
				<SearchItemGroup headerText="Suggestions">
					<SearchItem text="Canada" icon={searchIcon} />
					<SearchItem text="Denmark" icon={searchIcon} />
					<SearchItem text="Egypt" icon={searchIcon} />
				</SearchItemGroup>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("without header text", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItemGroup>
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
					<SearchItem text="Canada" icon={history} />
				</SearchItemGroup>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("long header text — wrapping", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItemGroup headerText="This is a very long group header text that should wrap onto multiple lines">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
				</SearchItemGroup>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Search open placeholder="Search...">
					<SearchItemGroup headerText="Recent Searches">
						<SearchItem text="Algeria" icon={history} />
						<SearchItem text="Bulgaria" icon={history} />
					</SearchItemGroup>
					<SearchItemGroup headerText="Suggestions">
						<SearchItem text="Canada" icon={searchIcon} />
					</SearchItemGroup>
				</Search>
			</div>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});

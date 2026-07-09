import Search from "../../../src/Search.js";
import SearchMessageArea from "../../../src/SearchMessageArea.js";

describe("SearchMessageArea visual", () => {
	it("text only", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchMessageArea slot="messageArea" text="No results found" />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("text and description", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchMessageArea
					slot="messageArea"
					text="No results found"
					description="Try adjusting your search terms or browse all available options."
				/>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("long description", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchMessageArea
					slot="messageArea"
					text="No matches"
					description="We couldn't find anything matching your search. Check for typos or try a different keyword. You can also browse the full list by clearing the search field."
				/>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Search open placeholder="Search...">
					<SearchMessageArea
						slot="messageArea"
						text="No results found"
						description="Try adjusting your search terms."
					/>
				</Search>
			</div>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});

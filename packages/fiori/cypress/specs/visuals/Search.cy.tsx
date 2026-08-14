import Search from "../../../src/Search.js";
import SearchItem from "../../../src/SearchItem.js";
import SearchItemGroup from "../../../src/SearchItemGroup.js";
import SearchItemShowMore from "../../../src/SearchItemShowMore.js";
import SearchMessageArea from "../../../src/SearchMessageArea.js";
import SearchScope from "../../../src/SearchScope.js";
import IllustratedMessage from "../../../src/IllustratedMessage.js";
import "../../../src/illustrations/AllIllustrations.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import history from "@ui5/webcomponents-icons/dist/history.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import actionSettings from "@ui5/webcomponents-icons/dist/action-settings.js";

describe("Search visual", () => {
	it("basic state — closed", () => {
		cy.mount(
			<Search placeholder="Search...">
				<SearchItem text="Item 1" />
				<SearchItem text="Item 2" />
			</Search>
		);
		cy.screenshot();
	});

	it("open — with items", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
				<SearchItem text="Canada" icon={history} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("open — with grouped items", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchItemGroup headerText="Recent">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
				</SearchItemGroup>
				<SearchItemGroup headerText="Suggestions">
					<SearchItem text="Canada" icon={searchIcon} />
					<SearchItem text="Denmark" icon={searchIcon} />
				</SearchItemGroup>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("open — with show more item", () => {
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

	it("open — with message area", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchMessageArea
					slot="messageArea"
					text="No results found"
					description="Try adjusting your search terms."
				/>
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("open — with illustration", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<IllustratedMessage slot="illustration" name="NoSearchResults" />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("open — with action button", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<Button slot="action" icon={actionSettings} design="Transparent" />
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("open — with scopes", () => {
		cy.mount(
			<Search open placeholder="Search...">
				<SearchScope slot="scopes" text="All" />
				<SearchScope slot="scopes" text="Products" />
				<SearchScope slot="scopes" text="Orders" />
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Bulgaria" icon={history} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("loading state", () => {
		cy.mount(
			<Search open loading placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
			</Search>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("with value", () => {
		cy.mount(
			<Search value="Alg" placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
				<SearchItem text="Albania" icon={history} />
			</Search>
		);
		cy.screenshot();
	});

	it("showClearIcon", () => {
		cy.mount(
			<Search value="Algeria" showClearIcon placeholder="Search...">
				<SearchItem text="Algeria" icon={history} />
			</Search>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Search open placeholder="Search...">
					<SearchItem text="Algeria" icon={history} />
					<SearchItem text="Bulgaria" icon={history} />
					<SearchItem text="Canada" icon={history} />
				</Search>
			</div>
		);
		cy.get("[ui5-search]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});

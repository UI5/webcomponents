import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Search from "../../src/Search.js";
import SearchItem from "../../src/SearchItem.js";
import SearchScope from "../../src/SearchScope.js";

describe("Search Field on mobile device", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("tests opening the dialog when search is clicked / focused", () => {
		cy.mount(
			<>
				<Search showClearIcon={true}>
					<SearchItem text="Item 1" />
					<SearchItem text="Item 2" />
					<SearchItem text="Item 3" />
					<SearchItem text="Item 4" />
					<SearchItem text="Item 5" />
					<SearchItem text="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.should("have.prop", "open", true);
	});

	it("tests closing the dialog when cancel button is pressed", () => {
		cy.mount(
			<>
				<Search showClearIcon={true}>
					<SearchItem text="Item 1" />
					<SearchItem text="Item 2" />
					<SearchItem text="Item 3" />
					<SearchItem text="Item 4" />
					<SearchItem text="Item 5" />
					<SearchItem text="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-search]")
			.shadow()
			.find(".ui5-search-popup-searching-header [ui5-button]")
			.realClick();

		cy.get("[ui5-search]")
			.should("have.prop", "open", false);
	});

	it("should fire search event without item when user types value and hits enter / search on Virtual Keyboard", () => {
		const spy = cy.spy();
		cy.mount(
			<>
				<Search showClearIcon={true}>
					<SearchItem text="Item 1" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("search"));
			});

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.should("be.focused");

		cy.realType("test{enter}");

		cy.get("[ui5-search]")
			.should("have.prop", "open", false);

		cy.get("@search").should("have.been.calledOnce");
		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item === undefined;
		}));
		cy.get("[ui5-search]").should("have.prop", "value", "test");
	});

	it("should fire search event with item when user types and hits enter / search on Virtual Keyboard", () => {
		const spy = cy.spy();
		cy.mount(
			<>
				<Search showClearIcon={true}>
					<SearchItem text="Item 1" />
					<SearchItem text="Item 2" />
					<SearchItem text="Item 3" />
					<SearchItem text="Item 4" />
					<SearchItem text="Item 5" />
					<SearchItem text="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.then(search => {
				search.get(0).addEventListener("ui5-search", spy);
				search.get(0).addEventListener("ui5-search", cy.stub().as("search"));
			});

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.should("be.focused");

		cy.realType("Item 1{enter}");

		cy.get("[ui5-search]")
			.should("have.prop", "open", false);

		cy.get("@search").should("have.been.calledOnce");
		cy.wrap(spy).should("have.been.calledWithMatch", Cypress.sinon.match(event => {
			return event.detail.item.text === "Item 1";
		}));
	});

	it("should revert value of search if dialog is closed by cancel", () => {
		cy.mount(
			<>
				<Search showClearIcon={true}>
					<SearchItem text="Item 1" />
					<SearchItem text="Item 2" />
					<SearchItem text="Item 3" />
					<SearchItem text="Item 4" />
					<SearchItem text="Item 5" />
					<SearchItem text="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.should("be.focused");

		cy.realPress("T");

		cy.get("[ui5-search]")
			.should("have.prop", "value", "T");

		cy.get("[ui5-search]")
			.shadow()
			.find(".ui5-search-popup-searching-header [ui5-button]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();

		cy.get("[ui5-search]")
			.should("have.prop", "value", "");
	});

	it("should fill value if provided before open", () => {
		cy.mount(
			<>
				<Search showClearIcon={true} value="initial">
					<SearchItem text="Item 1" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.should("have.prop", "value", "initial");
	});

	it("should not open when clicking on the scopes select", () => {
		cy.mount(
			<>
				<Search showClearIcon={true} value="initial">
					<SearchItem text="Item 1" />
					<SearchScope slot="scopes" text="Scope 1" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-select]")
			.realClick();

		cy.get("[ui5-search]")
			.should("have.prop", "open", false);

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-select]")
			.should("have.prop", "opened", true);
	});

	it("should accept autocompleted text after pressing go/enter on virtual keyboard", () => {
		cy.mount(
			<>
				<Search showClearIcon={true}>
					<SearchItem text="Item 1" />
					<SearchItem text="Item 2" />
					<SearchItem text="Item 3" />
					<SearchItem text="Item 4" />
					<SearchItem text="Item 5" />
					<SearchItem text="Item 6" />
				</Search>
			</>
		);

		cy.get("[ui5-search]")
			.realClick();

		cy.get("[ui5-search]")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.should("be.focused");

		cy.realType("Ite");

		cy.get("[ui5-search]")
			.should("have.prop", "value", "Ite");

		cy.get("[ui5-search]")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.should("be.focused");

		cy.realType("{enter}");

		cy.get("[ui5-search]")
			.should("have.prop", "value", "Item 1");
	});
});
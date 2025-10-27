import SearchItem from "../../src/SearchItem.js";
import ShellBarSearch from "../../src/ShellBarSearch.js";

describe("Mobile Behaviour", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice();
	});

	it("Should not close dialog upon focus out", () => {
		cy.mount(<ShellBarSearch />);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-button]")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-responsive-popover] header input")
			.type("test");

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-responsive-popover] header input")
			.blur();
		
		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "open", true);
	});

	it("Should select typed ahead item when typing", () => {
		cy.mount(
			<>
				<ShellBarSearch showClearIcon={true}>
					<SearchItem text="Item 1" />
					<SearchItem text="Item 2" />
					<SearchItem text="Item 3" />
					<SearchItem text="Item 4" />
					<SearchItem text="Item 5" />
					<SearchItem text="Item 6" />
				</ShellBarSearch>
			</>
		);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-button]")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "open", true);
		
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-responsive-popover] header input")
			.type("item 1");

		cy.get("[ui5-search-item]:first")
			.should("have.attr", "selected");
	});

	it("Should type ahead internal input", () => {
		cy.mount(
			<>
				<ShellBarSearch showClearIcon={true}>
					<SearchItem text="Item 1" />
					<SearchItem text="Item 2" />
					<SearchItem text="Item 3" />
					<SearchItem text="Item 4" />
					<SearchItem text="Item 5" />
					<SearchItem text="Item 6" />
				</ShellBarSearch>
			</>
		);

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-button]")
			.realClick();
		
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-responsive-popover] header input")
			.type("ite");

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-responsive-popover] header input")
			.should("have.value", "Item 1");
	});

	it("is collapsed by default", () => {
		cy.mount(<ShellBarSearch />);

		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "collapsed", true);
	});
});
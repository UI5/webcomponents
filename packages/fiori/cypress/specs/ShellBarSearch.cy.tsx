import SearchItem from "../../src/SearchItem.js";
import ShellBarSearch from "../../src/ShellBarSearch.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
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

	it("should collapse and focus the button when Enter is pressed without value", () => {
		cy.mount(
			<ShellBarSearch/>
		);

		// Initially expanded
		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "collapsed", false);

		// Focus the input
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("input")
			.realClick();

		// Press Enter without value
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("input")
			.realPress("Enter");

		// Should be collapsed
		cy.get("[ui5-shellbar-search]")
			.should("have.prop", "collapsed", true);

		// Focus should be on the search button
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("[ui5-button]")
			.should("have.focus");
	});

	it("keeps effective open state in sync across dynamic loading, focus out and item selection", () => {
		const searchItems = [
			{ text: "Manage Users" },
			{ text: "Manage Roles" },
			{ text: "Manage Settings" },
		];

		let searchComponent: any;
		let timer: ReturnType<typeof setTimeout>;

		// Dynamically loads 3 items (all containing "Manage") with a short delay,
		// toggling the loading state so the popover shows a busy indicator meanwhile.
		const loadItems = () => {
			clearTimeout(timer);
			searchComponent.innerHTML = "";

			if (!searchComponent.value) {
				searchComponent.loading = false;
				return;
			}

			searchComponent.loading = true;

			timer = setTimeout(() => {
				searchComponent.innerHTML = "";
				searchItems.forEach(data => {
					const item = document.createElement("ui5-search-item");
					item.setAttribute("text", data.text);
					searchComponent.appendChild(item);
				});
				searchComponent.loading = false;
			}, 300);
		};

		cy.mount(
			<>
				<ShellBarSearch noTypeahead ref={(el: any) => { searchComponent = el; }} onInput={loadItems}></ShellBarSearch>
				<Button>Outside</Button>
			</>
		);

		cy.get("[ui5-shellbar-search]").as("search");

		// Focus the input and type "Manage"
		cy.get("@search")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@search")
			.should("be.focused");

		cy.get("@search")
			.realType("Manage");

		// 3 items containing "Manage" are loaded dynamically
		cy.get("ui5-search-item")
			.should("have.length", 3);

		// The popover is open once the items are loaded
		cy.get("@search")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverOpened();

		// Focus out from the search (move focus to the sibling button)
		cy.get("@search")
			.realPress("Tab");

		// The popover is closed
		cy.get("@search")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverClosed();

		// Click again in the search and delete the last letter -> "Manag"
		cy.get("@search")
			.shadow()
			.find("input")
			.realClick();

		cy.get("@search")
			.realPress("Backspace");

		cy.get("@search")
			.should("have.value", "Manag");

		cy.get("@search")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverOpened();

		cy.get("ui5-search-item")
			.should("have.length", 3);

		// Click on the first item that starts with "Manag"
		cy.get("ui5-search-item")
			.eq(0)
			.realClick();

		// The popover is not open after the click
		cy.get("@search")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverClosed();
	});
});

describe("Open property", () => {
	it("should close the picker when the application sets 'open' to false while the search is focused", () => {
		cy.mount(
			<ShellBarSearch>
				<SearchItem text="Item 1" />
				<SearchItem text="Item 2" />
			</ShellBarSearch>
		);

		// The focus is placed in the search
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("input")
			.realClick();

		cy.get("[ui5-shellbar-search]")
			.should("be.focused");

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find("input")
			.realType("It");

		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverOpened();

		// The application closes the picker from outside
		cy.get("[ui5-shellbar-search]")
			.then($search => {
				($search.get(0) as ShellBarSearch).open = false;
			});

		// The picker is closed
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverClosed();
	});

	it("should open the picker when the application sets 'open' to true while the search is not focused", () => {
		cy.mount(
			<ShellBarSearch>
				<SearchItem text="Item 1" />
				<SearchItem text="Item 2" />
			</ShellBarSearch>
		);

		// The search is not focused
		cy.get("[ui5-shellbar-search]")
			.should("not.be.focused");

		// The picker is initially closed
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverClosed();

		// The application opens the picker from outside
		cy.get("[ui5-shellbar-search]")
			.then($search => {
				($search.get(0) as ShellBarSearch).open = true;
			});

		// The picker is open
		cy.get("[ui5-shellbar-search]")
			.shadow()
			.find<ResponsivePopover>("#ui5-search-list")
			.ui5ResponsivePopoverOpened();
	});
});
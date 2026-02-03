import AdaptFiltersDialog from "../../src/AdaptFiltersDialog.js";
import FilterBarItem from "../../src/FilterBarItem.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";

describe("AdaptFiltersDialog - Opening and Closing", () => {
	it("should open the dialog when open property is set to true", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.invoke("prop", "open", true);

		cy.get("@dialog")
			.shadow()
			.find("[ui5-dialog]")
			.should("have.prop", "open", true);
	});

	it("should close the dialog when open property is set to false", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.shadow()
			.find("[ui5-dialog]")
			.should("have.prop", "open", true);

		cy.get("@dialog")
			.invoke("prop", "open", false);

		cy.get("@dialog")
			.shadow()
			.find("[ui5-dialog]")
			.should("have.prop", "open", false);
	});

	it("should open dialog via show() method", () => {
		cy.mount(
			<AdaptFiltersDialog>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).show();
			});

		cy.get("@dialog")
			.should("have.prop", "open", true);
	});

	it("should close dialog via close() method", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.then($el => {
				($el[0] as any).close();
			});

		cy.get("@dialog")
			.should("have.prop", "open", false);
	});
});

describe("AdaptFiltersDialog - Rendering", () => {
	it("should render filter items in list view", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find("[ui5-dialog]")
			.should("be.visible");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item")
			.should("have.length", 2);
	});

	it("should render tabs for List and Groups views", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find("[ui5-tab-container]")
			.should("exist");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find("[ui5-tab]")
			.should("have.length", 2);
	});

	it("should render header with title and reset button", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-header [ui5-title]")
			.should("exist");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-header [ui5-button]")
			.should("exist");
	});

	it("should render footer with OK, Filter, and Cancel buttons", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.should("have.length", 3);
	});
});

describe("AdaptFiltersDialog - View Mode Switching", () => {
	it("should default to list view mode", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.should("have.prop", "viewMode", "list");
	});

	it("should switch to groups view when groups tab is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.shadow()
			.find("[ui5-tab]")
			.eq(1)
			.realClick();

		cy.get("@dialog")
			.should("have.prop", "viewMode", "groups");
	});

	it("should switch back to list view when list tab is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem text="Name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.shadow()
			.find("[ui5-tab]")
			.eq(0)
			.realClick();

		cy.get("@dialog")
			.should("have.prop", "viewMode", "list");
	});
});

describe("AdaptFiltersDialog - Events", () => {
	it("should fire confirm event with selectedFilters and visibilityMap when OK is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onConfirm={cy.stub().as("confirmEvent")}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Age" key="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button][design='Emphasized']")
			.realClick();

		cy.get("@confirmEvent")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.should("have.property", "selectedFilters")
			.and("have.property", "visibilityMap");
	});

	it("should fire cancel event when Cancel button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onCancel={cy.stub().as("cancelEvent")}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.eq(2) // Cancel is the 3rd button
			.realClick();

		cy.get("@cancelEvent")
			.should("be.called");
	});

	it("should fire filter event when Filter button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFilter={cy.stub().as("filterEvent")}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.eq(1) // Filter is the 2nd button
			.realClick();

		cy.get("@filterEvent")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.should("have.property", "selectedFilters")
			.and("have.property", "visibilityMap");
	});

	it("should close dialog after OK button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button][design='Emphasized']")
			.realClick();

		cy.get("@dialog")
			.should("have.prop", "open", false);
	});

	it("should close dialog after Cancel button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.eq(2)
			.realClick();

		cy.get("@dialog")
			.should("have.prop", "open", false);
	});

	it("should NOT close dialog after Filter button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.as("dialog")
			.shadow()
			.find(".ui5-adapt-filters-footer [ui5-button]")
			.eq(1)
			.realClick();

		cy.get("@dialog")
			.should("have.prop", "open", true);
	});
});

describe("AdaptFiltersDialog - Visibility Toggle", () => {
	it("should fire filter-visibility-change event when visibility is toggled", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFilterVisibilityChange={cy.stub().as("visibilityEvent")}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.realClick();

		cy.get("@visibilityEvent")
			.should("be.called")
			.its("firstCall.args.0.detail")
			.should("have.property", "filter")
			.and("have.property", "visible");
	});

	it("should toggle visibility icon when clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// Initially should show "show" icon (visible)
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "icon", "show");

		// Click to toggle
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.realClick();

		// Should now show "hide" icon
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "icon", "hide");
	});
});

describe("AdaptFiltersDialog - Search Functionality", () => {
	it("should filter items based on search value", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Age" key="age">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="City" key="city">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item")
			.should("have.length", 3);

		// Type in search
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-search-input")
			.shadow()
			.find("input")
			.type("Name");

		// Should filter to show only matching items
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item")
			.should("have.length", 1);
	});

	it("should be case-insensitive search", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Age" key="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-search-input")
			.shadow()
			.find("input")
			.type("name"); // lowercase

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item")
			.should("have.length", 1);
	});

	it("should search by group name as well", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Age" key="age" groupName="Advanced">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-search-input")
			.shadow()
			.find("input")
			.type("Basic");

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item")
			.should("have.length", 1);
	});
});

describe("AdaptFiltersDialog - Reset Functionality", () => {
	it("should reset all filters to visible when Reset button is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Age" key="age">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// Toggle first filter to hidden
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.realClick();

		// Verify it's hidden
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "icon", "hide");

		// Click Reset in header
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-header [ui5-button]")
			.realClick();

		// Verify it's visible again
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "icon", "show");
	});
});

describe("AdaptFiltersDialog - Groups View", () => {
	it("should render filters grouped by groupName", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem text="Name" key="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Company" key="company" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Age" key="age" groupName="Advanced">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.should("have.length", 2);
	});

	it("should show Basic group first", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem text="Age" key="age" groupName="Advanced" groupOrder={1}>
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem text="Name" key="name" groupName="Basic" groupOrder={0}>
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.first()
			.find(".ui5-adapt-filter-group-title")
			.should("contain.text", "Basic");
	});

	it("should expand/collapse groups when header is clicked", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem text="Name" key="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// Initially expanded - should show item
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item-grouped")
			.should("have.length", 1);

		// Click group header to collapse
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.first()
			.realClick();

		// Items should be hidden
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item-grouped")
			.should("have.length", 0);

		// Click again to expand
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.first()
			.realClick();

		// Items should be visible again
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-item-grouped")
			.should("have.length", 1);
	});

	it("should show down arrow icon when group is expanded", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem text="Name" key="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header [ui5-icon]")
			.should("have.attr", "name", "navigation-down-arrow");
	});

	it("should show right arrow icon when group is collapsed", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} viewMode="groups">
				<FilterBarItem text="Name" key="name" groupName="Basic">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		// Collapse group
		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header")
			.first()
			.realClick();

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-group-header [ui5-icon]")
			.should("have.attr", "name", "navigation-right-arrow");
	});
});

describe("AdaptFiltersDialog - Required Filters", () => {
	it("should disable visibility toggle for required filters without values", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Required Filter" key="required" required={true}>
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("have.attr", "disabled");
	});

	it("should enable visibility toggle for required filters with values", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Required Filter" key="required" required={true} additionalText="=SomeValue ×">
					<Input value="SomeValue"></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filter-actions [ui5-button]")
			.first()
			.should("not.have.attr", "disabled");
	});
});

describe("AdaptFiltersDialog - Add Filters", () => {
	it("should show add filter section when availableFilters slot has items", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem slot="availableFilters" text="Country" key="country">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-section")
			.should("exist");
	});

	it("should not show add filter section when no available filters", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-section")
			.should("not.exist");
	});

	it("should exclude already added filters from available filters dropdown", () => {
		cy.mount(
			<AdaptFiltersDialog open={true}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem slot="availableFilters" text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem slot="availableFilters" text="Country" key="country">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-select [ui5-option]")
			.should("have.length", 2); // Empty option + Country (Name is excluded)
	});

	it("should fire filter-add event when filter is selected from dropdown", () => {
		cy.mount(
			<AdaptFiltersDialog open={true} onFilterAdd={cy.stub().as("addEvent")}>
				<FilterBarItem text="Name" key="name">
					<Input></Input>
				</FilterBarItem>
				<FilterBarItem slot="availableFilters" text="Country" key="country">
					<Input></Input>
				</FilterBarItem>
			</AdaptFiltersDialog>
		);

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-select")
			.realClick();

		cy.get("[ui5-adapt-filters-dialog]")
			.shadow()
			.find(".ui5-adapt-filters-add-select [ui5-option][value='country']")
			.realClick();

		cy.get("@addEvent")
			.should("be.called")
			.its("firstCall.args.0.detail.filterKey")
			.should("equal", "country");
	});
});
